export type ProjectCategory = 'ALL' | 'BUSINESS' | 'HEALTHCARE' | 'E-COMMERCE' | 'SERVICE';

export interface ProjectItem {
  id: string;
  number: string;
  name: string;
  category: string;
  filterCategory: ProjectCategory;
  description: string;
  liveDemoUrl: string;
  highlights: string[];
  gradientTheme?: string;
  badgeColor?: string;
}

export interface ServiceItem {
  number: string;
  title: string;
  description: string;
  features: string[];
  iconName: string;
  ctaText?: string;
}

export interface TeamMember {
  number: string;
  name: string;
  role: string;
  description: string;
  focus: string[];
}

export interface ValueItem {
  number: string;
  title: string;
  description: string;
}

export type LegalPageType = 'terms' | 'privacy' | 'refund' | 'disclaimer';

export interface LegalSection {
  title: string;
  content: string[];
  subsections?: { title: string; content: string[] }[];
}
