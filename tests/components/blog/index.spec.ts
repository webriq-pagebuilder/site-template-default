import { test } from "@playwright/test";
import { deletePageVariant, beforeEachTest, newPageTitle } from "tests/utils";
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

const blogVariantTest = [
  {
    name: "Variant A",
    title: "Blog Variant A",
    label: "Blog New Page A",
    variant: "variant_a",
    isInternalLink: false,
  },
  {
    name: "Variant B",
    title: "Blog Page B",
    label: "Blog New Page B",
    variant: "variant_b",
    isInternalLink: false,
  },
  {
    name: "Variant C",
    title: "Blog Page C",
    label: "Blog New Page C",
    variant: "variant_c",
    isInternalLink: false,
  },
  {
    name: "Variant D",
    title: "Blog Page D",
    label: "Blog New Page D",
    variant: "variant_d",
    isInternalLink: false,
  },
];

const commonFieldValues = {
  title: "Blog Title Test",
  subtitle: "Subtitle Test",
  referencedBlog: "Felis bibendum ut tristique et egestas",
  button: "View More",
  internalLinkUrl: `${NEXT_PUBLIC_SITE_URL}/thank-you`,
  externalLinkUrl: "https://webriq.com",
  blogPosts: [
    {
      title: "Lorem ipsum dolor",
      publishedAt: "November 22, 2021",
      slug: "lorem-ipsum-dolor-sit-amet",
    },
    {
      title: "Vestibulum vehicle leo",
      publishedAt: "November 22, 2021",
      slug: "vestibulum-vehicle-leo-eget-libero-eleifend",
    },
    {
      title: "Aenean convalli sapone",
      publishedAt: "November 22, 2021",
      slug: "aenean-convalli-sapone-a-degnissimo-placerat",
    },
    {
      title: "Morbi scelerisque nulla",
      publishedAt: "November 22, 2021",
      slug: "morbi-scelerisque-nulla-et-lectus-1",
    },
    {
      title: "Felis bibendum",
      publishedAt: "November 22, 2021",
      slug: "this-should-validated-17",
    },
    {
      title: "Ph12",
      publishedAt: "November 22, 2021",
      slug: "dorell-post",
    },
  ],
  categories: ["TRAVEL", "Culture", "Engineering"],
};

test.describe.configure({ timeout: 1_000_000, mode: "parallel" });

blogVariantTest.forEach((variants, index) => {
  const { name, title, label, variant, isInternalLink } = variants;
  const pageTitle = newPageTitle(title);

  test.describe(`${name}`, () => {
    test(`Create ${label}`, async ({ page, baseURL }) => {
      console.log(`[INFO] - Testing Blog ${variant} 🚀`);
      await beforeEachTest(page, pageTitle, "Blog", label, index);
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
      console.log(`[DONE] Blog ${variant} 🚀`);
    });
  });
});
