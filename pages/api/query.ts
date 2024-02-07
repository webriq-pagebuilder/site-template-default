import { groq } from "next-sanity";

const conditionalLink = `
  "type": linkType,
  "internalLink": linkInternal->slug.current,
  "externalLink": linkExternal
`;

const variants = `
  variants {
    ...,
    logo != null => {
      logo {
        alt,
        image,
        ${conditionalLink}
      }
    },
    primaryButton != null => {
      primaryButton {
        ...,
        label,
        ${conditionalLink}
      }
    },
    secondaryButton != null => {
      secondaryButton {
        ...,
        label,
        ${conditionalLink}
      }
    },
    routes != null => {
      routes[] {
        ...,
        ${conditionalLink}
      }
    },
    menu != null => {
      menu[] {
        ...,
        ${conditionalLink}
      }
    },
    plans != null => {
      plans[] {
        ...,
        primaryButton {
          ...,
          label,
          ${conditionalLink}
        },
      }
    },
    formLinks != null => {
      formLinks[] {
        ...,
        ${conditionalLink}
      }
    },
    portfolios != null => {
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
          ...,
          label,
          ${conditionalLink}
        },
      }
    },
    portfoliosWithCategories != null => {
      portfoliosWithCategories[] {
        ...,
        content[] {
          ...,
          primaryButton {
            ...,
            label,
            ${conditionalLink}
          },
        },
        primaryButton {
          ...,
          label,
          ${conditionalLink}
        },
      }
    },
    signInLink != null => {
        signInLink {
        ...,
        ${conditionalLink}
      }
    },
    signinLink != null => {
        signinLink {
        ...,
        ${conditionalLink}
      }
    },
    blogPosts != null => {
      blogPosts[]->{
        ...,
        "link": slug.current,
        authors[]->{
          ...,
          "link": slug.current
        },
        categories[]->
      }
    },
    form != null => {
      form {
        ...,
        thankYouPage {
          ...,
          ${conditionalLink}
        }
      }
    },
    featured != null => { featured[]-> },
    collections != null => {
      collections->{
        ...,
        products[]->
      }
    },
    products != null => { products-> },
    allProducts != null => {
      allProducts[]-> {
        ...,
        products[]->
      }
    }
  }
`;

const allProjections = `
{
  ...,
  "slug": slug.current,
  sections[]-> {
    ...,
    ${variants} ,
    _type == "slotWishlist" => {
      ...,
      "variant": *[_type == "wishlistPage"][0].wishlistSectionVariant.variant,
    },
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
  *[_type == "post" && slug.current == $slug]{
    ...,
    authors[]->{
      ...,
      "link": slug.current
    },
    categories[]->,
    "navigation": *[_type=="page" && slug.current=="home"][0].sections[_type match "navigation"][0]->{
      ...,
      ${variants}
    },
    "footer": *[_type=="page" && slug.current=="home"][0].sections[_type match "footer"][0]->{
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
   },
   _type == "slotCart" => {
      ...,
      "variant": *[_type == "cartPage"][0].cartSectionVariant.variant,
    },
    _type == "slotWishlist" => {
      ...,
      "variant": *[_type == "wishlistPage"][0].wishlistSectionVariant.variant,
    },
  },
  "commonSections": *[_type == "productSettings"][0]{
    _type,
    seo,
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
      "variants": *[_type == "mainCollection" && slug.current == $slug][0]{
        "collections": {
          "title": name,
          products[]->,
        }
      }
    },
    _type == "slotCart" => {
      ...,
      "variant": *[_type == "cartPage"][0].cartSectionVariant.variant,
    },
    _type == "slotWishlist" => {
      ...,
      "variant": *[_type == "wishlistPage"][0].wishlistSectionVariant.variant,
    },
  },
  "commonSections": *[_type == "collectionSettings"][0]{
    _type,
    seo,
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
export const cartPageQuery = groq`*[_type == "cartPage"] {
  ...,
  sections[]-> {
    ...,
    ${variants},
    _type == "slotCart" => {
      ...,
      "variant": *[_type == "cartPage"][0].cartSectionVariant.variant,
    }
  }
}`;

// query wishlist page
export const wishlistPageQuery = groq`*[_type == "wishlistPage"] {
  ...,
  sections[]-> {
    ...,
    ${variants},
    _type == "slotWishlist" => {
      ...,
      "variant": *[_type == "wishlistPage"][0].wishlistSectionVariant.variant,
    }
  }
}`;

// query search page
export const searchPageQuery = groq`*[_type == "searchPage"] ${allProjections}`;

// query Global or Default SEO values
export const globalSEOQuery = groq`*[_type == 'defaultSeo' && !(_id in path("drafts.**"))][0]`;
