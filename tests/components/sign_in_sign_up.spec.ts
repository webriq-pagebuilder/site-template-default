import { test, expect, type Page } from "@playwright/test";
import { NEXT_PUBLIC_SANITY_STUDIO_URL, NEXT_PUBLIC_SITE_URL } from "studio/config";
import { autologin_studio, createNewPage, deletePageVariant, expectDocumentPublished, navigateToPage } from "tests/utils";

let page: Page;

const internalLinkUrl = `${NEXT_PUBLIC_SITE_URL}/thank-you/`;
const externalLinkUrl = 'https://facebook.com/'
const subtitleInput = "Subtitle Input Test";
const formNameInput = "Form Name Input";
const signInBtnInput = "Sign In Button";
const formFields = [
  {
    name: "First Name",
    updatedName: "Name First",
    placeholder: "First Name",
    input: "First name",
  },
  {
    name: "Last Name",
    updatedName: "Name Last",
    placeholder: "Last Name",
    input: "Last name",
  },
  {
    name: "Email",
    updatedName: "Updated Email",
    placeholder: "Enter your email address",
    input: "test@gmail.com",
  },
  {
    name: "Password",
    updatedName: "Updated Password",
    placeholder: "Enter your password",
    input: "Test Password",
  },
]
const formLinks = [
  {
    name: "Police privacy",
    updatedName: "Privacy Policy"
  },
  {
    name: "Terms of Use",
    updatedName: "Use of Terms"
  },
]
let newPageTitle;

test.beforeAll("Auto login studio", async ({ browser }) => {
  page = await browser.newPage();

  // navigate to the studio
  await page.goto(`${NEXT_PUBLIC_SANITY_STUDIO_URL}`);

  const token = process.env.NEXT_PUBLIC_STUDIO_AUTOLOGIN_TOKEN_FOR_TESTING;
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

  await page.evaluate(autologin_studio, { token, projectId });
});

async function createSignInSignUpVariant(pageTitle, variantLabel, variantIndex, isInternalLink, linkNames) {
  newPageTitle = `${pageTitle} `+ new Date().getTime();
  await navigateToPage(page);
  await createNewPage(page, newPageTitle, "Sign In Sign Up");

  //Variant
  if (variantIndex <= 0) {
    await page.getByTestId("field-variant").getByRole("img").first().click({ force: true });
  } else {
    await page.getByTestId("field-variant").getByRole("img").nth(variantIndex).click({ force: true });
  }

  //Variant Title
  await page.getByTestId("field-label").getByTestId("string-input").click();
  await page.getByTestId("field-label").getByTestId("string-input").fill(variantLabel);

  if (isInternalLink) {
    await page.getByTestId('field-variants.logo.linkType').getByText('Internal, inside this website').click();
    await page.getByTestId('fieldset-link').getByTestId('autocomplete').click();
    await page.getByTestId('fieldset-link').getByTestId('autocomplete').fill('thank you');
    await page.getByRole('button', { name: 'Thank you Published No' }).click();
    await page.getByText('Self (default) - open in the').click();
  } else {
    await page.getByTestId('field-variants.logo.linkType').getByText('External, outside this website').click();
    await page.getByTestId('field-variants.logo.linkExternal').getByLabel('URL').click();
    await page.getByTestId('field-variants.logo.linkExternal').getByLabel('URL').fill(externalLinkUrl);
    await page.getByText('Blank - open on a new tab (').click();
  }

  //Generate Form ID
  const formId = "44366aa8-aaf9-45b9-aa3a-610c54ffe766";

  await page.getByLabel('Form ID').click();
  await page.getByLabel('Form ID').fill(formId);
  // await page.getByRole('button', { name: 'Generate ID' }).click({ force: true });
  // expect(page.getByLabel("Form ID")).not.toBeUndefined();
  // await expect(page.getByRole("button", { name: "Generate ID" })).toBeVisible();
  // await expect(page.getByRole("link", { name: "Manage" })).toBeVisible();
  
  //Subtitle
  await page.getByTestId('field-variants.form.subtitle').getByTestId('string-input').click();
  await page.getByTestId('field-variants.form.subtitle').getByTestId('string-input').fill(subtitleInput);

  //Form Name
  await page.getByTestId('field-variants.form.name').getByTestId('string-input').click();
  await page.getByTestId('field-variants.form.name').getByTestId('string-input').fill(formNameInput);

  //Fields

  for (const forms of formFields) {
    await page.getByRole('button', { name: forms.name }).click();
    await expect(page.getByLabel('Edit WebriQ Form Field')).toBeVisible();

    //Form Name
    await page.locator(`input[value^="${forms.name}"]`).first().click();
    await page.locator(`input[value^="${forms.name}"]`).first().fill(forms.updatedName);
    
    //Form Placeholder
    await page.locator(`input[value^="${forms.placeholder}"]`).click();
    await page.locator(`input[value^="${forms.placeholder}"]`).fill(forms.updatedName);

    //Required field
    await page.getByLabel('Is this field Required?').click();
    await page.getByLabel('Close dialog').click();
  }

  //Submit Button Label
  const submitBtnInput = "Submit Button"
  await page.getByTestId('field-variants.form.buttonLabel').getByTestId('string-input').click();
  await page.getByTestId('field-variants.form.buttonLabel').getByTestId('string-input').fill(submitBtnInput);
  
  //Thank you Page Internal/External 
  await page.getByRole('button', { name: 'Thank You page' }).click();
  if (!isInternalLink) {
    await page.getByTestId('field-variants.form.thankYouPage.linkType').getByText('External, outside this website').click();
    await page.getByTestId('field-variants.form.thankYouPage.linkExternal').getByLabel('URL').click();
    await page.getByTestId('field-variants.form.thankYouPage.linkExternal').getByLabel('URL').fill(externalLinkUrl);
    // await page.getByTestId('field-variants.form.thankYouPage.linkTarget').getByText('Blank - open on a new tab (').click();
  }

  //SignIn Button Link
  await page.getByTestId('field-variants.signinLink.label').getByTestId('string-input').click();
  await page.getByTestId('field-variants.signinLink.label').getByTestId('string-input').fill(signInBtnInput);

  if (isInternalLink) {
    await page.getByTestId('field-variants.signinLink.linkType').getByText('Internal, inside this website').click();
    await page.getByTestId('autocomplete').click();
    await page.getByTestId('autocomplete').fill('thank you');
    await page.getByRole('button', { name: 'Thank you Published No' }).click();
    await page.getByTestId('field-variants.signinLink.linkTarget').getByText('Self (default) - open in the').click();
  } else {
    await page.getByTestId('field-variants.signinLink.linkType').getByText('External, outside this website').click();
    await page.getByTestId('field-variants.signinLink.linkExternal').getByLabel('URL').click();
    await page.getByTestId('field-variants.signinLink.linkExternal').getByLabel('URL').fill(externalLinkUrl);
    await page.getByTestId('field-variants.signinLink.linkTarget').getByText('Blank - open on a new tab (').click();
  }

  const formLinks = [
    {
        name: "Police privacy",
        updatedName: "Privacy Policy"
    },
    {
        name: "Terms of Use",
        updatedName: "Use of Terms"
    },
  ]

  const routesExternalLink = await page.locator('.sc-jdUcAg > div:nth-child(2) > div label[data-ui="Flex"] span:has-text("External, outside this website"):nth-child(1)');
  const routesInternalLink = await page.locator('.sc-jdUcAg > div:nth-child(2) > div label[data-as="label"] span:has-text("Internal, inside this website")');
  
  const blankLinkTarget = { element: page.locator('.sc-jdUcAg > div:nth-child(2) > div label[data-as="label"] span:has-text("Blank - open on a new tab (")'), target: 'Blank - open on a new tab (' };

  //Form Links
  for (const links of formLinks) {
    await page.getByRole('button', { name: links.name }).click();
    await expect(page.getByLabel('Edit Link')).toBeVisible();
    
    await page.locator(`input[value^="${links.name}"]`).click();
    await page.locator(`input[value^="${links.name}"]`).fill(links.updatedName);

    if (isInternalLink) {
        await routesInternalLink.click();
        await page.getByTestId('autocomplete').click({ force: true });
        await page.getByTestId('autocomplete').fill('thank you');
        await page.getByRole('button', { name: 'Thank you Published No' }).click();
    } else {
        await routesExternalLink.click();
        await page.locator('.sc-jdUcAg > div:nth-child(2) > div input[inputmode="url"]').click();
        await page.locator('.sc-jdUcAg > div:nth-child(2) > div input[inputmode="url"]').fill(externalLinkUrl);
        await blankLinkTarget.element.click();
    }
    await page.getByLabel('Close dialog').click();
  }

  await expectDocumentPublished(page);
  await expect(page.getByRole('link', { name: newPageTitle })).toBeVisible();
  
  const pagePromise = page.waitForEvent('popup');
  await page.getByText(`${NEXT_PUBLIC_SITE_URL}`).click({ force: true });
  const openUrlPage = await pagePromise;

  //Fill up form
  for (const input of formFields) {
    await openUrlPage.getByLabel(submitBtnInput).click();
    await expect(openUrlPage.getByPlaceholder(input.updatedName)).toBeFocused();
    await openUrlPage.getByPlaceholder(input.updatedName).click();
    await openUrlPage.getByPlaceholder(input.updatedName).fill(input.input);
  }
  await openUrlPage.getByLabel(submitBtnInput).click({ force: true });
  // await expect(openUrlPage.getByText('Sending form data.')).toBeVisible();
  // await expect(openUrlPage.getByText('✔ Successfully sent form data')).toBeVisible();
  // await openUrlPage.waitForLoadState('networkidle');
  // await expect(openUrlPage.getByText('Success!')).toBeVisible({ timeout: 20000 })
  // const expectedUrl = internalLinkUrl.endsWith('/') ? internalLinkUrl : `${internalLinkUrl}/`;
  // const receivedUrl = openUrlPage.url().endsWith('/') ? openUrlPage.url() : `${openUrlPage.url()}/`;
  // await expect(receivedUrl).toBe(expectedUrl);

  let logoImg;
  isInternalLink ? (logoImg = "Go to /thank-you") : (logoImg = "Go to https://facebook.com/");
  await assertPageContent(openUrlPage, subtitleInput, formNameInput, formFields, formLinks, logoImg, isInternalLink);
}

async function assertPageContent (openUrlPage, subtitleInput, formNameInput, formFields, formLinks, linkName, isInternalLink) {
  await expect(openUrlPage.getByText("Empty Page")).toBeHidden({ timeout: 20000 });
  await expect(openUrlPage.locator('section')).toBeVisible({ timeout: 20000 });

  await expect(openUrlPage.getByLabel(linkName)).toBeVisible();
  await expect(openUrlPage.getByText(subtitleInput)).toBeVisible();
  await expect(openUrlPage.getByRole('heading', { name: formNameInput })).toBeVisible();
  await expect(openUrlPage.getByLabel(signInBtnInput)).toBeVisible();

  for (const input of formFields) {
    await expect(openUrlPage.getByPlaceholder(input.updatedName)).toBeVisible();
    for (const links of formLinks) {
      await expect(openUrlPage.getByLabel(links.updatedName)).toBeVisible();
    }
  }
  
  if (isInternalLink) {
    await openUrlPage.getByRole('link', { name: linkName }).click({ force: true })
    await openUrlPage.waitForLoadState('networkidle');
    await expect(openUrlPage.getByText('Success!')).toBeVisible({ timeout: 20000 })
    const expectedUrl = internalLinkUrl.endsWith('/') ? internalLinkUrl : `${internalLinkUrl}/`;
    const receivedUrl = openUrlPage.url().endsWith('/') ? openUrlPage.url() : `${openUrlPage.url()}/`;
    await expect(receivedUrl).toBe(expectedUrl);
  } else if (!isInternalLink) {
    const page10Promise = openUrlPage.waitForEvent('popup');
    await openUrlPage.getByRole('link', { name: linkName }).click({ force: true });
    const page10 = await page10Promise;
    const normalizedExpectedUrl = externalLinkUrl.replace("https://www.", "https://");
    const normalizedReceivedUrl = page10.url().replace("https://www.", "https://");
    await expect(normalizedReceivedUrl).toBe(normalizedExpectedUrl);
  }
}

async function createSignInSignUpTest(pageTitle, variantLabel, variantIndex, isInternalLink, linkNames) {
  await createSignInSignUpVariant(pageTitle, variantLabel, variantIndex, isInternalLink, linkNames);

  for (const linkName of linkNames) {
    const slug = newPageTitle?.toLowerCase()?.replace(/\s+/g, "-").replace(/-+/g, "-");
    await page.goto(`${NEXT_PUBLIC_SITE_URL}/${slug}`)

    await assertPageContent(page, subtitleInput, formNameInput, formFields, formLinks, linkName, isInternalLink);
  }
}

let linkNames = [signInBtnInput, "Privacy Policy", "Use of Terms"];

const signInSignupVariant = [
  {
    variantName: "Variant A",
    pageTitle: "Sign In Sign Up Variant A",
    variantLabel: "Sign In Sign Up New Page A",
    variantIndex: 0,
    isInternalLink: false,
    linkNames: linkNames
  },
  {
    variantName: "Variant B",
    pageTitle: "Sign In Sign Up Variant B",
    variantLabel: "Sign In Sign Up New Page B",
    variantIndex: 1,
    isInternalLink: true,
    linkNames: linkNames
  },
];

signInSignupVariant.forEach((variant) => {
  test.describe(`${variant.variantName} Workflow`, () => {
    test.describe.configure({ timeout: 900000, mode: "serial" });
  
    test(`Create ${variant.pageTitle}`, async () => {
      await createSignInSignUpTest(variant.pageTitle, variant.variantLabel, variant.variantIndex, variant.isInternalLink, variant.linkNames);
    });
  
    test(`Delete ${variant.pageTitle}`, async () => {
      await deletePageVariant(page, newPageTitle);
    })
  })
})

test.afterAll(async () => {
  await page.close();
});
