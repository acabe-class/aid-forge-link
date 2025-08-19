import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  ArrowLeft, 
  Save, 
  X,
  Users,
  Search,
  FileText,
  CreditCard,
  LogOut,
  Upload,
  Image as ImageIcon
} from "lucide-react";

interface Story {
  id: number;
  name: string;
  story: string;
  beforeImage: string;
  afterImage: string;
  category: string;
  status: "published" | "draft";
  createdAt: string;
}

interface ImageFile {
  file: File;
  preview: string;
  type: "before" | "after";
}

const AdminStories = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [stories, setStories] = useState<Story[]>([
    {
      id: 1,
      name: "Aisha Bello",
      story: "Aisha received life-saving heart surgery through our medical assistance program. Her recovery has been remarkable.",
      beforeImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop&crop=face",
      afterImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop&crop=face",
      category: "surgery",
      status: "published",
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      name: "Emeka Okafor",
      story: "Emeka's diabetes treatment was fully funded, allowing him to manage his condition and return to work.",
      beforeImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=face",
      afterImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=300&fit=crop&crop=face",
      category: "chronic-conditions",
      status: "published",
      createdAt: "2024-01-10"
    },
    {
      id: 3,
      name: "Fatima Hassan",
      story: "Fatima's emergency appendectomy was completed successfully, and she's now back to her studies.",
      beforeImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=300&fit=crop&crop=face",
      afterImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop&crop=face",
      category: "emergency",
      status: "draft",
      createdAt: "2024-01-08"
    }
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [editingStory, setEditingStory] = useState<Story | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);

  const categories = [
    { id: "all", name: "All Categories" },
    { id: "surgery", name: "Surgery" },
    { id: "emergency", name: "Emergency Care" },
    { id: "chronic-conditions", name: "Chronic Conditions" },
    { id: "cancer", name: "Cancer Treatment" },
    { id: "maternity", name: "Maternity Care" }
  ];

  const statuses = [
    { id: "all", name: "All Statuses" },
    { id: "published", name: "Published" },
    { id: "draft", name: "Draft" }
  ];

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("adminAuthenticated");
    if (!isAuthenticated) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const filteredStories = stories.filter(story => {
    const matchesSearch = story.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         story.story.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || story.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || story.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleEdit = (story: Story) => {
    setEditingStory({ ...story });
    setImageFiles([]);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editingStory) {
      // Process uploaded images
      const updatedStory = { ...editingStory };
      
      // Update image URLs if new images were uploaded
      imageFiles.forEach(imgFile => {
        if (imgFile.type === "before") {
          updatedStory.beforeImage = imgFile.preview;
        } else if (imgFile.type === "after") {
          updatedStory.afterImage = imgFile.preview;
        }
      });

      if (editingStory.id) {
        // Update existing story
        setStories(prev => prev.map(story => 
          story.id === editingStory.id ? updatedStory : story
        ));
        toast({
          title: "Story Updated",
          description: "The story has been successfully updated.",
        });
      } else {
        // Create new story
        const newStory = {
          ...updatedStory,
          id: Date.now(),
          createdAt: new Date().toISOString().split('T')[0]
        };
        setStories(prev => [newStory, ...prev]);
        toast({
          title: "Story Created",
          description: "The new story has been successfully created.",
        });
      }
      setIsEditing(false);
      setEditingStory(null);
      setImageFiles([]);
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this story?")) {
      setStories(prev => prev.filter(story => story.id !== id));
      toast({
        title: "Story Deleted",
        description: "The story has been successfully deleted.",
      });
    }
  };

  const handleCreateNew = () => {
    setEditingStory({
      id: 0,
      name: "",
      story: "",
      beforeImage: "",
      afterImage: "",
      category: "surgery",
      status: "draft",
      createdAt: ""
    });
    setImageFiles([]);
    setIsEditing(true);
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

  const handleImageDrop = (e: React.DragEvent, type: "before" | "after") => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          const newImageFile: ImageFile = {
            file,
            preview: reader.result as string,
            type
          };
          
          // Remove existing image of this type
          setImageFiles(prev => prev.filter(img => img.type !== type));
          // Add new image
          setImageFiles(prev => [...prev, newImageFile]);
        };
        reader.readAsDataURL(file);
      } else {
        toast({
          title: "Invalid File Type",
          description: "Please upload an image file.",
          variant: "destructive",
        });
      }
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>, type: "before" | "after") => {
    const files = Array.from(e.target.files || []);
    
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          const newImageFile: ImageFile = {
            file,
            preview: reader.result as string,
            type
          };
          
          // Remove existing image of this type
          setImageFiles(prev => prev.filter(img => img.type !== type));
          // Add new image
          setImageFiles(prev => [...prev, newImageFile]);
        };
        reader.readAsDataURL(file);
      } else {
        toast({
          title: "Invalid File Type",
          description: "Please upload an image file.",
          variant: "destructive",
        });
      }
    }
  };

  const removeImage = (type: "before" | "after") => {
    setImageFiles(prev => prev.filter(img => img.type !== type));
  };

  const getCurrentImage = (type: "before" | "after") => {
    const uploadedImage = imageFiles.find(img => img.type === type);
    if (uploadedImage) {
      return uploadedImage.preview;
    }
    if (editingStory) {
      return type === "before" ? editingStory.beforeImage : editingStory.afterImage;
    }
    return "";
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 text-xs rounded-full font-medium";
    if (status === "published") {
      return `${baseClasses} bg-green-100 text-green-800`;
    }
    return `${baseClasses} bg-yellow-100 text-yellow-800`;
  };

  const getCategoryBadge = (category: string) => {
    const baseClasses = "px-2 py-1 text-xs rounded-full font-medium";
    const categoryColors: { [key: string]: string } = {
      surgery: "bg-blue-100 text-blue-800",
      emergency: "bg-red-100 text-red-800",
      "chronic-conditions": "bg-purple-100 text-purple-800",
      cancer: "bg-pink-100 text-pink-800",
      maternity: "bg-indigo-100 text-indigo-800"
    };
    return `${baseClasses} ${categoryColors[category] || "bg-gray-100 text-gray-800"}`;
  };

  const ImageDropzone = ({ type, label }: { type: "before" | "after"; label: string }) => {
    const currentImage = getCurrentImage(type);
    const hasImage = currentImage && currentImage.length > 0;

    return (
      <div className="space-y-3">
        <Label className="text-sm font-medium text-foreground">{label}</Label>
        
        {hasImage ? (
          <div className="relative">
            <img
              src={currentImage}
              alt={`${label} image`}
              className="w-full h-32 object-cover rounded-lg border-2 border-border"
            />
            <Button
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2 h-6 w-6 p-0"
              onClick={() => removeImage(type)}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ) : (
          <div
            className={`w-full h-32 border-2 border-dashed border-muted-foreground/30 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 hover:bg-muted/30 transition-all duration-200 ${
              hasImage ? 'border-primary' : ''
            }`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleImageDrop(e, type)}
            onClick={() => document.getElementById(`file-input-${type}`)?.click()}
          >
            <Upload className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground text-center">
              Drop image here or click to select
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Supports: JPG, PNG, GIF
            </p>
            <input
              id={`file-input-${type}`}
              type="file"
              accept="image/*"
              onChange={(e) => handleImageSelect(e, type)}
              className="hidden"
            />
          </div>
        )}
      </div>
    );
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
                className="touch-target bg-accent"
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
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Manage Stories</h1>
                <p className="text-sm text-muted-foreground">Transformation stories management</p>
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
                <span className="text-foreground font-medium">Stories</span>
              </li>
            </ol>
          </nav>

          {/* Header Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Stories</h2>
              <p className="text-muted-foreground">
                Manage transformation stories and showcase the impact of your organization.
              </p>
            </div>
            <Button onClick={handleCreateNew} className="btn-cta-primary touch-target">
              <Plus className="h-4 w-4 mr-2" />
              Add New Story
            </Button>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search stories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status.id} value={status.id}>
                    {status.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Stories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStories.map((story, index) => (
              <Card key={story.id} className="overflow-hidden shadow-medium hover:shadow-strong transition-all duration-300">
                <div className="grid grid-cols-2 gap-0">
                  <div className="relative">
                    <img
                      src={story.beforeImage}
                      alt={`${story.name} - Before`}
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded">
                      Before
                    </div>
                  </div>
                  <div className="relative">
                    <img
                      src={story.afterImage}
                      alt={`${story.name} - After`}
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-secondary text-white text-xs px-2 py-1 rounded">
                      After
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-foreground">{story.name}</h3>
                    <div className="flex gap-2">
                      <span className={getStatusBadge(story.status)}>
                        {story.status}
                      </span>
                      <span className={getCategoryBadge(story.category)}>
                        {story.category}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {story.story}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      Created: {story.createdAt}
                    </span>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(story)}
                        className="touch-target"
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(story.id)}
                        className="text-destructive hover:text-destructive touch-target"
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredStories.length === 0 && (
            <div className="text-center py-16">
              <Users className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No stories found</h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm || selectedCategory !== "all" || selectedStatus !== "all"
                  ? "Try adjusting your filters or search terms."
                  : "Get started by creating your first transformation story."}
              </p>
              {!searchTerm && selectedCategory === "all" && selectedStatus === "all" && (
                <Button onClick={handleCreateNew} className="btn-cta-primary touch-target">
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Story
                </Button>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Edit/Create Modal */}
      {isEditing && editingStory && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  {editingStory.id ? "Edit Story" : "Create New Story"}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setIsEditing(false);
                    setEditingStory(null);
                    setImageFiles([]);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={editingStory.name}
                    onChange={(e) => setEditingStory(prev => prev ? { ...prev, name: e.target.value } : null)}
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={editingStory.category} onValueChange={(value) => setEditingStory(prev => prev ? { ...prev, category: value } : null)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.filter(cat => cat.id !== "all").map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="story">Story</Label>
                <Textarea
                  id="story"
                  value={editingStory.story}
                  onChange={(e) => setEditingStory(prev => prev ? { ...prev, story: e.target.value } : null)}
                  placeholder="Tell the transformation story..."
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ImageDropzone type="before" label="Before Image" />
                <ImageDropzone type="after" label="After Image" />
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={editingStory.status} onValueChange={(value) => setEditingStory(prev => prev ? { ...prev, status: value as "published" | "draft" } : null)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={handleSave} className="flex-1 btn-cta-primary">
                  <Save className="h-4 w-4 mr-2" />
                  {editingStory.id ? "Update Story" : "Create Story"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    setEditingStory(null);
                    setImageFiles([]);
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminStories;
