import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, 
  Heart, 
  CreditCard, 
  FileText, 
  Plus, 
  Eye, 
  Settings, 
  LogOut,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [stats, setStats] = useState({
    totalStories: 6,
    totalDonations: 24,
    totalRequests: 18,
    pendingRequests: 5,
    totalFunds: "₦100,000,000+",
    monthlyDonations: "₦8,500,000"
  });

  useEffect(() => {
    // Check if admin is authenticated
    const isAuthenticated = localStorage.getItem("adminAuthenticated");
    if (!isAuthenticated) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate("/admin/login");
  };

  const quickActions = [
    {
      title: "Add New Story",
      description: "Create a new transformation story",
      icon: Plus,
      action: () => navigate("/admin/stories"),
      color: "bg-primary text-primary-foreground"
    },
    {
      title: "View Requests",
      description: "Review help requests",
      icon: FileText,
      action: () => navigate("/admin/requests"),
      color: "bg-secondary text-secondary-foreground"
    },
    {
      title: "Manage Donations",
      description: "View donation history",
      icon: CreditCard,
      action: () => navigate("/admin/donations"),
      color: "bg-tertiary text-tertiary-foreground"
    },
    {
      title: "Site Settings",
      description: "Configure site options",
      icon: Settings,
      action: () => navigate("/admin/stories"),
      color: "bg-earth text-earth-foreground"
    }
  ];

  const recentActivity = [
    {
      type: "donation",
      message: "New donation of ₦50,000 received",
      time: "2 hours ago",
      status: "success"
    },
    {
      type: "request",
      message: "Help request from Fatima Hassan",
      time: "4 hours ago",
      status: "pending"
    },
    {
      type: "story",
      message: "Story updated: Aisha's recovery progress",
      time: "1 day ago",
      status: "info"
    },
    {
      type: "donation",
      message: "Monthly recurring donation processed",
      time: "2 days ago",
      status: "success"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "info":
        return <Eye className="h-4 w-4 text-blue-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Admin Header */}
      <header className="bg-background border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Okwulora Helps Admin</h1>
                <p className="text-sm text-muted-foreground">Administrative Dashboard</p>
              </div>
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
                className="touch-target"
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Donations
              </Button>
            </nav>
            
            <Button variant="outline" onClick={handleLogout} className="touch-target">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
              <li>
                <span className="text-foreground font-medium">Admin Dashboard</span>
              </li>
            </ol>
          </nav>

          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">Welcome back, Admin</h2>
            <p className="text-muted-foreground">
              Here's an overview of your organization's impact and recent activity.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="card-trust">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Stories</p>
                    <p className="text-2xl font-bold text-foreground">{stats.totalStories}</p>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-warm">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Donations</p>
                    <p className="text-2xl font-bold text-foreground">{stats.totalDonations}</p>
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
                    <p className="text-sm font-medium text-muted-foreground">Help Requests</p>
                    <p className="text-2xl font-bold text-foreground">{stats.totalRequests}</p>
                    <p className="text-sm text-muted-foreground">{stats.pendingRequests} pending</p>
                  </div>
                  <div className="w-12 h-12 bg-tertiary/10 rounded-full flex items-center justify-center">
                    <FileText className="h-6 w-6 text-tertiary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-warm">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Funds</p>
                    <p className="text-2xl font-bold text-foreground">{stats.totalFunds}</p>
                    <p className="text-sm text-muted-foreground">+{stats.monthlyDonations} this month</p>
                  </div>
                  <div className="w-12 h-12 bg-earth/10 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-earth" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <Card 
                  key={index} 
                  className="cursor-pointer hover:shadow-medium transition-all duration-200"
                  onClick={action.action}
                >
                  <CardContent className="pt-6">
                    <div className={`w-12 h-12 ${action.color} rounded-full flex items-center justify-center mb-4`}>
                      <action.icon className="h-6 w-6" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">{action.title}</h4>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Additional Action Buttons */}
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                variant="outline"
                onClick={() => navigate("/admin/stories")}
                className="touch-target"
              >
                <Users className="h-4 w-4 mr-2" />
                View All Stories
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/admin/requests")}
                className="touch-target"
              >
                <FileText className="h-4 w-4 mr-2" />
                View All Requests
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/admin/donations")}
                className="touch-target"
              >
                <CreditCard className="h-4 w-4 mr-2" />
                View All Donations
              </Button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                      {getStatusIcon(activity.status)}
                      <div className="flex-1">
                        <p className="text-sm text-foreground">{activity.message}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  This Month's Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">Families Helped</p>
                      <p className="text-sm text-muted-foreground">Medical assistance provided</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">12</p>
                      <p className="text-sm text-green-600">+20% from last month</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">Donations Received</p>
                      <p className="text-sm text-muted-foreground">New supporters joined</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600">45</p>
                      <p className="text-sm text-blue-600">+15% from last month</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">Stories Shared</p>
                      <p className="text-sm text-muted-foreground">Transformation updates</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-purple-600">8</p>
                      <p className="text-sm text-purple-600">+33% from last month</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
