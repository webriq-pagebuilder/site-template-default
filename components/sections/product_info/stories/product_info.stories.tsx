import type { Meta, StoryObj } from "@storybook/react";
import { Sections, Variants } from "types";
import ProductInfo from "../index";
import { EcwidContextProvider } from "context/EcwidContext";

const args = {
  subtitle: "Yellow Dress",
  images: [
    {
      image: {
        asset: {
          _ref: "image-68925d2831f3d2a863ee277f1cbb3169364888a5-346x500-jpg",
          _type: "reference",
        },
      },

      _key: "zTUJwGIUCHzxEV-rDjig9",
    },
  ],
  productDetails: [
    {
      tabName: "Description",
      blockContent: [
        {
          _type: "block",
          style: "h3",
          _key: "MKHNcpMEc8bF_fwb5ZDL2",
          markDefs: [],
          children: [
            {
              _type: "span",
              marks: [],
              text: "Summer collection and laoreet get",
              _key: "Z_uz3Tx4gv4gt0FWNvElD",
            },
          ],
        },
        {
          markDefs: [],
          children: [
            {
              _type: "span",
              marks: [],
              text: "I had interdum at ante porta, eleifend feugiat nunc. In semper euismod mi a accums lorem sad. Morbi at auctor nibh. Aliquam tincidunt placerat mollis. Lorem euismod dignissim, felis tortor ollis eros, non ultricies turpis.",
              _key: "HLTMSS4S5-CAZMmhokDsI",
            },
          ],
          _type: "block",
          style: "normal",
          _key: "O2ump2cyL7W8T2eIkvvMg",
        },
      ],
      _key: "LV1mGnN7QDBeEbALBg9_J",
      contentType: "textOnly",
    },
    {
      tabName: "Customer reviews",
      _key: "q-PYZmlXu_4nr1oh7lQCc",
    },
    {
      _key: "tCPIyJkBHwkgJdXD-OqwX",
      tabName: "Shipping & returns",
    },
    {
      tabName: "Brand",
      _key: "U5vHuLNpLyJgCTGg37EgZ",
    },
  ],
  socialLinks: [
    {
      socialMediaIcon: {
        image: {
          asset: {
            _ref: "image-d8a80a1dcaf6f729ba58f5f73fa81aac66a75e0a-48x48-png",
            _type: "reference",
          },
        },
      },
      socialMediaLink: "https://facebook.com",
      _key: "m4apAWT5jVmSqDW_M8sFD",
      socialMedia: "other",
      socialMediaPlatform: "Facebook",
    },
    {
      _key: "hoBuACxqfIiZi6cI9RG_8",
      socialMedia: "other",
      socialMediaPlatform: "Instagram",

      socialMediaIcon: {
        image: {
          asset: {
            _ref: "image-f35437826c6054fcf8e1b3adb604e8c67b4fd398-48x48-png",
            _type: "reference",
          },
        },
      },
      socialMediaLink: "https://instagram.com",
    },
    {
      socialMedia: "other",
      socialMediaPlatform: "Twitter",

      socialMediaIcon: {
        image: {
          asset: {
            _ref: "image-b651ff0764c0ec2a49db93ca4320d534791bf501-48x48-png",
            _type: "reference",
          },
        },
      },
      socialMediaLink: "https://twitter.com",
      _key: "Ymp9ZgCm_W7ADTyIU7vkK",
    },
  ],
  btnLabel: "ADD TO CART",
};

const initialProduct = {
  name: "SAMPLE. Yellow Dress",
  ecwidProductId: 543066127,
  price: "50",
  description: [
    {
      style: "normal",
      _key: "66a51b976fd7",
      markDefs: [],
      children: [
        {
          _type: "span",
          marks: [],
          text: "Test product",
          _key: "66a51b976fd70",
        },
      ],
      _type: "block",
    },
  ],
};
const meta = {
  title: "CStudio/Product Info",
  component: ProductInfo,
  tags: ["autodocs"],
  render: ({ variant, ...args }) => {
    const data = {
      variant: variant,
      variants: args,
    };

    return <ProductInfo data={data} product={initialProduct} />;
  },
  decorators: [
    (Story) => (
      <EcwidContextProvider>
        <Story />
      </EcwidContextProvider>
    ),
  ],
} satisfies Meta<typeof ProductInfo> & any;

export default meta;
type Story = StoryObj<Sections>;

export const variant_a: Story = {
  args: {
    variant: "variant_a",
    ...args,
  },
};

export const variant_b: Story = {
  args: {
    variant: "variant_b",
    ...args,
  },
};
