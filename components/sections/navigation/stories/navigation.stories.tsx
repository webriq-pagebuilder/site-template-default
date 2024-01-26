import type { Meta, StoryObj } from "@storybook/react";
import NavigationComponet from "../index";
import { Sections, Variants } from "types";

const NAV_PROPS = {
  template: {
    bg: "gray",
    color: "webriq",
  },
  logo: {
    type: "linkInternal",
    internalLink: null,
    externalLink: null,
    alt: "Logo",
    image: {
      asset: {
        _ref: "image-7f9353c628ae4dd0bdd479d3b1407a3c242755e8-1963x833-png",
        _type: "reference",
      },
    },
  },
  routes: [
    {
      linkTarget: "_self",

      linkType: "linkInternal",
      label: "Start",
      _key: "2QueLs46ZdpbNaaZgs13V",
      type: "linkInternal",
      internalLink: null,
      externalLink: null,
    },
    {
      _key: "1XE3Dhz70dNTMXda86YUY",
      linkTarget: "_self",
      internalLink: "initial-values-test",
      externalLink: null,
      linkType: "linkInternal",
      label: "About Us",
      linkInternal: {
        _ref: "020142ce-cf61-4671-a5db-80b13a08f2d4",
        _type: "reference",
      },

      type: "linkInternal",
    },
    {
      linkType: "linkExternal",
      linkExternal: "www.webriq.com",
      type: "linkExternal",
      internalLink: null,
      linkTarget: "_blank",

      externalLink: "www.webriq.com",
      label: "Services",
      _key: "QFLrmsaWnF5lz5hqpH5gL",
    },
    {
      type: "linkInternal",
      internalLink: null,
      externalLink: null,
      linkTarget: "_self",

      linkType: "linkInternal",
      label: "Platform",
      _key: "99DLguYhQ9lu8OPdkXV-Y",
    },
    {
      label: "Testimonials",
      _key: "TSI4dGFMAfiLpqQjvkJrY",
      linkTarget: "_self",
      type: "linkInternal",
      internalLink: null,
      externalLink: null,

      linkType: "linkInternal",
    },
  ],
  primaryButton: {
    linkType: "linkInternal",
    label: "Sign In",
    type: "linkInternal",
    internalLink: null,
    externalLink: null,
    linkTarget: "_self",
  },
  secondaryButton: {
    linkType: "linkInternal",
    label: "Sign Up",
    type: "linkInternal",
    internalLink: null,
    externalLink: null,
    linkTarget: "_self",
  },
  banner: [
    {
      markDefs: [],
      children: [
        {
          marks: [],
          text: "Hi, you're new here! Get 20% off card!",
          _key: "6f20d4af2ce0",
          _type: "span",
        },
      ],
      _type: "block",
      style: "normal",
      _key: "sQVnOM0MgKFXxfAz8JEHb",
    },
  ],
};

const meta: Meta<typeof NavigationComponet> & any = {
  title: "Sections/Navigation",
  component: NavigationComponet,
  tags: ["autodocs"],
  render: ({ variant, ...args }) => {
    const data = {
      variant,
      variants: args,
    };
    return <NavigationComponet data={data} template={args.template} />;
  },
} satisfies Meta<typeof NavigationComponet> & any;

export default meta;
type Story = StoryObj<Sections>;

export const variant_a: Story = {
  args: {
    variant: "variant_a",
    ...NAV_PROPS,
  },
};

export const variant_b: Story = {
  args: {
    variant: "variant_b",
    ...NAV_PROPS,
  },
};

export const variant_c: Story = {
  args: {
    variant: "variant_c",
    ...NAV_PROPS,
  },
};

export const variant_d: Story = {
  args: {
    variant: "variant_d",
    ...NAV_PROPS,
  },
};

export const variant_e: Story = {
  args: {
    variant: "variant_e",
    ...NAV_PROPS,
  },
};
