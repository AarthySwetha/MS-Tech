import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, LogOut, Search, Trash2, Eye, MessageCircle, Phone, Mail, IndianRupee, Camera, ShieldAlert } from "lucide-react";
import { toast } from "sonner";

type Submission = {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  length: number; width: number; height: number;
  area_type: string;
  camera_quality: string;
  indoor_outdoor: string;
  notes: string | null;
  estimate: any;
  total_cost: number;
  camera_count: number;
  status: string;
  admin_notes: string | null;
  created_at: string;
};

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-500",
  contacted: "bg-amber-500",
  converted: "bg-green-600",
  rejected: "bg-muted-foreground",
};

const formatINR = (n: number) => `₹${Number(n).toLocaleString("en-IN")}`;

const Admin = () => {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selected, setSelected] = useState<Submission | null>(null);

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate("/auth"); return; }
      setUserId(session.user.id);
      const { data, error } = await supabase
        .from("user_roles").select("role").eq("user_id", session.user.id).eq("role", "admin").maybeSingle();
      if (error) console.error(error);
      setIsAdmin(!!data);
      setChecking(false);
    };
    init();
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) navigate("/auth");
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (isAdmin) loadSubmissions();
  }, [isAdmin]);

  const loadSubmissions = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("estimator_submissions").select("*").order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    else setSubmissions((data as Submission[]) || []);
    setLoading(false);
  };

  const updateSubmission = async (id: string, patch: Partial<Submission>) => {
    const { error } = await supabase.from("estimator_submissions").update(patch).eq("id", id);
    if (error) return toast.error(error.message);
    setSubmissions(prev => prev.map(s => s.id === id ? { ...s, ...patch } : s));
    if (selected?.id === id) setSelected({ ...selected, ...patch } as Submission);
    toast.success("Updated");
  };

  const deleteSubmission = async (id: string) => {
    if (!confirm("Delete this submission permanently?")) return;
    const { error } = await supabase.from("estimator_submissions").delete().eq("id", id);
    if (error) return toast.error(error.message);
    setSubmissions(prev => prev.filter(s => s.id !== id));
    setSelected(null);
    toast.success("Deleted");
  };

  const signOut = async () => { await supabase.auth.signOut(); navigate("/auth"); };

  const filtered = useMemo(() => submissions.filter(s => {
    if (statusFilter !== "all" && s.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return [s.customer_name, s.customer_phone, s.customer_email, s.area_type].some(v => v?.toLowerCase().includes(q));
    }
    return true;
  }), [submissions, search, statusFilter]);

  const stats = useMemo(() => ({
    total: submissions.length,
    new: submissions.filter(s => s.status === "new").length,
    converted: submissions.filter(s => s.status === "converted").length,
    revenue: submissions.filter(s => s.status === "converted").reduce((sum, s) => sum + Number(s.total_cost), 0),
  }), [submissions]);

  if (checking) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="max-w-md w-full">
          <CardContent className="text-center py-10 space-y-4">
            <ShieldAlert className="h-12 w-12 mx-auto text-destructive" />
            <h2 className="text-xl font-bold">Access Denied</h2>
            <p className="text-muted-foreground text-sm">
              Your account is not an admin. Ask the site owner to grant admin access. Your User ID:
            </p>
            <code className="text-xs bg-muted px-2 py-1 rounded block break-all">{userId}</code>
            <Button onClick={signOut} variant="outline"><LogOut className="h-4 w-4" /> Sign Out</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Estimator Submissions</h1>
            <p className="text-sm text-muted-foreground">Manage customer leads from the AI estimator</p>
          </div>
          <Button variant="outline" onClick={signOut}><LogOut className="h-4 w-4" /> Sign Out</Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Total Leads", value: stats.total },
            { label: "New", value: stats.new },
            { label: "Converted", value: stats.converted },
            { label: "Converted Revenue", value: formatINR(stats.revenue) },
          ].map((s) => (
            <Card key={s.label}><CardContent className="p-4">
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className="text-2xl font-bold mt-1">{s.value}</p>
            </CardContent></Card>
          ))}
        </div>

        {/* Filters */}
        <Card className="mb-4"><CardContent className="p-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by name, phone, email..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-44"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="converted">Converted</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </CardContent></Card>

        {/* List */}
        <Card>
          <CardHeader><CardTitle className="text-base">{filtered.length} submission{filtered.length !== 1 ? "s" : ""}</CardTitle></CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="py-12 text-center"><Loader2 className="h-6 w-6 animate-spin mx-auto text-primary" /></div>
            ) : filtered.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground">No submissions match your filters</div>
            ) : (
              <div className="divide-y divide-border">
                {filtered.map(s => (
                  <div key={s.id} className="p-4 hover:bg-muted/50 grid sm:grid-cols-[1fr_auto] gap-3 items-start">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold">{s.customer_name}</span>
                        <Badge className={`${STATUS_COLORS[s.status] || "bg-muted"} text-white capitalize`}>{s.status}</Badge>
                        <span className="text-xs text-muted-foreground">{new Date(s.created_at).toLocaleString()}</span>
                      </div>
                      <div className="text-sm text-muted-foreground flex flex-wrap gap-3">
                        <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{s.customer_phone}</span>
                        {s.customer_email && <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{s.customer_email}</span>}
                        <span className="flex items-center gap-1"><Camera className="h-3 w-3" />{s.camera_count} cameras</span>
                        <span className="flex items-center gap-1 font-medium text-foreground"><IndianRupee className="h-3 w-3" />{Number(s.total_cost).toLocaleString("en-IN")}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{s.area_type} • {s.length}×{s.width}×{s.height}m • {s.camera_quality} • {s.indoor_outdoor}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => setSelected(s)}><Eye className="h-3.5 w-3.5" /></Button>
                      <a href={`https://wa.me/${s.customer_phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" variant="outline"><MessageCircle className="h-3.5 w-3.5" /></Button>
                      </a>
                      <Button size="sm" variant="outline" onClick={() => deleteSubmission(s.id)}><Trash2 className="h-3.5 w-3.5 text-destructive" /></Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Detail Dialog */}
      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          {selected && (
            <>
              <DialogHeader><DialogTitle>{selected.customer_name}</DialogTitle></DialogHeader>
              <div className="space-y-4 text-sm">
                <div className="grid grid-cols-2 gap-3">
                  <div><p className="text-muted-foreground text-xs">Phone</p><p>{selected.customer_phone}</p></div>
                  <div><p className="text-muted-foreground text-xs">Email</p><p>{selected.customer_email || "—"}</p></div>
                  <div><p className="text-muted-foreground text-xs">Area</p><p>{selected.area_type} ({selected.length}×{selected.width}×{selected.height}m)</p></div>
                  <div><p className="text-muted-foreground text-xs">Quality / Location</p><p>{selected.camera_quality} • {selected.indoor_outdoor}</p></div>
                </div>

                {selected.notes && <div><p className="text-muted-foreground text-xs">Customer Notes</p><p className="bg-muted p-2 rounded">{selected.notes}</p></div>}

                <div>
                  <p className="text-muted-foreground text-xs mb-1">AI Estimate</p>
                  <div className="bg-muted/50 rounded p-3 space-y-2">
                    <p><strong>{selected.camera_count}</strong> cameras • Total: <strong>{formatINR(selected.total_cost)}</strong></p>
                    {selected.estimate?.cameraBreakdown?.map((c: any, i: number) => (
                      <div key={i} className="text-xs border-l-2 border-primary pl-2">
                        <strong>{c.quantity}× {c.type}</strong> — {formatINR(c.quantity * c.unitPrice)}
                        <p className="text-muted-foreground">{c.reason}</p>
                      </div>
                    ))}
                    {selected.estimate?.recommendations && (
                      <p className="text-xs text-muted-foreground italic mt-2">💡 {selected.estimate.recommendations}</p>
                    )}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">Status</p>
                    <Select value={selected.status} onValueChange={(v) => updateSubmission(selected.id, { status: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="converted">Converted</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <p className="text-muted-foreground text-xs mb-1">Admin Notes</p>
                  <Textarea
                    value={selected.admin_notes || ""}
                    maxLength={1000}
                    onChange={(e) => setSelected({ ...selected, admin_notes: e.target.value })}
                    onBlur={() => updateSubmission(selected.id, { admin_notes: selected.admin_notes })}
                    placeholder="Internal notes about follow-up..."
                  />
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
