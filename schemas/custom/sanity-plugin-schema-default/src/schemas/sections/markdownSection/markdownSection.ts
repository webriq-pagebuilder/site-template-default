import { rootSchema } from "@webriq-pagebuilder/sanity-plugin-schema-default";
import { MdCode } from "react-icons/md";

import initialValue from "./initialValue";
import { markdownSectionSchema } from "./schema";

export const variantsList = [
  {
    title: "Variant A",
    description: "Markdown editor with GitHub-flavored markdown support",
    value: "variant_a",
  },
];

export default rootSchema(
  "markdownSection",
  "Markdown",
  MdCode,
  variantsList,
  markdownSectionSchema,
  initialValue
);
