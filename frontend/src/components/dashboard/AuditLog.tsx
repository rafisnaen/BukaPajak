import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Shield, Clock, Landmark } from "lucide-react";

const auditLogData = [
  {
    id: "TX001",
    timestamp: "2024-01-15T10:30:00Z",
    type: "Transfer Dana",
    from: "Treasury APBN",
    to: "Pemerintah Daerah DKI Jakarta",
    amount: 25000000000,
    txHash: "0x742d35Cc0Ba1E0f9d8B15A9D8F9C4E1B2A3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R",
    blockNumber: 19234567,
    status: "Confirmed",
    gasUsed: "21000"
  },
  {
    id: "TX002", 
    timestamp: "2024-01-15T09:15:00Z",
    type: "Allocation",
    from: "Ministry of Finance",
    to: "Project: Jalan Tol Trans Sumatra",
    amount: 5000000000,
    txHash: "0x842e46Dd1Cb2F1a8e9C26B0E0F9D5F2C3B4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S",
    blockNumber: 19234532,
    status: "Confirmed",
    gasUsed: "35000"
  },
  {
    id: "TX003",
    timestamp: "2024-01-14T16:45:00Z", 
    type: "Expense Report",
    from: "Project: Modernisasi Irigasi",
    to: "Public Audit",
    amount: 1200000000,
    txHash: "0x943f57Ee2Dc3G2b9f0D37C1F1G0E6G3D4C5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T",
    blockNumber: 19233890,
    status: "Confirmed", 
    gasUsed: "28000"
  },
  {
    id: "TX004",
    timestamp: "2024-01-14T14:20:00Z",
    type: "Budget Revision",
    from: "Parliament Approval",
    to: "Healthcare Infrastructure",
    amount: 8500000000,
    txHash: "0xa44068Ff3Ed4H3ca01E48D2G2H1F7H4E5D6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U",
    blockNumber: 19233756,
    status: "Confirmed",
    gasUsed: "42000"
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
    return `Rp${(value / 1000000000000).toFixed(1)}T`;
  }
  if (value >= 1000000000) {
    return `Rp${(value / 1000000000).toFixed(1)}M`;
  }
  return formatRupiah(value);
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "Transfer Dana":
      return "bg-blue-100 text-blue-800";
    case "Allocation":
      return "bg-green-100 text-green-800"; 
    case "Expense Report":
      return "bg-orange-100 text-orange-800";
    case "Budget Revision":
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case "Transfer Dana":
      return <Landmark className="w-4 h-4" />;
    case "Allocation":
      return <Shield className="w-4 h-4" />;
    case "Expense Report":
      return <Clock className="w-4 h-4" />;
    case "Budget Revision":
      return <ExternalLink className="w-4 h-4" />;
    default:
      return <Shield className="w-4 h-4" />;
  }
};

export const AuditLog = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Audit Log Blockchain
        </CardTitle>
        <CardDescription>
          Log transaksi keuangan publik yang tercatat secara transparan di blockchain
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {auditLogData.map((log) => (
            <div key={log.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-muted">
                    {getTypeIcon(log.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{log.type}</h4>
                      <Badge className={getTypeColor(log.type)}>
                        {log.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {new Date(log.timestamp).toLocaleString('id-ID')}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-success">{formatRupiahShort(log.amount)}</p>
                  <p className="text-xs text-muted-foreground">Block #{log.blockNumber}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Dari:</p>
                  <p className="font-medium">{log.from}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Ke:</p>
                  <p className="font-medium">{log.to}</p>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 border-t">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>Gas: {log.gasUsed}</span>
                  <span>Hash: {log.txHash.slice(0, 10)}...{log.txHash.slice(-8)}</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open(`https://etherscan.io/tx/${log.txHash}`, '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Lihat di Explorer
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <Button variant="outline">
            Lihat Semua Transaksi
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};