import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, HandHeart, Users, Shield, Target, CheckCircle, Star, Quote } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
  const stats = [
    { icon: Users, value: "500+", label: "Families Helped" },
    { icon: Heart, value: "$250K+", label: "Funds Distributed" },
    { icon: Shield, value: "95%", label: "Direct to Aid" },
    { icon: Target, value: "24/7", label: "Support Available" },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "Denver, CO",
      quote: "When my daughter needed emergency surgery, Hope Foundation stepped in immediately. Their support changed our lives forever.",
      rating: 5,
    },
    {
      name: "Michael Rodriguez",
      location: "Phoenix, AZ", 
      quote: "The compassionate team helped us navigate the complex medical system and provided both financial and emotional support.",
      rating: 5,
    },
    {
      name: "Emily Chen",
      location: "Seattle, WA",
      quote: "Thanks to Hope Foundation, my father received the treatment he needed. Their dedication to helping families is remarkable.",
      rating: 5,
    },
  ];

  const values = [
    {
      icon: Heart,
      title: "Compassionate Care",
      description: "We believe every person deserves access to quality healthcare and support during their most challenging times."
    },
    {
      icon: Shield,
      title: "Transparent Operations",
      description: "95% of every donation goes directly to aid, with full transparency in how funds are allocated and distributed."
    },
    {
      icon: Users,
      title: "Community Focus",
      description: "Building a network of support that connects those in need with resources, volunteers, and caring communities."
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Helping hands reaching out to support each other"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-secondary/70" />
        </div>
        
        <div className="relative container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Bringing Hope to Those Who Need It Most
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 animate-slide-up">
              We provide compassionate support and resources to individuals and families facing medical challenges, ensuring no one faces their journey alone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <Button asChild size="lg" className="btn-hero touch-target">
                <Link to="/request-help">
                  <HandHeart className="h-5 w-5 mr-2" />
                  Request Help
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 touch-target">
                <Link to="/donate">
                  <Heart className="h-5 w-5 mr-2" />
                  Donate Now
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Mission
              </h2>
              <p className="text-xl text-muted-foreground">
                Hope Foundation was created with a simple yet powerful belief: healthcare should be accessible to everyone, regardless of their financial situation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {values.map((value, index) => (
                <Card key={index} className="card-trust text-center">
                  <CardContent className="pt-8 pb-8">
                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                      <value.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <p className="text-lg text-muted-foreground mb-8">
                Since our founding, we've been privileged to support hundreds of families through their most challenging times. Every request we receive is treated with dignity, respect, and the urgency it deserves.
              </p>
              <Button asChild size="lg" className="btn-cta-primary touch-target">
                <Link to="/request-help">Start Your Request</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Stories of Hope
              </h2>
              <p className="text-xl text-muted-foreground">
                Real families, real stories, real impact.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="card-warm">
                  <CardContent className="pt-8 pb-8">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-secondary fill-current" />
                      ))}
                    </div>
                    <Quote className="h-8 w-8 text-primary/30 mb-4" />
                    <p className="text-muted-foreground mb-6 italic leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                    <div className="border-t pt-4">
                      <div className="font-semibold text-foreground">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-hero-gradient">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Every Act of Kindness Makes a Difference
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Whether you need help or want to help others, there's a place for you in our community of hope.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 touch-target">
                <Link to="/request-help">
                  <HandHeart className="h-5 w-5 mr-2" />
                  Get Help
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 touch-target">
                <Link to="/donate">
                  <Heart className="h-5 w-5 mr-2" />
                  Give Hope
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Get in Touch
              </h2>
              <p className="text-xl text-muted-foreground">
                We're here to help 24/7. Reach out whenever you need support.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">Emergency Support</h3>
                  <p className="text-muted-foreground mb-4">
                    For urgent medical assistance requests, call our 24/7 helpline:
                  </p>
                  <a 
                    href="tel:+1-555-HELP-NOW" 
                    className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors"
                  >
                    +1 (555) HELP-NOW
                  </a>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">General Inquiries</h3>
                  <div className="space-y-2 text-muted-foreground">
                    <p>Email: <a href="mailto:info@hopefoundation.org" className="text-primary hover:underline">info@hopefoundation.org</a></p>
                    <p>Phone: <a href="tel:+1-555-123-4567" className="text-primary hover:underline">+1 (555) 123-4567</a></p>
                    <address className="not-italic">
                      123 Hope Street<br />
                      Charity City, CC 12345
                    </address>
                  </div>
                </div>
              </div>

              <Card className="card-trust">
                <CardContent className="pt-8 pb-8">
                  <h3 className="text-xl font-semibold text-foreground mb-6">How We Can Help</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium text-foreground">Medical Emergencies</div>
                        <div className="text-sm text-muted-foreground">Immediate financial assistance for urgent care</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium text-foreground">Chronic Conditions</div>
                        <div className="text-sm text-muted-foreground">Ongoing support for long-term treatment</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium text-foreground">Medication Access</div>
                        <div className="text-sm text-muted-foreground">Help obtaining necessary prescriptions</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium text-foreground">Mental Health Support</div>
                        <div className="text-sm text-muted-foreground">Resources for psychological wellbeing</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;