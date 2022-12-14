import { memo } from "react";
import { urlFor } from "lib/sanity";
import Image from "next/image";
import { useEcwid } from "context/EcwidContext";
import Ribbon from "components/ecwid/Ribbon";

function VariantA() {
  const ecwid = useEcwid();
  const { favorites } = ecwid;

  return (
    <section className="pt-20">
      <div className="container mx-auto px-5">
        <div className="py-8">
          <div className="flex flex-col sm:flex-row gap-x-4">
            {favorites ? (
              favorites?.map((items, index) => {
                let item = null;
                if (items?.ecwidProductId && ecwid?.products) {
                  item = ecwid.products[parseInt(items?.ecwidProductId)];
                }

                return (
                  <div className="w-full sm:w-1/2 md:w-1/3 mb-5" key={index}>
                    <a
                      href={`/products/${items?.slug?.current}`}
                      className="flex flex-col gap-4"
                    >
                      <div className="relative">
                        <div className="absolute z-10">
                          <Ribbon data={items} />
                        </div>
                        <div className="w-full object-cover">
                          {items?.productInfo?.images ? (
                            <Image
                              layout="responsive"
                              width={485}
                              height={384}
                              objectFit="cover"
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
                              layout="responsive"
                              width={485}
                              height={384}
                              objectFit="cover"
                              src="https://cdn.sanity.io/images/9itgab5x/production/9523d40461371b7b4948456c57bb663bd8998c4a-500x362.png"
                              alt={`default image for product ${index + 1}`}
                            />
                          )}
                        </div>
                      </div>

                      <p className="text-2xl xl:text-3xl font-bold">
                        {items?.name}
                      </p>
                      <p className="text-xl font-bold font-heading text-white">
                        <span className="text-webriq-darkblue mr-2">
                          {items?.price}
                        </span>
                      </p>
                    </a>
                  </div>
                );
              })
            ) : (
              <div className="mx-auto mb-6">
                <img
                  className="w-96 h-96 object-contain mx-auto"
                  src="https://cdn.sanity.io/images/9itgab5x/production/951b1f5f26048374711fa6800e0b542528240432-982x638.png"
                  alt="no products on wishlist"
                />
                <div className="text-center">
                  <span className="mb-6 text-2xl text-webriq-darkblue font-bold">
                    Wishlist is empty
                  </span>
                  <p className="my-8 text-gray-700">
                    Click the "Add to wishlist" button to add your favorite
                    products here.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
export default memo(VariantA);
