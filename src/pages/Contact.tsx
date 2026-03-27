import { useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", service: "", message: "" });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Thank you! We'll get back to you shortly.");
        setFormData({ name: "", email: "", phone: "", service: "", message: "" });
      } else {
        const errorData = await response.json();
        toast.error(`Submission failed: ${errorData.error || "Unknown error"}`);
      }
    } catch (error) {
      toast.error("Failed to connect to the server. Please try again later.");
      console.error("Submission error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <section className="hero-gradient section-padding">
        <div className="container mx-auto text-center">
          <AnimatedSection>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Contact Us</h1>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg">Get in touch for a free consultation or service request</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <AnimatedSection animation="slide-in-left">
              <div className="space-y-6">
                <h2 className="font-heading text-2xl font-bold text-foreground">Get In Touch</h2>
                {[
                  { icon: Phone, label: "Phone", value: "+91 86675 80862", href: "tel:+918667580862" },
                  { icon: Mail, label: "Email", value: "mstechsalesandservice@gmail.com", href: "mailto:mstechsalesandservice@gmail.com" },
                  { icon: MapPin, label: "Address", value: "23, 2nd Floor, VPK Complex, Erode - 638001, Tamil Nadu" },
                  { icon: Clock, label: "Hours", value: "Mon - Sat: 9:00 AM - 7:00 PM" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg hero-gradient flex items-center justify-center shrink-0">
                      <item.icon className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-foreground">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-sm text-muted-foreground hover:text-accent transition-colors">{item.value}</a>
                      ) : (
                        <p className="text-sm text-muted-foreground">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}

                {/* Map */}
                <div className="rounded-lg overflow-hidden border border-border mt-4">
                  <iframe
                    title="MS Tech Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.0!2d77.7172!3d11.3410!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDIwJzI3LjYiTiA3N8KwNDMnMDEuOSJF!5e0!3m2!1sen!2sin!4v1234567890"
                    width="100%"
                    height="200"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </div>
            </AnimatedSection>

            {/* Form */}
            <AnimatedSection animation="slide-in-right" className="lg:col-span-2">
              <div className="bg-card p-8 rounded-lg card-elevated border border-border">
                <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Service Request Form</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Full Name *</label>
                      <Input required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Your name" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Email *</label>
                      <Input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="your@email.com" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Phone Number</label>
                      <Input value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="+91 XXXXX XXXXX" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Service Required *</label>
                      <select
                        required
                        value={formData.service}
                        onChange={(e) => setFormData({...formData, service: e.target.value})}
                        className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm text-foreground"
                      >
                        <option value="">Select a service</option>
                        <option value="cctv-installation">CCTV Installation</option>
                        <option value="cctv-maintenance">CCTV Maintenance</option>
                        <option value="remote-monitoring">Remote Monitoring</option>
                        <option value="tally-setup">Tally Setup</option>
                        <option value="gst-billing">GST Billing</option>
                        <option value="accounting">Business Accounting</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Message *</label>
                    <Textarea required rows={5} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} placeholder="Describe your requirements..." />
                  </div>
                  <Button type="submit" size="lg" disabled={isLoading} className="hero-gradient text-primary-foreground hover:opacity-90 w-full sm:w-auto">
                    <Send className={`h-4 w-4 mr-2 ${isLoading ? 'animate-pulse' : ''}`} /> {isLoading ? 'Sending...' : 'Send Request'}
                  </Button>
                </form>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
