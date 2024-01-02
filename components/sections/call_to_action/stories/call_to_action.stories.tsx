import type { Meta, StoryObj } from "@storybook/react";
import CallToActionComponent, { CTAProps } from "../index";
import { Sections, SectionsProps, Variants } from "types";

const args: Variants = {
  logo: {
    alt: "Logo",
    image: {
      _type: "image",
      asset: {
        _ref: "image-b3b0a815c21cc9fd95261a2a0dd737e0827915cd-664x833-png",
        _type: "reference",
      },
    },
    type: "linkInternal",
    internalLink: null,
    externalLink: null,
  },
  title: "So much more than a business analytics tool",
  plainText:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur nisl sodales egestas lobortis.",
  primaryButton: {
    linkTarget: "_self",
    _type: "conditionalLink",
    linkType: "linkInternal",
    label: "Get Started",
    type: "linkInternal",
    internalLink: null,
    externalLink: null,
  },
  tags: ["No credit card needed", "Easy to use"],
  formLinks: [
    {
      _type: "conditionalLink",
      linkType: "linkInternal",
      label: "Police privacy",
      type: "linkInternal",
      internalLink: null,
      externalLink: null,
      _key: "x7RnKCMTO5-QN_-Bjrd3P",
      linkTarget: "_self",
    },
    {
      _type: "conditionalLink",
      linkType: "linkInternal",
      label: "Terms of Use",
      type: "linkInternal",
      internalLink: null,
      externalLink: null,
      _key: "oPZzd7iEOiTTQskCQelp5",
      linkTarget: "_self",
    },
  ],
  form: {
    fields: [
      {
        _type: "webriqFormField",
        name: "First Name",
        placeholder: "First Name",
        _key: "dSFFjMBkXVDZYezFxQ6Rn",
        type: "inputText",
      },
      {
        name: "Last Name",
        placeholder: "Last Name",
        _key: "6DMOG1JfjbcysZl5xExNM",
        type: "inputText",
        _type: "webriqFormField",
      },
      {
        type: "inputEmail",
        _type: "webriqFormField",
        name: "Email",
        placeholder: "Enter your email address",
        _key: "kJTXeFPZecA6Vgcz1qRLy",
      },
      {
        type: "inputPassword",
        _type: "webriqFormField",
        name: "Password",
        placeholder: "Enter your password",
        _key: "wdhApcde2w34sfE4yzf8f",
      },
    ],
    buttonLabel: "Sign Up",
    thankYouPage: null,
    subtitle: "Sign Up",
    name: "Create an account",
  },
  signInLink: {
    linkType: "linkInternal",
    type: "linkInternal",
    internalLink: null,
    externalLink: null,
    label: "Sign In",
    linkTarget: "_self",
    _type: "conditionalLink",
  },
};

const meta = {
  title: "Sections/Call To Action",
  component: CallToActionComponent,
  tags: ["autodocs"],
  render: ({ variant, ...args }) => {
    const data = {
      variant: variant,
      variants: args,
    };

    return <CallToActionComponent data={data} />;
  },
} satisfies Meta<typeof CallToActionComponent> & any;

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
