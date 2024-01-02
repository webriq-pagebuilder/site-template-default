import type { Meta, StoryObj } from "@storybook/react";
import FooterComponent from "../index";
import { Sections, SectionsProps, Variants } from "types";

const args: Variants = {
  logo: {
    alt: "Logo",
    image: {
      _type: "image",
      asset: {
        _ref: "image-7f9353c628ae4dd0bdd479d3b1407a3c242755e8-1963x833-png",
        _type: "reference",
      },
    },
    type: "linkInternal",
    internalLink: null,
    externalLink: null,
  },
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed luctus eget justo.",
  contactDetails: [
    {
      addressInfo: "359 Hidden Valley Road, NY",
      contactInfo: "+48 698 033 101",
      emailInfo: "hello@webriq.com",
      _key: "lZ5H73DRBzFrJwwqBSGv4",
    },
  ],
  copyright: "© 2024 All rights reserved.",
  socialLinks: [
    {
      _type: "details",
      socialMediaLink: "https://www.facebook.com",
      _key: "wnTrsX1WsSG6g3tmF7f4A",
      socialMedia: "facebook",
    },
    {
      _type: "details",
      socialMediaLink: "https://www.twitter.com",
      _key: "eh__Jy_wM-ZbdRKjaT_QX",
      socialMedia: "twitter",
    },
    {
      _type: "details",
      socialMediaLink: "https://www.instagram.com",
      _key: "hi_qN2DzoAyeOv68a8eVm",
      socialMedia: "instagram",
    },
  ],
  menu: [
    {
      linkType: "linkInternal",
      label: "Start",
      _key: "f7LZmPpFvN9_rEfohMfBd",
      linkTarget: "_self",
      type: "linkInternal",
      internalLink: null,
      externalLink: null,
      _type: "conditionalLink",
    },
    {
      label: "About Us",
      _key: "3IWMSpurIlbXXt8rb3y7v",
      linkTarget: "_self",
      type: "linkInternal",
      internalLink: null,
      externalLink: null,
      _type: "conditionalLink",
      linkType: "linkInternal",
    },
    {
      externalLink: null,
      linkTarget: "_self",
      _type: "conditionalLink",
      linkType: "linkInternal",
      label: "Services",
      _key: "eArBRz5Wr8QpVSiGFbfZt",
      type: "linkInternal",
      internalLink: null,
    },
    {
      linkTarget: "_self",
      _type: "conditionalLink",
      linkType: "linkInternal",
      label: "Platform",
      _key: "DGmSrWhx6vlon_A_MaKFn",
      type: "linkInternal",
      internalLink: null,
      externalLink: null,
    },
    {
      _key: "T_H3j_f11v7afTlPcoRXR",
      linkTarget: "_self",
      _type: "conditionalLink",
      linkType: "linkInternal",
      label: "Testimonials",
      type: "linkInternal",
      internalLink: null,
      externalLink: null,
    },
  ],
  multipleMenus: [
    {
      title: "Quick Links",
      _type: "object",
      links: [
        {
          linkTarget: "_self",
          _type: "conditionalLink",
          linkType: "linkInternal",
          label: "Start",
          _key: "iKlzpwaP_Hv8tgQWJL6s4",
        },
        {
          linkTarget: "_self",
          _type: "conditionalLink",
          linkType: "linkInternal",
          label: "About Us",
          _key: "qXi93FPKEnIBNsDNrKSK5",
        },
        {
          linkTarget: "_self",
          _type: "conditionalLink",
          linkType: "linkInternal",
          label: "Services",
          _key: "w50ZVJcbeRCH8ahiVOAAi",
        },
      ],
      _key: "w9Fb3osbjRODQhbEUWUiT",
    },
    {
      _type: "object",
      links: [
        {
          linkTarget: "_self",
          _type: "conditionalLink",
          linkType: "linkInternal",
          label: "Platform",
          _key: "Ya4_oUC-5CssngXmGawAS",
        },
        {
          linkType: "linkInternal",
          label: "Testimonials",
          _key: "Y2QNaByJkF2S3t1hLAZv8",
          linkTarget: "_self",
          _type: "conditionalLink",
        },
      ],
      _key: "aJti14Xrg3nTnRnwa7dMz",
      title: "Helpful Links",
    },
    {
      _type: "object",
      links: [
        {
          linkTarget: "_self",
          _type: "conditionalLink",
          linkType: "linkInternal",
          label: "Terms and Conditions",
          _key: "_ITtAWHhhGQu2JVdt9HiM",
        },
        {
          _key: "z_2OBF-dySYyygZPcK92_",
          linkTarget: "_self",
          _type: "conditionalLink",
          linkType: "linkInternal",
          label: "Privacy Policy",
        },
        {
          label: "Cookies",
          _key: "aljAXPs9roFb73FVOw2H9",
          linkTarget: "_self",
          _type: "conditionalLink",
          linkType: "linkInternal",
        },
      ],
      _key: "f1fnvc5iM6smavE9bZ7H_",
      title: "Explore",
    },
  ],
};

const meta = {
  title: "Sections/Footer",
  component: FooterComponent,
  tags: ["autodocs"],
  render: ({ variant, ...args }) => {
    const data = {
      variant: variant,
      variants: args,
    };

    console.log("data", data);
    return <FooterComponent data={data} />;
  },
} satisfies Meta<typeof FooterComponent> & any;

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
