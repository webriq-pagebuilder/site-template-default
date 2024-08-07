import {
  contactDetails,
  descriptionField,
  expectDocumentPublished,
  launchPreview,
  socialLinks,
  titleField,
} from "tests/utils";

async function VariantB({
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

  // check site preview
  await expectDocumentPublished(page, pageTitle);
  // Launch preview
  await launchPreview({ page, baseURL, pageTitle });
  // title
  await titleField.sitePreview({ pageUrl: page, commonFieldValues });

  // description
  await descriptionField.sitePreview({
    pageUrl: page,
    commonFieldValues,
  });

  // social links
  await socialLinks.sitePreview({
    pageUrl: page,
    commonFieldValues: commonFieldValues?.socialLinks,
  });

  // contact info
  await contactDetails.sitePreview({
    pageUrl: page,
    commonFieldValues: commonFieldValues?.contactDetails,
  });
}

export default VariantB;
