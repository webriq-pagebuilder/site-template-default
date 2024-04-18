import { expect, test, type Page } from "@playwright/test";
import { NEXT_PUBLIC_SANITY_STUDIO_URL, NEXT_PUBLIC_SITE_URL } from "studio/config";
import { autologin_studio, createNewPage, expectDocumentPublished, navigateToPage } from "../utils/index";

const footerBodyInput = "Footer body test";
const copyrightText = "© 2024 Footer Text";
const contactAddress = "359 Hidden Valley Road, NY";
const contactEmail = "hello@webriq.com";
const contactInfo = "+48 698 033 101";
const externalLinkUrl = 'https://facebook.com/'
const internalLinkUrl = `${NEXT_PUBLIC_SITE_URL}/thank-you/`
let newPageTitle;

let page: Page;

test.beforeAll("Auto login studio", async ({ browser }) => {
  page = await browser.newPage();

  // navigate to the studio
  await page.goto(`${NEXT_PUBLIC_SANITY_STUDIO_URL}`);

  const token = process.env.NEXT_PUBLIC_STUDIO_AUTOLOGIN_TOKEN_FOR_TESTING;
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

  await page.evaluate(autologin_studio, { token, projectId });
});

async function addNavigationRoutes(buttonName, isInternalLink, variantIndex) {
  await page.getByRole('button', { name: buttonName }).click();
  await expect(page.getByLabel('Edit Link')).toBeVisible({ timeout: 75000 });
  // NAVIGATION INTERNAL/EXTERNAL SELECTOR
  const routesExternalLink = await page.locator('.sc-jdUcAg > div:nth-child(2) > div label[data-ui="Flex"] span:has-text("External, outside this website"):nth-child(1)');
  const routesInternalLink = await page.locator('.sc-jdUcAg > div:nth-child(2) > div label[data-as="label"] span:has-text("Internal, inside this website")');
  
  const blankLinkTarget = { element: page.locator('.sc-jdUcAg > div:nth-child(2) > div label[data-as="label"] span:has-text("Blank - open on a new tab (")'), target: 'Blank - open on a new tab (' };
  const selfLinkTarget = { element: page.locator('.sc-jdUcAg > div:nth-child(2) > div label[data-as="label"] span:has-text("Self (default) - open in the")'), target: 'Self (default) - open in the' };

  if(!isInternalLink) {
    await routesExternalLink.click({ force: true });
    await page.locator('.sc-jdUcAg > div:nth-child(2) > div input[inputmode="url"]').click({ force: true });
    await page.locator('.sc-jdUcAg > div:nth-child(2) > div input[inputmode="url"]').fill(externalLinkUrl)
    await blankLinkTarget.element.click();
  } else {
    await routesInternalLink.click();
    // await page.getByTestId('reference-input').getByLabel('Open').click();
    await page.getByTestId('autocomplete').click();
    await page.getByTestId('autocomplete').fill('thank you');
    await page.getByRole('button', { name: 'Thank you Published No' }).click();
    await selfLinkTarget.element.click();
  }

  if(variantIndex === 3) {
    await page.getByLabel('Edit Link').getByLabel('Close dialog').click();
  }
  await page.getByLabel('Close dialog').click();
}

export async function createFooterVariant(pageTitle, variantLabel, variantIndex, isInternalLink) {
   newPageTitle = pageTitle + " - " + new Date().getTime()

  await navigateToPage(page);
  await createNewPage(page, newPageTitle, "Footer")

  await page.getByTestId("field-label").getByTestId("string-input").click({ force: true });
  await page.getByTestId("field-label").getByTestId("string-input").fill(variantLabel);
  
  if(variantIndex <= 0) {
    await page.getByTestId("field-variant").getByRole("img").first().click({ force: true });
  } else {
    await page.getByTestId("field-variant").getByRole("img").nth(variantIndex).click({ force: true });
  }

  const blankLinkTarget = { element: page.getByText('Blank - open on a new tab ('), target: 'Blank - open on a new tab (' };
  const selfLinkTarget = { element: page.getByText('Self (default) - open in the'), target: 'Self (default) - open in the' };

  let linkConfiguration;

  if(!isInternalLink) {
    //Logo Alt
    const logoAltInput = page.getByTestId('field-variants.logo.alt').getByTestId('string-input');
    await logoAltInput.click();
    await logoAltInput.fill("alt text test");
    await page.getByTestId('field-variants.logo.linkType').getByText('External, outside this website').click();
    await page.waitForTimeout(1000)
    await page.getByLabel('URL').click()
    await page.getByLabel('URL').fill(externalLinkUrl)
    await page.waitForTimeout(1000)
    await page.getByText('Blank - open on a new tab (').click()
    linkConfiguration = { url: externalLinkUrl, target: blankLinkTarget.target}
  } else { 
    await page.getByTestId('field-variants.logo.linkType').getByText('Internal, inside this website').click();
    await page.getByTestId('autocomplete').click();
    await page.getByTestId('autocomplete').fill('thank you');
    await page.getByRole('button', { name: 'Thank you Published No' }).click({ force: true });
    await selfLinkTarget.element.click();
    linkConfiguration = { url: internalLinkUrl, target: selfLinkTarget.target }
   }

   //Body
  if (variantIndex === 0 || variantIndex === 3) {
    await page.getByLabel("Body").click();
    await page.getByLabel("Body").fill(footerBodyInput);
  }

  //Contact Details
  if (variantIndex === 0) {
    await page.getByRole("button", { name: "Hidden Valley Road, NY" }).click();
    await expect(page.getByLabel("Edit Contact Information")).toBeVisible();
    //TODO: Inputs for edit contact info text here.
    await page.getByLabel("Close dialog").click();
  }

  //Copyright
  await page.getByTestId("field-variants.copyright").getByTestId("string-input").click();
  await page.getByTestId("field-variants.copyright").getByTestId("string-input").fill(copyrightText);

  const socialMediaLink = page.getByLabel("Social Media Link");

  //Social Links
  //Facebook
  await page.getByRole("button", { name: "facebook" }).click();
  await expect(page.getByLabel("Edit Details")).toBeVisible();
  await page.getByLabel("Select the social media").selectOption("0");
  await socialMediaLink.click();
  await socialMediaLink.fill(externalLinkUrl);
  await page.getByLabel("Close dialog").click();

  //Twitter
  await page.getByRole("button", { name: "twitter" }).click();
  await expect(page.getByLabel("Edit Details")).toBeVisible();
  await page.getByLabel("Select the social media").selectOption("1");
  await socialMediaLink.click();
  await socialMediaLink.fill(externalLinkUrl);
  await page.getByLabel("Close dialog").click();

  //Instagram
  await page.getByRole("button", { name: "instagram" }).click();
  await expect(page.getByLabel("Edit Details")).toBeVisible();
  await page.getByLabel("Select the social media").selectOption("2");
  await socialMediaLink.click();
  await socialMediaLink.fill(externalLinkUrl);
  await page.getByLabel("Close dialog").click();

  // Perform navigation clicks
  if(variantIndex !== 0 && variantIndex !== 3) {
  await addNavigationRoutes('Start Internal Link Not Set', isInternalLink, variantIndex);
  await addNavigationRoutes('About Us Internal Link Not Set', isInternalLink, variantIndex);
  await addNavigationRoutes('Services Internal Link Not Set', isInternalLink, variantIndex);
  await addNavigationRoutes('Platform Internal Link Not Set', isInternalLink, variantIndex);
  await addNavigationRoutes('Testimonials Internal Link', isInternalLink, variantIndex);
  }

  if(variantIndex === 3) {
    //Quick Links
    await page.getByRole('button', { name: 'Quick Links' }).click();
    await expect(page.getByLabel('Edit', { exact: true })).toBeVisible();
    await addNavigationRoutes('Start Internal Link Not Set', isInternalLink, variantIndex);
    await page.getByRole('button', { name: 'Quick Links' }).click();
    await addNavigationRoutes('About Us Internal Link Not Set', isInternalLink, variantIndex);
    await page.getByRole('button', { name: 'Quick Links' }).click();
    await addNavigationRoutes('Services Internal Link Not Set', isInternalLink, variantIndex);
    
    //Helpful Links
    await page.getByRole('button', { name: 'Helpful Links' }).click();
    await expect(page.getByLabel('Edit', { exact: true })).toBeVisible();
    await addNavigationRoutes('Platform Internal Link Not Set', isInternalLink, variantIndex);
    await page.getByRole('button', { name: 'Helpful Links' }).click();
    await addNavigationRoutes('Testimonials Internal Link', isInternalLink, variantIndex);

    //Explore Links
    await page.getByRole('button', { name: 'Explore' }).click();
    await expect(page.getByLabel('Edit', { exact: true })).toBeVisible();
    await addNavigationRoutes('Terms and Conditions Internal', isInternalLink, variantIndex);
    await page.getByRole('button', { name: 'Explore' }).click();
    await addNavigationRoutes('Privacy Policy', isInternalLink, variantIndex);
    await page.getByRole('button', { name: 'Explore' }).click();
    await addNavigationRoutes('Cookies Internal Link Not Set', isInternalLink, variantIndex);
  }

  await expectDocumentPublished(page)
  await expect(page.getByRole("link", { name: newPageTitle })).toBeVisible();

  const pagePromise = page.waitForEvent('popup');
  await page.getByText(`${NEXT_PUBLIC_SITE_URL}`).click({ force: true });
  const openUrlPage = await pagePromise;
    
  // Default should just be available routes - no buttons in variant E
  await assertPageContent(openUrlPage, linkConfiguration, "facebook", isInternalLink, variantIndex);
}

async function assertPageContent(openUrlPage, linkConfiguration, linkName, isInternalLink, variantIndex) {
  const sectionCount = await openUrlPage.locator("div").filter({ hasText: /^No items$/ }).count();

  if (sectionCount > 0) {
    // If the section no items is found, expect the Empty Page element to be visible
    await expect(openUrlPage.getByText("Empty Page")).toBeVisible({ timeout: 20000 }).then(() => console.log('There is no Available Content!'));
  } else {
    // If the section no items is not found, expect the Empty Page element to be hidden
    await expect(openUrlPage.getByText("Empty Page")).toBeHidden({ timeout: 20000 });
    await expect(openUrlPage.locator('section')).toBeVisible({ timeout: 20000 });

    if (variantIndex === 0 || variantIndex === 4) {
      await expect(openUrlPage.getByText(footerBodyInput)).toBeVisible();
    }

    if (variantIndex === 0) {
      await expect(openUrlPage.getByText(contactInfo)).toBeVisible();
      await expect(openUrlPage.getByText(contactAddress)).toBeVisible();
      await expect(openUrlPage.getByText(contactEmail)).toBeVisible();
    }

    if(variantIndex === 3) {
      await expect(openUrlPage.getByText('Quick Links')).toBeVisible();
      await expect(openUrlPage.getByText('Helpful Links')).toBeVisible();
      await expect(openUrlPage.getByText('Explore')).toBeVisible();
    }
    // EXPECT THE SAME VALUE FOR NAVIGATION ROUTES LIST.
    if(variantIndex !== 0) {
      await expect(openUrlPage.getByRole('list').locator('li').filter({ hasText: 'Start' })).toBeVisible();
      await expect(openUrlPage.getByRole('list').locator('li').filter({ hasText: 'About Us' })).toBeVisible();
      await expect(openUrlPage.getByRole('list').locator('li').filter({ hasText: 'Services' })).toBeVisible();
      await expect(openUrlPage.getByRole('list').locator('li').filter({ hasText: 'Platform' })).toBeVisible();
      await expect(openUrlPage.getByRole('list').locator('li').filter({ hasText: 'Testimonials' })).toBeVisible();
    }

    await expect(openUrlPage.getByText(copyrightText)).toBeVisible();
    await expect(openUrlPage.getByLabel("facebook", { exact: true }).hover()).toBeTruthy();
    await expect(openUrlPage.getByLabel("twitter").hover()).toBeTruthy();
    await expect(openUrlPage.getByLabel("instagram").hover()).toBeTruthy();

    if (["facebook", "twitter", "instagram", logoImg].includes(linkName)) {
      const logoLink = await openUrlPage.locator(`a[aria-label="${linkName}"]`);
      await logoLink.hover();
      await logoLink.click();

      if (linkName === logoImg) {
        if (isInternalLink) {
          await openUrlPage.getByRole("link", { name: linkName }).click({ force: true });
          await openUrlPage.waitForLoadState("networkidle");
          await expect(openUrlPage.getByText("Success!")).toBeVisible({ timeout: 20000 });
          const expectedUrl = linkConfiguration?.url.endsWith("/") ? linkConfiguration?.url : `${linkConfiguration?.url}/`;
          const receivedUrl = openUrlPage.url().endsWith("/") ? openUrlPage.url() : `${openUrlPage.url()}/`;
          await expect(receivedUrl).toBe(expectedUrl);
        } else {
          const page10 = await openUrlPage.waitForEvent("popup");
          const normalizedExpectedUrl = externalLinkUrl.replace("https://www.", "https://");
          const normalizedReceivedUrl = page10.url().replace("https://www.", "https://");
          await expect(normalizedReceivedUrl).toBe(normalizedExpectedUrl);
          await expect(page10.getByRole('img', { name: 'Facebook' })).toBeVisible();
        }
      } else {
          const page10 = await openUrlPage.waitForEvent("popup");
          const normalizedExpectedUrl = externalLinkUrl.replace("https://www.", "https://");
          const normalizedReceivedUrl = page10.url().replace("https://www.", "https://");
          console.log('normalizedExpectedUrl',normalizedExpectedUrl)
          console.log('normalizedReceivedUrl',normalizedReceivedUrl)
          await expect(normalizedReceivedUrl).toBe(normalizedExpectedUrl);
          await expect(page10.getByRole('img', { name: 'Facebook' })).toBeVisible();
        }

    } else {
      if (linkConfiguration.target === "Blank - open on a new tab (") {
        const page10Promise = openUrlPage.waitForEvent("popup");
        await openUrlPage.getByRole("link", { name: linkName }).click({ force: true });
        const page10 = await page10Promise;
        const normalizedExpectedUrl = externalLinkUrl.replace("https://www.", "https://");
        const normalizedReceivedUrl = page10.url().replace("https://www.", "https://");
        await expect(normalizedReceivedUrl).toBe(normalizedExpectedUrl);
        await expect(page10.getByRole('img', { name: 'Facebook' })).toBeVisible();
      } else {
        await openUrlPage.getByRole("link", { name: linkName }).click({ force: true });
        await openUrlPage.waitForLoadState("networkidle");
        await expect(openUrlPage.getByText("Success!")).toBeVisible({ timeout: 20000 });
        const expectedUrl = linkConfiguration?.url.endsWith("/") ? linkConfiguration?.url : `${linkConfiguration?.url}/`;
        const receivedUrl = openUrlPage.url().endsWith("/") ? openUrlPage.url() : `${openUrlPage.url()}/`;
        await expect(receivedUrl).toBe(expectedUrl);
      }
    }
  }
}

const createFooterTest = async (pageTitle, variantName, variantIndex, isInternalLink, linkNames) => {
  await createFooterVariant(pageTitle, variantName, variantIndex, isInternalLink);
  const blankLinkTarget = { target: 'Blank - open on a new tab (' };
  const selfLinkTarget = { target: 'Self (default) - open in the' };
  let linkConfiguration
  
  if(!isInternalLink) {
    linkConfiguration = { url: externalLinkUrl, target: blankLinkTarget.target }    
  } else {
    linkConfiguration = { url: internalLinkUrl, target: selfLinkTarget.target };
  }
  
  // Loops all routes
  const slug = newPageTitle?.toLowerCase()?.replace(/\s+/g, "-").replace(/-+/g, "-");
  for(const linkName of linkNames) {
    await page.goto(`${NEXT_PUBLIC_SITE_URL}/${slug}`)
    await assertPageContent(page, linkConfiguration, linkName, isInternalLink, variantIndex);
  }
    await page.goto(`${NEXT_PUBLIC_SITE_URL}/${slug}`)
};

const isInternalLink = true;
let logoImg;
isInternalLink ? (logoImg = "Go to /thank-you") : (logoImg = "Go to https://facebook.com/");

test("Create Footer Variant A", async () => {
  const linkNames = ["twitter", "instagram", logoImg];
  await createFooterTest("Footer Page A", "Footer New Page Variant A", 0, isInternalLink, linkNames);
});

test("Create Footer Variant B", async () => {
  const linkNames = ["twitter", "instagram", logoImg, "Start", "About Us", "Services", "Platform", "Testimonials"];
  await createFooterTest("Footer Page B", "Footer New Page Variant B", 1, isInternalLink, linkNames);
});

test("Create Footer Variant C", async () => {
  const linkNames = ["twitter", "instagram", logoImg, "Start", "About Us", "Services", "Platform", "Testimonials"];
  await createFooterTest("Footer Page C", "Footer New Page Variant C", 2, isInternalLink, linkNames);
});

test("Create Footer Variant D", async () => {
  const linkNames = ["twitter", "instagram", logoImg, "Start", "About Us", "Services", "Platform", "Testimonials", "Terms and Conditions", "Privacy Policy", "Cookies"];
  await createFooterTest("Footer Page D", "Footer New Page Variant D", 3, isInternalLink, linkNames);
});

test.afterAll(async () => {
  await page.close();
});