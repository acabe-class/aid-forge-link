import { Link } from "react-router-dom";
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Request Help", href: "/request-help" },
    { name: "Donate", href: "/donate" },
    { name: "About Us", href: "/#about" },
    { name: "Contact", href: "/#contact" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
  ];

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "LinkedIn", icon: Linkedin, href: "#" },
  ];

  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary">
              <Heart className="h-8 w-8" />
              <span>Hope Foundation</span>
            </Link>
            <p className="text-muted-foreground leading-relaxed">
              Dedicated to providing hope, support, and resources to individuals and families facing medical challenges.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 touch-target"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a href="tel:+1-555-HELP-NOW" className="hover:text-primary transition-colors">
                  +1 (555) HELP-NOW
                </a>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a href="mailto:info@hopefoundation.org" className="hover:text-primary transition-colors">
                  info@hopefoundation.org
                </a>
              </div>
              <div className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <address className="not-italic">
                  123 Hope Street<br />
                  Charity City, CC 12345<br />
                  United States
                </address>
              </div>
            </div>
          </div>

          {/* Legal & Resources */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal & Resources</h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 p-4 bg-accent rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Tax ID:</strong> 12-3456789<br />
                Registered 501(c)(3) nonprofit organization
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © {currentYear} Hope Foundation. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-primary" />
              <span>for those in need</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;