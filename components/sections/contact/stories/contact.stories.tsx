import type { Meta, StoryObj } from "@storybook/react";
import ContactComponent from "../index";
import { Sections, SectionsProps, Variants } from "types";

const args: Variants = {
  title: "Contact",
  contactDescription: "Got any question? Let's talk about it.",
  officeInformation: "359 Hidden Valley Road, NY",
  contactEmail: "hello@webriq.com",
  contactNumber: "+48 698 033 101",
  socialLinks: [
    {
      socialMediaLink: "https://www.facebook.com/",
      _key: "uJ_jttcv_Q_42QdH9RWe-",
      socialMedia: "facebook",
    },
    {
      socialMediaLink: "https://www.twitter.com/",
      _key: "xbppOsiDlTxRYl6Qay6Wz",
      socialMedia: "twitter",
    },
    {
      socialMediaLink: "https://www.instagram.com/",
      _key: "nkSALScyLpwZdePA2uoTd",
      socialMedia: "instagram",
    },
  ],
  form: {
    buttonLabel: "Get Started",
    subtitle: "",
    name: "",
    id: "fc31c685-2d1a-447d-b891-ea63a38c5f57",
    thankYouPage: null,
    fields: [
      {
        name: "Name",
        placeholder: "Name",
        _key: "KF4Watp0rdbnQFDzoNJaj",
        type: "inputText",
      },
      {
        name: "Email",
        placeholder: "name@example.com",
        _key: "WncOcChbz0IIlmTXT3Pf4",
        type: "inputEmail",
      },
      {
        name: "Password",
        placeholder: "*****",
        _key: "544e404591c5",
        type: "inputPassword",
      },
      {
        name: "Message...",
        placeholder: "Message...",
        _key: "HH5DNYs-47nFOLhp7ePSR",
        type: "textarea",
      },
      {
        name: "Add file",
        _key: "JVOHwWl7SKkl_Nz8IBYBC",
        type: "inputFile",
      },
      {
        name: "Radio",
        label: "Radio label",
        _key: "0cf9d7383c63",
        type: "inputRadio",
      },
      {
        name: "Checkbox",
        label: "Checkbox",
        _key: "5e8d1abf787a",
        type: "inputCheckbox",
        items: ["checkbox 1", "checkbox 2", "checkbox 3"],
      },
      {
        name: "Select",
        label: "Select",
        _key: "be3fca5ba2c5",
        type: "inputSelect",

        items: ["checkbox 1", "checkbox 2", "checkbox 3"],
      },
    ],
  },
  block: [
    {
      markDefs: [],
      children: [
        {
          _type: "span",
          marks: [],
          text: "I agree to terms and conditions.",
          _key: "lvytjsMWyUVXGztYUuYMu",
        },
      ],
      _type: "block",
      style: "normal",
      _key: "Nh_9BIaP6qXKNx5FziEbZ",
    },
  ],
};

const meta = {
  title: "Sections/Contact",
  component: ContactComponent,
  tags: ["autodocs"],
  render: ({ variant, ...args }) => {
    const data = {
      variant: variant,
      variants: args,
    };

    return <ContactComponent data={data} />;
  },
} satisfies Meta<typeof ContactComponent> & any;

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
