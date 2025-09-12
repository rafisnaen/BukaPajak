import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, MapPin, Clock, ThumbsUp, AlertTriangle } from "lucide-react";
import { useState } from "react";

const feedbackData = [
  {
    id: "FB001",
    author: "Budi S.",
    location: "Jakarta Selatan",
    timestamp: "2024-01-14T15:30:00Z",
    type: "Laporan",
    priority: "High",
    subject: "Dana Perbaikan Jalan Belum Terrealisasi",
    message: "Sudah 6 bulan dana untuk perbaikan jalan di daerah Kemang dialokasikan tapi belum ada tindakan nyata. Jalan masih rusak parah dan mengganggu aktivitas warga.",
    likes: 124,
    status: "Under Review"
  },
  {
    id: "FB002", 
    author: "Sari M.",
    location: "Bandung",
    timestamp: "2024-01-13T09:45:00Z",
    type: "Feedback",
    priority: "Medium",
    subject: "Apresiasi Pembangunan Rumah Sakit",
    message: "Terima kasih atas pembangunan rumah sakit baru di daerah kami. Progres sangat baik dan sesuai jadwal. Semoga bisa segera beroperasi.",
    likes: 89,
    status: "Acknowledged"
  },
  {
    id: "FB003",
    author: "Andi R.", 
    location: "Surabaya",
    timestamp: "2024-01-12T16:20:00Z",
    type: "Pertanyaan",
    priority: "Low",
    subject: "Transparansi Anggaran Digitalisasi Sekolah",
    message: "Bisa tolong dijelaskan detail penggunaan dana digitalisasi sekolah? Apakah sudah termasuk training untuk guru-guru?",
    likes: 67,
    status: "Responded"
  }
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High":
      return "bg-red-100 text-red-800";
    case "Medium":
      return "bg-yellow-100 text-yellow-800";
    case "Low":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Under Review":
      return "bg-blue-100 text-blue-800";
    case "Acknowledged":
      return "bg-green-100 text-green-800";
    case "Responded":
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case "Laporan":
      return <AlertTriangle className="w-4 h-4" />;
    case "Feedback":
      return <ThumbsUp className="w-4 h-4" />;
    case "Pertanyaan":
      return <MessageSquare className="w-4 h-4" />;
    default:
      return <MessageSquare className="w-4 h-4" />;
  }
};

export const PublicFeedback = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Feedback berhasil dikirim! Terima kasih atas partisipasi Anda.");
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-primary flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Kirim Feedback & Laporan
          </CardTitle>
          <CardDescription>
            Laporkan penggunaan dana di daerah Anda atau berikan feedback untuk transparansi yang lebih baik
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nama (Opsional)</Label>
                <Input id="name" placeholder="Masukkan nama Anda" />
              </div>
              <div>
                <Label htmlFor="location">Lokasi</Label>
                <Input id="location" placeholder="Kota/Kabupaten" required />
              </div>
            </div>
            
            <div>
              <Label htmlFor="subject">Subjek</Label>
              <Input id="subject" placeholder="Ringkasan singkat feedback/laporan Anda" required />
            </div>
            
            <div>
              <Label htmlFor="message">Pesan</Label>
              <Textarea 
                id="message" 
                placeholder="Jelaskan detail feedback atau laporan Anda..."
                className="min-h-[120px]"
                required 
              />
            </div>
            
            <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
              {isSubmitting ? "Mengirim..." : "Kirim Feedback"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-primary">Feedback Publik Terbaru</CardTitle>
          <CardDescription>Feedback dan laporan dari masyarakat mengenai penggunaan dana publik</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {feedbackData.map((feedback) => (
              <div key={feedback.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-muted">
                      {getTypeIcon(feedback.type)}
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-semibold">{feedback.subject}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>oleh {feedback.author}</span>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {feedback.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(feedback.timestamp).toLocaleDateString('id-ID')}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getPriorityColor(feedback.priority)}>
                      {feedback.priority}
                    </Badge>
                    <Badge className={getStatusColor(feedback.status)}>
                      {feedback.status}
                    </Badge>
                  </div>
                </div>

                <p className="text-sm text-foreground leading-relaxed pl-11">
                  {feedback.message}
                </p>

                <div className="flex justify-between items-center pt-2 border-t pl-11">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <ThumbsUp className="w-4 h-4" />
                    {feedback.likes} orang menyukai ini
                  </div>
                  <Button variant="ghost" size="sm">
                    <ThumbsUp className="w-4 h-4 mr-1" />
                    Setuju
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <Button variant="outline">
              Lihat Semua Feedback
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};