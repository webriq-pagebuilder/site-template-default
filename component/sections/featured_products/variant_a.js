import { memo } from "react";
import { urlFor } from "lib/sanity";
import Image from "next/image";
import { useEcwid } from "context/EcwidContext";

function VariantA({ title, featured }) {
  const ecwid = useEcwid();

  return (
    <section className="relative pt-20">
      <div className="relative container mx-auto px-4">
        {title && (
          <h1 className="mb-16 text-4xl md:text-5xl font-bold">{title}</h1>
        )}
        {featured && (
          <div className="flex flex-wrap -mx-3">
            {featured?.products?.map((items, index) => {
              let item = null;
              if (items?.pid && ecwid?.products) {
                item = ecwid.products[parseInt(items.pid)];
              }
              console.log({ item });

              return (
                <div className="w-full lg:w-1/3 px-3 mb-16 lg:mb-0" key={index}>
                  <div className="block mb-10">
                    <div className="relative">
                      <a href={`/products/${items?.slug?.current}`}>
                        <div className="w-full h-96 object-cover relative">
                          {item && item.inStock ? (
                            item?.ribbon?.text && (
                              <div className="absolute top-2 right-0 z-50">
                                <p
                                  className="inline text-white p-2"
                                  style={{
                                    backgroundColor: item.ribbon.color,
                                  }}
                                >
                                  {item.ribbon.text}
                                </p>
                              </div>
                            )
                          ) : (
                            <div className="absolute top-2 right-0 z-50">
                              <p className="inline text-white p-2 bg-red-400">
                                SOLD OUT
                              </p>
                            </div>
                          )}
                          {items?.productPreview?.image && (
                            <Image
                              layout="responsive"
                              width={485}
                              height={384}
                              objectFit="cover"
                              src={urlFor(items?.productPreview?.image)}
                              alt={
                                items?.productPreview?.alt ??
                                `product-image-${index}`
                              }
                            />
                          )}
                        </div>
                      </a>
                    </div>
                    <div className="mt-5">
                      <div className="mb-2">
                        {items?.name && (
                          <a
                            className="text-2xl xl:text-3xl font-bold"
                            href={`/products/${items?.slug?.current}`}
                          >
                            {items?.name}
                          </a>
                        )}
                        <p className="mt-3 text-xl font-bold font-heading text-white">
                          <span className="text-webriq-darkblue mr-2">
                            {item?.defaultDisplayedPriceFormatted}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
export default memo(VariantA);
