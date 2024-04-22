import { test, expect, type Page } from "@playwright/test";
import {
  autologin_studio,
  createNewPage,
  clickVariantImage,
  navigateToPage,
  expectDocumentPublished,
  deletePageVariant,
} from "tests/utils";
import {
  NEXT_PUBLIC_SANITY_STUDIO_URL,
  NEXT_PUBLIC_SITE_URL,
} from "studio/config";
import { featuresInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";

let page: Page, newPageTitle: string;

const featuresVariantTests = [
  {
    pageTitle: "Features variant A",
    label: "New Features A",
    index: 0,
    variant: "variant_a",
  },
  {
    pageTitle: "Features variant B",
    label: "New Features B",
    index: 1,
    variant: "variant_b",
  },
  {
    pageTitle: "Features variant C",
    label: "New Features C",
    index: 2,
    variant: "variant_c",
  },
  {
    pageTitle: "Features variant D",
    label: "New Features D",
    index: 3,
    variant: "variant_d",
  },
  {
    pageTitle: "Features variant E",
    label: "New Features E",
    index: 4,
    variant: "variant_e",
  },
  {
    pageTitle: "Features variant F",
    label: "New Features F",
    index: 5,
    variant: "variant_f",
  },
  {
    pageTitle: "Features variant G",
    label: "New Features G",
    index: 6,
    variant: "variant_g",
  },
  {
    pageTitle: "Features variant H",
    label: "New Features H",
    index: 7,
    variant: "variant_h",
  },
];

test.beforeAll("Auto login studio", async ({ browser }) => {
  page = await browser.newPage();

  await page.goto(`${NEXT_PUBLIC_SITE_URL}`);

  const token = process.env.NEXT_PUBLIC_STUDIO_AUTOLOGIN_TOKEN_FOR_TESTING;
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

  await page.evaluate(autologin_studio, { token, projectId });

  // navigate to the studio
  await page.goto(`${NEXT_PUBLIC_SANITY_STUDIO_URL}`);
});

featuresVariantTests?.forEach((variant) => {
  test.describe(`${variant.pageTitle} Workflow`, () => {
    test.describe.configure({ timeout: 900000 });

    test(`Create ${variant.label}`, async () => {
      await createFeaturesVariant({
        pageTitle: variant.pageTitle,
        label: variant.label,
        index: variant.index,
        variant: variant.variant,
      });
    });

    test(`Delete ${variant.pageTitle}`, async () => {
      await deletePageVariant(page, newPageTitle, variant?.label);
    });
  });
});

test.afterAll(async () => {
  await page.close();
});

async function createFeaturesVariant({
  pageTitle,
  label,
  index,
  variant,
  isInternalLink = true,
}: {
  pageTitle: string;
  label: string;
  index: number;
  variant: string;
  isInternalLink?: boolean | null;
}) {
  const time = new Date().getTime();
  newPageTitle = pageTitle + time;
  const newFeaturesSubtitle = "Subtitle Features";
  const newFeaturesTitle = "New Features title";
  const newFeaturesDesc = "Updated description for new features.";
  const newFeaturesTag = "new feature tag";
  const primaryButtonLabel = "CTA Primary";
  const externalLinkUrl = "https://webriq.com";
  const blankLinkTarget = {
    element: page.getByText("Blank - open on a new tab ("),
    target: "Blank - open on a new tab (",
  };
  const selfLinkTarget = {
    element: page.getByText("Self (default) - open in the"),
    target: "Self (default) - open in the",
  };

  await navigateToPage(page);
  await createNewPage(page, newPageTitle, "Call to action");

  const variantLabel = page
    .getByTestId("field-label")
    .getByTestId("string-input");
  await variantLabel.click();
  await variantLabel.fill(label);

  // select variant
  await clickVariantImage(page, index);

  if (variant !== "variant_e") {
    // subtitle - except variant E
    const subtitle = page
      .getByTestId("field-variants.subtitle")
      .getByTestId("string-input");
    await expect(subtitle.inputValue()).resolves.toBe(
      featuresInitialValue.subtitle
    );
    await subtitle.click();
    await subtitle.press("Meta+a");
    await subtitle.fill(newFeaturesTitle);
    await expect(subtitle.inputValue()).resolves.toBe(newFeaturesSubtitle);

    // title = except variant E
    const title = page
      .getByTestId("field-variants.title")
      .getByTestId("string-input");
    await expect(title.inputValue()).resolves.toBe(featuresInitialValue.title);
    await title.click();
    await title.press("Meta+a");
    await title.fill(newFeaturesTitle);
    await expect(title.inputValue()).resolves.toBe(newFeaturesTitle);
  }

  if (["variant_b", "variant_e", "variant_f", "variant_g"]?.includes(variant)) {
    // description - variants B, F & G
    await expect(
      page.getByPlaceholder("Lorem ipsum dolor sit amet,")
    ).toBeVisible();
    await page.getByPlaceholder("Lorem ipsum dolor sit amet,").click();
    await page.getByPlaceholder("Lorem ipsum dolor sit amet,").press("Meta+a");
    await page
      .getByPlaceholder("Lorem ipsum dolor sit amet,")
      .fill(newFeaturesDesc);
  }

  if (
    ["variant_a", "variant_b", "variant_c", "variant_d", "variant_h"]?.includes(
      variant
    )
  ) {
    // array of image title and text - variant A to D and H
    await expect(
      page.getByRole("button", {
        name: featuresInitialValue.arrayOfImageTitleAndText?.[0]?.title,
      })
    ).toBeVisible();
    await expect(
      page.getByRole("button", {
        name: featuresInitialValue.arrayOfImageTitleAndText?.[1]?.title,
      })
    ).toBeVisible();
    await expect(
      page.getByRole("button", {
        name: featuresInitialValue.arrayOfImageTitleAndText?.[2]?.title,
      })
    ).toBeVisible();
    await expect(
      page.getByRole("button", {
        name: featuresInitialValue.arrayOfImageTitleAndText?.[3]?.title,
      })
    ).toBeVisible();
  }

  if (variant === "variant_f") {
    // primary button - variant F only
    await page.getByRole("button", { name: "Primary Button" }).click();
    await expect(
      page
        .getByTestId("field-variants.primaryButton.label")
        .getByTestId("string-input")
    ).toHaveValue(featuresInitialValue.primaryButton.label);
    await expect(
      page.getByLabel("Internal, inside this website")
    ).toBeChecked();
    await expect(page.getByTestId("autocomplete")).toBeEmpty();
    await page.getByLabel("External, outside this website").check();
    await page.getByLabel("URL").click();
    await page.getByLabel("URL").fill("https://webriq.com");
    await expect(page.getByLabel("Self (default) - open in the")).toBeChecked();
  }

  if (variant === "variant_e") {
    // featured items - variant E only
    await expect(
      page.getByRole("button", { name: "Build & Launch without" })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Learn how We will help you to" })
    ).toBeVisible();
  }

  if (["variant_b", "variant_g"]?.includes(variant)) {
    // tags - variant B and G only
    await expect(page.getByText("Featured Items")).toBeVisible();
    await expect(page.getByText("Vestibulum viverra ante non")).toBeVisible();
    await expect(page.getByText("Morbi mollis metus pretium")).toBeVisible();
    await expect(page.getByText("Etiam lectus nunc, commodo et")).toBeVisible();

    await page.locator('[id="variants\\.tags"]').click();
    await page.locator('[id="variants\\.tags"]').fill(newFeaturesTag);
    await page.locator('[id="variants\\.tags"]').press("Enter");
  }

  await expectDocumentPublished(page, newPageTitle);
  await expect(page.getByRole("link", { name: newPageTitle })).toBeVisible();

  const pagePromise = page.waitForEvent("popup");
  await page.getByText(`${NEXT_PUBLIC_SITE_URL}`).click({ force: true });
  const openUrlPage = await pagePromise;

  if (variant !== "variant_e") {
    // subtitle - except variant E
    await expect(openUrlPage.locator('[id="__next"]')).toContainText(
      newFeaturesSubtitle
    );

    // title = except variant E
    await expect(openUrlPage.locator('[id="__next"]')).toContainText(
      newFeaturesTitle
    );
  }

  if (["variant_b", "variant_e", "variant_f", "variant_g"]?.includes(variant)) {
    // description - variants B, F & G
    await expect(openUrlPage.locator('[id="__next"]')).toContainText(
      newFeaturesDesc
    );
  }

  if (
    ["variant_a", "variant_b", "variant_c", "variant_d", "variant_h"]?.includes(
      variant
    )
  ) {
    // array of image title and text - variant A to D and H
    await expect(
      openUrlPage.getByRole("img", { name: "features-image-" }).first()
    ).toBeVisible();
    await expect(
      openUrlPage.getByText(
        featuresInitialValue.arrayOfImageTitleAndText?.[0]?.title
      )
    ).toBeVisible();
    await expect(
      openUrlPage.getByText(
        featuresInitialValue.arrayOfImageTitleAndText?.[0]?.plainText
      )
    ).toBeVisible();
    await expect(
      openUrlPage.getByRole("img", { name: "features-image-" }).nth(1)
    ).toBeVisible();
    await expect(
      openUrlPage.getByText(
        featuresInitialValue.arrayOfImageTitleAndText?.[1]?.title
      )
    ).toBeVisible();
    await expect(
      openUrlPage.getByText(
        featuresInitialValue.arrayOfImageTitleAndText?.[1]?.plainText
      )
    ).toBeVisible();
    await expect(
      openUrlPage.getByRole("img", { name: "features-image-" }).nth(2)
    ).toBeVisible();
    await expect(
      openUrlPage.getByText(
        featuresInitialValue.arrayOfImageTitleAndText?.[2]?.title
      )
    ).toBeVisible();
    await expect(
      openUrlPage.getByText(
        featuresInitialValue.arrayOfImageTitleAndText?.[2]?.plainText
      )
    ).toBeVisible();
    await expect(
      openUrlPage.getByRole("img", { name: "features-image-" }).nth(3)
    ).toBeVisible();
    await expect(
      openUrlPage.getByText(
        featuresInitialValue.arrayOfImageTitleAndText?.[3]?.title
      )
    ).toBeVisible();
    await expect(
      openUrlPage.getByText(
        featuresInitialValue.arrayOfImageTitleAndText?.[3]?.plainText
      )
    ).toBeVisible();
  }

  if (variant === "variant_f") {
    // primary button - variant F only
    await expect(openUrlPage.locator('[id="__next"]')).toContainText(
      primaryButtonLabel
    );
  }

  if (variant === "variant_e") {
    // featured items - variant E only
    await expect(openUrlPage.locator('[id="__next"]')).toContainText(
      featuresInitialValue.featuredItems?.[0]?.subtitle
    );
    await expect(openUrlPage.locator('[id="__next"]')).toContainText(
      featuresInitialValue.featuredItems?.[0]?.title
    );
    await expect(openUrlPage.locator('[id="__next"]')).toContainText(
      featuresInitialValue.featuredItems?.[0]?.description
    );
    await expect(openUrlPage.getByLabel("Show Previous Feature")).toBeVisible();
    await expect(openUrlPage.getByLabel("Show Next Feature")).toBeVisible();
  }

  if (["variant_b", "variant_g"]?.includes(variant)) {
    // tags - variant B and G only
    await expect(
      openUrlPage.getByText(featuresInitialValue.tags?.[0]).nth(4)
    ).toBeVisible();
    await expect(
      openUrlPage.getByText(featuresInitialValue.tags?.[1]).nth(4)
    ).toBeVisible();
    await expect(
      openUrlPage.getByText(featuresInitialValue.tags?.[2]).nth(4)
    ).toBeVisible();
    await expect(openUrlPage.getByText(newFeaturesTag)).toBeVisible();
  }
}
