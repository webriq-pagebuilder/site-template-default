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
      }       
    }
  }
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

export const blogNavAndFooter = groq`
*[_type=="page" && slug.current == $slug]{
  sections[]-> {
    ...,
    variants {
      ...,
      "arrImages": images,
      arrayOfTitleAndText[] {
        ...,
        "title": heading,
        "content": plainText
      },
      logo {
        ...,
        ${conditionalLink}
      },
      primaryButton {
        ...,
        ${conditionalLink}
      },
      secondaryButton {
        ...,
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
          ...,
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
            ...,
            ${conditionalLink}
          },
        },
        primaryButton {
          ...,
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
    }
  }
}`;

// query product based on current slug
export const productsQuery = groq`*[_type == "products" && slug.current == $slug] ${allProjections}`;

// query site settings
export const siteSettingsQuery = groq`*[_type == "siteSettings"][0] ${allProjections}`;

// query product category based on current slug
export const productCategoryQuery = groq`*[_type == "categories" && slug.current == $slug] ${allProjections}`;
