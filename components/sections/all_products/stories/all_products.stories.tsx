import type { Meta, StoryObj } from "@storybook/react";
import AppPromoComponent from "../index";
import { Sections } from "types";

const args = {
  allProducts: [
    {
      collectionInfoVariant: {
        variant: "variant_a",
      },
      slug: {
        current: "all-products",
        _type: "slug",
      },
      products: [
        {
          description: [
            {
              _key: "826189778077",
              markDefs: [],
              children: [
                {
                  _type: "span",
                  marks: [],
                  text: "Test product",
                  _key: "8261897780770",
                },
              ],
              _type: "block",
              style: "normal",
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
                    _type: "block",
                    style: "h3",
                    _key: "MKHNcpMEc8bF_fwb5ZDL2",
                    markDefs: [],
                    children: [
                      {
                        text: "Summer collection and laoreet get",
                        _key: "Z_uz3Tx4gv4gt0FWNvElD",
                        _type: "span",
                        marks: [],
                      },
                    ],
                  },
                  {
                    style: "normal",
                    _key: "O2ump2cyL7W8T2eIkvvMg",
                    markDefs: [],
                    children: [
                      {
                        marks: [],
                        text: "I had interdum at ante porta, eleifend feugiat nunc. In semper euismod mi a accums lorem sad. Morbi at auctor nibh. Aliquam tincidunt placerat mollis. Lorem euismod dignissim, felis tortor ollis eros, non ultricies turpis.",
                        _key: "HLTMSS4S5-CAZMmhokDsI",
                        _type: "span",
                      },
                    ],
                    _type: "block",
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
                _key: "zTUJwGIUCHzxEV-rDjig9",
                image: {
                  _type: "image",
                  asset: {
                    _ref: "image-68925d2831f3d2a863ee277f1cbb3169364888a5-346x500-jpg",
                    _type: "reference",
                  },
                },
                _type: "item",
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
                _key: "hoBuACxqfIiZi6cI9RG_8",
                socialMedia: "other",
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
          name: "SAMPLE. Yellow Dress",
          seo: {
            _type: "seoSettings",
            seoTitle: "Yellow Dress",
          },
          slug: {
            current: "sample-yellow-dress",
            _type: "slug",
          },
          _rev: "uDpwmdKblEGdbs8fmGorpj",
          _type: "mainProduct",
          _id: "0d879071-8bdc-4b18-8f69-59fda901da4a",
          _updatedAt: "2023-07-28T01:43:06Z",
          ecwidProductId: 543066127,
          productInfoVariant: {
            _type: "productInfoVariant",
            variant: "defaultVariant",
          },
          sections: [
            {
              _ref: "b9355212-053e-4c70-bb9c-c1170f9d46c2",
              _type: "slotProductInfo",
              _key: "a8852c9b8b43c55119c73d2d560e5444",
            },
          ],
          price: 50,
          _createdAt: "2023-03-31T05:11:43Z",
        },
        {
          _type: "mainProduct",
          description: "Sample product description for this product.",
          sections: [
            {
              _ref: "b9355212-053e-4c70-bb9c-c1170f9d46c2",
              _type: "slotProductInfo",
              _key: "3d9b1172cfc66caf3872df9776753338",
            },
          ],
          _updatedAt: "2023-04-25T03:14:29Z",
          slug: {
            current: "sample-black-dress",
            _type: "slug",
          },
          productInfoVariant: {
            variant: "defaultVariant",
          },
          productInfo: {
            subtitle: "Brille",
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
                _key: "oaed-mvUhPwNwyTEtc5nz",
              },
              {
                _key: "jv1hHF-YCIoJlU08XyE2U",
                image: {
                  _type: "image",
                  asset: {
                    _ref: "image-6a2154724ba1f6d381782b84a92be456f4711ad8-260x260-png",
                    _type: "reference",
                  },
                },
                _type: "item",
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
                    _ref: "image-cf5183207b47111501ef43c08f228d2cac77bba3-260x260-png",
                    _type: "reference",
                  },
                  _type: "image",
                },
                _type: "item",
                _key: "5Cmhp5VJJ-GD3vV7n4Srl",
              },
            ],
            socialLinks: [
              {
                _key: "_wB8JX0wcBhTvvFHHRaRB",
                socialMedia: "facebook",
                _type: "details",
                socialMediaIcon: {},
                socialMediaLink: "https://www.facebook.com/",
              },
              {
                _key: "dfSorlBOJ7_fNa39gcR2v",
                socialMedia: "other",
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
              },
              {
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
                socialMediaLink: "https://twitter.com",
                _key: "HOiW8d-d30Au58sTjSkj8",
              },
            ],
          },
          _createdAt: "2022-12-01T08:36:26Z",
          _id: "0cef0e09-7f73-428c-a774-bca5afc545d3",
          _rev: "4MfBp9HJw6JHUbUYbWGCgX",
          ecwidProductId: 190291382,
          price: 110,
          name: "SAMPLE. Black Dress",
          seo: {
            _type: "seoSettings",
            seoTitle: "Product | Black dress",
          },
        },
        {
          _rev: "w8hBPBFSOpF49Odj3yoW54",
          _updatedAt: "2023-04-25T03:16:09Z",
          productInfoVariant: {
            variant: "defaultVariant",
          },
          slug: {
            current: "sample-sunglasses",
            _type: "slug",
          },
          description:
            "<p>This lightweight crinkle gauze tank features an allover floral print. Scoop neck\n\t\t\t\tdesign with thin, adjustable straps. Elasticized back strap comfortably keeps the shoulder straps in\n\t\t\t\tplace while you’re active. The Billabong emblem stitched onto the back is subtle and won’t\n\t\t\t\tdetract from the rest of your outfit.<br></p><p>Pair it with simple white jeans and a floppy hat for a brunch date with the girls or\n\t\t\t\ta picnic in the park. Available for purchase through SurfRide.\n\t\t\t\t</p><p><strong>Material:</strong> 100% Rayon<br>\n\t\t\t\t<strong>Color:</strong> Jade<br>\n\t\t\t\t<strong>Print: </strong>Floral<br>\n\t\t\t\t<strong>Fit: </strong>Relaxed</p>",
          ecwidProductId: 190291376,
          sections: [
            {
              _ref: "b9355212-053e-4c70-bb9c-c1170f9d46c2",
              _type: "slotProductInfo",
              _key: "f0c1a271746ea7aa27b4203e2e1c3177",
            },
          ],
          price: 19.95,
          _createdAt: "2022-12-01T08:32:56Z",
          name: "SAMPLE. Sunglasses",
          _id: "9b94d4a3-4055-4321-a618-9fdd3f568fad",
          seo: {
            _type: "seoSettings",
            seoTitle: "Product | Sunglasses",
          },
          _type: "mainProduct",
          productInfo: {
            subtitle: "Brille",
            productDetails: [
              {
                tabName: "Description",
                blockContent: [
                  {
                    _key: "p42uotUHestwzPvIt51r5",
                    markDefs: [],
                    children: [
                      {
                        _type: "span",
                        marks: [],
                        text: "Summer collection and laoreet get",
                        _key: "R6F4XLu1zidKBUWqjAiAy",
                      },
                    ],
                    _type: "block",
                    style: "h3",
                  },
                  {
                    children: [
                      {
                        _key: "CL9sUL45ArTtmY27OT7M3",
                        _type: "span",
                        marks: [],
                        text: "I had interdum at ante porta, eleifend feugiat nunc. In semper euismod mi a accums lorem sad. Morbi at auctor nibh. Aliquam tincidunt placerat mollis. Lorem euismod dignissim, felis tortor ollis eros, non ultricies turpis.",
                      },
                    ],
                    _type: "block",
                    style: "normal",
                    _key: "Kwey-keCsMAU0kR9P-Jbe",
                    markDefs: [],
                  },
                ],
                _key: "j7zvnUAYHqC57ywXaLjbj",
                contentType: "textOnly",
              },
              {
                _key: "CVQ0O5fVCxTQh8FKhSw-M",
                tabName: "Customer reviews",
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
                _key: "fglHyRhDc1mwXZdz6WMjP",
                image: {
                  _type: "image",
                  asset: {
                    _type: "reference",
                    _ref: "image-f54c036f71a52f1528a4f85574771999c9f15590-260x260-png",
                  },
                },
                _type: "item",
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
                _key: "owLBD0sDETJ_Mn0hlyl37",
              },
            ],
            socialLinks: [
              {
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
                _key: "fNyHriClVpTla98r0GNc-",
                socialMedia: "other",
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
                socialMedia: "other",
                socialMediaPlatform: "Twitter",
                _type: "details",
                socialMediaIcon: {
                  image: {
                    asset: {
                      _ref: "image-b651ff0764c0ec2a49db93ca4320d534791bf501-48x48-png",
                      _type: "reference",
                    },
                    _type: "image",
                  },
                },
                socialMediaLink: "https://twitter.com",
                _key: "aSezIJAp4AZS5uShn8KjA",
              },
            ],
          },
        },
        {
          ecwidProductId: 190291374,
          sections: [
            {
              _ref: "b9355212-053e-4c70-bb9c-c1170f9d46c2",
              _type: "slotProductInfo",
              _key: "06ca9f6487fdabc90482984e1a2e9656",
            },
          ],
          productInfo: {
            socialLinks: [
              {
                socialMediaLink: "https://facebook.com",
                _key: "etqruHY28DTA5lZV1tqQl",
                socialMedia: "other",
                socialMediaPlatform: "Facebook",
                _type: "details",
                socialMediaIcon: {
                  image: {
                    _type: "image",
                    asset: {
                      _type: "reference",
                      _ref: "image-d8a80a1dcaf6f729ba58f5f73fa81aac66a75e0a-48x48-png",
                    },
                  },
                },
              },
              {
                socialMedia: "other",
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
                _key: "ZTNSx4WWGo5aHkmDjbJ4C",
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
                _key: "GXyy06AT4hWrGXYiaqy67",
                socialMedia: "other",
              },
            ],
            subtitle: "Brille",
            productDetails: [
              {
                tabName: "Description",
                blockContent: [
                  {
                    _type: "block",
                    style: "h3",
                    _key: "CzSALAA2-HS7JEdPgMXpx",
                    markDefs: [],
                    children: [
                      {
                        _type: "span",
                        marks: [],
                        text: "Summer collection and laoreet get",
                        _key: "dNkvVWpaB8zGGM4jqMJtm",
                      },
                    ],
                  },
                  {
                    _key: "8XPUrCH3A0DZOJx5tm2wD",
                    markDefs: [],
                    children: [
                      {
                        _type: "span",
                        marks: [],
                        text: "I had interdum at ante porta, eleifend feugiat nunc. In semper euismod mi a accums lorem sad. Morbi at auctor nibh. Aliquam tincidunt placerat mollis. Lorem euismod dignissim, felis tortor ollis eros, non ultricies turpis.",
                        _key: "7GrWc-aBWqemmq2F6Swll",
                      },
                    ],
                    _type: "block",
                    style: "normal",
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
                image: {
                  _type: "image",
                  asset: {
                    _ref: "image-1b4ec5027684868d7dfae4a7eebd4b2181a452db-1128x1126-png",
                    _type: "reference",
                  },
                },
                _type: "item",
                _key: "rm9DBQuh_tU4ULwhz9bfy",
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
                _type: "item",
                _key: "20PO4kghOdaYQJy3K9mTk",
                image: {
                  _type: "image",
                  asset: {
                    _ref: "image-cf5183207b47111501ef43c08f228d2cac77bba3-260x260-png",
                    _type: "reference",
                  },
                },
              },
            ],
          },
          _createdAt: "2022-12-01T08:37:18Z",
          productInfoVariant: {
            variant: "defaultVariant",
          },
          _rev: "w8hBPBFSOpF49Odj3yoQej",
          _type: "mainProduct",
          description: "<p>Sample board shorts test description.</p>",
          price: 55,
          name: "SAMPLE. Boardshorts",
          _id: "fa680ee7-f4e9-48c3-92bd-5ab794392620",
          _updatedAt: "2023-04-25T03:15:46Z",
          slug: {
            current: "sample-boardshorts",
            _type: "slug",
          },
        },
      ],
      _type: "mainCollection",
      seo: {
        _type: "seoSettings",
        seoTitle: "Collections | All Products",
      },
      _updatedAt: "2024-01-25T23:49:42Z",
      sections: [
        {
          _ref: "391b3822-7261-4cc2-ae8f-256083151b0b",
          _type: "navigation",
          _key: "aa521b0d2a54",
        },
        {
          _type: "slotCollectionInfo",
          _key: "0b81040b8275a8cdc3a52da1f5e37061",
          _ref: "dfdec206-de4a-4d27-94f3-00eff2ee64bc",
        },
      ],
      _id: "2bb70613-7104-4c43-a953-ed73eb74473b",
      _rev: "GDqWO6XlliaZ7kgo9SRvLQ",
      name: "All Products",
      _createdAt: "2022-12-02T01:21:56Z",
    },
    {
      _updatedAt: "2023-05-10T10:40:31Z",
      slug: {
        current: "dress",
        _type: "slug",
      },
      _rev: "XghJoDIHyYaQPLh88DoLD5",
      _createdAt: "2023-05-10T06:31:58Z",
      sections: [
        {
          _ref: "dfdec206-de4a-4d27-94f3-00eff2ee64bc",
          _type: "slotCollectionInfo",
          _key: "a6a992f357db64930a6832c89213c4d2",
        },
      ],
      _type: "mainCollection",
      _id: "9fa06216-c13c-4d7a-8e13-3e6a7d35b308",
      collectionInfoVariant: {
        _type: "collectionInfoVariant",
        variant: "defaultVariant",
      },
      products: [
        {
          productInfoVariant: {
            variant: "defaultVariant",
          },
          _createdAt: "2022-12-01T08:36:26Z",
          _id: "0cef0e09-7f73-428c-a774-bca5afc545d3",
          productInfo: {
            subtitle: "Brille",
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
                _key: "oaed-mvUhPwNwyTEtc5nz",
              },
              {
                _key: "jv1hHF-YCIoJlU08XyE2U",
                image: {
                  _type: "image",
                  asset: {
                    _ref: "image-6a2154724ba1f6d381782b84a92be456f4711ad8-260x260-png",
                    _type: "reference",
                  },
                },
                _type: "item",
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
                    _ref: "image-cf5183207b47111501ef43c08f228d2cac77bba3-260x260-png",
                    _type: "reference",
                  },
                  _type: "image",
                },
                _type: "item",
                _key: "5Cmhp5VJJ-GD3vV7n4Srl",
              },
            ],
            socialLinks: [
              {
                _key: "_wB8JX0wcBhTvvFHHRaRB",
                socialMedia: "facebook",
                _type: "details",
                socialMediaIcon: {},
                socialMediaLink: "https://www.facebook.com/",
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
                _key: "dfSorlBOJ7_fNa39gcR2v",
                socialMedia: "other",
                socialMediaPlatform: "Instagram",
                _type: "details",
              },
              {
                socialMediaLink: "https://twitter.com",
                _key: "HOiW8d-d30Au58sTjSkj8",
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
          },
          ecwidProductId: 190291382,
          price: 110,
          name: "SAMPLE. Black Dress",
          seo: {
            _type: "seoSettings",
            seoTitle: "Product | Black dress",
          },
          _rev: "4MfBp9HJw6JHUbUYbWGCgX",
          description: "Sample product description for this product.",
          sections: [
            {
              _ref: "b9355212-053e-4c70-bb9c-c1170f9d46c2",
              _type: "slotProductInfo",
              _key: "3d9b1172cfc66caf3872df9776753338",
            },
          ],
          _updatedAt: "2023-04-25T03:14:29Z",
          slug: {
            current: "sample-black-dress",
            _type: "slug",
          },
          _type: "mainProduct",
        },
        {
          ecwidProductId: 543066127,
          productInfoVariant: {
            _type: "productInfoVariant",
            variant: "defaultVariant",
          },
          sections: [
            {
              _ref: "b9355212-053e-4c70-bb9c-c1170f9d46c2",
              _type: "slotProductInfo",
              _key: "a8852c9b8b43c55119c73d2d560e5444",
            },
          ],
          price: 50,
          _createdAt: "2023-03-31T05:11:43Z",
          seo: {
            _type: "seoSettings",
            seoTitle: "Yellow Dress",
          },
          slug: {
            current: "sample-yellow-dress",
            _type: "slug",
          },
          description: [
            {
              markDefs: [],
              children: [
                {
                  _type: "span",
                  marks: [],
                  text: "Test product",
                  _key: "8261897780770",
                },
              ],
              _type: "block",
              style: "normal",
              _key: "826189778077",
            },
          ],
          productInfo: {
            images: [
              {
                _key: "zTUJwGIUCHzxEV-rDjig9",
                image: {
                  _type: "image",
                  asset: {
                    _ref: "image-68925d2831f3d2a863ee277f1cbb3169364888a5-346x500-jpg",
                    _type: "reference",
                  },
                },
                _type: "item",
              },
            ],
            socialLinks: [
              {
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
                _type: "details",
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
                socialMediaLink: "https://twitter.com",
                _key: "Ymp9ZgCm_W7ADTyIU7vkK",
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
            subtitle: "Yellow Dress",
            productDetails: [
              {
                _key: "LV1mGnN7QDBeEbALBg9_J",
                contentType: "textOnly",
                tabName: "Description",
                blockContent: [
                  {
                    _key: "MKHNcpMEc8bF_fwb5ZDL2",
                    markDefs: [],
                    children: [
                      {
                        text: "Summer collection and laoreet get",
                        _key: "Z_uz3Tx4gv4gt0FWNvElD",
                        _type: "span",
                        marks: [],
                      },
                    ],
                    _type: "block",
                    style: "h3",
                  },
                  {
                    _key: "O2ump2cyL7W8T2eIkvvMg",
                    markDefs: [],
                    children: [
                      {
                        marks: [],
                        text: "I had interdum at ante porta, eleifend feugiat nunc. In semper euismod mi a accums lorem sad. Morbi at auctor nibh. Aliquam tincidunt placerat mollis. Lorem euismod dignissim, felis tortor ollis eros, non ultricies turpis.",
                        _key: "HLTMSS4S5-CAZMmhokDsI",
                        _type: "span",
                      },
                    ],
                    _type: "block",
                    style: "normal",
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
          },
          name: "SAMPLE. Yellow Dress",
          _updatedAt: "2023-07-28T01:43:06Z",
          _rev: "uDpwmdKblEGdbs8fmGorpj",
          _type: "mainProduct",
          _id: "0d879071-8bdc-4b18-8f69-59fda901da4a",
        },
      ],
      name: "Dress",
    },
  ],
};

const meta = {
  title: "CStudio/All Products",
  component: AppPromoComponent,
  tags: ["autodocs"],
  render: ({ variant, ...args }) => {
    const data = {
      variant: variant,
      variants: args,
    };

    return <AppPromoComponent data={data} />;
  },
} satisfies Meta<typeof AppPromoComponent> & any;

export default meta;
type Story = StoryObj<Sections> & any;

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
