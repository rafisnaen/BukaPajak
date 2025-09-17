// src/utils/projectMappers.ts
import { ApiProject } from "@/api/project";
import { ProjectDetail } from "@/components/ui/ProjectDetailDialog";
export const mapApiProjectToCard = (project: ApiProject): ProjectDetail => {
  // Normalize status
  const statusMap: { [key: string]: string } = {
    "selesai": "completed",
    "dalam pengerjaan": "ongoing", 
    "belum dimulai": "ongoing"
  };

  // Normalize kategori
  const categoryMap: { [key: string]: string } = {
    "kesehatan": "Kesehatan",
    "pendidikan": "Pendidikan",
    "infrastruktur": "Infrastruktur",
    "sosial": "Sosial"
  };

  return {
    id: project.id,
    name: project.judul,
    description: project.deskripsi,
    budget: project.budget,
    image: project.gambar_url,
    status: statusMap[project.status] || "ongoing",
    category: categoryMap[project.kategori || ""] || "Infrastruktur",
    startDate: new Date(project.created_at).toLocaleDateString('id-ID'),
    averageRating: 4.2, // Default value
    ratings: {
      innovation: 4,
      societalBenefit: 4.5,
      transparency: 3.8,
      executionQuality: 4.2,
      budgetEfficiency: 3.9
    },
    comments: [],
    stages: [
      {
        id: 1,
        name: "Perencanaan",
        progress: 100,
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('id-ID'),
        status: "selesai",
        imageUrl: project.gambar_url,
        date: new Date(project.created_at).toLocaleDateString('id-ID')
      },
      {
        id: 2,
        name: "Pelaksanaan",
        progress: project.status === "selesai" ? 100 : 50,
        deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toLocaleDateString('id-ID'),
        status: project.status === "selesai" ? "selesai" : "dalam pengerjaan",
        imageUrl: project.gambar_url,
        date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toLocaleDateString('id-ID')
      }
    ]
  };
};