import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Mail } from "lucide-react";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/cctv-solutions", label: "CCTV Solutions" },
  { to: "/tally-services", label: "Tally & GST" },
  { to: "/projects", label: "Projects" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar */}
      <div className="hero-gradient">
        <div className="container mx-auto flex items-center justify-between px-4 py-2 text-sm text-primary-foreground">
          <div className="flex items-center gap-4">
            <a href="tel:+918667580862" className="flex items-center gap-1 hover:text-highlight transition-colors">
              <Phone className="h-3 w-3" /> +91 86675 80862
            </a>
            <a href="mailto:mstechsalesandservice@gmail.com" className="hidden sm:flex items-center gap-1 hover:text-highlight transition-colors">
              <Mail className="h-3 w-3" /> mstechsalesandservice@gmail.com
            </a>
          </div>
          <span className="hidden md:block text-xs opacity-80">Smart Security & Smart Business Solutions</span>
        </div>
      </div>

      {/* Main nav */}
      <nav className="bg-card shadow-md">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="MS Tech Logo" className="h-10 w-auto" />
          </Link>

          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  location.pathname === link.to
                    ? "text-accent bg-accent/10"
                    : "text-foreground hover:text-accent hover:bg-accent/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/contact">
              <Button className="ml-2 hero-gradient text-primary-foreground hover:opacity-90">
                Get a Quote
              </Button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button className="lg:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden border-t bg-card animate-slide-up">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === link.to
                      ? "text-accent bg-accent/10"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link to="/contact" onClick={() => setIsOpen(false)}>
                <Button className="w-full mt-2 hero-gradient text-primary-foreground">Get a Quote</Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
