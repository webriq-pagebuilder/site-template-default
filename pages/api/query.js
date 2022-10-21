import { groq } from "next-sanity";

const conditionalLink = `
  "type": linkType,
  "internalLink": linkInternal->slug.current,
  "externalLink": linkExternal
`;

const variants = `
  variants {
    ...,
    arrayOfTitleAndText[] {
      ...,       
    },
    logo {
      image,
      ${conditionalLink}
    },
    primaryButton {
      label,
      ${conditionalLink}
    },
    secondaryButton {
      label,
      ${conditionalLink}
    },
    routes[] {
      ...,
      ${conditionalLink}
    },
    menu[] {
      ...,
      ${conditionalLink}
    },
    plans[] {
      ...,
      primaryButton {
        label,
        ${conditionalLink}
      },
    },
    formLinks[] {
      ...,
      ${conditionalLink}
    },
    portfolios[] {
      ...,
      content[] {
        ...,
        primaryButton {
          label,
          ${conditionalLink}
        },
      },
      primaryButton {
        label,
        ${conditionalLink}
      },
    },
    portfoliosWithCategories[] {
      ...,
      content[] {
        ...,
        primaryButton {
          label,
          ${conditionalLink}
        },
      },
      primaryButton {
        label,
        ${conditionalLink}
      },
    },
    signinLink {
      ...,
      ${conditionalLink}
    },
    blogPosts[]->{
      ...,
      "link": slug.current,
      authors[]->{
        ...,
        "link": slug.current
      },
      categories[]->
    },
    form {
      ...,
      thankYouPage {
        ...,
        ${conditionalLink}
      }
    },
    featured[]->,
    collections[]->{
      name,
      "items": sections[_type match "featuredProducts"]->.variants.featured[]-> {
        name,
        slug,
        productPreview,
        price
      }
    },
    products-> {
      name, 
      slug, 
      price,
      description,
      productPreview,
      "others": sections[_type match "productInfo"]->.variants {
        btnLabel,
        socialLinks,
      },
    }
  }
`;

const allProjections = `
{
  ...,
  "slug": slug.current,
  sections[]-> {
    ...,
    ${variants} 
  },
  collections->
}
`;

export const homeQuery = groq`
  *[_type == "page" && (slug.current == "home" || slug.current == "Home") ] ${allProjections}
`;

export const slugQuery = groq`
  *[_type == "page" && slug.current == $slug] ${allProjections}
`;

export const blogQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    ...,
    authors[]->{
      ...,
      "link": slug.current
    },
    categories[]->
  }
`;

export const blogNavAndFooter = groq`*[_type=="page" && slug.current == $slug]${allProjections}`;

// query main product based on current slug
export const productsQuery = groq`*[_type == "mainProduct" && slug.current == $slug] {
  ...,
  "slug": slug.current,
  "productSections": sections[]-> {
    ...,
    ${variants}
  },
  "defaultSections": *[_type == "productSettings"][0].sections[]->{
    ...,
    ${variants}
  },
  collections->,
}`;

// query record of collections
export const collectionSettings = groq`*[_type == "collectionSettings"][0] ${allProjections}`;

// query product collection based on current slug
export const collectionsQuery = groq`*[_type == "mainCollection" && slug.current == $slug] {
  ...,
  "slug": slug.current,
  "collectionSections": sections[]-> {
    ...,
    ${variants}
  },
  "defaultSections": *[_type == "collectionSettings"][0].sections[]->{
    ...,
    ${variants}
  },
  collections->,
}`;

// query cart page
export const cartPageQuery = groq`*[_type == "cartPage"] ${allProjections}`;

// query wishlist page
export const wishlistPageQuery = groq`*[_type == "wishlistPage"] ${allProjections}`;
