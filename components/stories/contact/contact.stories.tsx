// SHOWS THE DEFAULT VARIANTS OF CONTACT
// ONLY EDIT THIS FILE IF YOU HAVE A NEW VARIANT

import type { Meta, StoryObj } from "@storybook/react";
import { Components } from "@/components/list";
import { Sections } from "@/types";
import {
  contactSchema,
  contactInitialValue,
} from "@webriq-pagebuilder/sanity-plugin-schema-default";
import { filterArgsByVariant } from "@/components/common";

const args = {
  ...contactInitialValue,
};

const ContactComponent = Components.contact;

const meta = {
  title: "Components/Contact/Defaults",
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
