import type { Meta, StoryObj } from "@storybook/react";
import { Sections, Variants } from "types";
import ProductInfo from "../index";

const args = {
  price: 110,
  productInfoVariant: {
    variant: "defaultVariant",
  },
  description: "Sample product description for this product.",
  name: "SAMPLE. Black Dress",
  ecwidProductId: 190291382,
  productInfo: {
    subtitle: "Brille",
    btnLabel: "ADD TO CART",
    images: [
      {
        image: {
          asset: {
            _ref: "image-1b4ec5027684868d7dfae4a7eebd4b2181a452db-1128x1126-png",
            _type: "reference",
          },
        },

        _key: "oaed-mvUhPwNwyTEtc5nz",
      },
      {
        _key: "jv1hHF-YCIoJlU08XyE2U",
        image: {
          asset: {
            _ref: "image-6a2154724ba1f6d381782b84a92be456f4711ad8-260x260-png",
            _type: "reference",
          },
        },
      },
      {
        image: {
          asset: {
            _ref: "image-f54c036f71a52f1528a4f85574771999c9f15590-260x260-png",
            _type: "reference",
          },
        },

        _key: "zcqot0hk4Sc8eh42b6LMg",
      },
      {
        _key: "5Cmhp5VJJ-GD3vV7n4Srl",
        image: {
          asset: {
            _type: "reference",
            _ref: "image-cf5183207b47111501ef43c08f228d2cac77bba3-260x260-png",
          },
        },
      },
    ],
    socialLinks: [
      {
        _key: "_wB8JX0wcBhTvvFHHRaRB",
        socialMedia: "facebook",

        socialMediaIcon: {},
        socialMediaLink: "https://www.facebook.com/",
      },
      {
        socialMediaIcon: {
          image: {
            asset: {
              _ref: "image-f35437826c6054fcf8e1b3adb604e8c67b4fd398-48x48-png",
              _type: "reference",
            },
          },
        },
        socialMediaLink: "https://instagram.com",
        _key: "dfSorlBOJ7_fNa39gcR2v",
        socialMedia: "other",
        socialMediaPlatform: "Instagram",
      },
      {
        socialMediaIcon: {
          image: {
            asset: {
              _type: "reference",
              _ref: "image-b651ff0764c0ec2a49db93ca4320d534791bf501-48x48-png",
            },
          },
        },
        socialMediaLink: "https://twitter.com",
        _key: "HOiW8d-d30Au58sTjSkj8",
        socialMedia: "other",
        socialMediaPlatform: "Twitter",
      },
    ],
  },
};

const meta = {
  title: "Sections/Product Info",
  component: ProductInfo,
  tags: ["autodocs"],
  render: ({ variant, ...args }) => {
    const data = {
      variant: variant,
      variants: {
        products: args,
      },
    };

    return <ProductInfo data={data} />;
  },
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
