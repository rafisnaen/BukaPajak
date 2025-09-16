// src/pages/proposer/UpdateProgressPage.tsx
import { useState, useRef } from "react";
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
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Upload, Image as ImageIcon, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ProposerLayout } from "@/components/proposer/ProposerLayout";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";

export default function UpdateProgressPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    provinsi: "",
    kota: "",
    kecamatan: "",
    tingkatAdministrasi: "",
    namaProyek: "",
    keterangan: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [tanggalPengerjaan, setTanggalPengerjaan] = useState<Date | undefined>(new Date());
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
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
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      toast.error("Harap unggah gambar proyek.");
      return;
    }
    toast.success("Progress proyek berhasil diperbarui!");
    navigate("/proposer/dashboard");
  };

  return (
    <ProposerLayout>
      <div className="max-w-4xl space-y-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali
        </Button>

        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Update Progress Proyek
          </h1>
          <p className="text-muted-foreground">
            Lengkapi form di bawah untuk memperbarui progress pengerjaan proyek kepada publik.
          </p>
        </div>

        <Card className="bg-gradient-card border-0 shadow-card">
          <CardHeader>
            <CardTitle className="text-xl text-foreground">
              Form Update Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Dropdown Tingkat Administrasi */}
              <div className="space-y-2">
                  <Label>Tingkat Administrasi Pengerjaan</Label>
                  <Select onValueChange={(value) => handleInputChange("tingkatAdministrasi", value)} required>
                      <SelectTrigger>
                          <SelectValue placeholder="Pilih tingkat administrasi" />
                      </SelectTrigger>
                      <SelectContent>
                          <SelectItem value="provinsi">Provinsi</SelectItem>
                          <SelectItem value="kota/kabupaten">Kota/Kabupaten</SelectItem>
                          <SelectItem value="kecamatan">Kecamatan</SelectItem>
                      </SelectContent>
                  </Select>
              </div>

              {/* Input Lokasi Dinamis */}
              {formData.tingkatAdministrasi && (
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="provinsi">Provinsi</Label>
                        <Input id="provinsi" placeholder="Contoh: DKI Jakarta" value={formData.provinsi} onChange={(e) => handleInputChange("provinsi", e.target.value)} required />
                    </div>

                    {(formData.tingkatAdministrasi === 'kota/kabupaten' || formData.tingkatAdministrasi === 'kecamatan') && (
                        <div className="space-y-2">
                            <Label htmlFor="kota">Kota/Kabupaten</Label>
                            <Input id="kota" placeholder="Contoh: Jakarta Selatan" value={formData.kota} onChange={(e) => handleInputChange("kota", e.target.value)} required />
                        </div>
                    )}

                    {formData.tingkatAdministrasi === 'kecamatan' && (
                        <div className="space-y-2">
                            <Label htmlFor="kecamatan">Kecamatan</Label>
                            <Input id="kecamatan" placeholder="Contoh: Tebet" value={formData.kecamatan} onChange={(e) => handleInputChange("kecamatan", e.target.value)} required />
                        </div>
                    )}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="namaProyek">Nama Proyek</Label>
                <Input id="namaProyek" placeholder="Contoh: Pembangunan Jembatan Tebet" value={formData.namaProyek} onChange={(e) => handleInputChange("namaProyek", e.target.value)} required />
              </div>

              <div className="space-y-2">
                  <Label>Upload Gambar Proyek</Label>
                  <Input id="image-upload" type="file" ref={imageInputRef} onChange={handleFileChange} accept="image/png, image/jpeg" className="hidden" />
                  <div onClick={() => imageInputRef.current?.click()} className="border-2 border-dashed border-border rounded-lg p-8 text-center bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer">
                      {imagePreview ? (
                          <img src={imagePreview} alt="Preview Proyek" className="max-h-48 mx-auto rounded-md" />
                      ) : (
                          <>
                              <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                              <p className="text-sm font-medium text-foreground mb-1">Pilih gambar untuk di-upload</p>
                              <p className="text-xs text-muted-foreground">JPG, PNG hingga 5MB</p>
                          </>
                      )}
                  </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="keterangan">Keterangan</Label>
                <Textarea id="keterangan" placeholder="Contoh: Pemasangan tiang pancang jembatan telah selesai." value={formData.keterangan} onChange={(e) => handleInputChange("keterangan", e.target.value)} required />
              </div>

              <div className="space-y-2">
                <Label>Tanggal Pengerjaan</Label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant={"outline"} className="w-full justify-start text-left font-normal">
                            <Calendar className="mr-2 h-4 w-4" />
                            {tanggalPengerjaan ? format(tanggalPengerjaan, "PPP") : <span>Pilih tanggal</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <CalendarComponent mode="single" selected={tanggalPengerjaan} onSelect={setTanggalPengerjaan} initialFocus />
                    </PopoverContent>
                </Popover>
              </div>

              <div className="flex justify-end pt-4">
                <Button type="submit">Submit Progress</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </ProposerLayout>
  );
}