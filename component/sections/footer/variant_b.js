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

function VariantB({ logo, copyright, socialMedia, menu }) {
  let logoLink;

  if (logo.type === "linkInternal") {
    if (logo.internalLink === undefined) {
      logoLink = `/`; // default to root page when not defined
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
    <section>
      <div className="py-20 bg-gray-50 radius-for-skewed">
        <div className="container mx-auto px-4">
          <div className="pb-12 flex flex-wrap items-center justify-between border-b border-gray-100">
            <div className="w-full lg:w-1/5 mb-12 lg:mb-4 mx-20">
              {logo?.image && (
                <Link href={logoLink}>
                  <a
                    aria-label={
                      logoLink === "/" ? "Go to home page" : `Go to ${logoLink}`
                    }
                    className="inline-block text-3xl font-bold leading-none"
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
            {menu && (
              <div className="w-full lg:w-auto">
                <ul className="mt-8 flex flex-wrap lg:space-x-5 justify-between items-center mx-20">
                  {menu?.map((links, index, { length }) => (
                    <React.Fragment key={links?._key || index}>
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
                              className="lg:text-sm text-gray-500 hover:text-gray-700"
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
                                ? "link-not-found"
                                : links?.externalLink
                            }`}
                            className="lg:text-sm text-gray-500 hover:text-gray-700"
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
                      {index + 1 !== length ? (
                        <li className="hidden md:block">
                          <svg
                            className="mx-4 w-4 h-4 text-gray-500"
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
          <div className="mt-8 flex flex-wrap justify-between items-center mx-20">
            <p className="order-last text-sm text-gray-500">{copyright}</p>
            {socialMedia && (
              <div className="mb-4 lg:mb-0 order-first lg:order-last">
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
      </div>
    </section>
  );
}
export default React.memo(VariantB);
