import React, { useState } from 'react';
import { WHATSAPP_LINK } from '../data/projects';
import { X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5">
      {/* Subtle Desktop Hover / Info Tooltip */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#141414] border border-[#2E2E2E] text-xs text-white shadow-2xl animate-in fade-in slide-in-from-right-2 duration-200">
          <span className="font-medium text-[#E5E5E5]">Chat directly on WhatsApp with our founders</span>
          <button
            onClick={() => setShowTooltip(false)}
            aria-label="Close tooltip"
            className="text-[#888888] hover:text-white ml-1 cursor-pointer"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Official WhatsApp Floating Action Button */}
      <a
        id="floating-whatsapp-btn"
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        aria-label="Chat with ElevenLab Studio on WhatsApp"
        title="Chat with ElevenLab Studio on WhatsApp (+91 90817 77443)"
        className="group relative flex items-center gap-2.5 px-3.5 sm:px-4 h-13 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-black font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-[#25D366]/30 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#25D366]/60"
      >
        {/* Official WhatsApp Logo Icon */}
        <svg
          className="w-6 h-6 shrink-0 fill-black transition-transform group-hover:scale-110"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.53 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.72 4.31 3.81.6.26 1.07.42 1.44.54.61.19 1.16.16 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.3" />
        </svg>

        {/* WhatsApp Label (Visible on Desktop / Responsive) */}
        <span className="hidden sm:inline font-bold tracking-tight text-black select-none">
          WhatsApp
        </span>

        {/* Pulsing ring */}
        <span
          className="absolute -inset-1 rounded-full bg-[#25D366] opacity-25 group-hover:opacity-40 animate-ping pointer-events-none"
          style={{ animationDuration: '3s' }}
        />
      </a>
    </div>
  );
};

