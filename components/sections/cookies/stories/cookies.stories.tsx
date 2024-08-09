import type { Meta, StoryObj } from "@storybook/react";
import CookiesComponent from "../index";
import { Sections, SectionsProps, Variants } from "types";
import {
  cookiesSchema,
  cookiesInitialValue,
} from "@webriq-pagebuilder/sanity-plugin-schema-default";
import { filterArgsByVariant } from "components/common";

const args: Variants = {
  ...cookiesInitialValue,
};

const meta = {
  title: "Sections/Cookies/Defaults",
  component: CookiesComponent,
  tags: ["autodocs"],
  render: ({ variant, ...args }) => {
    const data = {
      variant: variant,
      variants: args,
    };

    return (
      <div className="h-[400px]">
        <CookiesComponent data={data} />
      </div>
    );
  },
} satisfies Meta<typeof CookiesComponent> & any;

export default meta;
type Story = StoryObj<Sections>;

const filterArgs = (variant: string) => {
  return {
    args: {
      variant: variant,
      ...filterArgsByVariant(cookiesSchema, args, variant),
    },
  };
};

export const variant_a: Story = filterArgs("variant_a");
