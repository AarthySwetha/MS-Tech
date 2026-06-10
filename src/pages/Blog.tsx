import AnimatedSection from "@/components/AnimatedSection";
import { Calendar, ArrowRight } from "lucide-react";

const posts = [
  { title: "Top 5 CCTV Camera Types for Home Security in 2025", date: "March 5, 2025", category: "Security Tips", excerpt: "Choosing the right CCTV camera for your home can be overwhelming. Here's our guide to the top 5 camera types that offer the best protection." },
  { title: "Understanding GST Filing: A Complete Guide for Small Businesses", date: "February 28, 2025", category: "GST Updates", excerpt: "Stay compliant with our comprehensive guide to GST filing, including deadlines, return types, and common mistakes to avoid." },
  { title: "How AI is Transforming Video Surveillance", date: "February 20, 2025", category: "Technology", excerpt: "Artificial intelligence is revolutionizing CCTV systems with facial recognition, behavior analytics, and automated threat detection." },
  { title: "Tally Prime vs Tally ERP 9: Which One Should You Choose?", date: "February 15, 2025", category: "Business Solutions", excerpt: "A detailed comparison of Tally Prime and Tally ERP 9 to help you choose the right accounting software for your business." },
  { title: "Essential Maintenance Tips for Your CCTV System", date: "February 10, 2025", category: "Security Tips", excerpt: "Regular maintenance ensures your CCTV system performs at its best. Learn the essential maintenance steps every system owner should follow." },
  { title: "GST E-invoicing: Everything You Need to Know", date: "February 5, 2025", category: "GST Updates", excerpt: "E-invoicing is now mandatory for more businesses. Learn about the requirements, process, and how to set it up in Tally." },
];

const Blog = () => {
  return (
    <div>
      <section className="hero-gradient section-padding">
        <div className="container mx-auto text-center">
          <AnimatedSection>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Blog & Insights</h1>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg">Security tips, GST updates, and technology insights</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <AnimatedSection key={post.title} delay={i * 80}>
                <div className="bg-card rounded-lg card-elevated border border-border overflow-hidden h-full flex flex-col">
                  <div className="hero-gradient p-4">
                    <span className="text-xs font-semibold text-highlight uppercase tracking-wider">{post.category}</span>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                      <Calendar className="h-3 w-3" /> {post.date}
                    </div>
                    <h3 className="font-heading text-lg font-bold text-foreground mb-3 line-clamp-2">{post.title}</h3>
                    <p className="text-sm text-muted-foreground flex-1">{post.excerpt}</p>
                    <button className="flex items-center gap-1 text-sm font-semibold text-accent mt-4 hover:gap-2 transition-all">
                      Read More <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
