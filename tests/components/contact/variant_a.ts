import { expectDocumentPublished } from "tests/utils";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";
import { contactInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";
import {
  titleField,
  descriptionField,
  contactDetails,
  socialLinks,
} from "tests/utils";
import { form } from "./index.spec";

async function VariantA({ newPageTitle, page, commonFieldValues }) {
  // studio
  await titleField.checkAndAddValue({
    page,
    initialValue: contactInitialValue,
    commonFieldValues,
  });

  await descriptionField.checkAndAddValue({
    page,
    initialValue: contactInitialValue?.contactDescription,
    placeholder: contactInitialValue?.contactDescription,
    commonFieldValues,
  });

  await contactDetails.officeInput({
    page,
    initialValue: contactInitialValue,
    commonFieldValues,
  });
  await contactDetails.emailInput({
    page,
    initialValue: contactInitialValue,
    commonFieldValues,
  });
  await contactDetails.numberInfo({
    page,
    initialValue: contactInitialValue,
    commonFieldValues,
  });

  // forms
  await form.addFormFields({
    page,
    initialValue: contactInitialValue,
    commonFieldValues,
  });

  // check site preview
  await expectDocumentPublished(page, newPageTitle);
  const pagePromise = page.waitForEvent("popup");
  await page.getByText(`${NEXT_PUBLIC_SITE_URL}`).click({ force: true });
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

  // forms
  await form.sitePreview({ page, pageUrl: openUrlPage, commonFieldValues });
}

export default VariantA;
