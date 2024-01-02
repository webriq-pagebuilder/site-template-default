import type { Meta, StoryObj } from "@storybook/react";
import HeaderComponent from "../index";
import { Sections, SectionsProps, Variants } from "types";

const args: Variants = {
  template: {
    bg: "gray",
    color: "webriq",
  },
  mainImage: {
    image: {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: "image-169ed7b2d1aefee7f232cb11d591a87afb081800-1050x700-jpg",
      },
    },
  },
  images: [
    {
      _key: "PsM0fq_NoorQqQL5mhNNq",
      image: {
        _type: "image",
        asset: {
          _ref: "image-0b68b4267d6d520230fe4b107e622b99a6739678-941x734-jpg",
          _type: "reference",
        },
      },
      _type: "item",
    },
    {
      _type: "item",
      _key: "qHYFlfD6EoiorgqaW81Us",
      image: {
        _type: "image",
        asset: {
          _ref: "image-6149e873e52c7b945a489b9bb65204e3905bed81-1050x701-jpg",
          _type: "reference",
        },
      },
    },
    {
      image: {
        _type: "image",
        asset: {
          _ref: "image-85ba15e7e2930aa280c5d7e46dae17a018caf3a7-967x725-jpg",
          _type: "reference",
        },
      },
      _type: "item",
      _key: "AkJpmXR9k4R3tWLPTKtDj",
    },
    {
      _type: "item",
      _key: "66ACOvGF1ug3TWr-1oSBw",
      image: {
        _type: "image",
        asset: {
          _ref: "image-8ab26c1d233fa8ce762fe3ccb4c37df46139edac-1190x669-jpg",
          _type: "reference",
        },
      },
    },
  ],
  title: "Build & Launch without problems",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur nisl sodales egestas lobortis.",
  primaryButton: {
    _type: "conditionalLink",
    linkType: "linkInternal",
    label: "Get Started",
    type: "linkInternal",
    internalLink: null,
    externalLink: null,
    linkTarget: "_self",
  },
  secondaryButton: {
    externalLink: null,
    label: "How it works",
    linkTarget: "_self",
    _type: "conditionalLink",
    linkType: "linkInternal",
    type: "linkInternal",
    internalLink: null,
  },
  youtubeLink: "https://www.youtube.com/watch?v=HfPdTL7Isx8",
  formLinks: [
    {
      _type: "conditionalLink",
      linkType: "linkInternal",
      label: "Policy Privacy",
      _key: "QgkLy0YnNaI_Lx7DEjKPt",
      type: "linkInternal",
      internalLink: null,
      externalLink: null,
      linkTarget: "_self",
    },
    {
      internalLink: null,
      externalLink: null,
      linkTarget: "_self",
      _type: "conditionalLink",
      linkType: "linkInternal",
      label: "Terms of Use",
      _key: "yJsrKlGx2mBuXiffRocaP",
      type: "linkInternal",
    },
  ],
  form: {
    thankYouPage: null,
    subtitle: "Sign Up",
    name: "Create an account",
    fields: [
      {
        type: "inputText",
        _type: "webriqFormField",
        name: "First Name",
        placeholder: "First Name",
        _key: "dAvrR3t--VOOG5_lRwFGM",
      },
      {
        _key: "uh-HdwGRabzd4z-5q8_2L",
        type: "inputText",
        _type: "webriqFormField",
        name: "Last Name",
        placeholder: "Last Name",
      },
      {
        name: "Email",
        placeholder: "Enter your email address",
        _key: "aFiFXc7e-3mQw7MESTftV",
        type: "inputEmail",
        _type: "webriqFormField",
      },
      {
        _type: "webriqFormField",
        name: "Password",
        placeholder: "Enter your password",
        _key: "rwDUr8JPjSCK5nSF8AnYA",
        type: "inputPassword",
      },
    ],
    buttonLabel: "Sign Up",
  },
};

const meta = {
  title: "Sections/Header",
  component: HeaderComponent,
  tags: ["autodocs"],
  render: ({ variant, ...args }) => {
    const data = {
      variant: variant,
      variants: args,
    };

    return <HeaderComponent data={data} template={args.template} />;
  },
} satisfies Meta<typeof HeaderComponent> & any;

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

export const variant_e: Story = {
  args: {
    variant: "variant_e",
    ...args,
  },
};
