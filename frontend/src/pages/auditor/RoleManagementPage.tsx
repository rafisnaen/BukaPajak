import { OwnerLayout } from "@/components/owner/OwnerLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Save, UserPlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// Halaman untuk mengelola alamat Auditor dan Verifier.
const RoleManagementPage = () => {

    // Data ini nantinya akan diambil dari smart contract
    const [currentAuditor, setCurrentAuditor] = useState("0xFaBB1D2993baaCac9fF2564e3E625170f960f6De");
    const [currentVerifiers, setCurrentVerifiers] = useState([
        "0xe4E6E2b4A312ADe2A0eA8F12c3392b7114b13E58",
    ]);

    const [newAuditor, setNewAuditor] = useState("");
    const [newVerifier, setNewVerifier] = useState("");

    // TODO: Implementasikan fungsi handle untuk memanggil smart contract
    const handleSetAuditor = () => {
        if (!/^0x[a-fA-F0-9]{40}$/.test(newAuditor)) {
            toast.error("Alamat Auditor baru tidak valid.", {
                description: "Harap masukkan alamat wallet Ethereum yang benar.",
            });
            return;
        }
        toast.success("Alamat Auditor Berhasil Diperbarui!", {
            description: `(Simulasi) Auditor baru: ${newAuditor.substring(0,10)}...`
        });
        // Panggil backend -> panggil fungsi setAuditor(newAuditor)
    };
    
    const handleSetVerifier = () => {
        if (!/^0x[a-fA-F0-9]{40}$/.test(newVerifier)) {
            toast.error("Alamat Verifier baru tidak valid.", {
                description: "Harap masukkan alamat wallet Ethereum yang benar.",
            });
            return;
        }
        toast.success("Verifier Baru Berhasil Ditambahkan!", {
            description: `(Simulasi) Verifier baru: ${newVerifier.substring(0,10)}...`
        });
         // Panggil backend -> panggil fungsi setVerifier(newVerifier, true)
    };
    
    const copyToClipboard = (address: string) => {
        navigator.clipboard.writeText(address).then(() => {
            toast.info("Alamat berhasil disalin ke clipboard!");
        }).catch(err => {
            console.error('Gagal menyalin alamat: ', err);
            toast.error("Gagal menyalin alamat.");
        });
    };

    return (
        <OwnerLayout>
            <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Manajemen Peran Sistem</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* --- KARTU AUDITOR --- */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Peran Auditor</CardTitle>
                            <CardDescription>Mengatur alamat wallet yang berwenang untuk menyetujui proposal.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label className="text-xs text-muted-foreground">Auditor Aktif Saat Ini</Label>
                                <div className="flex items-center justify-between p-3 bg-slate-100 rounded-md">
                                    <code className="text-sm">{currentAuditor}</code>
                                    <Button variant="ghost" size="icon" onClick={() => copyToClipboard(currentAuditor)}>
                                        <Copy className="h-4 w-4"/>
                                    </Button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="new-auditor">Ganti Alamat Auditor</Label>
                                <div className="flex space-x-2">
                                    <Input id="new-auditor" placeholder="0x..." value={newAuditor} onChange={e => setNewAuditor(e.target.value)} />
                                    <Button onClick={handleSetAuditor}>
                                        <Save className="mr-2 h-4 w-4"/> Simpan
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* --- KARTU VERIFIER --- */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Peran Verifier</CardTitle>
                            <CardDescription>Mengatur alamat wallet (server backend) yang berwenang memverifikasi proposal via AI.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <div>
                                <Label className="text-xs text-muted-foreground">Daftar Verifier Aktif</Label>
                                <div className="space-y-2 mt-1">
                                    {currentVerifiers.map((verifier, index) => (
                                         <div key={index} className="flex items-center justify-between p-3 bg-slate-100 rounded-md">
                                            <code className="text-sm">{verifier}</code>
                                            <Button variant="ghost" size="icon" onClick={() => copyToClipboard(verifier)}>
                                                <Copy className="h-4 w-4"/>
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="new-verifier">Tambah Alamat Verifier Baru</Label>
                                <div className="flex space-x-2">
                                    <Input id="new-verifier" placeholder="0x..." value={newVerifier} onChange={e => setNewVerifier(e.target.value)} />
                                    <Button onClick={handleSetVerifier}>
                                        <UserPlus className="mr-2 h-4 w-4"/> Tambah
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </OwnerLayout>
    );
};

export default RoleManagementPage;