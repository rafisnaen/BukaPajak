import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ArrowUpDown } from "lucide-react";

interface SearchFilterProps {
  onSearch: (query: string) => void;
  onSort: (sortBy: string, order: 'asc' | 'desc') => void;
}

const SearchFilter = ({ onSearch, onSort }: SearchFilterProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [sortBy, setSortBy] = useState("receivedFunds");

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
  };

  const handleSort = (newSortBy: string) => {
    setSortBy(newSortBy);
    onSort(newSortBy, sortOrder);
  };

  const toggleSortOrder = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);
    onSort(sortBy, newOrder);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-card p-6 rounded-lg border">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Cari provinsi..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10"
        />
      </div>
      
      <div className="flex items-center gap-3">
        <Select value={sortBy} onValueChange={handleSort}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Urutkan berdasarkan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="receivedFunds">Dana Diterima</SelectItem>
            <SelectItem value="usedFunds">Dana Terpakai</SelectItem>
            <SelectItem value="remainingFunds">Sisa Dana</SelectItem>
            <SelectItem value="name">Nama Provinsi</SelectItem>
            <SelectItem value="cities">Jumlah Kota</SelectItem>
            <SelectItem value="projects">Jumlah Proyek</SelectItem>
          </SelectContent>
        </Select>
        
        <Button
          variant="outline"
          size="icon"
          onClick={toggleSortOrder}
          className="flex-shrink-0"
        >
          <ArrowUpDown className="w-4 h-4" />
        </Button>
        
        <span className="text-sm text-muted-foreground">
          {sortOrder === 'desc' ? 'Terbesar' : 'Terkecil'}
        </span>
      </div>
    </div>
  );
};

export default SearchFilter;