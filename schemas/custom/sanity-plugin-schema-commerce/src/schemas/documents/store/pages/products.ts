import { BsFillBagFill } from "react-icons/bs";
import { defineField, defineType, defineArrayMember } from "sanity";
import { isCStudio } from "../../../../sanity";

/** This document will replace the main product sections when ECWID ID is matched **/
export default defineType({
  name: "productSettings",
  title: "Products",
  icon: BsFillBagFill,
  type: "document",
  groups: [
    {
      name: "design",
      title: "Design",
      default: true,
    },
    {
      name: "seo",
      title: "SEO",
    },
  ],
  fields: [
    defineField({
      name: "defaultProductInfoVariant",
      title: "Default Product Info Variants",
      readOnly: isCStudio === "true" ? false : true,
      type: "defaultProductInfoVariant",
      group: "design",
    }),
    defineField({
      title: "Sections",
      name: "sections",
      description: `By default, a Slot Product Info component is
      added here as a placeholder. The sections added here will make up
      the common design of the individual Product pages in Store > Products`,
      readOnly: isCStudio === "true" ? false : true,
      type: "array",
      group: "design",
      of: [
        defineArrayMember({
          title: "Navigation",
          name: "navigation",
          type: "reference",
          to: [{ type: "navigation" }],
        }),
        defineArrayMember({
          title: "Header",
          name: "header",
          type: "reference",
          to: [{ type: "header" }],
        }),
        defineArrayMember({
          title: "Blog",
          name: "blog",
          type: "reference",
          to: [{ type: "blog" }],
        }),
        defineArrayMember({
          title: "App Promo",
          name: "appPromo",
          type: "reference",
          to: [{ type: "appPromo" }],
        }),
        defineArrayMember({
          title: "Call To Action",
          name: "callToAction",
          type: "reference",
          to: [{ type: "callToAction" }],
        }),
        defineArrayMember({
          title: "[SLOT] Product Info",
          name: "slotProductInfo",
          type: "reference",
          readOnly: true, // if the slotCollectionInfo is added here then make it readOnly so it won't be removed
          to: [{ type: "slotProductInfo" }],
        }),
        defineArrayMember({
          title: "Pricing",
          name: "pricing",
          type: "reference",
          to: [{ type: "pricing" }],
        }),
        defineArrayMember({
          title: "Contact",
          name: "contact",
          type: "reference",
          to: [{ type: "contact" }],
        }),
        defineArrayMember({
          title: "Cookies",
          name: "cookies",
          type: "reference",
          to: [{ type: "cookies" }],
        }),
        defineArrayMember({
          title: "Faqs",
          name: "faqs",
          type: "reference",
          to: [{ type: "faqs" }],
        }),
        defineArrayMember({
          title: "Features",
          name: "features",
          type: "reference",
          to: [{ type: "features" }],
        }),
        defineArrayMember({
          title: "How It Works",
          name: "howItWorks",
          type: "reference",
          to: [{ type: "howItWorks" }],
        }),
        defineArrayMember({
          title: "Logo Cloud",
          name: "logoCloud",
          type: "reference",
          to: [{ type: "logoCloud" }],
        }),
        defineArrayMember({
          title: "Newsletter",
          name: "newsletter",
          type: "reference",
          to: [{ type: "newsletter" }],
        }),
        defineArrayMember({
          title: "Portfolio",
          name: "portfolio",
          type: "reference",
          to: [{ type: "portfolio" }],
        }),
        defineArrayMember({
          title: "Statistics",
          name: "stats",
          type: "reference",
          to: [{ type: "stats" }],
        }),
        defineArrayMember({
          title: "Sign In Sign Up",
          name: "signInSignUp",
          type: "reference",
          to: [{ type: "signInSignUp" }],
        }),
        defineArrayMember({
          title: "Team",
          name: "team",
          type: "reference",
          to: [{ type: "team" }],
        }),
        defineArrayMember({
          title: "Testimonial",
          name: "testimonial",
          type: "reference",
          to: [{ type: "testimonial" }],
        }),
        defineArrayMember({
          title: "Text Component",
          name: "textComponent",
          type: "reference",
          to: [{ type: "textComponent" }],
        }),
        defineArrayMember({
          title: "Footer",
          name: "footer",
          type: "reference",
          to: [{ type: "footer" }],
        }),
      ],
    }),
    defineField({
      title: "SEO Settings",
      name: "seo",
      description:
        "This will be the common SEO for Products. To replace the default values, update the SEO Settings of a specific Product",
      readOnly: isCStudio === "true" ? false : true,
      type: "seoSettings",
      group: "seo",
    }),
  ],
  preview: {
    select: {
      subtitle: "sections.length",
    },
    prepare({ subtitle }) {
      return {
        title: "Default Products page",
        subtitle: `Added sections: ${subtitle}`,
      };
    },
  },
});
