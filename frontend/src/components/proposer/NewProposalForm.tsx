import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { UploadCloud, Loader2 } from "lucide-react";
import { uploadProposalAndProject } from "@/api/proposal";
import { toast } from "sonner"; // ✅ pakai sonner untuk notifikasi
import { useNavigate } from "react-router-dom"; // ✅ untuk redirect

export const NewProposalForm = () => {
    const [projectName, setProjectName] = useState("");
    const [amount, setAmount] = useState("");
    const [projectType, setProjectType] = useState("");
    const [description, setDescription] = useState("");
    const [proposalFile, setProposalFile] = useState<File | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!proposalFile || !imageFile) {
            toast.error("Harap unggah dokumen proposal dan gambar proyek.");
            return;
        }

        try {
            setIsLoading(true);

            const data = new FormData();
            data.append("judul", projectName);
            data.append("kategori", projectType);
            data.append("deskripsi", description);
            data.append("budget", amount);
            data.append("region_id", "1"); // sementara default, bisa dihubungkan ke dropdown region
            data.append("gambar", imageFile);
            data.append("proposal", proposalFile);

            await uploadProposalAndProject(data);

            toast.success("Proposal berhasil diajukan! Menunggu review dari auditor.");
            navigate("/proposer/dashboard");
        } catch (error) {
            console.error(error);
            toast.error("Gagal mengajukan proposal, coba lagi.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-8 border rounded-lg shadow-sm space-y-6">
            {/* Nama Proyek */}
            <div className="space-y-2">
                <Label htmlFor="project-name" className="text-lg font-semibold">Nama Proyek</Label>
                <Input
                    id="project-name"
                    placeholder="Contoh: Pembangunan Jembatan Desa Sukamaju"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    required
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Jumlah Dana */}
                <div className="space-y-2">
                    <Label htmlFor="amount" className="text-lg font-semibold">Jumlah Dana (ETH)</Label>
                    <Input
                        id="amount"
                        type="number"
                        placeholder="Contoh: 15"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                        min="0.001"
                        step="0.001"
                    />
                </div>
                {/* Kategori Proyek */}
                <div className="space-y-2">
                    <Label className="text-lg font-semibold">Kategori Proyek</Label>
                    <Select onValueChange={setProjectType} required>
                        <SelectTrigger>
                            <SelectValue placeholder="Pilih kategori proyek" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="infrastruktur">Infrastruktur</SelectItem>
                            <SelectItem value="pendidikan">Pendidikan</SelectItem>
                            <SelectItem value="kesehatan">Kesehatan</SelectItem>
                            <SelectItem value="pertahanan">Pertahanan</SelectItem>
                            <SelectItem value="lainnya">Lainnya</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Deskripsi */}
            <div className="space-y-2">
                <Label htmlFor="description" className="text-lg font-semibold">Deskripsi Singkat</Label>
                <Textarea
                    id="description"
                    placeholder="Jelaskan secara singkat tujuan dan ruang lingkup proyek ini."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    rows={4}
                />
            </div>

            {/* Upload Gambar */}
            <div className="space-y-2">
                <Label htmlFor="image-upload" className="text-lg font-semibold">Gambar Proyek</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                    <Label htmlFor="image-upload" className="mt-2 block text-sm font-medium text-primary cursor-pointer">
                        {imageFile ? `File terpilih: ${imageFile.name}` : "Pilih gambar proyek"}
                    </Label>
                    <Input
                        id="image-upload"
                        type="file"
                        className="sr-only"
                        onChange={(e) => e.target.files && setImageFile(e.target.files[0])}
                        accept="image/*"
                    />
                </div>
            </div>

            {/* Upload Proposal */}
            <div className="space-y-2">
                <Label htmlFor="file-upload" className="text-lg font-semibold">Dokumen Proposal (PDF)</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                    <Label htmlFor="file-upload" className="mt-2 block text-sm font-medium text-primary cursor-pointer">
                        {proposalFile ? `File terpilih: ${proposalFile.name}` : "Pilih file untuk di-upload"}
                    </Label>
                    <Input
                        id="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={(e) => e.target.files && setProposalFile(e.target.files[0])}
                        accept=".pdf"
                    />
                    <p className="mt-1 text-xs text-gray-500">Hanya format PDF, maksimal 10MB.</p>
                </div>
            </div>

            {/* Tombol Submit */}
            <div className="pt-4 flex justify-end">
                <Button type="submit" size="lg" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isLoading ? "Mengajukan..." : "Ajukan Proposal"}
                </Button>
            </div>
        </form>
    );
};
