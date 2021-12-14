import { groq } from "next-sanity";

const variant_a = `
  variant_a {
    ...,
    "featuredItems": arrayOfTitleAndDescription,
    "arrImages": images,
    primaryButton {
      ...,
      "type": linkType,
      "internalLink": linkInternal->slug.current,
      "externalLink": linkExternal
    },
    secondaryButton {
      ...,
      "type": linkType,
      "internalLink": linkInternal->slug.current,
      "externalLink": linkExternal
    },
    routes[] {
      ...,
      "type": linkType,
      "internalLink": linkInternal->slug.current,
      "externalLink": linkExternal
    },
    plans[] {
      ...,
      primaryButton {
        ...,
        "type": linkType,
        "internalLink": linkInternal->slug.current,
        "externalLink": linkExternal
      },
    },
    formLinks[] {
      ...,
      "type": linkType,
      "externalLink": linkExternal,
      "internalLink": linkInternal->slug.current
    },
    arrayOfTitleAndText[] {
      ...,
      "title": heading,
      "content": plainText
    },
    menu[] {
      ...,
      "type": linkType,
      "externalLink": linkExternal,
      "internalLink": linkInternal->slug.current
    },
    portfolios[] {
      ...,
      content[] {
        ...,
        primaryButton {
          ...,
          "type": linkType,
          "internalLink": linkInternal->slug.current,
          "externalLink": linkExternal
        },
      },
    },
    signinLink {
      ...,
      "type": linkType,
      "externalLink": linkExternal,
      "internalLink": linkInternal->slug.current
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
      "type": linkType,
      "internalLink": linkInternal->slug.current,
      "externalLink": linkExternal
    },
    primaryButton {
      ...,
      "type": linkType,
      "internalLink": linkInternal->slug.current,
      "externalLink": linkExternal
    },
    secondaryButton {
      ...,
      "type": linkType,
      "internalLink": linkInternal->slug.current,
      "externalLink": linkExternal
    },
    "featuredItems": arrayOfTitleAndDescription,
    plans[] {
      ...,
      primaryButton {
        ...,
        "type": linkType,
        "internalLink": linkInternal->slug.current,
        "externalLink": linkExternal
      },
    },
    formLinks[] {
      ...,
      "type": linkType,
      "externalLink": linkExternal,
      "internalLink": linkInternal->slug.current
    },
    menu[] {
      ...,
      "type": linkType,
      "externalLink": linkExternal,
      "internalLink": linkInternal->slug.current
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
        "type": linkType,
        "internalLink": linkInternal->slug.current,
        "externalLink": linkExternal
      },
    },
    signinLink {
      ...,
      "type": linkType,
      "externalLink": linkExternal,
      "internalLink": linkInternal->slug.current
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
      "type": linkType,
      "internalLink": linkInternal->slug.current,
      "externalLink": linkExternal
    },
    primaryButton {
      ...,
      "type": linkType,
      "internalLink": linkInternal->slug.current,
      "externalLink": linkExternal
    },
    secondaryButton {
      ...,
      "type": linkType,
      "internalLink": linkInternal->slug.current,
      "externalLink": linkExternal
    },
    "featuredItems": arrayOfTitleAndDescription,
    plans[] {
      ...,
      primaryButton {
        ...,
        "type": linkType,
        "internalLink": linkInternal->slug.current,
        "externalLink": linkExternal
      },
    },
    formLinks[] {
      ...,
      "type": linkType,
      "externalLink": linkExternal,
      "internalLink": linkInternal->slug.current
    },
    menu[] {
      ...,
      "type": linkType,
      "externalLink": linkExternal,
      "internalLink": linkInternal->slug.current
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
        "type": linkType,
        "internalLink": linkInternal->slug.current,
        "externalLink": linkExternal
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
      "type": linkType,
      "internalLink": linkInternal->slug.current,
      "externalLink": linkExternal
    },
    primaryButton {
      ...,
      "type": linkType,
      "internalLink": linkInternal->slug.current,
      "externalLink": linkExternal
    },  
    secondaryButton {
      ...,
      "type": linkType,
      "internalLink": linkInternal->slug.current,
      "externalLink": linkExternal
    },
    "arrImages": images,
    "featuredItems": arrayOfTitleAndDescription,
    formLinks[] {
      ...,
      "type": linkType,
      "externalLink": linkExternal,
      "internalLink": linkInternal->slug.current
    },
    menu[] {
      ...,
      "type": linkType,
      "externalLink": linkExternal,
      "internalLink": linkInternal->slug.current
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
          "type": linkType,
          "internalLink": linkInternal->slug.current,
          "externalLink": linkExternal
        },
      },
    },
    signinLink {
      ...,
      "type": linkType,
      "externalLink": linkExternal,
      "internalLink": linkInternal->slug.current
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
      "type": linkType,
      "internalLink": linkInternal->slug.current,
      "externalLink": linkExternal
    },
    secondaryButton {
      ...,
      "type": linkType,
      "internalLink": linkInternal->slug.current,
      "externalLink": linkExternal
    },
    formLinks[] {
      ...,
      "type": linkType,
      "externalLink": linkExternal,
      "internalLink": linkInternal->slug.current
    },
  },
`;

const variant_f = `
  variant_f {
    ...,
    primaryButton {
      ...,
      "type": linkType,
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
    variants {
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
  sections[] {
    ...,
    variants {
      ...,
      variant_a {
        ...,
        primaryButton {
          ...,
          "type": linkType,
          "internalLink": linkInternal->slug.current,
          "externalLink": linkExternal
        },
        secondaryButton {
          ...,
          "type": linkType,
          "internalLink": linkInternal->slug.current,
          "externalLink": linkExternal
        },
        routes[] {
          ...,
          "type": linkType,
          "internalLink": linkInternal->slug.current,
          "externalLink": linkExternal
        },
        menu[] {
          ...,
          "type": linkType,
          "externalLink": linkExternal,
          "internalLink": linkInternal->slug.current
        },
      },
      variant_b {
        ...,
        primaryButton {
          ...,
          "type": linkType,
          "internalLink": linkInternal->slug.current,
          "externalLink": linkExternal
        },
        secondaryButton {
          ...,
          "type": linkType,
          "internalLink": linkInternal->slug.current,
          "externalLink": linkExternal
        },
        routes[] {
          ...,
          "type": linkType,
          "internalLink": linkInternal->slug.current,
          "externalLink": linkExternal
        },
        menu[] {
          ...,
          "type": linkType,
          "externalLink": linkExternal,
          "internalLink": linkInternal->slug.current
        },
      },
      variant_c {
        ...,
        primaryButton {
          ...,
          "type": linkType,
          "internalLink": linkInternal->slug.current,
          "externalLink": linkExternal
        },
        secondaryButton {
          ...,
          "type": linkType,
          "internalLink": linkInternal->slug.current,
          "externalLink": linkExternal
        },
        routes[] {
          ...,
          "type": linkType,
          "internalLink": linkInternal->slug.current,
          "externalLink": linkExternal
        },
        menu[] {
          ...,
          "type": linkType,
          "externalLink": linkExternal,
          "internalLink": linkInternal->slug.current
        },
      },
      variant_d {
        ...,
        primaryButton {
          ...,
          "type": linkType,
          "internalLink": linkInternal->slug.current,
          "externalLink": linkExternal
        },
        secondaryButton {
          ...,
          "type": linkType,
          "internalLink": linkInternal->slug.current,
          "externalLink": linkExternal
        },
        routes[] {
          ...,
          "type": linkType,
          "internalLink": linkInternal->slug.current,
          "externalLink": linkExternal
        },
        menu[] {
          ...,
          "type": linkType,
          "externalLink": linkExternal,
          "internalLink": linkInternal->slug.current
        },
      },
    },
  },
}`;
