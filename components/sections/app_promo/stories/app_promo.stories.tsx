// THIS IS THE STORY FILE FOR THE DEFAULT VARIANTS OF APP_PROMO

import type { Meta, StoryObj } from "@storybook/react";
import AppPromoComponent from "../index";
import { Sections, Variants } from "types";
import {
  appPromoSchema,
  appPromoInitialValue,
} from "@webriq-pagebuilder/sanity-plugin-schema-default";
import { filterArgsByVariant } from "components/common";

const args = {
  ...appPromoInitialValue,
};

const meta = {
  title: "Sections/App Promo/Defaults",
  component: AppPromoComponent,
  tags: ["autodocs"],
  render: ({ variant, ...args }) => {
    const data = {
      variant: variant,
      variants: args,
    };

    return <AppPromoComponent data={data} />;
  },
} satisfies Meta<typeof AppPromoComponent> & any;

export default meta;
type Story = StoryObj<Sections> & any;

const filterArgs = (variant: string) => {
  return {
    args: {
      variant: variant,
      ...filterArgsByVariant(appPromoSchema, args, variant),
    },
  };
};

export const variant_a: Story = filterArgs("variant_a");
export const variant_b: Story = filterArgs("variant_b");
export const variant_c: Story = filterArgs("variant_c");
