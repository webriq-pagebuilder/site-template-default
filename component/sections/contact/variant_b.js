import React from "react";
import { urlFor } from "lib/sanity";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";

function VariantB({
  contactDescription,
  officeInformation,
  contactNumber,
  contactEmail,
  socialLinks,
}) {
  return (
    <section>
      <div className="py-20 bg-gray-50 radius-for-skewed">
        <div className="container mx-auto px-4">
          {contactDescription && (
            <div className="mb-16 max-w-md mx-auto text-center">
              <h1 className="mb-5 text-4xl lg:text-5xl font-bold font-heading">
                Contact
              </h1>
              <p className="text-gray-500">{contactDescription}</p>
            </div>
          )}
          <div className="flex flex-wrap -mx-4">
            <div className="mb-8 lg:mb-0 w-full lg:w-1/3 px-4">
              {officeInformation && (
                <div className="p-12 lg:p-20 rounded bg-white shadow text-center">
                  <h2 className="mb-8 lg:mb-20 text-3xl font-bold font-heading">
                    Office
                  </h2>
                  <p className="text-gray-500">{officeInformation}</p>
                </div>
              )}
            </div>
            <div className="mb-8 lg:mb-0 w-full lg:w-1/3 px-4">
              {contactEmail || contactNumber ? (
                <div className="py-12 lg:py-20 rounded bg-white shadow text-center">
                  <h2 className="mb-8 lg:mb-20 text-3xl font-bold font-heading">
                    Contacts
                  </h2>
                  <p className="text-gray-500">{contactEmail}</p>
                  <p className="text-gray-500">{contactNumber}</p>
                </div>
              ) : null}
            </div>
            <div className="w-full lg:w-1/3 px-4 flex items-stretch">
              {socialLinks && (
                <div className="py-12 lg:py-20 w-full rounded bg-white shadow text-center">
                  <h2 className="mb-8 lg:mb-20 text-3xl font-bold font-heading">
                    Socials
                  </h2>
                  <div className="flex justify-center">
                    {socialLinks?.map((social) => (
                      <a
                        aria-label={
                          social?.socialMedia || social?.socialMediaPlatform
                        }
                        className="inline-block mr-4 hover:bg-gray-100 rounded"
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
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default React.memo(VariantB);
