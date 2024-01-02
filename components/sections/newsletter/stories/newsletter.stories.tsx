import type { Meta, StoryObj } from "@storybook/react";
import NewsletterComponent from "../index";
import { Sections, Variants } from "types";

const args = {
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
  description:
    "Lorem ipsum dolor sit amet, adipiscing elit. Pellentesque efficitur nisl sodales egestas lobortis.",
  form: {
    name: "",
    fields: [
      {
        type: "inputEmail",
        _type: "webriqFormField",
        name: "Email",
        placeholder: "Enter your email address",
        _key: "wCLzadfOyzDvZS6h2U2P8",
      },
    ],
    buttonLabel: "Get Started",
    subtitle: "",
    thankYouPage: null,
  },
};
const meta: Meta<typeof NewsletterComponent> & any = {
  title: "Sections/Newsletter",
  component: NewsletterComponent,
  tags: ["autodocs"],
  render: ({ variant, ...args }) => {
    const data = {
      variant,
      variants: args,
    };
    return <NewsletterComponent data={data} template={args.template} />;
  },
} satisfies Meta<typeof NewsletterComponent> & any;

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
