import { memo, useState } from "react";
import { urlFor } from "lib/sanity";
import { useEcwid } from "context/EcwidContext";
import Image from "next/image";
import Link from "next/link";

function VariantB({ title, featured, primaryButton }) {
   const ecwid = useEcwid();

   return (
      <section className="py-20 overflow-x-hidden bg-gray-50">
         <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-between mb-20 md:mb-16 md:">
               {title && (
                  <h1 className="text-4xl md:text-5xl font-bold">{title}</h1>
               )}
               {primaryButton?.label && (
                  <div className="hidden lg:mt-0 md:block md:mt-16">
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
                              aria-label={
                                 primaryButton?.label ??
                                 "Featured products primary button"
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
                        </Link>
                     ) : (
                        <a
                           aria-label={
                              primaryButton?.label ??
                              "Featured products primary button"
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
                  {featured?.map((items, index) => {
                     let item = null;
                     if (items?.pid && ecwid?.products) {
                        item = ecwid.products[parseInt(items.pid)];
                     }

                     return (
                        <div
                           className="w-full md:w-1/2 lg:w-1/3 px-3 mb-10 lg:mb-0"
                           key={index}
                        >
                           <div className="relative bg-white shadow-md">
                              <a
                                 className="block relative"
                                 href={`/products/${items?.slug?.current}`}
                              >
                                 {item && item?.inStock ? (
                                    item?.ribbon?.text && (
                                       <div className="absolute top-2 left-0 z-50">
                                          <p
                                             className="inline text-white p-2"
                                             style={{
                                                backgroundColor:
                                                   item?.ribbon?.color,
                                             }}
                                          >
                                             {item?.ribbon?.text}
                                          </p>
                                       </div>
                                    )
                                 ) : (
                                    <div className="absolute top-2 left-0 z-50">
                                       <p className="inline text-white p-2 bg-red-400">
                                          SOLD OUT
                                       </p>
                                    </div>
                                 )}

                                 {items?.productPreview?.image && (
                                    <Image
                                       className="hover:scale-125 transition-all duration-700"
                                       layout="responsive"
                                       width={485}
                                       height={384}
                                       objectFit="cover"
                                       src={urlFor(
                                          items?.productPreview?.image
                                       )}
                                       alt={
                                          items?.productPreview?.alt ??
                                          `product-image-${index}`
                                       }
                                    />
                                 )}
                              </a>
                              <div className="px-6 pb-6 mt-8">
                                 {items?.name && (
                                    <a
                                       className="text-2xl xl:text-3xl font-bold"
                                       href={`/products/${items?.slug?.current}`}
                                    >
                                       {items?.name}
                                    </a>
                                 )}
                                 <p className="text-lg font-bold font-heading">
                                    <span className="text-webriq-darkblue">
                                       {item?.defaultDisplayedPriceFormatted}
                                    </span>
                                 </p>
                              </div>
                           </div>
                        </div>
                     );
                  })}
               </div>
            )}
            {primaryButton?.label && (
               <div className="block text-center mt-10 md:hidden">
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
                           aria-label={
                              primaryButton?.label ??
                              "Featured products primary button"
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
                     </Link>
                  ) : (
                     <a
                        aria-label={
                           primaryButton?.label ??
                           "Featured products primary button"
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
