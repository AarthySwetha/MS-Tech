import AnimatedSection from "@/components/AnimatedSection";
import { Shield, Target, Eye, Users, Award, Clock, ArrowRight, Handshake, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroCctv from "@/assets/hero-cctv.jpg";

const stats = [
  { value: "500+", label: "Projects Completed" },
  { value: "8+", label: "Years Experience" },
  { value: "300+", label: "Happy Clients" },
  { value: "24/7", label: "Support Available" },
];

const values = [
  { icon: Shield, title: "Integrity", desc: "We conduct business with the highest ethical standards and transparency." },
  { icon: Award, title: "Excellence", desc: "We deliver quality in every project we undertake." },
  { icon: Users, title: "Customer Focus", desc: "Our clients' success is our primary goal and motivation." },
  { icon: Clock, title: "Reliability", desc: "We deliver on time, every time, without exceptions." },
  { icon: Handshake, title: "Trust", desc: "Building lasting partnerships through consistent, dependable service." },
  { icon: Lightbulb, title: "Innovation", desc: "Embracing latest technologies to provide cutting-edge solutions." },
];

const timeline = [
  { year: "2015", title: "Founded", desc: "MS Tech started as a small CCTV installation service in Erode." },
  { year: "2017", title: "Tally Services Added", desc: "Expanded into Tally accounting and GST compliance services." },
  { year: "2019", title: "300+ Installations", desc: "Crossed 300 successful CCTV installations across Tamil Nadu." },
  { year: "2023", title: "Full-Service Partner", desc: "Became a one-stop solution for security and business technology." },
];

const About = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[400px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroCctv} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 hero-gradient opacity-90" />
        </div>
        <div className="container mx-auto text-center relative z-10 py-20 px-4">
          <AnimatedSection>
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent-foreground text-sm font-medium mb-6 backdrop-blur-sm border border-accent/30">
              Since 2015
            </span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-primary-foreground mb-5">About MS Tech</h1>
            <p className="text-primary-foreground/85 max-w-2xl mx-auto text-lg md:text-xl">Your trusted partner for smart security and business solutions</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Story + Stats */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <AnimatedSection animation="slide-in-left">
              <span className="text-accent font-semibold text-sm uppercase tracking-widest">Our Story</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2 mb-5">Building Trust Through Technology</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                MS Tech was founded with a vision to provide comprehensive technology solutions to businesses of all sizes. We specialize in two core areas: advanced CCTV surveillance systems and professional Tally accounting services.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Over the years, we have grown from a small local service provider to a trusted name in security and business solutions, serving hundreds of clients across Tamil Nadu and beyond.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Our team of certified technicians and accountants ensures that every client receives personalized attention and solutions tailored to their specific needs.
              </p>
              <Link to="/contact">
                <Button className="hero-gradient text-primary-foreground hover:opacity-90">
                  Get In Touch <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </AnimatedSection>
            <AnimatedSection animation="slide-in-right">
              <div className="grid grid-cols-2 gap-5">
                {stats.map((stat, i) => (
                  <div key={stat.label} className="bg-card p-6 rounded-xl card-elevated border border-border text-center group">
                    <p className="font-heading text-4xl font-bold text-accent group-hover:scale-110 transition-transform">{stat.value}</p>
                    <p className="text-sm text-muted-foreground mt-2 font-medium">{stat.label}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-muted">
        <div className="container mx-auto">
          <AnimatedSection className="text-center mb-14">
            <span className="text-accent font-semibold text-sm uppercase tracking-widest">Our Journey</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2">Company Timeline</h2>
          </AnimatedSection>
          <div className="max-w-3xl mx-auto relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-px" />
            {timeline.map((item, i) => (
              <AnimatedSection key={item.year} delay={i * 150}>
                <div className={`relative flex items-start gap-6 mb-10 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className="hidden md:block md:w-1/2" />
                  <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-accent border-4 border-background -translate-x-1/2 mt-1.5 z-10" />
                  <div className="ml-14 md:ml-0 md:w-1/2 bg-card p-5 rounded-xl border border-border card-elevated">
                    <span className="text-accent font-heading font-bold text-lg">{item.year}</span>
                    <h3 className="font-heading font-bold text-foreground mt-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <AnimatedSection delay={0}>
              <div className="bg-card p-8 rounded-xl card-elevated border border-border h-full">
                <div className="w-14 h-14 rounded-xl hero-gradient flex items-center justify-center mb-5">
                  <Target className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-foreground mb-3">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To deliver reliable, affordable, and cutting-edge security and accounting solutions that empower businesses to operate safely and efficiently. We strive to be the most trusted technology partner for small and medium enterprises.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={150}>
              <div className="bg-card p-8 rounded-xl card-elevated border border-border h-full">
                <div className="w-14 h-14 rounded-xl hero-gradient flex items-center justify-center mb-5">
                  <Eye className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-foreground mb-3">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To become the leading provider of integrated security and business technology solutions in India, setting industry standards for quality, innovation, and customer satisfaction.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-muted">
        <div className="container mx-auto">
          <AnimatedSection className="text-center mb-14">
            <span className="text-accent font-semibold text-sm uppercase tracking-widest">What Drives Us</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2">Our Core Values</h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <AnimatedSection key={v.title} delay={i * 100}>
                <div className="bg-card p-6 rounded-xl border border-border card-elevated text-center group">
                  <div className="w-14 h-14 rounded-xl hero-gradient flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <v.icon className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
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
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4">Ready to Work With Us?</h2>
            <p className="text-primary-foreground/85 mb-8 max-w-lg mx-auto text-lg">Let's discuss how we can help secure and grow your business.</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/contact">
                <Button size="lg" className="bg-highlight text-foreground hover:bg-highlight/90 font-semibold shadow-lg">
                  Contact Us <ArrowRight className="ml-1 h-4 w-4" />
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

export default About;
