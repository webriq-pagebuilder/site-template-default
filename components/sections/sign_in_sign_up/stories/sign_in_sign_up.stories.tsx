import type { Meta, StoryObj } from "@storybook/react";
import SigninComponent from "../index";
import { Sections, Variants } from "types";

const args = {
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
  primaryButton: null,
  secondaryButton: null,
  formLinks: [
    {
      type: "linkInternal",
      internalLink: null,
      externalLink: null,
      _key: "aueu6E9PlM-_09x4hRPu0",
      linkTarget: "_self",

      linkType: "linkInternal",
      label: "Police privacy",
    },
    {
      externalLink: null,
      _key: "MK172flvMX1vCNXEG4SwV",
      linkTarget: "_self",

      linkType: "linkInternal",
      label: "Terms of Use",
      type: "linkInternal",
      internalLink: null,
    },
  ],
  signInLink: null,
  form: {
    thankYouPage: null,
    subtitle: "Sign Up",
    name: "Create an account",
    fields: [
      {
        type: "inputText",

        name: "First Name",
        placeholder: "First Name",
        _key: "GZHte7Hl_3a5YHJlTbWEr",
      },
      {
        _key: "WHwy0o8uQzxnlC8DYfx0x",
        type: "inputText",

        name: "Last Name",
        placeholder: "Last Name",
      },
      {
        placeholder: "Enter your email address",
        _key: "bvAQFTMcYfegk_eMhm-KY",
        type: "inputEmail",

        name: "Email",
      },
      {
        _key: "erbDnFN_f_qXh-T82JGYU",
        type: "inputPassword",

        name: "Password",
        placeholder: "Enter your password",
      },
    ],
    buttonLabel: "Sign Up",
  },
};
const meta: Meta<typeof SigninComponent> & any = {
  title: "Sections/Sign in",
  component: SigninComponent,
  tags: ["autodocs"],
  render: ({ variant, ...args }) => {
    const data = {
      variant,
      variants: args,
    };
    return <SigninComponent data={data} />;
  },
} satisfies Meta<typeof SigninComponent> & any;

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
