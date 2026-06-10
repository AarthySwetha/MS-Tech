import { useState } from "react";
import { Sparkles, Calculator, Loader2, Camera, Wrench, Cable, IndianRupee, Lightbulb, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Estimate = {
  totalArea: number;
  cameraCount: number;
  cameraBreakdown: { type: string; quantity: number; unitPrice: number; reason: string }[];
  additionalEquipment: { item: string; quantity: number; unitPrice: number }[];
  installationCost: number;
  cablingCost: number;
  totalCost: number;
  recommendations: string;
};

const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;

const AIEstimator = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("3");
  const [areaType, setAreaType] = useState("Office");
  const [cameraQuality, setCameraQuality] = useState("Full HD (4MP)");
  const [indoorOutdoor, setIndoorOutdoor] = useState("Indoor");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [estimate, setEstimate] = useState<Estimate | null>(null);

  const handleEstimate = async () => {
    if (!name.trim() || name.length > 100) {
      toast.error("Please enter your name");
      return;
    }
    if (!/^[\d+\-\s()]{7,20}$/.test(phone.trim())) {
      toast.error("Please enter a valid phone number");
      return;
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      toast.error("Please enter a valid email");
      return;
    }
    const l = parseFloat(length);
    const w = parseFloat(width);
    const h = parseFloat(height);
    if (!l || !w || !h || l <= 0 || w <= 0 || h <= 0) {
      toast.error("Please enter valid dimensions");
      return;
    }
    if (l > 1000 || w > 1000) {
      toast.error("Dimensions seem too large. Please contact us directly.");
      return;
    }

    setLoading(true);
    setEstimate(null);
    try {
      const { data, error } = await supabase.functions.invoke("estimate-cameras", {
        body: { length: l, width: w, height: h, areaType, cameraQuality, indoorOutdoor, notes: notes.slice(0, 500) },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      const est: Estimate = data.estimate;
      setEstimate(est);

      // Save lead
      await supabase.from("estimator_submissions").insert({
        customer_name: name.trim().slice(0, 100),
        customer_phone: phone.trim().slice(0, 20),
        customer_email: email.trim().slice(0, 255) || null,
        length: l, width: w, height: h,
        area_type: areaType,
        camera_quality: cameraQuality,
        indoor_outdoor: indoorOutdoor,
        notes: notes.slice(0, 500) || null,
        estimate: est as any,
        total_cost: est.totalCost,
        camera_count: est.cameraCount,
      });

      toast.success("Estimate ready! Our team will reach out to you soon.");
    } catch (e: any) {
      console.error(e);
      toast.error(e?.message || "Failed to generate estimate. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const whatsappShare = () => {
    if (!estimate) return;
    const msg = `Hi MS Tech! I'm ${name}. I got an AI estimate for my ${areaType} (${length}m x ${width}m):\n\n• Cameras: ${estimate.cameraCount}\n• Total Cost: ${formatINR(estimate.totalCost)}\n\nI'd like to discuss further.`;
    window.open(`https://wa.me/918667580862?text=${encodeURIComponent(msg)}`, "_blank");
  };


  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="hero-gradient py-20 px-4">
        <div className="container mx-auto text-center text-primary-foreground">
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 px-4 py-2 rounded-full mb-4">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">AI-Powered</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">CCTV Cost Estimator</h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Enter your room dimensions and our AI will instantly recommend the right camera setup with transparent pricing in ₹.
          </p>
        </div>
      </section>

      {/* Form + Result */}
      <section className="py-12 px-4">
        <div className="container mx-auto grid lg:grid-cols-2 gap-8 max-w-6xl">
          {/* Form */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" />
                Tell us about your space
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-3 gap-3 pb-3 border-b border-border">
                <div>
                  <Label htmlFor="name">Your Name *</Label>
                  <Input id="name" maxLength={100} value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone *</Label>
                  <Input id="phone" maxLength={20} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 43210" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" maxLength={255} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label htmlFor="length">Length (m)</Label>
                  <Input id="length" type="number" min="1" max="1000" value={length} onChange={(e) => setLength(e.target.value)} placeholder="10" />
                </div>
                <div>
                  <Label htmlFor="width">Width (m)</Label>
                  <Input id="width" type="number" min="1" max="1000" value={width} onChange={(e) => setWidth(e.target.value)} placeholder="8" />
                </div>
                <div>
                  <Label htmlFor="height">Height (m)</Label>
                  <Input id="height" type="number" min="1" max="20" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="3" />
                </div>
              </div>

              <div>
                <Label>Area Type</Label>
                <Select value={areaType} onValueChange={setAreaType}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["Home", "Office", "Shop / Retail", "Warehouse", "Showroom", "Restaurant", "School", "Factory", "Parking Lot"].map(o => (
                      <SelectItem key={o} value={o}>{o}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Camera Quality</Label>
                  <Select value={cameraQuality} onValueChange={setCameraQuality}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {["HD (2MP)", "Full HD (4MP)", "4K (8MP)"].map(o => (
                        <SelectItem key={o} value={o}>{o}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Location</Label>
                  <Select value={indoorOutdoor} onValueChange={setIndoorOutdoor}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {["Indoor", "Outdoor", "Both"].map(o => (
                        <SelectItem key={o} value={o}>{o}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="notes">Additional Notes (optional)</Label>
                <Textarea id="notes" maxLength={500} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="e.g., 2 entry doors, need night vision, large windows..." />
              </div>

              <Button onClick={handleEstimate} disabled={loading} className="w-full hero-gradient text-primary-foreground" size="lg">
                {loading ? (<><Loader2 className="h-4 w-4 animate-spin" /> Analyzing...</>) : (<><Sparkles className="h-4 w-4" /> Get AI Estimate</>)}
              </Button>
            </CardContent>
          </Card>

          {/* Result */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-accent" />
                AI Estimate
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!estimate && !loading && (
                <div className="text-center py-12 text-muted-foreground">
                  <Camera className="h-12 w-12 mx-auto mb-3 opacity-40" />
                  <p>Fill the form and click "Get AI Estimate" to see results.</p>
                </div>
              )}

              {loading && (
                <div className="text-center py-12">
                  <Loader2 className="h-12 w-12 mx-auto mb-3 animate-spin text-primary" />
                  <p className="text-muted-foreground">Our AI is analyzing your space...</p>
                </div>
              )}

              {estimate && (
                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-muted rounded-lg p-3">
                      <p className="text-xs text-muted-foreground">Total Area</p>
                      <p className="text-xl font-bold">{estimate.totalArea} m²</p>
                    </div>
                    <div className="bg-muted rounded-lg p-3">
                      <p className="text-xs text-muted-foreground">Cameras Needed</p>
                      <p className="text-xl font-bold">{estimate.cameraCount}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold flex items-center gap-2 mb-2"><Camera className="h-4 w-4" /> Cameras</h4>
                    <div className="space-y-2">
                      {estimate.cameraBreakdown.map((c, i) => (
                        <div key={i} className="border border-border rounded-lg p-3 text-sm">
                          <div className="flex justify-between font-medium">
                            <span>{c.quantity}x {c.type}</span>
                            <span>{formatINR(c.quantity * c.unitPrice)}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{c.reason}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold flex items-center gap-2 mb-2"><Wrench className="h-4 w-4" /> Equipment</h4>
                    <div className="space-y-1.5 text-sm">
                      {estimate.additionalEquipment.map((e, i) => (
                        <div key={i} className="flex justify-between border-b border-border pb-1.5">
                          <span>{e.quantity}x {e.item}</span>
                          <span>{formatINR(e.quantity * e.unitPrice)}</span>
                        </div>
                      ))}
                      <div className="flex justify-between"><span className="flex items-center gap-1.5"><Cable className="h-3.5 w-3.5" /> Cabling</span><span>{formatINR(estimate.cablingCost)}</span></div>
                      <div className="flex justify-between"><span className="flex items-center gap-1.5"><Wrench className="h-3.5 w-3.5" /> Installation</span><span>{formatINR(estimate.installationCost)}</span></div>
                    </div>
                  </div>

                  <div className="hero-gradient rounded-lg p-4 text-primary-foreground">
                    <p className="text-xs opacity-80">Estimated Total</p>
                    <p className="text-3xl font-bold flex items-center"><IndianRupee className="h-6 w-6" />{estimate.totalCost.toLocaleString("en-IN")}</p>
                    <p className="text-xs opacity-80 mt-1">*Indicative price. Final quote after site survey.</p>
                  </div>

                  <div className="bg-accent/10 border border-accent/30 rounded-lg p-3">
                    <p className="text-sm font-semibold flex items-center gap-1.5 mb-1"><Lightbulb className="h-4 w-4 text-accent" /> AI Recommendations</p>
                    <p className="text-sm text-foreground/80 whitespace-pre-line">{estimate.recommendations}</p>
                  </div>

                  <Button onClick={whatsappShare} className="w-full" variant="outline">
                    <MessageCircle className="h-4 w-4" /> Discuss this estimate on WhatsApp
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default AIEstimator;
