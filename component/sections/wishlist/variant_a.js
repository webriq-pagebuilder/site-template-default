import { memo } from "react";
import { urlFor } from "lib/sanity";
import Image from "next/image";
import { useEcwid } from "context/EcwidContext";
import Ribbon from "component/ecwid/Ribbon";

function VariantA() {
  const ecwid = useEcwid();
  const { favorites } = ecwid;

  return (
    <section className="pt-20">
      <div className="container mx-auto px-5">
        <div className="py-8">
          <div className="flex flex-col sm:flex-row gap-x-4">
            {favorites !== null && favorites.length !== 0 ? (
              favorites.map((items, index) => {
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
                          <Ribbon data={item} />
                        </div>
                        <div className="w-full object-cover">
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
                      </div>

                      <p className="text-2xl xl:text-3xl font-bold">
                        {items?.name}
                      </p>
                      <p className="text-xl font-bold font-heading text-white">
                        <span className="text-webriq-darkblue mr-2">
                          {item?.defaultDisplayedPriceFormatted}
                        </span>
                      </p>
                    </a>
                  </div>
                );
              })
            ) : (
              <div className="w-full">
                <p>No favorited products</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
export default memo(VariantA);
