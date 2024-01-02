import type { Meta, StoryObj } from "@storybook/react";
import CookiesComponent from "../index";
import { Sections, SectionsProps, Variants } from "types";

const args: Variants = {
  heading: "Cookie Policy",
  acceptButtonLabel: "Allow",
  declineButtonLabel: "Decline",
  block: [
    {
      children: [
        {
          _type: "span",
          marks: [],
          text: "We use ",
          _key: "DjV0c1ByghlLeCsaoDidI",
        },
        {
          _type: "span",
          marks: ["a98412dd4283"],
          text: "cookies",
          _key: "72cc969c29fd",
        },
        {
          _type: "span",
          marks: [],
          text: " to personalise content, to provide social media features and to analyse our traffic. We also share information about your use of our site with our social media, advertising and analytics partners. If you want to change your cookie setting, please see the ‘how to reject cookies' section of our . Otherwise, if you agree to our use of cookies, please continue to use our website.",
          _key: "983114eafb48",
        },
      ],
      _type: "block",
      style: "normal",
      _key: "8FSVNPq3ORb1RQswmmiEv",
      markDefs: [
        {
          _type: "link",
          href: "https://www.webriq.com/cookies",
          _key: "a98412dd4283",
        },
      ],
    },
  ],
};

const meta = {
  title: "Sections/Cookies",
  component: CookiesComponent,
  tags: ["autodocs"],
  render: ({ variant, ...args }) => {
    const data = {
      variant: variant,
      variants: args,
    };

    console.log("data", data);
    return (
      <div className="h-[400px]">
        <CookiesComponent data={data} />
      </div>
    );
  },
} satisfies Meta<typeof CookiesComponent> & any;

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
