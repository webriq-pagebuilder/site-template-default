import React from "react";
import { urlFor } from "lib/sanity";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";

function VariantC({ logo, menu, copyright, socialMedia }) {
  let logoLink;

  if (logo.type === "linkInternal") {
    if (logo.internalLink === undefined) {
      logoLink = `/`;
    } else {
      if (logo.internalLink === "Home" || logo.internalLink === "home") {
        logoLink = `/`;
      } else {
        logoLink = `/${logo.internalLink}`;
      }
    }
  } else {
    if (logo.externalLink === undefined) {
      logoLink = `/`;
    } else {
      logoLink = logo.externalLink;
    }
  }

  return (
    <section className="bg-gray-50">
      <div className="flex w-full">
        <div className="w-1/3 flex">
          <div className="w-1/3 py-1 bg-webriq-babyblue" />
          <div className="w-1/3 py-1 bg-webriq-blue" />
          <div className="w-1/3 py-1 bg-webriq-darkblue" />
        </div>
        <div className="w-1/3 flex">
          <div className="w-1/3 py-1 bg-webriq-babyblue" />
          <div className="w-1/3 py-1 bg-webriq-blue" />
          <div className="w-1/3 py-1 bg-webriq-darkblue" />
        </div>
        <div className="w-1/3 flex">
          <div className="w-1/3 py-1 bg-webriq-babyblue" />
          <div className="w-1/3 py-1 bg-webriq-blue" />
          <div className="w-1/3 py-1 bg-webriq-darkblue" />
        </div>
      </div>
      <div className="container mx-auto px-4">
        <div className="pt-10 pb-12">
          <div className="relative lg:pb-8 mb-8 flex flex-wrap lg:border-b lg:border-gray-300">
            <p className="w-full lg:w-auto text-gray-900 text-sm text-center lg:text-left order-last lg:order-first">
              {copyright}
            </p>
            {menu && (
              <div className="lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 mb-6 lg:mb-0 mx-auto">
                <ul className="flex flex-wrap lg:space-x-5 justify-between items-center mx-20">
                  {menu?.map((links, index) => (
                    <li className="w-full md:w-auto mb-2 md:mb-0" key={index}>
                      {links?.type === "linkInternal" ? (
                        <Link
                          href={
                            links?.internalLink === "Home" ||
                            links?.internalLink === "home"
                              ? "/"
                              : `/${
                                  links?.internalLink === undefined
                                    ? "page-not-found"
                                    : links?.internalLink
                                }`
                          }
                        >
                          <a
                            aria-label={`Footer ${
                              links?.label ?? "Menu"
                            } links which directs to ${
                              links?.internalLink === undefined
                                ? "page-not-found"
                                : links?.internalLink
                            }`}
                            className="mr-6 text-sm hover:text-gray-500"
                            target={links?.linkTarget}
                            rel={
                              links?.linkTarget === "_blank"
                                ? "noopener noreferrer"
                                : null
                            }
                          >
                            {links?.label}
                          </a>
                        </Link>
                      ) : (
                        <a
                          aria-label={`Footer ${
                            links?.label ?? "Menu"
                          } links which directs to ${
                            links?.externalLink === undefined
                              ? "page-not-found"
                              : links?.externalLink
                          }`}
                          className="mr-6 text-sm hover:text-gray-500"
                          target={links?.linkTarget}
                          rel={
                            links?.linkTarget === "_blank"
                              ? "noopener noreferrer"
                              : null
                          }
                          href={`${
                            links?.externalLink === undefined
                              ? "link-not-found"
                              : links?.externalLink
                          }`}
                        >
                          {links?.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="mb-12 lg:mb-0 lg:ml-auto w-full lg:w-auto order-first lg:order-last text-center lg:text-left">
              {logo?.image && (
                <Link href={logoLink}>
                  <a
                    aria-label={
                      logoLink === "/" ? "Go to home page" : `Go to ${logoLink}`
                    }
                    className="inline-block text-xl font-bold leading-none"
                  >
                    <img
                      className="h-14"
                      src={urlFor(logo?.image)}
                      alt={logo?.alt ?? "footer-logo"}
                    />
                  </a>
                </Link>
              )}
            </div>
          </div>
          {socialMedia && (
            <div className="flex justify-center">
              {socialMedia?.map(
                (social) =>
                  social?.socialMediaLink && (
                    <a
                      aria-label={
                        social?.socialMedia || social?.socialMediaPlatform
                      }
                      className="inline-block mr-2 p-2 bg-gray-50 hover:bg-gray-100 rounded"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={social?.socialMediaLink}
                      key={social?._key}
                    >
                      {social?.socialMedia === "facebook" ? (
                        <FaFacebookF
                          style={{
                            color: "#0045d8",
                            height: "24px",
                            width: "24px",
                          }}
                        />
                      ) : social?.socialMedia === "twitter" ? (
                        <FaTwitter
                          style={{
                            color: "#0045d8",
                            height: "24px",
                            width: "24px",
                          }}
                        />
                      ) : social?.socialMedia === "instagram" ? (
                        <FaInstagram
                          style={{
                            color: "#0045d8",
                            height: "24px",
                            width: "24px",
                          }}
                        />
                      ) : social?.socialMedia === "linkedin" ? (
                        <FaLinkedinIn
                          style={{
                            color: "#0045d8",
                            height: "24px",
                            width: "24px",
                          }}
                        />
                      ) : social?.socialMedia === "youtube" ? (
                        <FaYoutube
                          style={{
                            color: "#0045d8",
                            height: "24px",
                            width: "24px",
                          }}
                        />
                      ) : social?.socialMedia === "tiktok" ? (
                        <FaTiktok
                          style={{
                            color: "#0045d8",
                            height: "24px",
                            width: "24px",
                          }}
                        />
                      ) : (
                        social?.socialMediaIcon?.image && (
                          <img
                            className="h-6 w-auto"
                            src={urlFor(social?.socialMediaIcon?.image)}
                            alt={
                              social?.socialMediaIcon?.alt ??
                              "contact-socialMedia-icon"
                            }
                          />
                        )
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
