// src/pages/proposer/NewProposalPage.tsx - Komponen yang diperbaiki

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
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ProposerLayout } from "../../components/proposer/ProposerLayout";
import { cn } from "@/lib/utils";
import { uploadProposalAndProject, getAllRegions, validateFile } from "@/api/proposal";
import { getAllProjects, ApiProject } from "@/api/projectApi"; // Import project API

const STEPS = [
  { id: 1, title: "Detail Proposal" },
  { id: 2, title: "Unggah Dokumen" },
  { id: 3, title: "Selesai" },
];

// Interface untuk Region
interface Region {
  id: number;
  nama_region: string;
  kota: string;
}

export default function UploadProposal() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [provinces, setProvinces] = useState<Region[]>([]);
  const [projects, setProjects] = useState<ApiProject[]>([]); // State for projects
  const [selectedProject, setSelectedProject] = useState<string>(""); // State for selected project
  const [isLoadingProvinces, setIsLoadingProvinces] = useState(true);
  
  const [formData, setFormData] = useState({
    projectName: "",
    ethAmount: "",
    regionId: "",
    address: "",
    category: "",
    description: "",
  });
  
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [idrValue, setIdrValue] = useState<string>("");
  const [ethToIdrRate, setEthToIdrRate] = useState<number | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const documentInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // Load data provinsi saat komponen mount
  useEffect(() => {
    const loadProvinces = async () => {
      try {
        setIsLoadingProvinces(true);
        const data = await getAllRegions();
        console.log("Provinces loaded:", data);
        setProvinces(data);
      } catch (error: any) {
        console.error("Error loading provinces:", error);
        toast.error(error.message || "Gagal memuat data provinsi");
      } finally {
        setIsLoadingProvinces(false);
      }
    };

    loadProvinces();
  }, []);

  // Fetch Projects for Step 2
  useEffect(() => {
    if (currentStep === 2) {
      const fetchProjects = async () => {
        try {
          const projectData = await getAllProjects();
          // Filter projects based on the project name from step 1
          const filteredProjects = projectData.filter(p => p.judul.toLowerCase() === formData.projectName.toLowerCase());
          setProjects(filteredProjects);
        } catch (error) {
          console.error("Error fetching projects:", error);
          toast.error("Gagal memuat data proyek");
        }
      };
      fetchProjects();
    }
  }, [currentStep, formData.projectName]);

  // Fetch ETH to IDR rate
  useEffect(() => {
    const fetchEthPrice = async () => {
      try {
        const apiKey = import.meta.env.VITE_COINGECKO_API_KEY;
        let url = "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=idr";
        
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
        // Don't show error toast for price fetch, it's not critical
      }
    };
    
    fetchEthPrice();
  }, []);

  // Calculate IDR value when ETH amount changes
  useEffect(() => {
    if (formData.ethAmount && ethToIdrRate) {
      const amountInEth = parseFloat(formData.ethAmount);
      if (!isNaN(amountInEth) && amountInEth > 0) {
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
  }, [formData.ethAmount, ethToIdrRate]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fileType: "document" | "image"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    const validationError = validateFile(file, fileType === "document" ? "pdf" : "image");
    if (validationError) {
      toast.error(validationError);
      return;
    }

    if (fileType === "document") {
      setDocumentFile(file);
      toast.success("File proposal berhasil dipilih");
    } else {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      toast.success("Gambar berhasil dipilih");
    }

    // Clear validation error
    if (validationErrors[fileType]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fileType];
        return newErrors;
      });
    }
  };

  // Validation functions
  const validateStep1 = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.projectName.trim()) {
      errors.projectName = "Nama proyek wajib diisi";
    }

    if (!formData.ethAmount) {
      errors.ethAmount = "Jumlah dana wajib diisi";
    } else {
      const amount = parseFloat(formData.ethAmount);
      if (isNaN(amount) || amount <= 0) {
        errors.ethAmount = "Jumlah dana harus lebih dari 0";
      }
    }

    if (!formData.regionId) {
      errors.regionId = "Provinsi wajib dipilih";
    }

    if (!formData.address.trim()) {
      errors.address = "Alamat wajib diisi";
    }

    if (!formData.category) {
      errors.category = "Kategori proyek wajib dipilih";
    }

    if (!formData.description.trim()) {
      errors.description = "Deskripsi proyek wajib diisi";
    }

    if (!imageFile) {
      errors.image = "Foto proyek wajib diupload";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const errors: Record<string, string> = {};

    if (!documentFile) {
      errors.document = "File proposal wajib diupload";
    }
    
    if (!selectedProject) {
      errors.project = "Proyek yang diajukan wajib dipilih";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const goToNextStep = () => {
    if (currentStep === 1) {
      if (!validateStep1()) {
        toast.error("Harap lengkapi semua field yang diperlukan");
        return;
      }
    }
    
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep2()) {
      toast.error("Harap upload file proposal dan pilih proyek yang diajukan.");
      return;
    }

    if (!imageFile || !documentFile) {
      toast.error("File gambar dan proposal harus diupload");
      return;
    }

    setIsSubmitting(true);

    try {
      // Buat FormData sesuai dengan yang diharapkan backend
      const submitFormData = new FormData();
      
      // Data project
      submitFormData.append("judul", formData.projectName.trim());
      submitFormData.append("kategori", formData.category);
      submitFormData.append("deskripsi", formData.description.trim());
      submitFormData.append("budget", formData.ethAmount);
      submitFormData.append("alamat", formData.address.trim());
      
      // Region ID
      if (formData.regionId) {
        submitFormData.append("region_id", formData.regionId);
      }
      
      // Files
      submitFormData.append("gambar", imageFile);
      submitFormData.append("proposal", documentFile);
      // Selected Project ID
      submitFormData.append("project_id", selectedProject);

      console.log("Submitting form data:");
      for (let pair of submitFormData.entries()) {
        if (pair[1] instanceof File) {
          console.log(`${pair[0]}: File - ${pair[1].name}`);
        } else {
          console.log(`${pair[0]}: ${pair[1]}`);
        }
      }

      const response = await uploadProposalAndProject(submitFormData);
      
      console.log("Response:", response);
      
      if (response.success) {
        toast.success("Proposal berhasil diajukan! Menunggu review dari auditor.");
        goToNextStep();
      } else {
        throw new Error(response.message || "Gagal mengajukan proposal");
      }
      
    } catch (error: any) {
      console.error("Submit error:", error);
      toast.error(error.message || "Terjadi kesalahan saat mengirim proposal");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const resetForm = () => {
    setFormData({
      projectName: "",
      ethAmount: "",
      regionId: "",
      address: "",
      category: "",
      description: "",
    });
    setDocumentFile(null);
    setImageFile(null);
    setImagePreview(null);
    setIdrValue("");
    setValidationErrors({});
    setCurrentStep(1);
    setSelectedProject("");
  };

  const renderValidationError = (field: string) => {
    if (validationErrors[field]) {
      return (
        <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
          <AlertCircle className="w-4 h-4" />
          {validationErrors[field]}
        </p>
      );
    }
    return null;
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
            {currentStep === 1 && "Lengkapi Detail Proposal"}
            {currentStep === 2 && "Unggah Dokumen Pendukung"}
            {currentStep === 3 && "Pengajuan Berhasil"}
          </h1>
          <p className="text-muted-foreground text-center">
            {currentStep === 1 && "Pastikan semua data sudah benar sebelum melanjutkan."}
            {currentStep === 2 && "Unggah proposal dalam format PDF."}
            {currentStep === 3 && "Proposal Anda telah berhasil diajukan dan akan segera ditinjau."}
          </p>
        </div>

        <Card className="bg-gradient-card border-0 shadow-card">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Proposal Details & Image Upload */}
              {currentStep === 1 && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="projectName">
                      Nama Proyek <span className="text-red-500">*</span>
                    </Label>
                    <Input 
                      id="projectName" 
                      placeholder="Contoh: Pembangunan Jembatan Desa Sukamaju" 
                      value={formData.projectName} 
                      onChange={(e) => handleInputChange("projectName", e.target.value)} 
                      className={validationErrors.projectName ? "border-red-500" : ""}
                    />
                    {renderValidationError("projectName")}
                  </div>
                  
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="ethAmount">
                        Jumlah Dana (ETH) <span className="text-red-500">*</span>
                      </Label>
                      <div className="flex items-center gap-2">
                        <Input 
                          id="ethAmount" 
                          type="number" 
                          step="0.001" 
                          min="0.001"
                          placeholder="Contoh: 15" 
                          value={formData.ethAmount} 
                          onChange={(e) => handleInputChange("ethAmount", e.target.value)} 
                          className={cn("w-40", validationErrors.ethAmount ? "border-red-500" : "")}
                        />
                        <span className="text-sm text-muted-foreground whitespace-nowrap">
                          {idrValue ? `≈ ${idrValue}` : ethToIdrRate ? "≈ 0" : "Loading rate..."}
                        </span>
                      </div>
                      {renderValidationError("ethAmount")}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="category">
                        Kategori Proyek <span className="text-red-500">*</span>
                      </Label>
                      <Select 
                        value={formData.category} 
                        onValueChange={(value) => handleInputChange("category", value)}
                      >
                        <SelectTrigger className={validationErrors.category ? "border-red-500" : ""}>
                          <SelectValue placeholder="Pilih kategori proyek" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="infrastruktur">Infrastruktur</SelectItem>
                          <SelectItem value="pendidikan">Pendidikan</SelectItem>
                          <SelectItem value="kesehatan">Kesehatan</SelectItem>
                          <SelectItem value="pertahanan">Pertahanan</SelectItem>
                          <SelectItem value="ekonomi">Ekonomi</SelectItem>
                          <SelectItem value="lingkungan">Lingkungan</SelectItem>
                        </SelectContent>
                      </Select>
                      {renderValidationError("category")}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="region">
                      Provinsi <span className="text-red-500">*</span>
                    </Label>
                    <Select 
                      value={formData.regionId} 
                      onValueChange={(value) => handleInputChange("regionId", value)}
                      disabled={isLoadingProvinces}
                    >
                      <SelectTrigger className={validationErrors.regionId ? "border-red-500" : ""}>
                        <SelectValue 
                          placeholder={isLoadingProvinces ? "Memuat provinsi..." : "Pilih provinsi..."} 
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {provinces.map((province) => (
                          <SelectItem key={province.id} value={province.id.toString()}>
                            {province.nama_region}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {renderValidationError("regionId")}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">
                      Alamat <span className="text-red-500">*</span>
                    </Label>
                    <Input 
                      id="address" 
                      placeholder="Masukkan alamat lengkap proyek" 
                      value={formData.address} 
                      onChange={(e) => handleInputChange("address", e.target.value)} 
                      className={validationErrors.address ? "border-red-500" : ""}
                    />
                    {renderValidationError("address")}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">
                      Deskripsi Singkat Proyek <span className="text-red-500">*</span>
                    </Label>
                    <Textarea 
                      id="description" 
                      placeholder="Jelaskan secara singkat tujuan dan ruang lingkup proyek ini." 
                      value={formData.description} 
                      onChange={(e) => handleInputChange("description", e.target.value)} 
                      className={cn("min-h-[100px]", validationErrors.description ? "border-red-500" : "")}
                    />
                    {renderValidationError("description")}
                  </div>
                  
                  <div className="space-y-2">
                    <Label>
                      Foto Prediksi Proyek <span className="text-red-500">*</span>
                    </Label>
                    <Input 
                      id="image-upload" 
                      type="file" 
                      ref={imageInputRef} 
                      onChange={(e) => handleFileChange(e, "image")} 
                      accept="image/png,image/jpeg,image/jpg" 
                      className="hidden" 
                    />
                    <div 
                      onClick={() => imageInputRef.current?.click()} 
                      className={cn(
                        "border-2 border-dashed rounded-lg p-4 text-center bg-muted/30 hover:bg-muted/50 cursor-pointer h-48 flex items-center justify-center transition-colors",
                        validationErrors.image ? "border-red-500" : "border-border"
                      )}
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
                          <p className="text-xs text-muted-foreground mt-1">Maksimal 5MB</p>
                        </div>
                      )}
                    </div>
                    {renderValidationError("image")}
                  </div>
                </>
              )}

              {/* Step 2: PDF Upload */}
              {currentStep === 2 && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="project-select">
                      Proyek yang ingin diajukan <span className="text-red-500">*</span>
                    </Label>
                    <Select 
                      value={selectedProject} 
                      onValueChange={setSelectedProject}
                    >
                      <SelectTrigger className={validationErrors.project ? "border-red-500" : ""}>
                        <SelectValue placeholder="Pilih proyek yang akan diajukan" />
                      </SelectTrigger>
                      <SelectContent>
                        {projects.length > 0 ? (
                          projects.map((project) => (
                            <SelectItem key={project.id} value={project.id.toString()}>
                              {project.judul}
                            </SelectItem>
                          ))
                        ) : (
                          <div className="px-2 py-1.5 text-sm text-muted-foreground">
                            Tidak ada proyek yang sesuai.
                          </div>
                        )}
                      </SelectContent>
                    </Select>
                    {renderValidationError("project")}
                  </div>

                  <div className="space-y-2">
                    <Label>
                      Dokumen Proposal (PDF) <span className="text-red-500">*</span>
                    </Label>
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
                      className={cn(
                        "border-2 border-dashed rounded-lg p-12 text-center bg-muted/30 hover:bg-muted/50 cursor-pointer transition-colors",
                        validationErrors.document ? "border-red-500" : "border-border"
                      )}
                    >
                      {documentFile ? (
                        <div className="text-green-600 flex flex-col items-center gap-2">
                          <CheckCircle className="h-10 w-10" />
                          <p className="text-sm font-semibold">{documentFile.name}</p>
                          <span className="text-xs text-muted-foreground">
                            {(documentFile.size / (1024 * 1024)).toFixed(2)} MB
                          </span>
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
                    {renderValidationError("document")}
                  </div>
                </>
              )}


              {/* Step 3: Confirmation */}
              {currentStep === 3 && (
                <div className="text-center py-12">
                  <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6 animate-pulse" />
                  <h2 className="text-2xl font-bold text-green-600 mb-4">Proposal Berhasil Dikirim!</h2>
                  <p className="text-muted-foreground max-w-md mx-auto mb-6">
                    Proposal Anda telah berhasil dikirim dan sedang menunggu review dari auditor. 
                    Anda akan menerima notifikasi melalui email setelah proposal ditinjau.
                  </p>
                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      <strong>Apa selanjutnya?</strong><br />
                      • Tim auditor akan meninjau proposal Anda dalam 3-5 hari kerja<br />
                      • Anda dapat memantau status proposal di dashboard<br />
                      • Jika disetujui, pendanaan akan segera diproses
                    </p>
                  </div>
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
                  <div className="flex gap-3 mx-auto">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => navigate("/dashboard")}
                    >
                      Ke Dashboard
                    </Button>
                    <Button type="button" onClick={resetForm}>
                      Buat Proposal Baru
                    </Button>
                  </div>
                )}
                
                <div />
                
                {currentStep === 1 && (
                  <Button type="button" onClick={goToNextStep}>
                    Lanjut ke Step 2
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
                
                {currentStep === 2 && (
                  <Button type="submit" disabled={isSubmitting}>
                    <FileText className="h-4 w-4 mr-2" />
                    {isSubmitting ? "Mengajukan..." : "Ajukan Proposal"}
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