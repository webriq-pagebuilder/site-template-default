// SHOWS THE DEFAULT VARIANTS OF FEATURES
// ONLY EDIT THIS FILE IF YOU HAVE A NEW VARIANT

import type { Meta, StoryObj } from "@storybook/react";
import { Components } from "components/list";
import { Sections } from "types";
import {
  featuresSchema,
  featuresInitialValue,
} from "@webriq-pagebuilder/sanity-plugin-schema-default";
import { filterArgsByVariant } from "components/common";
import { urlFor } from "lib/sanity";

const args = {
  ...featuresInitialValue,
  images: featuresInitialValue.images.map((item) => ({ ...item, image: urlFor(item?.image) })),
  featuredItems: featuresInitialValue.featuredItems.map((item) => ({
    ...item,
    mainImage: {
      ...item.mainImage,
      image: urlFor(item?.mainImage?.image)
    }
  })),
  arrayOfImageTitleAndText: featuresInitialValue.arrayOfImageTitleAndText.map((item) => ({
    ...item,
    mainImage: {
      ...item.mainImage,
      image: urlFor(item?.mainImage?.image)
    }
  })),
};

const FeaturesComponent = Components.features;

const meta = {
  title: "Components/Features/Defaults",
  component: FeaturesComponent,
  tags: ["autodocs"],
  render: ({ variant, ...args }) => {
    const data = {
      variant: variant,
      variants: args,
    };

    return <FeaturesComponent data={data} />;
  },
} satisfies Meta<typeof FeaturesComponent> & any;

export default meta;
type Story = StoryObj<Sections>;

const filterArgs = (variant: string) => {
  return {
    args: {
      variant: variant,
      ...filterArgsByVariant(featuresSchema, args, variant),
    },
  };
};

export const variant_a: Story = filterArgs("variant_a");
export const variant_b: Story = filterArgs("variant_b");
export const variant_c: Story = filterArgs("variant_c");
export const variant_d: Story = filterArgs("variant_d");
export const variant_e: Story = filterArgs("variant_e");
export const variant_f: Story = filterArgs("variant_f");
export const variant_g: Story = filterArgs("variant_g");
export const variant_h: Story = filterArgs("variant_h");
