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
  subtitleFieldInput,
  titleFieldInput,
  variantLabelInput,
  verifyExternalUrl,
  verifyInternalUrl,
} from "tests/utils";

let page: Page;
let newPageTitle;
const subtitle = "Subtitle Test";
const title = "Title Test";
const description = "Description Test";
const monthlyBilling = "50";
const annualBilling = "99";
const blockTextInput = "Statement to inform user of terms and policies";
const formBtnLabel = "Button Test";
const formSubtitle = "Pricing Test";
const formName = "Create an Account";
const signInLink = "Sign In Test";

const formBanner = [
  { name: "Lorem ipsum dolor sit amet," },
  { name: "Faucibus scelerisque eleifend" },
  { name: "Ipsum consequat nisl vel" },
  { name: "Viverra maecenas accumsan" },
];

const internalLinkUrl = `${NEXT_PUBLIC_SITE_URL}/thank-you`;
const externalLinkUrl = `https://facebook.com/`;

test.beforeAll("Auto login studio", async ({ browser }) => {
  page = await browser.newPage();

  // navigate to the studio
  await page.goto(`${NEXT_PUBLIC_SANITY_STUDIO_URL}`);

  const token = process.env.NEXT_PUBLIC_STUDIO_AUTOLOGIN_TOKEN_FOR_TESTING;
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

  await page.evaluate(autologin_studio, { token, projectId });
});

async function createPricingVariant(
  pageTitle,
  variantLabel,
  variantIndex,
  isInternalLink
) {
  newPageTitle = `${pageTitle} ` + new Date().getTime();

  await navigateToPage(page);
  await createNewPage(page, newPageTitle, "Pricing");
  await clickVariantImage(page, variantIndex);
  await variantLabelInput(page, variantLabel);
  await subtitleFieldInput(page, subtitle);
  await titleFieldInput(page, title);

  //Description
  await page.getByPlaceholder("Lorem ipsum dolor sit amet,").click();
  await page.getByPlaceholder("Lorem ipsum dolor sit amet,").fill(description);

  if (variantIndex === 3) {
    //Monthly Billing
    await page
      .getByTestId("field-variants.monthlyBilling")
      .getByTestId("string-input")
      .click();
    await page
      .getByTestId("field-variants.monthlyBilling")
      .getByTestId("string-input")
      .fill(monthlyBilling);

    //Annual Billing
    await page
      .getByTestId("field-variants.annualBilling")
      .getByTestId("string-input")
      .click();
    await page
      .getByTestId("field-variants.annualBilling")
      .getByTestId("string-input")
      .fill(annualBilling);

    //Generate Form Id
    // await generateFormId({ page });
    await page
      .getByRole("button", { name: "Generate ID" })
      .click({ force: true });
    expect(page.getByLabel("Form ID")).not.toBeUndefined();
    await expect(
      page.getByRole("button", { name: "Generate ID" })
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Manage" })).toBeVisible();

    //Form Subtitle
    await page
      .getByTestId("field-variants.form.subtitle")
      .getByTestId("string-input")
      .click();
    await page
      .getByTestId("field-variants.form.subtitle")
      .getByTestId("string-input")
      .fill(formSubtitle);

    //Form Name
    await page
      .getByTestId("field-variants.form.name")
      .getByTestId("string-input")
      .click();
    await page
      .getByTestId("field-variants.form.name")
      .getByTestId("string-input")
      .fill(formName);

    const formFields = [
      { name: "Email" },
      { name: "Password" },
      { name: "Card number" },
    ];

    for (const form of formFields) {
      await page.getByRole("button", { name: form.name }).click();
      await expect(page.getByLabel("Edit WebriQ Form Field")).toBeVisible();
      await page.locator(`input[value^="${form.name}"]`).click();
      await page
        .locator(`input[value^="${form.name}"]`)
        .fill(`Updated ${form.name}`);
      await page.getByLabel("Is this field Required?").click();
      await page.getByLabel("Close dialog").click();
    }

    //Form Button Label
    await page
      .getByTestId("field-variants.form.buttonLabel")
      .getByTestId("string-input")
      .click();
    await page
      .getByTestId("field-variants.form.buttonLabel")
      .getByTestId("string-input")
      .fill(formBtnLabel);

    //Sign in Link
    await page.locator(`input[value="Sign In"]`).click();
    await page.locator(`input[value="Sign In"]`).fill(signInLink);
    if (isInternalLink) {
      await page.getByText("Internal, inside this website").click();
      await page.getByTestId("autocomplete").click();
      await page.getByTestId("autocomplete").fill("thank you");
      await page
        .getByRole("button", { name: "Thank you Published No" })
        .click();
      await page.getByText("Self (default) - open in the").click();
    } else {
      await page.getByText("External, outside this website").click();
      await page.getByLabel("URL").click();
      await page.getByLabel("URL").fill(externalLinkUrl);
      await page.getByText("Blank - open on a new tab (").click();
    }

    for (const banner of formBanner) {
      await page.getByRole("button", { name: banner.name }).click();
      await expect(page.getByLabel("Edit", { exact: true })).toBeVisible();
      await page.locator(`input[value^="${banner.name}"]`).click();
      await page
        .locator(`input[value^="${banner.name}"]`)
        .fill(`Updated ${banner.name}`);
      await page.getByLabel("Close dialog").click();
    }
    //Block text
    await expect(
      page.getByTestId("activate-overlay").locator("div").first()
    ).toBeVisible();
    await page.getByText("Click to activate").first().click({ force: true });
    await page.getByTestId("text-style--normal").nth(1).click({ force: true });
    await page.getByTestId("scroll-container").getByRole("textbox").fill("");
    await page
      .getByTestId("scroll-container")
      .getByRole("textbox")
      .fill(blockTextInput);
  }

  //Can select stripe account
  await page.getByLabel("Choose Stripe Account").click();
  await page
    .getByLabel("Choose Stripe Account")
    .selectOption("Mariel Stripe Test 2");

  const planType = [
    { name: "Vestibulum viverra", updatedName: "Plan 1" },
    { name: "Morbi mollis metus", updatedName: "Plan 2" },
    { name: "Etiam lectus nunc", updatedName: "Plan 3" },
    { name: "Ut quam nisl mollis", updatedName: "Plan 4" },
    { name: "Suspendisse bibendum", updatedName: "Plan 5" },
  ];

  const paymentPlans = [
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
  ];

  //Payment Plans
  if (variantIndex !== 3) {
    for (const payment of paymentPlans) {
      await page.getByRole("button", { name: payment.plan }).click();
      await expect(page.getByLabel("Edit Plans")).toBeVisible();
      await page.locator(`input[value^="${payment.plan}"]`).click();
      await page
        .locator(`input[value^="${payment.plan}"]`)
        .fill(payment.updatedPlan);

      if (variantIndex === 0 || variantIndex === 2) {
        //Monthly
        await page
          .locator('input[id^="variants.plans"][id*=".monthlyPrice"]')
          .click();
        await page
          .locator('input[id^="variants.plans"][id*=".monthlyPrice"]')
          .fill(payment.updatedMonthly);

        //Yearly
        await page.locator(`input[value^="${payment.yearly}"]`).click();
        await page
          .locator(`input[value^="${payment.yearly}"]`)
          .fill(payment.updatedYearly);
      } else if (variantIndex === 1) {
        await page.locator(`input[value^="${payment.monthly}"]`).click();
        await page
          .locator(`input[value^="${payment.monthly}"]`)
          .fill(payment.updatedMonthly);
      }

      //Description
      await page.locator(`textarea:has-text("${payment.description}")`).click();
      await page
        .locator(`textarea:has-text("${payment.description}")`)
        .fill(payment.updatedDescription);

      //Plan Includes
      if (variantIndex === 0 || variantIndex === 1) {
        for (const plan of payment.planType) {
          await page.locator(`input[value^="${plan.name}"]`).click();
          await page
            .locator(`input[value^="${plan.name}"]`)
            .fill(plan.updatedName);
        }
      }

      //Checkout Button
      await page.locator(`input[value^="${payment.checkoutBtn}"]`).click();
      await page
        .locator(`input[value^="${payment.checkoutBtn}"]`)
        .fill(payment.updatedCheckoutBtn);

      await page.getByLabel("Close dialog").click();
    }
  }

  await expectDocumentPublished(page, newPageTitle);

  const pagePromise = page.waitForEvent("popup");
  await page.getByText(`${NEXT_PUBLIC_SITE_URL}`).click({ force: true });
  const openUrlPage = await pagePromise;

  await expect(openUrlPage.getByText("Empty Page")).toBeHidden({
    timeout: 20000,
  });
  await expect(openUrlPage.locator("section")).toBeVisible({
    timeout: 20000,
  });

  await expect(openUrlPage.getByText(subtitle)).toBeVisible();
  await expect(openUrlPage.getByRole("heading", { name: title })).toBeVisible();
  await expect(openUrlPage.getByText(description)).toBeVisible();

  if (variantIndex === 0 || variantIndex === 2) {
    await expect(openUrlPage.getByLabel("Monthly Plan")).toBeVisible();
    await expect(openUrlPage.getByLabel("Yearly Plan")).toBeVisible();
  } else if (variantIndex === 3) {
    await expect(openUrlPage.getByText("Monthly Billing")).toBeVisible();
    await expect(openUrlPage.getByText("Annual Billing")).toBeVisible();
    await expect(openUrlPage.getByText(blockTextInput)).toBeVisible();
    await expect(openUrlPage.getByText(monthlyBilling)).toBeVisible();
    await expect(openUrlPage.getByText(annualBilling)).toBeVisible();
    await expect(openUrlPage.getByText(formName)).toBeVisible();
    await expect(openUrlPage.getByLabel(signInLink)).toBeVisible();
    await expect(
      openUrlPage.locator(`button[aria-label="Submit Pricing Form button"]`)
    ).toBeDisabled();

    for (let i = 0; i < formBanner.length; i++) {
      const banner = formBanner[i];
      await openUrlPage.getByLabel(`Page ${i} button`).click();

      await expect(
        openUrlPage.getByRole("img", { name: "pricing-image-" })
      ).toBeVisible();
      await expect(openUrlPage.getByText(banner.name)).toBeVisible();
    }

    await openUrlPage.getByLabel(signInLink).click();
    if (isInternalLink) {
      await openUrlPage.waitForLoadState("networkidle");
      await expect(openUrlPage.getByText("Success!")).toBeVisible({
        timeout: 20000,
      });
      await verifyInternalUrl(openUrlPage, internalLinkUrl);
    } else if (!isInternalLink) {
      const page10Promise = openUrlPage.waitForEvent("popup");
      const page10 = await page10Promise;
      await verifyExternalUrl(page10, externalLinkUrl);
    }
  }

  if (variantIndex !== 3) {
    for (const payment of paymentPlans) {
      if (variantIndex === 0 || variantIndex === 2) {
        await openUrlPage.getByLabel("Monthly Plan").click();
      }
      await expect(
        openUrlPage.getByRole("heading", { name: payment.updatedPlan })
      ).toBeVisible();
      await expect(openUrlPage.getByText(payment.updatedMonthly)).toBeVisible();
      if (variantIndex === 0 || variantIndex === 2) {
        await expect(
          openUrlPage.getByText(payment.updatedDescription).first()
        ).toBeVisible();
      }

      //Plan Type
      if (variantIndex === 0 || variantIndex === 1) {
        for (const plan of payment.planType) {
          await expect(
            openUrlPage.getByText(plan.updatedName).first()
          ).toBeVisible();
          await expect(
            openUrlPage.getByText(plan.updatedName).nth(1)
          ).toBeVisible();
          await expect(
            openUrlPage.getByText(plan.updatedName).nth(2)
          ).toBeVisible();
        }
      }

      await expect(
        openUrlPage.getByLabel(payment.updatedCheckoutBtn)
      ).toBeVisible();
    }

    if (variantIndex === 0 || variantIndex === 2) {
      for (const payment of paymentPlans) {
        await openUrlPage.getByLabel("Yearly Plan").click();
        await expect(
          openUrlPage.getByRole("heading", { name: payment.updatedPlan })
        ).toBeVisible();
        await expect(
          openUrlPage.getByText(payment.updatedYearly)
        ).toBeVisible();
        if (variantIndex === 0 || variantIndex === 2) {
          await expect(
            openUrlPage.getByText(payment.updatedDescription).first()
          ).toBeVisible();
        }

        //Plan Type
        if (variantIndex === 0 || variantIndex === 1) {
          for (const plan of payment.planType) {
            await expect(
              openUrlPage.getByText(plan.updatedName).first()
            ).toBeVisible();
            await expect(
              openUrlPage.getByText(plan.updatedName).nth(1)
            ).toBeVisible();
            await expect(
              openUrlPage.getByText(plan.updatedName).nth(2)
            ).toBeVisible();
          }
        }

        await expect(
          openUrlPage.getByLabel(payment.updatedCheckoutBtn)
        ).toBeVisible();
      }
    }
  }
}

const pricing = [
  {
    variantName: "Variant A",
    pageTitle: "Pricing Variant A",
    variantLabel: "Pricing New Page Variant A",
    variantIndex: 0,
    isInternalLink: null,
  },
  {
    variantName: "Variant B",
    pageTitle: "Pricing Variant B",
    variantLabel: "Pricing New Page Variant B",
    variantIndex: 1,
    isInternalLink: null,
  },
  {
    variantName: "Variant C",
    pageTitle: "Pricing Variant C",
    variantLabel: "Pricing New Page Variant C",
    variantIndex: 2,
    isInternalLink: null,
  },
  {
    variantName: "Variant D",
    pageTitle: "Pricing Variant D",
    variantLabel: "Pricing New Page Variant D",
    variantIndex: 3,
    isInternalLink: false,
  },
];

pricing.forEach((variant) => {
  test.describe(`${variant.variantName} Workflow`, () => {
    test.describe.configure({ timeout: 900000, mode: "serial" });

    test(`Create ${variant.pageTitle}`, async () => {
      await createPricingVariant(
        variant.pageTitle,
        variant.variantLabel,
        variant.variantIndex,
        variant.isInternalLink
      );
    });

    test(`Delete ${variant.pageTitle}`, async () => {
      await deletePageVariant(page, newPageTitle, variant.variantLabel);
    });
  });
});

test.afterAll(async () => {
  await page.close();
});
