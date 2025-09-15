// pages/Regional.tsx
import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import SearchFilter from "@/components/ui/search-filter";
import ProvinceCard from "@/components/ui/province-card";
import { getRegions } from "@/api/region";
import { Province } from "@/types/type";
import { MapPin, Landmark, TrendingUp, BarChart3, ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Regional = () => {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<keyof Province>("receivedFunds" as keyof Province);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // fetch data dari backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getRegions();
        setProvinces(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err) {
        console.error("Error fetching regions:", err);
        setError("Gagal memuat data provinsi");
        setProvinces([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // totals (tampilkan 0 jika tidak ada data)
  const totals = useMemo(() => {
    return provinces.reduce(
      (acc, p) => {
        const received = Number((p as any).receivedFunds) || 0;
        const used = Number((p as any).usedFunds) || 0;
        const remaining = Number((p as any).remainingFunds) || 0;
        const cities = Number((p as any).cities) || 0; // fallback kalau backend menyertakan 'cities'
        const ongoing = Number((p as any).ongoingProjects) || 0;
        const completed = Number((p as any).completedProjects) || 0;

        return {
          totalReceived: acc.totalReceived + received,
          totalUsed: acc.totalUsed + used,
          totalRemaining: acc.totalRemaining + remaining,
          totalCities: acc.totalCities + cities,
          totalProjects: acc.totalProjects + ongoing + completed,
        };
      },
      {
        totalReceived: 0,
        totalUsed: 0,
        totalRemaining: 0,
        totalCities: 0,
        totalProjects: 0,
      }
    );
  }, [provinces]);

  // format currency ringkas (jika 0 -> Rp 0)
  const formatCurrency = (amount: number) => {
    if (!amount) return "Rp 0";
    if (Math.abs(amount) >= 1_000_000_000_000) return `Rp ${(amount / 1_000_000_000_000).toFixed(1)}T`;
    if (Math.abs(amount) >= 1_000_000_000) return `Rp ${(amount / 1_000_000_000).toFixed(1)}M`;
    if (Math.abs(amount) >= 1_000_000) return `Rp ${(amount / 1_000_000).toFixed(1)}Jt`;
    return `Rp ${amount.toLocaleString()}`;
  };

  // filter + sort (tetap bekerja dengan data backend)
  const filteredAndSortedProvinces = useMemo(() => {
    let filtered = provinces.filter((province) =>
      (province?.name || "").toLowerCase().includes(searchQuery.toLowerCase())
    );

    filtered.sort((a, b) => {
      // ambil nilai secara defensif
      let aValue: number | string = (a as any)[sortBy] ?? 0;
      let bValue: number | string = (b as any)[sortBy] ?? 0;

      // kalau sortBy adalah totalProjects, hitung dari ongoing+completed
      if (String(sortBy) === "totalProjects" || String(sortBy) === "projects") {
        aValue = (Number((a as any).ongoingProjects) || 0) + (Number((a as any).completedProjects) || 0);
        bValue = (Number((b as any).ongoingProjects) || 0) + (Number((b as any).completedProjects) || 0);
      }

      // string compare untuk nama/kota
      if (typeof aValue === "string" || typeof bValue === "string") {
        const aStr = String(aValue || "");
        const bStr = String(bValue || "");
        return sortOrder === "asc" ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
      }

      // numeric compare
      const aNum = Number(aValue) || 0;
      const bNum = Number(bValue) || 0;
      return sortOrder === "asc" ? aNum - bNum : bNum - aNum;
    });

    return filtered;
  }, [provinces, searchQuery, sortBy, sortOrder]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-lg text-muted-foreground">Memuat data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="text-center p-6 bg-card border rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold text-destructive mb-2">Terjadi Kesalahan</h2>
                <p className="text-muted-foreground mb-6">{error}</p>
                <Link to="/dashboard">
                    <Button variant="outline">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Kembali ke Dashboard
                    </Button>
                </Link>
            </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 pt-24 pb-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Regional Transparansi Dana</h1>
          <p className="text-muted-foreground">
            Monitoring distribusi dan penggunaan dana APBN di 38 provinsi Indonesia
          </p>
        </div>

        {/* Statistics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-card border rounded-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Landmark className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Dana</p>
                <p className="text-xl font-bold text-foreground">{formatCurrency(totals.totalReceived)}</p>
              </div>
            </div>
          </div>

          <div className="bg-card border rounded-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Dana Terpakai</p>
                <p className="text-xl font-bold text-foreground">{formatCurrency(totals.totalUsed)}</p>
              </div>
            </div>
          </div>

          <div className="bg-card border rounded-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Kota/Kab</p>
                <p className="text-xl font-bold text-foreground">{totals.totalCities ?? 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-card border rounded-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Proyek</p>
                <p className="text-xl font-bold text-foreground">{totals.totalProjects ?? 0}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter (pakai komponen SearchFilter dari page lama) */}
        <div className="mb-8">
          <SearchFilter
            onSearch={setSearchQuery}
            onSort={(sortField: any, order: "asc" | "desc") => {
              // Pastikan sortField matching key di Province
              setSortBy(sortField as keyof Province);
              setSortOrder(order);
            }}
          />
        </div>

        {/* Province Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedProvinces.map((province) => (
            <ProvinceCard
              key={(province as any).id ?? province.name}
              id={(province as any).id ?? province.name}
              name={province.name ?? "—"}
              receivedFunds={Number((province as any).receivedFunds) || 0}
              usedFunds={Number((province as any).usedFunds) || 0}
              remainingFunds={Number((province as any).remainingFunds) || 0}
              cityName={(province as any).cityName ?? ""}
              ongoingProjects={Number((province as any).ongoingProjects) || 0}
              completedProjects={Number((province as any).completedProjects) || 0}
              population={Number((province as any).population) || 0}
            />
          ))}
        </div>

        {/* Results Counter */}
        <div className="mt-8 text-center">
          <p className="text-muted-foreground">
            Menampilkan {filteredAndSortedProvinces.length} dari {provinces.length} provinsi
          </p>
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default Regional;