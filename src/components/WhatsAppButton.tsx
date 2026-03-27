import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

const quickMessages = [
  { label: "CCTV Inquiry", msg: "Hi MS Tech, I'm interested in CCTV installation services." },
  { label: "Tally Setup", msg: "Hi MS Tech, I need help with Tally setup and GST billing." },
  { label: "Get a Quote", msg: "Hi MS Tech, I would like to get a quotation for your services." },
  { label: "General Inquiry", msg: "Hi MS Tech, I would like to inquire about your services." },
];

const WhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Quick message popup */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-72 bg-card rounded-xl border border-border shadow-2xl overflow-hidden animate-scale-in mb-2">
          <div className="bg-[#25D366] px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-white">
              <MessageCircle className="h-5 w-5" />
              <span className="font-semibold text-sm">Chat on WhatsApp</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="p-3 space-y-2">
            <p className="text-xs text-muted-foreground px-1">Choose a topic to start chatting:</p>
            {quickMessages.map((qm) => (
              <a
                key={qm.label}
                href={`https://wa.me/918667580862?text=${encodeURIComponent(qm.msg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-2.5 rounded-lg text-sm font-medium text-foreground bg-muted hover:bg-accent/10 hover:text-accent transition-colors"
              >
                {qm.label}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Chat on WhatsApp"
        className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5b] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="hidden sm:inline text-sm font-semibold">WhatsApp</span>
      </button>
    </div>
  );
};

export default WhatsAppButton;
