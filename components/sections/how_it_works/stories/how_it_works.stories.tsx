import type { Meta, StoryObj } from "@storybook/react";
import HowItWorksComponent from "../index";
import { Sections, SectionsProps, Variants } from "types";
import {
  howItWorksSchema,
  howItWorksInitialValue,
} from "@webriq-pagebuilder/sanity-plugin-schema-default";
import { filterArgsByVariant } from "components/common";

const args: Variants = {
  template: {
    bg: "gray",
    color: "webriq",
  },
  ...howItWorksInitialValue,
};

const meta = {
  title: "Sections/How It Works",
  component: HowItWorksComponent,
  tags: ["autodocs"],
  render: ({ variant, ...args }) => {
    const data = {
      variant: variant,
      variants: args,
    };

    return <HowItWorksComponent data={data} />;
  },
} satisfies Meta<typeof HowItWorksComponent> & any;

export default meta;
type Story = StoryObj<Sections>;

const filterArgs = (variant: string) => {
  return {
    args: {
      variant: variant,
      ...filterArgsByVariant(howItWorksSchema, args, variant),
    },
  };
};

export const variant_a: Story = filterArgs("variant_a");
export const variant_b: Story = filterArgs("variant_b");
export const variant_c: Story = filterArgs("variant_c");
export const variant_d: Story = filterArgs("variant_d");
export const variant_e: Story = filterArgs("variant_e");
