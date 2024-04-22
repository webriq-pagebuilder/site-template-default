import { test, expect, type Page } from "@playwright/test";
import {
  autologin_studio,
  createNewPage,
  clickVariantImage,
  navigateToPage,
  updateLogoLink,
  generateFormId,
  expectDocumentPublished,
  deletePageVariant,
} from "tests/utils";
import {
  NEXT_PUBLIC_SANITY_STUDIO_URL,
  NEXT_PUBLIC_SITE_URL,
} from "studio/config";
import { callToActionInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";
import { createVariantProps } from "types/tests/components";

let page: Page, newPageTitle: string;

const ctaVariantTests = [
  {
    pageTitle: "Call to action variant A",
    label: "New Call to action A",
    index: 0,
    variant: "variant_a",
  },
  {
    pageTitle: "Call to action variant B",
    label: "New Call to action B",
    index: 1,
    variant: "variant_b",
  },
  {
    pageTitle: "Call to action variant C",
    label: "New Call to action C",
    index: 2,
    variant: "variant_c",
  },
  {
    pageTitle: "Call to action variant D",
    label: "New Call to action D",
    index: 3,
    variant: "variant_d",
  },
  {
    pageTitle: "Call to action variant E",
    label: "New Call to action E",
    index: 4,
    variant: "variant_e",
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

ctaVariantTests?.forEach((variant) => {
  test.describe(`${variant.pageTitle} Workflow`, () => {
    test.describe.configure({ timeout: 900000 });

    test(`Create ${variant.label}`, async () => {
      await createCTAVariant({
        pageTitle: variant.pageTitle,
        label: variant.label,
        index: variant.index,
        variant: variant.variant,
      });
    });

    test(`Delete ${variant.pageTitle}`, async () => {
      await deletePageVariant(page, newPageTitle, variant.label);
    });
  });
});

test.afterAll(async () => {
  await page.close();
});

async function createCTAVariant({
  pageTitle,
  label,
  index,
  variant,
  isInternalLink = false,
}: createVariantProps) {
  const time = new Date().getTime();
  newPageTitle = pageTitle + time;
  const newCTATitle = "Call to action title";
  const newCTADescription = "Updated description for new call to action.";

  const ctaLogoAltText = "Call to action logo";
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

  const formFields = [
    {
      name: "firstName",
      placeholder: "First name",
      value: "WebriQ",
    },
    {
      name: "lastName",
      placeholder: "Last name",
      value: "Test",
    },
    {
      name: "email",
      placeholder: "Enter your email address",
      value: "sample@webriq.com",
    },
    {
      name: "password",
      placeholder: "Enter your password",
      value: "12345",
    },
  ];

  await navigateToPage(page);
  await createNewPage(page, newPageTitle, "Call to action");

  const variantLabel = page
    .getByTestId("field-label")
    .getByTestId("string-input");
  await variantLabel.click();
  await variantLabel.fill(label);

  await clickVariantImage(page, index);

  if (["variant_e"]?.includes(variant)) {
    // title = except variant e
    const title = page
      .getByTestId("field-variants.title")
      .getByTestId("string-input");
    await expect(title.inputValue()).resolves.toBe(
      callToActionInitialValue.title
    );
    await title.click();
    await title.press("Meta+a");
    await title.fill(newCTATitle);
    await expect(title.inputValue()).resolves.toBe(newCTATitle);

    // description - except variant e
    const description = page.getByPlaceholder("Lorem ipsum dolor sit amet,");
    await expect(description.inputValue()).resolves.toBe(
      callToActionInitialValue.plainText
    );
    await description.click();
    await description.press("Meta+a");
    await description.fill(newCTADescription);
    await expect(description.inputValue()).resolves.toBe(newCTADescription);

    // logo link - variant a, b, d only
    if (["variant_a", "variant_b", "variant_d"]?.includes(variant)) {
      await updateLogoLink(page, ctaLogoAltText);
    }

    // primary button - variant a and d only
    if (["variant_a", "variant_d"]) {
      // Primary Button
      await page.getByRole("button", { name: "Primary Button" }).click();
      await page
        .getByTestId("field-variants.primaryButton.label")
        .getByTestId("string-input")
        .fill(primaryButtonLabel);
      await expect(
        page
          .getByTestId("field-variants.primaryButton.linkType")
          .getByLabel("Internal, inside this website")
      ).toBeChecked();

      // Determine if it is internal or external link
      if (!isInternalLink) {
        await page
          .getByTestId("field-variants.primaryButton.linkType")
          .getByText("External, outside this website")
          .click();
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
        await page.getByTestId("autocomplete").click();
        await page.getByTestId("autocomplete").fill("thank you");
        await page
          .getByRole("button", { name: "Thank you Published No" })
          .click({ force: true });
        await selfLinkTarget.element.click();
      }

      // Close primary button toggle
      await page.getByRole("button", { name: "Primary Button" }).click();
    }

    // variant b only - 2 form input fields
    if (["variant_b"]?.includes(variant)) {
      await CTAWebriQForm({ hasOtherLinks: false });
    }

    // variant c only - 1 form input field
    if (["variant_c"]?.includes(variant)) {
      await CTAWebriQForm({ hasOtherLinks: false });
    }

    // form
    if (["variant_d"]?.includes(variant)) {
      await CTAWebriQForm({ hasOtherLinks: true });
    }
  } else {
    // variant_e - form only
    await CTAWebriQForm({ hasOtherLinks: true });
  }

  await page.getByTestId("action-Save").click({ timeout: 20000 });
  await page.getByRole("link", { name: "Close pane group" }).click();
  await expectDocumentPublished(page, newPageTitle);
  await expect(page.getByRole("link", { name: newPageTitle })).toBeVisible();

  // Test site preview for added CTA component variant
  const pagePromise = page.waitForEvent("popup");
  await page.getByText(`${NEXT_PUBLIC_SITE_URL}`).click({ force: true });
  const openUrlPage = await pagePromise;

  page.locator("section").filter({ hasText: newCTATitle });

  if (variant !== "variant_e") {
    await expect(
      openUrlPage.getByRole("heading", { name: newCTATitle })
    ).toBeVisible();
    await expect(
      openUrlPage
        .locator("section")
        .filter({ hasText: newCTATitle })
        .getByRole("paragraph")
        .first()
    ).toBeVisible();

    // logo link - variant a, b, d only
    if (["variant_a", "variant_b", "variant_d"]?.includes(variant)) {
      // test if logo link is correct
      await expect(
        openUrlPage.getByLabel("Go to https://webriq.com")
      ).toBeVisible();
      await expect(
        openUrlPage
          .locator("a[target='_blank']")
          .and(openUrlPage.locator("a[rel='noopener noreferrer']"))
      ).toBeVisible();
      await expect(openUrlPage.getByAltText(ctaLogoAltText)).toBeVisible();

      // primary button
      if (variant === "variant_a" || variant === "variant_d") {
        await expect(
          openUrlPage.getByRole("link", { name: primaryButtonLabel })
        ).toBeVisible();
      }

      // form submission
      if (variant === "variant_d") {
        await CheckFormSubmission({
          pageUrl: openUrlPage,
          formFields: formFields,
        });
      }
    }

    // variant b only - 2 form input fields
    if (["variant_b"]?.includes(variant)) {
      await expect(
        openUrlPage.getByPlaceholder(
          callToActionInitialValue.form.fields?.[0]?.placeholder
        )
      ).toBeVisible();
      await expect(
        openUrlPage.getByPlaceholder(
          callToActionInitialValue.form.fields?.[1]?.placeholder
        )
      ).toBeVisible();
      await expect(
        openUrlPage.getByLabel(callToActionInitialValue.form.buttonLabel)
      ).toBeVisible();
      await CheckFormSubmission({
        pageUrl: openUrlPage,
        formFields: formFields?.splice(0, 2),
      });
    }

    // variant c only - 1 form input field
    if (["variant_c"]?.includes(variant)) {
      await expect(
        openUrlPage.getByPlaceholder(
          callToActionInitialValue.form.fields?.[0]?.placeholder
        )
      ).toBeVisible();
      await expect(
        openUrlPage.getByLabel(callToActionInitialValue.form.buttonLabel)
      ).toBeVisible();
      await expect(
        openUrlPage.getByText("No credit card needed")
      ).toBeVisible();
      await expect(openUrlPage.getByText("Easy to use")).toBeVisible();
      await expect(openUrlPage.getByLabel(primaryButtonLabel)).toBeVisible();

      await CheckFormSubmission({
        pageUrl: openUrlPage,
        formFields: formFields?.splice(0, 1),
      });
    }
  } else {
    // variant_e - form only
    await CheckFormSubmission({ pageUrl: openUrlPage, formFields: formFields });
  }
}

async function CheckFormSubmission({ pageUrl, formFields }) {
  Promise.allSettled(
    formFields?.map(async (fields) => {
      await pageUrl.getByPlaceholder(fields.placeholder).click();
      await pageUrl.getByPlaceholder(fields.placeholder).fill(fields.value);
    })
  ).then(async (response) => {
    console.log("[INFO] Test has been run", response);

    await pageUrl.getByLabel("Get Started").click();
    await expect(pageUrl.getByText("Sending form data...")).toBeVisible();
    await expect(
      pageUrl.getByText("✔ Successfully sent form data")
    ).toBeVisible({ timeout: 60000 });
    await page.goto(`${NEXT_PUBLIC_SITE_URL}/thank-you`);
  });
}

async function CTAWebriQForm({ hasOtherLinks }: { hasOtherLinks?: boolean }) {
  await generateFormId({ page });

  // check CTA form initial fields
  await expect(
    page.getByRole("button", {
      name: callToActionInitialValue.form.fields?.[0]?.name,
    })
  ).toBeVisible();
  await expect(
    page.getByRole("button", {
      name: callToActionInitialValue.form.fields?.[1]?.name,
    })
  ).toBeVisible();
  await expect(
    page.getByRole("button", {
      name: callToActionInitialValue.form.fields?.[2]?.name,
    })
  ).toBeVisible();
  await expect(
    page.getByRole("button", {
      name: callToActionInitialValue.form.fields?.[3]?.name,
    })
  ).toBeVisible();
  // TODO: edit a single form field to test if we can update the fields array

  // CTA form button label
  await expect(
    page
      .getByTestId("field-variants.form.buttonLabel")
      .getByTestId("string-input")
  ).toHaveValue(callToActionInitialValue.form.buttonLabel);
  await page
    .getByTestId("field-variants.form.buttonLabel")
    .getByTestId("string-input")
    .fill("Meta+a");
  await page
    .getByTestId("field-variants.form.buttonLabel")
    .getByTestId("string-input")
    .fill("Get Started");

  // CTA form thank you page link
  await page
    .getByRole("button", { name: "Thank You page" })
    .click({ force: true });
  await page
    .getByLabel("External, outside this website")
    .check({ force: true });
  await expect(page.getByLabel("URL")).toBeVisible();
  await page.getByLabel("URL").fill("https://webriq.com");
  await expect(page.getByText("Link Target")).toBeVisible();

  // CTA Sign in links + form links
  if (hasOtherLinks) {
    await expect(
      page
        .getByTestId("field-variants.signInLink.linkType")
        .getByLabel("Internal, inside this website")
    ).toBeChecked();
    await expect(
      page
        .locator("div")
        .filter({ hasText: /^Page Reference$/ })
        .nth(1)
    ).toBeVisible();
    await page.getByTestId("autocomplete").click();
    await page
      .getByTestId("field-variants.signInLink.linkType")
      .getByLabel("External, outside this website")
      .check();
    await expect(
      page
        .getByTestId("field-variants.signInLink.linkExternal")
        .getByLabel("URL")
    ).toBeVisible();
    await page.getByLabel("URL").fill("https://webriq.com");
    await expect(
      page
        .getByTestId("field-variants.signInLink.linkTarget")
        .getByLabel("Self (default) - open in the")
    ).toBeChecked();

    // CTA form links
    await expect(
      page.getByRole("button", { name: "Police privacy Internal Link" })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Terms of Use Internal Link" })
    ).toBeVisible();
  }
}
