import type { Meta, StoryObj } from "@storybook/react";
import PortfolioComponent from "../index";
import { Sections, Variants } from "types";
import {
  portfolioSchema,
  portfolioInitialValue,
} from "@webriq-pagebuilder/sanity-plugin-schema-default";
import { filterArgsByVariant } from "components/common";

const args: Variants = {
  template: {
    bg: "gray",
    color: "webriq",
  },
  ...portfolioInitialValue,
};

const meta: Meta<typeof PortfolioComponent> & any = {
  title: "Sections/Portfolio",
  component: PortfolioComponent,
  tags: ["autodocs"],
  render: ({ variant, ...args }) => {
    const data = {
      variant,
      variants: args,
    };
    return <PortfolioComponent data={data} template={args.template} />;
  },
} satisfies Meta<typeof PortfolioComponent> & any;

export default meta;
type Story = StoryObj<Sections>;

const filterArgs = (variant: string) => {
  return {
    args: {
      variant: variant,
      ...filterArgsByVariant(portfolioSchema, args, variant),
    },
  };
};

export const variant_a: Story = filterArgs("variant_a");
export const variant_b: Story = filterArgs("variant_b");
export const variant_c: Story = filterArgs("variant_c");
export const variant_d: Story = filterArgs("variant_d");
