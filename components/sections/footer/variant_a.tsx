import { urlFor } from "lib/sanity";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { logoLink } from "helper";

import { FooterProps } from ".";
import { SocialIcon } from "components/ui/SocialIcons";
import { Socials } from "components/ui/SocialIcons/SocialIcons";

function VariantA({
  logo,
  text,
  contacts,
  copyright,
  socialMedia,
}: FooterProps) {
  return (
    <section>
      <div className="py-20 radius-for-skewed bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap mb-5 lg:mb-20">
            <div className="w-full mb-5 lg:w-1/5">
              {logo?.image && (
                <Link
                  aria-label={
                    logoLink(logo) === "/"
                      ? "Go to home page"
                      : `Go to ${logoLink(logo)}`
                  }
                  className="text-3xl font-bold leading-none"
                  href={logoLink(logo)}
                >
                  <Image
                    className="h-14"
                    src={urlFor(logo?.image)}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    width={132}
                    height={56}
                    alt={logo?.alt ?? "footer-logo"}
                  />
                </Link>
              )}
            </div>
            <div className="w-full mb-5 lg:w-1/5">
              <p className="leading-loose text-gray-500">{text}</p>
            </div>
            {contacts && (
              <div className="hidden w-full mt-1 ml-auto sm:block lg:w-1/2">
                {contacts?.length > 1 ? (
                  <div className="grid grid-flow-col grid-cols-3 gap-10">
                    <p className="mb-4 font-bold">Addresses</p>
                    <p className="mb-4 font-bold">Emails</p>
                    <p className="mb-4 font-bold">Numbers</p>
                  </div>
                ) : (
                  <div className="grid grid-flow-col grid-cols-3 gap-10">
                    <p className="mb-4 font-bold">Address</p>
                    <p className="mb-4 font-bold">Email</p>
                    <p className="mb-4 font-bold">Number</p>
                  </div>
                )}
                {contacts?.map((contact) => (
                  <div
                    className="grid grid-flow-col grid-cols-3 gap-10"
                    key={contact?._key}
                  >
                    <p className="mb-5 text-gray-500">{contact?.addressInfo}</p>
                    <p className="mb-5 text-gray-500">{contact?.emailInfo}</p>
                    <p className="mb-5 text-gray-500">{contact?.contactInfo}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="justify-between w-full mx-auto lg:flex">
            <p className="mb-6 text-sm text-gray-500">{copyright}</p>
            {socialMedia && (
              <div className="flex flex-wrap space-x-2 lg:mx-24 lg:space-x-4">
                {socialMedia?.map(
                  (social) =>
                    social?.socialMediaLink && (
                      <a
                        aria-label={
                          social?.socialMedia || social?.socialMediaPlatform
                        }
                        className="inline-block p-2 mr-2 rounded bg-gray-50 hover:bg-gray-100"
                        target="_blank"
                        rel="noopener noreferrer"
                        href={social?.socialMediaLink}
                        key={social?._key}
                      >
                        {social?.socialMediaIcon?.image ? (
                          <Image
                            className="h-6"
                            src={urlFor(social?.socialMediaIcon?.image)}
                            quality={100}
                            width={24}
                            height={24}
                            alt={
                              social?.socialMediaIcon?.alt ??
                              "contact-socialMedia-icon"
                            }
                          />
                        ) : (
                          <SocialIcon social={social?.socialMedia as Socials} />
                        )}
                      </a>
                    )
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantA);
