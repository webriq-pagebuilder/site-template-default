import { rootSchema } from "@webriq-pagebuilder/sanity-plugin-schema-default";
import { featuredProductsVariants as baseVariantsList } from "@webriq-pagebuilder/sanity-plugin-schema-commerce";
import { MdStar } from "react-icons/md";

// Images
import variantAImage from "./images/variant_a.jpg";
import { featuredProductsSchema } from "./schema";
import { initialValue } from "./initialValue";

/**
 * If you want to replace all the existing variants for this component, then define variantsList like this:
 *
 * export const variantsList = [
 *  {
 *     title: "Variant A",
 *    description: "This is a new variant A for featuredProducts",
 *     value: "variant_a",
 *     image: variantAImage,
 *   },
 * ]
 *
 */

export const variantsList = [
  ...baseVariantsList,
  {
    title: "Variant A",
    value: "variant_a",
    image: variantAImage,
  },
];

export default rootSchema(
  "featuredProducts",
  "Featured Products",
  MdStar,
  variantsList,
  featuredProductsSchema,
  initialValue
);
