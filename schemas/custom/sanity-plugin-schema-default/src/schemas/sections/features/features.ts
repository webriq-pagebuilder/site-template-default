import { rootSchema } from "@webriq-pagebuilder/sanity-plugin-schema-default";
import { featuresVariants as baseVariantsList } from "@webriq-pagebuilder/sanity-plugin-schema-default";
import { MdFlag } from "react-icons/md";

import initialValue from "./initialValue";
import { featuresSchema } from "./schema";

export const variantsList = [
  ...baseVariantsList,
  {
    title: "Variant I",
    description: "Mike Holmes Endorsement and Badge Carousel",
    value: "variant_i",
    image: baseVariantsList[0]?.image, // fallback to variant_a image until a dedicated screenshot is added
  },
];

export default rootSchema(
  "features",
  "Features",
  MdFlag,
  variantsList,
  featuresSchema,
  initialValue
);
