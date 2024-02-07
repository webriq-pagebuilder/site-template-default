import type { Meta, StoryObj } from "@storybook/react";
import { Container } from "./Container";
const meta: Meta<typeof Container> = {
  title: "Components/Layout/Container",
  component: Container,
  tags: ["autodocs"],
  args: {
    children: (
      <>
        <p>
          In the heart of a bustling metropolis, where skyscrapers touch the
          clouds and neon lights paint the night sky, lies a hidden gem waiting
          to be discovered. This vibrant cityscape is a melting pot of cultures,
          each corner telling a unique story of its own. From the aromatic
          street food stalls to the sophisticated art galleries, every step
          unveils a new layer of the city's rich tapestry.
        </p>
        <p>
          As the sun sets behind the urban silhouette, a sense of tranquility
          blankets the landscape. The city that never sleeps takes a moment to
          breathe, offering a serene escape within its energetic core. It's a
          place where dreams are born, and where every street holds the promise
          of an adventure waiting to unfold. Welcome to a world where the
          possibilities are as endless as the city lights that twinkle in the
          night.
        </p>
      </>
    ),
  },
  decorators: [
    (Story) => (
      <section className="w-full bg-yellow-400">
        <Story />
      </section>
    ),
  ],
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof Container>;

export const Primary: Story = {};
export const WithMaxWidth: Story = {
  args: {
    maxWidth: 700,
  },
};
