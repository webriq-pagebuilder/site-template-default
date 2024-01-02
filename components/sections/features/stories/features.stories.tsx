import type { Meta, StoryObj } from "@storybook/react";
import FeaturesComponent from "../index";
import { Sections, SectionsProps, Variants } from "types";

const args: Variants = {
  subtitle: "Dolor sit amet consectutar",
  title: "Build & Launch without problems",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur nisl sodales egestas lobortis.",
  arrayOfImageTitleAndText: [
    {
      mainImage: {
        image: {
          _type: "image",
          asset: {
            _ref: "image-97b6696849c90facc200537fd780b03d373e5212-980x830-png",
            _type: "reference",
          },
        },
      },
      _type: "object",
      plainText:
        "Fusce quam tellus, placerat eu metus ut, viverra aliquet purus. Suspendisse potenti. Nulla non nibh feugiat.",
      _key: "hdENhvVde3I8gwcMJj-bu",
      title: "Lorem ipsum dolor sit amet consectutar",
    },
    {
      plainText:
        "Ut tempus tellus ac nisi vestibulum tempus. Nunc tincidunt lectus libero, ac ultricies augue elementum at.",
      _key: "9mfoCVO1sNDtqdCFbhme2",
      title: "Ut congue nec leo eget aliquam",
      mainImage: {
        image: {
          _type: "image",
          asset: {
            _ref: "image-d52b2d79a8c0ff7df5bac2ab9b31e4f8b35b2d49-515x485-png",
            _type: "reference",
          },
        },
      },
      _type: "object",
    },
    {
      mainImage: {
        image: {
          _type: "image",
          asset: {
            _ref: "image-b362a413487c075bc56646b996ffaf5b888b8fd1-1200x1063-png",
            _type: "reference",
          },
        },
      },
      _type: "object",
      plainText:
        "Donec ut ligula nunc. Mauris blandit vel est et facilisis. Integer sapien felis, aliquet at posuere et, porttitor quis ligula.",
      _key: "_eC4VW77F4oPch9MUh0G-",
      title: "Proin fringilla eleifend justo pellentesque",
    },
    {
      mainImage: {
        image: {
          _type: "image",
          asset: {
            _ref: "image-46503b9f97de2e422010bcde0a1e33e954bca584-981x860-png",
            _type: "reference",
          },
        },
      },
      _type: "object",
      plainText:
        "Duis ut facilisis orci. Morbi lacinia nunc a augue eleifend, sed placerat ex faucibus. Duis ante arcu, pretium ac luctus vulputate.",
      _key: "LoT4CeJfOCJDwwI87U4gW",
      title: "Morbi sagittis ligula sit amet elit maximus",
    },
  ],
  tags: [
    "Vestibulum viverra ante non libero",
    "Morbi mollis metus pretium ultrices tincidunt",
    "Etiam lectus nunc, commodo et risus in",
  ],
  featuredItems: [
    {
      _key: "5pOdx-QamS-wWtgUk7ioK",
      title: "Build & Launch without problems",
      mainImage: {
        image: {
          _type: "image",
          asset: {
            _ref: "image-3a1ef9b3424fabd086e3d7bdea95583ba9ea6363-1048x701-jpg",
            _type: "reference",
          },
        },
      },
      subtitle: "Dolor sit amet consectutar",
      _type: "items",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur nisl sodales egestas lobortis.",
    },
    {
      mainImage: {
        image: {
          asset: {
            _type: "reference",
            _ref: "image-2d9f87020c05fba5986084e4744c829844bf21b6-1050x700-jpg",
          },
          _type: "image",
        },
      },
      subtitle: "Lorem ipsum dolor sit amet",
      _type: "items",
      description: "Pellentesque efficitur nisl sodales egestas lobortis.",
      _key: "nSgyw4Yt6gcqpYplqhTQA",
      title: "Learn how We will help you to reach your goals",
    },
  ],
  images: [
    {
      image: {
        _type: "image",
        asset: {
          _ref: "image-1d0655534230a5cb4e08d8b7bd14b271c5317d82-634x951-jpg",
          _type: "reference",
        },
      },
      _type: "item",
      _key: "jZEUqfFzUCvFpFlhrZSp2",
    },
    {
      _type: "item",
      _key: "2xMbhEBA6YrAvkTcA0Vce",
      image: {
        _type: "image",
        asset: {
          _ref: "image-0dcfa20067460d48780f59c2c4a7a57e7c507969-1050x701-jpg",
          _type: "reference",
        },
      },
    },
    {
      _type: "item",
      _key: "naxU-3wvrVhhMCDRuriZC",
      image: {
        _type: "image",
        asset: {
          _ref: "image-881fdf41f1db63ed80d886037220b4fecc0c39b6-701x876-jpg",
          _type: "reference",
        },
      },
    },
    {
      image: {
        _type: "image",
        asset: {
          _ref: "image-04732685ec70933bc8c49683b2930032929b1fbe-1050x701-jpg",
          _type: "reference",
        },
      },
      _type: "item",
      _key: "XBJdIjpSypq4N4CNsDXnE",
    },
  ],
  primaryButton: {
    type: "linkInternal",
    internalLink: null,
    externalLink: null,
    linkTarget: "_self",
    _type: "conditionalLink",
    linkType: "linkInternal",
    label: "Get Started",
  },
};

const meta = {
  title: "Sections/Features",
  component: FeaturesComponent,
  tags: ["autodocs"],
  render: ({ variant, ...args }) => {
    const data = {
      variant: variant,
      variants: args,
    };

    console.log("data", data);
    return <FeaturesComponent data={data} />;
  },
} satisfies Meta<typeof FeaturesComponent> & any;

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

export const variant_e: Story = {
  args: {
    variant: "variant_e",
    ...args,
  },
};

export const variant_f: Story = {
  args: {
    variant: "variant_f",
    ...args,
  },
};

export const variant_g: Story = {
  args: {
    variant: "variant_g",
    ...args,
  },
};

export const variant_h: Story = {
  args: {
    variant: "variant_h",
    ...args,
  },
};
