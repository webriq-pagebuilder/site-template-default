import { urlFor } from "lib/sanity";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { logoLink } from "helper";
import { FooterProps } from ".";
import { ConditionalLink } from "components/ui/ConditionalLink";
import { SocialIcon } from "components/ui/SocialIcons";
import { Socials } from "components/ui/SocialIcons/SocialIcons";

function VariantC({ logo, menu, copyright, socialMedia }: FooterProps) {
  return (
    <section className="bg-gray-50">
      <div className="flex w-full">
        <div className="flex w-1/3">
          <div className="w-1/3 py-1 bg-brand-secondary" />
          <div className="w-1/3 py-1 bg-brand-primary-foreground" />
          <div className="w-1/3 py-1 bg-brand-primary" />
        </div>
        <div className="flex w-1/3">
          <div className="w-1/3 py-1 bg-brand-secondary" />
          <div className="w-1/3 py-1 bg-brand-primary-foreground" />
          <div className="w-1/3 py-1 bg-brand-primary" />
        </div>
        <div className="flex w-1/3">
          <div className="w-1/3 py-1 bg-brand-secondary" />
          <div className="w-1/3 py-1 bg-brand-primary-foreground" />
          <div className="w-1/3 py-1 bg-brand-primary" />
        </div>
      </div>
      <div className="container px-4 mx-auto">
        <div className="pt-10 pb-12">
          <div className="relative flex flex-wrap mb-8 lg:border-b lg:border-gray-300 lg:pb-8">
            <p className="order-last w-full text-sm text-center text-gray-900 lg:order-first lg:w-auto lg:text-left">
              {copyright}
            </p>
            {menu && (
              <div className="mx-auto mb-6 lg:absolute lg:left-1/2 lg:mb-0 lg:-translate-x-1/2 lg:transform">
                <ul className="flex flex-wrap items-center justify-between mx-20 lg:space-x-5">
                  {menu?.map((links, index) => (
                    <li className="w-full mb-2 md:mb-0 md:w-auto" key={index}>
                      <ConditionalLink
                        variant="link"
                        link={links}
                        className="mr-6 text-sm hover:text-gray-500"
                        ariaLabel={links?.label}
                      >
                        {links?.label}
                      </ConditionalLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="order-first w-full mb-12 text-center lg:order-last lg:mb-0 lg:ml-auto lg:w-auto lg:text-left">
              {logo?.image && (
                <Link
                  className="inline-block text-xl font-bold leading-none"
                  aria-label={
                    logoLink(logo) === "/"
                      ? "Go to home page"
                      : `Go to ${logoLink(logo)}`
                  }
                  href={logoLink(logo)}
                >
                  <Image
                    src={urlFor(logo?.image)}
                    alt={logo?.alt ?? "footer-logo"}
                    height={64}
                    width={64}
                    quality={100}
                  />
                </Link>
              )}
            </div>
          </div>
          {socialMedia && (
            <div className="flex flex-wrap justify-center space-y-2 sm:space-y-0">
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
                          src={urlFor(social?.socialMediaIcon?.image)}
                          width={24}
                          height={24}
                          alt={
                            social?.socialMediaIcon?.alt ??
                            "footer-socialMedia-icon"
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
    </section>
  );
}
export default React.memo(VariantC);
