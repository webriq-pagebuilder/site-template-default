import { groq } from "next-sanity"
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
          pageAccess,
          "type": link.condition,
          "internalLink": link.linkInternal->slug.current,
          "externalLink": link.linkExternal
        },
        secondaryButton {
          label,
          pageAccess,
          "type": link.condition,
          "internalLink": link.linkInternal->slug.current,
          "externalLink": link.linkExternal
        }, 
        routes[]{
          label,
          pageAccess,
          "type": link.condition,
          "internalLink": link.linkInternal->slug.current,
          "externalLink": link.linkExternal
        },
          
      plans[]{
        ...,
        primaryButton {
        label,
        pageAccess,
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
        pageAccess,
        "type": link.condition,
        "internalLink": link.linkInternal->slug.current,
        "externalLink": link.linkExternal
      },
      primaryButton {
        label,
        pageAccess,
        "type": link.condition,
        "internalLink": link.linkInternal->slug.current,
        "externalLink": link.linkExternal
      },
      secondaryButton {
        label,
        pageAccess,
        "type": link.condition,
        "internalLink": link.linkInternal->slug.current,
        "externalLink": link.linkExternal
      },
      "featuredItems": arrayOfTitleAndDescription,
      plans[]{
        ...,
        primaryButton {
        label,
        pageAccess,
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
        pageAccess,
        "type": link.condition,
        "internalLink": link.linkInternal->slug.current,
        "externalLink": link.linkExternal
      },
      primaryButton {
        label,
        pageAccess,
        "type": link.condition,
        "internalLink": link.linkInternal->slug.current,
        "externalLink": link.linkExternal
      },
      secondaryButton {
        label,
        pageAccess,
        "type": link.condition,
        "internalLink": link.linkInternal->slug.current,
        "externalLink": link.linkExternal
      },
      "featuredItems": arrayOfTitleAndDescription,
      plans[]{
        ...,
        primaryButton {
        label,
        pageAccess,
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
        "type": link.condition,
        "externalLink": link.linkExternal,
        "internalLink": link.linkInternal->slug.current
      },
      menu[] {
        label,
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
        pageAccess,
        "type": link.condition,
        "internalLink": link.linkInternal->slug.current,
        "externalLink": link.linkExternal
      },
      primaryButton {
        label,
        pageAccess,
        "type": link.condition,
        "internalLink": link.linkInternal->slug.current,
        "externalLink": link.linkExternal
      },  
      secondaryButton {
        label,
        pageAccess,
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
        pageAccess,
        "type": link.condition,
        "internalLink": link.linkInternal->slug.current,
        "externalLink": link.linkExternal
      },
      secondaryButton {
        label,
        pageAccess,
        "type": link.condition,
        "internalLink": link.linkInternal->slug.current,
        "externalLink": link.linkExternal
      },
      formLinks[] {
        label,
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
    },
  }
}
}
`

export const homeQuery = groq`
  *[_type == "page" && (slug.current == "home" || slug.current == "Home") ] ${allProjections}
`

export const slugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] ${allProjections}
`
