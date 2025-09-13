import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchFilter from "@/components/ui/search-filter";
import ProvinceCard from "@/components/ui/province-card";
import { provinces, Province } from "@/data/provinces";
import { MapPin, DollarSign, TrendingUp, BarChart3 } from "lucide-react";

const Regional = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("receivedFunds");
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Calculate totals
  const totals = useMemo(() => {
    return provinces.reduce((acc, province) => ({
      totalReceived: acc.totalReceived + province.receivedFunds,
      totalUsed: acc.totalUsed + province.usedFunds,
      totalRemaining: acc.totalRemaining + province.remainingFunds,
      totalCities: acc.totalCities + province.cities,
      totalProjects: acc.totalProjects + (province.ongoingProjects + province.completedProjects)
    }), {
      totalReceived: 0,
      totalUsed: 0,
      totalRemaining: 0,
      totalCities: 0,
      totalProjects: 0
    });
  }, []);

  // Filter and sort provinces
  const filteredAndSortedProvinces = useMemo(() => {
    let filtered = provinces.filter(province =>
      province.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    filtered.sort((a, b) => {
      let aValue: number | string = a[sortBy as keyof Province];
      let bValue: number | string = b[sortBy as keyof Province];

      if (sortBy === 'projects') {
        aValue = a.ongoingProjects + a.completedProjects;
        bValue = b.ongoingProjects + b.completedProjects;
      }

      if (typeof aValue === 'string') {
        return sortOrder === 'asc' 
          ? aValue.localeCompare(bValue as string)
          : (bValue as string).localeCompare(aValue);
      }

      return sortOrder === 'asc' 
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    });

    return filtered;
  }, [searchQuery, sortBy, sortOrder]);

  const formatCurrency = (amount: number) => {
    return `Rp ${(amount / 1000000000000).toFixed(1)}T`;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      
      <main className="container mx-auto px-4 pt-24 pb-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Regional Transparansi Dana</h1>
          <p className="text-muted-foreground">
            Monitoring distribusi dan penggunaan dana APBN di 38 provinsi Indonesia
          </p>
        </div>
        <Header />

        {/* Statistics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-card border rounded-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-primary" />
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
                <p className="text-xl font-bold text-foreground">{totals.totalCities}</p>
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
                <p className="text-xl font-bold text-foreground">{totals.totalProjects}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <SearchFilter 
            onSearch={setSearchQuery}
            onSort={(sortField, order) => {
              setSortBy(sortField);
              setSortOrder(order);
            }}
          />
        </div>

        {/* Province Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedProvinces.map((province) => (
            <ProvinceCard
              key={province.id}
              name={province.name}
              receivedFunds={province.receivedFunds}
              usedFunds={province.usedFunds}
              remainingFunds={province.remainingFunds}
              cities={province.cities}
              ongoingProjects={province.ongoingProjects}
              completedProjects={province.completedProjects}
              population={province.population}
            />
          ))}
        </div>

        {/* Results Counter */}
        <div className="mt-8 text-center">
          <p className="text-muted-foreground">
            Menampilkan {filteredAndSortedProvinces.length} dari {provinces.length} provinsi
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Regional;