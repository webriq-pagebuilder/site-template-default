import type { Meta, StoryObj } from "@storybook/react";
import TextComponent from "../index";
import { Sections, Variants } from "types";

const args = {
  title: "Great quality",
  firstColumn: [
    {
      _key: "FRAoIaJ7_lnKdJeNxxAe-",
      markDefs: [],
      children: [
        {
          _key: "2y-pPr4u86gkGxQ_aY0WQ",
          _type: "span",
          marks: [],
          text: "Etiam facilisis mauris leo, eu aliquet est iaculis eu. Mauris vitae pellentesque augue, quis efficitur elit. Suspendisse potenti. Vivamus et sem eget ligula bibendum pulvinar. Nullam libero velit, efficitur ut dui eget, tempus ultricies felis. Pellentesque ut lorem id velit aliquam pharetra id placerat purus. Aliquam erat mauris, cursus eget cursus in, rutrum et nisi. Phasellus consequat vehicula metus non sagittis. Sed quis ipsum non velit tempus consequat sit amet eget augue. Donec feugiat ultricies ultrices.",
        },
      ],
      _type: "block",
      style: "normal",
    },
  ],
  secondColumn: [
    {
      _type: "block",
      style: "normal",
      _key: "ZYoV1EsyRQv8j934eJ1kf",
      markDefs: [],
      children: [
        {
          _type: "span",
          marks: [],
          text: "Etiam facilisis mauris leo, eu aliquet est iaculis eu. Mauris vitae pellentesque augue, quis efficitur elit. Suspendisse potenti. Vivamus et sem eget ligula bibendum pulvinar. Nullam libero velit, efficitur ut dui eget, tempus ultricies felis. Pellentesque ut lorem id velit aliquam pharetra id placerat purus. Aliquam erat mauris, cursus eget cursus in, rutrum et nisi. Phasellus consequat vehicula metus non sagittis. Sed quis ipsum non velit tempus consequat sit amet eget augue. Donec feugiat ultricies ultrices.",
          _key: "MvppPvndcFBjUT3E19NvH",
        },
      ],
    },
  ],
  thirdColumn: [
    {
      _key: "WpDdcGFkN5mYjvi4dOX6E",
      markDefs: [],
      children: [
        {
          _type: "span",
          marks: [],
          text: "Etiam facilisis mauris leo, eu aliquet est iaculis eu. Mauris vitae pellentesque augue, quis efficitur elit. Suspendisse potenti. Vivamus et sem eget ligula bibendum pulvinar. Nullam libero velit, efficitur ut dui eget, tempus ultricies felis. Pellentesque ut lorem id velit aliquam pharetra id placerat purus. Aliquam erat mauris, cursus eget cursus in, rutrum et nisi. Phasellus consequat vehicula metus non sagittis. Sed quis ipsum non velit tempus consequat sit amet eget augue. Donec feugiat ultricies ultrices.",
          _key: "FbRnKh3BtaB9cXOjSIOMx",
        },
      ],
      _type: "block",
      style: "normal",
    },
  ],
};

const meta: Meta<typeof TextComponent> & any = {
  title: "Sections/Text Component",
  component: TextComponent,
  tags: ["autodocs"],
  render: ({ variant, ...args }) => {
    const data = {
      variant,
      variants: args,
    };
    return <TextComponent data={data} />;
  },
} satisfies Meta<typeof TextComponent> & any;
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
