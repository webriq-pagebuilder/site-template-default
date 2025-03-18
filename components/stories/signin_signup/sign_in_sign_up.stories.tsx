// SHOWS THE DEFAULT VARIANTS OF SIGN IN SIGN UP
// ONLY EDIT THIS FILE IF YOU HAVE A NEW VARIANT

import type { Meta, StoryObj } from "@storybook/react";
import { Components } from "components/list";
import { Sections } from "types";
import {
  signInSignUpSchema,
  signInSignUpInitialValue,
} from "@webriq-pagebuilder/sanity-plugin-schema-default";
import { filterArgsByVariant } from "components/common";
import { urlFor } from "lib/sanity";

const args = {
  ...signInSignUpInitialValue,
  logo: {
    ...signInSignUpInitialValue.logo,
    image: urlFor(signInSignUpInitialValue.logo.image)
  },
};

const SigninComponent = Components.signInSignUp;

const meta: Meta<typeof SigninComponent> & any = {
  title: "Components/Sign in/Defaults",
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
