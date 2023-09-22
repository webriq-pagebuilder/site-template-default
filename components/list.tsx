import dynamic from "next/dynamic";

export const Components = {
  navigation: dynamic(() => import("components/sections/navigation")),
  header: dynamic(() => import("components/sections/header")),
  features: dynamic(() => import("components/sections/features")),
  portfolio: dynamic(() => import("components/sections/portfolio")),
  blog: dynamic(() => import("components/sections/blog")),
  contact: dynamic(() => import("components/sections/contact")),
  pricing: dynamic(() => import("components/sections/pricing")),
  testimonial: dynamic(() => import("components/sections/testimonials")),
  team: dynamic(() => import("components/sections/team")),
  howItWorks: dynamic(() => import("components/sections/how_it_works")),
  newsletter: dynamic(() => import("components/sections/newsletter")),
  faqs: dynamic(() => import("components/sections/faqs")),
  callToAction: dynamic(() => import("components/sections/call_to_action")),
  stats: dynamic(() => import("components/sections/stats")),
  cookies: dynamic(() => import("components/sections/cookies")),
  appPromo: dynamic(() => import("components/sections/app_promo")),
  logoCloud: dynamic(() => import("components/sections/logoCloud")),
  footer: dynamic(() => import("components/sections/footer")),
  signInSignUp: dynamic(() => import("components/sections/sign_in_sign_up")),
  textComponent: dynamic(() => import("components/sections/text_component")),
  // C-Studio
  cartSection: dynamic(() => import("components/sections/cart_section")),
  featuredProducts: dynamic(
    () => import("components/sections/featured_products")
  ),
  productInfo: dynamic(() => import("components/sections/product_info")),
  wishlistSection: dynamic(() => import("components/sections/wishlist")),
  pages_productInfo: dynamic(
    () => import("components/sections/pages_productInfo")
  ),
  allProducts: dynamic(() => import("components/sections/all_products")),
};
