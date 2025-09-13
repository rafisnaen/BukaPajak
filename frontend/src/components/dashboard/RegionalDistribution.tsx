import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const regionalData = [
  { name: "DKI Jakarta", allocated: 180000000000, used: 165000000000, population: 10560000 },
  { name: "Jawa Barat", allocated: 220000000000, used: 198000000000, population: 48800000 },
  { name: "Jawa Tengah", allocated: 165000000000, used: 152000000000, population: 34500000 },
  { name: "Jawa Timur", allocated: 195000000000, used: 178000000000, population: 39600000 },
  { name: "Sumatera Utara", allocated: 125000000000, used: 118000000000, population: 14800000 },
  { name: "Sulawesi Selatan", allocated: 98000000000, used: 89000000000, population: 8950000 },
  { name: "Kalimantan Timur", allocated: 85000000000, used: 78000000000, population: 3800000 },
  { name: "Papua", allocated: 120000000000, used: 105000000000, population: 4300000 },
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

export const RegionalDistribution = () => {
  const totalAllocated = regionalData.reduce((sum, region) => sum + region.allocated, 0);
  const totalUsed = regionalData.reduce((sum, region) => sum + region.used, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary">Distribusi Dana Regional</CardTitle>
        <CardDescription>
          Penyaluran dana ke daerah - Total Dialokasikan: {formatRupiahShort(totalAllocated)} | 
          Terpakai: {formatRupiahShort(totalUsed)} ({((totalUsed / totalAllocated) * 100).toFixed(1)}%)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {regionalData.map((region, index) => {
            const usagePercentage = (region.used / region.allocated) * 100;
            const perCapita = region.allocated / region.population;
            
            return (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-primary">{region.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Populasi: {region.population.toLocaleString('id-ID')} jiwa
                    </p>
                  </div>
                  <Badge variant="secondary">
                    {formatRupiah(perCapita)} per kapita
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Dialokasikan</p>
                    <p className="font-semibold">{formatRupiahShort(region.allocated)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Terpakai</p>
                    <p className="font-semibold text-success">{formatRupiahShort(region.used)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Sisa</p>
                    <p className="font-semibold text-warning">{formatRupiahShort(region.allocated - region.used)}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Penggunaan Dana</span>
                    <span>{usagePercentage.toFixed(1)}%</span>
                  </div>
                  <Progress value={usagePercentage} className="h-2" />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};