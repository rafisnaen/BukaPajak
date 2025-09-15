import { AuditorLayout } from "@/components/auditor/AuditorLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ArrowLeft, Download, XCircle } from "lucide-react";
import { Link, useParams } from "react-router-dom";

// Data ini nantinya akan diambil dari API berdasarkan ID
const mockReviewedProposals = [
    { id: '1', title: 'Pembangunan Jembatan Desa Sukamaju', status: 'Approved', reviewDate: '14/09/2025', proposer: 'Dinas PU DKI Jakarta', amount: 5, submissionDate: '10/09/2025', projectType: 'Infrastruktur', description: 'Proyek pembangunan jembatan untuk menghubungkan desa dengan jalan utama.', ipfsHash: 'Qm...', proposerWallet: '0x3B92...bc7d14' },
    { id: '4', title: 'Pengadaan Alat Kesehatan Puskesmas', status: 'Rejected', reviewDate: '13/09/2025', proposer: 'Dinkes Tangsel', rejectionReason: 'Anggaran yang diajukan tidak realistis dan melebihi standar harga pasar.', amount: 12, submissionDate: '09/09/2025', projectType: 'Kesehatan', description: 'Pengadaan alat-alat kesehatan modern untuk meningkatkan kualitas pelayanan.', ipfsHash: 'Qm...', proposerWallet: '0x4C8d...fe3a41' },
    { id: '6', title: 'Renovasi Stadion Mini', status: 'Approved', reviewDate: '12/09/2025', proposer: 'Dispora Jakbar', amount: 20, submissionDate: '08/09/2025', projectType: 'Infrastruktur', description: 'Renovasi fasilitas stadion untuk mendukung kegiatan olahraga masyarakat.', ipfsHash: 'Qm...', proposerWallet: '0x9A2c...de5b23' },
];

const AuditorHistoryDetailPage = () => {
    const { proposalId } = useParams();
    const proposal = mockReviewedProposals.find(p => p.id === proposalId);

    if (!proposal) {
        return (
            <AuditorLayout>
                <div className="text-center">
                    <h2 className="text-xl font-semibold">Proposal Tidak Ditemukan</h2>
                    <Link to="/auditor/history">
                        <Button variant="outline" className="mt-4">Kembali ke Riwayat</Button>
                    </Link>
                </div>
            </AuditorLayout>
        );
    }

    return (
        <AuditorLayout>
            <div>
                 <Link to="/auditor/history" className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 mb-6">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Kembali ke Riwayat Review
                </Link>

                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">{proposal.title}</h1>
                        <p className="text-gray-500 mt-1">Diajukan oleh: {proposal.proposer}</p>
                    </div>
                    {/* PERBAIKAN: Menggunakan ternary operator langsung untuk variant */}
                    <Badge variant={proposal.status === 'Approved' ? 'default' : 'destructive'}>
                        {proposal.status === 'Approved' ? 'Disetujui' : 'Ditolak'}
                    </Badge>
                </div>

                {proposal.status === 'Rejected' && (
                    <Alert variant="destructive" className="mb-6">
                        <XCircle className="h-4 w-4" />
                        <AlertTitle>Alasan Penolakan</AlertTitle>
                        <AlertDescription>
                            {proposal.rejectionReason}
                        </AlertDescription>
                    </Alert>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                        <Card>
                            <CardHeader><CardTitle>Deskripsi Proyek</CardTitle></CardHeader>
                            <CardContent>
                                <p className="text-gray-700 leading-relaxed">{proposal.description}</p>
                            </CardContent>
                        </Card>
                    </div>
                    <div>
                        <Card>
                            <CardHeader><CardTitle>Informasi Kunci</CardTitle></CardHeader>
                            <CardContent className="space-y-4 text-sm">
                                <InfoItem label="Jumlah Dana" value={`${proposal.amount} ETH`} />
                                <InfoItem label="Kategori" value={proposal.projectType} />
                                <InfoItem label="Tanggal Pengajuan" value={proposal.submissionDate} />
                                <InfoItem label="Tanggal Direview" value={proposal.reviewDate} />
                                <InfoItem label="Wallet Pengusul" value={`${proposal.proposerWallet.substring(0,10)}...`} isMono/>
                                <Button className="w-full mt-4" variant="outline" asChild>
                                    <a href={`https://ipfs.io/ipfs/${proposal.ipfsHash}`} target="_blank" rel="noopener noreferrer">
                                        <Download className="mr-2 h-4 w-4"/>
                                        Lihat Dokumen Proposal (IPFS)
                                    </a>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AuditorLayout>
    );
};

const InfoItem = ({ label, value, isMono = false }: { label: string, value: string, isMono?: boolean }) => (
    <div className="flex justify-between">
        <span className="text-muted-foreground">{label}</span>
        <span className={`font-semibold ${isMono ? 'font-mono' : ''}`}>{value}</span>
    </div>
);


export default AuditorHistoryDetailPage;