export type Media = {
  src: string;
  alt: string;
};

export type ProjectCategory =
  | "konut"
  | "villa"
  | "ic-mekan"
  | "ticari"
  | "renovasyon";

export type Project = {
  slug: string;
  title: string;
  location: string;
  year: string;
  category: ProjectCategory;
  categoryLabel: string;
  area: string;
  excerpt: string;
  story: string[];
  approach: string[];
  cover: Media;
  gallery: Media[];
  materials: { name: string; note: string }[];
  plans: Media[];
  serviceSlug: string;
  featured: boolean;
};

export type ServiceProcessStep = {
  title: string;
  text: string;
};

export type Faq = {
  question: string;
  answer: string;
};

export type Service = {
  slug: string;
  number: string;
  title: string;
  summary: string;
  description: string[];
  scope: string[];
  approach: string[];
  process: ServiceProcessStep[];
  faqs: Faq[];
  image: Media;
  relatedProjectSlugs: string[];
};

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; id: string; text: string }
  | { type: "h3"; id: string; text: string }
  | { type: "ul"; items: string[] };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  updatedAt: string;
  author: string;
  cover: Media;
  blocks: ArticleBlock[];
  relatedServiceSlugs: string[];
};

export type Testimonial = {
  id: string;
  quote: string;
  role: string;
  context: string;
  image: Media;
};

export type ProcessStep = {
  number: string;
  title: string;
  text: string;
  image: Media;
};

export type StudioValue = {
  number: string;
  title: string;
  text: string;
};
