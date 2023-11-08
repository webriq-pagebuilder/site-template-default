import type { Meta, StoryObj } from "@storybook/react";
import VariantA from "./variant_a";

const meta: Meta<typeof VariantA> = {
  title: "Section/Navigation/Variant A",
  component: VariantA,

  args: {
    logo: {
      alt: "Logo",
      image: {
        _type: "image",
        asset: {
          _ref: "image-7f9353c628ae4dd0bdd479d3b1407a3c242755e8-1963x833-png",
          _type: "reference",
        },
      },
      linkTarget: "_self",
      linkType: "linkInternal",
    },
    primaryButton: {
      _type: "conditionalLink",
      label: "Sign In",
      linkTarget: "_self",
      linkType: "linkInternal",
    },
  },
} satisfies Meta<typeof VariantA>;

export default meta;
type Story = StoryObj<typeof VariantA>;

export const Variant_A: Story = {};

export const Variant_B: Story = {
  args: {
    ...meta.args,
    primaryButton: {
      ...meta.args.primaryButton,
      label: "Sign Up",
    },
  },
};
