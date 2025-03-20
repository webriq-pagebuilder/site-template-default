// SHOWS THE DEFAULT VARIANTS OF APP PROMO
// ONLY EDIT THIS FILE IF YOU HAVE A NEW VARIANT

import type { Meta, StoryObj } from "@storybook/react";
import { Components } from "components/list";
import { Sections } from "types";
import {
  appPromoSchema,
  appPromoInitialValue,
} from "@webriq-pagebuilder/sanity-plugin-schema-default";
import { filterArgsByVariant } from "components/common";
import { urlFor } from "lib/sanity";
import { renameVariantKeys } from "utils/schemas";

const args = {
  ...appPromoInitialValue,
  logo: {
    ...appPromoInitialValue.logo,
    image: urlFor(appPromoInitialValue.logo.image)
  },
  images: appPromoInitialValue.images.map((item) => ({ ...item, image: urlFor(item?.image) })),
  statistics: appPromoInitialValue.statItems,
};

const AppPromoComponent = Components.appPromo;

const meta = {
  title: "Components/App Promo/Defaults",
  component: AppPromoComponent,
  tags: ["autodocs"],
  render: ({ variant, ...args }) => {
    const data = {
      variant: variant,
      variants: args,
    };

    return <AppPromoComponent data={renameVariantKeys(data)} />;
  },
} satisfies Meta<typeof AppPromoComponent> & any;

export default meta;
type Story = StoryObj<Sections> & any;

const filterArgs = (variant: string) => {
  return {
    args: {
      variant: variant,
      ...filterArgsByVariant(appPromoSchema, args, variant),
    },
  };
};

export const variant_a: Story = filterArgs("variant_a");
export const variant_b: Story = filterArgs("variant_b");
export const variant_c: Story = filterArgs("variant_c");
