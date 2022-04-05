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

function VariantA({ logo, text, contacts, copyright, socialMedia }) {
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
          <div className="flex flex-wrap mb-5 lg:mb-20">
            <div className="mb-5 w-full lg:w-1/5">
              {logo?.image && (
                <Link href={logoLink}>
                  <a
                    aria-label={
                      logoLink === "/" ? "Go to home page" : `Go to ${logoLink}`
                    }
                    className="text-3xl font-bold leading-none"
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
            <div className="mb-5 w-full lg:w-1/5">
              <p className="text-gray-500 leading-loose">{text}</p>
            </div>
            {contacts && (
              <div className="mt-1 w-full lg:w-1/2 ml-auto">
                {contacts.length > 1 ? (
                  <div className="grid grid-cols-3 grid-flow-col gap-10">
                    <p className="mb-4 font-bold">Addresses</p>
                    <p className="mb-4 font-bold">Emails</p>
                    <p className="mb-4 font-bold">Numbers</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 grid-flow-col gap-10">
                    <p className="mb-4 font-bold">Address</p>
                    <p className="mb-4 font-bold">Email</p>
                    <p className="mb-4 font-bold">Number</p>
                  </div>
                )}
                {contacts.map((contact) => (
                  <div
                    className="grid grid-cols-3 grid-flow-col gap-10"
                    key={contact?._key}
                  >
                    <p className="text-gray-500 mb-5">{contact?.addressInfo}</p>
                    <p className="text-gray-500 mb-5">{contact?.emailInfo}</p>
                    <p className="text-gray-500 mb-5">{contact?.contactInfo}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="w-full mx-auto lg:flex justify-between">
            <p className="text-sm text-gray-500 mb-6">{copyright}</p>
            {socialMedia && (
              <div className="flex space-x-2 lg:space-x-4 lg:mx-24">
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
export default React.memo(VariantA);
