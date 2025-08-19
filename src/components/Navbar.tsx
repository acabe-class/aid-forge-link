import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, Heart, HandHeart, Home, Info, Phone } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Request Help", href: "/request-help", icon: HandHeart },
    { name: "Donate", href: "/donate", icon: Heart },
    { name: "About", href: "/#about", icon: Info },
    { name: "Contact", href: "/#contact", icon: Phone },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    if (href.startsWith("/#")) return location.pathname === "/" && location.hash === href.substring(1);
    return location.pathname === href;
  };

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    if (href.startsWith("/#")) {
      const element = document.getElementById(href.substring(2));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary">
            <Heart className="h-8 w-8" />
            <span>Hope Foundation</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`
                  flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-colors duration-200
                  ${isActive(item.href)
                    ? "text-primary bg-accent"
                    : "text-foreground hover:text-primary hover:bg-accent/50"
                  }
                `}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Buttons - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <Button asChild variant="outline" className="touch-target">
              <Link to="/request-help">Request Help</Link>
            </Button>
            <Button asChild className="btn-cta-primary touch-target">
              <Link to="/donate">Donate Now</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden touch-target">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[350px]">
              <div className="flex items-center justify-between mb-8">
                <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary">
                  <Heart className="h-8 w-8" />
                  <span>Hope Foundation</span>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="touch-target"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              {/* Mobile Navigation */}
              <div className="space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors duration-200 touch-target
                      ${isActive(item.href)
                        ? "text-primary bg-accent"
                        : "text-foreground hover:text-primary hover:bg-accent/50"
                      }
                    `}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Mobile CTA Buttons */}
              <div className="mt-8 space-y-3">
                <Button asChild variant="outline" className="w-full touch-target">
                  <Link to="/request-help" onClick={() => setIsOpen(false)}>
                    <HandHeart className="h-4 w-4 mr-2" />
                    Request Help
                  </Link>
                </Button>
                <Button asChild className="w-full btn-cta-primary touch-target">
                  <Link to="/donate" onClick={() => setIsOpen(false)}>
                    <Heart className="h-4 w-4 mr-2" />
                    Donate Now
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;