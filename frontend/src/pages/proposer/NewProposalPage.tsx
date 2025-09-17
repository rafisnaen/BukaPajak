import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  ArrowLeft,
  Upload,
  FileText,
  Image as ImageIcon,
  CheckCircle,
  ArrowRight,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ProposerLayout } from "../../components/proposer/ProposerLayout";
import { cn } from "@/lib/utils";
import { createProject } from "@/api/project";
import { getAllRegions, Region } from "@/api/region";
import { uploadProposal_IPFS } from "@/api/proposal";
const STEPS = [
  { id: 1, title: "Detail Proyek" },
  { id: 2, title: "Unggah Dokumen Proposal" },
  { id: 3, title: "Selesai" },
];

export default function NewProposalPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [isLoadingRegions, setIsLoadingRegions] = useState(true);
  const [regionsError, setRegionsError] = useState<string | null>(null);
  
  const [regions, setRegions] = useState<Region[]>([]);
  
  const [formData, setFormData] = useState({
    judul: "",
    budget: "",
    region_id: "",
    kategori: "",
    alamat: "",
    deskripsi: "",
  });
  
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [idrValue, setIdrValue] = useState<string>("");
  const [ethToIdrRate, setEthToIdrRate] = useState<number | null>(null);
  const [createdProjectId, setCreatedProjectId] = useState<number | null>(null);

  const documentInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // ✅ Fetch regions dari API http://localhost:8080/api/v1/regions
  useEffect(() => {
    const fetchRegions = async () => {
      try {
        setIsLoadingRegions(true);
        setRegionsError(null);
        
        const regionsData = await getAllRegions();
        setRegions(regionsData);
        
        console.log("Regions loaded:", regionsData);
        
        if (regionsData.length === 0) {
          setRegionsError("Tidak ada data provinsi tersedia");
          toast.warning("Data provinsi kosong");
        } else {
          toast.success(`Data provinsi berhasil dimuat (${regionsData.length} item)`);
        }
      } catch (error: any) {
        console.error("Error fetching regions:", error);
        const errorMessage = error.response?.data?.message || error.message || "Gagal memuat data provinsi";
        setRegionsError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setIsLoadingRegions(false);
      }
    };
    
    fetchRegions();
  }, []);

  useEffect(() => {
    const fetchEthPrice = async () => {
      try {
        const apiKey = import.meta.env.VITE_COINGECKO_API_KEY;
        let url =
          "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=idr";
        if (apiKey) {
          url = `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=idr&x_cg_demo_api_key=${apiKey}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        if (data.ethereum && data.ethereum.idr) {
          setEthToIdrRate(data.ethereum.idr);
        }
      } catch (error) {
        console.error("Error fetching ETH price:", error);
        toast.error("Gagal memuat kurs konversi ETH ke IDR.");
      }
    };
    fetchEthPrice();
  }, []);

  useEffect(() => {
    if (formData.budget && ethToIdrRate) {
      const amountInEth = parseFloat(formData.budget);
      if (!isNaN(amountInEth)) {
        const valueInIdr = amountInEth * ethToIdrRate;
        setIdrValue(
          new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          }).format(valueInIdr)
        );
      } else {
        setIdrValue("");
      }
    } else {
      setIdrValue("");
    }
  }, [formData.budget, ethToIdrRate]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fileType: "document" | "image"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (fileType === "document") {
        if (file.type === "application/pdf" && file.size <= 10 * 1024 * 1024) {
          setDocumentFile(file);
          toast.success("File proposal berhasil dipilih.");
        } else {
          toast.error("File dokumen harus PDF dan maksimal 10MB.");
        }
      } else {
        if (
          ["image/jpeg", "image/png"].includes(file.type) &&
          file.size <= 5 * 1024 * 1024
        ) {
          setImageFile(file);
          const reader = new FileReader();
          reader.onloadend = () => {
            setImagePreview(reader.result as string);
          };
          reader.readAsDataURL(file);
          toast.success("Gambar berhasil dipilih.");
        } else {
          toast.error("File gambar harus JPG/PNG dan maksimal 5MB.");
        }
      }
    }
  };

  const isStep1Valid =
    formData.judul &&
    formData.budget &&
    formData.region_id &&
    formData.kategori &&
    formData.alamat &&
    formData.deskripsi &&
    imageFile;

  const isStep2Valid = documentFile;

  const goToNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

 const createProjectHandler = async (): Promise<number> => {
  setIsCreatingProject(true);
  try {
    const projectFormData = new FormData();
    
    // Data project dengan region_id dari dropdown
    projectFormData.append("judul", formData.judul);
    projectFormData.append("kategori", formData.kategori);
    projectFormData.append("deskripsi", formData.deskripsi);
    projectFormData.append("budget", formData.budget);
    projectFormData.append("alamat", formData.alamat);
    projectFormData.append("region_id", formData.region_id);
    
    // Tambahkan status default yang valid sesuai backend
    projectFormData.append("status", "belum dimulai");
    
    // File gambar
    if (imageFile) {
      projectFormData.append("gambar", imageFile);
    }

    console.log("Membuat proyek dengan data:", {
      judul: formData.judul,
      kategori: formData.kategori,
      budget: formData.budget,
      alamat: formData.alamat,
      deskripsi: formData.deskripsi,
      region_id: formData.region_id,
      status: "belum dimulai"
    });

    const response = await createProject(projectFormData);
    
    console.log("Response dari backend:", response); // Debug log
    
    toast.success("Proyek berhasil dibuat!");
    setCreatedProjectId(response.proyek.id); // Perbaikan di sini
    return response.proyek.id; // Perbaikan di sini
    
  } catch (error: any) {
    console.error("Create project error:", error);
    
    const errorMessage = error?.response?.data?.error || 
                        error?.response?.data?.message || 
                        error?.message || 
                        "Terjadi kesalahan saat membuat proyek";
    
    toast.error(errorMessage);
    throw error;
  } finally {
    setIsCreatingProject(false);
  }
};
  const handleNextToStep2 = async () => {
    if (!isStep1Valid) {
      toast.error("Harap lengkapi semua data proyek");
      return;
    }

    try {
      await createProjectHandler();
      goToNextStep();
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isStep2Valid) {
      toast.error("Harap unggah dokumen proposal.");
      return;
    }

    if (!documentFile || !createdProjectId) {
      toast.error("File proposal harus diupload dan proyek harus sudah dibuat.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Buat FormData untuk proposal
      const proposalFormData = new FormData();
      
      // Data proposal dengan project_id yang sudah dibuat
      proposalFormData.append("project_id", createdProjectId.toString());
      
      // File proposal
      proposalFormData.append("proposal", documentFile);

      console.log("Mengajukan proposal untuk project ID:", createdProjectId);

      // Menggunakan uploadProposal_IPS sebagai ganti uploadProposal
      const response = await uploadProposal_IPFS(proposalFormData);
      
      toast.success("Proposal berhasil diajukan! Menunggu review dari auditor.");
      goToNextStep();
      
    } catch (error: any) {
      console.error("Submit error:", error);
      
      const errorMessage = error?.response?.data?.error || 
                          error?.response?.data?.message || 
                          error?.message || 
                          "Terjadi kesalahan saat mengirim proposal";
      
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const resetForm = () => {
    setFormData({
      judul: "",
      budget: "",
      region_id: "",
      kategori: "",
      alamat: "",
      deskripsi: "",
    });
    setDocumentFile(null);
    setImageFile(null);
    setImagePreview(null);
    setIdrValue("");
    setCreatedProjectId(null);
    setCurrentStep(1);
  };

  const handleBackToDashboard = () => {
    navigate("/proposer/dashboard");
  };

  return (
    <ProposerLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Stepper */}
        <div className="flex items-center justify-between mb-8">
          {STEPS.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                    currentStep > step.id
                      ? "bg-primary border-primary text-primary-foreground"
                      : currentStep === step.id
                      ? "bg-primary/20 border-primary text-primary font-bold animate-pulse"
                      : "bg-muted border-border text-muted-foreground"
                  )}
                >
                  {currentStep > step.id ? <CheckCircle className="w-5 h-5" /> : step.id}
                </div>
                <p
                  className={cn(
                    "text-sm mt-2 text-center",
                    currentStep >= step.id ? "text-foreground font-medium" : "text-muted-foreground"
                  )}
                >
                  {step.title}
                </p>
              </div>
              {index < STEPS.length - 1 && (
                <div
                  className={cn(
                    "flex-1 h-1 mx-4 transition-colors duration-300",
                    currentStep > index + 1 ? "bg-primary" : "bg-border"
                  )}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2 text-center">
            {currentStep === 1 && "Lengkapi Detail Proyek"}
            {currentStep === 2 && "Unggah Dokumen Proposal"}
            {currentStep === 3 && "Pengajuan Berhasil"}
          </h1>
          <p className="text-muted-foreground text-center">
            {currentStep === 1 && "Pastikan semua data proyek sudah benar sebelum melanjutkan."}
            {currentStep === 2 && "Unggah proposal dalam format PDF."}
            {currentStep === 3 && "Proposal Anda telah berhasil diajukan dan akan segera ditinjau."}
          </p>
        </div>

        <Card className="bg-gradient-card border-0 shadow-card">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Project Details & Image Upload */}
              {currentStep === 1 && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="judul">Nama Proyek</Label>
                    <Input 
                      id="judul" 
                      placeholder="Contoh: Pembangunan Jembatan Desa Sukamaju" 
                      value={formData.judul} 
                      onChange={(e) => handleInputChange("judul", e.target.value)} 
                      required 
                    />
                  </div>
                  
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="budget">Jumlah Dana (ETH)</Label>
                      <div className="flex items-center gap-2">
                        <Input 
                          id="budget" 
                          type="number" 
                          step="0.01" 
                          placeholder="Contoh: 15" 
                          value={formData.budget} 
                          onChange={(e) => handleInputChange("budget", e.target.value)} 
                          className="w-40" 
                          required 
                        />
                        <span className="text-sm text-muted-foreground whitespace-nowrap">
                          {idrValue ? `≈ ${idrValue}` : "≈ 0"}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="kategori">Kategori Proyek</Label>
                      <Select 
                        value={formData.kategori} 
                        onValueChange={(value) => handleInputChange("kategori", value)} 
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih kategori proyek" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="infrastruktur">Infrastruktur</SelectItem>
                          <SelectItem value="pendidikan">Pendidikan</SelectItem>
                          <SelectItem value="kesehatan">Kesehatan</SelectItem>
                          <SelectItem value="pertahanan">Pertahanan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  {/* DROPDOWN PROVINSI DARI DATABASE */}
                  <div className="space-y-2">
                    <Label htmlFor="region">Provinsi</Label>
                    <Select 
                      value={formData.region_id} 
                      onValueChange={(value) => handleInputChange("region_id", value)} 
                      required
                      disabled={isLoadingRegions || regions.length === 0}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={
                          isLoadingRegions ? "Memuat data provinsi..." : 
                          regions.length === 0 ? "Tidak ada data provinsi" : 
                          "Pilih provinsi..."
                        } />
                      </SelectTrigger>
                      <SelectContent>
                        {regions.map((region) => (
                          <SelectItem key={region.id} value={region.id.toString()}>
                            {region.nama_region} {/* Perbaikan di sini */}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    {isLoadingRegions && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Sedang memuat data provinsi...</span>
                      </div>
                    )}
                    
                    {regionsError && (
                      <div className="flex items-center gap-2 text-sm text-destructive">
                        <AlertCircle className="h-4 w-4" />
                        <span>{regionsError}</span>
                      </div>
                    )}
                    
                    {!isLoadingRegions && regions.length === 0 && !regionsError && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <AlertCircle className="h-4 w-4" />
                        <span>Tidak ada data provinsi tersedia</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="alamat">Alamat Proyek</Label>
                    <Textarea 
                      id="alamat" 
                      placeholder="Masukkan alamat lengkap proyek" 
                      value={formData.alamat} 
                      onChange={(e) => handleInputChange("alamat", e.target.value)} 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="deskripsi">Deskripsi Singkat Proyek</Label>
                    <Textarea 
                      id="deskripsi" 
                      placeholder="Jelaskan secara singkat tujuan dan ruang lingkup proyek ini." 
                      value={formData.deskripsi} 
                      onChange={(e) => handleInputChange("deskripsi", e.target.value)} 
                      className="min-h-[100px]" 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Foto Prediksi Proyek</Label>
                    <Input 
                      id="image-upload" 
                      type="file" 
                      ref={imageInputRef} 
                      onChange={(e) => handleFileChange(e, "image")} 
                      accept="image/png, image/jpeg" 
                      className="hidden" 
                    />
                    <div 
                      onClick={() => imageInputRef.current?.click()} 
                      className="border-2 border-dashed rounded-lg p-4 text-center bg-muted/30 hover:bg-muted/50 cursor-pointer h-48 flex items-center justify-center"
                    >
                      {imagePreview ? (
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="max-h-full max-w-full object-contain rounded-md" 
                        />
                      ) : (
                        <div>
                          <ImageIcon className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm font-medium">Upload gambar (JPG/PNG)</p>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* Step 2: PDF Upload */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 text-green-700">
                      <CheckCircle className="h-5 w-5" />
                      <p className="font-medium">Proyek berhasil dibuat!</p>
                    </div>
                    <p className="text-sm text-green-600 mt-1">
                      ID Proyek: {createdProjectId}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Dokumen Proposal (PDF)</Label>
                    <Input 
                      id="document-upload" 
                      type="file" 
                      ref={documentInputRef} 
                      onChange={(e) => handleFileChange(e, "document")} 
                      accept=".pdf" 
                      className="hidden" 
                    />
                    <div 
                      onClick={() => documentInputRef.current?.click()} 
                      className="border-2 border-dashed rounded-lg p-12 text-center bg-muted/30 hover:bg-muted/50 cursor-pointer"
                    >
                      {documentFile ? (
                        <div className="text-green-600 flex flex-col items-center gap-2">
                          <CheckCircle className="h-10 w-10" />
                          <p className="text-sm font-semibold">{documentFile.name}</p>
                          <span className="text-xs text-muted-foreground">Klik untuk ganti file</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <Upload className="h-10 w-10 text-muted-foreground" />
                          <p className="text-sm font-medium">Pilih atau seret file PDF ke sini</p>
                          <span className="text-xs text-muted-foreground">Maksimal 10MB</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Confirmation */}
              {currentStep === 3 && (
                <div className="text-center py-12">
                  <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6 animate-pulse" />
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Proposal Anda telah berhasil dikirim. Anda akan menerima notifikasi 
                    setelah proposal ditinjau oleh auditor.
                  </p>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                {currentStep > 1 && currentStep < 3 && (
                  <Button type="button" variant="ghost" onClick={goToPreviousStep}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Kembali
                  </Button>
                )}
                
                {currentStep === 3 && (
                  <div className="flex gap-4 mx-auto">
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Buat Proposal Baru
                    </Button>
                    <Button type="button" onClick={handleBackToDashboard}>
                      Kembali ke Dashboard
                    </Button>
                  </div>
                )}
                
                <div />
                
                {currentStep === 1 && (
                  <Button 
                    type="button" 
                    onClick={handleNextToStep2} 
                    disabled={!isStep1Valid || isCreatingProject}
                  >
                    {isCreatingProject ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Membuat Proyek...
                      </>
                    ) : (
                      <>
                        Lanjut ke Step 2
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                )}
                
                {currentStep === 2 && (
                  <Button 
                    type="submit" 
                    disabled={!isStep2Valid || isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Mengajukan...
                      </>
                    ) : (
                      <>
                        <FileText className="h-4 w-4 mr-2" />
                        Ajukan Proposal
                      </>
                    )}
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </ProposerLayout>
  );
}