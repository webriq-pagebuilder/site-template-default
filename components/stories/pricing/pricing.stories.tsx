// SHOWS THE DEFAULT VARIANTS OF PRICING
// ONLY EDIT THIS FILE IF YOU HAVE A NEW VARIANT

import type { Meta, StoryObj } from "@storybook/react";
import PricingComponent from "../../sections/pricing";
import { Sections } from "@/types";
import {
  pricingSchema,
  pricingInitialValue,
} from "@webriq-pagebuilder/sanity-plugin-schema-default";
import { filterArgsByVariant } from "@/components/common";

const args = {
  ...pricingInitialValue,
};

const meta: Meta<typeof PricingComponent> & any = {
  title: "Components/Pricing/Defaults",
  component: PricingComponent,
  tags: ["autodocs"],
  render: ({ variant, ...args }) => {
    const data = {
      variant,
      variants: args,
    };
    return <PricingComponent data={data} />;
  },
} satisfies Meta<typeof PricingComponent> & any;

export default meta;
type Story = StoryObj<Sections>;

const filterArgs = (variant: string) => {
  return {
    args: {
      variant: variant,
      ...filterArgsByVariant(pricingSchema, args, variant),
    },
  };
};

export const variant_a: Story = filterArgs("variant_a");
export const variant_b: Story = filterArgs("variant_b");
export const variant_c: Story = filterArgs("variant_c");
export const variant_d: Story = filterArgs("variant_d");
