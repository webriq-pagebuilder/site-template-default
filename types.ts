export interface SanityBody {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
}

export interface ConditionalLink {
  type: 'conditionalLink';
  internalLink: string | null;
  externalLink: string | null;
}

export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
}

//Generic type for routes with label e.g. primaryButtons, secondaryButton, menu, etc
export interface LabeledRoute extends ConditionalLink {
  label?: string;
}

//types from variants on query file
export interface ArrayOfTitleAndText {
  _key: string;
  plaintText: string;
  title: string;
}

export interface Logo extends ConditionalLink {
  alt?: string;
  image?: SanityImage;
}

export interface Route extends LabeledRoute {
  _key: string;
}

//TODO, UNFINISHED PLANS
export interface Plans {
  _key: string;
  _type: 'planItems';
  checkoutButtonname: string;
  description: string;
  monthlyPrice: string;
  planType: string;
  yearlyPrice: string;
  planIncludes: PlanIncludes[];
}

interface PlanIncludes {
  [key: string]: string;
}

export interface Seo {
  seoTitle?: string;
  seoDescription: string;
  seoImage?: SanityImage;
  seoKeywords?: string[];
  seoSynonyms?: string;
}

interface Sections extends SanityBody {
  label: string;
  variant: string;
  variants: Variants[];
}

interface Variants {
  [key: string]: any;
}

export interface SanitySlug {
  current: string;
  _type: 'slug';
}

interface BlogsBody {
  style: BlockStyles;
  _key: string;
  _type: 'block';
  markDefs: MarkDefs[] | [];
  children: BodyChildren[] | [];
}

interface BodyChildren {
  marks: [];
  text: string;
  _key: string;
  _type: string;
}

interface MarkDefs {
  _key: string;
  _type: string;
  href: string;
}

interface BlockStyles {
  style: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'normal';
}

export interface Authors extends SanityBody {
  link: string;
  name: string;
  slug: SanitySlug;
  image: SanityImage;
  profile?: {
    alt: string;
    image: SanityImage;
  };
}

export interface PrimaryButton extends ConditionalLink {
  label: string;
}

interface Categories extends SanityBody {
  title: string;
}

export interface PageDataProps extends SanityBody {
  title: string;
  slug: string;
  seo: Seo;
  sections: Sections[];
  hasNeverPublished: boolean;
}

export interface BlogsDataProps extends SanityBody {
  authors: Authors[];
  body: BlogsBody[];
  categories: Categories[];
  excerpt: string;
  mainImage: SanityImage;
  footer: Variants[];
  navigation: Variants[];
  publishedAt: string;
  slug: SanitySlug;
  title: string;
  seo: Seo;
}
