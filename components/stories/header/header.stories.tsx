// SHOWS THE DEFAULT VARIANTS OF HEADER
// ONLY EDIT THIS FILE IF YOU HAVE A NEW VARIANT

import type { Meta, StoryObj } from "@storybook/react";
import { Components } from "@/components/list";
import { Sections } from "@/types";
import {
  headerSchema,
  headerInitialValue,
} from "@webriq-pagebuilder/sanity-plugin-schema-default";
import { filterArgsByVariant } from "@/components/common";
import { urlFor } from "@/lib/sanity";

const args = {
  ...headerInitialValue,
  mainImage: {
    ...headerInitialValue.mainImage,
    image: urlFor(headerInitialValue?.mainImage?.image),
  },
  images: headerInitialValue?.images?.map((item) => ({
    ...item,
    image: urlFor(item?.image),
  })),
};

const HeaderComponent = Components.header;

const meta = {
  title: "Components/Header/Defaults",
  component: HeaderComponent,
  tags: ["autodocs"],
  render: ({ variant, ...args }) => {
    const data = {
      variant: variant,
      variants: args,
    };

    return <HeaderComponent data={data} template={args.template} />;
  },
} satisfies Meta<typeof HeaderComponent> & any;

export default meta;
type Story = StoryObj<Sections>;

const filterArgs = (variant: string) => {
  return {
    args: {
      variant: variant,
      ...filterArgsByVariant(headerSchema, args, variant),
    },
  };
};

export const variant_a: Story = filterArgs("variant_a");
export const variant_b: Story = filterArgs("variant_b");
export const variant_c: Story = filterArgs("variant_c");
export const variant_d: Story = filterArgs("variant_d");
export const variant_e: Story = filterArgs("variant_e");
