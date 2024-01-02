import type { Meta, StoryObj } from "@storybook/react";
import FAQsComponent from "../index";
import { Sections, SectionsProps, Variants } from "types";

const args: Variants = {
  subtitle: "Dolor sit amet consectutar",
  title: "Frequently Asked Questions",
  askedQuestions: [
    {
      answer: "Nullam euismod orci sed tristique placerat.",
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
      _type: "object",
      _key: "LchWMfvu0OeSdIAf86XUL",
    },
    {
      _key: "RS3G_nHYss_FIZuLE6aj_",
      answer: "Vivamus quis ultricies est. Duis nec hendrerit magna.",
      question: "Nunc maximus odio sit amet eros faucibus?",
      _type: "object",
    },
    {
      answer: "Ut vel orci gravida, hendrerit enim non, gravida turpis.",
      question: "Nam feugiat ex eget sapien lobortis?",
      _type: "object",
      _key: "1LaA-NuRoVs29JccW4lUA",
    },
    {
      answer:
        "Praesent non lectus porttitor, scelerisque nulla nec, ornare neque.",
      question: "In hac habitasse platea dictumst?",
      _type: "object",
      _key: "py7MPq8gJIPt-3Y3FDgEc",
    },
    {
      answer:
        "Suspendisse ultrices ut lectus non laoreet. Etiam ornare laoreet tortor quis porttitor.",
      question: "Nullam congue lacinia nibh quis scelerisque?",
      _type: "object",
      _key: "oEHA8SWbOFBCELPyid9_K",
    },
    {
      answer: "Duis nec hendrerit magna.",
      question: "Nam feugiat ex eget sapien lobortis?",
      _type: "object",
      _key: "xFkJJUQkMx0LlXpJA9reM",
    },
  ],
  faqsWithCategory: [
    {
      askedQuestions: [
        {
          _type: "object",
          _key: "gtA3Bm-lE6f3m4_YL0yKD",
          answer: "Nullam euismod orci sed tristique placerat.",
          question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
        },
        {
          answer: "Vivamus quis ultricies est. Duis nec hendrerit magna.",
          question: "Nunc maximus odio sit amet eros faucibus?",
          _type: "object",
          _key: "OL6kJXhElOLzo65ktZRI6",
        },
      ],
      _type: "object",
      _key: "48y0QzdTXUVtUXxmBRZOK",
      category: "General",
    },
    {
      _key: "QRfwX6uDP39g-EqY0Jz_9",
      category: "Payments",
      askedQuestions: [
        {
          answer: "Ut vel orci gravida, hendrerit enim non, gravida turpis.",
          question: "Nam feugiat ex eget sapien lobortis?",
          _type: "object",
          _key: "ZQmC71EIi1-fW4-ine1l7",
        },
        {
          answer:
            "Praesent non lectus porttitor, scelerisque nulla nec, ornare neque.",
          question: "In hac habitasse platea dictumst?",
          _type: "object",
          _key: "mcQo2lxRMk8nHq1w-WBo2",
        },
      ],
      _type: "object",
    },
    {
      _type: "object",
      _key: "ZG669URddRcdLm2_m5OO9",
      category: "Returns",
      askedQuestions: [
        {
          answer: "Duis nec hendrerit magna.",
          question: "Nam feugiat ex eget sapien lobortis?",
          _type: "object",
          _key: "yDZz5z1mYSqS7y62RHz7c",
        },
      ],
    },
    {
      _key: "kP1snKAN5kL98Vx0GodYy",
      category: "Refunds",
      askedQuestions: [
        {
          question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
          _type: "object",
          _key: "TSQho1e6ZIMfWws4bhWac",
          answer: "Nullam euismod orci sed tristique placerat.",
        },
        {
          answer: "Vivamus quis ultricies est. Duis nec hendrerit magna.",
          question: "Nunc maximus odio sit amet eros faucibus?",
          _type: "object",
          _key: "tNcmBq336yHrUdded6Cmz",
        },
      ],
      _type: "object",
    },
  ],
};

const meta = {
  title: "Sections/FAQs",
  component: FAQsComponent,
  tags: ["autodocs"],
  render: ({ variant, ...args }) => {
    const data = {
      variant: variant,
      variants: args,
    };

    return <FAQsComponent data={data} />;
  },
} satisfies Meta<typeof FAQsComponent> & any;

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
