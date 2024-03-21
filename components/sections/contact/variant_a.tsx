import { PortableTextComponents } from "@portabletext/react";
import { thankYouPageLink } from "helper";
import { PortableText } from "lib/sanity";
import React from "react";

import { Container, Flex } from "components/layout/index";
import {
  Button,
  Form,
  FormField,
  Heading,
  SocialIcon,
  Text,
} from "components/ui";

import { ContactProps } from ".";
import { Socials } from "components/ui/SocialIcons/SocialIcons";

function VariantA({
  contactDescription,
  officeInformation,
  contactEmail,
  contactNumber,
  socialLinks,
  form,
  block,
}: ContactProps) {
  const [value, setValue] = React.useState(null); // setting selected value for input field radio type
  const [checked, setChecked] = React.useState([]); // setting selected value for input field checkbox type
  const [filename, setFilename] = React.useState(null); // setting input field filename

  // block styling as props to `components` of the PortableText component
  const blockCustomization: PortableTextComponents = {
    marks: {
      internalLink: ({ children, value }) => (
        <a
          aria-label={value.href ?? "internal link"}
          style={{ color: "red" }}
          href={value.slug.current}
        >
          {children}
        </a>
      ),
      link: ({ children, value }) =>
        value.blank ? (
          <a
            aria-label={value.href ?? "external link"}
            href={value.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        ) : (
          <a
            aria-label={value.href ?? "external link"}
            style={{ color: "blue" }}
            href={value.href}
          >
            {children}
          </a>
        ),
    },
  };

  const handleRadioChange = (e) => {
    setValue(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    const { checked, value } = e.target;

    setChecked((prev) =>
      checked ? [...prev, value] : prev.filter((v) => v !== value)
    );
  };

  const handleShowFileName = (e) => {
    if (e.target.files.length > 0) {
      setFilename(e.target.files[0].name);
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <Flex className="flex-col lg:flex-row" gap={8} justify="between">
          <Flex direction="col" className="px-10 w-full basis-1/2" gap={8}>
            {contactDescription && (
              <div>
                <Heading>Contact</Heading>
                <Text muted className="mt-5 leading-loose text-gray-700">
                  {contactDescription}
                </Text>
              </div>
            )}
            {officeInformation && (
              <Flex
                gap={8}
                justify="between"
                className="flex-col w-full md:flex-row"
              >
                <div>
                  <Heading type="h2">{"Office"}</Heading>
                  <Text className="mt-3" muted>
                    {officeInformation}
                  </Text>
                </div>
                <div>
                  <Heading type="h2">{"Contacts"}</Heading>
                  <Text className="my-3" muted>
                    {contactEmail && (
                      <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
                    )}
                  </Text>
                  <Text muted>
                    {contactNumber && (
                      <a href={`tel:${contactNumber}`}>{contactNumber}</a>
                    )}
                  </Text>
                </div>
              </Flex>
            )}
            {socialLinks && (
              <div className="w-full md:w-1/3 lg:w-full">
                <Heading type="h2" className="mb-2">
                  Socials
                </Heading>
                <Flex gap={4}>
                  {socialLinks?.map((social) => (
                    <a
                      aria-label={
                        social?.socialMedia || social?.socialMediaPlatform
                      }
                      className="inline-block mr-4 rounded hover:bg-gray-100"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={social?.socialMediaLink}
                      key={social?._key}
                    >
                      {social?.socialMediaLink && (
                        <SocialIcon social={social.socialMedia as Socials} />
                      )}
                    </a>
                  ))}
                </Flex>
              </div>
            )}
          </Flex>

          <div className="w-full px-5 sm:px-10 lg:w-1/2 lg:px-0 lg:pl-10 lg:pt-10">
            {form?.fields && (
              <Form
                id={form?.id}
                name="Contact-VariantA-Form"
                className="lg:mx-auto lg:max-w-md space-y-3 text-xs font-semibold"
                thankyouPage={thankYouPageLink(form?.thankYouPage)}
              >
                {form?.fields?.map((formFields, index) => (
                  <div key={index}>
                    {formFields?.type === "inputCheckbox" ? (
                      <FormField
                        noLabel
                        name={formFields?.name}
                        placeholder={formFields?.placeholder}
                        required={formFields?.isRequired}
                        {...formFields}
                      />
                    ) : (
                      <FormField
                        noLabel
                        variant="primary"
                        name={formFields?.name}
                        placeholder={formFields?.name}
                        required={formFields?.isRequired}
                        {...formFields}
                      />
                    )}
                  </div>
                ))}
                <div className="items-center sm:flex sm:justify-between">
                  {block && (
                    <div className="inline-flex mt-2">
                      <input
                        aria-label="Agree to terms"
                        className="mt-1 mr-2"
                        type="checkbox"
                        id="terms"
                        name="terms"
                        defaultValue={1}
                        required
                      />
                      <span className="text-sm font-semibold">
                        <PortableText
                          value={block}
                          components={blockCustomization}
                          onMissingComponent={false} // Disabling warnings / handling unknown types
                        />
                      </span>
                    </div>
                  )}
                  <div>
                    <div className="webriq-recaptcha" />
                  </div>
                  {form?.buttonLabel && (
                    <Button
                      as="button"
                      ariaLabel={
                        form?.buttonLabel ?? "Contact form submit button"
                      }
                      className="inline-block px-6 py-2 mt-5 font-bold leading-loose text-white transition duration-200 rounded-l-xl rounded-t-xl bg-primary hover:bg-primary-foreground sm:mt-0"
                      type="submit"
                    >
                      {form?.buttonLabel}
                    </Button>
                  )}
                </div>
              </Form>
            )}
          </div>
        </Flex>
      </Container>
    </section>
  );
}
export default React.memo(VariantA);
