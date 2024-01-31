import type { Meta, StoryObj } from "@storybook/react";
import LogoCloudComponent from "../index";
import { Sections, SectionsProps, Variants } from "types";
import {
  logoCloudSchema,
  logoCloudInitialValue,
} from "@webriq-pagebuilder/sanity-plugin-schema-default";
import { filterArgsByVariant } from "components/common";

const args: Variants = {
  ...logoCloudInitialValue,
};

const meta = {
  title: "Sections/Logo Cloud",
  component: LogoCloudComponent,
  tags: ["autodocs"],
  render: ({ variant, ...args }) => {
    const data = {
      variant: variant,
      variants: args,
    };

    return <LogoCloudComponent data={data} />;
  },
} satisfies Meta<typeof LogoCloudComponent> & any;

export default meta;
type Story = StoryObj<Sections>;

const filterArgs = (variant: string) => {
  return {
    args: {
      variant: variant,
      ...filterArgsByVariant(logoCloudSchema, args, variant),
    },
  };
};

export const variant_a: Story = filterArgs("variant_a");
export const variant_b: Story = filterArgs("variant_b");
export const variant_c: Story = filterArgs("variant_c");
export const variant_d: Story = filterArgs("variant_d");
