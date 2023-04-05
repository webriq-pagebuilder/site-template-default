interface PreviewData {
  source: string;
  token: string;
}

export interface PreviewProps {
  preview: boolean;
  previewData: PreviewData | {};
}

interface SanityQuery {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
}

interface SectionProps {
  _type: string;
  [key: string]: any;
}

interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
}

interface SeoProps {
  seoTitle?: string;
  seoDescription: string;
  seoImage?: SanityImage;
  seoKeywords?: string[];
  seoSynonyms?: string;
}

export interface PageDataProps extends SanityQuery {
  title: string;
  slug: string;
  seo: SeoProps;
  collections: null | any;
  sections: SectionProps[];
  hasNeverPublished: boolean;
}
