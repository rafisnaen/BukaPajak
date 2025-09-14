import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { UploadCloud, Loader2 } from "lucide-react";

// Ini adalah komponen form interaktif.
export const NewProposalForm = () => {
    const [projectName, setProjectName] = useState("");
    const [amount, setAmount] = useState("");
    const [projectType, setProjectType] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Validasi sederhana
        if (!projectName || !amount || !projectType || !description || !file) {
            alert("Harap isi semua kolom dan upload dokumen proposal.");
            setIsLoading(false);
            return;
        }

        console.log({
            projectName,
            amount,
            projectType,
            description,
            fileName: file.name,
        });

        // --- LANGKAH SELANJUTNYA ADA DI SINI ---
        // 1. Panggil API backend untuk upload file ke IPFS.
        // const ipfsHash = await uploadToIpfs(file);

        // 2. Tampilkan pop-up MetaMask untuk menandatangani transaksi.
        // await submitToSmartContract(ipfsHash, amount, projectType, description);
        
        // Simulasi proses
        setTimeout(() => {
            alert("Proposal berhasil diajukan! (Simulasi)");
            setIsLoading(false);
            // TODO: Arahkan pengguna kembali ke dashboard setelah berhasil.
        }, 2000);
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
                            <SelectItem value="0">Infrastruktur</SelectItem>
                            <SelectItem value="1">Pendidikan</SelectItem>
                            <SelectItem value="2">Kesehatan</SelectItem>
                            <SelectItem value="3">Pertahanan</SelectItem>
                            <SelectItem value="4">Lainnya</SelectItem>
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

            {/* Upload Dokumen */}
            <div className="space-y-2">
                <Label htmlFor="file-upload" className="text-lg font-semibold">Dokumen Proposal (PDF)</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                    <Label htmlFor="file-upload" className="mt-2 block text-sm font-medium text-primary cursor-pointer">
                        {file ? `File terpilih: ${file.name}` : "Pilih file untuk di-upload"}
                    </Label>
                    <Input 
                        id="file-upload" 
                        type="file" 
                        className="sr-only" 
                        onChange={(e) => e.target.files && setFile(e.target.files[0])}
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
