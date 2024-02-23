import { Socials } from "components/ui/SocialIcons/SocialIcons";
import { urlFor } from "lib/sanity";
import Image from "next/image";
import React from "react";
import { ContactProps } from ".";

import { Text, Heading, Card, SocialIcon } from "components/ui";
import { Flex, Container } from "components/layout/index";

function VariantB({
  contactDescription,
  officeInformation,
  contactNumber,
  contactEmail,
  socialLinks,
}: ContactProps) {
  return (
    <section className="py-20 bg-gray-50">
      <Container>
        {contactDescription && (
          <div className="mb-16 text-center">
            <Heading>Contact</Heading>
            <Text muted>{contactDescription}</Text>
          </div>
        )}
        <Container maxWidth={960}>
          <Flex
            className="flex-col lg:flex-row"
            gap={8}
            justify="between"
            align="stretch"
          >
            {officeInformation && (
              <Card className="w-full p-12 text-center bg-white md:p-16 lg:p-20">
                <Heading type="h2" className="mb-16">
                  Office
                </Heading>
                <Text muted>{officeInformation}</Text>
              </Card>
            )}

            {(contactEmail || contactNumber) && (
              <Card className="w-full p-12 bg-white md:p-16 lg:p-20text-center">
                <Heading type="h2" className="mb-16 ">
                  Contacts
                </Heading>
                {contactEmail && <Text muted>{contactEmail}</Text>}
                {contactNumber && <Text muted>{contactNumber}</Text>}
              </Card>
            )}

            {socialLinks && (
              <Card className="w-full p-12 text-center bg-white md:p-16 lg:p-20">
                <Heading className="mb-16" type="h2">
                  Socials
                </Heading>
                <Flex justify="center">
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
                      {social?.socialMediaIcon?.image ? (
                        <Image
                          src={urlFor(social?.socialMediaIcon?.image)}
                          width={24}
                          height={24}
                          alt={
                            social?.socialMediaIcon?.alt ??
                            "contact-socialMedia-icon"
                          }
                        />
                      ) : (
                        <SocialIcon social={social.socialMedia as Socials} />
                      )}
                    </a>
                  ))}
                </Flex>
              </Card>
            )}
          </Flex>
        </Container>
      </Container>
    </section>
  );
}

export default React.memo(VariantB);
