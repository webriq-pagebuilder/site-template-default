import type { Meta, StoryObj } from "@storybook/react";
import TestimonialComponent from "../index";
import { Sections, Variants } from "types";

const args = {
  subtitle: "Dolor sir amet consectutar",
  title: "What our clients think about us",
  testimonials: [
    {
      rating: "5",
      _key: "M9lpwgf6NdTr8uLsxfmt6",
      mainImage: {
        image: {
          asset: {
            _ref: "image-a1794d2d559bc1f48556040a6251c5616b73571c-600x900-jpg",
            _type: "reference",
          },
        },
      },
      testimony:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      jobTitle: "Product Development",

      name: "Daisy Carter",
    },
    {
      jobTitle: "Backend Developer",

      name: "Alice Bradley",
      rating: "4",
      _key: "j5GzamEnTgmconFvCPskQ",
      mainImage: {
        image: {
          asset: {
            _type: "reference",
            _ref: "image-954606f82d77732a8169672368006482bd3df41b-600x900-jpg",
          },
        },
      },
      testimony:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      testimony:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      jobTitle: "Head of Development",

      name: "Ian Brown",
      rating: "5",
      _key: "mQhFGvp-SSm8qWaU2zAdv",
      mainImage: {
        image: {
          asset: {
            _ref: "image-e9ca974577fc294a1d421a31dc5eefca6d31f645-1055x699-jpg",
            _type: "reference",
          },
        },
      },
    },
    {
      name: "Dennis Robertson",
      rating: "4",
      _key: "JenHJcaK947IeMbXtRbWs",
      mainImage: {
        image: {
          asset: {
            _ref: "image-85c37ba1943759d8d17977197d97ff790fd4f880-600x400-jpg",
            _type: "reference",
          },
        },
      },
      testimony:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      jobTitle: "Frontend Developer",
    },
  ],
};
const meta: Meta<typeof TestimonialComponent> & any = {
  title: "Sections/Testimonials",
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

export const variant_a: Story = {
  args: {
    variant: "variant_a",
    ...args,
  },
};

export const variant_b: Story = {
  args: {
    variant: "variant_b",
    ...args,
  },
};

export const variant_c: Story = {
  args: {
    variant: "variant_c",
    ...args,
  },
};

export const variant_d: Story = {
  args: {
    variant: "variant_d",
    ...args,
  },
};
