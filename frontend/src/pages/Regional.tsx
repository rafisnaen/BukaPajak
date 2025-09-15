// pages/Regional.tsx
import { useEffect, useState, useMemo } from "react";
import ProvinceCard from "@/components/ui/province-card";
import { getRegions } from "@/api/region";
import { Province } from "@/types/type";

const Regional = () => {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<keyof Province>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // fetch data dari API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getRegions();
        console.log("Transformed provinces:", data);
        setProvinces(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching regions:", err);
        setError("Gagal memuat data provinsi");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // filter + sort
  const filteredAndSortedProvinces = useMemo(() => {
    let filtered = provinces.filter((province) =>
      (province?.name || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );

    filtered.sort((a, b) => {
      let aValue: number | string = a[sortBy];
      let bValue: number | string = b[sortBy];

      if (sortBy === "ongoingProjects" || sortBy === "completedProjects" || sortBy === "totalProjects") {
        aValue = Number(a[sortBy]);
        bValue = Number(b[sortBy]);
      }

      if (sortBy === "name" || sortBy === "cityName") {
        return sortOrder === "asc"
          ? (aValue as string).localeCompare(bValue as string)
          : (bValue as string).localeCompare(aValue as string);
      }

      return sortOrder === "asc"
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    });

    return filtered;
  }, [provinces, searchQuery, sortBy, sortOrder]);

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center h-64">
        <div className="text-lg">Memuat data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 flex justify-center items-center h-64">
        <div className="text-lg text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Search & Sort Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Cari provinsi..."
          className="border px-4 py-2 rounded-md w-full md:w-1/3"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="flex items-center gap-2">
          <select
            className="border px-3 py-2 rounded-md"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as keyof Province)}
          >
            <option value="name">Nama</option>
            <option value="receivedFunds">Dana Diterima</option>
            <option value="usedFunds">Dana Terpakai</option>
            <option value="remainingFunds">Sisa Dana</option>
            <option value="cityName">Nama Kota</option>
            <option value="ongoingProjects">Proyek Berlangsung</option>
            <option value="completedProjects">Proyek Selesai</option>
            <option value="totalProjects">Total Proyek</option>
            <option value="population">Populasi</option>
          </select>

          <button
            className="border px-3 py-2 rounded-md"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          >
            {sortOrder === "asc" ? "⬆️ Asc" : "⬇️ Desc"}
          </button>
        </div>
      </div>

      {/* Province Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedProvinces.map((province) => (
          <ProvinceCard
            key={province.id}
            id={province.id}
            name={province.name}
            receivedFunds={province.receivedFunds}
            usedFunds={province.usedFunds}
            remainingFunds={province.remainingFunds}
            cityName={province.cityName}
            ongoingProjects={province.ongoingProjects}
            completedProjects={province.completedProjects}
            population={province.population}
          />
        ))}
      </div>

      {filteredAndSortedProvinces.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          {provinces.length === 0 
            ? "Tidak ada data provinsi" 
            : "Tidak ditemukan provinsi yang sesuai dengan pencarian"}
        </div>
      )}
    </div>
  );
};

export default Regional;