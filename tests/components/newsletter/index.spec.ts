import { test } from "@playwright/test";
import { newPageTitle, beforeEachTest, deletePageVariant } from "tests/utils";
import { newsletterInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";

import VariantA from "./variant_a";
import VariantB from "./variant_b";

const variantModules = {
  variant_a: VariantA,
  variant_b: VariantB,
};

const newsletterVariantTests = [
  {
    name: "Variant A",
    title: "Newsletter Page A",
    label: "New Newsletter A",
    variant: "variant_a",
  },
  {
    name: "Variant B",
    title: "Newsletter Page B",
    label: "New Newsletter B",
    variant: "variant_b",
  },
];

const commonFieldValues = {
  title: "Newsletter title",
  description: "Updated description for newsletter.",
  formButtonLabel: "Submit newsletter",
  logoAltText: "Newsletter logo",
  thankYouPageUrl: "https://webriq.com/thank-you",
  formFields: [
    {
      name: "email",
      placeholder: newsletterInitialValue?.form?.fields?.[0]?.placeholder,
      value: "sample@webriq.com",
    },
  ],
};

newsletterVariantTests.forEach((variant, index) => {
  test.describe(`${variant?.name}`, () => {
    test.describe.configure({ timeout: 1_000_000 });

    const pageTitle = newPageTitle(variant?.title);

    test(`Create ${variant.label}`, async ({ page }) => {
      await beforeEachTest(
        page,
        pageTitle,
        "Newsletter",
        variant?.label,
        index
      );

      const variantTest = variantModules[variant.variant];
      await variantTest({
        pageTitle,
        page,
        commonFieldValues,
      });
    });

    test.afterEach(`Delete ${variant.label}`, async ({ page }) => {
      await deletePageVariant(page, newPageTitle, variant.label);
    });
  });
});
