import { test, expect, type Page } from "@playwright/test";
import {
  NEXT_PUBLIC_SANITY_STUDIO_URL,
  NEXT_PUBLIC_SITE_URL,
} from "studio/config";
import {
  autologin_studio,
  clickVariantImage,
  createNewPage,
  deletePageVariant,
  expectDocumentPublished,
  generateFormId,
  navigateToPage,
  titleFieldInput,
  variantLabelInput,
  verifyExternalUrl,
  verifyInternalUrl,
} from "../utils/index";

const contentTitleInput = "Content Title";
const variantDescriptionInput = "Variant Description";
const primaryButtonInput = "TEST PRIMARY";
const secondaryButtonInput = "TEST SECONDARY";
const externalLinkUrl = "https://facebook.com/";
const internalLinkUrl = `${NEXT_PUBLIC_SITE_URL}/thank-you/`;

let page: Page;
let newPageTitle;

test.beforeAll("Auto login studio", async ({ browser }) => {
  page = await browser.newPage();

  // navigate to the studio
  await page.goto(`${NEXT_PUBLIC_SANITY_STUDIO_URL}`);

  const token = process.env.NEXT_PUBLIC_STUDIO_AUTOLOGIN_TOKEN_FOR_TESTING;
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

  await page.evaluate(autologin_studio, { token, projectId });
});

export async function createHeaderVariant(
  pageTitle,
  variantLabel,
  variantIndex,
  isInternalLink
) {
  const time = new Date().getTime();
  newPageTitle = pageTitle + time;

  const blankLinkTarget = {
    element: page.getByText("Blank - open on a new tab ("),
    target: "Blank - open on a new tab (",
  };
  const selfLinkTarget = {
    element: page.getByText("Self (default) - open in the"),
    target: "Self (default) - open in the",
  };

  await navigateToPage(page);
  await createNewPage(page, newPageTitle, "Header");
  await clickVariantImage(page, variantIndex);
  await variantLabelInput(page, variantLabel);

  //Content Title
  await titleFieldInput(page, contentTitleInput);

  //Content Description
  if (variantIndex !== 2) {
    await page.getByPlaceholder("Lorem ipsum dolor sit amet,").click();
    await page
      .getByPlaceholder("Lorem ipsum dolor sit amet,")
      .fill(variantDescriptionInput);
  }

  //Primary Button
  await page.getByRole("button", { name: "Primary Button" }).click();
  await page
    .getByTestId("field-variants.primaryButton.label")
    .getByTestId("string-input")
    .fill(primaryButtonInput);

  //Determine the proceeds if it is internal or external link
  if (!isInternalLink) {
    await page
      .getByTestId("field-variants.primaryButton.linkType")
      .getByText("External, outside this website")
      .click();
    // await page.getByLabel('URL').click();
    await page
      .getByTestId("field-variants.primaryButton.linkExternal")
      .getByLabel("URL")
      .click();
    await page
      .getByTestId("field-variants.primaryButton.linkExternal")
      .getByLabel("URL")
      .fill(externalLinkUrl);
    await blankLinkTarget.element.click();
    externalLinkUrl.replace("https://www.", "https://");
  } else {
    await page
      .getByTestId("field-variants.primaryButton.linkType")
      .getByText("Internal, inside this website")
      .click();
    // await page.getByTestId('reference-input').getByLabel('Open').click();
    await page.getByTestId("autocomplete").click();
    await page.getByTestId("autocomplete").fill("thank you");
    await page
      .getByRole("button", { name: "Thank you Published No" })
      .click({ force: true });
    await selfLinkTarget.element.click();
  }
  //Close primary button toggle
  await page.getByRole("button", { name: "Primary Button" }).click();

  //Secondary Button
  await page.getByRole("button", { name: "Secondary Button" }).click();
  await page
    .getByTestId("field-variants.secondaryButton.label")
    .getByTestId("string-input")
    .fill(secondaryButtonInput);

  //Determine the proceeds if it is internal or external link
  if (!isInternalLink) {
    await page
      .getByTestId("field-variants.secondaryButton.linkType")
      .getByText("External, outside this website")
      .click();
    await page
      .getByTestId("field-variants.secondaryButton.linkExternal")
      .getByLabel("URL")
      .click();
    await page
      .getByTestId("field-variants.secondaryButton.linkExternal")
      .getByLabel("URL")
      .fill(externalLinkUrl);
    await blankLinkTarget.element.click();
    externalLinkUrl.replace("https://www.", "https://");
  } else {
    await page
      .getByTestId("field-variants.secondaryButton.linkType")
      .getByText("Internal, inside this website")
      .click();
    // await page.getByTestId('reference-input').getByLabel('Open').click();
    await page.getByTestId("autocomplete").click();
    await page.getByTestId("autocomplete").fill("thank you");
    await page
      .getByRole("button", { name: "Thank you Published No" })
      .click({ force: true });
    await selfLinkTarget.element.click();
  }
  //Close Secondary button toggle
  await page.getByRole("button", { name: "Secondary Button" }).click();

  const subtitleInput = "Subtitle";
  const formNameInput = "Create an account test";
  const buttonInput = "Sign up test";

  if (variantIndex === 4) {
    // TODO: GENERATE FORM ID HERE
    await generateFormId({ page });

    //Form Subtitle
    const formSubtitle = page
      .getByTestId("field-variants.form.subtitle")
      .getByTestId("string-input");
    await formSubtitle.click();
    await formSubtitle.fill(subtitleInput);

    //Form Create an Account
    const formName = page
      .getByTestId("field-variants.form.name")
      .getByTestId("string-input");
    await formName.click();
    await formName.fill(formNameInput);

    // TODO: FORM FIELDS EDIT HERE

    const buttonLabel = page
      .getByTestId("field-variants.form.buttonLabel")
      .getByTestId("string-input");
    await buttonLabel.click();
    await buttonLabel.fill(buttonInput);

    const routesExternalLink = await page.locator(
      'label[data-ui="Flex"] span:has-text("External, outside this website")'
    );
    const routesInternalLink = await page.locator(
      'div[data-ui="Flex"] span:has-text("Internal, inside this website")'
    );

    const blankLinkTarget = {
      element: page.locator(
        'label[data-ui="Flex"] span:has-text("Blank - open on a new tab (")'
      ),
      target: "Blank - open on a new tab (",
    };
    const selfLinkTarget = {
      element: page.locator(
        'label[data-ui="Flex"] span:has-text("Self (default) - open in the")'
      ),
      target: "Self (default) - open in the",
    };

    //Form Links
    await page
      .getByRole("button", { name: "Policy Privacy Internal Link" })
      .click();
    await expect(page.getByLabel("Edit Link")).toBeVisible({ timeout: 20000 });

    if (!isInternalLink) {
      await routesExternalLink.click({ force: true });
      await page
        .locator('.sc-jdUcAg > div:nth-child(2) > div input[inputmode="url"]')
        .click({ force: true });
      await page
        .locator('.sc-jdUcAg > div:nth-child(2) > div input[inputmode="url"]')
        .fill(externalLinkUrl);
      await blankLinkTarget.element.click();
    } else {
      await routesInternalLink.click();
      await page.getByTestId("autocomplete").click();
      await page.getByTestId("autocomplete").fill("thank you");
      await page
        .getByRole("button", { name: "Thank you Published No" })
        .click();
      //Commenting this atm due to bug on studio not having scroll. By default it is in self
      // await selfLinkTarget.element.click();
    }

    await page.getByLabel("Close dialog").click();

    await page
      .getByRole("button", { name: "Terms of Use Internal Link" })
      .click();
    await expect(page.getByLabel("Edit Link")).toBeVisible({ timeout: 20000 });

    if (!isInternalLink) {
      await routesExternalLink.click({ force: true });
      await page
        .locator('.sc-jdUcAg > div:nth-child(2) > div input[inputmode="url"]')
        .click({ force: true });
      await page
        .locator('.sc-jdUcAg > div:nth-child(2) > div input[inputmode="url"]')
        .fill(externalLinkUrl);
      await blankLinkTarget.element.click();
    } else {
      await routesInternalLink.click();
      await page.getByTestId("autocomplete").click();
      await page.getByTestId("autocomplete").fill("thank you");
      await page
        .getByRole("button", { name: "Thank you Published No" })
        .click();
      // Commenting this atm due to bug on studio not having scroll. By default it is in self
      // await selfLinkTarget.element.click();
    }
    await page.getByLabel("Close dialog").click();
  }

  await expectDocumentPublished(page, newPageTitle);

  const pagePromise = page.waitForEvent("popup");
  await page.getByText(`${NEXT_PUBLIC_SITE_URL}`).click({ force: true });
  const openUrlPage = await pagePromise;

  const sectionCount = await openUrlPage
    .locator("div")
    .filter({ hasText: /^No items$/ })
    .count();

  if (sectionCount > 0) {
    // If the section no items is found, expect the Empty Page element to be visible
    await expect(openUrlPage.getByText("Empty Page"))
      .toBeVisible({ timeout: 20000 })
      .then(() => console.log("There is no Available Content!"));
  } else {
    // If the section no items is not found, expect the Empty Page element to be hidden
    await expect(openUrlPage.getByText("Empty Page")).toBeHidden({
      timeout: 20000,
    });
    await expect(openUrlPage.locator("section")).toBeVisible({
      timeout: 20000,
    });
    await expect(
      openUrlPage.getByRole("heading", { name: contentTitleInput })
    ).toBeVisible({ timeout: 150000 });

    if (variantIndex !== 2) {
      await expect(openUrlPage.getByText(variantDescriptionInput)).toBeVisible({
        timeout: 150000,
      });
    }
    await expect(openUrlPage.getByLabel(primaryButtonInput)).toBeVisible({
      timeout: 150000,
    });
    await expect(openUrlPage.getByLabel(secondaryButtonInput)).toBeVisible({
      timeout: 150000,
    });

    if (variantIndex === 4) {
      await expect(openUrlPage.getByText(subtitleInput)).toBeVisible();
      await expect(openUrlPage.getByText(formNameInput)).toBeVisible();
      await expect(openUrlPage.getByText(buttonInput)).toBeVisible();
    }

    if (!isInternalLink) {
      const page10Promise = openUrlPage.waitForEvent("popup");
      await openUrlPage
        .getByRole("link", { name: primaryButtonInput })
        .click({ force: true });
      const page10 = await page10Promise;
      await verifyExternalUrl(page10, externalLinkUrl);
    } else {
      await openUrlPage
        .getByRole("link", { name: primaryButtonInput })
        .click({ force: true });
      await openUrlPage.waitForLoadState("networkidle");
      await expect(openUrlPage.getByText("Success!")).toBeVisible({
        timeout: 20000,
      });
      await verifyInternalUrl(openUrlPage, internalLinkUrl);
    }

    const slug = newPageTitle
      ?.toLowerCase()
      ?.replace(/\s+/g, "-")
      .replace(/-+/g, "-");
    if (variantIndex === 4) {
      const linkNames = [
        secondaryButtonInput,
        "Policy Privacy",
        "Terms of Use",
      ];
      for (const linkName of linkNames) {
        await page.goto(`${NEXT_PUBLIC_SITE_URL}/${slug}`);
        await assertPageContent(page, linkName, isInternalLink, variantIndex);
      }
    } else {
      await page.goto(`${NEXT_PUBLIC_SITE_URL}/${slug}`);
      await assertPageContent(
        page,
        secondaryButtonInput,
        isInternalLink,
        variantIndex
      );
    }
  }
}

async function assertPageContent(
  openUrlPage,
  linkName,
  isInternalLink,
  variantIndex
) {
  const sectionCount = await openUrlPage
    .locator("div")
    .filter({ hasText: /^No items$/ })
    .count();

  if (sectionCount > 0) {
    // If the section no items is found, expect the Empty Page element to be visible
    await expect(openUrlPage.getByText("Empty Page")).toBeVisible({
      timeout: 20000,
    });
  } else {
    // If the section no items is not found, expect the Empty Page element to be hidden
    await expect(openUrlPage.getByText("Empty Page")).toBeHidden({
      timeout: 20000,
    });
    await expect(openUrlPage.locator("section")).toBeVisible({
      timeout: 20000,
    });

    await expect(
      openUrlPage.getByRole("heading", { name: contentTitleInput })
    ).toBeVisible({ timeout: 150000 });
    if (variantIndex !== 2) {
      await expect(openUrlPage.getByText(variantDescriptionInput)).toBeVisible({
        timeout: 150000,
      });
    }
    await expect(openUrlPage.getByLabel(primaryButtonInput)).toBeVisible({
      timeout: 150000,
    });
    await expect(openUrlPage.getByLabel(secondaryButtonInput)).toBeVisible({
      timeout: 150000,
    });

    if (!isInternalLink) {
      const page10Promise = openUrlPage.waitForEvent("popup");
      await openUrlPage
        .getByRole("link", { name: linkName })
        .click({ force: true });
      const page10 = await page10Promise;
      // Normalize URLs for comparison
      const normalizedExpectedUrl = externalLinkUrl.replace(
        "https://www.",
        "https://"
      );
      const normalizedReceivedUrl = page10
        .url()
        .replace("https://www.", "https://");
      await expect(normalizedReceivedUrl).toBe(normalizedExpectedUrl);
    } else {
      await openUrlPage
        .getByRole("link", { name: linkName })
        .click({ force: true });
      await openUrlPage.waitForLoadState("networkidle");
      await expect(openUrlPage.getByText("Success!")).toBeVisible({
        timeout: 20000,
      });
      const expectedUrl = internalLinkUrl.endsWith("/")
        ? internalLinkUrl
        : `${internalLinkUrl}/`;
      const receivedUrl = openUrlPage.url().endsWith("/")
        ? openUrlPage.url()
        : `${openUrlPage.url()}/`;
      await expect(receivedUrl).toBe(expectedUrl);
    }
  }
}

const headersVariant = [
  {
    variantName: "Variant A",
    pageTitle: "Header Variant A",
    variantLabel: "Header New Page A",
    variantIndex: 0,
    isInternalLink: true,
  },
  {
    variantName: "Variant B",
    pageTitle: "Header Page B",
    variantLabel: "Header New Page B",
    variantIndex: 1,
    isInternalLink: true,
  },
  {
    variantName: "Variant C",
    pageTitle: "Header Page C",
    variantLabel: "Header New Page C",
    variantIndex: 2,
    isInternalLink: false,
  },
  {
    variantName: "Variant D",
    pageTitle: "Header Page D",
    variantLabel: "Header New Page D",
    variantIndex: 3,
    isInternalLink: false,
  },
  {
    variantName: "Variant E",
    pageTitle: "Header Page E",
    variantLabel: "Header New Page E",
    variantIndex: 4,
    isInternalLink: false,
  },
];

headersVariant.forEach((variant) => {
  test.describe(`${variant.variantName} Workflow`, () => {
    test.describe.configure({ timeout: 900000, mode: "serial" });

    test(`Create ${variant.pageTitle}`, async () => {
      await createHeaderVariant(
        variant.pageTitle,
        variant.variantLabel,
        variant.variantIndex,
        variant.isInternalLink
      );
    });

    test(`Delete ${variant.pageTitle}`, async () => {
      await deletePageVariant(page, newPageTitle);
    });
  });
});

test.afterAll(async () => {
  await page.close();
});
