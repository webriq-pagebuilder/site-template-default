import type { Meta, StoryObj } from "@storybook/react";
import { SignUpForm } from "./sign-up-form";
import { Sections, SectionsProps, Variants } from "types";
import { signUpDefaultValues } from "helper/defaultValues";

const ARGS = {
  ...signUpDefaultValues,
};
const meta = {
  title: "Components/Common/Sign Up Form",
  component: SignUpForm,
  tags: ["autodocs"],
  args: {
    form: ARGS.FORM,
    signInLink: ARGS.SIGN_IN_LINK,
  },
  decorators: [
    (Story) => (
      <div className="max-w-[500px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SignUpForm> & any;

export default meta;
type Story = StoryObj<Sections>;

export const Primary: Story = {
  args: {},
};
