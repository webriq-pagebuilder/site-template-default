import { FaRoute } from "react-icons/fa";
import { defineField, defineType } from "sanity";

export default defineType({
  title: "Link",
  name: "conditionalLink",
  type: "object",
  icon: FaRoute,
  fields: [
    defineField({
      title: "Label",
      name: "label",
      type: "string",
    }),
    defineField({
      title: "Select the link type",
      name: "linkType",
      initialValue: "linkInternal",
      type: "string",
      options: {
        list: [
          {
            title: "Internal, inside this website",
            value: "linkInternal",
          },
          {
            title: "External, outside this website",
            value: "linkExternal",
          },
        ],
        layout: "radio", // <-- leave out to make it a dropdown menu
      },
    }),
    defineField({
      title: "Page Reference",
      name: "linkInternal",
      type: "reference",
      to: [{ type: "page" }],
      hidden: ({ parent }) => parent?.linkType !== "linkInternal",
    }),
    defineField({
      name: "linkExternal",
      title: "URL",
      type: "url",
      validation: Rule => Rule.uri({
        scheme: ['http', 'https', 'mailto', 'tel'],
        allowRelative: true
      }),
      hidden: ({ parent }) => parent?.linkType !== "linkExternal",
    }),
    defineField({
      name: "linkTarget",
      title: "Link Target",
      type: "string",
      initialValue: "_self",
      hidden: ({ parent }) => {
        // hide link target when the internal and external links have not been set
        if (
          parent?.linkType === "linkInternal" &&
          !parent?.linkInternal?._ref
        ) {
          return true;
        }

        if (parent?.linkType === "linkExternal" && !parent?.linkExternal) {
          return true;
        }

        // also hide if the actual link type (internal / external) has not been selected
        if (!parent?.linkType) {
          return true;
        }

        return false;
      },
      options: {
        list: [
          {
            title:
              "Blank - open on a new tab (usually), but users can configure browsers to open a new window instead.",
            value: "_blank",
          },
          {
            title: "Self (default) - open in the same browsing context",
            value: "_self",
          },
        ],
        layout: "radio", // <-- leave out to make it a dropdown menu
      },
    }),
  ],
  preview: {
    select: {
      label: "label",
      type: "linkType",
      internalLink: "linkInternal",
      externalLink: "linkExternal",
    },
    prepare({ label, type, internalLink, externalLink }) {
      return {
        title: label,
        subtitle:
          type === "linkInternal"
            ? `${
                internalLink === undefined
                  ? "Internal Link Not Set"
                  : "Route: Reference to Page"
              }`
            : type === "linkExternal"
            ? `${
                externalLink === undefined
                  ? "External Link Not Set"
                  : externalLink
              }`
            : "Route: Not Added",
        media: FaRoute
      };
    },
  },
});
