// src/pages/proposer/NewProposalPage.tsx

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
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ProposerLayout } from "../../components/proposer/ProposerLayout";
import { cn } from "@/lib/utils";
import { provinces } from "@/data/provinces";

const STEPS = [
  { id: 1, title: "Detail Proposal" },
  { id: 2, title: "Unggah Dokumen" },
  { id: 3, title: "Selesai" },
];

export default function UploadProposal() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    projectName: "",
    ethAmount: "",
    region: "",
    category: "",
    description: "",
  });
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [idrValue, setIdrValue] = useState<string>("");
  const [ethToIdrRate, setEthToIdrRate] = useState<number | null>(null);

  const documentInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

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
    if (formData.ethAmount && ethToIdrRate) {
      const amountInEth = parseFloat(formData.ethAmount);
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
  }, [formData.ethAmount, ethToIdrRate]);

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
        } else {
          toast.error("File gambar harus JPG/PNG dan maksimal 5MB.");
        }
      }
    }
  };

  const isStep1Valid =
    formData.projectName &&
    formData.ethAmount &&
    formData.region &&
    formData.category &&
    formData.description &&
    imageFile; // <-- Validasi gambar dipindah ke sini

  const isStep2Valid = documentFile; // <-- Validasi gambar dihapus dari sini

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStep2Valid) {
      toast.error("Harap unggah dokumen proposal.");
      return;
    }
    console.log("Submitting proposal...", { formData, documentFile, imageFile });
    setTimeout(() => {
      toast.success("Proposal berhasil diajukan! Menunggu review dari auditor.");
      goToNextStep();
    }, 1000);
  };
  
  const resetForm = () => {
    setFormData({
        projectName: "",
        ethAmount: "",
        region: "",
        category: "",
        description: "",
    });
    setDocumentFile(null);
    setImageFile(null);
    setImagePreview(null);
    setIdrValue("");
    setCurrentStep(1);
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
                    <Label htmlFor="projectName">Nama Proyek</Label>
                    <Input id="projectName" placeholder="Contoh: Pembangunan Jembatan Desa Sukamaju" value={formData.projectName} onChange={(e) => handleInputChange("projectName", e.target.value)} required />
                  </div>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="ethAmount">Jumlah Dana (ETH)</Label>
                      <div className="flex items-center gap-2">
                        <Input id="ethAmount" type="number" step="0.01" placeholder="Contoh: 15" value={formData.ethAmount} onChange={(e) => handleInputChange("ethAmount", e.target.value)} className="w-40" required />
                        <span className="text-sm text-muted-foreground whitespace-nowrap">{idrValue ? `≈ ${idrValue}` : "≈ 0"}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Kategori Proyek</Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)} required>
                        <SelectTrigger><SelectValue placeholder="Pilih kategori proyek" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="infrastruktur">Infrastruktur</SelectItem>
                          <SelectItem value="pendidikan">Pendidikan</SelectItem>
                          <SelectItem value="kesehatan">Kesehatan</SelectItem>
                          <SelectItem value="pertahanan">Pertahanan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="region">Region</Label>
                    <Select value={formData.region} onValueChange={(value) => handleInputChange("region", value)} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih provinsi..." />
                      </SelectTrigger>
                      <SelectContent>
                        {provinces.map((province) => (
                          <SelectItem key={province.id} value={province.name}>
                            {province.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Deskripsi Singkat Proyek</Label>
                    <Textarea id="description" placeholder="Jelaskan secara singkat tujuan dan ruang lingkup proyek ini." value={formData.description} onChange={(e) => handleInputChange("description", e.target.value)} className="min-h-[100px]" required />
                  </div>
                   {/* <-- FUNGSI UNGGAH GAMBAR PINDAH KE SINI --> */}
                  <div className="space-y-2">
                    <Label>Foto Prediksi Proyek</Label>
                    <Input id="image-upload" type="file" ref={imageInputRef} onChange={(e) => handleFileChange(e, "image")} accept="image/png, image/jpeg" className="hidden" />
                    <div onClick={() => imageInputRef.current?.click()} className="border-2 border-dashed rounded-lg p-4 text-center bg-muted/30 hover:bg-muted/50 cursor-pointer h-48 flex items-center justify-center">
                      {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="max-h-full max-w-full object-contain rounded-md" />
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
                <div className="space-y-2">
                    <Label>Dokumen Proposal (PDF)</Label>
                    <Input id="document-upload" type="file" ref={documentInputRef} onChange={(e) => handleFileChange(e, "document")} accept=".pdf" className="hidden" />
                    <div onClick={() => documentInputRef.current?.click()} className="border-2 border-dashed rounded-lg p-12 text-center bg-muted/30 hover:bg-muted/50 cursor-pointer">
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
                  <Button type="button" variant="outline" onClick={resetForm} className="mx-auto">
                    Buat Proposal Baru
                  </Button>
                )}
                <div/>
                {currentStep === 1 && (
                  <Button type="button" onClick={goToNextStep} disabled={!isStep1Valid}>
                    Lanjut ke Step 2
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
                {currentStep === 2 && (
                  <Button type="submit" disabled={!isStep2Valid}>
                    <FileText className="h-4 w-4 mr-2" />
                    Ajukan Proposal
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