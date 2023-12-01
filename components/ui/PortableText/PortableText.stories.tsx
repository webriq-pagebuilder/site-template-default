import type { Meta, StoryObj } from "@storybook/react";
import { CustomPortableText } from "./PortableText";

const DUMMY_DATA = [
  {
    children: [
      {
        _type: "span",
        marks: [],
        text: "HEADING 1",
        _key: "f42dc8d3e0a4",
      },
    ],
    _type: "block",
    style: "h1",
    _key: "f8ac87765a16",
    markDefs: [],
  },
  {
    markDefs: [],
    children: [
      {
        text: "HEADING 2",
        _key: "2c2c7128f97b",
        _type: "span",
        marks: [],
      },
    ],
    _type: "block",
    style: "h2",
    _key: "b417cb7090bc",
  },
  {
    _type: "block",
    style: "h3",
    _key: "ad34db1c3525",
    markDefs: [],
    children: [
      {
        _type: "span",
        marks: [],
        text: "HEADING 3",
        _key: "2337119dbcb1",
      },
    ],
  },
  {
    markDefs: [],
    children: [
      {
        _type: "span",
        marks: [],
        text: "HEADING 4",
        _key: "dec6b74519d0",
      },
    ],
    _type: "block",
    style: "h4",
    _key: "bbab146032b2",
  },
  {
    markDefs: [],
    children: [
      {
        _type: "span",
        marks: [],
        text: "HEADING 5",
        _key: "0a0c3e8bc480",
      },
    ],
    _type: "block",
    style: "h5",
    _key: "239646e78fc6",
  },
  {
    _key: "08fa2f984436",
    markDefs: [],
    children: [
      {
        _type: "span",
        marks: [],
        text: "HEADING 6",
        _key: "d881c4d39fca",
      },
    ],
    _type: "block",
    style: "h6",
  },
  {
    _type: "block",
    style: "normal",
    _key: "ea22d35fa1d3",
    markDefs: [],
    children: [
      {
        marks: [],
        text: "NORMAL",
        _key: "c458f2c92e27",
        _type: "span",
      },
    ],
  },
  {
    style: "blockquote",
    _key: "f60ae408a058",
    markDefs: [],
    children: [
      {
        _type: "span",
        marks: [],
        text: "QUOTE",
        _key: "d61f8c35a3fb",
      },
    ],
    _type: "block",
  },
  {
    markDefs: [],
    children: [
      {
        _type: "span",
        marks: ["strong"],
        text: "BOLD",
        _key: "a6460f75d492",
      },
    ],
    _type: "block",
    style: "normal",
    _key: "65e772060815",
  },
  {
    markDefs: [],
    children: [
      {
        text: "ITALLIC",
        _key: "f435a6764b5c",
        _type: "span",
        marks: ["em"],
      },
    ],
    _type: "block",
    style: "normal",
    _key: "86cef5cb63e7",
  },
  {
    _type: "block",
    style: "normal",
    _key: "325d77f88b83",
    markDefs: [],
    children: [
      {
        _type: "span",
        marks: ["code"],
        text: "CODE CONST CODE = 'CODE'",
        _key: "19590af93e17",
      },
    ],
  },
  {
    markDefs: [],
    children: [
      {
        _type: "span",
        marks: ["underline"],
        text: "UNDERLINE",
        _key: "358696e25375",
      },
    ],
    _type: "block",
    style: "normal",
    _key: "07adec312ae2",
  },
  {
    style: "normal",
    _key: "9811c7d767d4",
    markDefs: [],
    children: [
      {
        _type: "span",
        marks: ["strike-through"],
        text: "STRIKETHROUGH",
        _key: "e2d550a845a6",
      },
    ],
    _type: "block",
  },
  {
    _key: "eef4cc3e455f",
    listItem: "bullet",
    markDefs: [],
    children: [
      {
        _type: "span",
        marks: [],
        text: "BULLET LIST",
        _key: "deb3cb40b7ff",
      },
    ],
    level: 1,
    _type: "block",
    style: "normal",
  },
  {
    markDefs: [],
    children: [
      {
        _key: "e73fcc29c657",
        _type: "span",
        marks: [],
        text: "BULLET LIST",
      },
    ],
    level: 1,
    _type: "block",
    style: "normal",
    _key: "678510963694",
    listItem: "bullet",
  },
  {
    children: [
      {
        marks: [],
        text: "",
        _key: "f1e056ed85df",
        _type: "span",
      },
    ],
    _type: "block",
    style: "normal",
    _key: "0fb7252fafa3",
    markDefs: [],
  },
  {
    style: "normal",
    _key: "fee037f3743a",
    listItem: "number",
    markDefs: [],
    children: [
      {
        _type: "span",
        marks: [],
        text: "NUMBERED LIST",
        _key: "7be4ccb7427c",
      },
    ],
    level: 1,
    _type: "block",
  },
  {
    _key: "e9101924b8ff",
    listItem: "number",
    markDefs: [],
    children: [
      {
        text: "NUMBERED LIST",
        _key: "c5c48bf5e318",
        _type: "span",
        marks: [],
      },
    ],
    level: 1,
    _type: "block",
    style: "normal",
  },
  {
    children: [
      {
        _type: "span",
        marks: ["d54543494a89"],
        text: "LINK",
        _key: "ef34ef7aa86d",
      },
    ],
    _type: "block",
    style: "normal",
    _key: "4c96ebeb157b",
    markDefs: [
      {
        _type: "link",
        href: "www.webriq.com",
        _key: "d54543494a89",
      },
    ],
  },
  {
    _type: "addImage",
    alt: "IMAGE",
    _key: "b03bf7d4f44b",
    image: {
      _type: "image",
      asset: {
        _ref: "image-1e219ce741bbbf80ad7556287dc0a482a2b657f7-1024x1024-png",
        _type: "reference",
      },
    },
  },
];

const meta: Meta<typeof CustomPortableText> = {
  title: "Components/UI/PortableText",
  component: CustomPortableText,
  tags: ["autodocs"],
  args: {
    value: DUMMY_DATA,
  },
  decorators: [
    (Story) => (
      <div className="bg-gray-50 p-4 rounded-lg">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CustomPortableText>;

export default meta;
type Story = StoryObj<typeof CustomPortableText>;

export const Primary: Story = {};

export const WithCustomStyle: Story = {
  args: {
    components: {
      block: {
        h1: ({ children }) => (
          <h1 className="font-bold text-7xl text-red-700 tracking-wider">
            {children}
          </h1>
        ),
      },
    },
  },
};
