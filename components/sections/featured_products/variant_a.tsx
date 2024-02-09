import { memo, useEffect } from "react";
import { urlFor } from "lib/sanity";
import Image from "next/image";
import { useEcwid } from "context/EcwidContext";
import Ribbon from "components/ecwid/Ribbon";

import { FeaturedProductsProps } from ".";
import { Container } from "components/layout/Container";
import { Heading } from "components/ui/Heading";
import { Flex } from "components/layout/Flex/Flex";
import { Text } from "components/ui/Text";

function VariantA({ title, featured }: FeaturedProductsProps) {
  const ecwid = useEcwid();
  const ids = featured && featured?.map((item) => item?.ecwidProductId);

  useEffect(() => {
    if (ids) {
      ecwid?.fetchCollections(ids);
    }
  }, []);

  return (
    <section className="relative py-20">
      <Container className="relative ">
        {title && <Heading className="mb-8 md:mb-16 ">{title}</Heading>}
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
                    className="w-full px-3 mb-10 transition-all duration-700 md:w-1/2 md:hover:scale-110 lg:mb-6 lg:w-1/3"
                    key={index}
                  >
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
                              className="h-[357px] w-full object-cover"
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
                              className="h-[320px] w-full object-cover"
                              width={357}
                              height={357}
                              sizes="100vw"
                              src="https://cdn.sanity.io/images/9itgab5x/production/9523d40461371b7b4948456c57bb663bd8998c4a-500x362.png"
                              alt={`default image for product ${index + 1}`}
                            />
                          )}
                        </div>
                      </div>

                      <Text
                        weight="bold"
                        className="text-xl hover:text-opacity-80 sm:text-2xl xl:text-3xl"
                      >
                        {product?.name}
                      </Text>
                    </a>
                    <Text
                      weight="bold"
                      className="text-lg text-white sm:text-xl"
                    >
                      <span className="mr-2 text-primary">
                        {featuredCollections?.defaultDisplayedPriceFormatted}
                      </span>
                    </Text>
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
export default memo(VariantA);
