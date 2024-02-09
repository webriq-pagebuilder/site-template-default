import type { Meta, StoryObj } from "@storybook/react";
import NavigationComponet from "../index";
import { Sections, Variants } from "types";
import {
  navigationSchema,
  navigationInitialValue,
} from "@webriq-pagebuilder/sanity-plugin-schema-default";
import { filterArgsByVariant } from "components/common";

const args = {
  template: {
    bg: "gray",
    color: "webriq",
  },
  ...navigationInitialValue,
};

const meta: Meta<typeof NavigationComponet> & any = {
  title: "Sections/Navigation",
  component: NavigationComponet,
  tags: ["autodocs"],
  render: ({ variant, ...args }) => {
    const data = {
      variant,
      variants: args,
    };
    return <NavigationComponet data={data} template={args.template} />;
  },
} satisfies Meta<typeof NavigationComponet> & any;

export default meta;
type Story = StoryObj<Sections>;

const filterArgs = (variant: string) => {
  return {
    args: {
      variant: variant,
      ...filterArgsByVariant(navigationSchema, args, variant),
    },
  };
};

export const variant_a: Story = filterArgs("variant_a");
export const variant_b: Story = filterArgs("variant_b");
export const variant_c: Story = filterArgs("variant_c");
export const variant_d: Story = filterArgs("variant_d");
export const variant_e: Story = filterArgs("variant_e");
