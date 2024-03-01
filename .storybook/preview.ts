import type { Preview } from "@storybook/react";
import { fn } from "@storybook/test";
import { rest } from "msw";
import { initialize, mswLoader } from "msw-storybook-addon";
import "../styles/globals.css";

// Initialize MSW
initialize({
  onUnhandledRequest: "bypass",
});

const preview: Preview = {
  parameters: {
    args: { onClick: fn() },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    msw: {
      handlers: {
        ecwid: [
          rest.get("/api/ecwid/products/search", (req, res, ctx) => {
            return res(ctx.json(DUMMY_SEARCH));
          }),
          rest.get("/api/ecwid/products/:id", (req, res, ctx) => {
            return res(ctx.json({ result: DUMMY_ECWID_PRODUCT }));
          }),
        ],
        stripe: [
          rest.post(
            `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/stripe`,
            (req, res, ctx) => {
              const mockResponse = {
                params: {
                  resource: "products",
                  action: "retrieve",
                },
              };
              return res(ctx.json(mockResponse));
            }
          ),
          rest.post(
            `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/stripe`,
            (req, res, ctx) => {
              const mockResponse = {
                params: {
                  resource: "prices",
                  action: "list",
                },
              };
              return res(ctx.json(mockResponse));
            }
          ),
        ],
      },
    },
  },
  loaders: [mswLoader],
};

export default preview;

//CSTUDIO ECWID API MOCKS

const DUMMY_SEARCH = {
  total: 4,
  count: 4,
  offset: 0,
  limit: 100,
  items: [
    {
      id: 543066127,
      sku: "00041",
      unlimited: true,
      inStock: true,
      name: "SAMPLE. Yellow Dress",
      price: 50,
      priceInProductList: 50,
      defaultDisplayedPrice: 50,
      defaultDisplayedPriceFormatted: "$50.00",
      tax: [Object],
      isShippingRequired: true,
      hasFreeShipping: false,
      weight: 0,
      url: "https://store27901018.shopsettings.com/SAMPLE-Yellow-Dress-p543066127",
      autogeneratedSlug: "sample-yellow-dress",
      customSlug: "",
      created: "2023-03-31 05:17:57 +0000",
      updated: "2023-07-04 07:57:39 +0000",
      createTimestamp: 1680239877,
      updateTimestamp: 1688457459,
      productClassId: 0,
      enabled: true,
      options: [],
      fixedShippingRateOnly: false,
      fixedShippingRate: 0,
      shipping: [Object],
      defaultCombinationId: 0,
      description: "<p>Test product</p>",
      galleryImages: [],
      media: [Object],
      categoryIds: [],
      categories: [],
      defaultCategoryId: 0,
      seoTitle: "SAMPLE. Yellow Dress",
      seoDescription: "Test product",
      attributes: [],
      relatedProducts: [Object],
      combinations: [],
      volume: 0,
      showOnFrontpage: 55,
      isSampleProduct: false,
      googleItemCondition: "NEW",
      isGiftCard: false,
      discountsAllowed: true,
      nameYourPriceEnabled: false,
    },
    {
      id: 190291382,
      sku: "0008",
      thumbnailUrl:
        "https://d2j6dbq0eux0bg.cloudfront.net/default-store/black_dress_400px.jpg",
      unlimited: true,
      inStock: true,
      name: "SAMPLE. Black Dress",
      price: 110,
      priceInProductList: 110,
      defaultDisplayedPrice: 110,
      defaultDisplayedPriceFormatted: "$110.00",
      tax: [Object],
      isShippingRequired: true,
      hasFreeShipping: false,
      weight: 0,
      url: "https://store27901018.shopsettings.com/SAMPLE-Black-Dress-p190291382",
      autogeneratedSlug: "sample-black-dress",
      customSlug: "",
      created: "2016-07-28 12:18:04 +0000",
      updated: "2023-07-28 01:06:02 +0000",
      createTimestamp: 1469708284,
      updateTimestamp: 1690506362,
      productClassId: 0,
      enabled: true,
      options: [Array],
      fixedShippingRateOnly: false,
      fixedShippingRate: 0,
      shipping: [Object],
      defaultCombinationId: 0,
      imageUrl:
        "https://d2j6dbq0eux0bg.cloudfront.net/default-store/black_dress_1500px.jpg",
      smallThumbnailUrl:
        "https://d2j6dbq0eux0bg.cloudfront.net/default-store/black_dress_160px.jpg",
      hdThumbnailUrl:
        "https://d2j6dbq0eux0bg.cloudfront.net/default-store/black_dress_800px.jpg",
      originalImageUrl:
        "https://d2j6dbq0eux0bg.cloudfront.net/default-store/black_dress_original.jpg",
      originalImage: [Object],
      borderInfo: [Object],
      description:
        "<p><strong>Sample </strong>product <em>description </em>for this product.\n" +
        "</p>",
      galleryImages: [Array],
      media: [Object],
      categoryIds: [],
      categories: [],
      defaultCategoryId: 0,
      seoTitle: "SAMPLE. Black Dress",
      seoDescription: "Sample product description for this product.",
      attributes: [],
      relatedProducts: [Object],
      combinations: [],
      volume: 0,
      showOnFrontpage: 7,
      isSampleProduct: false,
      googleItemCondition: "NEW",
      isGiftCard: false,
      discountsAllowed: true,
      ribbon: [Object],
      ribbonTranslated: [Object],
      nameYourPriceEnabled: false,
    },
    {
      id: 190291376,
      sku: "0006",
      thumbnailUrl:
        "https://d2j6dbq0eux0bg.cloudfront.net/default-store/sunglasses_400px.jpg",
      quantity: 0,
      unlimited: false,
      inStock: false,
      name: "SAMPLE. Sunglasses",
      price: 19.95,
      priceInProductList: 19.95,
      defaultDisplayedPrice: 19.95,
      defaultDisplayedPriceFormatted: "$19.95",
      tax: [Object],
      isShippingRequired: true,
      hasFreeShipping: false,
      weight: 0,
      url: "https://store27901018.shopsettings.com/SAMPLE-Sunglasses-p190291376",
      autogeneratedSlug: "sample-sunglasses",
      customSlug: "",
      created: "2016-07-28 12:44:11 +0000",
      updated: "2023-04-25 03:16:07 +0000",
      createTimestamp: 1469709851,
      updateTimestamp: 1682392567,
      productClassId: 0,
      enabled: true,
      options: [Array],
      fixedShippingRateOnly: false,
      fixedShippingRate: 0,
      shipping: [Object],
      defaultCombinationId: 0,
      imageUrl:
        "https://d2j6dbq0eux0bg.cloudfront.net/default-store/sunglasses_1500px.jpg",
      smallThumbnailUrl:
        "https://d2j6dbq0eux0bg.cloudfront.net/default-store/sunglasses_160px.jpg",
      hdThumbnailUrl:
        "https://d2j6dbq0eux0bg.cloudfront.net/default-store/sunglasses_800px.jpg",
      originalImageUrl:
        "https://d2j6dbq0eux0bg.cloudfront.net/default-store/sunglasses_original.jpg",
      originalImage: [Object],
      borderInfo: [Object],
      description:
        "<p>This lightweight crinkle gauze tank features an allover floral print. Scoop neck\n" +
        "\t\t\t\tdesign with thin, adjustable straps. Elasticized back strap comfortably keeps the shoulder straps in\n" +
        "\t\t\t\tplace while you’re active. The Billabong emblem stitched onto the back is subtle and won’t\n" +
        "\t\t\t\tdetract from the rest of your outfit.<br></p><p>Pair it with simple white jeans and a floppy hat for a brunch date with the girls or\n" +
        "\t\t\t\ta picnic in the park. Available for purchase through SurfRide.\n" +
        "\t\t\t\t</p><p><strong>Material:</strong> 100% Rayon<br>\n" +
        "\t\t\t\t<strong>Color:</strong> Jade<br>\n" +
        "\t\t\t\t<strong>Print: </strong>Floral<br>\n" +
        "\t\t\t\t<strong>Fit: </strong>Relaxed</p>",
      galleryImages: [Array],
      media: [Object],
      categoryIds: [],
      categories: [],
      defaultCategoryId: 0,
      seoTitle: "SAMPLE. Sunglasses",
      seoDescription:
        "This lightweight crinkle gauze tank features an allover floral print. Scoop neck\n" +
        "\t\t\t\tdesign with thin, adjustable straps. Elasticized back strap comfortably keeps the shoulder straps in\n" +
        "\t\t\t\tplace while you’re active. The Billabong emblem stitched onto the back is subtle and won’t\n" +
        "\t\t\t\tdetract from the rest of your outfit. Pair it with simple white jeans and a floppy hat for a brunch date with the girls or\n" +
        "\t\t\t\ta picnic in the park. Available for purchase through SurfRide.\n" +
        "\t\t\t\t Material: 100% Rayon \n" +
        "\t\t\t\t Color: Jade \n" +
        "\t\t\t\t Print: Floral \n" +
        "\t\t\t\t Fit: Relaxed",
      attributes: [],
      relatedProducts: [Object],
      combinations: [],
      volume: 0,
      showOnFrontpage: 5,
      isSampleProduct: false,
      googleItemCondition: "NEW",
      isGiftCard: false,
      discountsAllowed: true,
      nameYourPriceEnabled: false,
    },
    {
      id: 190291374,
      sku: "0002",
      thumbnailUrl:
        "https://d2j6dbq0eux0bg.cloudfront.net/default-store/boardshorts_400px.jpg",
      unlimited: true,
      inStock: true,
      name: "SAMPLE. Boardshorts",
      price: 55,
      priceInProductList: 55,
      defaultDisplayedPrice: 55,
      defaultDisplayedPriceFormatted: "$55.00",
      tax: [Object],
      isShippingRequired: true,
      hasFreeShipping: false,
      weight: 0,
      url: "https://store27901018.shopsettings.com/SAMPLE-Boardshorts-p190291374",
      autogeneratedSlug: "sample-boardshorts",
      customSlug: "",
      created: "2016-07-28 12:52:38 +0000",
      updated: "2023-04-25 03:15:46 +0000",
      createTimestamp: 1469710358,
      updateTimestamp: 1682392546,
      productClassId: 0,
      enabled: true,
      options: [Array],
      fixedShippingRateOnly: false,
      fixedShippingRate: 0,
      shipping: [Object],
      defaultCombinationId: 0,
      imageUrl:
        "https://d2j6dbq0eux0bg.cloudfront.net/default-store/boardshorts_1500px.jpg",
      smallThumbnailUrl:
        "https://d2j6dbq0eux0bg.cloudfront.net/default-store/boardshorts_160px.jpg",
      hdThumbnailUrl:
        "https://d2j6dbq0eux0bg.cloudfront.net/default-store/boardshorts_800px.jpg",
      originalImageUrl:
        "https://d2j6dbq0eux0bg.cloudfront.net/default-store/boardshorts_original.jpg",
      originalImage: [Object],
      borderInfo: [Object],
      description: "<p>Sample board shorts test description.</p>",
      galleryImages: [Array],
      media: [Object],
      categoryIds: [],
      categories: [],
      defaultCategoryId: 0,
      seoTitle: "SAMPLE. Boardshorts",
      seoDescription: "Sample board shorts test description.",
      attributes: [],
      relatedProducts: [Object],
      combinations: [],
      volume: 0,
      showOnFrontpage: 1,
      isSampleProduct: false,
      googleItemCondition: "NEW",
      isGiftCard: false,
      discountsAllowed: true,
      ribbon: [Object],
      ribbonTranslated: [Object],
      nameYourPriceEnabled: false,
    },
  ],
};

const DUMMY_ECWID_PRODUCT = {
  id: 190291382,
  sku: "0008",
  thumbnailUrl:
    "https://d2j6dbq0eux0bg.cloudfront.net/default-store/black_dress_400px.jpg",
  unlimited: true,
  inStock: true,
  name: "SAMPLE. Black Dress",
  price: 110,
  priceInProductList: 110,
  defaultDisplayedPrice: 110,
  defaultDisplayedPriceFormatted: "$110.00",
  tax: {
    taxable: true,
    defaultLocationIncludedTaxRate: 0,
    enabledManualTaxes: [],
    taxClassCode: "default",
  },
  isShippingRequired: true,
  hasFreeShipping: false,
  weight: 0,
  url: "https://store27901018.shopsettings.com/SAMPLE-Black-Dress-p190291382",
  autogeneratedSlug: "sample-black-dress",
  customSlug: "",
  created: "2016-07-28 12:18:04 +0000",
  updated: "2023-07-28 01:06:02 +0000",
  createTimestamp: 1469708284,
  updateTimestamp: 1690506362,
  productClassId: 0,
  enabled: true,
  options: [
    {
      type: "SELECT",
      name: "Size",
      nameTranslated: {
        en: "Size",
      },
      choices: [
        {
          text: "S",
          textTranslated: {
            en: "S",
          },
          priceModifier: 0,
          priceModifierType: "ABSOLUTE",
        },
        {
          text: "M",
          textTranslated: {
            en: "M",
          },
          priceModifier: 10,
          priceModifierType: "ABSOLUTE",
        },
        {
          text: "L",
          textTranslated: {
            en: "L",
          },
          priceModifier: 0,
          priceModifierType: "ABSOLUTE",
        },
      ],
      defaultChoice: 0,
      required: false,
    },
  ],
  fixedShippingRateOnly: false,
  fixedShippingRate: 0,
  shipping: {
    type: "GLOBAL_METHODS",
    methodMarkup: 0,
    flatRate: 0,
    disabledMethods: [],
    enabledMethods: [],
  },
  defaultCombinationId: 0,
  imageUrl:
    "https://d2j6dbq0eux0bg.cloudfront.net/default-store/black_dress_1500px.jpg",
  smallThumbnailUrl:
    "https://d2j6dbq0eux0bg.cloudfront.net/default-store/black_dress_160px.jpg",
  hdThumbnailUrl:
    "https://d2j6dbq0eux0bg.cloudfront.net/default-store/black_dress_800px.jpg",
  originalImageUrl:
    "https://d2j6dbq0eux0bg.cloudfront.net/default-store/black_dress_original.jpg",
  originalImage: {
    url: "https://d2j6dbq0eux0bg.cloudfront.net/default-store/black_dress_original.jpg",
    width: 1365,
    height: 1365,
  },
  borderInfo: {
    dominatingColor: {
      red: 227,
      green: 229,
      blue: 232,
      alpha: 255,
    },
    homogeneity: false,
  },
  description:
    "<p><strong>Sample </strong>product <em>description </em>for this product.\n</p>",
  galleryImages: [
    {
      id: 1,
      url: "https://d2j6dbq0eux0bg.cloudfront.net/default-store/black_dress-1_original.jpg",
      thumbnail:
        "https://d2j6dbq0eux0bg.cloudfront.net/default-store/black_dress-1_160px.jpg",
      originalImageUrl:
        "https://d2j6dbq0eux0bg.cloudfront.net/default-store/black_dress-1_original.jpg",
      imageUrl:
        "https://d2j6dbq0eux0bg.cloudfront.net/default-store/black_dress-1_1500px.jpg",
      hdThumbnailUrl:
        "https://d2j6dbq0eux0bg.cloudfront.net/default-store/black_dress-1_800px.jpg",
      thumbnailUrl:
        "https://d2j6dbq0eux0bg.cloudfront.net/default-store/black_dress-1_400px.jpg",
      smallThumbnailUrl:
        "https://d2j6dbq0eux0bg.cloudfront.net/default-store/black_dress-1_160px.jpg",
      width: 700,
      height: 931,
      orderBy: 0,
      borderInfo: {
        dominatingColor: {
          red: 255,
          green: 255,
          blue: 255,
          alpha: 255,
        },
        homogeneity: true,
      },
    },
    {
      id: 2,
      url: "https://d2j6dbq0eux0bg.cloudfront.net/default-store/black_dress-2_original.jpg",
      thumbnail:
        "https://d2j6dbq0eux0bg.cloudfront.net/default-store/black_dress-2_160px.jpg",
      originalImageUrl:
        "https://d2j6dbq0eux0bg.cloudfront.net/default-store/black_dress-2_original.jpg",
      imageUrl:
        "https://d2j6dbq0eux0bg.cloudfront.net/default-store/black_dress-2_1500px.jpg",
      hdThumbnailUrl:
        "https://d2j6dbq0eux0bg.cloudfront.net/default-store/black_dress-2_800px.jpg",
      thumbnailUrl:
        "https://d2j6dbq0eux0bg.cloudfront.net/default-store/black_dress-2_400px.jpg",
      smallThumbnailUrl:
        "https://d2j6dbq0eux0bg.cloudfront.net/default-store/black_dress-2_160px.jpg",
      width: 700,
      height: 931,
      orderBy: 1,
      borderInfo: {
        dominatingColor: {
          red: 255,
          green: 255,
          blue: 255,
          alpha: 255,
        },
        homogeneity: true,
      },
    },
  ],
  media: {
    images: [
      {
        id: "0",
        isMain: true,
        orderBy: 0,
        image160pxUrl:
          "https://d2j6dbq0eux0bg.cloudfront.net/default-store/black_dress_160px.jpg",
        image400pxUrl:
          "https://d2j6dbq0eux0bg.cloudfront.net/default-store/black_dress_400px.jpg",
        image800pxUrl:
          "https://d2j6dbq0eux0bg.cloudfront.net/default-store/black_dress_800px.jpg",
        image1500pxUrl:
          "https://d2j6dbq0eux0bg.cloudfront.net/default-store/black_dress_1500px.jpg",
        imageOriginalUrl:
          "https://d2j6dbq0eux0bg.cloudfront.net/default-store/black_dress_original.jpg",
      },
      {
        id: "1",
        isMain: false,
        orderBy: 1,
        image160pxUrl:
          "https://d2j6dbq0eux0bg.cloudfront.net/default-store/black_dress-1_160px.jpg",
        image400pxUrl:
          "https://d2j6dbq0eux0bg.cloudfront.net/default-store/black_dress-1_400px.jpg",
        image800pxUrl:
          "https://d2j6dbq0eux0bg.cloudfront.net/default-store/black_dress-1_800px.jpg",
        image1500pxUrl:
          "https://d2j6dbq0eux0bg.cloudfront.net/default-store/black_dress-1_1500px.jpg",
        imageOriginalUrl:
          "https://d2j6dbq0eux0bg.cloudfront.net/default-store/black_dress-1_original.jpg",
      },
      {
        id: "2",
        isMain: false,
        orderBy: 2,
        image160pxUrl:
          "https://d2j6dbq0eux0bg.cloudfront.net/default-store/black_dress-2_160px.jpg",
        image400pxUrl:
          "https://d2j6dbq0eux0bg.cloudfront.net/default-store/black_dress-2_400px.jpg",
        image800pxUrl:
          "https://d2j6dbq0eux0bg.cloudfront.net/default-store/black_dress-2_800px.jpg",
        image1500pxUrl:
          "https://d2j6dbq0eux0bg.cloudfront.net/default-store/black_dress-2_1500px.jpg",
        imageOriginalUrl:
          "https://d2j6dbq0eux0bg.cloudfront.net/default-store/black_dress-2_original.jpg",
      },
    ],
    videos: [],
  },
  categoryIds: [],
  categories: [],
  defaultCategoryId: 0,
  seoTitle: "SAMPLE. Black Dress",
  seoDescription: "Sample product description for this product.",
  attributes: [],
  relatedProducts: {
    productIds: [],
    relatedCategory: {
      enabled: false,
      categoryId: 0,
      productCount: 1,
    },
  },
  combinations: [],
  volume: 0,
  showOnFrontpage: 7,
  isSampleProduct: false,
  googleItemCondition: "NEW",
  isGiftCard: false,
  discountsAllowed: true,
  ribbon: {
    text: "Sale",
    color: "#7091DA",
  },
  ribbonTranslated: {
    en: "Sale",
  },
  nameYourPriceEnabled: false,
};
