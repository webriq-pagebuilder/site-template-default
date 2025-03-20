// SHOWS THE DEFAULT VARIANTS OF PORTFOLIO
// ONLY EDIT THIS FILE IF YOU HAVE A NEW VARIANT

import type { Meta, StoryObj } from "@storybook/react";
import { Components } from "components/list";
import { Sections } from "types";
import {
  portfolioSchema,
  portfolioInitialValue,
} from "@webriq-pagebuilder/sanity-plugin-schema-default";
import { filterArgsByVariant } from "components/common";
import { urlFor } from "lib/sanity";
import { portfolioDefaultValues } from "helper/defaultValues";

const args = {
  ...portfolioInitialValue,
  portfoliosWithCategories: portfolioDefaultValues.portfoliosWithCategories,
  portfolios: portfolioInitialValue.portfolios.map((item) => ({
    ...item,
    mainImage: {
      ...item.mainImage,
      image: urlFor(item?.mainImage?.image)
    }
  })),
};

const PortfolioComponent = Components.portfolio;

const meta: Meta<typeof PortfolioComponent> & any = {
  title: "Components/Portfolio/Defaults",
  component: PortfolioComponent,
  tags: ["autodocs"],
  render: ({ variant, ...args }) => {
    const data = {
      variant,
      variants: args,
    };
    return <PortfolioComponent data={data} template={args.template} />;
  },
} satisfies Meta<typeof PortfolioComponent> & any;

export default meta;
type Story = StoryObj<Sections>;

const filterArgs = (variant: string) => {
  return {
    args: {
      variant: variant,
      ...filterArgsByVariant(portfolioSchema, args, variant),
    },
  };
};

export const variant_a: Story = filterArgs("variant_a");
export const variant_b: Story = filterArgs("variant_b");
export const variant_c: Story = filterArgs("variant_c");
export const variant_d: Story = filterArgs("variant_d");
