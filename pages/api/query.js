import { groq } from "next-sanity";

const variant_a = `
  variant_a {
    ...,
    "featuredItems": arrayOfTitleAndDescription,
    "arrImages": images,
    primaryButton {
      ...,
      "type": link.condition,
      "internalLink": link.linkInternal->slug.current,
      "externalLink": link.linkExternal
    },
    secondaryButton {
      ...,
      "type": link.condition,
      "internalLink": link.linkInternal->slug.current,
      "externalLink": link.linkExternal
    },
    routes[] {
      ...,
      "type": link.condition,
      "internalLink": link.linkInternal->slug.current,
      "externalLink": link.linkExternal
    },
    plans[] {
      ...,
      primaryButton {
        ...,
        "type": link.condition,
        "internalLink": link.linkInternal->slug.current,
        "externalLink": link.linkExternal
      },
    },
    formLinks[] {
      ...,
      "type": link.condition,
      "externalLink": link.linkExternal,
      "internalLink": link.linkInternal->slug.current
    },
    arrayOfTitleAndText[] {
      ...,
      "title": heading,
      "content": plainText
    },
    menu[] {
      ...,
      "type": link.condition,
      "externalLink": link.linkExternal,
      "internalLink": link.linkInternal->slug.current
    },
    portfolios[] {
      ...,
      content[] {
        ...,
        primaryButton {
          ...,
          "type": link.condition,
          "internalLink": link.linkInternal->slug.current,
          "externalLink": link.linkExternal
        },
      },
    },
    signinLink {
      ...,
      "type": link.condition,
      "externalLink": link.linkExternal,
      "internalLink": link.linkInternal->slug.current
    },
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
`;

const variant_b = `
  variant_b {
    ...,
    "arrImages": images,
    routes[] {
      ...,
      "type": link.condition,
      "internalLink": link.linkInternal->slug.current,
      "externalLink": link.linkExternal
    },
    primaryButton {
      ...,
      "type": link.condition,
      "internalLink": link.linkInternal->slug.current,
      "externalLink": link.linkExternal
    },
    secondaryButton {
      ...,
      "type": link.condition,
      "internalLink": link.linkInternal->slug.current,
      "externalLink": link.linkExternal
    },
    "featuredItems": arrayOfTitleAndDescription,
    plans[] {
      ...,
      primaryButton {
        ...,
        "type": link.condition,
        "internalLink": link.linkInternal->slug.current,
        "externalLink": link.linkExternal
      },
    },
    formLinks[] {
      ...,
      "type": link.condition,
      "externalLink": link.linkExternal,
      "internalLink": link.linkInternal->slug.current
    },
    menu[] {
      ...,
      "type": link.condition,
      "externalLink": link.linkExternal,
      "internalLink": link.linkInternal->slug.current
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
        "type": link.condition,
        "internalLink": link.linkInternal->slug.current,
        "externalLink": link.linkExternal
      },
    },
    signinLink {
      ...,
      "type": link.condition,
      "externalLink": link.linkExternal,
      "internalLink": link.linkInternal->slug.current
    },
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
`;

const variant_c = `
  variant_c {
    ...,
    "arrImages": images,
    routes[] {
      ...,
      "type": link.condition,
      "internalLink": link.linkInternal->slug.current,
      "externalLink": link.linkExternal
    },
    primaryButton {
      ...,
      "type": link.condition,
      "internalLink": link.linkInternal->slug.current,
      "externalLink": link.linkExternal
    },
    secondaryButton {
      ...,
      "type": link.condition,
      "internalLink": link.linkInternal->slug.current,
      "externalLink": link.linkExternal
    },
    "featuredItems": arrayOfTitleAndDescription,
    plans[] {
      ...,
      primaryButton {
        ...,
        "type": link.condition,
        "internalLink": link.linkInternal->slug.current,
        "externalLink": link.linkExternal
      },
    },
    formLinks[] {
      ...,
      "type": link.condition,
      "externalLink": link.linkExternal,
      "internalLink": link.linkInternal->slug.current
    },
    menu[] {
      ...,
      "type": link.condition,
      "externalLink": link.linkExternal,
      "internalLink": link.linkInternal->slug.current
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
        "type": link.condition,
        "internalLink": link.linkInternal->slug.current,
        "externalLink": link.linkExternal
      },
    },
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
`;

const variant_d = `
  variant_d {
    ...,
    routes[] {
      ...,
      "type": link.condition,
      "internalLink": link.linkInternal->slug.current,
      "externalLink": link.linkExternal
    },
    primaryButton {
      ...,
      "type": link.condition,
      "internalLink": link.linkInternal->slug.current,
      "externalLink": link.linkExternal
    },  
    secondaryButton {
      ...,
      "type": link.condition,
      "internalLink": link.linkInternal->slug.current,
      "externalLink": link.linkExternal
    },
    "arrImages": images,
    "featuredItems": arrayOfTitleAndDescription,
    formLinks[] {
      ...,
      "type": link.condition,
      "externalLink": link.linkExternal,
      "internalLink": link.linkInternal->slug.current
    },
    menu[] {
      ...,
      "type": link.condition,
      "externalLink": link.linkExternal,
      "internalLink": link.linkInternal->slug.current
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
          "type": link.condition,
          "internalLink": link.linkInternal->slug.current,
          "externalLink": link.linkExternal
        },
      },
    },
    signinLink {
      ...,
      "type": link.condition,
      "externalLink": link.linkExternal,
      "internalLink": link.linkInternal->slug.current
    },  
    blogPosts[]->{
      ...,
      "link": slug.current,
      authors[]->{
        _id,
        name,
        bio,
        image,
        "link": slug.current,
      },
      categories[]->
    }       
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
      "type": link.condition,
      "internalLink": link.linkInternal->slug.current,
      "externalLink": link.linkExternal
    },
    secondaryButton {
      ...,
      "type": link.condition,
      "internalLink": link.linkInternal->slug.current,
      "externalLink": link.linkExternal
    },
    formLinks[] {
      ...,
      "type": link.condition,
      "externalLink": link.linkExternal,
      "internalLink": link.linkInternal->slug.current
    },
  },
`;

const variant_f = `
  variant_f {
    ...,
    primaryButton {
      ...,
      "type": link.condition,
      "internalLink": link.linkInternal->slug.current,
      "externalLink": link.linkExternal
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
    variants {
      ...,
      "variant": condition,
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
