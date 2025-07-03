// SHOWS THE DEFAULT VARIANTS OF LOGO CLOUD
// ONLY EDIT THIS FILE IF YOU HAVE A NEW VARIANT

import type { Meta, StoryObj } from "@storybook/react";
import { Components } from "components/list";
import { Sections } from "types";
import {
  logoCloudSchema,
  logoCloudInitialValue,
} from "@webriq-pagebuilder/sanity-plugin-schema-default";
import { filterArgsByVariant } from "components/common";
import { urlFor } from "lib/sanity";

const args = {
  ...logoCloudInitialValue,
  images: logoCloudInitialValue.images.map((item) => ({ ...item, image: urlFor(item?.image) })),
};

const LogoCloudComponent = Components.logoCloud;

const meta = {
  title: "Components/Logo Cloud/Defaults",
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
