export interface SEOJsonLdProps {
  type?: string;
  pageData?: any;
  [key: string]: any;
  scriptKey?: string;
}

export interface ArticleAuthor {
  name: string;
  url?: string;
  type?: "Person" | "Organization";
}

export interface BlogJsonLdProps {
  type?: "Article" | "BlogPosting" | "Blog";
  url: string;
  title: string;
  images: string | string[];
  datePublished: string;
  dateModified: string;
  authorName: string;
  publisherName?: string;
  publisherLogo?: string;
  description: string;
}

export interface ContactPoint {
  contactType: string;
  telephone: string;
  email?: string;
  areaServed?: string | string[];
  availableLanguage?: string | string[];
  contactOption?: string | string[];
}

export interface CorporateJsonLdProps extends SEOJsonLdProps {
  name: string;
  description?: string;
  url: string;
  contactPoint: ContactPoint[];
  logo?: string;
}

export interface Offers {
  price: string;
  priceCurrency: string;
  url?: string;
  itemCondition?: string;
  availability?: string;
}

export interface ProductJsonLdProps extends SEOJsonLdProps {
  productName: string;
  images: string | string[];
  url: string;
  brand?: string;
  description: string;
  price: string;
  priceCurrency: string;
}
