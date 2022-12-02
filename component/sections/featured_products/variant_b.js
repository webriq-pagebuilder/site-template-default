import Ribbon from "component/ecwid/Ribbon";
import { useEcwid } from "context/EcwidContext";
import { urlFor } from "lib/sanity";
import Image from "next/image";
import { memo, useEffect } from "react";

function VariantB({ title, featured, primaryButton }) {
  const ecwid = useEcwid();

  // const { fetchCollections, productCollection } = ecwid;

  const ids = featured && featured?.map((item) => item?.ecwidProductId);

  useEffect(() => {
    ecwid?.fetchCollections(ids);
  }, []);

  return (
    <section className="py-20 overflow-x-hidden bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between mb-20 md:mb-16 md:">
          {title && <h1 className="text-4xl md:text-5xl font-bold">{title}</h1>}
          {primaryButton?.label && (
            <div className="hidden lg:mt-0 md:block md:mt-16">
              {primaryButton?.type === "linkInternal" ? (
                <a
                  href={
                    primaryButton?.internalLink === "Home" ||
                    primaryButton?.internalLink === "home"
                      ? "/"
                      : `/${
                          !primaryButton?.internalLink
                            ? "page-not-found"
                            : primaryButton?.internalLink
                        }`
                  }
                  aria-label={
                    primaryButton?.label ?? "Featured products primary button"
                  }
                  className="text-white font-bold font-heading py-6 px-8 rounded-md uppercase bg-webriq-darkblue transition duration-200 hover:bg-webriq-blue"
                  target={primaryButton?.linkTarget}
                  rel={
                    primaryButton?.linkTarget === "_blank"
                      ? "noopener noreferrer"
                      : null
                  }
                >
                  {primaryButton?.label}
                </a>
              ) : (
                <a
                  aria-label={
                    primaryButton?.label ?? "Featured products primary button"
                  }
                  className="text-white font-bold font-heading py-6 px-8 rounded-md uppercase bg-webriq-darkblue transition duration-200 hover:bg-webriq-blue"
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
            </div>
          )}
        </div>
        {featured && (
          <div className="flex flex-wrap -mx-3">
            {featured?.map((product, index) => {
              let items = [];
              ecwid?.productCollection &&
                ecwid?.productCollection?.find((prod) => {
                  if (prod?.id === product?.ecwidProductId) {
                    items?.push({ ...prod, ...product });
                  }
                });

              return (
                items?.length > 0 &&
                items?.map((featuredCollections) => (
                  <div
                    className="w-full md:w-1/2 lg:w-1/3 px-3 mb-10 lg:mb-6"
                    key={index}
                  >
                    <div className="relative bg-white shadow-md">
                      <a
                        className="block relative"
                        href={`/products/${product?.slug?.current}`}
                      >
                        <div className="absolute z-10">
                          <Ribbon data={featuredCollections} />
                        </div>

                        {product?.productPreview?.image && (
                          <Image
                            className="hover:scale-125 transition-all duration-700"
                            layout="responsive"
                            width={485}
                            height={384}
                            objectFit="cover"
                            src={urlFor(product?.productPreview?.image)}
                            alt={
                              product?.productPreview?.alt ??
                              `product-image-${index}`
                            }
                          />
                        )}
                      </a>
                      <div className="px-6 pb-6 mt-8">
                        {product?.name && (
                          <a
                            className="text-2xl xl:text-3xl font-bold"
                            href={`/products/${product?.slug?.current}`}
                          >
                            {product?.name}
                          </a>
                        )}
                        <p className="text-lg font-bold font-heading">
                          <span className="text-webriq-darkblue">
                            {
                              featuredCollections?.defaultDisplayedPriceFormatted
                            }
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              );
            })}
          </div>
        )}
        {primaryButton?.label && (
          <div className="block text-center mt-10 md:hidden">
            {primaryButton?.type === "linkInternal" ? (
              <a
                href={
                  primaryButton?.internalLink === "Home" ||
                  primaryButton?.internalLink === "home"
                    ? "/"
                    : `/${
                        !primaryButton?.internalLink
                          ? "page-not-found"
                          : primaryButton?.internalLink
                      }`
                }
                aria-label={
                  primaryButton?.label ?? "Featured products primary button"
                }
                className="text-white font-bold font-heading py-6 px-8 rounded-md uppercase bg-webriq-darkblue hover:bg-webriq-blue transition duration-200"
                target={primaryButton?.linkTarget}
                rel={
                  primaryButton?.linkTarget === "_blank"
                    ? "noopener noreferrer"
                    : null
                }
              >
                {primaryButton?.label}
              </a>
            ) : (
              <a
                aria-label={
                  primaryButton?.label ?? "Featured products primary button"
                }
                className="text-white font-bold font-heading py-6 px-8 rounded-md uppercase bg-webriq-darkblue hover:bg-webriq-blue transition duration-200"
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
          </div>
        )}
      </div>
    </section>
  );
}
export default memo(VariantB);
