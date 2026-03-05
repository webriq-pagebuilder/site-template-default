import {
  arrayOfImages,
  arrayOfImageTitleAndText,
  description,
  featuredItems,
  logo,
  mainImage,
  primaryButton,
  subtitle,
  tags,
  title,
} from "../../../common/fields";
import { hideIfVariantIn } from "@webriq-pagebuilder/sanity-plugin-schema-default";

export const featuresSchema = [
  subtitle(hideIfVariantIn(["variant_e"])),
  title(hideIfVariantIn(["variant_e"])),
  description(hideIfVariantIn(["variant_e", "variant_h"])),
  arrayOfImageTitleAndText(
    "Features",
    "Click the 'Add item' button to add a feature. If you want to edit added features, click this ⋮ icon found on its right.",
    hideIfVariantIn(["variant_e", "variant_f", "variant_g"])
  ),
  primaryButton(
    hideIfVariantIn([
      "variant_a",
      "variant_b",
      "variant_c",
      "variant_d",
      "variant_e",
      "variant_g",
      "variant_h",
    ])
  ),
  arrayOfImages(
    hideIfVariantIn([
      "variant_a",
      "variant_b",
      "variant_c",
      "variant_d",
      "variant_e",
      "variant_i",
    ])
  ),
  featuredItems(
    hideIfVariantIn([
      "variant_a",
      "variant_b",
      "variant_c",
      "variant_d",
      "variant_f",
      "variant_g",
      "variant_h",
      "variant_i",
    ])
  ),
  tags(
    "Featured Items",
    null,
    hideIfVariantIn([
      "variant_a",
      "variant_c",
      "variant_d",
      "variant_e",
      "variant_f",
      "variant_h",
      "variant_i",
    ])
  ),
  // Fields exclusive to variant_i
  mainImage(
    hideIfVariantIn([
      "variant_a",
      "variant_b",
      "variant_c",
      "variant_d",
      "variant_e",
      "variant_f",
      "variant_g",
      "variant_h",
    ])
  ),
  logo(
    hideIfVariantIn([
      "variant_a",
      "variant_b",
      "variant_c",
      "variant_d",
      "variant_e",
      "variant_f",
      "variant_g",
      "variant_h",
    ])
  ),
];
