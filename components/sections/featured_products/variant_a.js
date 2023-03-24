import { memo, useEffect } from "react";
import { urlFor } from "lib/sanity";
import Image from "next/image";
import { useEcwid } from "context/EcwidContext";
import Ribbon from "components/ecwid/Ribbon";

function VariantA({ title, featured }) {
  const ecwid = useEcwid();
  const ids = featured && featured?.map((item) => item?.ecwidProductId);

  useEffect(() => {
    if (ids) {
      ecwid?.fetchCollections(ids);
    }
  }, []);

  return (
    <section className="relative py-20">
      <div className="relative container mx-auto px-4">
        {title && (
          <h1 className="mb-8 md:mb-16 text-4xl md:text-5xl font-bold">
            {title}
          </h1>
        )}
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
                  <div className="w-full md:w-1/2 lg:w-1/3 px-3 mb-10 lg:mb-6 md:hover:scale-125 transition-all duration-700" key={index}>
                    <a
                      href={`/products/${product?.slug?.current}`}
                      //className="flex flex-col gap-4"
                    >
                      <div className="relative">
                        <div className="absolute z-10">
                          <Ribbon data={featuredCollections} />
                        </div>
                        <div className="overflow-hidden">
                          {product?.productInfo?.images ? (
                            <Image
                              className="w-full h-[357px] object-cover"
                              sizes="100vw"
                              width={357}
                              height={357}
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
                              className="w-full h-[320px] object-cover"
                              width={357}
                              height={357}
                              sizes="100vw"
                              src="https://cdn.sanity.io/images/9itgab5x/production/9523d40461371b7b4948456c57bb663bd8998c4a-500x362.png"
                              alt={`default image for product ${index + 1}`}
                            />
                          )}
                        </div>
                      </div>

                      <p className="text-xl sm:text-2xl xl:text-3xl font-bold hover:text-opacity-80">
                        {product?.name}
                      </p>
                    </a>
                    <p className="text-lg sm:text-xl font-bold font-heading text-white">
                      <span className="text-webriq-darkblue mr-2">
                        {featuredCollections?.defaultDisplayedPriceFormatted}
                      </span>
                    </p>
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
export default memo(VariantA);
