import React from "react";
import { urlFor } from "lib/sanity";
import Image from "next/image";
import { ExternalLink, InternalLink } from "helper";


function VariantB({
  template,
  images,
  title,
  description,
  primaryButton,
  secondaryButton,
}) {
  return (
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
                    {primaryButton?.label &&
                      (primaryButton?.type === "linkInternal" ? (
                        <InternalLink
                          className={`inline-block mb-3 lg:mb-0 lg:mr-3 w-auto py-2 px-6 leading-loose bg-${template.color}-darkblue hover:bg-${template.color}-blue text-white font-semibold rounded-l-xl rounded-t-xl transition duration-200`}
                          link={primaryButton}
                        />
                      ) : (
                        <ExternalLink
                          className={`inline-block mb-3 lg:mb-0 lg:mr-3 w-auto py-2 px-6 leading-loose bg-${template.color}-darkblue hover:bg-${template.color}-blue text-white font-semibold rounded-l-xl rounded-t-xl transition duration-200`}
                          link={primaryButton}
                        />
                      ))}
                    {secondaryButton?.label &&
                      (secondaryButton?.type === "linkInternal" ? (
                        <InternalLink
                          className="inline-block w-auto py-2 px-6 leading-loose font-semibold bg-white hover:bg-gray-50 rounded-l-xl rounded-t-xl transition duration-200"
                          link={secondaryButton}
                        />
                      ) : (
                        <ExternalLink
                          className="inline-block w-auto py-2 px-6 leading-loose font-semibold bg-white hover:bg-gray-50 rounded-l-xl rounded-t-xl transition duration-200"
                          link={secondaryButton}
                        />
                      ))}
                  </div>
                </div>
              </div>
            </div>
            {images && (
              <div className="w-full lg:w-1/2 px-4">
                <div className="flex mb-3 lg:mb-4 lg:ml-6">
                  {images?.[0]?.image?.asset?._ref && (
                    <div className="w-1/3 h-full mr-2 rounded-3xl lg:rounded-br-none overflow-hidden">
                      <Image
                        src={urlFor(images?.[0]?.image)}
                        layout="responsive"
                        width="155px"
                        height="235px"
                        objectFit="cover"
                        alt={images?.[0]?.alt ?? "header-image-1"}
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                        placeholder="blur"
                      />
                    </div>
                  )}
                  {images?.[1]?.image?.asset?._ref && (
                    <div className="w-2/3 h-full ml-2 rounded-3xl lg:rounded-bl-none overflow-hidden">
                      <Image
                        src={urlFor(images?.[1]?.image)}
                        layout="responsive"
                        width="327px"
                        height="248px"
                        objectFit="cover"
                        alt={images?.[1]?.alt ?? "header-image-2"}
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                        placeholder="blur"
                      />
                    </div>
                  )}
                </div>
                <div className="flex mb-3 lg:mb-4 lg:mr-6">
                  {images?.[2]?.image?.asset?._ref && (
                    <div className="w-2/3 h-full mr-2 rounded-3xl lg:rounded-br-none overflow-hidden">
                      <Image
                        src={urlFor(images?.[2]?.image)}
                        layout="responsive"
                        width="327px"
                        height="248px"
                        objectFit="cover"
                        alt={images?.[2]?.alt ?? "header-image-3"}
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                        placeholder="blur"
                      />
                    </div>
                  )}
                  {images?.[3]?.image?.asset?._ref && (
                    <div className="w-1/3 h-full ml-2 rounded-3xl lg:rounded-bl-none overflow-hidden">
                      <Image
                        src={urlFor(images?.[3]?.image)}
                        layout="responsive"
                        width="155px"
                        height="235px"
                        objectFit="cover"
                        alt={images?.[3]?.alt ?? "header-image-4"}
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
  );
}

export default React.memo(VariantB);
