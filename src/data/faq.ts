export interface FaqItem {
  question: string;
  answer: string;
  category: 'General' | 'Pricing' | 'Services' | 'Process';
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'What services do you provide at ElevenLab Studio?',
    answer: 'We provide end-to-end digital solutions including Website Development, E-commerce & Shopify Store creation, Branding & Identity Design, Social Media Management, Video Editing (Reels, Shorts, Promo Videos), SEO & Digital Growth, and Custom Digital Solutions.',
    category: 'Services'
  },
  {
    question: 'How much does a website start from?',
    answer: 'Our professional website packages start from ₹5,000+. This starting tier covers high-performance, mobile-first business websites. Custom requirements, advanced e-commerce integrations, multi-page platforms, or bespoke portals are quoted transparently based on project scope.',
    category: 'Pricing'
  },
  {
    question: 'How does the project process work?',
    answer: 'We follow a clear 4-step framework: 01 DISCOVER (understanding your goals and audience), 02 DESIGN (crafting UI/UX wireframes and visual identity), 03 BUILD (full-stack clean development), and 04 LAUNCH (testing, speed optimization, and going live).',
    category: 'Process'
  },
  {
    question: 'Do you provide ongoing social media handling?',
    answer: 'Yes! We handle monthly content strategy, graphic post design, Instagram Reels, story layouts, caption writing, hashtag curation, and structured calendar scheduling to keep your brand active and professional.',
    category: 'Services'
  },
  {
    question: 'Do you edit videos for Reels, Shorts, and business promos?',
    answer: 'Yes. We specialize in fast-paced Reels and YouTube Shorts, promotional brand videos, product showcases, and event videos featuring animated captions, sound design, jump-cut pacing, and cinematic color grading.',
    category: 'Services'
  },
  {
    question: 'Do you build Shopify stores and e-commerce websites?',
    answer: 'Yes. We design and build high-converting Shopify stores and custom e-commerce platforms complete with product catalogs, secure payment gateway integrations, mobile-optimized checkout, and order tracking flows.',
    category: 'Services'
  },
  {
    question: 'What is included in the Special Launch Offer?',
    answer: 'Our current launch offer includes either 1 Year Free Domain (top-level domain registration with annual website setup) or 6 Months Free SEO (on-page optimization, site hierarchy, and search engine indexing setup). You can select your preferred option when submitting your project inquiry.',
    category: 'Pricing'
  },
  {
    question: 'How do I start a project with ElevenLab Studio?',
    answer: 'You can start immediately by clicking "Start a Project" to complete our quick official Google Form inquiry, messaging us directly on WhatsApp at +91 9081777443, or emailing us at elevenlabs.studio2026@gmail.com.',
    category: 'General'
  }
];
