import React from "react";
import { urlFor } from "lib/sanity";
import Image from "next/image";
import { ContactProps } from ".";
import { Form } from "components/ui/Form/Form";
import { Card } from "components/ui/Card";
import { SocialIcon } from "components/ui/SocialIcons";
import { Socials } from "components/ui/SocialIcons/SocialIcons";

function VariantB({
  contactDescription,
  officeInformation,
  contactNumber,
  contactEmail,
  socialLinks,
}: ContactProps) {
  return (
    <section>
      <div className="py-20 radius-for-skewed bg-gray-50">
        <div className="container px-4 mx-auto">
          {contactDescription && (
            <div className="max-w-md mx-auto mb-16 text-center">
              <h1 className="mb-5 text-4xl font-bold font-heading lg:text-5xl">
                Contact
              </h1>
              <p className="text-gray-500">{contactDescription}</p>
            </div>
          )}
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4 mb-8 lg:mb-0 lg:w-1/3">
              {officeInformation && (
                <Card className="p-12 text-center lg:p-20">
                  <h2 className="mb-8 text-3xl font-bold font-heading lg:mb-20">
                    Office
                  </h2>
                  <p className="text-gray-500">{officeInformation}</p>
                </Card>
              )}
            </div>
            <div className="w-full px-4 mb-8 lg:mb-0 lg:w-1/3">
              {contactEmail || contactNumber ? (
                <Card className="py-12 text-center lg:py-20">
                  <h2 className="mb-8 text-3xl font-bold font-heading lg:mb-20">
                    Contacts
                  </h2>
                  <p className="text-gray-500">{contactEmail}</p>
                  <p className="text-gray-500">{contactNumber}</p>
                </Card>
              ) : null}
            </div>
            <div className="flex items-stretch w-full px-4 lg:w-1/3">
              {socialLinks && (
                <Card className="w-full py-12 text-center lg:py-20">
                  <h2 className="mb-8 text-3xl font-bold font-heading lg:mb-20">
                    Socials
                  </h2>
                  <div className="flex justify-center">
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
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default React.memo(VariantB);
