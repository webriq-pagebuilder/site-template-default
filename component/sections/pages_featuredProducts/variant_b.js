import Ribbon from "component/ecwid/Ribbon";
import { useEcwid } from "context/EcwidContext";
import { urlFor } from "lib/sanity";
import Image from "next/image";
import { memo, useEffect } from "react";

function VariantC({ collections }) {
  const ecwid = useEcwid();
  // const { getPriceDisplay, fetchCollections, productCollection } = ecwid;

  const ids =
    collections &&
    collections?.map((item) =>
      item?.items?.map((i) => i?.ecwidProductId).flat()
    );

  useEffect(() => {
    ecwid?.fetchCollections(ids);
  }, []);

  return (
    <section className="pt-20 pb-10 bg-gray-50">
      {collections &&
        collections?.map((collection, index) => (
          <div className="container mx-auto px-4" key={index}>
            {collection?.name && (
              <h1 className="mb-16 md:mb-24 text-4xl md:text-5xl font-bold font-heading">
                {collection?.name}
              </h1>
            )}
            <div className="flex flex-wrap -mx-3 mb-24">
              {collection?.items?.map((product, index) => {
                let items = [];
                ecwid?.productCollection &&
                  ecwid?.productCollection?.find((prod) => {
                    if (prod?.id === product?.ecwidProductId) {
                      items?.push({ ...prod, ...product });
                    }
                  });

                return (
                  items.length > 0 &&
                  items.map((collect) => (
                    <div
                      className="w-full md:w-1/2 lg:w-1/4 px-3 mb-6 lg:mb-0"
                      key={index}
                    >
                      <div className="relative bg-white shadow-md xl:h-96 lg:h-80 md:h-96 h-auto">
                        <a
                          className="block relative"
                          href={`/products/${product?.slug?.current}`}
                        >
                          <div className="absolute top-2 right-0 z-50">
                            <Ribbon data={collect} />
                          </div>
                          {product?.productPreview?.image && (
                            <div className="w-full">
                              <Image
                                className="hover:scale-125 transition-all duration-700"
                                layout="responsive"
                                width={256}
                                height={200}
                                src={urlFor(product?.productPreview?.image)}
                                objectFit="cover"
                                alt={
                                  product?.productPreview?.alt ??
                                  `product-image-${index}`
                                }
                              />
                            </div>
                          )}
                        </a>
                        <div className="px-6 pb-6 mt-8">
                          {product?.name && (
                            <a
                              className="block mb-2"
                              href={`/products/${product?.slug?.current}`}
                            >
                              <h1 className="mb-2 text-xl font-bold font-heading">
                                {product?.name}
                              </h1>
                            </a>
                          )}
                          {product?.price && (
                            <p className="text-lg font-bold font-heading text-blue-500">
                              <span className="text-webriq-darkblue">
                                {ecwid?.getPriceDisplay(product?.price)}
                              </span>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ); // end
              })}
            </div>
          </div>
        ))}
    </section>
  );
}
export default memo(VariantC);
