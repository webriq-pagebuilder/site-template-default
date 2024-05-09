import { expectDocumentPublished } from "tests/utils";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";
import {
  titleField,
  descriptionField,
  contactDetails,
  socialLinks,
} from "tests/utils";
import { form } from "./index.spec";
import { expect } from "@playwright/test";

async function VariantA({
  pageTitle,
  page,
  initialValue,
  commonFieldValues,
  baseURL,
}) {
  // studio
  await titleField.checkAndAddValue({
    page,
    initialValue,
    commonFieldValues,
  });

  await descriptionField.checkAndAddValue({
    page,
    initialValue,
    placeholder: initialValue.description,
    commonFieldValues,
  });

  await socialLinks.checkAndAddValues({
    page,
    initialValue,
    commonFieldValues: commonFieldValues?.socialLinks,
  });

  await contactDetails.officeInput({
    page,
    initialValue,
    commonFieldValues: commonFieldValues?.contactDetails,
  });
  await contactDetails.emailInput({
    page,
    initialValue,
    commonFieldValues: commonFieldValues?.contactDetails,
  });
  await contactDetails.numberInfo({
    page,
    initialValue,
    commonFieldValues: commonFieldValues?.contactDetails,
  });

  // 05-03-2024 defer tests for forms
  // await form.addContactFormFields({
  //   page,
  //   initialValue,
  //   commonFieldValues,
  // });

  // check site preview
  await expectDocumentPublished(page, pageTitle);
  await expect(page.getByText(`${baseURL}`)).toBeVisible();

  const pagePromise = page.waitForEvent("popup");
  await page.getByText(baseURL).click({ force: true });
  const openUrlPage = await pagePromise;

  // title
  await titleField.sitePreview({ pageUrl: openUrlPage, commonFieldValues });

  // description
  await descriptionField.sitePreview({
    pageUrl: openUrlPage,
    commonFieldValues,
  });

  // social links
  await socialLinks.sitePreview({
    pageUrl: openUrlPage,
    commonFieldValues: commonFieldValues?.socialLinks,
  });

  // contact info
  await contactDetails.sitePreview({
    pageUrl: openUrlPage,
    commonFieldValues: commonFieldValues?.contactDetails,
  });

  // 05-03-2024 defer tests for forms
  // await form.contactSitePreview({
  //   page,
  //   pageUrl: openUrlPage,
  //   commonFieldValues,
  // });
}

export default VariantA;
