import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  link: string;
}

const ServiceCard = ({ icon: Icon, title, description, link }: ServiceCardProps) => {
  return (
    <Link to={link} className="group block bg-card rounded-lg p-6 card-elevated border border-border">
      <div className="w-14 h-14 rounded-lg hero-gradient flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        <Icon className="h-7 w-7 text-primary-foreground" />
      </div>
      <h3 className="font-heading text-xl font-bold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      <span className="inline-block mt-4 text-sm font-semibold text-accent group-hover:translate-x-1 transition-transform">
        Learn More →
      </span>
    </Link>
  );
};

export default ServiceCard;
