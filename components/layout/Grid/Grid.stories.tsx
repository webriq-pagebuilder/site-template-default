import type { Meta, StoryObj } from "@storybook/react";
import { Grid, GridItem } from "./Grid";
const meta: Meta<typeof Grid> = {
  title: "Components/Layout/Grid",
  component: Grid,
  tags: ["autodocs"],
  args: {
    children: (
      <>
        <GridItem
          span={1}
          className="w-20 h-20 border border-red-500"
        ></GridItem>
        <GridItem
          span={1}
          className="w-20 h-20 border border-red-500"
        ></GridItem>
        <GridItem
          span={1}
          className="w-20 h-20 border border-red-500"
        ></GridItem>
      </>
    ),
  },
  decorators: [
    (Story) => (
      <section className="w-full ">
        <Story />
      </section>
    ),
  ],
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof Grid>;

export const Primary: Story = {};
