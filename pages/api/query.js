import { groq } from "next-sanity";
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
      variant_a {
        ...,
        heading,
        description,
        logo,
        plainText,
        firstButton,
        secondButton,
        subtitle,
        url,
        copyright,
        socialLinks,
        "featuredItems": arrayOfTitleAndDescription,
        "arrImages": images,
        primaryButton {
          label,
          linkTarget,
          "type": link.condition,
          "internalLink": link.linkInternal->slug.current,
          "externalLink": link.linkExternal
        },
        secondaryButton {
          label,
          linkTarget,
          "type": link.condition,
          "internalLink": link.linkInternal->slug.current,
          "externalLink": link.linkExternal
        }, 
        routes[]{
          label,
          linkTarget,
          "type": link.condition,
          "internalLink": link.linkInternal->slug.current,
          "externalLink": link.linkExternal
        },
          
      plans[]{
        ...,
        primaryButton {
        label,
        linkTarget,
        "type": link.condition,
        "internalLink": link.linkInternal->slug.current,
        "externalLink": link.linkExternal
        },
      },
       form {
          id,
          name,
          fields[] {
            name,
            type
          }        
      }, 
      formLinks[] {
        label,
        linkTarget,
        "type": link.condition,
        "externalLink": link.linkExternal,
        "internalLink": link.linkInternal->slug.current
      },
      askedQuestions[] {
        answer,
        question
      },
      arrayOfTitleAndText[] {
        "title": heading,
        "content": plainText
      },
      statItems[] {
        label,
        value
      },
      contactDetails[] {
        addressInfo,
        contactInfo,
        emailInfo
      },
      menu[] {
        label,
        linkTarget,
        "type": link.condition,
        "externalLink": link.linkExternal,
        "internalLink": link.linkInternal->slug.current
      },        
    },
    variant_b {
      ...,
      heading,
      description,
      logo,
      socialLinks,
      "arrImages": images,
      routes[]{
        label,
        linkTarget,
        "type": link.condition,
        "internalLink": link.linkInternal->slug.current,
        "externalLink": link.linkExternal
      },
      primaryButton {
        label,
        linkTarget,
        "type": link.condition,
        "internalLink": link.linkInternal->slug.current,
        "externalLink": link.linkExternal
      },
      secondaryButton {
        label,
        linkTarget,
        "type": link.condition,
        "internalLink": link.linkInternal->slug.current,
        "externalLink": link.linkExternal
      },
      "featuredItems": arrayOfTitleAndDescription,
      plans[]{
        ...,
        primaryButton {
        label,
        linkTarget,
        "type": link.condition,
        "internalLink": link.linkInternal->slug.current,
        "externalLink": link.linkExternal
        },
      },
      form {
        id,
        name,
        fields[] {
          name,
          type
        }
      },
      formLinks[] {
        label,
        linkTarget,
        "type": link.condition,
        "externalLink": link.linkExternal,
        "internalLink": link.linkInternal->slug.current
      },
      statItems[] {
        label,
        value
      },
      faqsWithCategory[],
      menu[] {
        label,
        linkTarget,
        "type": link.condition,
        "externalLink": link.linkExternal,
        "internalLink": link.linkInternal->slug.current
      },
      arrayOfTitleAndText[] {
        "title": heading,
        "content": plainText
      },      
    },
    variant_c {
      ...,
      heading,
      copyright,
      plainText,
      socialLinks,
      "arrImages": images,
      routes[]{
        label,
        linkTarget,
        "type": link.condition,
        "internalLink": link.linkInternal->slug.current,
        "externalLink": link.linkExternal
      },
      primaryButton {
        label,
        linkTarget,
        "type": link.condition,
        "internalLink": link.linkInternal->slug.current,
        "externalLink": link.linkExternal
      },
      secondaryButton {
        label,
        linkTarget,
        "type": link.condition,
        "internalLink": link.linkInternal->slug.current,
        "externalLink": link.linkExternal
      },
      "featuredItems": arrayOfTitleAndDescription,
      plans[]{
        ...,
        primaryButton {
        label,
        linkTarget,
        "type": link.condition,
        "internalLink": link.linkInternal->slug.current,
        "externalLink": link.linkExternal
        },
      },
      logo,
      tags[],
      form {
        id,
        name,
        fields[] {
          name,
          type
        }
      },
      formLinks[] {
        label,
        linkTarget,
        "type": link.condition,
        "externalLink": link.linkExternal,
        "internalLink": link.linkInternal->slug.current
      },
      menu[] {
        label,
        linkTarget,
        "type": link.condition,
        "externalLink": link.linkExternal,
        "internalLink": link.linkInternal->slug.current
      },
      statItems[] {
        label,
        value
      },
      arrayOfTitleAndText[] {
        "title": heading,
        "content": plainText
      },      
    },
    variant_d {
      ...,
      heading,
      plainText,
      logo,
      tags[],
      socialLinks,
 
      routes[]{
        label,
        linkTarget,
        "type": link.condition,
        "internalLink": link.linkInternal->slug.current,
        "externalLink": link.linkExternal
      },
      primaryButton {
        label,
        linkTarget,
        "type": link.condition,
        "internalLink": link.linkInternal->slug.current,
        "externalLink": link.linkExternal
      },  
      secondaryButton {
        label,
        linkTarget,
        "type": link.condition,
        "internalLink": link.linkInternal->slug.current,
        "externalLink": link.linkExternal
      },
      "arrImages": images,
      "featuredItems": arrayOfTitleAndDescription,
      copyright,
      form {
        id,
        name,
        fields[] {
          name,
          type
        }
      },
      formLinks[] {
        label,
        linkTarget,
        "type": link.condition,
        "externalLink": link.linkExternal,
        "internalLink": link.linkInternal->slug.current
      },
      contactDetails[] {
        addressInfo,
        contactInfo,
        emailInfo
      },
      menu[] {
        label,
        linkTarget,
        "type": link.condition,
        "externalLink": link.linkExternal,
        "internalLink": link.linkInternal->slug.current
      },
      arrayOfTitleAndText[] {
        "title": heading,
        "content": plainText
      }     
    },
    variant_e {
      ...,
      subtitle,
      heading,
      arrayOfTitleAndText[] {
        "title": heading,
        "content": plainText
      },
      primaryButton {
        label,
        linkTarget,
        "type": link.condition,
        "internalLink": link.linkInternal->slug.current,
        "externalLink": link.linkExternal
      },
      secondaryButton {
        label,
        linkTarget,
        "type": link.condition,
        "internalLink": link.linkInternal->slug.current,
        "externalLink": link.linkExternal
      },
      formLinks[] {
        label,
        linkTarget,
        "type": link.condition,
        "externalLink": link.linkExternal,
        "internalLink": link.linkInternal->slug.current
      },
    },
    variant_f {
      ...,
      heading,
      images,
      firstButton,
      secondButton,
      primaryButton {
        label,
        linkTarget,
        "type": link.condition,
        "internalLink": link.linkInternal->slug.current,
        "externalLink": link.linkExternal
      },
    },
  }
}
}
`;

export const homeQuery = groq`
  *[_type == "page" && (slug.current == "home" || slug.current == "Home") ] ${allProjections}
`;

export const slugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] ${allProjections}
`;
