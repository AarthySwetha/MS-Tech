import { useState, useRef, useEffect } from "react";
import { X, Send, Bot, User, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Message = { role: "bot" | "user"; text: string };

const faqData: { keywords: string[]; answer: string }[] = [
  {
    keywords: ["hello", "hi", "hey", "good morning", "good evening"],
    answer: "Hello! 👋 Welcome to MS Tech. How can I help you today? You can ask about our CCTV services, Tally & GST solutions, pricing, or contact details.",
  },
  {
    keywords: ["cctv", "camera", "surveillance", "security camera", "install camera"],
    answer: "📹 We offer complete CCTV solutions:\n\n• Dome, Bullet, PTZ & IP cameras\n• HD & 4K resolution options\n• Remote monitoring via mobile app\n• Annual maintenance contracts\n• Free site survey & quotation\n\nWant a free consultation? Contact us at 8667580862!",
  },
  {
    keywords: ["tally", "accounting", "erp"],
    answer: "💼 Our Tally services include:\n\n• Tally Prime & ERP 9 installation\n• Data migration & configuration\n• Custom TDL development\n• Multi-user & multi-branch setup\n• Hands-on team training\n\nCall 8667580862 for a demo!",
  },
  {
    keywords: ["gst", "billing", "tax", "return", "filing", "invoice"],
    answer: "🧾 GST services we offer:\n\n• GST billing setup in Tally\n• GSTR-1 & GSTR-3B filing\n• E-invoicing & E-way bill setup\n• ITC reconciliation\n• Annual return support\n\nNeed help? Call 8667580862!",
  },
  {
    keywords: ["price", "cost", "rate", "charge", "quote", "estimate", "budget"],
    answer: "💰 Our pricing is flexible and depends on scope:\n\n• CCTV: Varies by camera count & type\n• Tally: Packages from basic to enterprise\n• AMC: Annual plans available\n\nWe offer FREE quotations! Call 8667580862 or WhatsApp us.",
  },
  {
    keywords: ["contact", "phone", "call", "email", "reach", "address", "location", "where", "office"],
    answer: "📍 MS Tech\n23, 2nd Floor, VPK Complex\nErode - 638001, Tamil Nadu\n\n📞 +91 86675 80862\n📧 mstechsalesandservice@gmail.com\n⏰ Mon - Sat: 9:00 AM - 7:00 PM",
  },
  {
    keywords: ["maintenance", "repair", "service", "amc", "annual"],
    answer: "🔧 Maintenance services:\n\n• Annual Maintenance Contracts (AMC)\n• Emergency repair services\n• Regular camera cleaning & checkups\n• System upgrades & replacements\n• 24/7 support available\n\nCall 8667580862 for AMC details!",
  },
  {
    keywords: ["remote", "monitor", "online", "mobile", "app"],
    answer: "📱 Remote monitoring features:\n\n• View cameras from anywhere\n• Mobile app for Android & iOS\n• Real-time push notifications\n• Multi-site viewing\n• Cloud recording options\n\nIncluded in all our installation packages!",
  },
  {
    keywords: ["brand", "hikvision", "dahua", "cp plus", "type", "which camera"],
    answer: "🏷️ We work with top brands:\n\n• Hikvision\n• Dahua\n• CP Plus\n• And more...\n\nWe recommend the best option based on your needs and budget.",
  },
  {
    keywords: ["warranty", "guarantee"],
    answer: "✅ Warranty details:\n\n• Camera hardware: 1-2 years (brand dependent)\n• Installation workmanship: 1 year\n• AMC plans for extended coverage\n\nContact us for specific warranty info!",
  },
  {
    keywords: ["area", "city", "erode", "coimbatore", "salem", "tirupur", "service area"],
    answer: "🗺️ We serve across Tamil Nadu:\n\n• Erode (Headquarters)\n• Coimbatore\n• Salem\n• Tirupur\n• Surrounding districts\n\nContact us to check service availability in your area!",
  },
  {
    keywords: ["thank", "thanks", "bye", "okay", "ok", "great"],
    answer: "You're welcome! 😊 Feel free to reach out anytime.\n\n📞 Call: 8667580862\n💬 WhatsApp: wa.me/918667580862\n\nHave a great day!",
  },
];

const defaultAnswer =
  "I'm sorry, I didn't quite understand that. You can ask me about:\n\n• CCTV cameras & installation\n• Tally & GST services\n• Pricing & quotations\n• Contact & location\n• Maintenance & AMC\n• Service areas\n\nOr call us directly at 8667580862!";

const getAnswer = (input: string): string => {
  const lower = input.toLowerCase();
  for (const faq of faqData) {
    if (faq.keywords.some((kw) => lower.includes(kw))) return faq.answer;
  }
  return defaultAnswer;
};

const quickQuestions = [
  { label: "📹 CCTV Services", query: "cctv" },
  { label: "💼 Tally & GST", query: "tally" },
  { label: "💰 Pricing", query: "pricing" },
  { label: "📍 Contact Info", query: "contact" },
  { label: "🔧 Maintenance", query: "maintenance" },
  { label: "🗺️ Service Areas", query: "service area" },
];

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Hi! 👋 I'm MS Tech's assistant. How can I help you today?\n\nAsk me about CCTV, Tally, pricing, or anything else!" },
  ]);
  const [input, setInput] = useState("");
  const [showQuick, setShowQuick] = useState(true);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", text: text.trim() };
    const botMsg: Message = { role: "bot", text: getAnswer(text) };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
    setShowQuick(false);
  };

  return (
    <>
      {/* Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center"
        aria-label="Chat with us"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-[7.5rem] right-6 z-50 w-[340px] sm:w-[380px] max-h-[75vh] flex flex-col rounded-2xl border border-border bg-card shadow-2xl overflow-hidden animate-scale-in">
          {/* Header */}
          <div className="hero-gradient px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Bot className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm font-semibold text-primary-foreground">MS Tech Assistant</p>
                <p className="text-[11px] text-primary-foreground/70">Always online • FAQ Bot</p>
              </div>
            </div>
            <a
              href="https://wa.me/918667580862"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[11px] text-primary-foreground/80 hover:text-primary-foreground bg-primary-foreground/10 px-2 py-1 rounded-full transition-colors"
            >
              <ExternalLink className="h-3 w-3" /> WhatsApp
            </a>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[200px] max-h-[45vh]">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                {m.role === "bot" && (
                  <div className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-1">
                    <Bot className="h-4 w-4 text-accent" />
                  </div>
                )}
                <div
                  className={`max-w-[78%] px-3.5 py-2.5 rounded-xl text-sm whitespace-pre-line leading-relaxed ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-muted text-foreground rounded-bl-sm"
                  }`}
                >
                  {m.text}
                </div>
                {m.role === "user" && (
                  <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-1">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                )}
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {/* Quick questions */}
          {showQuick && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {quickQuestions.map((q) => (
                <button
                  key={q.label}
                  onClick={() => send(q.query)}
                  className="text-xs px-3 py-1.5 rounded-full border border-border bg-background hover:bg-accent/10 hover:border-accent text-foreground transition-colors"
                >
                  {q.label}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="border-t border-border p-3 flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send(input)}
              placeholder="Type your question..."
              className="text-sm"
            />
            <Button size="icon" onClick={() => send(input)} className="hero-gradient text-primary-foreground shrink-0">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
