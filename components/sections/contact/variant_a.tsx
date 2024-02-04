import React from "react";
import Image from "next/image";
import WebriQForm from "components/webriq-form";
import { PortableText, urlFor } from "lib/sanity";
import { thankYouPageLink } from "helper";
import { PortableTextComponents } from "@portabletext/react";

import { ContactProps } from ".";
import { Form } from "components/ui/Form/Form";
import { FormField } from "components/ui/FormField";
import { Button } from "components/ui/Button";
import { Container } from "components/layout/Container";
import { Heading } from "components/ui/Heading";
import { Text } from "components/ui/Text";
import { Flex } from "components/layout/Flex/Flex";
import { SocialIcon } from "components/ui/SocialIcons";
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
          <Flex direction="col" className="w-full basis-1/2" gap={8}>
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
                  <Text muted>{officeInformation}</Text>
                </div>
                <div>
                  <Heading type="h2">{"Contacts"}</Heading>
                  <Text muted>{contactEmail}</Text>
                  <Text muted>{contactNumber}</Text>
                </div>
              </Flex>
            )}
            {socialLinks && (
              <div className="w-full md:w-1/3 lg:w-full">
                <Heading type="h2" className="mb-2">
                  Socials
                </Heading>
                <Flex gap={4}>
                  {socialLinks?.map(
                    (social) =>
                      social?.socialMediaLink && (
                        <SocialIcon social={social.socialMedia as Socials} />
                      )
                  )}
                </Flex>
              </div>
            )}
          </Flex>

          {form?.fields && (
            <Form
              id={form?.id}
              name="Contact-VariantA-Form"
              className="space-y-3 form-contacts"
              thankyouPage={thankYouPageLink(form?.thankYouPage)}
            >
              {form?.fields?.map((formFields, index) => (
                <div key={index}>
                  {formFields?.type === "inputCheckbox" ? (
                    <FormField
                      {...formFields}
                      name={formFields?.name}
                      noLabel
                    />
                  ) : (
                    <FormField
                      {...formFields}
                      name={formFields?.name}
                      noLabel
                      variant="primary"
                    />
                  )}
                </div>
              ))}
              <div className="items-center sm:flex sm:justify-between">
                {block && (
                  <div className="inline-flex">
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
                      />
                    </span>
                  </div>
                )}
                <div>
                  <div className="webriq-recaptcha" />
                </div>
                {form?.buttonLabel && (
                  <Button
                    asLink={false}
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
        </Flex>
      </Container>
    </section>
  );
}
export default React.memo(VariantA);
