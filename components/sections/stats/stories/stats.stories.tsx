import type { Meta, StoryObj } from "@storybook/react";
import StatisticsComponent from "../index";
import { Sections, Variants } from "types";

const args = {
  statItems: [
    {
      mainImage: {
        image: {
          _type: "image",
          asset: {
            _ref: "image-97b6696849c90facc200537fd780b03d373e5212-980x830-png",
            _type: "reference",
          },
        },
      },
      _type: "object",
      label: "Total Revenue",
      _key: "ijJpHhxhxA2LI9WnMpHST",
      value: "$33,261",
    },
    {
      _type: "object",
      label: "Subscribers",
      _key: "_oJyJVev6Vhrykpa6v8A_",
      value: "481,095",
      mainImage: {
        image: {
          _type: "image",
          asset: {
            _ref: "image-d52b2d79a8c0ff7df5bac2ab9b31e4f8b35b2d49-515x485-png",
            _type: "reference",
          },
        },
      },
    },
    {
      _type: "object",
      label: "Conversations",
      _key: "HfxwzNZbFwd3sO0-WVXeS",
      value: "643,553",
      mainImage: {
        image: {
          _type: "image",
          asset: {
            _ref: "image-b362a413487c075bc56646b996ffaf5b888b8fd1-1200x1063-png",
            _type: "reference",
          },
        },
      },
    },
    {
      label: "Modal Sale Rate",
      _key: "2BP-RtIWKoW5RFM49g7t7",
      value: "25%",
      mainImage: {
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: "image-46503b9f97de2e422010bcde0a1e33e954bca584-981x860-png",
          },
        },
      },
      _type: "object",
    },
  ],
};
const meta: Meta<typeof StatisticsComponent> & any = {
  title: "Sections/Statistics",
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
