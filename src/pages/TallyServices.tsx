import AnimatedSection from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calculator, FileText, BookOpen, Settings, GraduationCap, BarChart3, CheckCircle, ArrowRight, Zap, ShieldCheck, TrendingUp } from "lucide-react";
import heroTally from "@/assets/hero-tally.jpg";

const services = [
  { icon: Calculator, title: "Tally Software Installation", desc: "Complete installation and setup of Tally Prime and Tally ERP 9 with initial configuration for your business.", features: ["Tally Prime setup", "Data migration", "Multi-user configuration", "Backup setup"] },
  { icon: FileText, title: "GST Billing Setup", desc: "Configure GST-compliant invoicing with proper HSN codes, tax rates, and e-invoicing capability.", features: ["GST invoice format", "HSN/SAC mapping", "E-invoicing setup", "E-way bill integration"] },
  { icon: BookOpen, title: "Business Accounting", desc: "Complete accounting setup including chart of accounts, ledgers, and financial reporting.", features: ["Chart of accounts", "Bank reconciliation", "Financial statements", "Audit-ready reports"] },
  { icon: BarChart3, title: "GST Return Filing", desc: "Assistance with timely GST return filing including GSTR-1, GSTR-3B, and annual returns.", features: ["GSTR-1 filing", "GSTR-3B filing", "ITC reconciliation", "Annual return support"] },
  { icon: Settings, title: "Tally Customization", desc: "Custom TDL development for reports, vouchers, and workflows tailored to your business processes.", features: ["Custom reports", "Voucher customization", "Workflow automation", "Integration with other systems"] },
  { icon: GraduationCap, title: "Training & Support", desc: "Comprehensive Tally training for your team with ongoing technical support.", features: ["On-site training", "Online sessions", "User manual", "Phone/remote support"] },
];

const benefits = [
  { icon: Zap, title: "Automated GST", desc: "Automated GST calculations and compliance checks" },
  { icon: TrendingUp, title: "Real-time Reports", desc: "Real-time business reports and insights at your fingertips" },
  { icon: ShieldCheck, title: "Secure Data", desc: "Secure data with automatic backup and recovery" },
  { icon: CheckCircle, title: "Multi-user Access", desc: "Role-based permissions for team collaboration" },
];

const TallyServices = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[420px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroTally} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 hero-gradient opacity-88" />
        </div>
        <div className="container mx-auto text-center relative z-10 py-20 px-4">
          <AnimatedSection>
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent-foreground text-sm font-medium mb-6 backdrop-blur-sm border border-accent/30">
              Business Accounting Solutions
            </span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-primary-foreground mb-5">Tally & GST Services</h1>
            <p className="text-primary-foreground/85 max-w-2xl mx-auto text-lg md:text-xl">Streamline your accounting and stay GST-compliant with our expert services</p>
            <div className="flex gap-4 justify-center mt-8">
              <Link to="/contact">
                <Button size="lg" className="bg-highlight text-foreground hover:bg-highlight/90 font-semibold shadow-lg">
                  Request a Demo <ArrowRight className="ml-1 h-4 w-4" />
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

      {/* Services */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <AnimatedSection className="text-center mb-14">
            <span className="text-accent font-semibold text-sm uppercase tracking-widest">What We Offer</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2">Our Tally & GST Services</h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">End-to-end accounting solutions from setup to ongoing compliance support</p>
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

      {/* Benefits */}
      <section className="section-padding bg-muted">
        <div className="container mx-auto">
          <AnimatedSection className="text-center mb-14">
            <span className="text-accent font-semibold text-sm uppercase tracking-widest">Why Tally</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2">Benefits for Your Business</h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <AnimatedSection key={b.title} delay={i * 100}>
                <div className="bg-card p-6 rounded-xl border border-border card-elevated text-center group">
                  <div className="w-14 h-14 rounded-xl hero-gradient flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <b.icon className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-2">{b.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Get Started */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection animation="slide-in-left">
              <span className="text-accent font-semibold text-sm uppercase tracking-widest">Get Started</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2 mb-5">How It Works</h2>
              <div className="space-y-6">
                {[
                  { step: "01", title: "Consultation", desc: "We understand your business needs and current setup." },
                  { step: "02", title: "Setup & Migration", desc: "Install Tally, migrate data, and configure GST compliance." },
                  { step: "03", title: "Training", desc: "Hands-on training for your team on all features." },
                  { step: "04", title: "Ongoing Support", desc: "Continuous support for filing, updates, and troubleshooting." },
                ].map((item, i) => (
                  <div key={item.step} className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-xl hero-gradient flex items-center justify-center shrink-0 shadow-md">
                      <span className="font-heading font-bold text-primary-foreground">{item.step}</span>
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-foreground">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
            <AnimatedSection animation="slide-in-right">
              <div className="bg-card p-8 rounded-xl card-elevated border border-border">
                <h3 className="font-heading text-2xl font-bold text-foreground mb-4">Get Started Today</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">Whether you're starting fresh or migrating from another system, we make the transition seamless and stress-free.</p>
                <div className="space-y-3">
                  <Link to="/contact" className="block">
                    <Button className="hero-gradient text-primary-foreground w-full hover:opacity-90">
                      Request a Demo <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                  <a href="https://wa.me/918667580862?text=Hi%20MS%20Tech%2C%20I%20need%20help%20with%20Tally%20services" target="_blank" rel="noopener noreferrer" className="block">
                    <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent/10">
                      WhatsApp for Quick Help
                    </Button>
                  </a>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="hero-gradient section-padding">
        <div className="container mx-auto text-center">
          <AnimatedSection>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4">Need Tally or GST Assistance?</h2>
            <p className="text-primary-foreground/85 mb-8 max-w-lg mx-auto text-lg">Our experts are ready to help you set up or optimize your accounting system.</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/contact">
                <Button size="lg" className="bg-highlight text-foreground hover:bg-highlight/90 font-semibold shadow-lg">
                  Contact Our Experts <ArrowRight className="ml-1 h-4 w-4" />
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

export default TallyServices;
