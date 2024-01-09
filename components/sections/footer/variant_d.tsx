import { urlFor } from "lib/sanity";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { logoLink } from "helper";
import { FooterProps } from ".";
import { ConditionalLink } from "components/ui/ConditionalLink";
import { SocialIcon } from "components/ui/SocialIcons";
import { Socials } from "components/ui/SocialIcons/SocialIcons";

function VariantD({
  logo,
  multipleMenus,
  copyright,
  socialMedia,
  text,
}: FooterProps) {
  return (
    <section className="py-10 overflow-hidden bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="flex flex-wrap -mx-4 space-y-4 lg:space-y-0">
          {(logo?.image || text) && (
            <div className="flex flex-col w-full max-w-2xl p-4 space-y-4 lg:w-1/4">
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
                    className="h-14"
                    src={urlFor(logo?.image)}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    width={132}
                    height={56}
                    alt={logo?.alt ?? "footer-logo"}
                  />
                </Link>
              )}
              {text && <p className="leading-normal text-gray-500">{text}</p>}
            </div>
          )}

          {multipleMenus?.length > 0 && (
            <div className="flex flex-wrap flex-grow p-4 -mx-4 lg:justify-around">
              {multipleMenus?.map((menu) => (
                <div key={menu?._key} className="p-4 w-[200px] flex-none">
                  {menu?.title && (
                    <p className="mb-3 font-bold text-black">{menu?.title}</p>
                  )}
                  {menu?.links?.length > 0 && (
                    <ul className="flex flex-col space-y-2">
                      {menu?.links?.map((link) => (
                        <li key={link?._key}>
                          <ConditionalLink
                            variant="link"
                            link={link}
                            className="text-gray-500 hover:text-gray-700"
                            ariaLabel={link?.label}
                          >
                            {link?.label}
                          </ConditionalLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {socialMedia && (
            <div className="flex w-full p-4 ml-auto lg:justify-end lg:w-1/6">
              {socialMedia?.map(
                (social) =>
                  social?.socialMediaLink && (
                    <span key={social?._key}>
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
                    </span>
                  )
              )}
            </div>
          )}
        </div>
        {copyright && (
          <div className="pt-10">
            <p className="text-sm text-gray-900">{copyright}</p>
          </div>
        )}
      </div>
    </section>
  );
}
export default React.memo(VariantD);
