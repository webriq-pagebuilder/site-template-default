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
    categories[]->,
    footer->,
    navigation->
  }
`;
