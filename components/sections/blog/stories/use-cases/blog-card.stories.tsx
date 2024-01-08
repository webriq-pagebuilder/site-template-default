import type { Meta, StoryObj } from "@storybook/react";
import { BlogCard } from "./blog-card";
import { BlogPost, Sections, SectionsProps, Variants } from "types";

const args: BlogPost = {
  _updatedAt: "2023-04-27T10:11:20Z",
  _createdAt: "2021-11-22T03:12:20Z",
  _rev: "4MfBp9HJw6JHUbUYbiAwQ9",
  _type: "post",
  _id: "fac21b4f-0e82-4435-8296-1935f13aad00",
  link: "lorem-ipsum-dolor-sit-amet",
  body: [
    {
      children: [
        {
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas diam in arcu cursus euismod quis. Egestas congue quisque egestas diam. Volutpat ac tincidunt vitae semper quis. Scelerisque eleifend donec pretium vulputate sapien nec. Lacinia at quis risus sed vulputate odio ut. Sed cras ornare arcu dui vivamus arcu felis. In pellentesque massa placerat duis ultricies lacus sed turpis tincidunt. Urna nunc id cursus metus aliquam eleifend mi in nulla. Nunc faucibus a pellentesque sit amet porttitor. Cursus metus aliquam eleifend mi in nulla posuere. Magna eget est lorem ipsum. Convallis posuere morbi leo urna molestie at elementum eu. Vulputate ut pharetra sit amet aliquam id diam. Enim ut tellus elementum sagittis vitae. Id cursus metus aliquam eleifend mi.",
          _key: "7ff7f07f5a9e",
          _type: "span",
          marks: [],
        },
      ],
      _type: "block",
      style: "normal",
      _key: "e8ef67a7b2f1",
      markDefs: [],
    },
    {
      markDefs: [],
      children: [
        {
          _type: "span",
          marks: [],
          text: "Cras semper auctor neque vitae tempus. Dignissim convallis aenean et tortor at risus viverra. Habitant morbi tristique senectus et netus et. Eleifend donec pretium vulputate sapien. Venenatis tellus in metus vulputate eu. Nisi quis eleifend quam adipiscing. Odio aenean sed adipiscing diam donec adipiscing tristique. Facilisi cras fermentum odio eu feugiat pretium nibh ipsum. Habitasse platea dictumst quisque sagittis. Eget magna fermentum iaculis eu.",
          _key: "a169efe193a60",
        },
      ],
      _type: "block",
      style: "normal",
      _key: "da2c70fa93c8",
    },
    {
      markDefs: [],
      children: [
        {
          _type: "span",
          marks: [],
          text: "Nulla facilisi cras fermentum odio eu feugiat pretium nibh ipsum. Accumsan sit amet nulla facilisi morbi tempus iaculis. Semper quis lectus nulla at volutpat diam ut. Quam viverra orci sagittis eu volutpat odio facilisis mauris. Nulla facilisi morbi tempus iaculis urna id. Morbi enim nunc faucibus a pellentesque sit amet. Id porta nibh venenatis cras sed felis eget velit. Netus et malesuada fames ac turpis egestas integer eget aliquet. Nisl purus in mollis nunc sed id semper risus in. Parturient montes nascetur ridiculus mus mauris vitae ultricies. Amet mattis vulputate enim nulla aliquet porttitor lacus luctus. Bibendum enim facilisis gravida neque convallis.",
          _key: "0d7c1a238deb0",
        },
      ],
      _type: "block",
      style: "normal",
      _key: "a28074ceffb1",
    },
    {
      markDefs: [],
      children: [
        {
          marks: [],
          text: "Euismod quis viverra nibh cras pulvinar mattis nunc sed blandit. Mattis rhoncus urna neque viverra justo nec. Magna sit amet purus gravida quis blandit turpis cursus. Condimentum lacinia quis vel eros donec. Vel turpis nunc eget lorem dolor sed viverra. Tellus at urna condimentum mattis pellentesque id nibh tortor id. Velit laoreet id donec ultrices tincidunt arcu non sodales. Nunc aliquet bibendum enim facilisis gravida neque convallis. Massa massa ultricies mi quis hendrerit dolor magna eget. Et molestie ac feugiat sed lectus vestibulum mattis. In eu mi bibendum neque egestas congue quisque. In pellentesque massa placerat duis ultricies lacus sed turpis tincidunt. Parturient montes nascetur ridiculus mus mauris vitae ultricies leo. Non odio euismod lacinia at quis risus sed vulputate. Placerat vestibulum lectus mauris ultrices eros. Maecenas accumsan lacus vel facilisis volutpat est. Ipsum a arcu cursus vitae congue mauris rhoncus aenean vel. Nunc lobortis mattis aliquam faucibus purus in massa tempor nec. Ac tortor dignissim convallis aenean et tortor.",
          _key: "7f7c59a86a040",
          _type: "span",
        },
      ],
      _type: "block",
      style: "normal",
      _key: "f1bde5ef2cbf",
    },
    {
      markDefs: [],
      children: [
        {
          _type: "span",
          marks: [],
          text: "Sed sed risus pretium quam vulputate dignissim suspendisse. Ut diam quam nulla porttitor massa id neque aliquam vestibulum. Aliquam purus sit amet luctus venenatis. Mauris pharetra et ultrices neque ornare aenean euismod. Ut eu sem integer vitae justo eget. Est pellentesque elit ullamcorper dignissim cras tincidunt. Pellentesque nec nam aliquam sem. Lobortis scelerisque fermentum dui faucibus in. Egestas tellus rutrum tellus pellentesque eu. Mauris cursus mattis molestie a iaculis at erat. Netus et malesuada fames ac turpis egestas integer eget. Massa massa ultricies mi quis hendrerit. Cras adipiscing enim eu turpis egestas pretium aenean pharetra magna. Purus in mollis nunc sed id semper. Auctor elit sed vulputate mi sit amet mauris commodo quis.",
          _key: "47e6b00ada470",
        },
      ],
      _type: "block",
      style: "normal",
      _key: "5e3db3385255",
    },
  ],
  title: "Lorem ipsum dolor sit amet",
  slug: {
    current: "lorem-ipsum-dolor-sit-amet",
    _type: "slug",
  },
  excerpt: "Excerpt",
  authors: null,
  categories: [
    {
      _createdAt: "2021-11-11T13:45:58Z",
      _rev: "4Xbp5us36NAn0n6sWosfBc",
      _type: "category",
      _id: "5ce52ceb-d6f0-4ea3-b14e-8087b2f73061",
      title: "TRAVEL",
      _updatedAt: "2021-11-30T12:32:15Z",
    },
  ],
  publishedAt: "2021-11-22T03:13:00.000Z",
  mainImage: {
    _type: "image",
    asset: {
      _ref: "image-fc4752283bb0c4bf2d6f2b71411407315298952d-968x726-jpg",
      _type: "reference",
    },
  },
};
const meta = {
  title: "Components/Section Components/Blog/Blog Card",
  component: BlogCard,
  tags: ["autodocs"],
  args: {
    post: args,
  },
  decorators: (Story) => {
    return (
      <div className="max-w-[600px] w-full">
        <Story />
      </div>
    );
  },
} satisfies Meta<typeof BlogCard>;

export default meta;
type Story = StoryObj<Sections>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};
