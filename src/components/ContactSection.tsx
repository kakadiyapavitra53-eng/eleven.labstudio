import React, { useState } from 'react';
import {
  GOOGLE_FORM_URL,
  OFFICIAL_EMAIL,
  OFFICIAL_PHONE_DISPLAY,
  WHATSAPP_LINK
} from '../data/projects';
import {
  Mail,
  MessageSquare,
  ArrowUpRight,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Copy,
  Check,
  Phone,
  Send,
  Layers
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    serviceRequired: 'Website Development',
    budget: '₹5,000 - ₹15,000',
    projectDetails: ''
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(OFFICIAL_EMAIL);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('+919081777443');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleLaunchGoogleForm = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(GOOGLE_FORM_URL, '_blank', 'noopener,noreferrer');
  };

  const handleLaunchWhatsApp = () => {
    const text = `Hi ElevenLab Studio, my name is ${formData.name || 'Client'}${formData.businessName ? ` from ${formData.businessName}` : ''}. I am looking for ${formData.serviceRequired} with a budget of ${formData.budget}. Details: ${formData.projectDetails || 'Let discuss my website requirements.'}`;
    window.open(`https://wa.me/919081777443?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="py-24 bg-[#080808] relative border-t border-[#1C1C1C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Headline */}
        <div className="max-w-4xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#4D9FFF] uppercase tracking-widest mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>START A PROJECT</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.08] mb-6">
            LET'S BUILD SOMETHING.
          </h2>
          <p className="text-lg sm:text-xl text-[#A1A1A1] max-w-2xl font-normal leading-relaxed">
            Your business deserves a better digital presence. Websites, e-commerce, branding, social media, and video crafted to help you stand out.
          </p>

          {/* Quick Direct Buttons */}
          <div className="flex flex-wrap items-center gap-4 mt-8">
            <a
              id="final-start-project-cta"
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#4D9FFF] hover:bg-[#3d8de6] text-[#080808] font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-xl shadow-lg shadow-[#4D9FFF]/20 transition-all duration-200"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <a
              id="final-whatsapp-cta"
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#161616] hover:bg-[#202020] text-white font-semibold text-sm px-6 py-4 rounded-xl border border-[#2E2E2E] hover:border-emerald-500/40 transition-all duration-200"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>CHAT ON WHATSAPP</span>
            </a>
          </div>
        </div>

        {/* Project Intake & Contact Channels Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Fast Project Inquiry Builder */}
          <div className="lg:col-span-7 p-7 sm:p-9 rounded-2xl bg-[#111111] border border-[#242424] shadow-xl">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#202020]">
              <div>
                <span className="text-xs font-mono font-bold text-[#4D9FFF] uppercase tracking-wider">
                  OFFICIAL PROJECT ENQUIRY
                </span>
                <h3 className="text-xl font-bold text-white tracking-tight mt-1">
                  Tell Us About Your Goals
                </h3>
              </div>
              <span className="text-[11px] text-[#888888] font-mono">
                Direct Intake Relay
              </span>
            </div>

            <form onSubmit={handleLaunchGoogleForm} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#CCCCCC] uppercase tracking-wider mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full bg-[#181818] border border-[#2E2E2E] focus:border-[#4D9FFF] focus:outline-none rounded-xl px-4 py-3 text-sm text-white placeholder-[#555555] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#CCCCCC] uppercase tracking-wider mb-2">
                    Business / Brand Name
                  </label>
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    placeholder="e.g. Apex Studio"
                    className="w-full bg-[#181818] border border-[#2E2E2E] focus:border-[#4D9FFF] focus:outline-none rounded-xl px-4 py-3 text-sm text-white placeholder-[#555555] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#CCCCCC] uppercase tracking-wider mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@business.com"
                    className="w-full bg-[#181818] border border-[#2E2E2E] focus:border-[#4D9FFF] focus:outline-none rounded-xl px-4 py-3 text-sm text-white placeholder-[#555555] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#CCCCCC] uppercase tracking-wider mb-2">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#181818] border border-[#2E2E2E] focus:border-[#4D9FFF] focus:outline-none rounded-xl px-4 py-3 text-sm text-white placeholder-[#555555] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#CCCCCC] uppercase tracking-wider mb-2">
                    Service Required
                  </label>
                  <select
                    value={formData.serviceRequired}
                    onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
                    className="w-full bg-[#181818] border border-[#2E2E2E] focus:border-[#4D9FFF] focus:outline-none rounded-xl px-4 py-3 text-sm text-white transition-colors"
                  >
                    <option value="Website Development">Website Development (From ₹5,000)</option>
                    <option value="E-commerce Store">E-commerce Store</option>
                    <option value="Shopify Store">Shopify Store</option>
                    <option value="Branding & Design">Branding & Design</option>
                    <option value="Social Media Handling">Social Media Handling</option>
                    <option value="Video Editing">Video Editing (Reels & Shorts)</option>
                    <option value="SEO & Digital Growth">SEO & Digital Growth</option>
                    <option value="Custom Digital Solution">Custom Digital Solution</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#CCCCCC] uppercase tracking-wider mb-2">
                    Estimated Budget
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full bg-[#181818] border border-[#2E2E2E] focus:border-[#4D9FFF] focus:outline-none rounded-xl px-4 py-3 text-sm text-white transition-colors"
                  >
                    <option value="₹5,000 - ₹15,000">₹5,000 - ₹15,000 (Starter Website)</option>
                    <option value="₹15,000 - ₹35,000">₹15,000 - ₹35,000 (Growth Business)</option>
                    <option value="₹35,000+">₹35,000+ (Custom / Advanced)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#CCCCCC] uppercase tracking-wider mb-2">
                  Project Details
                </label>
                <textarea
                  rows={3}
                  value={formData.projectDetails}
                  onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                  placeholder="Share a few lines about what you'd like to build..."
                  className="w-full bg-[#181818] border border-[#2E2E2E] focus:border-[#4D9FFF] focus:outline-none rounded-xl px-4 py-3 text-sm text-white placeholder-[#555555] transition-colors resize-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  id="submit-google-form-btn"
                  className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-[#4D9FFF] hover:bg-[#3d8de6] text-[#080808] font-bold text-xs uppercase tracking-wider py-4 rounded-xl transition-all duration-200 shadow-md cursor-pointer"
                >
                  <span>SEND PROJECT REQUEST (GOOGLE FORM)</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleLaunchWhatsApp}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#1C1C1C] hover:bg-[#252525] text-emerald-400 font-bold text-xs uppercase tracking-wider py-4 px-5 rounded-xl border border-[#2E2E2E] transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>SEND VIA WHATSAPP</span>
                </button>
              </div>

              <p className="text-[11px] text-[#777777] text-center pt-2">
                Submissions open our verified intake form &bull; Average response within 2 hours
              </p>
            </form>
          </div>

          {/* Contact Direct Cards with Copy Feedback */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Email Card with Copy Feature */}
            <div className="p-6 rounded-2xl bg-[#111111] border border-[#242424]">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#4D9FFF]/10 text-[#4D9FFF]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#888888] uppercase tracking-wider">
                      Official Email
                    </span>
                    <div className="text-sm font-bold text-white">
                      {OFFICIAL_EMAIL}
                    </div>
                  </div>
                </div>

                <button
                  id="copy-email-btn"
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-[#181818] hover:bg-[#222222] text-[#A1A1A1] hover:text-white border border-[#282828] transition-colors"
                  title="Copy email address"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#1C1C1C]">
                <a
                  id="email-us-btn"
                  href={`mailto:${OFFICIAL_EMAIL}`}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#4D9FFF] hover:underline uppercase tracking-wider"
                >
                  <span>EMAIL US DIRECTLY</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>

                {copiedEmail && (
                  <span className="text-xs text-emerald-400 font-semibold animate-in fade-in">
                    Copied ✓
                  </span>
                )}
              </div>
            </div>

            {/* WhatsApp Card with Copy Feature */}
            <div className="p-6 rounded-2xl bg-[#111111] border border-[#242424]">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#888888] uppercase tracking-wider">
                      Direct WhatsApp
                    </span>
                    <div className="text-sm font-bold text-white">
                      {OFFICIAL_PHONE_DISPLAY}
                    </div>
                  </div>
                </div>

                <button
                  id="copy-phone-btn"
                  onClick={handleCopyPhone}
                  className="p-2 rounded-lg bg-[#181818] hover:bg-[#222222] text-[#A1A1A1] hover:text-white border border-[#282828] transition-colors"
                  title="Copy phone number"
                >
                  {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#1C1C1C]">
                <a
                  id="contact-whatsapp-btn"
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 hover:underline uppercase tracking-wider"
                >
                  <span>CHAT ON WHATSAPP</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>

                {copiedPhone && (
                  <span className="text-xs text-emerald-400 font-semibold animate-in fade-in">
                    Copied ✓
                  </span>
                )}
              </div>
            </div>

            {/* Rapid Response & Founder Direct Attention */}
            <div className="p-6 rounded-2xl bg-[#131313] border border-[#222222]">
              <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider mb-2">
                <CheckCircle2 className="w-4 h-4 text-[#4D9FFF]" />
                <span>FOUNDER DIRECT ATTENTION</span>
              </div>
              <p className="text-xs text-[#A1A1A1] leading-relaxed">
                We accept select client projects each month to guarantee direct founder attention, top-tier design craft, and swift turnaround without account managers or middlemen.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
