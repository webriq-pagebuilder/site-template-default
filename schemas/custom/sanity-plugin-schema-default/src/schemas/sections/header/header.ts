import { rootSchema } from "@webriq-pagebuilder/sanity-plugin-schema-default";
import { headerVariants as baseVariantsList } from "@webriq-pagebuilder/sanity-plugin-schema-default";
import { MdVerticalAlignTop } from "react-icons/md";

import variantAImage from "./images/variant_a.jpg";
import initialValue from "./initialValue";
import { headerSchema } from "./schema";

/**
 * If you want to replace all the existing variants for this component, then define variantsList like this:
 *
 * export const variantsList = [
 *  {
 *     title: "Variant A",
 *    description: "This is a new variant A for header",
 *     value: "variant_a",
 *     image: variantAImage,
 *   },
 * ]
 *
 */

export const variantsList = [
  ...baseVariantsList, // adds all the existing variants for header component and insert the new variants as follows
  {
    title: "New Variant",
    description: "A new variant for header component",
    value: "variant_a", // update this with the correct variant letter
    image: variantAImage.src, // update with the correct variant image import
  },
];

export default rootSchema(
  "header",
  "Header",
  MdVerticalAlignTop,
  variantsList,
  headerSchema,
  initialValue
);
