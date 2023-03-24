//import { DocumentBadgeDescription, DocumentBadgeProps } from "sanity"

export const sections = [
  "navigation",
  "featuredProducts",
  "blog",
  "appPromo",
  "callToAction",
  "checkout",
  "contact",
  "cookies",
  "faqs",
  "features",
  "footer",
  "header",
  "howItWorks",
  "logoCloud",
  "portfolio",
  "pricing",
  "stats",
  "shop",
  "signInSignUp",
  "team",
  "testimonial",
  "textComponent",
  "newsletter",
  "allProducts",

  // C-Studio sections for page documents only
  "pages_featuredProducts",
  "pages_productInfo",

  // C-Studio slot sections for cart and wishlist
  "slotCart",
  "slotWishlist",
]

export function sectionName(section) {
  if (section === "appPromo") {
    return "App Promo"
  } else if (section === "featuredProducts" || section === "pages_featuredProducts") {
    return "Featured Products"
  } else if (section === "callToAction") {
    return "Call To Action"
  } else if (section === "howItWorks") {
    return "How It Works"
  } else if (section === "logoCloud") {
    return "Logo Cloud"
  } else if (section === "productInfo" || section === "pages_productInfo") {
    return "Product Info"
  } else if (section === "signInSignUp") {
    return "Sign In Sign Up"
  } else if (section === "textComponent") {
    return "Text Component"
  } else if (section === "allProducts") {
    return "All Products"
  } else if (section === "slotCart") {
    return "Cart"
  } else if (section === "slotWishlist") {
    return "Wishlist"
  } else {
    return section?.charAt(0).toUpperCase() + section?.substr(1, section.length - 1)
  }
}

export function SectionBadge(props) {
  const { type } = props

  if (sections.includes(type)) {
    return {
      label: String(`${sectionName(type)} Section`).toUpperCase(),
      title: `${sectionName(type).toUpperCase()} SECTION`,
      color: "success",
    }
  }
}
