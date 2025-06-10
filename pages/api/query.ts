import { groq } from "next-sanity";

const conditionalLink = `
  "type": linkType,
  "internalLink": linkInternal->slug.current,
  "externalLink": linkExternal
`;

const mainImage = `"mainImage": {
  "image": *[_type == "sanity.imageAsset" && _id == ^.mainImage.image.asset._ref][0].url,
  "alt": mainImage.alt
}`;

const logoImage = `"image": *[_type == "sanity.imageAsset" && _id == ^.image.asset._ref][0].url,`;

const socialMediaIcon = `"image": *[_type == "sanity.imageAsset" && _id == ^.image.asset._ref][0].url,`;

const variants = `
  variants {
    ...,
    logo != null => {
      logo {
        alt,
        ${logoImage}
        linkTarget,
        ${conditionalLink}
      }
    },
    images != null => {
      images[] {
        ${logoImage}
        "alt": alt
      },
    },
    alt != null => {
      alt,
    },
    mainImage != null => {
      ${mainImage},
    },
    featuredItems != null => {
      featuredItems[] {
        ...,
        ${mainImage},
      }
    },
    arrayOfImageTitleAndText != null => {
      arrayOfImageTitleAndText[] {
        ...,
        ${mainImage},
      }
    },
    statItems != null => {
      "stats": statItems[] {
        ...,
        ${mainImage},
      }
    },
    faqsWithCategory != null => {
      "faqsWithCategories": faqsWithCategory[] {
        ...,
      }
    },
    askedQuestions != null => {
      "faqs": askedQuestions[] {
        ...,
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
     config != null => {
      config {
        ...,
        cookiePolicy {
          ...,
          cookiePolicyPage {
            ...,
            ${conditionalLink}
          }
        }
      }
    },
    contactLink != null => {
      contactLink {
        ...,
        label,
        ${conditionalLink}
      }
    },
    multipleMenus != null => {
      multipleMenus[] {
        ...,
        links != null => {
          links[] {
            ...,
            ${conditionalLink}
          }
        }
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
    testimonials != null => {
      testimonials[] {
        ...,
        ${mainImage}
      },
    },
    portfolios != null => {
      portfolios[] {
        ...,
        ${mainImage},
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
         ${mainImage},
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
    teams != null => {
      teams[] {
        ...,
        ${mainImage},
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
      "posts": blogPosts[]->{
        ...,
        "link": slug.current,
        authors[]->{
          ...,
          "link": slug.current
        },
        "mainImage": *[_type == "sanity.imageAsset" && _id == ^.mainImage.asset._ref][0].url,
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
    },
    account !=  null => {
      "user": *[_type == 'socialAccounts'][0].accounts[userId == account][0],
    },
    socialLinks[] {
      ...,
      socialMediaIcon {
        ...,
        ${socialMediaIcon}
      }
    },
     "socialMedia": socialLinks[] {
      ...,
      socialMediaIcon {
        ...,
        ${socialMediaIcon}
      }
    },
    headerSections[] {
        ...,
        title,
        description,
        imageHeight,
        ${mainImage},
        alignment,
        primaryButton {
          ...,
          label,
          ${conditionalLink}
        },
      },
      iconLinks != null => {
        iconLinks[] {
          ...,
          "type": link.linkType,
          "internalLink": link.linkInternal->slug.current,
          "externalLink": link.linkExternal,
          "linkTarget": link.linkTarget
        }
      },
      megaMenu != null => {
        megaMenu[] {
          ...,
          ${conditionalLink},
          groupOfLinks != null => {
            groupOfLinks[] {
              ...,
              links != null => {
                links[] {
                  ...,
                  links[] {
                  ...,
                  ${conditionalLink}
                  }
                }
              }
            }
          },
          showcaseLink != null => {
            showcaseLink[] {
              ...,
              ${mainImage},
              primaryButton != null => {
                primaryButton {
                  ...,
                  ${conditionalLink}
                }
              }
            }
          }
        }
      },
      dropdownMenu != null => {
        dropdownMenu[] {
          _key,
          _type,
          routeType,
          routeType == "singleRoute" => {
            "label": link.label
          },
          routeType == "multipleRoute" => {
            "label": label
          },
         "linkType": link.linkType,
          "internalLink": link.linkInternal->slug.current,
          "externalLink": link.linkExternal,
          "linkTarget": link.linkTarget,
          multipleRoutes != null => {
            multipleRoutes[] {
              _key,
              _type,
              "label": link.label,
              "linkType": link.linkType,
              "internalLink": link.linkInternal->slug.current,
              "externalLink": link.linkExternal,
              "linkTarget": link.linkTarget
            }
          },
          featuredRoute != null => {
            featuredRoute {
              featuredLink != null => {
                featuredLink {
                  "label": link.label,
                  "linkType": link.linkType,
                  "internalLink": link.linkInternal->slug.current,
                  "externalLink": link.linkExternal,
                  "linkTarget": link.linkTarget
                },
                ${mainImage}
              }
            }
          }
        }
      },
      multipleLinks != null => {
      "multipleLinks": multipleLinks[]{
        _key,
        _type,
        "label": link.label,
        "linkType": link.linkType,
        "internalLink": link.linkInternal->slug.current,
        "externalLink": link.linkExternal,
        "linkTarget": link.linkTarget,
        multipleRoutes[]{
          _key,
          _type,
          "label": link.label,
          "linkType": link.linkType,
          "internalLink": link.linkInternal->slug.current,
          "externalLink": link.linkExternal,
          "linkTarget": link.linkTarget,
          multipleInnerRoutes[]{
            _key,
            _type,
            "label": link.label,
            "linkType": link.linkType,
            "internalLink": link.linkInternal->slug.current,
            "externalLink": link.linkExternal,
            "linkTarget": link.linkTarget
          }
        }
      }
    },
      "images": imagesAndVideos[] {
        ...,
        _type == "imageItem" => {
          "image": image.asset->url,
          "alt": image.alt,
        },
        _type == "videoItem" => {
          "video": video.asset->url,
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

// query sections/components
export const componentsQuery = groq`*[_type==$schema && !(_id in path("drafts.**"))] | order(variant asc, _updatedAt desc) {
  ...,
  ${variants}
}`;

// query theme page
export const themePageQuery = groq`*[_type == "themePage"] ${allProjections}`;
