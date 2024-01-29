import type { Meta, StoryObj } from "@storybook/react";
import SigninComponent from "../index";
import { Sections, Variants } from "types";
import {
  signInSignUpSchema,
  signInSignUpInitialValue,
} from "@webriq-pagebuilder/sanity-plugin-schema-default";
import { filterArgsByVariant } from "components/common";

const args: Variants = {
  template: {
    bg: "gray",
    color: "webriq",
  },
  ...signInSignUpInitialValue,
};

const meta: Meta<typeof SigninComponent> & any = {
  title: "Sections/Sign in",
  component: SigninComponent,
  tags: ["autodocs"],
  render: ({ variant, ...args }) => {
    const data = {
      variant,
      variants: args,
    };
    return <SigninComponent data={data} />;
  },
} satisfies Meta<typeof SigninComponent> & any;

export default meta;
type Story = StoryObj<Sections>;

const filterArgs = (variant: string) => {
  return {
    args: {
      variant: variant,
      ...filterArgsByVariant(signInSignUpSchema, args, variant),
    },
  };
};

export const variant_a: Story = filterArgs("variant_a");
export const variant_b: Story = filterArgs("variant_b");
