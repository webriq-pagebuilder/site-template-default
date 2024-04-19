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
  navigateToPage,
} from "tests/utils";

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

async function createTestimonialVariants(
  pageTitle,
  variantLabel,
  variantIndex
) {
  newPageTitle = `${pageTitle} ` + new Date().getTime();

  await navigateToPage(page);
  await createNewPage(page, newPageTitle, "Testimonial");
  await clickVariantImage(page, variantIndex);

  //Title
  await page.getByTestId("field-label").getByTestId("string-input").click();
  await page
    .getByTestId("field-label")
    .getByTestId("string-input")
    .fill(variantLabel);

  const peopleData = [
    {
      name: "Daisy Carter",
      fullName: "Carter Daisy",
      currentJob: "Product Development",
      jobTitle: "Development of Product",
      testimony: "Carter Daisy Testimony",
    },
    {
      name: "Alice Bradley",
      fullName: "Bradley Alice",
      currentJob: "Backend Developer",
      jobTitle: "Frontend Developer",
      testimony: "Bradley Alice Testimony",
    },
    {
      name: "Ian Brown",
      fullName: "Brown Ian",
      currentJob: "Head of Development",
      jobTitle: "Development Head",
      testimony: "Brown Ian Testimony",
    },
    {
      name: "Dennis Robertson",
      fullName: "Dennis Robertson",
      currentJob: "Frontend Developer",
      jobTitle: "Fullstack Developer",
      testimony: "Dennis Robertson Testimony",
    },
  ];

  const rating = "3";
  for (const person of peopleData) {
    await page.getByRole("button", { name: person.name }).click();
    await expect(page.getByLabel("Edit", { exact: true })).toBeVisible();
    if (variantIndex === 3) {
      //Rating
      await page.getByLabel("Rating").click();
      await page.getByLabel("Rating").selectOption(rating); //3 stars
    }

    //Full Name
    await page.locator(`input[value="${person.name}"]`).click();
    await page.locator(`input[value="${person.name}"]`).fill(person.fullName);

    //Job Title
    await page.locator(`input[value="${person.currentJob}"]`).click();
    await page
      .locator(`input[value="${person.currentJob}"]`)
      .fill(person.jobTitle);

    //Testimony
    await page.locator('input.sc-uVWWZ.bTJeWN[value*="Lorem ipsum"]').click();
    await page
      .locator('input.sc-uVWWZ.bTJeWN[value*="Lorem ipsum"]')
      .fill(person.testimony);
    await page.getByLabel("Close dialog").click();
  }

  await expectDocumentPublished(page, newPageTitle);

  const pagePromise = page.waitForEvent("popup");
  await page.getByText(`${NEXT_PUBLIC_SITE_URL}`).click({ force: true });
  const openUrlPage = await pagePromise;

  if (variantIndex === 0 || variantIndex === 3) {
    for (let i = 0; i < peopleData.length; i++) {
      const testimonial = peopleData[i];
      const paginationBtn = `Show Testimonial ${i + 1}`;

      if (variantIndex === 3) {
        await expect(openUrlPage.getByText(rating)).toBeVisible();
        await expect(
          openUrlPage
            .locator("div")
            .filter({ hasText: /^3\.0$/ })
            .locator("div")
            .first()
        ).toBeVisible();
      }
      await expect(
        openUrlPage.getByText(testimonial.fullName, { exact: true })
      ).toBeVisible();
      await expect(openUrlPage.getByText(testimonial.jobTitle)).toBeVisible();

      variantIndex === 0
        ? await expect(
            openUrlPage.getByRole("heading", { name: testimonial.testimony })
          ).toBeVisible()
        : await expect(
            openUrlPage.getByText(testimonial.testimony)
          ).toBeVisible();

      // Proceed with click only if not the last item
      if (variantIndex === 0) {
        const paginationButton = openUrlPage.locator(
          `[aria-label="${paginationBtn}"]`
        );
        if (i < peopleData.length - 1) {
          if (paginationButton) {
            await paginationButton.click();
          }
        }
      } else {
        const nextBtn = openUrlPage.getByRole("button", {
          name: "Show next testimonial",
        });
        if (i < peopleData.length - 1) {
          if (nextBtn) {
            await nextBtn.click();
          }
        }
      }
    }
  }

  if (variantIndex === 1 || variantIndex === 2) {
    await expect(
      openUrlPage.getByText(peopleData[0].fullName, { exact: true })
    ).toBeVisible();
    await expect(openUrlPage.getByText(peopleData[0].jobTitle)).toBeVisible();
    await expect(openUrlPage.getByText(peopleData[0].testimony)).toBeVisible();

    await expect(
      openUrlPage.getByText(peopleData[1].fullName, { exact: true })
    ).toBeVisible();
    await expect(openUrlPage.getByText(peopleData[1].jobTitle)).toBeVisible();
    await expect(openUrlPage.getByText(peopleData[1].testimony)).toBeVisible();

    await expect(
      openUrlPage.getByText(peopleData[2].fullName, { exact: true })
    ).toBeVisible();
    await expect(openUrlPage.getByText(peopleData[2].jobTitle)).toBeVisible();
    await expect(openUrlPage.getByText(peopleData[2].testimony)).toBeVisible();

    await expect(
      openUrlPage.getByText(peopleData[3].fullName, { exact: true })
    ).toBeHidden();

    //Next pagination
    await openUrlPage.getByLabel("Show next testimonial").click();
    await expect(
      openUrlPage.getByText(peopleData[3].fullName, { exact: true })
    ).toBeVisible();
    await expect(openUrlPage.getByText(peopleData[3].jobTitle)).toBeVisible();
    await expect(openUrlPage.getByText(peopleData[3].testimony)).toBeVisible();
    await expect(
      openUrlPage.getByText(peopleData[0].fullName, { exact: true })
    ).toBeHidden();

    //Prev pagination
    await openUrlPage.getByLabel("Show previous testimonial").click();
    await expect(
      openUrlPage.getByText(peopleData[0].fullName, { exact: true })
    ).toBeVisible();
    await expect(openUrlPage.getByText(peopleData[0].jobTitle)).toBeVisible();
    await expect(openUrlPage.getByText(peopleData[0].testimony)).toBeVisible();
    await expect(
      openUrlPage.getByText(peopleData[3].fullName, { exact: true })
    ).toBeHidden();
  }

  //Prev button
  if (variantIndex === 3) {
    await openUrlPage
      .getByRole("button", { name: "Show previous testimonial" })
      .click();

    await expect(
      openUrlPage.getByText(peopleData[3].fullName, { exact: true })
    ).toBeHidden();
    await expect(
      openUrlPage.getByText(peopleData[2].fullName, { exact: true })
    ).toBeVisible();
    await expect(openUrlPage.getByText(peopleData[2].jobTitle)).toBeVisible();
    await expect(openUrlPage.getByText(peopleData[2].testimony)).toBeVisible();
    await openUrlPage
      .getByRole("button", { name: "Show previous testimonial" })
      .click();

    await expect(
      openUrlPage.getByText(peopleData[2].fullName, { exact: true })
    ).toBeHidden();
    await expect(
      openUrlPage.getByText(peopleData[1].fullName, { exact: true })
    ).toBeVisible();
    await expect(openUrlPage.getByText(peopleData[1].jobTitle)).toBeVisible();
    await expect(openUrlPage.getByText(peopleData[1].testimony)).toBeVisible();
    await openUrlPage
      .getByRole("button", { name: "Show previous testimonial" })
      .click();

    await expect(
      openUrlPage.getByText(peopleData[1].fullName, { exact: true })
    ).toBeHidden();
    await expect(
      openUrlPage.getByText(peopleData[0].fullName, { exact: true })
    ).toBeVisible();
    await expect(openUrlPage.getByText(peopleData[0].jobTitle)).toBeVisible();
    await expect(openUrlPage.getByText(peopleData[0].testimony)).toBeVisible();
    await openUrlPage
      .getByRole("button", { name: "Show previous testimonial" })
      .click();
  }
}

const testimonialVariants = [
  {
    variantName: "Variant A",
    pageTitle: "Testimonials Variant A",
    variantLabel: "Testimonials New Page Variant A",
    variantIndex: 0,
  },
  {
    variantName: "Variant B",
    pageTitle: "Testimonials Variant B",
    variantLabel: "Testimonials New Page Variant B",
    variantIndex: 1,
  },
  {
    variantName: "Variant C",
    pageTitle: "Testimonials Variant C",
    variantLabel: "Testimonials New Page Variant C",
    variantIndex: 2,
  },
  {
    variantName: "Variant D",
    pageTitle: "Testimonials Variant D",
    variantLabel: "Testimonials New Page Variant D",
    variantIndex: 3,
  },
];

testimonialVariants.forEach((variant) => {
  test.describe(`${variant.variantName} Workflow`, () => {
    test.describe.configure({ timeout: 900000, mode: "serial" });

    test(`Create ${variant.pageTitle}`, async () => {
      await createTestimonialVariants(
        variant.pageTitle,
        variant.variantLabel,
        variant.variantIndex
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
