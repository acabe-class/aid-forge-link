import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Eye, ArrowLeft, ArrowRight, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface GalleryImage {
  id: number;
  name: string;
  story: string;
  beforeImage: string;
  afterImage: string;
  category: string;
}

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<{ image: string; name: string; story: string } | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Sample gallery data - in a real app, these would come from your backend
  const galleryData: GalleryImage[] = [
    {
      id: 1,
      name: "Aisha Bello",
      story: "Aisha received life-saving heart surgery through our medical assistance program. Her recovery has been remarkable.",
      beforeImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop&crop=face",
      afterImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop&crop=face",
      category: "surgery"
    },
    {
      id: 2,
      name: "Emeka Okafor",
      story: "Emeka's diabetes treatment was fully funded, allowing him to manage his condition and return to work.",
      beforeImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=face",
      afterImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=300&fit=crop&crop=face",
      category: "chronic-conditions"
    },
    {
      id: 3,
      name: "Fatima Hassan",
      story: "Fatima's emergency appendectomy was completed successfully, and she's now back to her studies.",
      beforeImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=300&fit=crop&crop=face",
      afterImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop&crop=face",
      category: "emergency"
    },
    {
      id: 4,
      name: "Chukwudi Okonkwo",
      story: "Chukwudi's cancer treatment was fully supported, giving him hope for a brighter future.",
      beforeImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=face",
      afterImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=300&fit=crop&crop=face",
      category: "cancer"
    },
    {
      id: 5,
      name: "Hauwa Yusuf",
      story: "Hauwa's maternity care was ensured, resulting in a healthy baby and mother.",
      beforeImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop&crop=face",
      afterImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop&crop=face",
      category: "maternity"
    },
    {
      id: 6,
      name: "Kemi Adebayo",
      story: "Kemi's orthopedic surgery restored her mobility and independence.",
      beforeImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=300&fit=crop&crop=face",
      afterImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop&crop=face",
      category: "surgery"
    }
  ];

  const categories = [
    { id: "all", name: "All Stories", count: galleryData.length },
    { id: "surgery", name: "Surgery", count: galleryData.filter(item => item.category === "surgery").length },
    { id: "emergency", name: "Emergency Care", count: galleryData.filter(item => item.category === "emergency").length },
    { id: "chronic-conditions", name: "Chronic Conditions", count: galleryData.filter(item => item.category === "chronic-conditions").length },
    { id: "cancer", name: "Cancer Treatment", count: galleryData.filter(item => item.category === "cancer").length },
    { id: "maternity", name: "Maternity Care", count: galleryData.filter(item => item.category === "maternity").length }
  ];

  const filteredData = selectedCategory === "all" 
    ? galleryData 
    : galleryData.filter(item => item.category === selectedCategory);

  const openLightbox = (image: string, name: string, story: string, index: number) => {
    setSelectedImage({ image, name, story });
    setCurrentImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (currentImageIndex < filteredData.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
      const nextItem = filteredData[currentImageIndex + 1];
      setSelectedImage({ 
        image: nextItem.afterImage, 
        name: nextItem.name, 
        story: nextItem.story 
      });
    }
  };

  const previousImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
      const prevItem = filteredData[currentImageIndex - 1];
      setSelectedImage({ 
        image: prevItem.afterImage, 
        name: prevItem.name, 
        story: prevItem.story 
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") previousImage();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <Heart className="mx-auto h-16 w-16 text-primary mb-6" />
            <h1 className="text-4xl font-bold text-foreground mb-4">Stories of Hope & Transformation</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Witness the incredible impact of your support through these before and after stories. 
              Every image represents a life changed, a family restored, and hope renewed.
            </p>
          </div>

          {/* Category Filter */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className="touch-target"
                >
                  {category.name} ({category.count})
                </Button>
              ))}
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredData.map((item, index) => (
              <Card key={item.id} className="overflow-hidden shadow-medium hover:shadow-strong transition-all duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl text-center">{item.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Before and After Images */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative group cursor-pointer" onClick={() => openLightbox(item.beforeImage, item.name, `Before: ${item.story}`, index * 2)}>
                      <img
                        src={item.beforeImage}
                        alt={`${item.name} - Before`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                        <Eye className="h-8 w-8 text-white" />
                      </div>
                      <div className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded">
                        Before
                      </div>
                    </div>
                    <div className="relative group cursor-pointer" onClick={() => openLightbox(item.afterImage, item.name, `After: ${item.story}`, index * 2 + 1)}>
                      <img
                        src={item.afterImage}
                        alt={`${item.name} - After`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                        <Eye className="h-8 w-8 text-white" />
                      </div>
                      <div className="absolute top-2 left-2 bg-secondary text-white text-xs px-2 py-1 rounded">
                        After
                      </div>
                    </div>
                  </div>
                  
                  {/* Story */}
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.story}
                  </p>
                  
                  {/* View Full Story Button */}
                  <Button 
                    variant="outline" 
                    className="w-full touch-target"
                    onClick={() => openLightbox(item.afterImage, item.name, item.story, index)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Full Story
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredData.length === 0 && (
            <div className="text-center py-16">
              <Heart className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No stories found</h3>
              <p className="text-muted-foreground">
                Try selecting a different category or check back later for more stories of hope.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div className="relative max-w-4xl max-h-full">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white"
              onClick={closeLightbox}
            >
              <X className="h-6 w-6" />
            </Button>

            {/* Navigation Arrows */}
            {currentImageIndex > 0 && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  previousImage();
                }}
              >
                <ArrowLeft className="h-6 w-6" />
              </Button>
            )}

            {currentImageIndex < filteredData.length - 1 && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
              >
                <ArrowRight className="h-6 w-6" />
              </Button>
            )}

            {/* Image */}
            <img
              src={selectedImage.image}
              alt={selectedImage.name}
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Image Info */}
            <div className="absolute bottom-4 left-4 right-4 bg-black/70 text-white p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">{selectedImage.name}</h3>
              <p className="text-sm opacity-90">{selectedImage.story}</p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Gallery;
