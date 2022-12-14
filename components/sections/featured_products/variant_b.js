import { memo, useEffect } from "react";
import { urlFor } from "lib/sanity";
import { useEcwid } from "context/EcwidContext";
import Ribbon from "components/ecwid/Ribbon";
import Image from "next/image";

function VariantB({ title, featured }) {
  const ecwid = useEcwid();
  const ids = featured && featured?.map((item) => item?.ecwidProductId);

  useEffect(() => {
    if (ids) {
      ecwid?.fetchCollections(ids);
    }
  }, []);

  return (
    <section className="py-20 overflow-x-hidden bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between mb-20 md:mb-16">
          {title && <h1 className="text-4xl md:text-5xl font-bold">{title}</h1>}
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
                    className="w-full md:w-1/2 lg:w-1/4 px-3 mb-10 lg:mb-6"
                    key={index}
                  >
                    <div className="relative bg-white h-full shadow-md">
                      <a
                        className="block relative"
                        href={`/products/${product?.slug?.current}`}
                      >
                        <div className="absolute z-10">
                          <Ribbon data={featuredCollections} />
                        </div>

                        {product?.productInfo?.images ? (
                          <Image
                            className="hover:scale-125 transition-all duration-700"
                            layout="responsive"
                            width={485}
                            height={384}
                            objectFit="cover"
                            src={urlFor(
                              product?.productInfo?.images?.[0]?.image
                            )}
                            alt={
                              product?.productInfo?.images?.[0]?.alt ??
                              `product-image-${index}`
                            }
                          />
                        ) : (
                          <Image
                            layout="responsive"
                            width={485}
                            height={384}
                            objectFit="cover"
                            src="https://cdn.sanity.io/images/9itgab5x/production/9523d40461371b7b4948456c57bb663bd8998c4a-500x362.png"
                            alt={`default image for product ${index + 1}`}
                          />
                        )}
                      </a>
                      <div className="px-6 pb-6 mt-8">
                        {product?.name && (
                          <a
                            className="text-2xl font-bold"
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
      </div>
    </section>
  );
}
export default memo(VariantB);
