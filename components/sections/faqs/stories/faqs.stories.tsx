import type { Meta, StoryObj } from "@storybook/react";
import FAQsComponent from "../index";
import { Sections, SectionsProps, Variants } from "types";
import {
  faqsSchema,
  faqsInitialValue,
} from "@webriq-pagebuilder/sanity-plugin-schema-default";
import { filterArgsByVariant } from "components/common";

const args: Variants = {
  template: {
    bg: "gray",
    color: "webriq",
  },
  ...faqsInitialValue,
};

const meta = {
  title: "Sections/FAQs",
  component: FAQsComponent,
  tags: ["autodocs"],
  render: ({ variant, ...args }) => {
    const data = {
      variant: variant,
      variants: args,
    };

    return <FAQsComponent data={data} />;
  },
} satisfies Meta<typeof FAQsComponent> & any;

export default meta;
type Story = StoryObj<Sections>;

const filterArgs = (variant: string) => {
  return {
    args: {
      variant: variant,
      ...filterArgsByVariant(faqsSchema, args, variant),
    },
  };
};

export const variant_a: Story = filterArgs("variant_a");
export const variant_b: Story = filterArgs("variant_b");
export const variant_c: Story = filterArgs("variant_c");
