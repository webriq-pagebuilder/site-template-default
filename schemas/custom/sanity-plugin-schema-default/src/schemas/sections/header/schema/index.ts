import {
  arrayOfImages,
  description,
  formLinks,
  signInLink,
  mainImage,
  plainText,
  primaryButton,
  secondaryButton,
  title,
  webriqForms,
  youtubeLink,
} from "../../../common/fields";
import { hideIfVariantIn } from "@webriq-pagebuilder/sanity-plugin-schema-default";

export const headerSchema = [
  title(),
  description(hideIfVariantIn(["variant_c"])),
  primaryButton(),
  secondaryButton(),
  arrayOfImages(
    hideIfVariantIn(["variant_a", "variant_c", "variant_d", "variant_e"])
  ),
  mainImage(hideIfVariantIn(["variant_b", "variant_c", "variant_e"])),
  webriqForms(
    hideIfVariantIn(["variant_a", "variant_b", "variant_c", "variant_d"])
  ),
  formLinks(
    hideIfVariantIn(["variant_a", "variant_b", "variant_c", "variant_d"])
  ),
  youtubeLink(
    hideIfVariantIn(["variant_a", "variant_b", "variant_d", "variant_e"])
  ),
];
