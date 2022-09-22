import { groq } from "next-sanity";

const conditionalLink = `
  "type": linkType,
  "internalLink": linkInternal->slug.current,
  "externalLink": linkExternal
`;

const allProjections = `
{
  ...,
  "slug": slug.current,
  sections[]-> {
    ...,
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
      featured {
        ...,
        products[]->
      }       
    }
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
export const productsQuery = groq`*[_type == "mainProduct" && slug.current == $slug] ${allProjections}`;

// query products that will override the main
export const overrideProducts = groq`*[_type == "overridesProduct" && name == $productName][0] ${allProjections}`;

// query collections that will override the main
export const overrideCollections = groq`*[_type == "overridesProduct" && name == $collectionName][0] ${allProjections}`;

// query product category based on current slug
export const collectionsQuery = groq`*[_type == "mainCollection" && slug.current == $slug] ${allProjections}`;
