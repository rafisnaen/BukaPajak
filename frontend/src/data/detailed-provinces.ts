export interface ProjectStage {
  name: string;
  date: string;
  status: 'selesai' | 'sedang dilakukan';
  imageUrl: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  budget: number;
  status: 'ongoing' | 'completed';
  startDate: string;
  endDate?: string;
  category: string;
  ratings: {
    innovation: number;
    societalBenefit: number;
    transparency: number;
    executionQuality: number;
    budgetEfficiency: number;
  };
  averageRating: number;
  comments: Comment[];
  stages: ProjectStage[];
}

export interface Comment {
  id: string;
  userName: string;
  userAvatar: string;
  content: string;
  rating: number;
  date: string;
  likes: number;
}

export interface District {
  id: string;
  name: string;
  receivedFunds: number;
  usedFunds: number;
  remainingFunds: number;
  ongoingProjects: number;
  completedProjects: number;
  projects: Project[];
}

export interface City {
  id: string;
  name: string;
  type: 'kota' | 'kabupaten';
  receivedFunds: number;
  usedFunds: number;
  remainingFunds: number;
  ongoingProjects: number;
  completedProjects: number;
  districts: District[];
  projects: Project[];
}

export interface DetailedProvince {
  id: string;
  name: string;
  receivedFunds: number;
  usedFunds: number;
  remainingFunds: number;
  cities: number;
  ongoingProjects: number;
  completedProjects: number;
  population: string;
  citiesData: City[];
  projects: Project[];
}

// Sample comments
const sampleComments: Comment[] = [
  {
    id: "1",
    userName: "Ahmad Syahril",
    userAvatar: "AS",
    content: "Proyek ini sangat bermanfaat untuk masyarakat, pelaksanaannya juga transparan.",
    rating: 5,
    date: "2024-01-15",
    likes: 23
  },
  {
    id: "2", 
    userName: "Sari Dewi",
    userAvatar: "SD",
    content: "Kualitas pelaksanaan baik, tapi masih perlu peningkatan di bidang inovasi.",
    rating: 4,
    date: "2024-01-10",
    likes: 15
  }
];

// FUNGSI BARU: Membuat data tahapan proyek
const createSampleStages = (count: number): ProjectStage[] => {
  const stageNames = [
    "Perencanaan & Desain",
    "Pengadaan Lahan & Izin",
    "Konstruksi Awal",
    "Pemasangan Struktur Utama",
    "Tahap Finishing",
    "Uji Coba & Peresmian",
  ];

  // Anda bisa mengganti ini dengan URL gambar yang sebenarnya
  const imageUrls = [
    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1511055223733-5a6c214643be?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1429497444061-f86682f3c645?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1581193348381-073c139c1f6d?q=80&w=2070&auto=format&fit=crop",
  ];

  return Array.from({ length: count }, (_, index) => ({
    name: stageNames[index % stageNames.length],
    date: `2023-0${index + 3}-10`, // Contoh tanggal
    status: Math.random() > 0.5 ? 'selesai' : 'sedang dilakukan' as 'selesai' | 'sedang dilakukan',
    imageUrl: imageUrls[index % imageUrls.length],
  }));
};


// Sample projects
const createSampleProjects = (count: number, baseId: string): Project[] => {
  const projectNames = [
    "Pembangunan Jembatan Penghubung",
    "Renovasi Rumah Sakit Daerah", 
    "Program Bantuan Sosial Masyarakat",
    "Pembangunan Sekolah Dasar",
    "Perbaikan Infrastruktur Jalan",
    "Program Pemberdayaan UMKM",
    "Pembangunan Pasar Tradisional",
    "Program Beasiswa Pendidikan"
  ];

  const categories = [
    "Infrastruktur",
    "Kesehatan",
    "Sosial",
    "Pendidikan",
    "Transportasi",
    "Ekonomi"
  ];

  return Array.from({ length: count }, (_, index) => ({
    id: `${baseId}-project-${index + 1}`,
    name: `${projectNames[index % projectNames.length]} ${index + 1}`,
    description: `Deskripsi proyek ${projectNames[index % projectNames.length].toLowerCase()} untuk meningkatkan kesejahteraan masyarakat.`,
    budget: Math.floor(Math.random() * 50000000000) + 10000000000,
    status: Math.random() > 0.6 ? 'completed' : 'ongoing' as 'ongoing' | 'completed',
    startDate: "2023-01-01",
    endDate: Math.random() > 0.6 ? "2024-12-31" : undefined,
    category: categories[index % categories.length],
    ratings: {
      innovation: Math.floor(Math.random() * 2) + 3,
      societalBenefit: Math.floor(Math.random() * 2) + 4,
      transparency: Math.floor(Math.random() * 2) + 3,
      executionQuality: Math.floor(Math.random() * 2) + 4,
      budgetEfficiency: Math.floor(Math.random() * 2) + 3
    },
    averageRating: Math.floor(Math.random() * 2) + 3.5,
    comments: sampleComments,
    // PERBAIKAN: Menambahkan properti 'stages' yang hilang
    stages: createSampleStages(4) 
  }));
};

// Sample districts for Jakarta
const jakartaDistricts: District[] = [
  {
    id: "jakarta-pusat",
    name: "Jakarta Pusat",
    receivedFunds: 18000000000,
    usedFunds: 15500000000,
    remainingFunds: 2500000000,
    ongoingProjects: 8,
    completedProjects: 15,
    projects: createSampleProjects(5, "jakarta-pusat")
  },
  {
    id: "jakarta-utara",
    name: "Jakarta Utara", 
    receivedFunds: 16000000000,
    usedFunds: 14200000000,
    remainingFunds: 1800000000,
    ongoingProjects: 6,
    completedProjects: 12,
    projects: createSampleProjects(4, "jakarta-utara")
  },
  {
    id: "jakarta-barat",
    name: "Jakarta Barat",
    receivedFunds: 17000000000,
    usedFunds: 15100000000,
    remainingFunds: 1900000000,
    ongoingProjects: 7,
    completedProjects: 14,
    projects: createSampleProjects(5, "jakarta-barat")
  }
];

// Sample cities for Jakarta
const jakartaCities: City[] = [
  {
    id: "jakarta-pusat-city",
    name: "Jakarta Pusat",
    type: "kota",
    receivedFunds: 60000000000,
    usedFunds: 51500000000,
    remainingFunds: 8500000000,
    ongoingProjects: 15,
    completedProjects: 26,
    districts: jakartaDistricts,
    projects: createSampleProjects(8, "jakarta-pusat-city")
  },
  {
    id: "kepulauan-seribu",
    name: "Kepulauan Seribu",
    type: "kabupaten",
    receivedFunds: 25000000000,
    usedFunds: 21000000000,
    remainingFunds: 4000000000,
    ongoingProjects: 8,
    completedProjects: 12,
    districts: [
      {
        id: "pulau-tidung",
        name: "Pulau Tidung",
        receivedFunds: 12500000000,
        usedFunds: 10500000000,
        remainingFunds: 2000000000,
        ongoingProjects: 4,
        completedProjects: 6,
        projects: createSampleProjects(3, "pulau-tidung")
      }
    ],
    projects: createSampleProjects(6, "kepulauan-seribu")
  }
];

// Main detailed provinces data
export const detailedProvinces: DetailedProvince[] = [
  {
    id: "1",
    name: "DKI Jakarta",
    receivedFunds: 180000000000,
    usedFunds: 155000000000,
    remainingFunds: 25000000000,
    cities: 5,
    ongoingProjects: 45,
    completedProjects: 78,
    population: "10.56M jiwa",
    citiesData: jakartaCities,
    projects: createSampleProjects(12, "jakarta")
  }
];

// Helper function to get detailed province by ID
export const getDetailedProvinceById = (id: string): DetailedProvince | undefined => {
  return detailedProvinces.find(province => province.id === id);
};