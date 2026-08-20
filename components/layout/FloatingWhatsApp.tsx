import React from "react";
import { ACELO_WHATSAPP_NUMBER } from "@/lib/booking";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";

interface FloatingWhatsAppProps {
  message?: string;
}

export function FloatingWhatsApp({
  message = "Hello Acelo Logistics HQ, I would like to make an inquiry.",
}: FloatingWhatsAppProps) {
  const whatsappUrl = `https://wa.me/${ACELO_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  return (
    <aside aria-label="Quick contact via WhatsApp">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Message Acelo HQ on WhatsApp"
        className="group fixed bottom-6 right-6 z-50 flex items-center gap-3"
      >
        {/* Hover Label Badge */}
        <span className="pointer-events-none hidden translate-x-2 rounded-full bg-ink/90 px-3.5 py-1.5 text-[13px] font-semibold text-white shadow-lg backdrop-blur-md opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:inline-block">
          Message Acelo HQ
        </span>

        {/* Floating Action Button */}
        <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-2xl transition-all duration-300 group-hover:scale-110 group-active:scale-95">
          {/* Subtle pulse ring animation */}
          <span className="absolute -inset-1 -z-10 rounded-full bg-whatsapp/40 animate-ping" />

          <WhatsAppIcon className="h-7 w-7" />
        </div>
      </a>
    </aside>
  );
}
