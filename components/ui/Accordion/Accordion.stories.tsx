import type { Meta, StoryObj } from "@storybook/react";
import { Accordion } from "./Accordion";
import { MdStar } from "react-icons/md";
import { BsCaretRight } from "react-icons/bs";
const meta: Meta<typeof Accordion> = {
  title: "Components/UI/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  args: {
    title: "Open Me!",
    body: "In the heart of a bustling metropolis, the cityscape sprawls with towering skyscrapers that touch the sky, casting shadows on crowded streets below. Amidst the urban chaos, a diverse tapestry of cultures intertwines, creating a vibrant mosaic of languages, cuisines, and traditions. The relentless pulse of life is echoed in the rhythmic flow of traffic and the hum of people navigating through a labyrinth of possibilities.",
  },
  decorators: [
    (Story) => (
      <div className=" p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Primary: Story = {};

export const Multiple: Story = {
  render: () => (
    <>
      <Accordion title={"First"} body={"This is the first accordion"} />
      <Accordion title={"Second"} body={"This is the second accordion"} />
    </>
  ),
};

export const WithSubtitle: Story = {
  args: {
    body: "In the heart of a bustling metropolis, the cityscape sprawls with towering skyscrapers that touch the sky, casting shadows on crowded streets below. Amidst the urban chaos, a diverse tapestry of cultures intertwines, creating a vibrant mosaic of languages, cuisines, and traditions. The relentless pulse of life is echoed in the rhythmic flow of traffic and the hum of people navigating through a labyrinth of possibilities.",
    subtitle: "This is a subtitle",
  },
};

export const CustomTitle: Story = {
  args: {
    title: (
      <div className="flex items-center">
        <h1 className="text-webriq-blue font-medium text-lg">
          This is JSX Element!{" "}
          <span>
            <MdStar />
          </span>
        </h1>
      </div>
    ),
  },
};

export const CustomBody: Story = {
  args: {
    body: (
      <>
        <h2>THIS IS A CUSTOM BODY!</h2>
        <div className="grid grid-cols-2 gap-4 p-2">
          <div className="border border-solid border-blue-400 h-[100px]"></div>
          <div className="border border-solid border-yellow-400 h-[100px]"></div>
        </div>
      </>
    ),
  },
};

export const CustomClosedIcon: Story = {
  args: {
    closedIcon: <BsCaretRight />,
  },
};
