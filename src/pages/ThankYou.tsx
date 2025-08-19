import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Heart, Home, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ThankYou = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-8 animate-fade-in">
            <div className="mx-auto w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">Thank You!</h1>
            <p className="text-xl text-muted-foreground">
              Your submission has been received successfully.
            </p>
          </div>

          {/* Main Content Card */}
          <Card className="shadow-medium mb-8 animate-slide-up">
            <CardContent className="pt-8 pb-8">
              <div className="space-y-6">
                <div className="flex items-center justify-center gap-4 text-primary">
                  <Heart className="h-8 w-8" />
                  <span className="text-2xl font-semibold">Your Impact Matters</span>
                  <Heart className="h-8 w-8" />
                </div>
                
                <div className="space-y-4 text-left">
                  <div className="flex items-start gap-4 p-4 bg-accent rounded-lg">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">Request Received</h3>
                      <p className="text-muted-foreground">
                        We've received your request and it's being reviewed by our team.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 bg-accent rounded-lg">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">Next Steps</h3>
                      <p className="text-muted-foreground">
                        Our team will contact you within 24-48 hours to discuss your case and next steps.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 bg-accent rounded-lg">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">Stay Connected</h3>
                      <p className="text-muted-foreground">
                        Check your email for updates and additional information requests.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <p className="text-muted-foreground mb-6">
                    If you have any urgent questions or concerns, please don't hesitate to contact us directly.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild className="btn-cta-primary touch-target">
                      <Link to="/">
                        <Home className="h-4 w-4 mr-2" />
                        Return Home
                      </Link>
                    </Button>
                    
                    <Button asChild variant="outline" className="touch-target">
                      <Link to="/donate">
                        <Heart className="h-4 w-4 mr-2" />
                        Support Others
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <div className="text-center text-muted-foreground">
            <p className="mb-2">
              <strong>Need immediate assistance?</strong>
            </p>
            <p className="text-sm">
              Call us at <a href="tel:+234-555-HELP-NOW" className="text-primary hover:underline font-semibold">+234 (555) HELP-NOW</a>
              <br />
              or email <a href="mailto:support@okwulorahelps.org" className="text-primary hover:underline font-semibold">support@okwulorahelps.org</a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ThankYou;