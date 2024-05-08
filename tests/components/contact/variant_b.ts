import { expectDocumentPublished } from "tests/utils";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";
import {
  titleField,
  descriptionField,
  socialLinks,
  contactDetails,
} from "tests/utils";

async function VariantB({
  newPageTitle,
  page,
  initialValue,
  commonFieldValues,
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
}

export default VariantB;