import type { Meta, StoryObj } from "@storybook/react";
import TeamComponent from "../index";
import { Sections, Variants } from "types";
import {
  teamSchema,
  teamInitialValue,
} from "@webriq-pagebuilder/sanity-plugin-schema-default";
import { filterArgsByVariant } from "components/common";

const args: Variants = {
  ...teamInitialValue,
};

const meta: Meta<typeof TeamComponent> & any = {
  title: "Sections/Team/Defaults",
  component: TeamComponent,
  tags: ["autodocs"],
  render: ({ variant, ...args }) => {
    const data = {
      variant,
      variants: args,
    };
    return <TeamComponent data={data} />;
  },
} satisfies Meta<typeof TeamComponent> & any;

export default meta;
type Story = StoryObj<Sections>;

const filterArgs = (variant: string) => {
  return {
    args: {
      variant: variant,
      ...filterArgsByVariant(teamSchema, args, variant),
    },
  };
};

export const variant_a: Story = filterArgs("variant_a");
export const variant_b: Story = filterArgs("variant_b");
export const variant_c: Story = filterArgs("variant_c");
export const variant_d: Story = filterArgs("variant_d");
