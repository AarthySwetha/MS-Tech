import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import ServiceCard from "@/components/ServiceCard";
import { Camera, Wrench, Monitor, Shield, Calculator, FileText, Star, Users, Clock, Award, ChevronRight, Quote } from "lucide-react";
import heroCctv from "@/assets/hero-cctv.jpg";
import heroTally from "@/assets/hero-tally.jpg";

const services = [
  { icon: Camera, title: "CCTV Installation", description: "Professional installation of high-definition CCTV cameras for homes, offices, and businesses.", link: "/cctv-solutions" },
  { icon: Wrench, title: "CCTV Maintenance", description: "Regular maintenance and repair services to keep your surveillance system running optimally.", link: "/cctv-solutions" },
  { icon: Monitor, title: "Remote Monitoring", description: "24/7 remote surveillance monitoring solutions with mobile app access and alerts.", link: "/cctv-solutions" },
  { icon: Calculator, title: "Tally Setup", description: "Complete Tally software installation, configuration, and customization for your business.", link: "/tally-services" },
  { icon: FileText, title: "GST Billing", description: "GST-compliant billing setup, GST return filing assistance, and tax compliance solutions.", link: "/tally-services" },
  { icon: Shield, title: "Security Consultation", description: "Expert security assessment and consultation to design the perfect surveillance system.", link: "/cctv-solutions" },
];

const whyChoose = [
  { icon: Award, title: "Expert Technicians", desc: "Certified professionals with years of experience in security and accounting solutions." },
  { icon: Star, title: "Affordable Pricing", desc: "Competitive pricing without compromising on quality or service excellence." },
  { icon: Clock, title: "Fast Service", desc: "Quick response time and efficient installation within committed timelines." },
  { icon: Users, title: "Reliable Support", desc: "24/7 customer support and after-sales service for complete peace of mind." },
];

const testimonials = [
  { name: "Rajesh Kumar", role: "Shop Owner", text: "MS Tech installed CCTV cameras in my shop. Excellent work quality and very professional team. Highly recommended!" },
  { name: "Priya Sharma", role: "Business Owner", text: "Their Tally and GST services saved us so much time. The team is knowledgeable and always available for support." },
  { name: "Amit Patel", role: "Office Manager", text: "We use MS Tech for both security and accounting. One-stop solution that truly understands business needs." },
];

const Index = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroCctv} alt="CCTV Security Solutions" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/95 via-navy-dark/80 to-navy-dark/40" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <AnimatedSection animation="slide-in-left">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-accent/20 text-accent border border-accent/30 mb-6">
                Trusted Security Partner
              </span>
            </AnimatedSection>
            <AnimatedSection animation="slide-in-left" delay={150}>
              <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-primary-foreground">
                Advanced CCTV Security & Smart Business Solutions
              </h1>
            </AnimatedSection>
            <AnimatedSection animation="slide-in-left" delay={300}>
              <p className="text-lg text-primary-foreground/80 mb-8 max-w-xl leading-relaxed">
                Protecting your premises with cutting-edge surveillance technology and empowering your business with professional Tally & GST services.
              </p>
            </AnimatedSection>
            <AnimatedSection animation="slide-in-left" delay={450}>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact">
                  <Button size="lg" className="hero-gradient text-primary-foreground text-base px-8 hover:opacity-90">
                    Get Free Consultation
                  </Button>
                </Link>
                <Link to="/cctv-solutions">
                  <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground bg-primary-foreground/5 hover:bg-primary-foreground/10 text-base px-8">
                    Our Solutions <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <AnimatedSection className="text-center mb-12">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">What We Offer</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2">Our Services</h2>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">Comprehensive security and business solutions tailored to your needs</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <AnimatedSection key={s.title} delay={i * 100}>
                <ServiceCard {...s} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Tally Banner */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroTally} alt="Tally & GST Services" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-l from-navy-dark/95 via-navy-dark/80 to-navy-dark/50" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-xl ml-auto text-right">
            <AnimatedSection animation="slide-in-right">
              <span className="text-highlight font-semibold text-sm uppercase tracking-wider">Business Accounting</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mt-2 mb-4">
                Tally & GST Solutions for Your Business
              </h2>
              <p className="text-primary-foreground/80 mb-6">
                From Tally installation to GST filing, we handle your accounting needs so you can focus on growing your business.
              </p>
              <Link to="/tally-services">
                <Button size="lg" className="bg-highlight text-navy-dark hover:bg-highlight/90 font-semibold">
                  Explore Tally Services
                </Button>
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-muted">
        <div className="container mx-auto">
          <AnimatedSection className="text-center mb-12">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">Why MS Tech</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2">Why Choose Us</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChoose.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 100}>
                <div className="text-center p-6 bg-card rounded-lg card-elevated border border-border">
                  <div className="w-16 h-16 rounded-full hero-gradient flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-heading text-lg font-bold mb-2 text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <AnimatedSection className="text-center mb-12">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">Testimonials</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2">What Our Clients Say</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <AnimatedSection key={t.name} delay={i * 100}>
                <div className="bg-card p-6 rounded-lg border border-border card-elevated">
                  <Quote className="h-8 w-8 text-accent/30 mb-3" />
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full hero-gradient flex items-center justify-center text-primary-foreground font-bold text-sm">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-foreground">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="hero-gradient section-padding">
        <div className="container mx-auto text-center">
          <AnimatedSection>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Secure Your Business?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Get in touch with our experts for a free consultation and customized security or accounting solution.
            </p>
            <Link to="/contact">
              <Button size="lg" className="bg-highlight text-navy-dark hover:bg-highlight/90 font-semibold text-base px-10">
                Contact Us Today
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Index;
