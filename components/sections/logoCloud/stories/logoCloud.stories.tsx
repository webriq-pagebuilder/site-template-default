import type { Meta, StoryObj } from "@storybook/react";
import LogoCloudComponent from "../index";
import { Sections, SectionsProps, Variants } from "types";

const args: Variants = {
  title: "Trusted by brands all over the world",
  images: [
    {
      image: {
        _type: "image",
        asset: {
          _ref: "image-98a01125a78665847573232690190a19f9e03ba3-127x32-png",
          _type: "reference",
        },
      },
      _type: "item",
      _key: "qtjeQo5hmyUaqI-sfZ4TG",
    },
    {
      image: {
        _type: "image",
        asset: {
          _ref: "image-f1e02a1b9c013348af0dcade173e8f7d34edf7a3-160x32-png",
          _type: "reference",
        },
      },
      _type: "item",
      _key: "GGQc7D1O5rvfghQNWFota",
    },
    {
      image: {
        _type: "image",
        asset: {
          _ref: "image-4e35d501689c8e0a4d578a29aea4044e6c03d714-107x32-png",
          _type: "reference",
        },
      },
      _type: "item",
      _key: "Z4Q62AIefkNvXYgq_R2KB",
    },
    {
      image: {
        _type: "image",
        asset: {
          _ref: "image-113e6a25a8502aa115dc9ad60c521a0deb4f2bc4-107x32-png",
          _type: "reference",
        },
      },
      _type: "item",
      _key: "0W7Da_wkGPidVkVpxNFmZ",
    },
    {
      _type: "item",
      _key: "EA03IrAi1OyK4Yk7gWJob",
      image: {
        _type: "image",
        asset: {
          _ref: "image-dc2649c456f3a1e7043869b85979b184c95dbc33-119x32-png",
          _type: "reference",
        },
      },
    },
    {
      image: {
        asset: {
          _ref: "image-981351fbf9cde5286a554d20b79f49fecc7818c5-77x32-png",
          _type: "reference",
        },
        _type: "image",
      },
      _type: "item",
      _key: "HHB-1uNXN1yqzH1ClekLu",
    },
  ],
  plainText:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur nisl sodales egestas lobortis.",
  primaryButton: {
    type: "linkInternal",
    internalLink: null,
    externalLink: null,
    linkType: "linkInternal",
    label: "Get Started",
    linkTarget: "_self",
    _type: "conditionalLink",
  },
};

const meta = {
  title: "Sections/Logo Cloud",
  component: LogoCloudComponent,
  tags: ["autodocs"],
  render: ({ variant, ...args }) => {
    const data = {
      variant: variant,
      variants: args,
    };

    return <LogoCloudComponent data={data} />;
  },
} satisfies Meta<typeof LogoCloudComponent> & any;

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

export const variant_c: Story = {
  args: {
    variant: "variant_c",
    ...args,
  },
};

export const variant_d: Story = {
  args: {
    variant: "variant_d",
    ...args,
  },
};
