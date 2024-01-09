import { urlFor } from "lib/sanity";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { logoLink } from "helper";

import { FooterProps } from ".";
import { SocialIcon } from "components/ui/SocialIcons";
import { Socials } from "components/ui/SocialIcons/SocialIcons";
import { ConditionalLink } from "components/ui/ConditionalLink";

function VariantB({ logo, copyright, socialMedia, menu }: FooterProps) {
  return (
    <section>
      <div className="py-20 radius-for-skewed bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap items-center justify-between pb-12 border-b border-gray-100">
            <div className="w-full mx-20 mb-12 lg:mb-4 lg:w-1/5">
              {logo?.image && (
                <Link
                  aria-label={
                    logoLink(logo) === "/"
                      ? "Go to home page"
                      : `Go to ${logoLink(logo)}`
                  }
                  className="inline-block text-3xl font-bold leading-none"
                  href={logoLink(logo)}
                >
                  <Image
                    className="h-14"
                    src={urlFor(logo?.image)}
                    width={132}
                    height={56}
                    alt={logo?.alt ?? "footer-logo"}
                  />
                </Link>
              )}
            </div>
            {menu && (
              <div className="w-full lg:w-auto">
                <ul className="flex flex-wrap items-center justify-between mx-20 mt-8 lg:space-x-5">
                  {menu?.map((links, index, { length }) => (
                    <React.Fragment key={links?._key || index}>
                      <li className="w-full mb-2 md:mb-0 md:w-auto" key={index}>
                        <ConditionalLink
                          variant="link"
                          link={links}
                          className="text-gray-500 lg:text-sm hover:text-gray-700"
                          ariaLabel={links?.label}
                        >
                          {links?.label}
                        </ConditionalLink>
                      </li>
                      {index + 1 !== length ? (
                        <li className="hidden md:block">
                          <svg
                            className="w-4 h-4 mx-4 text-gray-500"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                            ></path>
                          </svg>
                        </li>
                      ) : null}
                    </React.Fragment>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="flex flex-wrap items-center justify-between mx-20 mt-8">
            <p className="order-last text-sm text-gray-500">{copyright}</p>
            {socialMedia && (
              <div className="order-first mb-4 lg:order-last lg:mb-0">
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
export default React.memo(VariantB);
