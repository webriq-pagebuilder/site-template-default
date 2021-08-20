import { groq } from "next-sanity";

const variant_a = `
  variant_a {
    ...,
    "featuredItems": arrayOfTitleAndDescription,
    "arrImages": images,
    primaryButton {
      ...,
      "internalLink": linkInternal->slug.current,
      "externalLink": linkExternal
    },
    secondaryButton {
      ...,
      "internalLink": linkInternal->slug.current,
      "externalLink": linkExternal
    },
    routes[] {
      ...,
      "internalLink": linkInternal->slug.current,
      "externalLink": linkExternal
    },
    plans[] {
      ...,
      primaryButton {
        ...,
        "internalLink": linkInternal->slug.current,
        "externalLink": linkExternal
      },
    },
    formLinks[] {
      ...,
      "internalLink": linkInternal->slug.current,
      "externalLink": linkExternal
    },
    arrayOfTitleAndText[] {
      ...,
      "title": heading,
      "content": plainText
    },
    menu[] {
      ...,
      "internalLink": linkInternal->slug.current,
      "externalLink": linkExternal
    },
    portfolios[] {
      ...,
      content[] {
        ...,
        primaryButton {
          ...,
          "internalLink": linkInternal->slug.current,
          "externalLink": linkExternal
        },
      },
    },
    signinLink {
      ...,
      "internalLink": linkInternal->slug.current,
      "externalLink": linkExternal
    },
  },
`;

const variant_b = `
  variant_b {
    ...,
    "arrImages": images,
    routes[] {
      ...,
      "internalLink": linkInternal->slug.current,
      "externalLink": linkExternal
    },
    primaryButton {
      ...,
      "internalLink": linkInternal->slug.current,
      "externalLink": linkExternal
    },
    secondaryButton {
      ...,
      "internalLink": linkInternal->slug.current,
      "externalLink": linkExternal
    },
    "featuredItems": arrayOfTitleAndDescription,
    plans[] {
      ...,
      primaryButton {
        ...,
        "internalLink": linkInternal->slug.current,
        "externalLink": linkExternal
      },
    },
    formLinks[] {
      ...,
      "internalLink": linkInternal->slug.current,
      "externalLink": linkExternal
    },
    menu[] {
      ...,
      "internalLink": linkInternal->slug.current,
      "externalLink": linkExternal
    },
    arrayOfTitleAndText[] {
      ...,
      "title": heading,
      "content": plainText
    },
    portfolios[] {
      ...,
      primaryButton {
        ...,
        "internalLink": linkInternal->slug.current,
        "externalLink": linkExternal
      },
    },
    signinLink {
      ...,
      "internalLink": linkInternal->slug.current,
      "externalLink": linkExternal
    },
  },
`;

const variant_c = `
  variant_c {
    ...,
    "arrImages": images,
    routes[] {
      ...,
      "internalLink": linkInternal->slug.current,
      "externalLink": linkExternal
    },
    primaryButton {
      ...,
      "internalLink": linkInternal->slug.current,
      "externalLink": linkExternal
    },
    secondaryButton {
      ...,
      "internalLink": linkInternal->slug.current,
      "externalLink": linkExternal
    },
    "featuredItems": arrayOfTitleAndDescription,
    plans[] {
      ...,
      primaryButton {
        ...,
        "internalLink": linkInternal->slug.current,
        "externalLink": linkExternal
      },
    },
    formLinks[] {
      ...,
      "internalLink": linkInternal->slug.current,
      "externalLink": linkExternal
    },
    menu[] {
      ...,
      "internalLink": linkInternal->slug.current,
      "externalLink": linkExternal
    },
    arrayOfTitleAndText[] {
      ...,
      "title": heading,
      "content": plainText
    },
    portfolios[] {
      ...,
      primaryButton {
        ...,
        "internalLink": linkInternal->slug.current,
        "externalLink": linkExternal
      },
    },      
  },
`;

const variant_d = `
  variant_d {
    ...,
    routes[] {
      ...,
      "internalLink": linkInternal->slug.current,
      "externalLink": linkExternal
    },
    primaryButton {
      ...,
      "internalLink": linkInternal->slug.current,
      "externalLink": linkExternal
    }, 
    secondaryButton {
      ...,
      "internalLink": linkInternal->slug.current,
      "externalLink": linkExternal
    },
    "arrImages": images,
    "featuredItems": arrayOfTitleAndDescription,
    formLinks[] {
      ...,
      "internalLink": linkInternal->slug.current,
      "externalLink": linkExternal
    },
    menu[] {
      ...,
      "internalLink": linkInternal->slug.current,
      "externalLink": linkExternal
    },
    arrayOfTitleAndText[] {
      ...,
      "title": heading,
      "content": plainText
    },
    portfolios[] {
      ...,
      content[] {
        ...,
        primaryButton {
          ...,
          "internalLink": linkInternal->slug.current,
          "externalLink": linkExternal
        },
      },
    },
    signinLink {
      ...,
      "internalLink": linkInternal->slug.current,
      "externalLink": linkExternal
    },     
  },
`;

const variant_e = `
  variant_e {
    ...,
    arrayOfTitleAndText[] {
      ...,
      "title": heading,
      "content": plainText
    },
    primaryButton {
      ...,
      "internalLink": linkInternal->slug.current,
      "externalLink": linkExternal
    },
    secondaryButton {
      ...,
      "internalLink": linkInternal->slug.current,
      "externalLink": linkExternal
    },
    formLinks[] {
      ...,
      "internalLink": linkInternal->slug.current,
      "externalLink": linkExternal
    },
  },
`;

const variant_f = `
  variant_f {
    ...,
    primaryButton {
      ...,
      "internalLink": linkInternal->slug.current,
      "externalLink": linkExternal
    },
  },
`;

const allProjections = `
{
  ...,
  _id,
  title,
  "slug": slug.current,
  sections[] {
    ...,
    content {
      ...,
      ${variant_a}
      ${variant_b}
      ${variant_c}
      ${variant_d}
      ${variant_e}
      ${variant_f}
    },
  },
}
`;

export const homeQuery = groq`
  *[_type == "page" && (slug.current == "home" || slug.current == "Home") ] ${allProjections}
`;

export const slugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] ${allProjections}
`;
