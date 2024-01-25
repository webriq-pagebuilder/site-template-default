import type { Meta, StoryObj } from "@storybook/react";
import { Sections, Variants } from "types";
import FeaturedProducts from "../index";

const args = {
  _type: "mainCollection",
  name: "All Products",
  _id: "2bb70613-7104-4c43-a953-ed73eb74473b",
  seo: {
    seoTitle: "Collections | All Products",
    _type: "seoSettings",
  },
  collectionInfoVariant: {
    variant: "defaultVariant",
  },
  sections: [
    {
      _ref: "dfdec206-de4a-4d27-94f3-00eff2ee64bc",
      _type: "slotCollectionInfo",
      _key: "0b81040b8275a8cdc3a52da1f5e37061",
    },
  ],
  _createdAt: "2022-12-02T01:21:56Z",
  _rev: "XghJoDIHyYaQPLh88D8rHt",
  slug: {
    current: "all-products",
    _type: "slug",
  },
  _updatedAt: "2023-05-10T06:29:31Z",
  products: [
    {
      _rev: "uDpwmdKblEGdbs8fmGorpj",
      _updatedAt: "2023-07-28T01:43:06Z",
      slug: {
        current: "sample-yellow-dress",
        _type: "slug",
      },
      _type: "mainProduct",
      ecwidProductId: 543066127,
      name: "SAMPLE. Yellow Dress",
      seo: {
        _type: "seoSettings",
        seoTitle: "Yellow Dress",
      },
      description: [
        {
          children: [
            {
              marks: [],
              text: "Test product",
              _key: "8261897780770",
              _type: "span",
            },
          ],
          _type: "block",
          style: "normal",
          _key: "826189778077",
          markDefs: [],
        },
      ],
      sections: [
        {
          _ref: "b9355212-053e-4c70-bb9c-c1170f9d46c2",
          _type: "slotProductInfo",
          _key: "a8852c9b8b43c55119c73d2d560e5444",
        },
      ],
      productInfo: {
        productDetails: [
          {
            _key: "LV1mGnN7QDBeEbALBg9_J",
            contentType: "textOnly",
            tabName: "Description",
            blockContent: [
              {
                markDefs: [],
                children: [
                  {
                    _type: "span",
                    marks: [],
                    text: "Summer collection and laoreet get",
                    _key: "Z_uz3Tx4gv4gt0FWNvElD",
                  },
                ],
                _type: "block",
                style: "h3",
                _key: "MKHNcpMEc8bF_fwb5ZDL2",
              },
              {
                _type: "block",
                style: "normal",
                _key: "O2ump2cyL7W8T2eIkvvMg",
                markDefs: [],
                children: [
                  {
                    _type: "span",
                    marks: [],
                    text: "I had interdum at ante porta, eleifend feugiat nunc. In semper euismod mi a accums lorem sad. Morbi at auctor nibh. Aliquam tincidunt placerat mollis. Lorem euismod dignissim, felis tortor ollis eros, non ultricies turpis.",
                    _key: "HLTMSS4S5-CAZMmhokDsI",
                  },
                ],
              },
            ],
          },
          {
            _key: "q-PYZmlXu_4nr1oh7lQCc",
            tabName: "Customer reviews",
          },
          {
            tabName: "Shipping & returns",
            _key: "tCPIyJkBHwkgJdXD-OqwX",
          },
          {
            tabName: "Brand",
            _key: "U5vHuLNpLyJgCTGg37EgZ",
          },
        ],
        btnLabel: "ADD TO CART",
        images: [
          {
            image: {
              _type: "image",
              asset: {
                _ref: "image-68925d2831f3d2a863ee277f1cbb3169364888a5-346x500-jpg",
                _type: "reference",
              },
            },
            _type: "item",
            _key: "zTUJwGIUCHzxEV-rDjig9",
          },
        ],
        socialLinks: [
          {
            _type: "details",
            socialMediaIcon: {
              image: {
                _type: "image",
                asset: {
                  _ref: "image-d8a80a1dcaf6f729ba58f5f73fa81aac66a75e0a-48x48-png",
                  _type: "reference",
                },
              },
            },
            socialMediaLink: "https://facebook.com",
            _key: "m4apAWT5jVmSqDW_M8sFD",
            socialMedia: "other",
            socialMediaPlatform: "Facebook",
          },
          {
            socialMediaIcon: {
              image: {
                _type: "image",
                asset: {
                  _ref: "image-f35437826c6054fcf8e1b3adb604e8c67b4fd398-48x48-png",
                  _type: "reference",
                },
              },
            },
            socialMediaLink: "https://instagram.com",
            _key: "hoBuACxqfIiZi6cI9RG_8",
            socialMedia: "other",
            socialMediaPlatform: "Instagram",
            _type: "details",
          },
          {
            socialMediaPlatform: "Twitter",
            _type: "details",
            socialMediaIcon: {
              image: {
                _type: "image",
                asset: {
                  _ref: "image-b651ff0764c0ec2a49db93ca4320d534791bf501-48x48-png",
                  _type: "reference",
                },
              },
            },
            socialMediaLink: "https://twitter.com",
            _key: "Ymp9ZgCm_W7ADTyIU7vkK",
            socialMedia: "other",
          },
        ],
        subtitle: "Yellow Dress",
      },
      productInfoVariant: {
        _type: "productInfoVariant",
        variant: "defaultVariant",
      },
      price: 50,
      _createdAt: "2023-03-31T05:11:43Z",
      _id: "0d879071-8bdc-4b18-8f69-59fda901da4a",
    },
    {
      _updatedAt: "2023-04-25T03:14:29Z",
      description: "Sample product description for this product.",
      ecwidProductId: 190291382,
      sections: [
        {
          _ref: "b9355212-053e-4c70-bb9c-c1170f9d46c2",
          _type: "slotProductInfo",
          _key: "3d9b1172cfc66caf3872df9776753338",
        },
      ],
      price: 110,
      name: "SAMPLE. Black Dress",
      productInfoVariant: {
        variant: "defaultVariant",
      },
      slug: {
        current: "sample-black-dress",
        _type: "slug",
      },
      _rev: "4MfBp9HJw6JHUbUYbWGCgX",
      _type: "mainProduct",
      productInfo: {
        images: [
          {
            image: {
              _type: "image",
              asset: {
                _type: "reference",
                _ref: "image-1b4ec5027684868d7dfae4a7eebd4b2181a452db-1128x1126-png",
              },
            },
            _type: "item",
            _key: "oaed-mvUhPwNwyTEtc5nz",
          },
          {
            image: {
              _type: "image",
              asset: {
                _ref: "image-6a2154724ba1f6d381782b84a92be456f4711ad8-260x260-png",
                _type: "reference",
              },
            },
            _type: "item",
            _key: "jv1hHF-YCIoJlU08XyE2U",
          },
          {
            image: {
              _type: "image",
              asset: {
                _ref: "image-f54c036f71a52f1528a4f85574771999c9f15590-260x260-png",
                _type: "reference",
              },
            },
            _type: "item",
            _key: "zcqot0hk4Sc8eh42b6LMg",
          },
          {
            image: {
              asset: {
                _type: "reference",
                _ref: "image-cf5183207b47111501ef43c08f228d2cac77bba3-260x260-png",
              },
              _type: "image",
            },
            _type: "item",
            _key: "5Cmhp5VJJ-GD3vV7n4Srl",
          },
        ],
        socialLinks: [
          {
            socialMediaIcon: {},
            socialMediaLink: "https://www.facebook.com/",
            _key: "_wB8JX0wcBhTvvFHHRaRB",
            socialMedia: "facebook",
            _type: "details",
          },
          {
            _type: "details",
            socialMediaIcon: {
              image: {
                _type: "image",
                asset: {
                  _ref: "image-f35437826c6054fcf8e1b3adb604e8c67b4fd398-48x48-png",
                  _type: "reference",
                },
              },
            },
            socialMediaLink: "https://instagram.com",
            _key: "dfSorlBOJ7_fNa39gcR2v",
            socialMedia: "other",
            socialMediaPlatform: "Instagram",
          },
          {
            socialMediaPlatform: "Twitter",
            _type: "details",
            socialMediaIcon: {
              image: {
                _type: "image",
                asset: {
                  _ref: "image-b651ff0764c0ec2a49db93ca4320d534791bf501-48x48-png",
                  _type: "reference",
                },
              },
            },
            socialMediaLink: "https://twitter.com",
            _key: "HOiW8d-d30Au58sTjSkj8",
            socialMedia: "other",
          },
        ],
        subtitle: "Brille",
        btnLabel: "ADD TO CART",
      },
      _createdAt: "2022-12-01T08:36:26Z",
      _id: "0cef0e09-7f73-428c-a774-bca5afc545d3",
      seo: {
        _type: "seoSettings",
        seoTitle: "Product | Black dress",
      },
    },
    {
      sections: [
        {
          _ref: "b9355212-053e-4c70-bb9c-c1170f9d46c2",
          _type: "slotProductInfo",
          _key: "f0c1a271746ea7aa27b4203e2e1c3177",
        },
      ],
      _updatedAt: "2023-04-25T03:16:09Z",
      productInfoVariant: {
        variant: "defaultVariant",
      },
      productInfo: {
        btnLabel: "ADD TO CART",
        images: [
          {
            image: {
              _type: "image",
              asset: {
                _ref: "image-1b4ec5027684868d7dfae4a7eebd4b2181a452db-1128x1126-png",
                _type: "reference",
              },
            },
            _type: "item",
            _key: "R6YcP2feCwAG-bI-RDBhe",
          },
          {
            image: {
              asset: {
                _ref: "image-6a2154724ba1f6d381782b84a92be456f4711ad8-260x260-png",
                _type: "reference",
              },
              _type: "image",
            },
            _type: "item",
            _key: "ZZN2mjDTHx4nzi69_fEG4",
          },
          {
            image: {
              _type: "image",
              asset: {
                _ref: "image-f54c036f71a52f1528a4f85574771999c9f15590-260x260-png",
                _type: "reference",
              },
            },
            _type: "item",
            _key: "fglHyRhDc1mwXZdz6WMjP",
          },
          {
            _type: "item",
            _key: "owLBD0sDETJ_Mn0hlyl37",
            image: {
              _type: "image",
              asset: {
                _ref: "image-cf5183207b47111501ef43c08f228d2cac77bba3-260x260-png",
                _type: "reference",
              },
            },
          },
        ],
        socialLinks: [
          {
            _key: "fNyHriClVpTla98r0GNc-",
            socialMedia: "other",
            socialMediaPlatform: "Facebook",
            _type: "details",
            socialMediaIcon: {
              image: {
                _type: "image",
                asset: {
                  _ref: "image-d8a80a1dcaf6f729ba58f5f73fa81aac66a75e0a-48x48-png",
                  _type: "reference",
                },
              },
            },
            socialMediaLink: "https://facebook.com",
          },
          {
            socialMediaPlatform: "Instagram",
            _type: "details",
            socialMediaIcon: {
              image: {
                _type: "image",
                asset: {
                  _ref: "image-f35437826c6054fcf8e1b3adb604e8c67b4fd398-48x48-png",
                  _type: "reference",
                },
              },
            },
            socialMediaLink: "https://instagram.com",
            _key: "a4j6SGok8NomQpZ_XXQNA",
            socialMedia: "other",
          },
          {
            _type: "details",
            socialMediaIcon: {
              image: {
                _type: "image",
                asset: {
                  _ref: "image-b651ff0764c0ec2a49db93ca4320d534791bf501-48x48-png",
                  _type: "reference",
                },
              },
            },
            socialMediaLink: "https://twitter.com",
            _key: "aSezIJAp4AZS5uShn8KjA",
            socialMedia: "other",
            socialMediaPlatform: "Twitter",
          },
        ],
        subtitle: "Brille",
        productDetails: [
          {
            _key: "j7zvnUAYHqC57ywXaLjbj",
            contentType: "textOnly",
            tabName: "Description",
            blockContent: [
              {
                style: "h3",
                _key: "p42uotUHestwzPvIt51r5",
                markDefs: [],
                children: [
                  {
                    _key: "R6F4XLu1zidKBUWqjAiAy",
                    _type: "span",
                    marks: [],
                    text: "Summer collection and laoreet get",
                  },
                ],
                _type: "block",
              },
              {
                children: [
                  {
                    text: "I had interdum at ante porta, eleifend feugiat nunc. In semper euismod mi a accums lorem sad. Morbi at auctor nibh. Aliquam tincidunt placerat mollis. Lorem euismod dignissim, felis tortor ollis eros, non ultricies turpis.",
                    _key: "CL9sUL45ArTtmY27OT7M3",
                    _type: "span",
                    marks: [],
                  },
                ],
                _type: "block",
                style: "normal",
                _key: "Kwey-keCsMAU0kR9P-Jbe",
                markDefs: [],
              },
            ],
          },
          {
            tabName: "Customer reviews",
            _key: "CVQ0O5fVCxTQh8FKhSw-M",
          },
          {
            tabName: "Shipping & returns",
            _key: "PZqvsahuZShvy-YvohAX4",
          },
          {
            tabName: "Brand",
            _key: "7JBch-Fpi56keNKHM_bmu",
          },
        ],
      },
      price: 19.95,
      _createdAt: "2022-12-01T08:32:56Z",
      _id: "9b94d4a3-4055-4321-a618-9fdd3f568fad",
      _type: "mainProduct",
      description:
        "<p>This lightweight crinkle gauze tank features an allover floral print. Scoop neck\n\t\t\t\tdesign with thin, adjustable straps. Elasticized back strap comfortably keeps the shoulder straps in\n\t\t\t\tplace while you’re active. The Billabong emblem stitched onto the back is subtle and won’t\n\t\t\t\tdetract from the rest of your outfit.<br></p><p>Pair it with simple white jeans and a floppy hat for a brunch date with the girls or\n\t\t\t\ta picnic in the park. Available for purchase through SurfRide.\n\t\t\t\t</p><p><strong>Material:</strong> 100% Rayon<br>\n\t\t\t\t<strong>Color:</strong> Jade<br>\n\t\t\t\t<strong>Print: </strong>Floral<br>\n\t\t\t\t<strong>Fit: </strong>Relaxed</p>",
      ecwidProductId: 190291376,
      name: "SAMPLE. Sunglasses",
      _rev: "w8hBPBFSOpF49Odj3yoW54",
      seo: {
        _type: "seoSettings",
        seoTitle: "Product | Sunglasses",
      },
      slug: {
        current: "sample-sunglasses",
        _type: "slug",
      },
    },
    {
      _updatedAt: "2023-04-25T03:15:46Z",
      _rev: "w8hBPBFSOpF49Odj3yoQej",
      _type: "mainProduct",
      ecwidProductId: 190291374,
      sections: [
        {
          _ref: "b9355212-053e-4c70-bb9c-c1170f9d46c2",
          _type: "slotProductInfo",
          _key: "06ca9f6487fdabc90482984e1a2e9656",
        },
      ],
      productInfo: {
        productDetails: [
          {
            tabName: "Description",
            blockContent: [
              {
                markDefs: [],
                children: [
                  {
                    marks: [],
                    text: "Summer collection and laoreet get",
                    _key: "dNkvVWpaB8zGGM4jqMJtm",
                    _type: "span",
                  },
                ],
                _type: "block",
                style: "h3",
                _key: "CzSALAA2-HS7JEdPgMXpx",
              },
              {
                children: [
                  {
                    _key: "7GrWc-aBWqemmq2F6Swll",
                    _type: "span",
                    marks: [],
                    text: "I had interdum at ante porta, eleifend feugiat nunc. In semper euismod mi a accums lorem sad. Morbi at auctor nibh. Aliquam tincidunt placerat mollis. Lorem euismod dignissim, felis tortor ollis eros, non ultricies turpis.",
                  },
                ],
                _type: "block",
                style: "normal",
                _key: "8XPUrCH3A0DZOJx5tm2wD",
                markDefs: [],
              },
            ],
            _key: "kXvoSrEkwQaWlHNKDMrA_",
            contentType: "textOnly",
          },
          {
            tabName: "Customer reviews",
            _key: "7Pi_dcKaXM6UY4D3iJ903",
          },
          {
            tabName: "Shipping & returns",
            _key: "WQtkHUNW7lkJA6U0Qjzh8",
          },
          {
            tabName: "Brand",
            _key: "59cAg7gFmy_Nfq9zteBAh",
          },
        ],
        btnLabel: "ADD TO CART",
        images: [
          {
            _key: "rm9DBQuh_tU4ULwhz9bfy",
            image: {
              _type: "image",
              asset: {
                _ref: "image-1b4ec5027684868d7dfae4a7eebd4b2181a452db-1128x1126-png",
                _type: "reference",
              },
            },
            _type: "item",
          },
          {
            image: {
              _type: "image",
              asset: {
                _ref: "image-6a2154724ba1f6d381782b84a92be456f4711ad8-260x260-png",
                _type: "reference",
              },
            },
            _type: "item",
            _key: "nxUxlwOzdqSkTBX55rAUs",
          },
          {
            image: {
              _type: "image",
              asset: {
                _ref: "image-f54c036f71a52f1528a4f85574771999c9f15590-260x260-png",
                _type: "reference",
              },
            },
            _type: "item",
            _key: "bzFvCOTJeA-OH-uNzHEVp",
          },
          {
            image: {
              _type: "image",
              asset: {
                _ref: "image-cf5183207b47111501ef43c08f228d2cac77bba3-260x260-png",
                _type: "reference",
              },
            },
            _type: "item",
            _key: "20PO4kghOdaYQJy3K9mTk",
          },
        ],
        socialLinks: [
          {
            socialMedia: "other",
            socialMediaPlatform: "Facebook",
            _type: "details",
            socialMediaIcon: {
              image: {
                asset: {
                  _type: "reference",
                  _ref: "image-d8a80a1dcaf6f729ba58f5f73fa81aac66a75e0a-48x48-png",
                },
                _type: "image",
              },
            },
            socialMediaLink: "https://facebook.com",
            _key: "etqruHY28DTA5lZV1tqQl",
          },
          {
            _type: "details",
            socialMediaIcon: {
              image: {
                _type: "image",
                asset: {
                  _ref: "image-f35437826c6054fcf8e1b3adb604e8c67b4fd398-48x48-png",
                  _type: "reference",
                },
              },
            },
            socialMediaLink: "https://instagram.com",
            _key: "ZTNSx4WWGo5aHkmDjbJ4C",
            socialMedia: "other",
            socialMediaPlatform: "Instagram",
          },
          {
            socialMediaLink: "https://twitter.com",
            _key: "GXyy06AT4hWrGXYiaqy67",
            socialMedia: "other",
            socialMediaPlatform: "Twitter",
            _type: "details",
            socialMediaIcon: {
              image: {
                _type: "image",
                asset: {
                  _ref: "image-b651ff0764c0ec2a49db93ca4320d534791bf501-48x48-png",
                  _type: "reference",
                },
              },
            },
          },
        ],
        subtitle: "Brille",
      },
      price: 55,
      _id: "fa680ee7-f4e9-48c3-92bd-5ab794392620",
      slug: {
        current: "sample-boardshorts",
        _type: "slug",
      },
      description: "<p>Sample board shorts test description.</p>",
      _createdAt: "2022-12-01T08:37:18Z",
      name: "SAMPLE. Boardshorts",
      productInfoVariant: {
        variant: "defaultVariant",
      },
    },
  ],
};

const meta = {
  title: "Sections/Featured Products",
  component: FeaturedProducts,
  tags: ["autodocs"],
  render: ({ variant, ...args }) => {
    const data = {
      variant: variant,
      variants: {
        collections: args,
      },
    };

    return <FeaturedProducts data={data} />;
  },
} satisfies Meta<typeof FeaturedProducts> & any;

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
