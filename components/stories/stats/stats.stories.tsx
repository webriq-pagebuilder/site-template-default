// SHOWS THE DEFAULT VARIANTS OF STATISTICS
// ONLY EDIT THIS FILE IF YOU HAVE A NEW VARIANT

import type { Meta, StoryObj } from "@storybook/react";
import { Components } from "components/list";
import { Sections } from "types";
import {
  statsSchema,
  statsInitialValue,
} from "@webriq-pagebuilder/sanity-plugin-schema-default";
import { filterArgsByVariant } from "components/common";
import { urlFor } from "lib/sanity";

const args = {
  ...statsInitialValue,
  statItems: statsInitialValue.statItems.map((item) => ({
    ...item,
    mainImage: {
      ...item.mainImage,
      image: urlFor(item?.mainImage?.image)
    }
  })),
};

const StatisticsComponent = Components.stats;

const meta: Meta<typeof StatisticsComponent> & any = {
  title: "Components/Statistics/Defaults",
  component: StatisticsComponent,
  tags: ["autodocs"],
  render: ({ variant, ...args }) => {
    const data = {
      variant,
      variants: args,
    };
    return <StatisticsComponent data={data} />;
  },
} satisfies Meta<typeof StatisticsComponent> & any;

export default meta;
type Story = StoryObj<Sections>;

const filterArgs = (variant: string) => {
  return {
    args: {
      variant: variant,
      ...filterArgsByVariant(statsSchema, args, variant),
    },
  };
};

export const variant_a: Story = filterArgs("variant_a");
export const variant_b: Story = filterArgs("variant_b");
export const variant_c: Story = filterArgs("variant_c");
