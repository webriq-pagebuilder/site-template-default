import type { Meta, StoryObj } from "@storybook/react";
import { PortableText } from "lib/sanity";
import * as DATA from "../Theme/portable_value.json";
import { defaultBlockStyle } from "helper";
import deepmerge from "deepmerge";

const meta: Meta<typeof PortableText> = {
  title: "Components/UI/Blockstyle",
  component: PortableText,
  // tags: ["autodocs"],
  args: {
    value: DATA.value,
    components: defaultBlockStyle,
  },
} satisfies Meta<typeof PortableText>;

export default meta;
type Story = StoryObj<typeof PortableText>;

export const Primary: Story = {};

const myBlock = {
  block: {
    h1: ({ children }) => {
      return (
        <h1 className="mb-0 font-extrabold text-black-500 text-4xl text-webriq-blue">
          {children}
        </h1>
      );
    },
    h2: ({ children }) => {
      return (
        <h1 className="mb-0 font-extrabold text-black-500 text-3xl text-webriq-blue">
          {children}
        </h1>
      );
    },
    h3: ({ children }) => {
      return (
        <h1 className="mb-0 font-extrabold text-black-500 text-2xl text-webriq-blue">
          {children}
        </h1>
      );
    },
    h4: ({ children }) => {
      return (
        <h1 className="mb-0 font-extrabold text-black-500 text-xl text-webriq-blue">
          {children}
        </h1>
      );
    },
  },
};
const newBlock = deepmerge(defaultBlockStyle, myBlock);

export const CustomBlockStyle: Story = {
  args: {
    components: newBlock,
  },
};
