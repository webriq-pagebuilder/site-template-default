import type { Meta, StoryObj } from "@storybook/react";
import CallToActionComponent, { CTAProps } from "../index";
import { Sections, SectionsProps, Variants } from "types";

const args = {
  logo: {
    hidden: ["variant_c", "variant_e"],
    value: {
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
  },
  title: {
    hidden: ["variant_e"],
    value: "So much more than a business analytics tool",
  },
  plainText: {
    hidden: ["variant_e"],
    value:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur nisl sodales egestas lobortis.",
  },
  primaryButton: {
    hidden: ["variant_b", "variant_c", "variant_e"],
    value: {
      linkTarget: "_self",
      _type: "conditionalLink",
      linkType: "linkInternal",
      label: "Get Started",
      type: "linkInternal",
      internalLink: null,
      externalLink: null,
    },
  },
  tags: {
    hidden: ["variant_a", "variant_b", "variant_d", "variant_e"],
    value: ["No credit card needed", "Easy to use"],
  },
  formLinks: {
    hidden: ["variant_a", "variant_b", "variant_c"],
    value: [
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
  },
  form: {
    hidden: ["variant_a"],
    value: {
      name: "Create an account",
      buttonLabel: "Sign Up",
      thankYouPage: null,
      subtitle: "Sign Up",
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
    },
  },
  signInLink: {
    hidden: ["variant_a", "variant_b", "variant_c"],
    value: {
      linkType: "linkInternal",
      type: "linkInternal",
      internalLink: null,
      externalLink: null,
      label: "Sign In",
      linkTarget: "_self",
      _type: "conditionalLink",
    },
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

// filter out args that are not listed on hidden array
const filteredArgs = (variant: string) => {
  return Object.keys(args).reduce((result, key) => {
    if (args?.[key]?.hidden && !args?.[key]?.hidden?.includes(variant)) {
      result[key] = args[key]?.value;
    }
    return result;
  }, {});
};

export const variant_a: Story = {
  args: {
    variant: "variant_a",
    ...filteredArgs("variant_a"),
  },
};

export const variant_b: Story = {
  args: {
    variant: "variant_b",
    ...filteredArgs("variant_b"),
  },
};

export const variant_c: Story = {
  args: {
    variant: "variant_c",
    ...filteredArgs("variant_c"),
  },
};

export const variant_d: Story = {
  args: {
    variant: "variant_d",
    ...filteredArgs("variant_d"),
  },
};

export const variant_e: Story = {
  args: {
    variant: "variant_e",
    ...filteredArgs("variant_e"),
  },
};
