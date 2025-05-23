import { memo } from "react";
import { urlFor } from "lib/sanity";
import Image from "next/image";
import { useEcwid } from "context/EcwidContext";
import Ribbon from "components/ecwid/Ribbon";
import { Container } from "@stackshift-ui/container";
import { Flex } from "@stackshift-ui/flex";
import { Text } from "@stackshift-ui/text";

function VariantA() {
  const ecwid = useEcwid();
  const { favorites } = ecwid;

  return (
    <section className="py-20 bg-background">
      <Container>
        <div className="py-8">
          <Flex className="flex-col gap-x-4 sm:flex-row">
            {favorites ? (
              favorites?.map((items, index) => {
                let item = null;
                if (items?.ecwidProductId && ecwid?.products) {
                  item = ecwid.products[parseInt(items?.ecwidProductId)];
                }

                return (
                  <div className="w-full mb-5 sm:w-1/2 md:w-1/3" key={index}>
                    <a
                      href={`/products/${items?.slug?.current}`}
                      className="flex flex-col gap-4"
                    >
                      <div className="relative">
                        <div className="absolute z-10">
                          <Ribbon data={items} />
                        </div>
                        <div className="object-cover w-full">
                          {items?.productInfo?.images ? (
                            <Image
                              sizes="100vw"
                              width={485}
                              height={384}
                              src={urlFor(
                                items?.productInfo?.images?.[0]?.image
                              )}
                              alt={
                                items?.productInfo?.images?.[0]?.alt ??
                                `product-image-${index}`
                              }
                            />
                          ) : (
                            <Image
                              sizes="100vw"
                              width={485}
                              height={384}
                              src="https://cdn.sanity.io/images/9itgab5x/production/9523d40461371b7b4948456c57bb663bd8998c4a-500x362.png"
                              alt={`default image for product ${index + 1}`}
                            />
                          )}
                        </div>
                      </div>

                      <Text weight="bold" className="text-2xl xl:text-3xl">
                        {items?.name}
                      </Text>
                      <Text weight="bold" fontSize="xl" className="text-white ">
                        <span className="mr-2 text-primary">
                          {items?.price}
                        </span>
                      </Text>
                    </a>
                  </div>
                );
              })
            ) : (
              <div className="mx-auto mb-6">
                <Image
                  className="mx-auto h-96 w-96"
                  src="https://cdn.sanity.io/images/9itgab5x/production/951b1f5f26048374711fa6800e0b542528240432-982x638.png"
                  width={384}
                  height={384}
                  quality={100}
                  style={{
                    objectFit: "contain",
                  }}
                  alt="no products on wishlist"
                />
                <div className="text-center">
                  <Text
                    fontSize="2xl"
                    weight="bold"
                    className="mb-6 text-primary"
                  >
                    Wishlist is empty
                  </Text>
                  <Text className="my-8 text-gray-700">
                    {`Add your favorite products to wishlist to display them here.`}
                  </Text>
                </div>
              </div>
            )}
          </Flex>
        </div>
      </Container>
    </section>
  );
}
export default memo(VariantA);
