import AnimatedSection from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Camera, Wrench, Monitor, Shield, Wifi, HardDrive, CheckCircle, ArrowRight } from "lucide-react";
import cameraDome from "@/assets/camera-dome.jpg";
import cameraBullet from "@/assets/camera-bullet.jpg";
import cameraPtz from "@/assets/camera-ptz.jpg";
import cameraIp from "@/assets/camera-ip.jpg";
import cameraWireless from "@/assets/camera-wireless.jpg";
import cameraThermal from "@/assets/camera-thermal.jpg";
import heroCctv from "@/assets/hero-cctv.jpg";

const services = [
  { icon: Camera, title: "CCTV Installation", desc: "Professional installation of IP cameras, dome cameras, bullet cameras, and PTZ cameras for complete coverage.", features: ["HD & 4K cameras", "Night vision", "Wide-angle coverage", "Weather-proof models"] },
  { icon: Wrench, title: "Maintenance & Repair", desc: "Regular maintenance contracts and emergency repair services to ensure uninterrupted surveillance.", features: ["Annual maintenance contracts", "Emergency repairs", "Camera cleaning", "System upgrades"] },
  { icon: Monitor, title: "Remote Monitoring", desc: "Access your surveillance feeds from anywhere using mobile apps and desktop software.", features: ["Mobile app access", "Real-time alerts", "Cloud recording", "Multi-site viewing"] },
  { icon: Shield, title: "Security Consultation", desc: "Expert assessment of your premises to design the optimal camera placement and system architecture.", features: ["Site survey", "Risk assessment", "System design", "Budget planning"] },
  { icon: Wifi, title: "Network Solutions", desc: "Complete networking setup for IP camera systems including cabling, switches, and NVR configuration.", features: ["Structured cabling", "PoE switches", "Network design", "Bandwidth optimization"] },
  { icon: HardDrive, title: "DVR/NVR Solutions", desc: "Digital and network video recorder setup with adequate storage for your recording needs.", features: ["Local storage", "Cloud backup", "Playback access", "Event-based recording"] },
];

const cameraTypes = [
  { name: "Dome Cameras", desc: "Discreet indoor surveillance with wide-angle coverage", image: cameraDome },
  { name: "Bullet Cameras", desc: "Long-range outdoor monitoring with weatherproof housing", image: cameraBullet },
  { name: "PTZ Cameras", desc: "Pan-tilt-zoom capability for active monitoring", image: cameraPtz },
  { name: "IP Cameras", desc: "High-resolution network cameras with smart analytics", image: cameraIp },
  { name: "Wireless Cameras", desc: "Flexible placement without complex cabling", image: cameraWireless },
  { name: "Thermal Cameras", desc: "Detection in complete darkness and harsh conditions", image: cameraThermal },
];

const CCTVSolutions = () => {
  return (
    <div>
      {/* Hero with background image */}
      <section className="relative min-h-[420px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroCctv} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 hero-gradient opacity-85" />
        </div>
        <div className="container mx-auto text-center relative z-10 py-20 px-4">
          <AnimatedSection>
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent-foreground text-sm font-medium mb-6 backdrop-blur-sm border border-accent/30">
              Complete Security Solutions
            </span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-primary-foreground mb-5 leading-tight">
              CCTV Solutions
            </h1>
            <p className="text-primary-foreground/85 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
              Protecting what matters most with cutting-edge surveillance technology
            </p>
            <div className="flex gap-4 justify-center mt-8">
              <Link to="/contact">
                <Button size="lg" className="bg-highlight text-foreground hover:bg-highlight/90 font-semibold shadow-lg">
                  Get Free Survey <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              <a href="tel:+918667580862">
                <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 backdrop-blur-sm">
                  Call Us Now
                </Button>
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <AnimatedSection className="text-center mb-14">
            <span className="text-accent font-semibold text-sm uppercase tracking-widest">What We Do</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2">Our CCTV Services</h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">End-to-end surveillance solutions from consultation to installation and ongoing support</p>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <AnimatedSection key={s.title} delay={i * 80}>
                <div className="bg-card p-6 rounded-xl card-elevated border border-border h-full group">
                  <div className="w-14 h-14 rounded-xl hero-gradient flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <s.icon className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{s.desc}</p>
                  <ul className="space-y-2">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-accent shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Camera Types with Images */}
      <section className="section-padding bg-muted">
        <div className="container mx-auto">
          <AnimatedSection className="text-center mb-14">
            <span className="text-accent font-semibold text-sm uppercase tracking-widest">Our Range</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2">Camera Types We Offer</h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">Choose from a wide range of cameras designed for every environment and use case</p>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cameraTypes.map((c, i) => (
              <AnimatedSection key={c.name} delay={i * 100}>
                <div className="bg-card rounded-xl overflow-hidden border border-border card-elevated group">
                  <div className="aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={c.image}
                      alt={c.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading text-lg font-bold text-foreground mb-1">{c.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Installation Process */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <AnimatedSection className="text-center mb-14">
            <span className="text-accent font-semibold text-sm uppercase tracking-widest">How It Works</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2">Installation Process</h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Site Survey", desc: "We assess your premises and identify optimal camera locations." },
              { step: "02", title: "System Design", desc: "Custom system design based on coverage needs and budget." },
              { step: "03", title: "Installation", desc: "Professional installation with minimal disruption to your operations." },
              { step: "04", title: "Training & Support", desc: "Complete user training and ongoing technical support." },
            ].map((p, i) => (
              <AnimatedSection key={p.step} delay={i * 150}>
                <div className="text-center relative">
                  <div className="w-16 h-16 rounded-2xl hero-gradient flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="font-heading text-2xl font-bold text-primary-foreground">{p.step}</span>
                  </div>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="hero-gradient section-padding">
          <div className="container mx-auto text-center relative z-10">
            <AnimatedSection>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4">Need a Security Solution?</h2>
              <p className="text-primary-foreground/85 mb-8 max-w-lg mx-auto text-lg">Get a free site survey and customized quotation for your CCTV requirements.</p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link to="/contact">
                  <Button size="lg" className="bg-highlight text-foreground hover:bg-highlight/90 font-semibold shadow-lg">
                    Request Free Survey <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
                <a href="https://wa.me/918667580862" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                    WhatsApp Us
                  </Button>
                </a>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CCTVSolutions;
