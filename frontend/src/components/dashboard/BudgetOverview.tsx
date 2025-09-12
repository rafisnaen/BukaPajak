import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const taxBreakdownData = [
  { name: "Pajak Penghasilan", value: 850000000000, color: "#3338A0" },
  { name: "PPN", value: 650000000000, color: "#C59560" },
  { name: "Bea Cukai", value: 180000000000, color: "#FCC61D" },
  { name: "Pajak Daerah", value: 320000000000, color: "#8884d8" },
];

const monthlyData = [
  { month: "Jan", amount: 125000000000 },
  { month: "Feb", amount: 135000000000 },
  { month: "Mar", amount: 142000000000 },
  { month: "Apr", amount: 158000000000 },
  { month: "May", amount: 165000000000 },
  { month: "Jun", amount: 170000000000 },
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

export const BudgetOverview = () => {
  const totalBudget = taxBreakdownData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">Total APBN 2024</CardTitle>
          <CardDescription>Breakdown berdasarkan sumber pajak</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <p className="text-3xl font-bold text-primary">{formatRupiah(totalBudget)}</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={taxBreakdownData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {taxBreakdownData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatRupiah(Number(value))} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-primary">Penerimaan Bulanan 2024</CardTitle>
          <CardDescription>Tren penerimaan APBN per bulan</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={formatRupiahShort} />
              <Tooltip formatter={(value) => formatRupiah(Number(value))} />
              <Bar dataKey="amount" fill="#3338A0" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};