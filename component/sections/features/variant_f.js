import React from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "lib/sanity";

function VariantF({ caption, title, description, images, primaryButton }) {
  return (
    <section>
      <div className="py-20 bg-gray-50 radius-for-skewed">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center -mx-4">
            <div className="mb-12 lg:mb-0 w-full lg:w-1/2 flex px-4">
              <div className="max-w-md">
                <span className="text-webriq-darkblue font-bold">
                  {caption}
                </span>
                {title && (
                  <h1 className="mb-6 text-4xl lg:text-5xl font-bold font-heading">
                    {title}
                  </h1>
                )}
                {description && (
                  <div className="mb-6 max-w-sm">
                    <p className="text-gray-500 leading-loose">{description}</p>
                  </div>
                )}
                {primaryButton && (
                  <div className="flex flex-wrap lg:-ml-5">
                    {primaryButton?.type === "linkInternal" ? (
                      <Link
                        href={
                          primaryButton?.internalLink === "Home" ||
                          primaryButton?.internalLink === "home"
                            ? "/"
                            : `/${
                                primaryButton.internalLink === undefined
                                  ? "page-not-found"
                                  : primaryButton.internalLink
                              }`
                        }
                      >
                        <a
                          aria-label={`Features ${
                            primaryButton?.label ?? "Primary"
                          } button which directs to ${
                            primaryButton?.internalLink === undefined
                              ? "page-not-found"
                              : primaryButton?.internalLink
                          }`}
                          className="lg:w-auto py-2 px-6 leading-loose lg:ml-5 text-gray-50 font-bold bg-webriq-darkblue hover:bg-webriq-blue transition duration-200 rounded-l-xl rounded-t-xl"
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
                        aria-label={`Features ${
                          primaryButton?.label ?? "Primary"
                        } button which directs to ${
                          primaryButton?.externalLink === undefined
                            ? "link-not-found"
                            : primaryButton?.externalLink
                        }`}
                        className="lg:w-auto py-2 px-6 leading-loose lg:ml-5 text-gray-50 font-bold bg-webriq-darkblue hover:bg-webriq-blue transition duration-200 rounded-l-xl rounded-t-xl"
                        target={primaryButton?.linkTarget}
                        href={`/${
                          primaryButton.externalLink === undefined
                            ? "link-not-found"
                            : primaryButton.externalLink
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
                  </div>
                )}
              </div>
            </div>
            {images && (
              <div className="w-full lg:w-1/2">
                <div className="mb-4 items-end lg:flex lg:flex-wrap xl:flex xl:flex-wrap 2xl:flex 2xl:flex-wrap">
                  <div className="mb-4 lg:mb-0 xl:mb-0 2xl:mb-0 lg:w-2/3 xl:w-2/3 2xl:w-2/3 h-full px-3">
                    {images?.[0]?.image && (
                      <div className="rounded overflow-hidden">
                        <Image
                          src={urlFor(images[0]?.image)}
                          layout="responsive"
                          width="356px"
                          height="192px"
                          objectFit="cover"
                          alt={images[0]?.alt ?? "features-variantF-image-1"}
                          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                          placeholder="blur"
                        />
                      </div>
                    )}
                  </div>
                  <div className="lg:w-1/3 xl:w-1/3 2xl:w-1/3 h-full px-3">
                    {images?.[1]?.image && (
                      <div className="rounded overflow-hidden">
                        <Image
                          src={urlFor(images[1]?.image)}
                          layout="responsive"
                          width="166px"
                          height="128px"
                          objectFit="cover"
                          alt={images[1]?.alt ?? "features-variantF-image-2"}
                          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                          placeholder="blur"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="mb-4 items-start lg:flex lg:flex-wrap xl:flex xl:flex-wrap 2xl:flex 2xl:flex-wrap">
                  <div className="mb-4 lg:mb-0 xl:mb-0 2xl:mb-0 lg:w-1/3 xl:w-1/3 2xl:w-1/3 h-full px-3">
                    {images?.[2]?.image && (
                      <div className="rounded overflow-hidden">
                        <Image
                          src={urlFor(images[2]?.image)}
                          layout="responsive"
                          width="166px"
                          height="128px"
                          objectFit="cover"
                          alt={images[2]?.alt ?? "features-variantF-image-3"}
                          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                          placeholder="blur"
                        />
                      </div>
                    )}
                  </div>
                  <div className="lg:w-2/3 xl:w-2/3 2xl:w-2/3 h-full px-3">
                    {images?.[3]?.image && (
                      <div className="rounded overflow-hidden">
                        <Image
                          src={urlFor(images[3]?.image)}
                          layout="responsive"
                          width="356px"
                          height="192px"
                          objectFit="cover"
                          alt={images[3]?.alt ?? "features-variantF-image-4"}
                          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                          placeholder="blur"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantF);
