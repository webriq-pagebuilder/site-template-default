import WebriqFormInputComponent from "../components/WebriQFormInputComponent";
interface Parent {
  linkInternal?: any;
  linkType?: string;
  linkExternal?: string;
}

export default {
  title: "WebriQ Form",
  name: "webriqForm",
  type: "object",
  fields: [
    {
      name: "id",
      title: "Form ID",
      description: "Click the button to generate one.",
      type: "string",
      components: {
        input: WebriqFormInputComponent
      },
    },
    {
      name: "subtitle",
      title: "Subtitle (optional)",
      description: "Example: Sign Up to get started",
      type: "string",
    },
    {
      name: "name",
      title: "Name (optional)",
      description: "Example: Create an Account",
      type: "string",
    },
    {
      name: "fields",
      title: "Fields",
      description: "E.g. a contact form: Email, Message, etc.",
      type: "array",
      of: [{ type: "webriqFormField" }],
    },
    {
      name: "buttonLabel",
      title: "Button Label",
      description: "E.g. Submit",
      type: "string",
    },
    {
      name: "thankYouPage",
      title: "Thank You page",
      description:
        "Click ▶ above to expand and add the thank you page to redirect after submitting form.",
      type: "object",
      fields: [
        {
          title: "Select the link type",
          name: "linkType",
          type: "string",
          options: {
            list: [
              {
                title: "Internal, inside this website",
                description: "Reference inside documents",
                value: "linkInternal",
              },
              {
                title: "External, outside this website",
                value: "linkExternal",
                description: "Takes you outside the world",
              },
            ],
            layout: "radio", // <-- leave out to make it a dropdown menu
          },
        },
        {
          title: "Page Reference",
          name: "linkInternal",
          type: "reference",
          to: [{ type: "page" }],
          hidden: ({ parent }: { parent: Parent }) => parent?.linkType !== "linkInternal",
        },
        {
          name: "linkExternal",
          title: "URL",
          type: "url",
          validation: false,
          hidden: ({ parent }: { parent: Parent }) => parent?.linkType !== "linkExternal",
        },
        {
          name: "linkTarget",
          title: "Link Target",
          type: "string",
          hidden: ({ parent }: { parent: Parent }) => {
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
                description:
                  "Clicking the added link will open it in a new tab.",
                value: "_blank",
              },
              {
                title: "Self (default) - open in the same browsing context",
                description: "Clicking the link will open it on the same tab.",
                value: "_self",
              },
            ],
            layout: "radio", // <-- leave out to make it a dropdown menu
          },
        },
      ],
    },
  ],
};
