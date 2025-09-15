import { AuditorLayout } from "@/components/auditor/AuditorLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Check, Download, Info, X } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";

// Data ini nantinya akan diambil dari API berdasarkan ID di URL
const mockProposalDetail = {
    id: '2', 
    title: 'Perbaikan Jalan Utama Rawa Belong', 
    amount: 15, 
    submissionDate: '1 September 2025', 
    proposer: 'Dinas PU DKI Jakarta',
    proposerWallet: '0x3B921248c937D100d566Cf78d115eb9612bc7d14',
    projectType: 'Infrastruktur',
    description: 'Proyek ini bertujuan untuk melakukan pengaspalan ulang jalan utama di daerah Rawa Belong sepanjang 2km yang saat ini dalam kondisi rusak berat. Pengaspalan akan menggunakan material kualitas tinggi untuk memastikan daya tahan jalan hingga 10 tahun ke depan. Dana akan digunakan untuk material, alat berat, dan tenaga kerja.',
    ipfsHash: 'QmXyZAbc...', // Hash IPFS dari dokumen proposal
};


const AuditorReviewPage = () => {
    const { proposalId } = useParams();
    const [isRejectModalOpen, setRejectModalOpen] = useState(false);
    const [rejectionReason, setRejectionReason] = useState("");

    const handleApprove = () => {
        toast.success(`Proposal #${proposalId} disetujui!`, {
            description: "Status proposal telah diperbarui dan notifikasi dikirim ke pengusul.",
        });
        // Panggil API backend untuk memicu transaksi 'approveProposal'
    };

    const handleRejectSubmit = () => {
        if (!rejectionReason.trim()) {
            toast.error("Alasan penolakan tidak boleh kosong.");
            return;
        }
        
        toast.info(`Proposal #${proposalId} ditolak.`, {
            description: `Alasan: ${rejectionReason}`,
        });
        // Panggil API backend untuk memicu transaksi 'rejectProposal'
        
        setRejectModalOpen(false);
        setRejectionReason("");
    };

    return (
        <AuditorLayout>
            <div>
                {/* Navigasi Kembali */}
                <Link to="/auditor/dashboard" className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 mb-6">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Kembali ke Antrian Review
                </Link>

                {/* Header Halaman */}
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">{mockProposalDetail.title}</h1>
                        <p className="text-gray-500 mt-1">Diajukan oleh: {mockProposalDetail.proposer}</p>
                    </div>
                    <Badge variant="outline">Menunggu Review</Badge>
                </div>

                {/* Tombol Aksi Utama */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Tindakan Audit</CardTitle>
                        <CardDescription>Setelah mereview semua detail, berikan persetujuan atau penolakan.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex space-x-4">
                        <Button onClick={handleApprove} className="bg-green-600 hover:bg-green-700">
                            <Check className="mr-2 h-4 w-4" />
                            Approve Proposal
                        </Button>
                        <Button onClick={() => setRejectModalOpen(true)} variant="destructive">
                            <X className="mr-2 h-4 w-4" />
                            Reject Proposal
                        </Button>
                    </CardContent>
                </Card>

                {/* Detail Proposal */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                        <Card>
                            <CardHeader><CardTitle>Deskripsi Proyek</CardTitle></CardHeader>
                            <CardContent>
                                <p className="text-gray-700 leading-relaxed">{mockProposalDetail.description}</p>
                            </CardContent>
                        </Card>
                    </div>
                    <div>
                        <Card>
                            <CardHeader><CardTitle>Informasi Kunci</CardTitle></CardHeader>
                            <CardContent className="space-y-4 text-sm">
                                <InfoItem label="Jumlah Dana" value={`${mockProposalDetail.amount} ETH`} />
                                <InfoItem label="Kategori" value={mockProposalDetail.projectType} />
                                <InfoItem label="Tanggal Pengajuan" value={mockProposalDetail.submissionDate} />
                                <InfoItem label="Wallet Pengusul" value={`${mockProposalDetail.proposerWallet.substring(0,10)}...`} isMono/>
                                <Button className="w-full mt-4" variant="outline" asChild>
                                    <a href={`https://ipfs.io/ipfs/${mockProposalDetail.ipfsHash}`} target="_blank" rel="noopener noreferrer">
                                        <Download className="mr-2 h-4 w-4"/>
                                        Lihat Dokumen Proposal (IPFS)
                                    </a>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Dialog untuk Alasan Penolakan */}
            <Dialog open={isRejectModalOpen} onOpenChange={setRejectModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Konfirmasi Penolakan Proposal</DialogTitle>
                        <DialogDescription>
                            Harap berikan alasan yang jelas mengapa proposal ini ditolak. Alasan ini akan dikirimkan kepada pengusul.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-2">
                        <Label htmlFor="rejection-reason" className="sr-only">Alasan Penolakan</Label>
                        <Textarea
                            id="rejection-reason"
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                            placeholder="Contoh: Anggaran tidak realistis, deskripsi proyek kurang detail, dll."
                            className="min-h-[120px]"
                        />
                    </div>
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setRejectModalOpen(false)}>Batal</Button>
                        <Button variant="destructive" onClick={handleRejectSubmit}>Kirim Penolakan</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AuditorLayout>
    );
};

// Komponen kecil untuk menampilkan item info
const InfoItem = ({ label, value, isMono = false }: { label: string, value: string, isMono?: boolean }) => (
    <div className="flex justify-between">
        <span className="text-muted-foreground">{label}</span>
        <span className={`font-semibold ${isMono ? 'font-mono' : ''}`}>{value}</span>
    </div>
);

export default AuditorReviewPage;