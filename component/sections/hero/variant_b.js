import React from "react";
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

                    <div>
                      {primaryButton && (
                        <a
                          aria-label={`Header ${
                            primaryButton?.label ?? "Primary"
                          } button which directs to ${
                            primaryButton?.type === "linkExternal"
                              ? primaryButton?.externalLink
                              : primaryButton?.type === "linkInternal"
                              ? primaryButton?.internalLink
                              : "not found"
                          } page`}
                          className="inline-block mb-3 lg:mb-0 lg:mr-3 w-full lg:w-auto py-2 px-6 leading-loose bg-webriq-darkblue hover:bg-webriq-blue text-white font-semibold rounded-l-xl rounded-t-xl transition duration-200"
                          target={primaryButton?.linkTarget}
                          rel={
                            primaryButton?.linkTarget === "_blank"
                              ? "noopener noreferrer"
                              : null
                          }
                          href={
                            primaryButton.type === "linkInternal"
                              ? primaryButton.internalLink === "Home" ||
                                primaryButton.internalLink === "home"
                                ? "/"
                                : primaryButton.internalLink
                              : primaryButton.externalLink
                          }
                        >
                          {primaryButton.label}
                        </a>
                      )}
                      {secondaryButton && (
                        <a
                          aria-label={`Header ${
                            secondaryButton?.label ?? "Secondary"
                          } button which directs to ${
                            secondaryButton?.type === "linkExternal"
                              ? secondaryButton?.externalLink
                              : secondaryButton?.type === "linkInternal"
                              ? secondaryButton?.internalLink
                              : "not found"
                          } page`}
                          className="inline-block w-full lg:w-auto py-2 px-6 leading-loose font-semibold bg-white hover:bg-gray-50 rounded-l-xl rounded-t-xl transition duration-200"
                          target={secondaryButton?.linkTarget}
                          rel={
                            secondaryButton?.linkTarget === "_blank"
                              ? "noopener noreferrer"
                              : null
                          }
                          href={
                            secondaryButton.type === "linkInternal"
                              ? secondaryButton.internalLink === "Home" ||
                                secondaryButton.internalLink === "home"
                                ? "/"
                                : secondaryButton.internalLink
                              : secondaryButton.externalLink
                          }
                        >
                          {secondaryButton.label}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {images && (
                <div className="w-full lg:w-1/2 px-4">
                  <div className="flex flex-wrap lg:ml-6 mb-3 md:mb-5 lg:mb-5">
                    {images?.[0] && (
                      <div className="w-1/3 h-full px-2 rounded-3xl">
                        <Image
                          src={urlFor(images?.[0]).url()}
                          layout="responsive"
                          width="155px"
                          height="235px"
                          objectFit="cover"
                          alt="header-image-1"
                        />
                      </div>
                    )}
                    {images?.[1] && (
                      <div className="w-2/3 h-full px-2 rounded-3xl">
                        <Image
                          src={urlFor(images?.[1]).url()}
                          layout="responsive"
                          width="327px"
                          height="240px"
                          objectFit="cover"
                          alt="header-image-2"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap lg:mb-4 lg:mr-6">
                    {images?.[2] && (
                      <div className="w-2/3 h-full px-2 rounded-3xl">
                        <Image
                          src={urlFor(images?.[2]).url()}
                          layout="responsive"
                          width="327px"
                          height="240px"
                          objectFit="cover"
                          alt="header-image-3"
                        />
                      </div>
                    )}
                    {images?.[3] && (
                      <div className="w-1/3 h-full px-2 rounded-3xl">
                        <Image
                          src={urlFor(images?.[3]).url()}
                          layout="responsive"
                          width="155px"
                          height="235px"
                          objectFit="cover"
                          alt="header-image-4"
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
