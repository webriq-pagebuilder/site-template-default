import { defaultImageArray, defaultSocialLinks, defaultImage } from "@webriq-pagebuilder/sanity-plugin-schema-default";
import { nanoid } from "nanoid";

export const initialValue = () => {
  return {
    subtitle: "Brille",
    images: defaultImageArray([
      "image-1b4ec5027684868d7dfae4a7eebd4b2181a452db-1128x1126-png",
      "image-6a2154724ba1f6d381782b84a92be456f4711ad8-260x260-png",
      "image-f54c036f71a52f1528a4f85574771999c9f15590-260x260-png",
      "image-cf5183207b47111501ef43c08f228d2cac77bba3-260x260-png",
    ]),
    productDetails: [
      {
        _key: nanoid(),
        blockContent: [
          {
            _key: nanoid(),
            _type: "block",
            children: [
              {
                _key: nanoid(),
                _type: "span",
                marks: [],
                text: "Summer collection and laoreet get",
              },
            ],
            markDefs: [],
            style: "h3",
          },
          {
            _key: nanoid(),
            _type: "block",
            children: [
              {
                _key: nanoid(),
                _type: "span",
                marks: [],
                text: "I had interdum at ante porta, eleifend feugiat nunc. In semper euismod mi a accums lorem sad. Morbi at auctor nibh. Aliquam tincidunt placerat mollis. Lorem euismod dignissim, felis tortor ollis eros, non ultricies turpis.",
              },
            ],
            markDefs: [],
            style: "normal",
          },
        ],
        contentType: "textOnly",
        tabName: "Description",
      },
      {
        _key: nanoid(),
        tabName: "Customer reviews",
      },
      {
        _key: nanoid(),
        tabName: "Shipping & returns",
      },
      {
        _key: nanoid(),
        tabName: "Brand",
      },
    ],
    socialLinks: defaultSocialLinks([
      {
        socialMedia: "other",
        socialMediaIcon: defaultImage(
          "image-d8a80a1dcaf6f729ba58f5f73fa81aac66a75e0a-48x48-png"
        ),
        socialMediaLink: "https://facebook.com",
        socialMediaPlatform: "Facebook",
      },
      {
        socialMedia: "other",
        socialMediaIcon: defaultImage(
          "image-f35437826c6054fcf8e1b3adb604e8c67b4fd398-48x48-png"
        ),
        socialMediaLink: "https://instagram.com",
        socialMediaPlatform: "Instagram",
      },
      {
        socialMedia: "other",
        socialMediaIcon: defaultImage(
          "image-b651ff0764c0ec2a49db93ca4320d534791bf501-48x48-png"
        ),
        socialMediaLink: "https://twitter.com",
        socialMediaPlatform: "Twitter",
      },
    ]),
    btnLabel: "ADD TO CART",
  };
};
