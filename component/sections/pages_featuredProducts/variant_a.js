import { memo } from "react";
import { urlFor } from "lib/sanity";
import Image from "next/image";
import { useEcwid } from "context/EcwidContext";
import Ribbon from "component/ecwid/Ribbon";

function VariantA({ collections }) {
  const ecwid = useEcwid();

  return (
    <section className="relative pt-20">
      {collections &&
        collections?.map((collection, index) => (
          <div className="relative container mx-auto px-4 pb-4" key={index}>
            {collection?.name && (
              <h1 className="mb-8 md:mb-10 text-4xl md:text-5xl font-bold">
                {collection?.name}
              </h1>
            )}
            {collection?.items && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {collection?.items?.map((product, index) => {
                  let item = null;
                  if (product?.ecwidProductId && ecwid?.products) {
                    item = ecwid.products[parseInt(product?.ecwidProductId)];
                  }

                  return (
                    <div className="w-full my-10 p-6" key={index}>
                      <a
                        href={`/products/${product?.slug?.current}`}
                        className="flex flex-col gap-4"
                      >
                        <div className="relative">
                          <div className="absolute z-10">
                            <Ribbon data={item} />
                          </div>
                          <div className="w-full object-cover overflow-hidden">
                            {product?.productPreview?.image && (
                              <Image
                                className="hover:scale-125 transition-all duration-700"
                                layout="responsive"
                                width={485}
                                height={384}
                                objectFit="cover"
                                src={urlFor(product?.productPreview?.image)}
                                alt={
                                  product?.productPreview?.alt ??
                                  `product-image-${index}`
                                }
                              />
                            )}
                          </div>
                        </div>

                        <p className="text-2xl xl:text-3xl font-bold hover:text-opacity-80">
                          {product?.name}
                        </p>
                      </a>
                      <p className="text-xl font-bold font-heading text-white">
                        <span className="text-webriq-darkblue mr-2">
                          {product?.price}
                        </span>
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
    </section>
  );
}
export default memo(VariantA);