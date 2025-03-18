// SHOWS THE DEFAULT VARIANTS OF NEWSLETTER
// ONLY EDIT THIS FILE IF YOU HAVE A NEW VARIANT

import type { Meta, StoryObj } from "@storybook/react";
import { Components } from "components/list";
import { Sections } from "types";
import {
  newsletterSchema,
  newsletterInitialValue,
} from "@webriq-pagebuilder/sanity-plugin-schema-default";
import { filterArgsByVariant } from "components/common";

const args = {
  ...newsletterInitialValue,
};

const NewsletterComponent = Components.newsletter;

const meta: Meta<typeof NewsletterComponent> & any = {
  title: "Components/Newsletter/Defaults",
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
