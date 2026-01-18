
"use client"
import { Facebook, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";


// Official WhatsApp SVG
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.63 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

const socialLinks = [
  { 
    name: "WhatsApp", 
    icon: WhatsAppIcon, 
    href: "https://wa.me/yournumber", 
    color: "hover:bg-[#25D366]", 
    priority: true 
  },
  { 
    name: "YouTube", 
    icon: Youtube, 
    href: "https://youtube.com/@yourchannel", 
    color: "hover:bg-[#FF0000]" 
  },
  { 
    name: "Instagram", 
    icon: Instagram, 
    href: "https://instagram.com/yourprofile", 
    color: "hover:bg-[#E4405F]" 
  },
  { 
    name: "Facebook", 
    icon: Facebook, 
    href: "https://facebook.com/yourpage", 
    color: "hover:bg-[#1877F2]" 
  },
];

export default function SocialLinks() {
 return (
    <div className="fixed bottom-6 left-1/2 z-[100] -translate-x-1/2 md:left-auto md:right-6 md:translate-x-0">
      <div className="flex flex-row gap-3 md:flex-col items-center justify-center">
        {socialLinks.map((social) => (
          <div key={social.name} className="group relative flex items-center">
            
            {/* Label - Hidden on mobile, slides out on desktop hover */}
            <span className="hidden md:block absolute right-full mr-3 whitespace-nowrap rounded-md bg-emerald-950/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white opacity-0 transition-all duration-300 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0">
              {social.name === "WhatsApp" ? "Chat with us" : social.name}
            </span>
            
            {/* Priority Ping Effect (WhatsApp) */}
            {social.priority && (
              <span className="absolute inset-0 animate-ping rounded-full bg-green-500/40" />
            )}
            
            <Button
              variant="outline"
              size="icon"
              asChild
              className={cn(
                "h-12 w-12 rounded-full bg-white shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-110 hover:text-white border-slate-100 flex items-center justify-center",
                social.color
              )}
            >
              <a href={social.href} target="_blank" rel="noopener noreferrer">
                <social.icon className="h-6 w-6" />
                <span className="sr-only">{social.name}</span>
              </a>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
