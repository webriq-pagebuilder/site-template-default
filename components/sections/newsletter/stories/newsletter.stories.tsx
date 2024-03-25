import type { Meta, StoryObj } from "@storybook/react";
import NewsletterComponent from "../index";
import { Sections, Variants } from "types";
import {
  newsletterSchema,
  newsletterInitialValue,
} from "@webriq-pagebuilder/sanity-plugin-schema-default";
import { filterArgsByVariant } from "components/common";

const args: Variants = {
  template: {
    bg: "gray",
    color: "webriq",
  },
  ...newsletterInitialValue,
};
const meta: Meta<typeof NewsletterComponent> & any = {
  title: "Sections/Newsletter/Defaults",
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

const filterArgs = (variant: string) => {
  return {
    args: {
      variant: variant,
      ...filterArgsByVariant(newsletterSchema, args, variant),
    },
  };
};

export const variant_a: Story = filterArgs("variant_a");
export const variant_b: Story = filterArgs("variant_b");
