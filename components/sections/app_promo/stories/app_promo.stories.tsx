import type { Meta, StoryObj } from "@storybook/react";
import AppPromoComponent from "../index";
import { Sections, SectionsProps, Variants } from "types";

const args: Variants = {
  logo: {
    internalLink: null,
    externalLink: null,
    alt: "Logo",
    image: {
      _type: "image",
      asset: {
        _ref: "image-b3b0a815c21cc9fd95261a2a0dd737e0827915cd-664x833-png",
        _type: "reference",
      },
    },
    type: "linkInternal",
  },
  subtitle: "Dolor sit amet consectutar",
  title: "Build & Launch without problems",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur nisl sodales egestas lobortis.",
  statItems: [
    {
      label: "Total Revenue",
      _key: "wEsHXBqsoFESmOuuJ0Gva",
      value: "$33,261",
      _type: "object",
    },
    {
      label: "Subscribers",
      _key: "OoshqxJPM51sNbuyeRI44",
      value: "481,095",
      _type: "object",
    },
    {
      _type: "object",
      label: "Model Sale Rate",
      _key: "Pc8Imm4zVGMkZp-lK1w-6",
      value: "25%",
    },
    {
      _type: "object",
      label: "Conversations",
      _key: "5LJJsnX2AmOlugj4kc_aM",
      value: "643,533",
    },
  ],
  tags: [
    "Vestibulum viverra ante non libero",
    "Morbi mollis metus pretium ultrices tincidunt",
    "Etiam lectus nunc, commodo et risus in",
  ],
  images: [
    {
      image: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: "image-e3cb72c85bf9207d44bb9e0db92cd80be5662108-274x589-png",
        },
      },
      _type: "item",
      _key: "TM5omHo1WvAoCZIE0GYaD",
    },
    {
      image: {
        asset: {
          _ref: "image-b5e5d428e809f5f6e500df911ef16ab648be35a1-283x468-png",
          _type: "reference",
        },
        _type: "image",
      },
      _type: "item",
      _key: "HgMfBr7rohSEDAsaeFByV",
    },
    {
      _type: "item",
      _key: "Bt5vgHYedWdVhGppFvb6R",
      image: {
        _type: "image",
        asset: {
          _ref: "image-ce963623bee96f0173097354a8da28472c88dce3-289x559-png",
          _type: "reference",
        },
      },
    },
    {
      image: {
        _type: "image",
        asset: {
          _ref: "image-4148621cc49a1c27d31565260703672c4705c49d-289x559-png",
          _type: "reference",
        },
      },
      _type: "item",
      _key: "zrpHIOrP-QfU9fgbc5UGi",
    },
  ],
};

const meta = {
  title: "Sections/App Promo",
  component: AppPromoComponent,
  tags: ["autodocs"],
  render: ({ variant, ...args }) => {
    const data = {
      variant: variant,
      variants: args,
    };

    return <AppPromoComponent data={data} />;
  },
} satisfies Meta<typeof AppPromoComponent> & any;

export default meta;
type Story = StoryObj<Sections> & any;

const AArg = Object.keys(args).filter(
  (key) => !["logo", "subtitle", "title", "images"].includes(key)
);
console.log("AA", AArg);

const DUMMY = ["description", "statItems", "tags"] as const;

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
