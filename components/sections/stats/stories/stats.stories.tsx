import type { Meta, StoryObj } from "@storybook/react";
import StatisticsComponent from "../index";
import { Sections, Variants } from "types";
import {
  statsSchema,
  statsInitialValue,
} from "@webriq-pagebuilder/sanity-plugin-schema-default";
import { filterArgsByVariant } from "components/common";

const args: Variants = {
  ...statsInitialValue,
};

const meta: Meta<typeof StatisticsComponent> & any = {
  title: "Sections/Statistics",
  component: StatisticsComponent,
  tags: ["autodocs"],
  render: ({ variant, ...args }) => {
    const data = {
      variant,
      variants: args,
    };
    return <StatisticsComponent data={data} />;
  },
} satisfies Meta<typeof StatisticsComponent> & any;

export default meta;
type Story = StoryObj<Sections>;

const filterArgs = (variant: string) => {
  return {
    args: {
      variant: variant,
      ...filterArgsByVariant(statsSchema, args, variant),
    },
  };
};

export const variant_a: Story = filterArgs("variant_a");
export const variant_b: Story = filterArgs("variant_b");
export const variant_c: Story = filterArgs("variant_c");
