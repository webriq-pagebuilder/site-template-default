import {
  BsCardChecklist,
  BsCardImage,
  BsPerson,
  BsListCheck,
} from "react-icons/bs";

type DocumentProps = {
  document: {
    variant: string;
  };
};

type ParentProps = {
  parent: {
    linkType: string;
    linkInternal: {
      _ref: string;
    };
    linkExternal: string;
    socialMedia: string;
  };
};

export const signInLink = (
  hidden?: ({ document }: DocumentProps) => boolean
) => {
  return {
    name: "signInLink",
    title: "Sign In link",
    hidden,
    description: "Add an internal or external link for the Sign In page",
    type: "conditionalLink",
  };
};

export const external_link = (
  hidden?: ({ document }: DocumentProps) => boolean
) => {
  return {
    name: "external_link",
    title: "External Link",
    hidden,
    type: "object",
    fields: [
      {
        name: "text",
        title: "Display Text",
        type: "string",
      },
      {
        name: "external_link",
        description:
          "When this link is clicked it will redirect to whatever the user provided on this link",
        title: "External Link",
        type: "url",
      },
    ],
  };
};

export const internal_link = (
  hidden?: ({ document }: DocumentProps) => boolean
) => {
  return {
    name: "internal_link",
    title: "Internal Link",
    hidden,
    type: "object",
    fields: [
      {
        name: "text",
        title: "Display Text",
        type: "string",
      },
      {
        name: "internal_link",
        description:
          "When this link is clicked it will redirect to whatever the user provided in page",
        title: "Internal Link",
        type: "reference",
        to: [{ type: "page" }],
      },
    ],
  };
};

export const subtitle = (hidden?: ({ document }: DocumentProps) => boolean) => {
  return {
    name: "subtitle",
    title: "Subtitle",
    description: "Add a subtitle by typing in the text field below",
    hidden,
    placeholder: "A small text above your title",
    type: "string",
  };
};

export const title = (hidden?: ({ document }: DocumentProps) => boolean) => {
  return {
    name: "title",
    title: "Title",
    description: "Add a title by typing in the text field below",
    hidden,
    placeholder: "Build & Launch without problems",
    type: "string",
  };
};

export const description = (
  hidden?: ({ document }: DocumentProps) => boolean
) => {
  return {
    name: "description",
    title: "Description",
    description: "Add a description by typing in the text field below",
    hidden,
    placeholder:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur nisl sodales egestas lobortis.",
    type: "text",
  };
};

export const blockContent = (
  hidden?: ({ document }: DocumentProps) => boolean
) => {
  return {
    name: "blockContent",
    title: "Content",
    hidden,
    type: "array",
    of: [{ type: "block" }],
  };
};

export const arrayOfTitleAndDescription = (
  displayTitle: string,
  displayDescription: string,
  hidden?: ({ document }: DocumentProps) => boolean
) => {
  return {
    title: displayTitle,
    name: "arrayOfTitleAndDescription",
    description: displayDescription,
    hidden,
    type: "array",
    of: [
      {
        type: "object",
        icon: BsCardChecklist,
        title: "Features",
        fields: [title(), description()],
        preview: {
          select: {
            title: "title",
            subtitle: "description",
          },
          prepare({ title, subtitle }: { title: string; subtitle: string }) {
            return {
              title,
              subtitle,
              media: BsCardChecklist,
            };
          },
        },
      },
    ],
  };
};

export const arrayOfTitleAndText = (
  displayTitle: string,
  displayDescription: string,
  hidden?: ({ document }: DocumentProps) => boolean
) => {
  return {
    name: "arrayOfTitleAndText",
    title: displayTitle,
    description: displayDescription,
    hidden,
    type: "array",
    of: [
      {
        type: "object",
        fields: [title(), plainText()],
      },
    ],
  };
};

export const arrayOfImageTitleAndText = (
  displayTitle: string,
  displayDescription: string,
  hidden?: ({ document }: DocumentProps) => boolean
) => {
  return {
    name: "arrayOfImageTitleAndText",
    title: displayTitle,
    description: displayDescription,
    hidden,
    type: "array",
    of: [
      {
        type: "object",
        fields: [mainImage(), title(), plainText()],
      },
    ],
  };
};

export const plainText = (
  hidden?: ({ document }: DocumentProps) => boolean
) => {
  return {
    name: "plainText",
    title: "Plain text",
    hidden,
    description: "Add a block of text as content.",
    type: "text",
  };
};

export const blockContentNormalStyle = (
  name: string,
  title: string,
  description: string,
  hidden?: ({ document }: DocumentProps) => boolean
) => {
  return {
    name: name,
    title: title,
    description: description,
    hidden,
    type: "array",
    of: [
      {
        type: "block",
        styles: [{ title: "Normal", value: "normal" }],
        lists: [],
      },
    ],
  };
};

export const primaryButton = (
  hidden?: ({ document }: DocumentProps) => boolean
) => {
  return {
    name: "primaryButton",
    title: "Primary Button",
    hidden,
    description:
      "Click ▶ above to expand and fill out the details to add a primary button.",
    type: "conditionalLink",
    options: {
      collapsible: true,
      collapsed: true,
    },
  };
};

export const secondaryButton = (
  hidden?: ({ document }: DocumentProps) => boolean
) => {
  return {
    name: "secondaryButton",
    title: "Secondary Button",
    hidden,
    type: "conditionalLink",
    description:
      "Click ▶ above to expand and fill out the details to add a secondary button.",
    options: {
      collapsible: true,
      collapsed: true,
    },
  };
};

// Use this schema for adding 1 image only
export const mainImage = (
  hidden?: ({ document }: DocumentProps) => boolean
) => {
  return {
    title: "Add an Image",
    name: "mainImage",
    description: "Fill out the details to add the main image.",
    hidden,
    type: "object",
    fields: [
      {
        name: "image",
        description:
          "Add from your computer (click 'Upload' button), this studio (click 'Browse' button) or by doing a drag/paste of the image.",
        type: "image",
        options: { hotspot: true },
      },
      {
        name: "alt",
        title: "Alternative Text",
        description:
          "Add the text to display when the image can't be loaded or is unavailable.",
        type: "string",
      },
    ],
  };
};

// Use this schema for adding more than 1 image
export const arrayOfImages = (
  hidden?: ({ document }: DocumentProps) => boolean
) => {
  return {
    name: "images",
    title: "Images Array",
    description:
      "Click the 'Add item' button to add images. If you want to edit added images, click this ⋮ icon found on the bottom right of item.",
    type: "array",
    hidden,
    of: [
      {
        name: "item",
        icon: BsCardImage,
        type: "object",
        fields: [
          {
            name: "image",
            title: "Image",
            description:
              "Add from your computer (click 'Upload' button), this studio (click 'Browse' button) or by doing a drag/paste of the image.",
            type: "image",
            options: {
              hotspot: true,
            },
          },
          {
            name: "alt",
            title: "Alternative text",
            description:
              "Add the text to display when the image can't be loaded or is unavailable.",
            type: "string",
          },
        ],
        preview: {
          select: {
            title: "alt",
            media: "image",
          },
          prepare({ title, media }: { title: string; media: any }) {
            return {
              title,
              media: !media ? BsCardImage : media,
            };
          },
        },
      },
    ],
    options: { layout: "grid" },
  };
};

export const logo = (hidden?: ({ document }: DocumentProps) => boolean) => {
  return {
    name: "logo",
    title: "Logo",
    description: "Fill out the details to add a logo.",
    hidden,
    type: "object",
    fieldsets: [
      {
        name: "link",
        title: "Logo link",
        description:
          "Add the link or page to redirect to when the logo is clicked.",
        options: {
          collapsible: false, // makes the whole fieldset collapsible
          collapsed: true, // starts as collapsed
        },
      },
    ],
    fields: [
      {
        name: "image",
        title: "Image",
        description:
          "Add from your computer (click 'Upload' button), this studio (click 'Browse' button) or by doing a drag/paste of the image.",
        type: "image",
        options: {
          hotspot: true,
        },
      },
      {
        name: "alt",
        title: "Alternative text",
        description:
          "Add the text to display when the image can't be loaded or is unavailable.",
        type: "string",
        initialValue: "Logo",
      },
      // Logo link fields
      {
        title: "Select the link type",
        name: "linkType",
        initialValue: "linkInternal",
        fieldset: "link",
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
        fieldset: "link",
        type: "reference",
        to: [{ type: "page" }],
        hidden: ({ parent }: ParentProps) =>
          parent?.linkType !== "linkInternal",
      },
      {
        name: "linkExternal",
        title: "URL",
        fieldset: "link",
        type: "url",
        validation: false,
        hidden: ({ parent }: ParentProps) =>
          parent?.linkType !== "linkExternal",
      },
      {
        name: "linkTarget",
        title: "Link Target",
        fieldset: "link",
        type: "string",
        initialValue: "_self",
        hidden: ({ parent }: ParentProps) => {
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
              description: "Clicking the added link will open it in a new tab.",
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
  };
};

export const socialLinks = (
  hidden?: ({ document }: DocumentProps) => boolean
) => {
  return {
    name: "socialLinks",
    title: "Social Links",
    description:
      "Click the 'Add item' button to add your social accounts. If you want to edit what is added, click this ⋮ icon found on its right.",
    type: "array",
    hidden,
    of: [
      {
        type: "object",
        name: "details",
        icon: BsPerson,
        fields: [
          {
            title: "Select the social media platform",
            name: "socialMedia",
            type: "string",
            options: {
              list: [
                { title: "Facebook", value: "facebook" },
                { title: "Twitter", value: "twitter" },
                { title: "Instagram", value: "instagram" },
                { title: "Other", value: "other" },
              ],
            },
          },
          {
            name: "socialMediaPlatform",
            title: "Social Media Platform",
            description:
              "Add another social media platform not in the default list. Example: LinkedIn",
            type: "string",
            hidden: ({ parent }: ParentProps) =>
              parent?.socialMedia !== "other",
          },
          {
            name: "socialMediaIcon",
            title: "Social Media Icon",
            description:
              "Add the image to identify this social media platform.",
            hidden: ({ parent }: ParentProps) =>
              parent?.socialMedia !== "other",
            type: "object",
            fields: [
              {
                name: "image",
                description:
                  "Add from your computer (click 'Upload' button), this studio (click 'Browse' button) or by doing a drag/paste of the image.",
                type: "image",
                options: { hotspot: true },
              },
              {
                name: "alt",
                title: "Alternative Text",
                description:
                  "Add the text to display when the image can't be loaded or is unavailable.",
                type: "string",
              },
            ],
          },
          {
            name: "socialMediaLink",
            title: "Social Media Link",
            description: "Add the link to your social media account",
            type: "url",
          },
        ],
        preview: {
          select: {
            title: "socialMedia",
            socialMediaPlatform: "socialMediaPlatform",
            media: "image",
          },
          prepare({
            title,
            socialMediaPlatform,
            media,
          }: {
            title: string;
            socialMediaPlatform: string;
            media: any;
          }) {
            if (title === "other") {
              return {
                title: socialMediaPlatform,
                media: !media ? BsPerson : media,
              };
            } else {
              return {
                title,
                media: BsPerson,
              };
            }
          },
        },
      },
    ],
  };
};

export const arrayOfText = (
  name: string,
  displayTitle: string,
  displayDescription: string,
  displayPlaceholder: string,
  hidden?: ({ document }: DocumentProps) => boolean
) => {
  return {
    name: name ?? "arrayOfText",
    title: displayTitle ?? "Array of text contents",
    hidden,
    description:
      displayDescription ??
      "Click the 'Add item' button to add text contents. If you want to edit what is added, click this ⋮ icon found on its right.",
    placeholder: displayPlaceholder,
    type: "array",
    of: [
      {
        type: "string",
      },
    ],
  };
};

export const ctaForm = (hidden?: ({ document }: DocumentProps) => boolean) => {
  return {
    title: "Call to Action Form",
    name: "ctaForm",
    hidden,
    description: "Specify the fields you want to show in your forms.",
    type: "webriqForm",
  };
};

export const routes = (hidden?: ({ document }: DocumentProps) => boolean) => {
  return {
    title: "Add Routes",
    description:
      "Click the 'Add item' button to add navigation menu. If you want to edit what is added, click this ⋮ icon found on its right.",
    name: "routes",
    type: "array",
    hidden,
    options: {
      collapsible: true,
      collapsed: true,
    },
    of: [{ type: "conditionalLink" }],
  };
};

export const blockOfText = (
  hidden?: ({ document }: DocumentProps) => boolean
) => {
  return {
    name: "block",
    title: "Add block of text",
    description: "Add statement to allow user to accept terms and policies.",
    type: "array",
    hidden,
    of: [
      {
        type: "block",
        styles: [{ title: "Normal", value: "normal" }],
        lists: [],
        marks: {
          decorators: [
            { title: "Strong", value: "strong" },
            { title: "Emphasis", value: "em" },
            { title: "Underline", value: "underline" },
          ],
        },
      },
    ],
  };
};

export const featuredItems = (
  hidden?: ({ document }: DocumentProps) => boolean
) => {
  return {
    name: "featuredItems",
    title: "Features",
    description:
      "Click the 'Add item' button to add a feature. If you want to edit added features, click this ⋮ icon found on its right.",
    type: "array",
    hidden,
    of: [
      {
        title: "Features",
        name: "items",
        type: "object",
        fields: [subtitle(), title(), description(), mainImage()],
      },
    ],
  };
};

export const youtubeLink = (
  hidden?: ({ document }: DocumentProps) => boolean
) => {
  return {
    title: "Youtube URL",
    name: "youtubeLink",
    description: "Add the youtube video url",
    hidden,
    type: "url",
  };
};

export const rating = (hidden?: ({ document }: DocumentProps) => boolean) => {
  return {
    title: "Rating",
    name: "rating",
    description: "Select rating from the dropdown list.",
    hidden,
    type: "string",
    options: {
      list: [
        { title: "1", value: "1" },
        { title: "2", value: "2" },
        { title: "3", value: "3" },
        { title: "4", value: "4" },
        { title: "5", value: "5" },
      ],
    },
  };
};

export const products = (args) => {
  const { hidden, ...rest } = args;
  return {
    name: "products",
    title: "Products",
    description:
      "Click the 'Add item' button to add products. To edit what is added, click this ⋮ icon found on its right.",
    type: "array",
    of: [{ type: "reference", to: { type: "mainProduct" } }],
    hidden,
    ...rest,
  };
};

export const featuredProducts = (
  hidden?: ({ document }: DocumentProps) => boolean
) => {
  return {
    name: "featured",
    title: "Featured Products",
    description:
      "Click the 'Add item' button to add products. If you want to edit, click this ⋮ icon found on the bottom right of item.",
    type: "array",
    of: [{ type: "reference", to: [{ type: "mainProduct" }] }],
    hidden,
  };
};

export const promotions = (
  hidden?: ({ document }: DocumentProps) => boolean
) => {
  return {
    name: "promotions",
    title: "Promos",
    description: "Add product promotions or links to warranty statement",
    type: "object",
    hidden,
    fields: [
      logo(),
      {
        name: "title",
        title: "Title",
        type: "string",
      },
      {
        name: "statement",
        title: "Statement",
        type: "text",
      },
      {
        name: "cta",
        title: "Call to action",
        description: "Add CTA button",
        type: "conditionalLink",
      },
    ],
    preview: {
      select: {
        title: "title",
        subtitle: "statement",
        media: "icon.image",
      },
    },
  };
};

export const productDetails = (
  hidden?: ({ document }: DocumentProps) => boolean
) => {
  return {
    name: "productDetails",
    title: "Product details",
    hidden,
    type: "array",
    of: [
      {
        type: "object",
        icon: BsListCheck,
        fields: [
          {
            name: "tabName",
            title: "Tab name",
            description: "Add the tab name which shows product specifics",
            type: "string",
          },
          {
            name: "contentType",
            title: "Content type",
            description: "Select content type",
            type: "string",
            options: {
              list: [
                { title: "Text only", value: "textOnly" },
                { title: "Media only", value: "mediaOnly" },
                { title: "Text with Media", value: "textWithMedia" },
                {
                  title:
                    "Reviews (this will fetch data via API to display on the website)",
                  value: "reviews",
                },
              ],
              layout: "radio",
            },
          },
          {
            name: "media",
            title: "Media",
            description: "Select media type to add for this product detail",
            hidden: ({ parent }: { parent: { contentType: string } }) => {
              if (parent?.contentType === "mediaOnly") {
                return false;
              } else if (parent?.contentType === "textWithMedia") {
                return false;
              } else {
                return true;
              }
            },
            type: "string",
            options: {
              list: [
                { title: "Images", value: "imageArray" },
                { title: "Embeds (e.g. YouTube, Podcast)", value: "embeds" },
              ],
              layout: "radio",
            },
          },
          arrayOfImages(({ parent }) => {
            if (parent?.contentType === "mediaOnly") {
              return false;
            } else if (parent?.contentType === "textWithMedia") {
              return false;
            } else {
              return true;
            }
          }),
          {
            name: "url",
            title: "URL",
            description:
              "Add the URL of the media to embed (e.g. YouTube link)",
            hidden: ({ parent }: { parent: { media: string } }) =>
              parent?.media !== "embeds",
            type: "url",
          },
          blockContent(({ parent }) => {
            if (parent?.contentType === "textOnly") {
              return false;
            } else if (parent?.contentType === "textWithMedia") {
              return false;
            } else {
              return true;
            }
          }),
        ],
        preview: {
          select: {
            title: "tabName",
          },
          prepare({ title }: { title: string }) {
            return {
              title,
              media: BsListCheck,
            };
          },
        },
      },
    ],
  };
};
