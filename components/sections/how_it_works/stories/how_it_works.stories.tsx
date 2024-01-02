import type { Meta, StoryObj } from "@storybook/react";
import HowItWorksComponent from "../index";
import { Sections, SectionsProps, Variants } from "types";

const args: Variants = {
  subtitle: "Dolor sit amet consectutar",
  title: "Build & Launch without problems",
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur nisl sodales egestas lobortis.",
  youtubeLink: "https://www.youtube.com/watch?v=HfPdTL7Isx8",
  arrayOfTitleAndText: [
    {
      plainText:
        "Fusce quam tellus, placerat eu metus ut, viverra aliquet purus. Suspendisse potenti. Nulla non nibh feugiat.",
      _key: "SwAy62Gi3BwysiXVZqj-0",
      title: "Lorem ipsum dolor sit amet consectutar",
    },
    {
      plainText:
        "Fusce quam tellus, placerat eu metus ut, viverra aliquet purus. Suspendisse potenti. Nulla non nibh feugiat.",
      _key: "v7nqgX4K-9-Bliz7JjsX4",
      title: "Lorem ipsum dolor sit amet consectutar",
    },
    {
      plainText:
        "Fusce quam tellus, placerat eu metus ut, viverra aliquet purus. Suspendisse potenti. Nulla non nibh feugiat.",
      _key: "NiHBKvyiEalSXQY-9YXZU",
      title: "Lorem ipsum dolor sit amet consectutar",
    },
  ],
};

const meta = {
  title: "Sections/How It Works",
  component: HowItWorksComponent,
  tags: ["autodocs"],
  render: ({ variant, ...args }) => {
    const data = {
      variant: variant,
      variants: args,
    };

    console.log("data", data);
    return <HowItWorksComponent data={data} />;
  },
} satisfies Meta<typeof HowItWorksComponent> & any;

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

export const variant_e: Story = {
  args: {
    variant: "variant_e",
    ...args,
  },
};
