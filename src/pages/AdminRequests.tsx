import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  Search, 
  Eye, 
  FileText, 
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  Calendar,
  User,
  Users,
  CreditCard,
  LogOut
} from "lucide-react";
import { Label } from "@/components/ui/label";

interface HelpRequest {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  age: string;
  gender: string;
  ailmentType: string;
  description: string;
  treatmentProgress: string;
  status: "pending" | "reviewing" | "approved" | "rejected" | "completed";
  priority: "low" | "medium" | "high" | "urgent";
  createdAt: string;
  assignedTo?: string;
  notes?: string;
}

const AdminRequests = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [requests, setRequests] = useState<HelpRequest[]>([
    {
      id: 1,
      fullName: "Aisha Bello",
      email: "aisha.b@email.com",
      phone: "+234 801 234 5678",
      address: "Lagos, Nigeria",
      age: "28",
      gender: "Female",
      ailmentType: "Heart Surgery",
      description: "Need urgent heart surgery for congenital heart defect. Doctor recommended immediate intervention.",
      treatmentProgress: "Diagnosed, awaiting surgery",
      status: "urgent",
      priority: "urgent",
      createdAt: "2024-01-20",
      assignedTo: "Dr. Emeka Okonkwo",
      notes: "Patient needs immediate attention. Surgery scheduled for next week."
    },
    {
      id: 2,
      fullName: "Emeka Okafor",
      email: "emeka.o@email.com",
      phone: "+234 802 345 6789",
      address: "Enugu, Nigeria",
      age: "35",
      gender: "Male",
      ailmentType: "Diabetes Management",
      description: "Struggling with diabetes management. Need help with medication and monitoring supplies.",
      treatmentProgress: "On medication, needs monitoring",
      status: "reviewing",
      priority: "medium",
      createdAt: "2024-01-19",
      assignedTo: "Dr. Fatima Hassan"
    },
    {
      id: 3,
      fullName: "Fatima Hassan",
      email: "fatima.h@email.com",
      phone: "+234 803 456 7890",
      address: "Kano, Nigeria",
      age: "22",
      gender: "Female",
      ailmentType: "Emergency Appendectomy",
      description: "Severe abdominal pain, diagnosed with appendicitis. Need emergency surgery.",
      treatmentProgress: "Emergency room visit, surgery needed",
      status: "approved",
      priority: "high",
      createdAt: "2024-01-18",
      assignedTo: "Dr. Chukwudi Okonkwo",
      notes: "Surgery approved and scheduled for tomorrow."
    },
    {
      id: 4,
      fullName: "Chukwudi Okonkwo",
      email: "chukwudi.o@email.com",
      phone: "+234 804 567 8901",
      address: "Abuja, Nigeria",
      age: "45",
      gender: "Male",
      ailmentType: "Cancer Treatment",
      description: "Diagnosed with early-stage cancer. Need chemotherapy treatment and support.",
      treatmentProgress: "Diagnosed, treatment plan needed",
      status: "pending",
      priority: "high",
      createdAt: "2024-01-17"
    },
    {
      id: 5,
      fullName: "Hauwa Yusuf",
      email: "hauwa.y@email.com",
      phone: "+234 805 678 9012",
      address: "Kaduna, Nigeria",
      age: "26",
      gender: "Female",
      ailmentType: "Maternity Care",
      description: "Pregnant with twins, high-risk pregnancy. Need specialized maternity care.",
      treatmentProgress: "Regular checkups, monitoring needed",
      status: "reviewing",
      priority: "medium",
      createdAt: "2024-01-16",
      assignedTo: "Dr. Kemi Adebayo"
    },
    {
      id: 6,
      fullName: "Kemi Adebayo",
      email: "kemi.a@email.com",
      phone: "+234 806 789 0123",
      address: "Ibadan, Nigeria",
      age: "31",
      gender: "Female",
      ailmentType: "Orthopedic Surgery",
      description: "Severe knee injury from accident. Need reconstructive surgery and rehabilitation.",
      treatmentProgress: "Initial treatment completed, surgery needed",
      status: "approved",
      priority: "medium",
      createdAt: "2024-01-15",
      assignedTo: "Dr. Aisha Bello",
      notes: "Surgery approved. Patient will need 6 months rehabilitation."
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [selectedAilmentType, setSelectedAilmentType] = useState("all");
  const [selectedRequest, setSelectedRequest] = useState<HelpRequest | null>(null);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("adminAuthenticated");
    if (!isAuthenticated) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.ailmentType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || request.status === selectedStatus;
    const matchesPriority = selectedPriority === "all" || request.priority === selectedPriority;
    const matchesAilmentType = selectedAilmentType === "all" || request.ailmentType === selectedAilmentType;
    
    return matchesSearch && matchesStatus && matchesPriority && matchesAilmentType;
  });

  const pendingRequests = requests.filter(r => r.status === "pending").length;
  const reviewingRequests = requests.filter(r => r.status === "reviewing").length;
  const approvedRequests = requests.filter(r => r.status === "approved").length;
  const completedRequests = requests.filter(r => r.status === "completed").length;

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 text-xs rounded-full font-medium";
    switch (status) {
      case "pending":
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case "reviewing":
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case "approved":
        return `${baseClasses} bg-green-100 text-green-800`;
      case "rejected":
        return `${baseClasses} bg-red-100 text-red-800`;
      case "completed":
        return `${baseClasses} bg-purple-100 text-purple-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getPriorityBadge = (priority: string) => {
    const baseClasses = "px-2 py-1 text-xs rounded-full font-medium";
    switch (priority) {
      case "urgent":
        return `${baseClasses} bg-red-100 text-red-800`;
      case "high":
        return `${baseClasses} bg-orange-100 text-orange-800`;
      case "medium":
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case "low":
        return `${baseClasses} bg-green-100 text-green-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const updateRequestStatus = (id: number, newStatus: HelpRequest["status"]) => {
    setRequests(prev => prev.map(request => 
      request.id === id ? { ...request, status: newStatus } : request
    ));
    toast({
      title: "Status Updated",
      description: `Request status has been updated to ${newStatus}.`,
    });
  };

  const assignRequest = (id: number, assignedTo: string) => {
    setRequests(prev => prev.map(request => 
      request.id === id ? { ...request, assignedTo } : request
    ));
    toast({
      title: "Request Assigned",
      description: `Request has been assigned to ${assignedTo}.`,
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
                className="touch-target bg-accent"
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
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-tertiary/10 rounded-full flex items-center justify-center">
                <FileText className="h-6 w-6 text-tertiary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Manage Requests</h1>
                <p className="text-sm text-muted-foreground">Help requests management</p>
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
                <span className="text-foreground font-medium">Requests</span>
              </li>
            </ol>
          </nav>

          {/* Header Actions */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">Help Requests</h2>
            <p className="text-muted-foreground">
              Review and manage help requests from Nigerians seeking medical assistance.
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="card-trust">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Pending</p>
                    <p className="text-2xl font-bold text-foreground">{pendingRequests}</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-warm">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Reviewing</p>
                    <p className="text-2xl font-bold text-foreground">{reviewingRequests}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <AlertCircle className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-trust">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Approved</p>
                    <p className="text-2xl font-bold text-foreground">{approvedRequests}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-warm">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Completed</p>
                    <p className="text-2xl font-bold text-foreground">{completedRequests}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-purple-600" />
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
                placeholder="Search by name, email, or ailment..."
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
              <option value="pending">Pending</option>
              <option value="reviewing">Reviewing</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="completed">Completed</option>
            </select>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="form-input"
            >
              <option value="all">All Priorities</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <select
              value={selectedAilmentType}
              onChange={(e) => setSelectedAilmentType(e.target.value)}
              className="form-input"
            >
              <option value="all">All Ailment Types</option>
              <option value="Heart Surgery">Heart Surgery</option>
              <option value="Diabetes Management">Diabetes Management</option>
              <option value="Emergency Appendectomy">Emergency Appendectomy</option>
              <option value="Cancer Treatment">Cancer Treatment</option>
              <option value="Maternity Care">Maternity Care</option>
              <option value="Orthopedic Surgery">Orthopedic Surgery</option>
            </select>
          </div>

          {/* Requests Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredRequests.map((request) => (
              <Card key={request.id} className="hover:shadow-medium transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{request.fullName}</h3>
                      <p className="text-sm text-muted-foreground">{request.ailmentType}</p>
                    </div>
                    <div className="flex gap-2">
                      <span className={getStatusBadge(request.status)}>
                        {request.status}
                      </span>
                      <span className={getPriorityBadge(request.priority)}>
                        {request.priority}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="h-4 w-4" />
                      <span>{request.age} years old, {request.gender}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <span>{request.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <span>{request.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{request.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Submitted: {request.createdAt}</span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {request.description}
                  </p>

                  {request.assignedTo && (
                    <div className="mb-4 p-3 bg-muted rounded-lg">
                      <p className="text-sm text-foreground">
                        <strong>Assigned to:</strong> {request.assignedTo}
                      </p>
                    </div>
                  )}

                  {request.notes && (
                    <div className="mb-4 p-3 bg-accent rounded-lg">
                      <p className="text-sm text-foreground">
                        <strong>Notes:</strong> {request.notes}
                      </p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedRequest(request)}
                      className="flex-1 touch-target"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    {request.status === "pending" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateRequestStatus(request.id, "reviewing")}
                        className="touch-target"
                      >
                        <AlertCircle className="h-4 w-4 mr-2" />
                        Review
                      </Button>
                    )}
                    {request.status === "reviewing" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateRequestStatus(request.id, "approved")}
                        className="touch-target"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredRequests.length === 0 && (
            <div className="text-center py-16">
              <FileText className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No requests found</h3>
              <p className="text-muted-foreground">
                {searchTerm || selectedStatus !== "all" || selectedPriority !== "all" || selectedAilmentType !== "all"
                  ? "Try adjusting your filters or search terms."
                  : "No help requests have been submitted yet."}
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Request Details Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Request Details - {selectedRequest.fullName}</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedRequest(null)}
                >
                  <XCircle className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Full Name</Label>
                  <p className="text-foreground">{selectedRequest.fullName}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Age & Gender</Label>
                  <p className="text-foreground">{selectedRequest.age} years old, {selectedRequest.gender}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                  <p className="text-foreground">{selectedRequest.email}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Phone</Label>
                  <p className="text-foreground">{selectedRequest.phone}</p>
                </div>
                <div className="md:col-span-2">
                  <Label className="text-sm font-medium text-muted-foreground">Address</Label>
                  <p className="text-foreground">{selectedRequest.address}</p>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-muted-foreground">Ailment Type</Label>
                <p className="text-foreground">{selectedRequest.ailmentType}</p>
              </div>

              <div>
                <Label className="text-sm font-medium text-muted-foreground">Description</Label>
                <p className="text-foreground">{selectedRequest.description}</p>
              </div>

              <div>
                <Label className="text-sm font-medium text-muted-foreground">Treatment Progress</Label>
                <p className="text-foreground">{selectedRequest.treatmentProgress}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Status</Label>
                  <span className={getStatusBadge(selectedRequest.status)}>
                    {selectedRequest.status}
                  </span>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Priority</Label>
                  <span className={getPriorityBadge(selectedRequest.priority)}>
                    {selectedRequest.priority}
                  </span>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Submitted</Label>
                  <p className="text-foreground">{selectedRequest.createdAt}</p>
                </div>
              </div>

              {selectedRequest.assignedTo && (
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Assigned To</Label>
                  <p className="text-foreground">{selectedRequest.assignedTo}</p>
                </div>
              )}

              {selectedRequest.notes && (
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Notes</Label>
                  <p className="text-foreground">{selectedRequest.notes}</p>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => setSelectedRequest(null)}
                  className="flex-1"
                  variant="outline"
                >
                  Close
                </Button>
                {selectedRequest.status === "pending" && (
                  <Button
                    onClick={() => {
                      updateRequestStatus(selectedRequest.id, "reviewing");
                      setSelectedRequest(null);
                    }}
                    className="flex-1 btn-cta-primary"
                  >
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Start Review
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminRequests;
