import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="navy-bg text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="MS Tech Logo" className="h-10 w-auto" />
            </div>
            <p className="text-sm opacity-70 leading-relaxed mb-4">
              Your trusted partner for CCTV security solutions and Tally accounting services. Protecting businesses and empowering growth since 2015.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-colors">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4 text-highlight">Quick Links</h3>
            <ul className="space-y-2 text-sm opacity-80">
              {[
                { to: "/about", label: "About Us" },
                { to: "/cctv-solutions", label: "CCTV Solutions" },
                { to: "/tally-services", label: "Tally & GST Services" },
                { to: "/projects", label: "Our Projects" },
                { to: "/blog", label: "Blog & Insights" },
                { to: "/contact", label: "Contact Us" },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="hover:text-accent transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4 text-highlight">Our Services</h3>
            <ul className="space-y-2 text-sm opacity-80">
              {["CCTV Installation", "CCTV Maintenance", "Remote Monitoring", "Tally Setup", "GST Billing", "Business Accounting"].map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4 text-highlight">Contact Info</h3>
            <div className="space-y-3 text-sm opacity-80">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                <span>23, 2nd Floor, VPK Complex, Erode - 638001, Tamil Nadu</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-accent" />
                <a href="tel:+918667580862" className="hover:text-accent transition-colors">+91 86675 80862</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-accent" />
                <a href="mailto:mstechsalesandservice@gmail.com" className="hover:text-accent transition-colors">mstechsalesandservice@gmail.com</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between text-xs opacity-60">
          <span>© 2025 MS Tech. All rights reserved.</span>
          <span>Smart Security & Smart Business Solutions</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
