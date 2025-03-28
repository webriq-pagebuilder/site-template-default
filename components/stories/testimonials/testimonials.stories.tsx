// SHOWS THE DEFAULT VARIANTS OF TESTIMONIALS
// ONLY EDIT THIS FILE IF YOU HAVE A NEW VARIANT

import type { Meta, StoryObj } from "@storybook/react";
import { Components } from "components/list";
import { Sections } from "types";
import {
  testimonialSchema,
  testimonialInitialValue,
} from "@webriq-pagebuilder/sanity-plugin-schema-default";
import { filterArgsByVariant } from "components/common";
import { urlFor } from "lib/sanity";

const args = {
  ...testimonialInitialValue,
  testimonials: testimonialInitialValue.testimonials.map((item) => ({
    ...item,
    mainImage: {
      ...item.mainImage,
      image: urlFor(item?.mainImage?.image)
    }
  })),
};

const TestimonialComponent = Components.testimonial;

const meta: Meta<typeof TestimonialComponent> & any = {
  title: "Components/Testimonials/Defaults",
  component: TestimonialComponent,
  tags: ["autodocs"],
  render: ({ variant, ...args }) => {
    const data = {
      variant,
      variants: args,
    };
    return <TestimonialComponent data={data} />;
  },
} satisfies Meta<typeof TestimonialComponent> & any;

export default meta;
type Story = StoryObj<Sections>;

const filterArgs = (variant: string) => {
  return {
    args: {
      variant: variant,
      ...filterArgsByVariant(testimonialSchema, args, variant),
    },
  };
};

export const variant_a: Story = filterArgs("variant_a");
export const variant_b: Story = filterArgs("variant_b");
export const variant_c: Story = filterArgs("variant_c");
export const variant_d: Story = filterArgs("variant_d");
