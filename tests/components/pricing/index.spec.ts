import { test } from "@playwright/test";
import { deletePageVariant, newPageTitle, beforeEachTest } from "tests/utils";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";
import VariantA from "./variant_a";
import VariantB from "./variant_b";
import VariantC from "./variant_c";
import VariantD from "./variant_d";

const variantModules = {
  variant_a: VariantA,
  variant_b: VariantB,
  variant_c: VariantC,
  variant_d: VariantD,
};

const pricingVariantTest = [
  {
    name: "Variant A",
    title: "Pricing Variant A",
    label: "Pricing New Page A",
    variant: "variant_a",
    isInternalLink: null,
  },
  {
    name: "Variant B",
    title: "Pricing Variant B",
    label: "Pricing New Page B",
    variant: "variant_b",
    isInternalLink: null,
  },
  {
    name: "Variant C",
    title: "Pricing Variant C",
    label: "Pricing New Page C",
    variant: "variant_c",
    isInternalLink: null,
  },
  {
    name: "Variant D",
    title: "Pricing Variant D",
    label: "Pricing New Page D",
    variant: "variant_d",
    isInternalLink: false,
  },
];

const planType = [
  { name: "Vestibulum viverra", updatedName: "Plan 1" },
  { name: "Morbi mollis metus", updatedName: "Plan 2" },
  { name: "Etiam lectus nunc", updatedName: "Plan 3" },
  { name: "Ut quam nisl mollis", updatedName: "Plan 4" },
  { name: "Suspendisse bibendum", updatedName: "Plan 5" },
];

const commonFieldValues = {
  subtitle: "Subtitle Input Test",
  title: "Title Input Test",
  description: "Description Input Test",
  monthlyBilling: "50",
  annualBilling: "99",
  blockText: "Statement to inform user of terms and policies",
  formButton: "Button Test",
  formSubtitle: "Pricing Test",
  formName: "Create an Account",
  signInLink: "Sign in test",
  formBanner: [
    { name: "Lorem ipsum dolor sit amet," },
    { name: "Faucibus scelerisque eleifend" },
    { name: "Ipsum consequat nisl vel" },
    { name: "Viverra maecenas accumsan" },
  ],
  paymentPlans: [
    {
      plan: "Beginner",
      updatedPlan: "Beginner Plan",
      monthly: "Free",
      updatedMonthly: "100",
      yearly: "Free",
      updatedYearly: "200",
      description: "Nullam diam arcu",
      updatedDescription: "Beginner Description",
      checkoutBtn: "Get Started",
      updatedCheckoutBtn: "Beginner Button Test",
      planType: planType,
    },
    {
      plan: "Intermediate",
      updatedPlan: "Intermediate Test",
      monthly: "24",
      updatedMonthly: "20",
      yearly: "288",
      updatedYearly: "15",
      description: "Nullam diam arcu",
      updatedDescription: "Intermediate Description",
      checkoutBtn: "Get Started",
      updatedCheckoutBtn: "Intermediate Button Test",
      planType: planType,
    },
    {
      plan: "Professional",
      updatedPlan: "Professional Test",
      monthly: "48",
      updatedMonthly: "50",
      yearly: "576",
      updatedYearly: "60",
      description: "Nullam diam arcu",
      updatedDescription: "Professional Description",
      checkoutBtn: "Get Started",
      updatedCheckoutBtn: "Professional Button Test",
      planType: planType,
    },
  ],
  internalLinkUrl: `${NEXT_PUBLIC_SITE_URL}/thank-you`,
  externalLinkUrl: "https://webriq.com",
};

test.describe.configure({ timeout: 1_000_000, mode: "parallel" });

pricingVariantTest.forEach((variants, index) => {
  const { name, title, label, variant, isInternalLink } = variants;
  const pageTitle = newPageTitle(title);

  test.describe(`${name}`, () => {
    //Select Stripe Account Required
    test.fixme(`Create ${label}`, async ({ page, baseURL }) => {
      console.log(`[INFO] - Testing Pricing ${variant} 🚀`);
      await beforeEachTest(page, pageTitle, "Pricing", label, index);
      const variantTest = variantModules[variant];

      await variantTest({
        pageTitle,
        page,
        commonFieldValues,
        isInternalLink,
        baseURL,
      });
    });

    test.afterEach(async ({ page }) => {
      await deletePageVariant(page, pageTitle, label);
      console.log(`[DONE] Pricing ${variant} 🚀`);
    });
  });
});
