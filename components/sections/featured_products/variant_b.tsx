import { memo, useEffect } from "react";
import { urlFor } from "lib/sanity";
import { useEcwid } from "context/EcwidContext";
import Ribbon from "components/ecwid/Ribbon";
import Image from "next/image";

import { FeaturedProductsProps } from ".";
import { Container } from "components/layout/Container";
import { Flex } from "components/layout/Flex/Flex";
import { Heading } from "components/ui/Heading";
import { Text } from "components/ui/Text";

function VariantB({ title, featured }: FeaturedProductsProps) {
  const ecwid = useEcwid();
  const ids = featured && featured?.map((item) => item?.ecwidProductId);

  useEffect(() => {
    if (ecwid && ids) {
      ecwid?.fetchCollections(ids);
    }
  }, []);

  return (
    <section className="py-20 overflow-x-hidden bg-gray-50">
      <Container>
        <Flex wrap justify="between" className="mb-20 md:mb-16">
          {title && <Heading>{title}</Heading>}
        </Flex>
        {featured && (
          <Flex wrap>
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
                    className="w-full px-3 mb-10 md:w-1/2 lg:mb-6 lg:w-1/3 xl:w-1/4"
                    key={index}
                  >
                    <div className="w-full h-full transition-all duration-700 bg-white shadow-md md:hover:scale-110">
                      <a href={`/products/${product?.slug?.current}`}>
                        <div className="absolute z-10">
                          <Ribbon data={featuredCollections} />
                        </div>

                        <div className="overflow-hidden">
                          {product?.productInfo?.images ? (
                            <Image
                              className="h-[320px] w-full object-cover"
                              sizes="100vw"
                              width={294}
                              height={320}
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
                              className="h-[320px] w-full object-cover"
                              sizes="100vw"
                              width={294}
                              height={320}
                              src="https://cdn.sanity.io/images/9itgab5x/production/9523d40461371b7b4948456c57bb663bd8998c4a-500x362.png"
                              alt={`default image for product ${index + 1}`}
                            />
                          )}
                        </div>
                      </a>
                      <div className="px-6 pb-6 mt-8 break-words">
                        {product?.name && (
                          <a
                            className="text-xl font-bold sm:text-2xl"
                            href={`/products/${product?.slug?.current}`}
                          >
                            {product?.name}
                          </a>
                        )}
                        <Text weight="bold" className="text-lg ">
                          <span className="text-primary">
                            {
                              featuredCollections?.defaultDisplayedPriceFormatted
                            }
                          </span>
                        </Text>
                      </div>
                    </div>
                  </div>
                ))
              );
            })}
          </Flex>
        )}
      </Container>
    </section>
  );
}
export default memo(VariantB);
