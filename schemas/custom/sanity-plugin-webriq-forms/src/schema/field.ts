import { AiOutlineForm } from "react-icons/ai";

interface Parent {
  type?: string;
  hasFieldGroups?: boolean;
  pricingType?: string;
}

interface Document {
  _type: string;
}

export default {
  title: "WebriQ Form Field",
  name: "webriqFormField",
  icon: AiOutlineForm,
  type: "object",
  fields: [
    {
      name: "hasFieldGroups",
      title: "Has Field Groups",
      type: "boolean",
      description:
        "Check if this field has field groups (e.g., Business Information, Primary Contact)",
      initialValue: false,
    },
    {
      name: "name",
      title: "Name",
      type: "string",
      hidden: ({ parent }) => parent?.hasFieldGroups,
    },
    {
      name: "fieldGroups",
      title: "Field Groups",
      type: "array",
      hidden: ({ parent }) => !parent?.hasFieldGroups,
      of: [
        {
          title: "Field Group",
          type: "object",
          fields: [
            {
              name: "groupTitle",
              title: "Group Title",
              type: "string",
              description:
                "Title for this group of fields (e.g., Business Information, Primary Contact)",
            },
            {
              name: "fields",
              title: "Fields",
              type: "array",
              of: [
                {
                  type: "object",
                  title: "Field",
                  fields: [
                    {
                      name: "fieldLabel",
                      title: "Field Label",
                      type: "string",
                    },
                    {
                      name: "fieldType",
                      title: "Field Type",
                      type: "string",
                      options: {
                        list: [
                          { title: "Text", value: "text" },
                          { title: "Email", value: "email" },
                          { title: "Number", value: "number" },
                          { title: "Date", value: "date" },
                          { title: "Checkbox", value: "checkbox" },
                          { title: "Radio", value: "radio" },
                          { title: "Select", value: "select" },
                          { title: "Textarea", value: "textarea" },
                          { title: "Password", value: "password" },
                          { title: "URL", value: "url" },
                          { title: "Phone", value: "phone" },
                        ],
                        layout: "dropdown",
                      },
                    },
                    {
                      name: "isRequired",
                      title: "Required",
                      type: "boolean",
                      description: "Check if this field is required",
                      initialValue: false,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "placeholder",
      title: "Placeholder",
      type: "string",
      hidden: ({ parent }: { parent: Parent }) => {
        // hide the placeholder field for input types file, card, radio, checkbox and select
        if (
          parent.type === "inputRadio" ||
          parent.type === "inputSelect" ||
          parent.type === "inputCheckbox" ||
          parent.type === "inputFile" ||
          parent.pricingType === "inputCard" ||
          parent?.hasFieldGroups
        ) {
          return true;
        }

        return false;
      },
    },
    {
      name: "type",
      title: "Type",
      description: "Eg: text, textarea, file, etc.",
      type: "string",
      options: {
        list: [
          { title: "Text", value: "inputText" },
          { title: "Email", value: "inputEmail" },
          { title: "Password", value: "inputPassword" },
          { title: "Number", value: "inputNumber" },
          { title: "Textarea", value: "textarea" },
          { title: "File", value: "inputFile" },
          { title: "Radio", value: "inputRadio" },
          { title: "Checkbox", value: "inputCheckbox" },
          { title: "Select", value: "inputSelect" },
        ],
      },
      hidden: ({
        document,
        parent,
      }: {
        document: Document;
        parent: Parent;
      }) => {
        // Only show this field for other sections with a form
        // For the pricing section, use the pricingType field below
        if (document?._type === "pricing" || parent.hasFieldGroups) {
          return true;
        }
        return false;
      },
    },
    {
      name: "pricingType",
      title: "Type",
      description: "Eg: text, textarea, file, etc.",
      type: "string",
      options: {
        list: [
          { title: "Text", value: "inputText" },
          { title: "Email", value: "inputEmail" },
          { title: "Password", value: "inputPassword" },
          { title: "Number", value: "inputNumber" },
          { title: "Textarea", value: "textarea" },
          { title: "File", value: "inputFile" },
          { title: "Credit Card", value: "inputCard" },
          { title: "Radio", value: "inputRadio" },
          { title: "Checkbox", value: "inputCheckbox" },
          { title: "Select", value: "inputSelect" },
        ],
      },
      hidden: ({
        document,
        parent,
      }: {
        document: Document;
        parent: Parent;
      }) => {
        // Only show this field for pricing
        if (document?._type !== "pricing" || parent.hasFieldGroups) {
          return true;
        }
        return false;
      },
    },
    {
      name: "label",
      title: "Label (optional)",
      description:
        "Define the label for the field. Example: Choose from options",
      type: "string",
      hidden: ({ parent }: { parent: Parent }) => {
        if (
          parent.type === "inputRadio" ||
          parent.type === "inputSelect" ||
          parent.type === "inputCheckbox" ||
          parent.hasFieldGroups
        ) {
          return false;
        }

        return true;
      },
    },
    {
      name: "items",
      title: "Items",
      description: "Define the attribute values of selected type",
      type: "array",
      of: [{ type: "string" }],
      hidden: ({ parent }: { parent: Parent }) => {
        if (
          parent.type === "inputRadio" ||
          parent.type === "inputSelect" ||
          parent.type === "inputCheckbox" ||
          parent.hasFieldGroups
        ) {
          return false;
        }

        return true;
      },
    },
    {
      name: "isRequired",
      title: "Is this field Required?",
      hidden: ({ parent }) => parent?.hasFieldGroups,
      type: "boolean",
    },
  ],
  preview: {
    select: { title: "name" },
    prepare({ title }: { title?: string }) {
      return {
        title,
        media: AiOutlineForm,
      };
    },
  },
};
