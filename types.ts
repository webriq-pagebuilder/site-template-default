import { JSXElementConstructor, ReactElement } from "react";
import { PortableTextComponents } from "@portabletext/react";
import { PortableTextBlock, Reference } from "sanity";

//Used on different sections
export interface SectionsProps {
  template?: Template;
  data?: Sections;
}
//*EDIT THIS SECTION WHEN CREATING/UPDATING SCHEMAS ON STUDIO */
export interface Variants {
  template?: Template;
  multipleMenus?: any;
  length?: number;
  arrayOfTitleAndText?: ArrayOfTitleAndText[] | null;
  logo?: Logo | null;
  multipleLinks?: any;
  dropdownMenu?: LabeledRouteWithKey[] | null;
  logos?: Logo[] | null;
  primaryButton?: LabeledRoute | null;
  secondaryButton?: LabeledRoute | null;
  routes?: LabeledRouteWithKey[] | null;
  menu?: LabeledRouteWithKey[] | null;
  plans?: Plans[] | null;
  formLinks?: LabeledRouteWithKey[] | null;
  portfolios?: Portfolio[] | null;
  portfoliosWithCategories?: PortfoliosWithCategories[] | null;
  signInLink?: LabeledRoute | null;
  signinLink?: LabeledRoute | null;
  tags?: string[] | null;
  blogPosts?: BlogPost[] | null;
  form?: Form | null;
  collections?: Collection | null;
  products?: CollectionProduct | null;
  allProducts?: Collection[];
  subtitle?: string | null;
  title?: string | null;
  plainText?: string | null;
  contactDescription?: string | null;
  officeInformation?: string | null;
  contactEmail?: string | null;
  contactNumber?: string | null;
  socialLinks?: SocialLink[] | null;
  socialMedia?: SocialLink[] | null;
  iconLinks?: LabeledRouteWithKey[] | null;
  megaMenu?: MegaMenu[];
  block?: any;
  heading?: string | null;
  acceptButtonLabel?: string | null;
  declineButtonLabel?: string | null;
  faqsWithCategory?: FaqsWithCategory[] | null;
  askedQuestions?: AskedQuestion[] | null;
  arrayOfImageTitleAndText?: ArrayOfImageTitleAndText[] | null;
  description?: string | null;
  caption?: string;
  featuredItems?: FeaturedItem[] | null;
  images?: Images[] | null;
  contactDetails?: ContactDetails[] | null;
  copyright?: string | null;
  mainImage?: MainImage | null;
  youtubeLink?: string | null;
  banner?: any;
  statItems?: StatItems[] | null;
  stats?: StatItems[] | null;
  teams?: Team[] | null;
  testimonials?: Testimonial[] | null;
  firstColumn?: PortableTextBlock[];
  secondColumn?: PortableTextBlock[];
  thirdColumn?: PortableTextBlock[];
  selectStripeAccount?: string;
  annualBilling?: string;
  monthlyBilling?: string;
  productDetails?: ProductDetail[];
  btnLabel?: string;
  user?: {
    platform: string | undefined;
    profileName: string | undefined;
    profilePictureUrl: string | undefined;
    userId: string | undefined;
    userName: string | undefined;
  };
  hashtags?: string[];
  numberOfPosts?: number;
  text?: string;
  button?: LabeledRoute;
  features?: string[];
  config: {
    enableAnalytics: boolean;
    cookiePolicy?: {
      siteName: string;
      cookiePolicyPage: Reference;
    };
    consentModalPosition?: string;
  };
  contactLink?: any;
  showRecentPosts?: boolean;
  showPostsFrom?: number;
}

export interface MegaMenu {
  _type: string;
  showcaseLink?: ShowcaseLink[];
  links?: MegaMenuLink[];
  _key: string;
  title?: string;
  groupOfLinks?: GroupOfLink[];
  label?: string;
  linkTarget?: string;
  linkType?: string;
  url?: string;
}

export interface ShowcaseLink {
  mainImage: MainImage;
  _type: string;
  primaryButton: LabeledRouteWithKey;
  _key: string;
}

export interface MegaMenuLink {
  _key: string;
  title: string;
  _type: string;
  links: LabeledRouteWithKey[];
  primaryButton: LabeledRouteWithKey;
  label: string;
}

export interface GroupOfLink {
  _type: string;
  links: GroupOfLinkRoot[];
  _key: string;
  title: string;
  primaryButton: LabeledRouteWithKey;
}

export interface GroupOfLinkRoot {
  title: string;
  _type: string;
  label?: string;
  links: LabeledRouteWithKey[];
  _key: string;
}

export interface SocialProfileFeed {
  account: {
    platform: string | undefined;
    profileName: string | undefined;
    profilePictureUrl: string | undefined;
    userId: string | undefined;
    userName: string | undefined;
  };
  status: string | "loading" | "success" | "error" | undefined;
  media: any[];
  baseUrl: string | undefined;
}

export interface Socials {
  profileFeed: SocialProfileFeed;
  setProfileFeed: React.Dispatch<React.SetStateAction<SocialProfileFeed>>;
  fetchNextPage: () => void;
  fetchPreviousPage: () => void;
  nextCursor: string | null | undefined;
  prevCursor: string | null | undefined;
}

export interface Template {
  bg?: string;
  color?: string;
}

export interface Stripe {
  accountName: string;
  apiVersion: string;
  hashKey: string;
  stripePKey: string;
  stripeSKey: string;
  _type: string;
}

export interface SanityBody {
  _createdAt?: string;
  _id?: string;
  _rev?: string;
  _type?: string;
  _updatedAt?: string;
}

export interface ConditionalLink {
  type?: string;
  internalLink?: string | null;
  externalLink?: string | null;
}

export interface SanityImage {
  priority?: boolean | false;
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
}

export interface MainImage {
  image: SanityImage;
  alt?: string;
}

//Generic type for routes with label e.g. primaryButtons, secondaryButton, menu, etc
export interface LabeledRoute extends ConditionalLink {
  label?: string;
  linkTarget?: string;
  linkType?: string;
  _type?: string;
  linkInternal?: any;
  linkExternal?: string;
}

export interface LabeledRouteWithKey extends LabeledRoute {
  _key?: string;
}

//types from variants on query file
export interface ArrayOfTitleAndText {
  _key?: string;
  plainText?: string;
  title?: string;
}

export interface Logo extends ConditionalLink {
  alt?: string;
  linkTarget?: string;
  image?: string;
}

export interface Logos {
  logo: Logo[];
}

export type Plans = {
  _key?: string | null;
  _type?: "planItems" | null;
  checkoutButtonName?: string | null;
  description?: string | null;
  monthlyPrice?: string | null;
  planType?: string | null;
  yearlyPrice?: string | null;
  planIncludes?: string[] | null;
  primaryButton?: LabeledRoute | null;
} & Record<string, string>;

export interface Form {
  id?: string | null;
  buttonLabel?: string | null;
  name?: string | null;
  subtitle?: string | null;
  fields?: FormFields[] | null;
  thankYouPage?: ThankYouPage | null;
}

export interface ThankYouPage {
  externalLink?: string | null;
  internalLink?: string | null;
  linkInternal?: any;
  linkTarget?: string;
  linkType?: string;
  type?: string;
}

export interface FormFields {
  name?: string;
  placeholder?: string;
  pricingType?: string;
  type?: FormTypes;
  _key?: string;
  _type?: string;
  isRequired?: boolean;
  label?: string;
  items?: string[];
}

export type FormTypes =
  | "inputText"
  | "inputEmail"
  | "inputPassword"
  | "inputNumber"
  | "textarea"
  | "inputFile"
  | "inputRadio"
  | "inputCheckbox"
  | "inputSelect";
export interface Seo {
  _type?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: SanityImage;
  seoKeywords?: string;
  seoSynonyms?: string;
}

export interface DefaultSeoData {
  defaultSeoTitle: string | undefined;
  defaultSeoSynonyms?: string | undefined;
  defaultSeoKeywords?: string | undefined;
  defaultSeoDescription: string | undefined;
  defaultSeoImage: SanityImage | undefined;
}

export interface SeoData extends Seo {
  title: string; // page title
  name?: string; // for product page
  body?: any; // for blog page
  type: string; // page type e.g. blog
  route: string | SanitySlug | string[]; // page slug
}

export interface SeoTags {
  name?: string | null;
  title?: string | null;
  key: string;
  content?: string | null;
  property?: string | null;
  rel?: string | null;
  href?: string | null;
}

export interface SeoSchema {
  key: string;
  innerHTML?:
    | {
        __html: string | TrustedHTML;
      }
    | undefined;
}

export interface Sections extends SanityBody {
  label?: string;
  variant?: string;
  variants?: Variants;
  _key?: string;
}

export interface Portfolio {
  dateAdded?: string | null;
  mainImage?: MainImage | null;
  primaryButton?: LabeledRoute | null;
  title?: string | null;
  _key?: string | null;
  _type?: string | null;
}

export interface PortfoliosWithCategories {
  category?: string | null;
  content?: Content[] | null;
  primaryButton?: LabeledRoute | null;
  _key?: string | null;
  _type?: string | null;
}

interface Content extends Portfolio {
  description?: string | null;
  subtitle?: string | null;
}
interface Category extends SanityBody {
  title?: string;
}

export interface BlogPost extends SanityBody {
  authors?: Author[] | null;
  body?: any;
  categories?: Category[] | null;
  excerpt?: string | null;
  link?: string | null;
  mainImage?: SanityImage | null;
  alt?: string | null;
  publishedAt?: string;
  seo?: Seo | null;
  slug?: SanitySlug | null;
  title: string;
}

export interface Collection extends SanityBody {
  collectionInfoVariant?: {
    variant?: string;
  } | null;
  name?: string | null;
  products?: CollectionProduct[] | null;
  sections?: any; //todo
  seo?: Seo | null;
  slug?: SanitySlug | null;
}

export interface CollectionProduct extends SanityBody {
  compareToPrice?: number | null;
  description?: string | null;
  ecwidProductId?: number | null;
  name?: string | null;
  price?: number | null;
  productInfo?: ProductInfo | null;
  productInfoVariant?: {
    variant?: string;
  } | null;
  sections?: any; //todo
  seo?: Seo | null;
  slug?: SanitySlug | null;
}

//TODO, RECHECK PRODUCT INFO DATA FROM SANITY
interface ProductInfo {
  btnLabel?: string | null;
  images?: ProductInfoImage[] | null;
  productDetails?: ProductDetail[] | null;
  socialLinks?: SocialLink[] | null;
  subtitle?: string | null;
}

//TODO, RECHECK PRODUCT INFO DATA FROM SANITY
export interface ProductDetail {
  blockContent?: any;
  contentType?: string;
  tabName?: string;
  _key?: string;
  [key: string]: any;
}
interface ProductInfoImage {
  alt?: string | null;
  _key: string;
  _type: string;
  image?: SanityImage | null;
}

export interface SocialLink {
  socialMedia?: string | null;
  socialMediaLink?: string | null;
  _key?: string | null;
  _type?: string | null;
  socialMediaIcon?: {
    alt?: string;
    image?: SanityImage;
  } | null;
  socialMediaPlatform?: string | null;
}

export interface AskedQuestion {
  answer?: string | null;
  question?: string | null;
  _key?: string;
  _type?: string;
}

export interface FaqsWithCategory {
  askedQuestions?: AskedQuestion[] | null;
  category?: string | null;
  _key?: string;
  _type?: string;
}

export interface ContactDetails {
  addressInfo?: string;
  contactInfo?: string;
  emailInfo?: string;
  _key?: string;
}

export interface ArrayOfImageTitleAndText {
  mainImage?: {
    alt?: string;
    image?: SanityImage;
  };
  plainText?: string;
  title?: string;
  _key?: string;
  _type?: string;
}

export interface FeaturedItem {
  description?: string;
  mainImage?: MainImage;
  title?: string;
  subtitle?: string;
  _key?: string;
  _type?: string;
}

export interface Images {
  image?: SanityImage;
  _key?: string;
  _type?: string;
  alt?: string;
}

export interface StatItems {
  label?: string;
  mainImage?: MainImage;
  value?: string;
  _key?: string;
  _type?: string;
}

export interface Team {
  jobTitle?: string;
  mainImage?: MainImage;
  name?: string;
  plainText?: string;
  _key?: string;
  _type?: string;
}

export interface Testimonial {
  jobTitle?: string;
  mainImage?: MainImage;
  name?: string;
  rating?: string;
  testimony?: string;
  _key?: string;
  _type?: string;
}

export interface SanitySlug {
  current?: string;
  _type?: "slug";
}

interface BodyChildren {
  marks?: any;
  text?: string;
  _key?: string;
  _type?: string;
}

interface MarkDefs {
  _key?: string;
  _type?: string;
  href?: string;
}

interface BlockStyles {
  style?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "normal";
}

export interface Author extends SanityBody {
  link?: string | null;
  bio?: string | null;
  name?: string | null;
  slug?: SanitySlug | null;
  image?: SanityImage | null;
  profile?: {
    alt: string;
    image: SanityImage;
  } | null;
}

interface Categories extends SanityBody {
  title?: string;
}

export interface CommonPageData extends SanityBody {
  seo?: Seo;
  sections?: Sections[];
  hasUnpublishedEdits?: boolean | null;
}

export interface BlogsData extends SanityBody {
  authors?: Author[] | null;
  body?: PortableTextBlock[] | null;
  categories?: Categories[] | null;
  excerpt?: string | null;
  mainImage?: SanityImage | null;
  footer?: Sections | null;
  navigation?: Sections | null;
  publishedAt?: string | null;
  slug?: SanitySlug | null;
  title?: string | null;
  seo?: Seo;
  hasUnpublishedEdits?: boolean | null;
  hasNeverPublished?: boolean | null;
}

export type MyPortableTextComponents = PortableTextComponents & {
  code?: ({
    value,
  }: {
    value: { language?: string; code?: string };
  }) => JSX.Element;
};

//commerce pages
export interface CommonSections {
  sections?: Sections[] | null;
  seo?: Seo | null;
}

export interface SearchItemsTypes {
  searchItems: {
    _id: string;
    label: string;
    title: string;
    variant: string;
    _type: string;
  }[];
  onClickHandler: any;
}

export interface ButtonWithTooltipTypes {
  toolTipText?: string | undefined;
  children: ReactElement<any, string | JSXElementConstructor<any>>;
}
