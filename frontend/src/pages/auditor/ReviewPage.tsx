// src/pages/auditor/ReviewPage.tsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  AlertCircle, 
  ArrowLeft, 
  Download, 
  Loader2, 
  FileText,
  Calendar,
  MapPin,
  User,
  DollarSign,
  FolderOpen,
  CheckCircle2,
  XCircle,
  Clock,
  ExternalLink,
  Building2
} from "lucide-react";
import { toast } from "sonner";
import { getProposalWithDetails, Proposal } from "@/api/proposal";
import { formatLongDate } from "@/utils/dateFormatter";

const AuditorReviewPage = () => {
  const { id } = useParams<{ id: string }>();
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProposalData = async () => {
      if (!id) {
        setError("ID proposal tidak ditemukan");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const proposalData = await getProposalWithDetails(Number(id));
        console.log("Fetched proposal data:", proposalData);
        setProposal(proposalData);
      } catch (error: any) {
        console.error("Error fetching proposal:", error);
        const errorMessage =
          error.response?.data?.error ||
          error.response?.data?.message ||
          error.message ||
          "Gagal memuat data proposal";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProposalData();
  }, [id]);

  const handleDownload = () => {
    if (proposal?.file_url) {
      window.open(proposal.file_url, "_blank");
      toast.success("Membuka file proposal...");
    } else {
      toast.error("File URL tidak tersedia");
    }
  };

  const handleApprove = () => {
    toast.success("Proposal telah disetujui!");
  };

  const handleReject = () => {
    toast.error("Proposal telah ditolak!");
  };

  const getStatusConfig = (status: string) => {
    switch (status.toLowerCase()) {
      case "disetujui":
        return {
          variant: "default" as const,
          text: "Disetujui",
          icon: CheckCircle2,
          className: "bg-emerald-100 text-emerald-800 border-emerald-300"
        };
      case "ditolak":
        return {
          variant: "destructive" as const,
          text: "Ditolak",
          icon: XCircle,
          className: "bg-red-100 text-red-800 border-red-300"
        };
      case "menunggu":
        return {
          variant: "secondary" as const,
          text: "Menunggu Review",
          icon: Clock,
          className: "bg-amber-50 text-amber-800 border-amber-300"
        };
      default:
        return {
          variant: "secondary" as const,
          text: status,
          icon: Clock,
          className: "bg-gray-100 text-gray-700 border-gray-300"
        };
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #F7F7F7 0%, #FCC61D 25%, #C59560 75%, #3338A0 100%)' }}>
        <div className="container mx-auto p-6">
          <div className="flex items-center justify-center min-h-96">
            <Card className="p-8 shadow-2xl border-0" style={{ backgroundColor: '#F7F7F7' }}>
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="relative">
                  <Loader2 className="h-12 w-12 animate-spin" style={{ color: '#3338A0' }} />
                  <div className="absolute inset-0 rounded-full opacity-20 animate-pulse" style={{ backgroundColor: '#3338A0' }}></div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold" style={{ color: '#3338A0' }}>Memuat Data Proposal</h3>
                  <p className="text-sm text-gray-600 mt-1">Mohon tunggu sebentar...</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #F7F7F7 0%, #FCC61D 25%, #C59560 75%, #3338A0 100%)' }}>
        <div className="container mx-auto p-6">
          <div className="flex items-center justify-center min-h-96">
            <Card className="p-8 shadow-2xl border-0 max-w-md w-full" style={{ backgroundColor: '#F7F7F7' }}>
              <div className="flex flex-col items-center gap-6 text-center">
                <div className="p-4 rounded-full" style={{ backgroundColor: '#FEF2F2' }}>
                  <AlertCircle className="h-12 w-12 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2" style={{ color: '#3338A0' }}>Oops! Terjadi Kesalahan</h3>
                  <p className="text-gray-600 mb-4">{error}</p>
                </div>
                <Link to="/auditor/dashboard" className="w-full">
                  <Button 
                    variant="outline" 
                    className="w-full border-2 hover:shadow-lg transition-all duration-200"
                    style={{ 
                      borderColor: '#3338A0', 
                      color: '#3338A0',
                      backgroundColor: 'transparent'
                    }}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Kembali ke Dashboard
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (!proposal) {
    return (
      <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #F7F7F7 0%, #FCC61D 25%, #C59560 75%, #3338A0 100%)' }}>
        <div className="container mx-auto p-6">
          <div className="flex items-center justify-center min-h-96">
            <Card className="p-8 shadow-2xl border-0 max-w-md w-full" style={{ backgroundColor: '#F7F7F7' }}>
              <div className="flex flex-col items-center gap-6 text-center">
                <div className="p-4 rounded-full bg-gray-100">
                  <FileText className="h-12 w-12 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2" style={{ color: '#3338A0' }}>Proposal Tidak Ditemukan</h3>
                  <p className="text-gray-600 mb-4">Proposal yang Anda cari tidak tersedia</p>
                </div>
                <Link to="/auditor/dashboard" className="w-full">
                  <Button 
                    variant="outline" 
                    className="w-full border-2 hover:shadow-lg transition-all duration-200"
                    style={{ 
                      borderColor: '#3338A0', 
                      color: '#3338A0',
                      backgroundColor: 'transparent'
                    }}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Kembali ke Dashboard
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  const statusConfig = getStatusConfig(proposal.status || "menunggu");
  const StatusIcon = statusConfig.icon;

  return (
    <div className="min-h-screen" style={{ background: '#F7F7F7' }}>
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link to="/auditor/dashboard">
              <Button 
                variant="outline" 
                size="sm" 
                className="shadow-lg hover:shadow-xl transition-all duration-200 border-2"
                style={{ 
                  borderColor: '#3338A0', 
                  color: '#3338A0',
                  backgroundColor: '#F7F7F7'
                }}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Kembali
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold" style={{ color: '#3338A0' }}>Review Proposal</h1>
              <p className="text-gray-600 mt-1">ID: #{proposal.id}</p>
            </div>
          </div>
          {proposal.file_url && (
            <Button 
              onClick={handleDownload} 
              className="shadow-lg hover:shadow-xl transition-all duration-200"
              style={{ 
                background: '#424242',
                color: 'white',
                border: 'none'
              }}
            >
              <Download className="mr-2 h-4 w-4" />
              Download Proposal
            </Button>
          )}
        </div>

        {/* Status Banner */}
        <Card className="border-0 shadow-2xl" style={{ backgroundColor: '#F7F7F7' }}>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full ${statusConfig.className}`}>
                <StatusIcon className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg" style={{ color: '#3338A0' }}>Status Proposal</h3>
                <Badge variant={statusConfig.variant} className={`mt-2 text-sm px-3 py-1 ${statusConfig.className}`}>
                  {statusConfig.text}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="xl:col-span-2 space-y-6">
            {/* Project Information */}
            <Card className="shadow-2xl hover:shadow-3xl transition-shadow duration-300 border-0 overflow-hidden">
              <CardHeader 
                className="text-white"
                style={{ background: '#424242' }}
              >
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Building2 className="h-5 w-5" />
                  Informasi Proyek
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6" style={{ backgroundColor: '#F7F7F7' }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                      <FileText className="h-4 w-4" />
                      Nama Proyek
                    </label>
                    <p className="font-semibold text-lg" style={{ color: '#3338A0' }}>{proposal.project_name || "N/A"}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                      <User className="h-4 w-4" />
                      Pengusul
                    </label>
                    <p className="font-semibold text-lg" style={{ color: '#3338A0' }}>{proposal.region || "N/A"}</p>
                  </div>
                </div>
                
                <Separator style={{ backgroundColor: '#C59560', height: '2px' }} />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                      <FolderOpen className="h-4 w-4" />
                      Kategori
                    </label>
                    <Badge 
                      variant="outline" 
                      className="w-fit text-sm px-3 py-1 border-2"
                      style={{ 
                        borderColor: '#FCC61D',
                        color: '#C59560',
                        backgroundColor: '#FFFBEB'
                      }}
                    >
                      {proposal.kategori || "N/A"}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                      <MapPin className="h-4 w-4" />
                      Alamat
                    </label>
                    <p className="text-gray-700">{proposal.alamat || "N/A"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Budget & Technical Info */}
            <Card className="shadow-2xl hover:shadow-3xl transition-shadow duration-300 border-0 overflow-hidden">
              <CardHeader 
                className="text-white"
                style={{ background: '#424242' }}
              >
                <CardTitle className="flex items-center gap-2 text-lg">
                  <DollarSign className="h-5 w-5" />
                  Informasi Anggaran & Teknis
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6" style={{ backgroundColor: '#F7F7F7' }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div 
                    className="p-6 rounded-xl border-2 shadow-lg"
                    style={{ 
                      background: 'white',
                      borderColor: '#22C55E'
                    }}
                  >
                    <label className="flex items-center gap-2 text-sm font-medium text-emerald-700 mb-3">
                      <DollarSign className="h-4 w-4" />
                      Total Anggaran
                    </label>
                    <p className="text-2xl font-bold text-emerald-800">
                      {proposal.budget ? formatCurrency(proposal.budget) : "N/A"}
                    </p>
                  </div>
                  <div 
                    className="p-6 rounded-xl border-2 shadow-lg"
                    style={{ 
                      background: 'white',
                      borderColor: '#3338A0'
                    }}
                  >
                    <label className="flex items-center gap-2 text-sm font-medium mb-3" style={{ color: '#3338A0' }}>
                      <FileText className="h-4 w-4" />
                      Project ID
                    </label>
                    <p className="text-xl font-bold" style={{ color: '#3338A0' }}>
                      #{proposal.project_id || proposal.id}
                    </p>
                  </div>
                </div>
                {proposal.cid && (
                  <div className="mt-6 p-4 rounded-lg border-2" style={{ backgroundColor: 'white', borderColor: '#C59560' }}>
                    <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: '#C59560' }}>
                      <FileText className="h-4 w-4" />
                      Content Identifier (CID)
                    </label>
                    <p className="text-sm font-mono text-gray-600 break-all bg-gray-50 p-3 rounded border">
                      {proposal.cid}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Timeline */}
            <Card className="shadow-2xl hover:shadow-3xl transition-shadow duration-300 border-0 overflow-hidden">
              <CardHeader 
                className="text-white"
                style={{ background: '#424242' }}
              >
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calendar className="h-5 w-5" />
                  Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4" style={{ backgroundColor: '#F7F7F7' }}>
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 rounded-full mt-2" style={{ backgroundColor: '#3338A0' }}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium" style={{ color: '#3338A0' }}>Diajukan</p>
                    <p className="text-sm text-gray-600">{formatLongDate(proposal.created_at)}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 rounded-full mt-2" style={{ backgroundColor: '#FCC61D' }}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium" style={{ color: '#C59560' }}>Terakhir Update</p>
                    <p className="text-sm text-gray-600">{formatLongDate(proposal.updated_at)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* File Information */}
            {proposal.file_url && (
              <Card className="shadow-2xl hover:shadow-3xl transition-shadow duration-300 border-0 overflow-hidden">
                <CardHeader 
                  className="text-white"
                  style={{ background: '#424242' }}
                >
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FileText className="h-5 w-5" />
                    File Proposal
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6" style={{ backgroundColor: '#F7F7F7' }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">File tersimpan di IPFS</p>
                      <p className="text-xs text-gray-500 break-all">{proposal.file_url.split('/').pop()}</p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleDownload}
                      className="shrink-0 ml-2 border-2"
                      style={{ 
                        borderColor: '#C59560',
                        color: '#C59560'
                      }}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <Card className="shadow-2xl border-0" style={{ backgroundColor: '#F7F7F7' }}>
              <CardHeader>
                <CardTitle className="text-center" style={{ color: '#3338A0' }}>Aksi Review</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <Button 
                  onClick={handleReject}
                  variant="outline" 
                  className="w-full border-2 shadow-lg hover:shadow-xl transition-all duration-200"
                  style={{ 
                    backgroundColor: '#FEF2F2',
                    color: '#DC2626',
                    borderColor: '#FCA5A5'
                  }}
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Tolak Proposal
                </Button>
                <Button 
                  onClick={handleApprove}
                  className="w-full shadow-lg hover:shadow-xl transition-all duration-200 text-white"
                  style={{ 
                    background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
                    border: 'none'
                  }}
                >
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Setujui Proposal
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditorReviewPage;