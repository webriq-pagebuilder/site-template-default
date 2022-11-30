import { groq } from "next-sanity";

const conditionalLink = `
  "type": linkType,
  "internalLink": linkInternal->slug.current,
  "externalLink": linkExternal
`;

const variants = `
  variants {
    ...,
    arrayOfTitleAndText[],
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
    collections->{
      ...,
      products[]->
    },
    products-> {
      name, 
      slug, 
      price,
      description,
      ecwidProductId,
      "others": sections[_type match "productInfo"]->.variants {
        btnLabel,
        socialLinks,
      },
    },
    allProducts[]-> {
      ...,
      products[]->
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
    categories[]->,
    "navigation": *[_type=="page" && slug.current=="home"].sections[_type match "navigation"]->{
      ...,
      ${variants}
    },
    "footer": *[_type=="page" && slug.current=="home"].sections[_type match "footer"]->{
      ...,
      ${variants},
    },
  }
`;

// query main product based on current slug
export const productsQuery = groq`*[_type == "mainProduct" && slug.current == $slug] {
  ...,
  "slug": slug.current,
  sections[]->{
    ...,
    ${variants}, 
    _type == "slotProductInfo" => {
     ...,
     "variant": *[_type == "mainProduct" && slug.current == $slug][0].productInfoVariant.variant,
     "variants": *[_type == "mainProduct" && slug.current == $slug][0].productInfo
   }
  },
  "commonSections": *[_type == "productSettings"][0]{
    _type,
    sections[]-> {
      ...,
      ${variants},
      _type == "slotProductInfo" => {
        ...,
        "variant": *[_type == "productSettings"][0].defaultProductInfoVariant.variant
      }
    },
  },
}`;

// query product collection based on current slug
export const collectionsQuery = groq`*[_type == "mainCollection" && slug.current == $slug] {
  ...,
  "slug": slug.current,
  products[]->,
  sections[]-> {
    ...,
    ${variants},
    _type == "slotCollectionInfo" => {
      ...,
      "variant": *[_type == "mainCollection" && slug.current == $slug][0].collectionInfoVariant.variant,
      "variants": {
        "title": *[_type == "mainCollection" && slug.current == $slug][0].name,
        "products": *[_type == "mainCollection" && slug.current == $slug][0].products[]->,
      }
    }
  },
  "commonSections": *[_type == "collectionSettings"][0]{
    _type,
    sections[]->{
      ...,
      ${variants},
      _type == "slotCollectionInfo" => {
        ...,
        "variant": *[_type == "collectionSettings"][0].defaultCollectionInfoVariant.variant
      }
    }
  }
}`;

// query cart page
export const cartPageQuery = groq`*[_type == "cartPage"] ${allProjections}`;

// query wishlist page
export const wishlistPageQuery = groq`*[_type == "wishlistPage"] ${allProjections}`;

// query search page
export const searchPageQuery = groq`*[_type == "searchPage"] ${allProjections}`;
