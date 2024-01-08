import type { Meta, StoryObj } from "@storybook/react";
import { CategoriesList } from "./categories-list";
import { BlogPost, Sections, SectionsProps, Variants } from "types";
import { useState } from "react";

const Wrapper = () => {
  const categories = ["Travel", "Culture"];
  const [activeTab, setActiveTab] = useState("");

  return (
    <CategoriesList
      categories={categories}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    />
  );
};

const meta = {
  title: "Components/Section Components/Blog/Categories List",
  component: Wrapper,
  tags: ["autodocs"],
  decorators: (Story) => {
    return (
      <div className="max-w-[600px] w-full">
        <Story />
      </div>
    );
  },
} satisfies Meta<typeof CategoriesList>;

export default meta;
type Story = StoryObj<Sections>;

export const Primary: Story = {};
