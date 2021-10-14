import React from "react";
import Link from "next/link";
import { urlFor } from "lib/sanity";
import Image from "next/image";

function VariantB({
  template,
  images,
  title,
  description,
  primaryButton,
  secondaryButton,
}) {
  return (
    <>
      <section className="relative bg-gray-50">
        <div className="relative py-12 lg:py-20 z-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap -mx-4">
              <div className="w-full lg:w-1/2 px-4 mb-12 lg:mb-0 flex items-center">
                <div className="w-full text-center lg:text-left xl:text-left 2xl:text-left">
                  <div className="max-w-md mx-auto">
                    <h1 className="mb-3 text-4xl lg:text-5xl font-bold font-heading">
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
                      <p className="mb-6 text-gray-500 leading-loose">
                        {description}
                      </p>
                    )}

                    {primaryButton?.label || secondaryButton?.label ? (
                      <div>
                        {primaryButton?.type === "linkInternal" ? (
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
                              className={`inline-block mb-3 lg:mb-0 lg:mr-3 w-full lg:w-auto py-2 px-6 leading-loose bg-${template.color}-darkblue hover:bg-${template.color}-blue text-white font-semibold rounded-l-xl rounded-t-xl transition duration-200`}
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
                            className={`inline-block mb-3 lg:mb-0 lg:mr-3 w-full lg:w-auto py-2 px-6 leading-loose bg-${template.color}-darkblue hover:bg-${template.color}-blue text-white font-semibold rounded-l-xl rounded-t-xl transition duration-200`}
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
                        )}
                        {secondaryButton?.type === "linkInternal" ? (
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
                              className="inline-block w-full lg:w-auto py-2 px-6 leading-loose font-semibold bg-white hover:bg-gray-50 rounded-l-xl rounded-t-xl transition duration-200"
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
                            className="inline-block w-full lg:w-auto py-2 px-6 leading-loose font-semibold bg-white hover:bg-gray-50 rounded-l-xl rounded-t-xl transition duration-200"
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
                        )}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              {images && (
                <div className="w-full lg:w-1/2 px-4">
                  <div className="flex flex-wrap lg:ml-6 mb-3 md:mb-5 lg:mb-5">
                    {images?.[0] && (
                      <div className="w-1/3 h-full px-2 rounded-3xl overflow-hidden">
                        <Image
                          src={urlFor(images?.[0])}
                          layout="responsive"
                          width="155px"
                          height="235px"
                          objectFit="cover"
                          alt="header-image-1"
                          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                          placeholder="blur"
                        />
                      </div>
                    )}
                    {images?.[1] && (
                      <div className="w-2/3 h-full px-2 rounded-3xl overflow-hidden">
                        <Image
                          src={urlFor(images?.[1])}
                          layout="responsive"
                          width="327px"
                          height="240px"
                          objectFit="cover"
                          alt="header-image-2"
                          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                          placeholder="blur"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap lg:mb-4 lg:mr-6">
                    {images?.[2] && (
                      <div className="w-2/3 h-full px-2 rounded-3xl overflow-hidden">
                        <Image
                          src={urlFor(images?.[2])}
                          layout="responsive"
                          width="327px"
                          height="240px"
                          objectFit="cover"
                          alt="header-image-3"
                          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                          placeholder="blur"
                        />
                      </div>
                    )}
                    {images?.[3] && (
                      <div className="w-1/3 h-full px-2 rounded-3xl overflow-hidden">
                        <Image
                          src={urlFor(images?.[3])}
                          layout="responsive"
                          width="155px"
                          height="235px"
                          objectFit="cover"
                          alt="header-image-4"
                          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                          placeholder="blur"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default React.memo(VariantB);
