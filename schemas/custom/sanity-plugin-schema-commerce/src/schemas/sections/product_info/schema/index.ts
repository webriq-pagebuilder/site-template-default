import {
  subtitle,
  productDetails,
  arrayOfImages,
  socialLinks,
} from "../../../common/fields";

// The schema fields on the Product Info field group for every Product page
export const productInfoSchema = [
  subtitle(),
  arrayOfImages(),
  productDetails(),
  socialLinks(),
  {
    name: "btnLabel",
    title: "Button label",
    description:
      "Add the button label for the cart/checkout button. Example: Add to bag",
    type: "string",
  },
];
