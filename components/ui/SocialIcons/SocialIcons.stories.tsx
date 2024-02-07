import type { Meta, StoryObj } from "@storybook/react";
import { SocialIcon, Socials } from "./SocialIcons";

const meta: Meta<typeof SocialIcon> = {
  title: "Components/UI/Social Icons",
  component: SocialIcon,
  tags: ["autodocs"],
} satisfies Meta<typeof SocialIcon>;

export default meta;
type Story = StoryObj<typeof SocialIcon>;

export const AllIcons: Story = {
  render: () => {
    const icons = ["facebook", "linkedin", "instagram", "youtube"];
    return (
      <div className="flex gap-4">
        {icons.map((i) => {
          return <SocialIcon social={i as Socials} />;
          //   return <div>test</div>;
        })}
      </div>
    );
  },
};
