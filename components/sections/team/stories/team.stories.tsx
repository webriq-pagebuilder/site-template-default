import type { Meta, StoryObj } from "@storybook/react";
import TeamComponent from "../index";
import { Sections, Variants } from "types";

const args = {
  subtitle: "Dolor sit amet consectutar",
  title: "Check our awesome team members",
  teams: [
    {
      plainText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae felis at ante bibendum mollis et et mauris.\n      Quisque id sagittis turpis. Nulla sollicitudin rutrum eros eu dictum. Integer sit amet erat sit amet lectus lacinia mattis. Donec est tortor, fermentum at urna a, accumsan suscipit sem.",
      _key: "iVhf83ov3LbXSmbUX4Q_p",
      mainImage: {
        image: {
          _type: "image",
          asset: {
            _ref: "image-90edb5748fb96a13d347007ebba50382c1da1455-600x400-jpg",
            _type: "reference",
          },
        },
      },
      jobTitle: "CEO",
      _type: "object",
      name: "Danny Bailey",
    },
    {
      name: "Ian Brown",
      plainText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae felis at ante bibendum mollis et et mauris.\n      Quisque id sagittis turpis. Nulla sollicitudin rutrum eros eu dictum. Integer sit amet erat sit amet lectus lacinia mattis. Donec est tortor, fermentum at urna a, accumsan suscipit sem.",
      _key: "aRHs2xlqZLamH4DqvluCG",
      mainImage: {
        image: {
          _type: "image",
          asset: {
            _ref: "image-6d14774780f069127fb2bd9c8301ec2b771b31d7-600x400-jpg",
            _type: "reference",
          },
        },
      },
      jobTitle: "Head of Development",
      _type: "object",
    },
    {
      jobTitle: "Product Development",
      _type: "object",
      name: "Daisy Carter",
      plainText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae felis at ante bibendum mollis et et mauris.\n      Quisque id sagittis turpis. Nulla sollicitudin rutrum eros eu dictum. Integer sit amet erat sit amet lectus lacinia mattis. Donec est tortor, fermentum at urna a, accumsan suscipit sem.",
      _key: "Zi6ECnCBHRX02O-VnVUNm",
      mainImage: {
        image: {
          _type: "image",
          asset: {
            _ref: "image-a1794d2d559bc1f48556040a6251c5616b73571c-600x900-jpg",
            _type: "reference",
          },
        },
      },
    },
    {
      mainImage: {
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: "image-85c37ba1943759d8d17977197d97ff790fd4f880-600x400-jpg",
          },
        },
      },
      jobTitle: "Frontend developer",
      _type: "object",
      name: "Dennis Robertson",
      plainText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae felis at ante bibendum mollis et et mauris.\n      Quisque id sagittis turpis. Nulla sollicitudin rutrum eros eu dictum. Integer sit amet erat sit amet lectus lacinia mattis. Donec est tortor, fermentum at urna a, accumsan suscipit sem.",
      _key: "ZYPU7QdLSp2v7ApZ5vUpM",
    },
    {
      jobTitle: "Backend Developer",
      _type: "object",
      name: "Alice Bradley",
      plainText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae felis at ante bibendum mollis et et mauris.\n    Quisque id sagittis turpis. Nulla sollicitudin rutrum eros eu dictum. Integer sit amet erat sit amet lectus lacinia mattis. Donec est tortor, fermentum at urna a, accumsan suscipit sem.",
      _key: "xeHnn3_PK2hJ7ipZk89vJ",
      mainImage: {
        image: {
          _type: "image",
          asset: {
            _ref: "image-954606f82d77732a8169672368006482bd3df41b-600x900-jpg",
            _type: "reference",
          },
        },
      },
    },
    {
      mainImage: {
        image: {
          _type: "image",
          asset: {
            _ref: "image-96a832a986dc7fe3e58aeedd44362c8be0f3a681-600x900-jpg",
            _type: "reference",
          },
        },
      },
      jobTitle: "Product Designer",
      _type: "object",
      name: "Sahra Ortiz",
      plainText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae felis at ante bibendum mollis et et mauris.\n    Quisque id sagittis turpis. Nulla sollicitudin rutrum eros eu dictum. Integer sit amet erat sit amet lectus lacinia mattis. Donec est tortor, fermentum at urna a, accumsan suscipit sem.",
      _key: "jBQ8t5SVf07A9t7MSv0U4",
    },
  ],
};
const meta: Meta<typeof TeamComponent> & any = {
  title: "Sections/Team",
  component: TeamComponent,
  tags: ["autodocs"],
  render: ({ variant, ...args }) => {
    const data = {
      variant,
      variants: args,
    };
    return <TeamComponent data={data} />;
  },
} satisfies Meta<typeof TeamComponent> & any;

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
