import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  Search, 
  Download, 
  Eye, 
  CreditCard,
  TrendingUp,
  Calendar,
  DollarSign,
  Users,
  FileText,
  LogOut
} from "lucide-react";

interface Donation {
  id: number;
  donorName: string;
  email: string;
  amount: number;
  message?: string;
  status: "completed" | "pending" | "failed";
  paymentMethod: string;
  createdAt: string;
  transactionId: string;
}

const AdminDonations = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [donations, setDonations] = useState<Donation[]>([
    {
      id: 1,
      donorName: "Adebayo Johnson",
      email: "adebayo.j@email.com",
      amount: 50000,
      message: "Keep up the great work helping Nigerians!",
      status: "completed",
      paymentMethod: "Bank Transfer",
      createdAt: "2024-01-20",
      transactionId: "TXN-001-2024"
    },
    {
      id: 2,
      donorName: "Chioma Okonkwo",
      email: "chioma.o@email.com",
      amount: 25000,
      message: "Every little bit helps. God bless you all.",
      status: "completed",
      paymentMethod: "Credit Card",
      createdAt: "2024-01-19",
      transactionId: "TXN-002-2024"
    },
    {
      id: 3,
      donorName: "Emeka Eze",
      email: "emeka.e@email.com",
      amount: 100000,
      status: "completed",
      paymentMethod: "Mobile Money",
      createdAt: "2024-01-18",
      transactionId: "TXN-003-2024"
    },
    {
      id: 4,
      donorName: "Fatima Bello",
      email: "fatima.b@email.com",
      amount: 75000,
      message: "Supporting healthcare for all Nigerians.",
      status: "pending",
      paymentMethod: "Bank Transfer",
      createdAt: "2024-01-17",
      transactionId: "TXN-004-2024"
    },
    {
      id: 5,
      donorName: "Kemi Adebayo",
      email: "kemi.a@email.com",
      amount: 150000,
      status: "completed",
      paymentMethod: "Credit Card",
      createdAt: "2024-01-16",
      transactionId: "TXN-005-2024"
    },
    {
      id: 6,
      donorName: "Hassan Yusuf",
      email: "hassan.y@email.com",
      amount: 30000,
      status: "failed",
      paymentMethod: "Mobile Money",
      createdAt: "2024-01-15",
      transactionId: "TXN-006-2024"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("all");
  const [dateRange, setDateRange] = useState("all");

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("adminAuthenticated");
    if (!isAuthenticated) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const filteredDonations = donations.filter(donation => {
    const matchesSearch = donation.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donation.transactionId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || donation.status === selectedStatus;
    const matchesPaymentMethod = selectedPaymentMethod === "all" || donation.paymentMethod === selectedPaymentMethod;
    
    return matchesSearch && matchesStatus && matchesPaymentMethod;
  });

  const totalAmount = filteredDonations.reduce((sum, donation) => sum + donation.amount, 0);
  const completedDonations = filteredDonations.filter(d => d.status === "completed").length;
  const pendingDonations = filteredDonations.filter(d => d.status === "pending").length;
  const failedDonations = filteredDonations.filter(d => d.status === "failed").length;

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 text-xs rounded-full font-medium";
    switch (status) {
      case "completed":
        return `${baseClasses} bg-green-100 text-green-800`;
      case "pending":
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case "failed":
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case "Credit Card":
        return <CreditCard className="h-4 w-4" />;
      case "Bank Transfer":
        return <TrendingUp className="h-4 w-4" />;
      case "Mobile Money":
        return <DollarSign className="h-4 w-4" />;
      default:
        return <CreditCard className="h-4 w-4" />;
    }
  };

  const exportDonations = () => {
    const csvContent = [
      ["ID", "Donor Name", "Email", "Amount (₦)", "Status", "Payment Method", "Date", "Transaction ID"],
      ...filteredDonations.map(d => [
        d.id,
        d.donorName,
        d.email,
        d.amount.toLocaleString(),
        d.status,
        d.paymentMethod,
        d.createdAt,
        d.transactionId
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `donations-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export Successful",
      description: "Donations data has been exported to CSV.",
    });
  };

  const handleBackToDashboard = () => {
    navigate("/admin/dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    navigate("/admin/login");
    toast({
      title: "Logged Out",
      description: "You have been logged out.",
    });
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Admin Header */}
      <header className="bg-background border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={handleBackToDashboard} className="touch-target">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </div>
            
            {/* Admin Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              <Button
                variant="ghost"
                onClick={() => navigate("/admin/stories")}
                className="touch-target"
              >
                <Users className="h-4 w-4 mr-2" />
                Stories
              </Button>
              <Button
                variant="ghost"
                onClick={() => navigate("/admin/requests")}
                className="touch-target"
              >
                <FileText className="h-4 w-4 mr-2" />
                Requests
              </Button>
              <Button
                variant="ghost"
                onClick={() => navigate("/admin/donations")}
                className="touch-target bg-accent"
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Donations
              </Button>
            </nav>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Manage Donations</h1>
                <p className="text-sm text-muted-foreground">Donation history and management</p>
              </div>
              <Button variant="outline" onClick={handleLogout} className="touch-target">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
              <li>
                <Button variant="ghost" onClick={handleBackToDashboard} className="p-0 h-auto font-normal text-muted-foreground hover:text-foreground">
                  Admin Dashboard
                </Button>
              </li>
              <li>/</li>
              <li>
                <span className="text-foreground font-medium">Donations</span>
              </li>
            </ol>
          </nav>

          {/* Header Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Donations</h2>
              <p className="text-muted-foreground">
                Track and manage all donations received by your organization.
              </p>
            </div>
            <Button onClick={exportDonations} variant="outline" className="btn-cta-secondary touch-target">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="card-trust">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Amount</p>
                    <p className="text-2xl font-bold text-foreground">₦{totalAmount.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-warm">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Donations</p>
                    <p className="text-2xl font-bold text-foreground">{filteredDonations.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                    <CreditCard className="h-6 w-6 text-secondary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-trust">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Completed</p>
                    <p className="text-2xl font-bold text-foreground">{completedDonations}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-warm">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Pending</p>
                    <p className="text-2xl font-bold text-foreground">{pendingDonations}</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search donors, emails, or transaction IDs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="form-input"
            >
              <option value="all">All Statuses</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
            <select
              value={selectedPaymentMethod}
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
              className="form-input"
            >
              <option value="all">All Payment Methods</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Mobile Money">Mobile Money</option>
            </select>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="form-input"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
          </div>

          {/* Donations Table */}
          <Card>
            <CardHeader>
              <CardTitle>Donation Records</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-medium">Donor</th>
                      <th className="text-left py-3 px-4 font-medium">Amount</th>
                      <th className="text-left py-3 px-4 font-medium">Status</th>
                      <th className="text-left py-3 px-4 font-medium">Payment Method</th>
                      <th className="text-left py-3 px-4 font-medium">Date</th>
                      <th className="text-left py-3 px-4 font-medium">Transaction ID</th>
                      <th className="text-left py-3 px-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDonations.map((donation) => (
                      <tr key={donation.id} className="border-b border-border hover:bg-muted/30">
                        <td className="py-3 px-4">
                          <div>
                            <div className="font-medium text-foreground">{donation.donorName}</div>
                            <div className="text-sm text-muted-foreground">{donation.email}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-semibold text-foreground">₦{donation.amount.toLocaleString()}</div>
                          {donation.message && (
                            <div className="text-xs text-muted-foreground mt-1 max-w-xs truncate">
                              "{donation.message}"
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <span className={getStatusBadge(donation.status)}>
                            {donation.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            {getPaymentMethodIcon(donation.paymentMethod)}
                            <span className="text-sm">{donation.paymentMethod}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">
                          {donation.createdAt}
                        </td>
                        <td className="py-3 px-4">
                          <code className="text-xs bg-muted px-2 py-1 rounded">
                            {donation.transactionId}
                          </code>
                        </td>
                        <td className="py-3 px-4">
                          <Button variant="ghost" size="sm" className="touch-target">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Empty State */}
              {filteredDonations.length === 0 && (
                <div className="text-center py-16">
                  <CreditCard className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">No donations found</h3>
                  <p className="text-muted-foreground">
                    {searchTerm || selectedStatus !== "all" || selectedPaymentMethod !== "all"
                      ? "Try adjusting your filters or search terms."
                      : "No donations have been recorded yet."}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminDonations;
