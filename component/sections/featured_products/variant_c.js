import { memo, useEffect, useState } from "react";
import { sanityClient, urlFor } from "lib/sanity";
import { useRouter } from "next/router";
import Image from "next/image";
import { useEcwid } from "context/EcwidContext";

function VariantC({ title }) {
  const [allProducts, setAllProducts] = useState(null);
  const router = useRouter();

  const ecwid = useEcwid();

  // lets get all the products for a specific collection
  useEffect(() => {
    async function getProducts() {
      const query = '*[_type == "mainProduct"]';
      const params = { slug: router.query.slug };

      try {
        await sanityClient
          .fetch(query, params)
          .then((result) => setAllProducts(result));
      } catch (err) {
        console.log(err);
      }
    }

    getProducts();
  }, []);

  return (
    <section className="pt-20 pb-10 bg-gray-50">
      <div className="container mx-auto px-4">
        {title && (
          <h1 className="mb-16 md:mb-24 text-4xl md:text-5xl font-bold font-heading">
            {title}
          </h1>
        )}
        <div className="flex flex-wrap -mx-3 mb-24">
          {allProducts?.map((product, index) => {
            let item = null;
            if (product?.ecwidProductId && ecwid?.products) {
              item = ecwid.products[parseInt(product?.ecwidProductId)];
            }

            return (
              <div
                className="w-full md:w-1/2 lg:w-1/4 px-3 mb-6 lg:mb-0"
                key={index}
              >
                <div className="relative bg-white shadow-md xl:h-96 lg:h-80 md:h-96 h-auto">
                  <a
                    className="block relative"
                    href={`/products/${product?.slug?.current}`}
                  >
                    {item && item?.inStock ? (
                      item?.ribbon?.text && (
                        <div className="absolute top-2 right-0 z-50">
                          <p
                            className="inline text-white p-2"
                            style={{
                              backgroundColor: item?.ribbon?.color,
                            }}
                          >
                            {item?.ribbon?.text}
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
                    {item?.defaultDisplayedPriceFormatted && (
                      <p className="text-lg font-bold font-heading text-blue-500">
                        <span className="text-webriq-darkblue">
                          {item?.defaultDisplayedPriceFormatted}
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
export default memo(VariantC);
