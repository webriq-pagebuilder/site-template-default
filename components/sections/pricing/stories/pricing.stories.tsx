import type { Meta, StoryObj } from "@storybook/react";
import PricingComponent from "../index";
import { Sections, Variants } from "types";

const args = {
  subtitle: "Dolor sit amet consectutar",
  title: "Choose your best plan",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  plans: [
    {
      planType: "Beginner",

      monthlyPrice: "Free",
      _key: "OKW6k1QMNaP74DNPLfsEL",
      primaryButton: null,
      description:
        "Nullam diam arcu, sodales quis convallis sit amet, sagittis varius ligula.",
      yearlyPrice: "Free",
      checkoutButtonName: "Get Started",
      price: "Free",
      planIncludes: [
        "Vestibulum viverra",
        "Morbi mollis metus pretium",
        "Etiam lectus nunc, commodo",
        "Ut quam nisl mollis id pretium",
        "Suspendisse bibendum",
      ],
    },
    {
      planIncludes: [
        "Vestibulum viverra",
        "Morbi mollis metus pretium",
        "Etiam lectus nunc, commodo",
        "Ut quam nisl mollis id pretium",
        "Suspendisse bibendum",
      ],
      price: "24",
      _key: "ZUMWCBcHfj9MRh14Fp-X_",
      yearlyPrice: "288",
      planType: "Intermediate",
      monthlyPrice: "24",
      primaryButton: null,
      checkoutButtonName: "Get Started",
      description:
        "Nullam diam arcu, sodales quis convallis sit amet, sagittis varius ligula.",
    },
    {
      yearlyPrice: "576",
      checkoutButtonName: "Get Started",
      _key: "AnnEzDEGzmWX8I0IHN1xB",

      planType: "Professional",
      monthlyPrice: "48",
      price: "48",
      description:
        "Nullam diam arcu, sodales quis convallis sit amet, sagittis varius ligula.",
      primaryButton: null,
      planIncludes: [
        "Vestibulum viverra",
        "Morbi mollis metus pretium",
        "Etiam lectus nunc, commodo",
        "Ut quam nisl mollis id pretium",
        "Suspendisse bibendum",
      ],
    },
  ],
  annualBilling: "99",
  monthlyBilling: "59",
  form: {
    fields: [
      {
        name: "Email",
        placeholder: "Enter your email address",
        _key: "Y6BgLGwnfnx3S5i8Ueecg",
        pricingType: "inputEmail",
      },
      {
        name: "Password",
        placeholder: "Enter your password",
        _key: "1bm2m1uSwj5ouVvRiqs-N",
        pricingType: "inputPassword",
      },
      {
        _key: "79dbuCAYKBlyTdPGDcBQo",
        pricingType: "inputCard",

        name: "Card number",
      },
    ],
    name: "Finish your payment",
    thankYouPage: null,
  },
  banner: [
    {
      _key: "8mzs4NHddmj72FyyXlnmB",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      mainImage: {
        image: {
          asset: {
            _ref: "image-8f90c590ada0a2f3c89c35535c323320627b9622-554x312-png",
            _type: "reference",
          },
        },
      },
    },
    {
      title: "Faucibus scelerisque eleifend donec pretium nec sagittis.",
      mainImage: {
        image: {
          asset: {
            _ref: "image-46679d44ed8f85d5712b275646920191e557535f-608x456-png",
            _type: "reference",
          },
        },
      },

      _key: "MnHfWu5zbhRfwJlOwVXgn",
    },
    {
      title: "Ipsum consequat nisl vel pretium lectus quam.",
      mainImage: {
        image: {
          asset: {
            _ref: "image-173f0ca9bd52a7a0b8a507216400f2fcad77b273-646x598-png",
            _type: "reference",
          },
        },
      },

      _key: "oeI-f8TYKMDuVV0IcQO0W",
    },
    {
      title: "Viverra maecenas accumsan lacus vel facilisis.",
      mainImage: {
        image: {
          asset: {
            _ref: "image-46679d44ed8f85d5712b275646920191e557535f-608x456-png",
            _type: "reference",
          },
        },
      },

      _key: "sciGp3FqxnbGjrqqpZP2O",
    },
  ],
  selectStripeAccount: JSON.stringify({
    stripePKey: "pk_test_tx7BQE0UHXWuyQAt6vOD5sy8006ZoRzjQn",
    stripeSKey:
      "U2FsdGVkX1/uoC/uBcmiG8J0BKU+7VGLefIg7f2j51ZmTRQQEuhvftlaJEtPs2jV/YCkh20aNUbzPP4eAUb/rw==",
    hashKey:
      "QXD2R--veD0ZXWRJ7lKT4fqKugiZ5SdtD01rYOgrFzNMVpMZhztbDO7um7zatmBpaA0nC7wrpx2pc_tlUaZI46ek70x8VMrYZtWFcGdtNFjSGZAi75HStVX20N-jAfnz7FYv7urw0S3KOz0c5EyQ5m",
    apiVersion: "2019-03-14",
  }),
  NEXT_PUBLIC_APP_URL: "https://dxpstudio.webriq.com",
  block: [
    {
      markDefs: [],
      children: [
        {
          _type: "span",
          marks: [],
          text: "By signing up, you agree to our Terms, Data Policy and Cookies Policy",
          _key: "flfCDD7U0LgMcn3DkqxkY",
        },
      ],
      _type: "block",
      style: "normal",
      _key: "iPf2N6qtkgLU9vFNVxfRK",
    },
  ],
  signInLink: {
    linkTarget: "_self",

    linkType: "linkInternal",
    label: "Sign In",
    type: "linkInternal",
    internalLink: null,
    externalLink: null,
  },
};
const meta: Meta<typeof PricingComponent> & any = {
  title: "Sections/Pricing",
  component: PricingComponent,
  tags: ["autodocs"],
  render: ({ variant, ...args }) => {
    const data = {
      variant,
      variants: args,
    };
    return <PricingComponent data={data} />;
  },
} satisfies Meta<typeof PricingComponent> & any;

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

export const variant_d: Story = {
  args: {
    variant: "variant_d",
    ...args,
  },
};
