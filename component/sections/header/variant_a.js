import React from "react";
import Link from "next/link";
import { urlFor } from "lib/sanity";
import Image from "next/image";
function VariantA({
  template,
  mainImage,
  title,
  description,
  primaryButton,
  secondaryButton,
}) {
  return (
    <section className="skewed-bottom-right">
      <div
        className={`bg-${template.bg}-lightblue pt-12 lg:pt-20 pb-20 radius-for-skewed`}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full lg:w-1/2 px-4 mb-12 md:mb-20 lg:mb-0 flex items-center">
              <div className="w-full text-center lg:text-left xl:text-left 2xl:text-left">
                <div className="max-w-md mx-auto">
                  <h1 className="mb-3 text-2xl md:text-4xl lg:text-5xl font-bold font-heading">
                    {title && (
                      <>
                        <span>{String(title).split("*")[0]}</span>
                        <span className={`text-${template.color}-900`}>
                          {String(title).split("*")[1]}
                        </span>
                      </>
                    )}
                  </h1>
                </div>
                <div className="max-w-md mx-auto">
                  {description && (
                    <p className="my-6 text-xs md:text-base lg:text-base text-gray-500 leading-loose">
                      {description}
                    </p>
                  )}
                  <div>
                    {primaryButton?.label &&
                      (primaryButton?.type === "linkInternal" ? (
                        <Link
                          href={
                            primaryButton?.internalLink === "Home" ||
                            primaryButton?.internalLink === "home"
                              ? "/"
                              : `/${
                                  primaryButton?.internalLink === undefined
                                    ? "page-not-found"
                                    : primaryButton?.internalLink
                                }`
                          }
                        >
                          <a
                            aria-label={`Header ${
                              primaryButton?.label ?? "Primary"
                            } button which directs to ${
                              primaryButton?.internalLink === undefined
                                ? "page-not-found"
                                : primaryButton?.internalLink
                            }`}
                            className={`inline-block mb-3 lg:mb-0 lg:mr-3 w-auto py-2 px-6 leading-loose bg-${template.color}-darkblue hover:bg-${template.color}-blue text-white font-semibold rounded-l-xl rounded-t-xl transition duration-200`}
                            target={primaryButton?.linkTarget}
                            rel={
                              primaryButton?.linkTarget === "_blank"
                                ? "noopener noreferrer"
                                : null
                            }
                          >
                            {primaryButton?.label}
                          </a>
                        </Link>
                      ) : (
                        <a
                          aria-label={`Header ${
                            primaryButton?.label ?? "Primary"
                          } button which directs to ${
                            primaryButton?.externalLink === undefined
                              ? "link-not-found"
                              : primaryButton?.externalLink
                          }`}
                          className={`inline-block mb-3 lg:mb-0 lg:mr-3 w-auto px-4 py-2 md:py-2 md:px-6 lg:py-2 lg:px-6 leading-loose bg-${template.color}-darkblue hover:bg-${template.color}-blue text-white font-semibold rounded-l-xl rounded-t-xl transition duration-200`}
                          target={primaryButton?.linkTarget}
                          href={`${
                            primaryButton?.externalLink === undefined
                              ? "link-not-found"
                              : primaryButton?.externalLink
                          }`}
                          rel={
                            primaryButton?.linkTarget === "_blank"
                              ? "noopener noreferrer"
                              : null
                          }
                        >
                          {primaryButton?.label}
                        </a>
                      ))}
                    {secondaryButton?.label &&
                      (secondaryButton?.type === "linkInternal" ? (
                        <Link
                          href={
                            secondaryButton?.internalLink === "Home" ||
                            secondaryButton?.internalLink === "home"
                              ? "/"
                              : `/${
                                  secondaryButton?.internalLink === undefined
                                    ? "page-not-found"
                                    : secondaryButton?.internalLink
                                }`
                          }
                        >
                          <a
                            aria-label={`Header ${
                              secondaryButton?.label ?? "Secondary"
                            } button which directs to ${
                              secondaryButton?.internalLink === undefined
                                ? "page-not-found"
                                : secondaryButton?.internalLink
                            }`}
                            className="inline-block w-auto py-2 px-6 leading-loose font-semibold bg-white hover:bg-gray-50 rounded-l-xl rounded-t-xl transition duration-200"
                            target={secondaryButton?.linkTarget}
                            rel={
                              secondaryButton?.linkTarget === "_blank"
                                ? "noopener noreferrer"
                                : null
                            }
                          >
                            {secondaryButton?.label}
                          </a>
                        </Link>
                      ) : (
                        <a
                          aria-label={`Header ${
                            secondaryButton?.label ?? "Secondary"
                          } button which directs to ${
                            secondaryButton?.externalLink === undefined
                              ? "link-not-found"
                              : secondaryButton?.externalLink
                          }`}
                          className="inline-block w-auto py-2 px-6 leading-loose font-semibold bg-white hover:bg-gray-50 rounded-l-xl rounded-t-xl transition duration-200"
                          target={secondaryButton?.linkTarget}
                          href={`${
                            secondaryButton?.externalLink === undefined
                              ? "link-not-found"
                              : secondaryButton?.externalLink
                          }`}
                          rel={
                            secondaryButton?.linkTarget === "_blank"
                              ? "noopener noreferrer"
                              : null
                          }
                        >
                          {secondaryButton?.label}
                        </a>
                      ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 px-4 flex items-center justify-center">
              {mainImage && (
                <div className="relative h-128 w-full max-w-md">
                  {mainImage?.image?.asset?._ref && (
                    <div className="rounded-3xl md:rounded-br-none overflow-hidden">
                      <Image
                        src={urlFor(mainImage?.image)}
                        layout="responsive"
                        width="512px"
                        height="512px"
                        objectFit="cover"
                        alt={mainImage?.alt ?? "header-main-image"}
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                        placeholder="blur"
                      />
                    </div>
                  )}
                  <div
                    className="hidden md:block absolute"
                    style={{ top: "-2rem", right: "3rem", zIndex: "-1" }}
                  >
                    <Image
                      src="/assets/elements/webriq-blue-dark-up.png"
                      layout="fixed"
                      width="112px"
                      height="112px"
                      alt="webriq-blue-dark-up-mainImage-element"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                      placeholder="blur"
                    />
                  </div>
                  <div
                    className="hidden md:block absolute"
                    style={{ bottom: "-2rem", right: "-2rem", zIndex: "-1" }}
                  >
                    <Image
                      src="/assets/elements/wing-webriq-blue-down.png"
                      layout="fixed"
                      width="144px"
                      height="144px"
                      alt="wing-webriq-blue-down-mainImage-element"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                      placeholder="blur"
                    />
                  </div>
                  <div
                    className="hidden md:block absolute"
                    style={{ top: "3rem", right: "-3rem", zIndex: "-1" }}
                  >
                    <Image
                      src="/assets/elements/bullets-gray-right.svg"
                      layout="fixed"
                      width="115px"
                      height="157px"
                      alt="bullets-gray-right-mainImage-element"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                      placeholder="blur"
                    />
                  </div>
                  <div
                    className="hidden md:block absolute"
                    style={{
                      bottom: "2.5rem",
                      left: "-4.5rem",
                      zIndex: "-1",
                    }}
                  >
                    <Image
                      src="/assets/elements/bullets-gray-left.svg"
                      layout="fixed"
                      width="157px"
                      height="115px"
                      alt="bullets-gray-left-mainImage-element"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                      placeholder="blur"
                    />
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
export default React.memo(VariantA);
