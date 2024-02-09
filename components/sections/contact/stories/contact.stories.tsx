import type { Meta, StoryObj } from "@storybook/react";
import ContactComponent from "../index";
import { Sections, SectionsProps, Variants } from "types";
import {
  contactSchema,
  contactInitialValue,
} from "@webriq-pagebuilder/sanity-plugin-schema-default";
import { filterArgsByVariant } from "components/common";

const args: Variants = {
  ...contactInitialValue,
};

const meta = {
  title: "Sections/Contact",
  component: ContactComponent,
  tags: ["autodocs"],
  render: ({ variant, ...args }) => {
    const data = {
      variant: variant,
      variants: args,
    };

    return <ContactComponent data={data} />;
  },
} satisfies Meta<typeof ContactComponent> & any;

export default meta;
type Story = StoryObj<Sections>;

const filterArgs = (variant: string) => {
  return {
    args: {
      variant: variant,
      ...filterArgsByVariant(contactSchema, args, variant),
    },
  };
};

export const variant_a: Story = filterArgs("variant_a");
export const variant_b: Story = filterArgs("variant_b");
