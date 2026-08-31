export interface LegalDoc {
  id: string;
  title: string;
  lastUpdated: string;
  summary: string;
  sections: {
    number?: string;
    title: string;
    paragraphs: string[];
  }[];
}

export const TERMS_AND_CONDITIONS: LegalDoc = {
  id: 'terms-and-conditions',
  title: 'Terms & Conditions',
  lastUpdated: 'February 2026',
  summary: 'Please read these terms and conditions carefully before contracting or utilizing services provided by ElevenLab Studio. These terms outline our mutual expectations and operational framework.',
  sections: [
    {
      number: '01',
      title: 'Introduction',
      paragraphs: [
        'Welcome to ElevenLab Studio ("we", "us", "our", or "the Agency"). By commissioning work, agreeing to a project proposal, or utilizing our services, you ("the Client") agree to be bound by these Terms and Conditions.',
        'These terms represent a general operational standard. Clients are advised that this document does not constitute formal legal advice, and parties may seek independent legal counsel for specific agreements.'
      ]
    },
    {
      number: '02',
      title: 'Services',
      paragraphs: [
        'ElevenLab Studio provides digital services including, but not limited to, website design and development, e-commerce stores, Shopify setup, branding and graphic design, search engine optimization (SEO), and custom digital solutions.',
        'Specific deliverables for any engagement are defined in the mutually agreed project proposal or project brief.'
      ]
    },
    {
      number: '03',
      title: 'Project Scope',
      paragraphs: [
        'Every project is governed by the agreed initial project scope. Any feature, revision, integration, or page request outside the agreed scope will be treated as an out-of-scope addition.',
        'Out-of-scope requests will be quoted separately and may adjust the estimated delivery timeline.'
      ]
    },
    {
      number: '04',
      title: 'Client Responsibilities',
      paragraphs: [
        'The Client agrees to provide required project assets, text copy, images, credentials, branding guidelines, and feedback in a timely manner.',
        'Delays in asset provision or milestone feedback directly impact delivery schedules and ElevenLab Studio is not liable for timeline extensions caused by client delays.'
      ]
    },
    {
      number: '05',
      title: 'Project Timeline',
      paragraphs: [
        'Timeline estimates provided by ElevenLab Studio are good-faith operational guidelines based on prompt client responses and standard workflow conditions.',
        'Timelines commence only after receipt of initial deposit and receipt of all critical briefing materials.'
      ]
    },
    {
      number: '06',
      title: 'Pricing & Payments',
      paragraphs: [
        'Standard website packages start from ₹5,000 as indicated on our promotional materials, with exact quotes determined by scope and feature complexity.',
        'Unless otherwise specified in a formal quote, an initial advance deposit is required to initiate work. The final milestone balance must be settled prior to final domain handover or live credentials transfer.'
      ]
    },
    {
      number: '07',
      title: 'Revisions',
      paragraphs: [
        'Each project package includes a designated number of revision rounds during the design and staging phases.',
        'Revisions refer to modifications within the agreed scope. Comprehensive structural redesigns or conceptual overhauls requested after design approval will be quoted additionally.'
      ]
    },
    {
      number: '08',
      title: 'Content & Materials',
      paragraphs: [
        'The Client warrants that all text, imagery, logos, trademarks, and media supplied to ElevenLab Studio are owned by the Client or appropriately licensed.',
        'ElevenLab Studio is not responsible for copyright infringements arising from client-provided assets.'
      ]
    },
    {
      number: '09',
      title: 'Domain & Hosting',
      paragraphs: [
        'Where promotional packages include domain registration (e.g. 1 Year Free Domain*), standard top-level domain extensions (.com, .in, .org subject to registrar availability) apply as agreed.',
        'Hosting renewal fees, recurring third-party domain renewals, and cloud infrastructure costs after promotional periods are the ongoing responsibility of the Client.'
      ]
    },
    {
      number: '10',
      title: 'Website Ownership & Intellectual Property',
      paragraphs: [
        'Upon receipt of full and final payment, intellectual property rights for custom design assets and custom code created specifically for the project transfer to the Client.',
        'ElevenLab Studio retains the right to display project mockups, screenshots, and live demo links in our portfolio and marketing materials unless a written Non-Disclosure Agreement (NDA) specifically restricts public showcase.'
      ]
    },
    {
      number: '11',
      title: 'Third-Party Services',
      paragraphs: [
        'ElevenLab Studio may integrate third-party tools, payment gateways (Razorpay, Stripe, etc.), Shopify apps, plugins, hosting providers, or external APIs.',
        'We do not control third-party service uptime, policy changes, pricing changes, or platform deprecations.'
      ]
    },
    {
      number: '12',
      title: 'SEO Disclaimer',
      paragraphs: [
        'Where SEO services or promotions are included, ElevenLab Studio implements standard on-page technical optimization and best practices.',
        'We do not and cannot guarantee specific numerical Google ranking positions, organic traffic numbers, or sales metrics, as search engine algorithms and market competition are outside direct control.'
      ]
    },
    {
      number: '13',
      title: 'Website Maintenance',
      paragraphs: [
        'Post-launch warranty covers functional bug fixes within the first 14 days following launch. Ongoing regular maintenance, software updates, and backups are provided under separate maintenance agreements.'
      ]
    },
    {
      number: '14',
      title: 'Cancellation',
      paragraphs: [
        'Either party may terminate a project with written notice. Cancellation terms and financial adjustments follow the provisions set forth in our Refund & Cancellation Policy.'
      ]
    },
    {
      number: '15',
      title: 'Refunds',
      paragraphs: [
        'Refund eligibility is determined based on milestones reached and work already completed. Please refer directly to our Refund Policy for specific criteria.'
      ]
    },
    {
      number: '16',
      title: 'Limitation of Liability',
      paragraphs: [
        'To the maximum extent permitted by applicable law, ElevenLab Studio shall not be liable for indirect, incidental, special, or consequential damages, lost profits, or business interruption resulting from the use or inability to use the website.',
        'In any event, our aggregate liability is limited to the total monetary amount actually paid by the Client to ElevenLab Studio for the specific service in dispute.'
      ]
    },
    {
      number: '17',
      title: 'Confidentiality',
      paragraphs: [
        'Both parties agree to treat proprietary business information, customer records, and confidential technical materials shared during the engagement with strict professional care.'
      ]
    },
    {
      number: '18',
      title: 'Changes to Terms',
      paragraphs: [
        'ElevenLab Studio reserves the right to modify these Terms & Conditions periodically. Updated terms will be posted on this website with the revised date.'
      ]
    },
    {
      number: '19',
      title: 'Governing Law',
      paragraphs: [
        'These terms shall be governed by and construed in accordance with the laws of India, and any disputes shall be subject to the exclusive jurisdiction of the competent courts in Gujarat, India.'
      ]
    },
    {
      number: '20',
      title: 'Contact Information',
      paragraphs: [
        'For questions regarding these Terms & Conditions, please contact us at elevenlabs.studio2026@gmail.com or via WhatsApp at +91 90817 77443.'
      ]
    }
  ]
};

export const PRIVACY_POLICY: LegalDoc = {
  id: 'privacy-policy',
  title: 'Privacy Policy',
  lastUpdated: 'February 2026',
  summary: 'This Privacy Policy explains how ElevenLab Studio collects, uses, and safeguards information when you visit our website or submit project inquiries.',
  sections: [
    {
      number: '01',
      title: 'Information We Collect',
      paragraphs: [
        'We collect information you voluntarily provide to us when submitting our official Google Form or contacting us via WhatsApp and email. This may include your name, business name, email address, phone number, project requirements, and estimated budget.',
        'We do not collect unnecessary personal data or sell personal information to any third parties.'
      ]
    },
    {
      number: '02',
      title: 'How Information Is Used',
      paragraphs: [
        'The information we gather is used strictly to evaluate your project scope, prepare formal proposals or quotes, communicate regarding project status, and provide our digital agency services.',
        'We do not engage in unauthorized marketing spam or distribute your contact details.'
      ]
    },
    {
      number: '03',
      title: 'Google Forms & Inquiry Handling',
      paragraphs: [
        'Our project inquiries are handled directly through Google Forms, which is hosted on Google’s secure infrastructure. When you submit our inquiry form, your submission is governed by Google’s Privacy Policy and Security Standards.'
      ]
    },
    {
      number: '04',
      title: 'Cookies & Tracking Disclosures',
      paragraphs: [
        'Our core website is designed as a lightweight, clean digital agency showcase. We do not use intrusive tracking cookies, tracking pixels, or third-party behavioral advertising scripts.',
        'Basic technical session storage or client-side caching may be utilized locally by your browser strictly to enhance website responsiveness and user interface state.'
      ]
    },
    {
      number: '05',
      title: 'Data Retention & Security',
      paragraphs: [
        'We retain inquiry information only as long as necessary to fulfill business communication and contractual requirements.',
        'We employ standard digital security measures to protect correspondence against unauthorized access.'
      ]
    },
    {
      number: '06',
      title: 'User Rights',
      paragraphs: [
        'You have the right to request a copy of the personal contact information you have submitted to us or request its deletion by emailing elevenlabs.studio2026@gmail.com.'
      ]
    },
    {
      number: '07',
      title: 'Children’s Privacy',
      paragraphs: [
        'Our services are designed for commercial business clients and are not directed to individuals under the age of 18.'
      ]
    },
    {
      number: '08',
      title: 'Contact Us',
      paragraphs: [
        'If you have questions regarding this Privacy Policy, please write to elevenlabs.studio2026@gmail.com.'
      ]
    }
  ]
};

export const REFUND_POLICY: LegalDoc = {
  id: 'refund-policy',
  title: 'Refund & Cancellation Policy',
  lastUpdated: 'February 2026',
  summary: 'Our Refund and Cancellation Policy outlines the financial guidelines and mutual obligations governing project bookings and service cancellations.',
  sections: [
    {
      number: '01',
      title: 'Project Booking & Advance Deposits',
      paragraphs: [
        'To secure studio scheduling and allocate design and engineering resources, an advance deposit is required prior to project kick-off.',
        'Once work commences, deposits cover initial strategy, wireframing, and custom design labor.'
      ]
    },
    {
      number: '02',
      title: 'Work Already Completed',
      paragraphs: [
        'Because digital design, code development, and strategic assets require immediate human effort, payments made for completed phases or milestones are non-refundable.',
        'If a project is halted mid-way by the Client, the work completed up to that point will be calculated, and any remaining unspent deposit balance—if applicable—will be reconciled.'
      ]
    },
    {
      number: '03',
      title: 'Client Cancellation',
      paragraphs: [
        'If the Client chooses to cancel a project before any design or development work has been started, a refund of the deposit minus an administrative processing fee (10%) may be issued upon written request.',
        'If cancellation occurs after design concepts or staging development have begun, the deposit remains non-refundable to compensate for studio time spent.'
      ]
    },
    {
      number: '04',
      title: 'Agency Cancellation',
      paragraphs: [
        'In the rare event that ElevenLab Studio must cancel an active engagement due to unforeseen studio circumstances, a full refund of fees paid for any uncompleted milestones will be promptly issued to the Client.'
      ]
    },
    {
      number: '05',
      title: 'Third-Party & Direct Expenses',
      paragraphs: [
        'Fees incurred for non-refundable third-party services—such as domain name registrations, specialized software licenses, premium fonts, paid plugins, or hosting server allocations—are strictly non-refundable once purchased.'
      ]
    },
    {
      number: '06',
      title: 'Revisions & Satisfaction',
      paragraphs: [
        'We work closely with clients through designated feedback cycles to align the design with expectations. Dissatisfaction resulting from arbitrary changes in client preference after approved stages does not warrant an automatic refund.'
      ]
    },
    {
      number: '07',
      title: 'Processing Time',
      paragraphs: [
        'Approved refunds will be processed via original payment methods (Bank Transfer, UPI, or original gateway) within 7 to 10 business days.'
      ]
    }
  ]
};

export const WEBSITE_DISCLAIMER: LegalDoc = {
  id: 'website-disclaimer',
  title: 'Website Disclaimer',
  lastUpdated: 'February 2026',
  summary: 'This disclaimer sets forth general information parameters regarding website content, external portfolio demonstrations, and service representations.',
  sections: [
    {
      number: '01',
      title: 'General Information',
      paragraphs: [
        'The information provided on ElevenLab Studio website is for general informational and demonstration purposes only. While we endeavor to keep all information up to date and correct, we make no representations or warranties of any kind regarding accuracy or completeness.'
      ]
    },
    {
      number: '02',
      title: 'Portfolio Demonstrations & External Links',
      paragraphs: [
        'Our website includes links to live project demos and external client environments. These live previews reflect digital experiences and interfaces developed by or in collaboration with our team.',
        'We do not control subsequent external alterations made by clients or host platform updates once websites are handed over.'
      ]
    },
    {
      number: '03',
      title: 'No Guarantee of Specific Business Results',
      paragraphs: [
        'ElevenLab Studio designs and builds high-quality digital assets, websites, and interfaces. However, client business outcomes, sales revenues, marketing conversion rates, and organic search engine ranks depend on numerous external market variables outside our direct control.',
        'We do not guarantee specific monetary returns or customer traffic figures.'
      ]
    },
    {
      number: '04',
      title: 'Pricing & Promotional Offers',
      paragraphs: [
        'Pricing indicators (such as "From ₹5,000") and promotional packages (such as "1 Year Free Domain*" or "6 Months Free SEO*") are subject to formal project scoping, terms and conditions, and domain/extension availability.',
        'ElevenLab Studio reserves the right to update service offerings and baseline pricing without prior notice.'
      ]
    },
    {
      number: '05',
      title: 'Limitation of Responsibility',
      paragraphs: [
        'In no event will ElevenLab Studio be liable for any loss or damage including without limitation, indirect or consequential loss or damage, arising out of or in connection with the use of this website.'
      ]
    }
  ]
};
