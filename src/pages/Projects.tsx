import { useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Camera, Building2 } from "lucide-react";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";

const categories = ["All", "CCTV Installation", "Tally Solutions"];

const projects = [
  { img: project1, title: "Office Complex Security", category: "CCTV Installation", desc: "32-camera IP surveillance system for a corporate office complex with remote monitoring and analytics.", location: "Erode, TN", cameras: "32 Cameras" },
  { img: project2, title: "Retail Store Surveillance", category: "CCTV Installation", desc: "Complete retail security solution with POS-integrated cameras and loss prevention analytics.", location: "Coimbatore, TN", cameras: "16 Cameras" },
  { img: project3, title: "Warehouse Monitoring", category: "CCTV Installation", desc: "Industrial-grade surveillance system for a 50,000 sq ft warehouse with thermal cameras.", location: "Salem, TN", cameras: "24 Cameras" },
  { img: project4, title: "School Campus Security", category: "CCTV Installation", desc: "Campus-wide security system covering all entry points, corridors, and common areas.", location: "Erode, TN", cameras: "48 Cameras" },
  { img: project1, title: "Manufacturing Unit Accounting", category: "Tally Solutions", desc: "Complete Tally Prime setup with GST billing, inventory management, and multi-branch accounting.", location: "Tirupur, TN", cameras: "" },
  { img: project2, title: "Retail Chain GST Setup", category: "Tally Solutions", desc: "GST-compliant billing setup for a 5-branch retail chain with centralized reporting.", location: "Erode, TN", cameras: "" },
];

const Projects = () => {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[400px] flex items-center overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="container mx-auto text-center relative z-10 py-20 px-4">
          <AnimatedSection>
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent-foreground text-sm font-medium mb-6 backdrop-blur-sm border border-accent/30">
              Our Portfolio
            </span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-primary-foreground mb-5">Our Projects</h1>
            <p className="text-primary-foreground/85 max-w-2xl mx-auto text-lg md:text-xl">Showcasing our successful installations and implementations</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Filter & Grid */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <AnimatedSection className="flex flex-wrap gap-2 justify-center mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === cat
                    ? "hero-gradient text-primary-foreground shadow-md"
                    : "bg-muted text-muted-foreground hover:bg-accent/10 hover:text-accent border border-border"
                }`}
              >
                {cat}
              </button>
            ))}
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            {filtered.map((p, i) => (
              <AnimatedSection key={p.title + p.category} delay={i * 100}>
                <div className="group bg-card rounded-xl overflow-hidden card-elevated border border-border">
                  <div className="relative overflow-hidden aspect-video">
                    <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-accent text-accent-foreground shadow-md">{p.category}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">{p.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{p.desc}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-accent" /> {p.location}
                      </span>
                      {p.cameras && (
                        <span className="flex items-center gap-1">
                          <Camera className="h-3.5 w-3.5 text-accent" /> {p.cameras}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding bg-muted">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "500+", label: "Cameras Installed" },
              { value: "150+", label: "Sites Secured" },
              { value: "50+", label: "Tally Setups" },
              { value: "100%", label: "Client Satisfaction" },
            ].map((s, i) => (
              <AnimatedSection key={s.label} delay={i * 100}>
                <div className="text-center bg-card p-6 rounded-xl border border-border card-elevated">
                  <p className="font-heading text-3xl md:text-4xl font-bold text-accent">{s.value}</p>
                  <p className="text-sm text-muted-foreground mt-2 font-medium">{s.label}</p>
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
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4">Have a Project in Mind?</h2>
            <p className="text-primary-foreground/85 mb-8 max-w-lg mx-auto text-lg">Let's discuss your requirements and create a customized solution.</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/contact">
                <Button size="lg" className="bg-highlight text-foreground hover:bg-highlight/90 font-semibold shadow-lg">
                  Start Your Project <ArrowRight className="ml-1 h-4 w-4" />
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
      </section>
    </div>
  );
};

export default Projects;
