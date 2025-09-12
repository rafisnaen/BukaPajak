import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CalendarDays, MapPin, Users } from "lucide-react";

const projectData = [
  {
    id: "PRJ001",
    name: "Pembangunan Jalan Tol Trans Sumatra Seksi 7",
    location: "Sumatera Selatan",
    budget: 15000000000000,
    used: 12500000000000,
    progress: 78,
    status: "Dalam Progres",
    startDate: "2023-03-15",
    expectedCompletion: "2025-12-20",
    contractor: "PT Waskita Karya",
    beneficiaries: 2500000
  },
  {
    id: "PRJ002", 
    name: "Modernisasi Sistem Irigasi Jawa Tengah",
    location: "Jawa Tengah",
    budget: 8500000000000,
    used: 7200000000000,
    progress: 85,
    status: "Dalam Progres",
    startDate: "2023-01-10",
    expectedCompletion: "2024-08-30",
    contractor: "PT Adhi Karya",
    beneficiaries: 850000
  },
  {
    id: "PRJ003",
    name: "Pembangunan Rumah Sakit Umum Papua",
    location: "Papua",
    budget: 2800000000000,
    used: 2650000000000,
    progress: 95,
    status: "Hampir Selesai",
    startDate: "2022-09-01",
    expectedCompletion: "2024-03-15",
    contractor: "PT Hutama Karya",
    beneficiaries: 320000
  },
  {
    id: "PRJ004",
    name: "Program Digitalisasi Sekolah Nasional",
    location: "Seluruh Indonesia",
    budget: 12000000000000,
    used: 4800000000000,
    progress: 40,
    status: "Dalam Progres",
    startDate: "2024-01-01",
    expectedCompletion: "2026-12-31",
    contractor: "Konsorsium Telkom-Indosat",
    beneficiaries: 25000000
  }
];

const formatRupiah = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const formatRupiahShort = (value: number) => {
  if (value >= 1000000000000) {
    return `${(value / 1000000000000).toFixed(1)}T`;
  }
  if (value >= 1000000000) {
    return `${(value / 1000000000).toFixed(1)}M`;
  }
  return formatRupiah(value);
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Dalam Progres":
      return "bg-blue-100 text-blue-800";
    case "Hampir Selesai":
      return "bg-green-100 text-green-800";
    case "Selesai":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const ProjectDetails = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary">Proyek Pembangunan Aktif</CardTitle>
        <CardDescription>Detail proyek infrastruktur dan program pemerintah yang sedang berjalan</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {projectData.map((project) => (
            <div key={project.id} className="border rounded-lg p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-primary">{project.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {project.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {project.beneficiaries.toLocaleString('id-ID')} penerima manfaat
                    </div>
                  </div>
                </div>
                <Badge className={getStatusColor(project.status)}>
                  {project.status}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Anggaran</p>
                  <p className="font-semibold">{formatRupiahShort(project.budget)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Dana Terpakai</p>
                  <p className="font-semibold text-success">{formatRupiahShort(project.used)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Sisa Anggaran</p>
                  <p className="font-semibold text-warning">{formatRupiahShort(project.budget - project.used)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Kontraktor</p>
                  <p className="font-semibold text-sm">{project.contractor}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Progress Proyek</span>
                  <span className="text-sm font-semibold">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-3" />
              </div>

              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <CalendarDays className="w-4 h-4" />
                  Dimulai: {new Date(project.startDate).toLocaleDateString('id-ID')}
                </div>
                <div className="flex items-center gap-1">
                  <CalendarDays className="w-4 h-4" />
                  Target Selesai: {new Date(project.expectedCompletion).toLocaleDateString('id-ID')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};