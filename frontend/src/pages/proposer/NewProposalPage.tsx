
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Upload, FileText, Image as ImageIcon, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ProposerLayout } from "../../components/proposer/ProposerLayout";

export default function UploadProposal() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    projectName: "",
    ethAmount: "",
    category: "",
    description: "",
  });
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Refs for hidden file inputs
  const documentInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'document' | 'image') => {
    const file = e.target.files?.[0];
    if (file) {
      if (fileType === 'document') {
        if (file.type === "application/pdf" && file.size <= 10 * 1024 * 1024) {
          setDocumentFile(file);
        } else {
          toast.error("File dokumen harus PDF dan maksimal 10MB.");
        }
      } else {
        if (["image/jpeg", "image/png"].includes(file.type) && file.size <= 5 * 1024 * 1024) {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!documentFile || !imageFile) {
        toast.error("Harap unggah dokumen proposal dan gambar prediksi.");
        return;
    }
    // Simulate proposal submission
    toast.success("Proposal berhasil diajukan! Menunggu review dari auditor.");
    navigate("/proposer/dashboard");
  };

  return (
    <ProposerLayout>
      <div className="max-w-4xl space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/proposer/dashboard")}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Dashboard
          </Button>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Buat Pengajuan Proposal Baru
          </h1>
          <p className="text-muted-foreground">
            Isi detail di bawah ini untuk mengajukan proposal pendanaan proyek. 
            Pastikan semua data sudah benar sebelum dikirim.
          </p>
        </div>

        <Card className="bg-gradient-card border-0 shadow-card">
          <CardHeader>
            <CardTitle className="text-xl text-foreground">Form Pengajuan Proposal</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="projectName" className="text-sm font-medium">
                  Nama Proyek
                </Label>
                <Input
                  id="projectName"
                  placeholder="Contoh: Pembangunan Jembatan Desa Sukamaju"
                  value={formData.projectName}
                  onChange={(e) => handleInputChange("projectName", e.target.value)}
                  className="bg-background"
                  required
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="ethAmount" className="text-sm font-medium">
                    Jumlah Dana (ETH)
                  </Label>
                  <Input
                    id="ethAmount"
                    type="number"
                    step="0.01"
                    placeholder="Contoh: 15"
                    value={formData.ethAmount}
                    onChange={(e) => handleInputChange("ethAmount", e.target.value)}
                    className="bg-background"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category" className="text-sm font-medium">
                    Kategori Proyek
                  </Label>
                  <Select onValueChange={(value) => handleInputChange("category", value)} required>
                    <SelectTrigger className="bg-background">
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

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">
                  Deskripsi Singkat Proyek
                </Label>
                <Textarea
                  id="description"
                  placeholder="Jelaskan secara singkat tujuan dan ruang lingkup proyek ini."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className="bg-background min-h-[100px]"
                  required
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {/* Document Upload */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Dokumen Proposal (PDF)</Label>
                  <Input
                    id="document-upload"
                    type="file"
                    ref={documentInputRef}
                    onChange={(e) => handleFileChange(e, 'document')}
                    accept=".pdf"
                    className="hidden"
                  />
                  <div 
                    onClick={() => documentInputRef.current?.click()}
                    className="border-2 border-dashed border-border rounded-lg p-8 text-center bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    {documentFile ? (
                      <div className="flex flex-col items-center text-green-600">
                        <CheckCircle className="h-8 w-8 mx-auto mb-2" />
                        <p className="text-sm font-semibold">{documentFile.name}</p>
                        <p className="text-xs text-muted-foreground">Klik untuk mengganti file</p>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm font-medium text-foreground mb-1">
                          Pilih file untuk di-upload
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Hanya format PDF, maksimal 10MB.
                        </p>
                      </>
                    )}
                  </div>
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Foto Prediksi Proyek Selesai
                  </Label>
                   <Input
                    id="image-upload"
                    type="file"
                    ref={imageInputRef}
                    onChange={(e) => handleFileChange(e, 'image')}
                    accept="image/png, image/jpeg"
                    className="hidden"
                  />
                  <div 
                    onClick={() => imageInputRef.current?.click()}
                    className="border-2 border-dashed border-border rounded-lg p-4 text-center bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer h-full flex items-center justify-center"
                  >
                    {imagePreview ? (
                        <div className="relative w-full h-full">
                            <img src={imagePreview} alt="Preview Proyek" className="w-full h-full object-cover rounded-md" />
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                <p className="text-white text-sm font-medium">Ganti Gambar</p>
                            </div>
                        </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <ImageIcon className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm font-medium text-foreground mb-1">
                          Upload gambar prediksi
                        </p>
                        <p className="text-xs text-muted-foreground">
                          JPG, PNG hingga 5MB
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-6">
                <Button 
                  type="submit" 
                  className="bg-gradient-primary hover:opacity-90 shadow-glow px-8"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Ajukan Proposal
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </ProposerLayout>
  );
}