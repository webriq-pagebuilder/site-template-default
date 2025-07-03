// SHOWS THE DEFAULT VARIANTS OF TEXT COMPONENT
// ONLY EDIT THIS FILE IF YOU HAVE A NEW VARIANT

import type { Meta, StoryObj } from "@storybook/react";
import { Components } from "components/list";
import { Sections } from "types";
import {
  textComponentSchema,
  textComponentInitialValue,
} from "@webriq-pagebuilder/sanity-plugin-schema-default";
import { filterArgsByVariant } from "components/common";

const args = {
  ...textComponentInitialValue,
};

const TextComponent = Components.textComponent;

const meta: Meta<typeof TextComponent> & any = {
  title: "Components/Text Component/Defaults",
  component: TextComponent,
  tags: ["autodocs"],
  render: ({ variant, ...args }) => {
    const data = {
      variant,
      variants: args,
    };
    return <TextComponent data={data} />;
  },
} satisfies Meta<typeof TextComponent> & any;
export default meta;
type Story = StoryObj<Sections>;

const filterArgs = (variant: string) => {
  return {
    args: {
      variant: variant,
      ...filterArgsByVariant(textComponentSchema, args, variant),
    },
  };
};

export const variant_a: Story = filterArgs("variant_a");
export const variant_b: Story = filterArgs("variant_b");
export const variant_c: Story = filterArgs("variant_c");
