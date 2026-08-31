import { PROJECTS, GOOGLE_FORM_URL, OFFICIAL_EMAIL, OFFICIAL_PHONE, OFFICIAL_PHONE_DISPLAY, OFFICIAL_PORTFOLIO_URL, WHATSAPP_LINK } from '../../data/projects';
import { ProjectItem } from '../../types';

export interface ChatMessage {
  id: string;
  sender: 'assistant' | 'user';
  text: string;
  timestamp: Date;
  quickActions?: { label: string; action: string; payload?: any }[];
  projectCards?: ProjectItem[];
  actionButtons?: { label: string; url?: string; type: 'form' | 'whatsapp' | 'email' | 'portfolio' | 'action'; onClickPayload?: string }[];
  isTyping?: boolean;
}

export interface SessionContext {
  lastTopic?: 'services' | 'pricing' | 'portfolio' | 'founders' | 'social' | 'video' | 'contact' | 'lead_flow';
  businessType?: string;
  interestedService?: string;
  budgetRange?: string;
  timeline?: string;
  inLeadFlow?: boolean;
  leadFlowStep?: number;
}

// 5-Step Guided Project Enquiry Flow Options
export const LEAD_FLOW_STEPS = {
  STEP_1_BUSINESS: {
    question: "Let's plan your project! First, what type of business or venture do you have?",
    options: [
      "Healthcare / Clinic",
      "E-commerce / Retail Store",
      "Corporate / B2B Business",
      "Local Service / Trade",
      "Content Creator / Personal Brand",
      "Startup / Tech Project",
      "Other Business"
    ]
  },
  STEP_2_SERVICE: {
    question: "Great. Which service or combination are you interested in?",
    options: [
      "Website Development",
      "E-commerce / Shopify Store",
      "Branding & Visual Identity",
      "Social Media Handling",
      "Video Editing (Reels & Promo)",
      "SEO & Growth Optimization",
      "Multiple Services / Full Package"
    ]
  },
  STEP_3_BUDGET: {
    question: "What is your approximate budget for this project?",
    options: [
      "₹5,000 – ₹10,000 (Launch Tier)",
      "₹10,000 – ₹25,000 (Growth Tier)",
      "₹25,000 – ₹50,000 (Scale Tier)",
      "₹50,000+ (Custom Architecture)",
      "Not sure yet (Need Consultation)"
    ]
  },
  STEP_4_TIMELINE: {
    question: "What is your desired project timeline?",
    options: [
      "Immediate / ASAP (1–2 weeks)",
      "Standard (2–4 weeks)",
      "Within 1–2 months",
      "Flexible timeline"
    ]
  }
};

/**
 * Natural Language Query Processor & Knowledge Matcher
 * Uses strict ElevenLab Studio knowledge base with anti-hallucination bounds.
 */
export function processUserQuery(
  userInput: string,
  context: SessionContext
): {
  reply: string;
  quickActions?: { label: string; action: string; payload?: any }[];
  projectCards?: ProjectItem[];
  actionButtons?: { label: string; url?: string; type: 'form' | 'whatsapp' | 'email' | 'portfolio' | 'action'; onClickPayload?: string }[];
  updatedContext: SessionContext;
} {
  const query = userInput.trim().toLowerCase();
  const updatedContext = { ...context };

  // =========================================================================
  // 1. GUIDED LEAD FLOW HANDLER
  // =========================================================================
  if (context.inLeadFlow) {
    const step = context.leadFlowStep || 1;

    if (step === 1) {
      updatedContext.businessType = userInput;
      updatedContext.leadFlowStep = 2;
      return {
        reply: `Got it — ${userInput}. Now, which service would best fit your goals?`,
        quickActions: LEAD_FLOW_STEPS.STEP_2_SERVICE.options.map(opt => ({
          label: opt,
          action: 'lead_step_2',
          payload: opt
        })),
        updatedContext
      };
    } else if (step === 2) {
      updatedContext.interestedService = userInput;
      updatedContext.leadFlowStep = 3;
      return {
        reply: `Awesome choice (${userInput}). What is your approximate investment budget for this?`,
        quickActions: LEAD_FLOW_STEPS.STEP_3_BUDGET.options.map(opt => ({
          label: opt,
          action: 'lead_step_3',
          payload: opt
        })),
        updatedContext
      };
    } else if (step === 3) {
      updatedContext.budgetRange = userInput;
      updatedContext.leadFlowStep = 4;
      return {
        reply: `Understood (${userInput}). Lastly, what is your expected timeline?`,
        quickActions: LEAD_FLOW_STEPS.STEP_4_TIMELINE.options.map(opt => ({
          label: opt,
          action: 'lead_step_4',
          payload: opt
        })),
        updatedContext
      };
    } else if (step === 4) {
      updatedContext.timeline = userInput;
      updatedContext.inLeadFlow = false;
      updatedContext.leadFlowStep = 5;

      const summary = `
📋 **Project Brief Summary:**
• **Business Type:** ${updatedContext.businessType || 'Specified'}
• **Target Service:** ${updatedContext.interestedService || 'Specified'}
• **Budget:** ${updatedContext.budgetRange || 'Specified'}
• **Timeline:** ${updatedContext.timeline || 'Specified'}

You're ready to submit your project requirements! Our founding team will review your brief and connect within 24 hours.`;

      return {
        reply: summary,
        actionButtons: [
          { label: 'CONTINUE TO PROJECT FORM →', url: GOOGLE_FORM_URL, type: 'form' },
          { label: 'CHAT ON WHATSAPP →', url: `https://wa.me/919081777443?text=Hi%20ElevenLab%20Studio%2C%20I%20completed%20the%20project%20planner%20for%20a%20${encodeURIComponent(updatedContext.businessType || 'business')}%20(${encodeURIComponent(updatedContext.interestedService || 'project')}).`, type: 'whatsapp' }
        ],
        quickActions: [
          { label: 'SHOW YOUR WORK', action: 'show_portfolio' },
          { label: 'WHAT SERVICES DO YOU OFFER?', action: 'services_overview' },
          { label: 'ASK SOMETHING ELSE', action: 'reset_context' }
        ],
        updatedContext
      };
    }
  }

  // Trigger Guided Lead Planner directly
  if (
    query.includes('plan a project') ||
    query.includes('project planner') ||
    query.includes('guided enquiry') ||
    query.includes('start brief')
  ) {
    updatedContext.inLeadFlow = true;
    updatedContext.leadFlowStep = 1;
    return {
      reply: "Let's plan your project! What type of business or venture do you have?",
      quickActions: LEAD_FLOW_STEPS.STEP_1_BUSINESS.options.map(opt => ({
        label: opt,
        action: 'lead_step_1',
        payload: opt
      })),
      updatedContext
    };
  }

  // =========================================================================
  // 2. PRICING & STARTING OFFER (₹5,000)
  // =========================================================================
  if (
    query.includes('5000') ||
    query.includes('5,000') ||
    query.includes('price') ||
    query.includes('cost') ||
    query.includes('how much') ||
    query.includes('pricing') ||
    query.includes('rate') ||
    query.includes('package') ||
    query.includes('charge') ||
    query.includes('quote')
  ) {
    updatedContext.lastTopic = 'pricing';
    const isHealthcareContext = context.businessType?.toLowerCase().includes('clinic') || context.businessType?.toLowerCase().includes('dental') || context.interestedService?.toLowerCase().includes('clinic');

    let intro = "Website projects at ElevenLab Studio start from ₹5,000. The final price depends on the project's scope, custom functionality, and requirements.";
    if (isHealthcareContext) {
      intro = "For clinic and healthcare websites, projects at ElevenLab Studio start from ₹5,000, with specialized additions like patient appointment booking and doctor directories tailored to your clinic's scope.";
    }

    return {
      reply: `${intro}

🎁 **Current Launch Offer:**
• **1 Year Free Domain\*** OR **6 Months Free SEO\***
*(T&C apply. Domain & SEO offer subject to project scope and registrar availability)*

Every website includes high-speed performance, mobile responsiveness, and direct WhatsApp / lead inquiry routing.`,
      actionButtons: [
        { label: 'GET STARTED ON FORM →', url: GOOGLE_FORM_URL, type: 'form' },
        { label: 'DISCUSS PRICING ON WHATSAPP →', url: 'https://wa.me/919081777443?text=Hi%20ElevenLab%20Studio%2C%20I%20would%20like%20a%20price%20quote%20for%20my%20website%20project.', type: 'whatsapp' }
      ],
      quickActions: [
        { label: 'SHOW YOUR WORK', action: 'show_portfolio' },
        { label: 'WHAT SERVICES DO YOU OFFER?', action: 'services_overview' },
        { label: 'PLAN A PROJECT', action: 'plan_project' }
      ],
      updatedContext
    };
  }

  // =========================================================================
  // 3. HEALTHCARE / CLINIC / DENTAL / DOCTOR PROJECTS
  // =========================================================================
  if (
    query.includes('clinic') ||
    query.includes('doctor') ||
    query.includes('dental') ||
    query.includes('hospital') ||
    query.includes('skin') ||
    query.includes('hair') ||
    query.includes('healthcare') ||
    query.includes('medical')
  ) {
    updatedContext.lastTopic = 'portfolio';
    updatedContext.businessType = 'Healthcare / Clinic';

    const clinicProjects = PROJECTS.filter(p => p.filterCategory === 'HEALTHCARE');

    return {
      reply: "Here are our specialized healthcare and medical clinic projects with active live demos. Each includes patient-friendly navigation, doctor credentials, and streamlined appointment flows:",
      projectCards: clinicProjects,
      actionButtons: [
        { label: 'BUILD CLINIC WEBSITE →', url: GOOGLE_FORM_URL, type: 'form' },
        { label: 'CONSULT ON WHATSAPP →', url: 'https://wa.me/919081777443?text=Hi%20ElevenLab%20Studio%2C%20I%20need%20a%20modern%20website%20for%20my%20clinic.', type: 'whatsapp' }
      ],
      quickActions: [
        { label: 'WEBSITE FROM ₹5,000?', action: 'pricing_info' },
        { label: 'VIEW ALL PROJECTS', action: 'show_portfolio' },
        { label: 'PLAN A PROJECT', action: 'plan_project' }
      ],
      updatedContext
    };
  }

  // =========================================================================
  // 4. E-COMMERCE / SHOPIFY / ONLINE STORE
  // =========================================================================
  if (
    query.includes('shopify') ||
    query.includes('ecommerce') ||
    query.includes('e-commerce') ||
    query.includes('online store') ||
    query.includes('sell online') ||
    query.includes('clothing') ||
    query.includes('product store') ||
    query.includes('electronics')
  ) {
    updatedContext.lastTopic = 'services';
    updatedContext.interestedService = 'E-commerce / Shopify';

    const ecomProjects = PROJECTS.filter(p => p.filterCategory === 'E-COMMERCE' || p.id === 'electroworld');

    return {
      reply: "An e-commerce or Shopify store is the perfect solution for selling online. We engineer modern store architectures with high-converting product pages, seamless checkout flows, mobile-first design, and payment gateway integration.",
      projectCards: ecomProjects,
      actionButtons: [
        { label: 'START E-COMMERCE PROJECT →', url: GOOGLE_FORM_URL, type: 'form' },
        { label: 'TALK SHOPIFY ON WHATSAPP →', url: 'https://wa.me/919081777443?text=Hi%20ElevenLab%20Studio%2C%20I%20want%20to%20build%20an%20e-commerce%20/%20Shopify%20store.', type: 'whatsapp' }
      ],
      quickActions: [
        { label: 'WEBSITE FROM ₹5,000?', action: 'pricing_info' },
        { label: 'SHOW YOUR WORK', action: 'show_portfolio' },
        { label: 'PLAN A PROJECT', action: 'plan_project' }
      ],
      updatedContext
    };
  }

  // =========================================================================
  // 5. SOCIAL MEDIA HANDLING
  // =========================================================================
  if (
    query.includes('social media') ||
    query.includes('instagram') ||
    query.includes('manage instagram') ||
    query.includes('post design') ||
    query.includes('content calendar') ||
    query.includes('social handling') ||
    query.includes('social management')
  ) {
    updatedContext.lastTopic = 'social';
    updatedContext.interestedService = 'Social Media Handling';

    return {
      reply: `For Social Media Handling, ElevenLab Studio provides structured, professional brand growth:

• **Content Strategy & Planning:** Monthly content pillars & theme roadmaps
• **High-Impact Post Design:** Custom carousel slides, graphic posts, & brand graphics
• **Reels & Video Snippets:** Engaging short-form video edits
• **Captions & Hashtags:** Conversion-focused copywriting
• **Scheduling & Page Management:** Systematic publishing and layout curation

*(Note: We focus on authentic creative quality and consistency. We do not make false guarantees of overnight virality or instant follower counts.)*`,
      actionButtons: [
        { label: 'MANAGE MY SOCIALS →', url: GOOGLE_FORM_URL, type: 'form' },
        { label: 'CHAT ON WHATSAPP →', url: 'https://wa.me/919081777443?text=Hi%20ElevenLab%20Studio%2C%20I%20am%20interested%20in%20Social%20Media%20Handling%20for%20my%20brand.', type: 'whatsapp' }
      ],
      quickActions: [
        { label: 'VIDEO EDITING SERVICES', action: 'video_editing' },
        { label: 'WHAT SERVICES DO YOU OFFER?', action: 'services_overview' },
        { label: 'PLAN A PROJECT', action: 'plan_project' }
      ],
      updatedContext
    };
  }

  // =========================================================================
  // 6. VIDEO EDITING / REELS / SHORTS
  // =========================================================================
  if (
    query.includes('video') ||
    query.includes('reel') ||
    query.includes('short') ||
    query.includes('edit my video') ||
    query.includes('motion graphic') ||
    query.includes('promo video') ||
    query.includes('youtube')
  ) {
    updatedContext.lastTopic = 'video';
    updatedContext.interestedService = 'Video Editing';

    return {
      reply: `ElevenLab Studio produces cinematic, fast-paced short-form and promotional video edits:

• **Instagram Reels & YouTube Shorts:** Hook-driven pacing & retention rhythm
• **Promotional & Product Videos:** Showcasing products with kinetic energy
• **Brand Videos & Explainer Content:** High-clarity messaging
• **Dynamic Captions & Typography:** Modern animated on-screen subtitles
• **Motion Graphics & Transitions:** Custom glitch, zoom, and spatial motion
• **Color Correction & Audio Polish:** Studio-grade grading, sound FX, & voice enhancement`,
      actionButtons: [
        { label: 'EDIT MY VIDEO →', url: GOOGLE_FORM_URL, type: 'form' },
        { label: 'SEND VIDEO BRIEF ON WHATSAPP →', url: 'https://wa.me/919081777443?text=Hi%20ElevenLab%20Studio%2C%20I%20need%20professional%20video%20editing%20for%20reels/promos.', type: 'whatsapp' }
      ],
      quickActions: [
        { label: 'SOCIAL MEDIA HANDLING', action: 'social_media' },
        { label: 'SHOW YOUR WORK', action: 'show_portfolio' },
        { label: 'PLAN A PROJECT', action: 'plan_project' }
      ],
      updatedContext
    };
  }

  // =========================================================================
  // 7. CLEANING / LOCAL SERVICE BUSINESS
  // =========================================================================
  if (
    query.includes('cleaning') ||
    query.includes('local business') ||
    query.includes('service business') ||
    query.includes('trade')
  ) {
    updatedContext.lastTopic = 'portfolio';
    const cleaningProject = PROJECTS.filter(p => p.id === 'kp-cleaning-service');

    return {
      reply: "For local and commercial service businesses, we design conversion-driven websites with instant booking forms and transparent service listings. Take a look at KP Cleaning Service:",
      projectCards: cleaningProject,
      actionButtons: [
        { label: 'START SERVICE WEBSITE →', url: GOOGLE_FORM_URL, type: 'form' },
        { label: 'CHAT ON WHATSAPP →', url: 'https://wa.me/919081777443?text=Hi%20ElevenLab%20Studio%2C%20I%20need%20a%20service%20business%20website.', type: 'whatsapp' }
      ],
      quickActions: [
        { label: 'WEBSITE FROM ₹5,000?', action: 'pricing_info' },
        { label: 'SHOW YOUR WORK', action: 'show_portfolio' }
      ],
      updatedContext
    };
  }

  // =========================================================================
  // 8. GENERAL PORTFOLIO / WORK / DEMOS
  // =========================================================================
  if (
    query.includes('work') ||
    query.includes('project') ||
    query.includes('portfolio') ||
    query.includes('demo') ||
    query.includes('sample') ||
    query.includes('examples') ||
    query.includes('see websites') ||
    query.includes('show your work')
  ) {
    updatedContext.lastTopic = 'portfolio';

    return {
      reply: "Here is a curated selection of our live client projects across healthcare, e-commerce, service businesses, and modern brand platforms. You can click any project to view its real live demo:",
      projectCards: PROJECTS.slice(0, 4),
      actionButtons: [
        { label: 'VIEW FULL PORTFOLIO →', url: OFFICIAL_PORTFOLIO_URL, type: 'portfolio' },
        { label: 'START A PROJECT →', url: GOOGLE_FORM_URL, type: 'form' }
      ],
      quickActions: [
        { label: 'SEE CLINIC PROJECTS', action: 'show_clinic_projects' },
        { label: 'SEE E-COMMERCE DEMO', action: 'show_ecom_projects' },
        { label: 'WEBSITE FROM ₹5,000?', action: 'pricing_info' },
        { label: 'PLAN A PROJECT', action: 'plan_project' }
      ],
      updatedContext
    };
  }

  // =========================================================================
  // 9. SERVICES OVERVIEW
  // =========================================================================
  if (
    query.includes('service') ||
    query.includes('what do you do') ||
    query.includes('offer') ||
    query.includes('what can you do') ||
    query.includes('capabilities') ||
    query.includes('what services')
  ) {
    updatedContext.lastTopic = 'services';

    return {
      reply: `ElevenLab Studio is a modern digital agency offering end-to-end digital services:

1. **Website Development** (Custom React, high-speed, mobile-responsive)
2. **E-commerce & Shopify** (Stores engineered for sales conversion)
3. **UI/UX & Web Design** (Sleek prototypes and isometric experiences)
4. **Branding & Logo Design** (Distinct visual identities & assets)
5. **Social Media Handling** (Curated posts, captions & monthly calendars)
6. **Video Editing** (Instagram Reels, YouTube Shorts & brand promos)
7. **SEO & Growth** (Rankings, speed optimization & search visibility)
8. **Custom AI & Digital Solutions** (Automations & interactive components)`,
      actionButtons: [
        { label: 'START A PROJECT →', url: GOOGLE_FORM_URL, type: 'form' },
        { label: 'CONSULT ON WHATSAPP →', url: 'https://wa.me/919081777443?text=Hi%20ElevenLab%20Studio%2C%20I%20would%20like%20to%20explore%20your%20services.', type: 'whatsapp' }
      ],
      quickActions: [
        { label: 'SHOW YOUR WORK', action: 'show_portfolio' },
        { label: 'WEBSITE FROM ₹5,000?', action: 'pricing_info' },
        { label: 'SOCIAL MEDIA HANDLING', action: 'social_media' },
        { label: 'VIDEO EDITING', action: 'video_editing' },
        { label: 'PLAN A PROJECT', action: 'plan_project' }
      ],
      updatedContext
    };
  }

  // =========================================================================
  // 10. FOUNDERS / TEAM
  // =========================================================================
  if (
    query.includes('founder') ||
    query.includes('team') ||
    query.includes('who are you') ||
    query.includes('who runs') ||
    query.includes('pavitra') ||
    query.includes('manthan') ||
    query.includes('harsh') ||
    query.includes('owner')
  ) {
    updatedContext.lastTopic = 'founders';

    return {
      reply: `ElevenLab Studio is driven by its founding leadership team:

• **Pavitra** — Founder (Leading digital architecture, creative strategy, and engineering)
• **Manthan** — Founder (Directing operational growth, client strategy, and project execution)
• **Harsh** — Co-Founder (Managing technical implementation, system workflows, and delivery)

We work closely and directly with each client to ensure high standards and rapid turnaround.`,
      actionButtons: [
        { label: 'TALK WITH FOUNDERS ON WHATSAPP →', url: WHATSAPP_LINK, type: 'whatsapp' },
        { label: 'START A PROJECT →', url: GOOGLE_FORM_URL, type: 'form' }
      ],
      quickActions: [
        { label: 'SHOW YOUR WORK', action: 'show_portfolio' },
        { label: 'WHAT SERVICES DO YOU OFFER?', action: 'services_overview' },
        { label: 'WEBSITE FROM ₹5,000?', action: 'pricing_info' }
      ],
      updatedContext
    };
  }

  // =========================================================================
  // 11. CONTACT / EMAIL / PHONE / WHATSAPP / FORM
  // =========================================================================
  if (
    query.includes('contact') ||
    query.includes('email') ||
    query.includes('phone') ||
    query.includes('whatsapp') ||
    query.includes('call') ||
    query.includes('touch') ||
    query.includes('reach') ||
    query.includes('hire') ||
    query.includes('start') ||
    query.includes('form')
  ) {
    updatedContext.lastTopic = 'contact';

    return {
      reply: `You can reach ElevenLab Studio directly through any of these official channels:

• **Google Enquiry Form:** [Official Project Brief](${GOOGLE_FORM_URL})
• **WhatsApp:** [${OFFICIAL_PHONE_DISPLAY}](${WHATSAPP_LINK})
• **Email:** [${OFFICIAL_EMAIL}](mailto:${OFFICIAL_EMAIL})
• **Portfolio:** [kakadiyapavitra53-eng.github.io/Portfolio](${OFFICIAL_PORTFOLIO_URL})`,
      actionButtons: [
        { label: 'START A PROJECT (FORM) →', url: GOOGLE_FORM_URL, type: 'form' },
        { label: 'CHAT ON WHATSAPP →', url: WHATSAPP_LINK, type: 'whatsapp' },
        { label: 'EMAIL US →', url: `mailto:${OFFICIAL_EMAIL}`, type: 'email' }
      ],
      quickActions: [
        { label: 'PLAN A PROJECT', action: 'plan_project' },
        { label: 'SHOW YOUR WORK', action: 'show_portfolio' },
        { label: 'WEBSITE FROM ₹5,000?', action: 'pricing_info' }
      ],
      updatedContext
    };
  }

  // =========================================================================
  // 12. HIGH BUYING INTENT CATCHER
  // =========================================================================
  if (
    query.includes('i want a website') ||
    query.includes('i need a website') ||
    query.includes('i want to start') ||
    query.includes('build my site') ||
    query.includes('let us work') ||
    query.includes('interested in buying')
  ) {
    return {
      reply: "Awesome! We'd love to bring your vision to life. You can submit your requirements directly through our official project form or chat with our founders right now on WhatsApp to get started immediately.",
      actionButtons: [
        { label: 'START A PROJECT →', url: GOOGLE_FORM_URL, type: 'form' },
        { label: 'CHAT ON WHATSAPP →', url: 'https://wa.me/919081777443?text=Hi%20ElevenLab%20Studio%2C%20I%20want%20to%20start%20a%20new%20website%20project.', type: 'whatsapp' }
      ],
      quickActions: [
        { label: 'PLAN A PROJECT FIRST', action: 'plan_project' },
        { label: 'WEBSITE FROM ₹5,000?', action: 'pricing_info' },
        { label: 'SHOW YOUR WORK', action: 'show_portfolio' }
      ],
      updatedContext
    };
  }

  // =========================================================================
  // 13. AI FALLBACK & ANTI-HALLUCINATION
  // =========================================================================
  return {
    reply: "I don't have enough verified information to answer that question accurately. You can contact ElevenLab Studio directly via WhatsApp or Email, or submit your project details, and our founding team will assist you personally!",
    actionButtons: [
      { label: 'CHAT ON WHATSAPP →', url: WHATSAPP_LINK, type: 'whatsapp' },
      { label: 'EMAIL US →', url: `mailto:${OFFICIAL_EMAIL}`, type: 'email' },
      { label: 'START A PROJECT (FORM) →', url: GOOGLE_FORM_URL, type: 'form' }
    ],
    quickActions: [
      { label: 'WHAT SERVICES DO YOU OFFER?', action: 'services_overview' },
      { label: 'SHOW YOUR WORK', action: 'show_portfolio' },
      { label: 'WEBSITE FROM ₹5,000?', action: 'pricing_info' },
      { label: 'PLAN A PROJECT', action: 'plan_project' }
    ],
    updatedContext
  };
}
