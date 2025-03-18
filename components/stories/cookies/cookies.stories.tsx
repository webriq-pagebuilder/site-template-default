// SHOWS THE DEFAULT VARIANTS OF COOKIES
// ONLY EDIT THIS FILE IF YOU HAVE A NEW VARIANT

import type { Meta, StoryObj } from "@storybook/react";
import { Components } from "components/list";
import { Sections } from "types";
import {
  cookiesSchema,
  cookiesInitialValue,
} from "@webriq-pagebuilder/sanity-plugin-schema-default";
import { filterArgsByVariant } from "components/common";

const args = {
  ...cookiesInitialValue,
};

const CookiesComponent = Components.cookies;

const meta = {
  title: "Components/Cookies/Defaults",
  component: CookiesComponent,
  tags: ["autodocs"],
  render: ({ variant, ...args }) => {
    const data = {
      variant: variant,
      variants: {
        ...args,
        config: {
          enableAnalytics: true,
          cookiePolicy: {
            siteName: "Example Site",
            cookiePolicyPage: { _ref: "example-page" }
          },
          consentModalPosition: "bottom"
        }
      },
    };

    return (
      <div className="h-[400px]">
        <CookiesComponent data={data} />
      </div>
    );
  },
} satisfies Meta<typeof CookiesComponent> & any;

export default meta;
type Story = StoryObj<Sections>;

const filterArgs = (variant: string) => {
  return {
    args: {
      variant: variant,
      ...filterArgsByVariant(cookiesSchema, args, variant),
    },
  };
};

export const variant_a: Story = filterArgs("variant_a");
