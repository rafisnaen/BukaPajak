export interface Province {
  id: string;
  name: string;
  receivedFunds: number; // in rupiah
  usedFunds: number;
  remainingFunds: number;
  cities: number;
  ongoingProjects: number;
  completedProjects: number;
  population: string;
}

export const provinces: Province[] = [
  {
    id: "1",
    name: "DKI Jakarta",
    receivedFunds: 180000000000,
    usedFunds: 155000000000,
    remainingFunds: 25000000000,
    cities: 5,
    ongoingProjects: 45,
    completedProjects: 78,
    population: "10.56M jiwa"
  },
  {
    id: "2", 
    name: "Jawa Barat",
    receivedFunds: 165000000000,
    usedFunds: 142000000000,
    remainingFunds: 23000000000,
    cities: 27,
    ongoingProjects: 52,
    completedProjects: 89,
    population: "48.27M jiwa"
  },
  {
    id: "3",
    name: "Jawa Tengah", 
    receivedFunds: 145000000000,
    usedFunds: 128000000000,
    remainingFunds: 17000000000,
    cities: 35,
    ongoingProjects: 38,
    completedProjects: 72,
    population: "34.55M jiwa"
  },
  {
    id: "4",
    name: "Jawa Timur",
    receivedFunds: 158000000000,
    usedFunds: 139000000000,
    remainingFunds: 19000000000,
    cities: 38,
    ongoingProjects: 41,
    completedProjects: 85,
    population: "39.29M jiwa"
  },
  {
    id: "5",
    name: "Sumatera Utara",
    receivedFunds: 125000000000,
    usedFunds: 108000000000,
    remainingFunds: 17000000000,
    cities: 33,
    ongoingProjects: 29,
    completedProjects: 54,
    population: "14.80M jiwa"
  },
  {
    id: "6",
    name: "Sumatera Selatan",
    receivedFunds: 98000000000,
    usedFunds: 83000000000,
    remainingFunds: 15000000000,
    cities: 17,
    ongoingProjects: 22,
    completedProjects: 41,
    population: "8.47M jiwa"
  },
  {
    id: "7",
    name: "Sumatera Barat",
    receivedFunds: 87000000000,
    usedFunds: 74000000000,
    remainingFunds: 13000000000,
    cities: 19,
    ongoingProjects: 18,
    completedProjects: 35,
    population: "5.53M jiwa"
  },
  {
    id: "8", 
    name: "Riau",
    receivedFunds: 92000000000,
    usedFunds: 79000000000,
    remainingFunds: 13000000000,
    cities: 12,
    ongoingProjects: 20,
    completedProjects: 38,
    population: "6.39M jiwa"
  },
  {
    id: "9",
    name: "Lampung",
    receivedFunds: 78000000000,
    usedFunds: 67000000000,
    remainingFunds: 11000000000,
    cities: 15,
    ongoingProjects: 16,
    completedProjects: 31,
    population: "8.41M jiwa"
  },
  {
    id: "10",
    name: "Kalimantan Timur",
    receivedFunds: 115000000000,
    usedFunds: 98000000000,
    remainingFunds: 17000000000,
    cities: 10,
    ongoingProjects: 25,
    completedProjects: 47,
    population: "3.77M jiwa"
  },
  {
    id: "11",
    name: "Kalimantan Selatan",
    receivedFunds: 85000000000,
    usedFunds: 72000000000,
    remainingFunds: 13000000000,
    cities: 13,
    ongoingProjects: 19,
    completedProjects: 36,
    population: "4.07M jiwa"
  },
  {
    id: "12",
    name: "Kalimantan Barat",
    receivedFunds: 89000000000,
    usedFunds: 76000000000,
    remainingFunds: 13000000000,
    cities: 14,
    ongoingProjects: 21,
    completedProjects: 34,
    population: "5.41M jiwa"
  },
  {
    id: "13",
    name: "Kalimantan Tengah",
    receivedFunds: 82000000000,
    usedFunds: 69000000000,
    remainingFunds: 13000000000,
    cities: 14,
    ongoingProjects: 17,
    completedProjects: 32,
    population: "2.67M jiwa"
  },
  {
    id: "14",
    name: "Kalimantan Utara",
    receivedFunds: 75000000000,
    usedFunds: 63000000000,
    remainingFunds: 12000000000,
    cities: 5,
    ongoingProjects: 15,
    completedProjects: 28,
    population: "701K jiwa"
  },
  {
    id: "15",
    name: "Sulawesi Selatan",
    receivedFunds: 105000000000,
    usedFunds: 89000000000,
    remainingFunds: 16000000000,
    cities: 24,
    ongoingProjects: 24,
    completedProjects: 45,
    population: "8.78M jiwa"
  },
  {
    id: "16",
    name: "Sulawesi Tengah",
    receivedFunds: 88000000000,
    usedFunds: 74000000000,
    remainingFunds: 14000000000,
    cities: 13,
    ongoingProjects: 19,
    completedProjects: 33,
    population: "2.98M jiwa"
  },
  {
    id: "17",
    name: "Sulawesi Utara",
    receivedFunds: 79000000000,
    usedFunds: 67000000000,
    remainingFunds: 12000000000,
    cities: 15,
    ongoingProjects: 17,
    completedProjects: 31,
    population: "2.62M jiwa"
  },
  {
    id: "18",
    name: "Sulawesi Tenggara",
    receivedFunds: 84000000000,
    usedFunds: 71000000000,
    remainingFunds: 13000000000,
    cities: 17,
    ongoingProjects: 18,
    completedProjects: 29,
    population: "2.62M jiwa"
  },
  {
    id: "19",
    name: "Sulawesi Barat",
    receivedFunds: 72000000000,
    usedFunds: 61000000000,
    remainingFunds: 11000000000,
    cities: 6,
    ongoingProjects: 14,
    completedProjects: 25,
    population: "1.42M jiwa"
  },
  {
    id: "20",
    name: "Gorontalo",
    receivedFunds: 68000000000,
    usedFunds: 57000000000,
    remainingFunds: 11000000000,
    cities: 6,
    ongoingProjects: 13,
    completedProjects: 22,
    population: "1.17M jiwa"
  },
  {
    id: "21",
    name: "Bali",
    receivedFunds: 95000000000,
    usedFunds: 81000000000,
    remainingFunds: 14000000000,
    cities: 9,
    ongoingProjects: 21,
    completedProjects: 39,
    population: "4.32M jiwa"
  },
  {
    id: "22",
    name: "Nusa Tenggara Barat",
    receivedFunds: 86000000000,
    usedFunds: 73000000000,
    remainingFunds: 13000000000,
    cities: 10,
    ongoingProjects: 18,
    completedProjects: 32,
    population: "5.32M jiwa"
  },
  {
    id: "23",
    name: "Nusa Tenggara Timur",
    receivedFunds: 91000000000,
    usedFunds: 77000000000,
    remainingFunds: 14000000000,
    cities: 22,
    ongoingProjects: 20,
    completedProjects: 35,
    population: "5.33M jiwa"
  },
  {
    id: "24",
    name: "Papua",
    receivedFunds: 135000000000,
    usedFunds: 112000000000,
    remainingFunds: 23000000000,
    cities: 29,
    ongoingProjects: 31,
    completedProjects: 52,
    population: "4.30M jiwa"
  },
  {
    id: "25",
    name: "Papua Barat",
    receivedFunds: 118000000000,
    usedFunds: 98000000000,
    remainingFunds: 20000000000,
    cities: 13,
    ongoingProjects: 26,
    completedProjects: 44,
    population: "1.13M jiwa"
  },
  {
    id: "26",
    name: "Maluku",
    receivedFunds: 89000000000,
    usedFunds: 75000000000,
    remainingFunds: 14000000000,
    cities: 11,
    ongoingProjects: 19,
    completedProjects: 33,
    population: "1.85M jiwa"
  },
  {
    id: "27",
    name: "Maluku Utara",
    receivedFunds: 81000000000,
    usedFunds: 68000000000,
    remainingFunds: 13000000000,
    cities: 10,
    ongoingProjects: 17,
    completedProjects: 28,
    population: "1.28M jiwa"
  },
  {
    id: "28",
    name: "Aceh",
    receivedFunds: 112000000000,
    usedFunds: 95000000000,
    remainingFunds: 17000000000,
    cities: 23,
    ongoingProjects: 25,
    completedProjects: 48,
    population: "5.27M jiwa"
  },
  {
    id: "29",
    name: "Bengkulu",
    receivedFunds: 76000000000,
    usedFunds: 64000000000,
    remainingFunds: 12000000000,
    cities: 10,
    ongoingProjects: 16,
    completedProjects: 28,
    population: "2.01M jiwa"
  },
  {
    id: "30",
    name: "Jambi",
    receivedFunds: 82000000000,
    usedFunds: 69000000000,
    remainingFunds: 13000000000,
    cities: 11,
    ongoingProjects: 18,
    completedProjects: 31,
    population: "3.55M jiwa"
  },
  {
    id: "31",
    name: "Kepulauan Riau",
    receivedFunds: 87000000000,
    usedFunds: 73000000000,
    remainingFunds: 14000000000,
    cities: 7,
    ongoingProjects: 19,
    completedProjects: 34,
    population: "2.28M jiwa"
  },
  {
    id: "32",
    name: "Kepulauan Bangka Belitung",
    receivedFunds: 78000000000,
    usedFunds: 66000000000,
    remainingFunds: 12000000000,
    cities: 7,
    ongoingProjects: 16,
    completedProjects: 29,
    population: "1.45M jiwa"
  },
  {
    id: "33",
    name: "DI Yogyakarta",
    receivedFunds: 85000000000,
    usedFunds: 72000000000,
    remainingFunds: 13000000000,
    cities: 5,
    ongoingProjects: 18,
    completedProjects: 35,
    population: "3.67M jiwa"
  },
  {
    id: "34",
    name: "Banten",
    receivedFunds: 132000000000,
    usedFunds: 113000000000,
    remainingFunds: 19000000000,
    cities: 8,
    ongoingProjects: 29,
    completedProjects: 56,
    population: "12.45M jiwa"
  },
  {
    id: "35",
    name: "Papua Tengah",
    receivedFunds: 95000000000,
    usedFunds: 79000000000,
    remainingFunds: 16000000000,
    cities: 8,
    ongoingProjects: 21,
    completedProjects: 37,
    population: "1.35M jiwa"
  },
  {
    id: "36",
    name: "Papua Pegunungan",
    receivedFunds: 88000000000,
    usedFunds: 73000000000,
    remainingFunds: 15000000000,
    cities: 8,
    ongoingProjects: 19,
    completedProjects: 32,
    population: "1.15M jiwa"
  },
  {
    id: "37",
    name: "Papua Selatan",
    receivedFunds: 92000000000,
    usedFunds: 77000000000,
    remainingFunds: 15000000000,
    cities: 4,
    ongoingProjects: 20,
    completedProjects: 35,
    population: "522K jiwa"
  },
  {
    id: "38",
    name: "Papua Barat Daya",
    receivedFunds: 86000000000,
    usedFunds: 72000000000,
    remainingFunds: 14000000000,
    cities: 8,
    ongoingProjects: 18,
    completedProjects: 31,
    population: "467K jiwa"
  }
];