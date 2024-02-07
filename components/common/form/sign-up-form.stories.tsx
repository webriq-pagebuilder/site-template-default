import type { Meta, StoryObj } from "@storybook/react";
import { SignUpForm } from "./sign-up-form";
import { Sections, SectionsProps, Variants } from "types";

const ARGS = {
  FORM: {
    fields: [
      {
        name: "First Name",
        placeholder: "First Name",
        _key: "dSFFjMBkXVDZYezFxQ6Rn",
        type: "inputText",
      },
      {
        name: "Last Name",
        placeholder: "Last Name",
        _key: "6DMOG1JfjbcysZl5xExNM",
        type: "inputText",
      },
      {
        type: "inputEmail",
        name: "Email",
        placeholder: "Enter your email address",
        _key: "kJTXeFPZecA6Vgcz1qRLy",
      },
      {
        type: "inputPassword",
        name: "Password",
        placeholder: "Enter your password",
        _key: "wdhApcde2w34sfE4yzf8f",
      },
    ],
    buttonLabel: "Sign Up",
    thankYouPage: null,
    subtitle: "Sign Up",
    name: "Create an account",
  },
  SIGN_IN_LINK: {
    linkType: "linkInternal",
    type: "linkInternal",
    internalLink: null,
    externalLink: null,
    label: "Sign In",
    linkTarget: "_self",
  },
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
