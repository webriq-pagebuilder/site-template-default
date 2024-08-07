import {
  contactDetails,
  descriptionField,
  expectDocumentPublished,
  launchPreview,
  socialLinks,
  titleField,
} from "tests/utils";

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

  // 05-03-2024 defer tests for forms
  // await form.contactSitePreview({
  //   page,
  //   pageUrl: page,
  //   commonFieldValues,
  // });
}

export default VariantA;
