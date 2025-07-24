// SHOWS THE DEFAULT VARIANTS OF BLOG
// ONLY EDIT THIS FILE IF YOU HAVE A NEW VARIANT

import type { Meta, StoryObj } from "@storybook/react";
import { Components } from "@/components/list";
import { Sections } from "@/types";
import { blogSchema } from "@webriq-pagebuilder/sanity-plugin-schema-default";
import { filterArgsByVariant } from "@/components/common";
import { blogDefaultValues } from "@/helper/defaultValues";
import { renameVariantKeys } from "@/utils/schemas";

const args = {
  ...blogDefaultValues,
};

const BlogComponent = Components.blog;

const meta = {
  title: "Components/Blog/Defaults",
  component: BlogComponent,
  tags: ["autodocs"],
  render: ({ variant, ...args }) => {
    const data = {
      variant: variant,
      variants: args,
    };

    return <BlogComponent data={renameVariantKeys(data)} />;
  },
} satisfies Meta<typeof BlogComponent> & any;

export default meta;
type Story = StoryObj<Sections>;

const filterArgs = (variant: string) => {
  return {
    args: {
      variant: variant,
      ...filterArgsByVariant(blogSchema, args, variant),
    },
  };
};

export const variant_a: Story = filterArgs("variant_a");
export const variant_b: Story = filterArgs("variant_b");
export const variant_c: Story = filterArgs("variant_c");
export const variant_d: Story = filterArgs("variant_d");
