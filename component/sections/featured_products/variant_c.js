import { memo, useEffect, useState } from "react";
import { sanityClient, urlFor } from "lib/sanity";
import { useRouter } from "next/router";
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
            if (product?.pid && ecwid?.products) {
              item = ecwid.products[parseInt(product.pid)];
            }

            return (
              <div
                className="w-full md:w-1/2 lg:w-1/4 px-3 mb-6 lg:mb-0"
                key={index}
              >
                <div className="relative bg-white shadow-md">
                  {/* <span className="absolute top-0 left-0 ml-6 mt-6 px-2 py-1 text-xs font-bold font-heading bg-white border-2 border-red-500 rounded-full text-red-500">
                    -15%
                  </span> */}
                  <a
                    className="block relative"
                    href={`/products/${product?.slug?.current}`}
                  >
                    {item && item.inStock ? (
                      item?.ribbon?.text && (
                        <div className="absolute top-2 right-0 z-50">
                          <p
                            className="inline text-white p-2"
                            style={{ backgroundColor: item.ribbon.color }}
                          >
                            {item.ribbon.text}
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

                    <img
                      className="w-full h-64 object-cover"
                      src={urlFor(product?.productPreview?.image)}
                      alt=""
                    />
                  </a>
                  <div className="px-6 pb-6 mt-8">
                    <a
                      className="block mb-2"
                      href={`/products/${product?.slug?.current}`}
                    >
                      <h2 className="mb-2 text-xl font-bold font-heading">
                        {product?.name}
                      </h2>
                    </a>
                    <p className="text-lg font-bold font-heading text-blue-500">
                      <span className="text-webriq-darkblue">
                        {item?.defaultDisplayedPriceFormatted}
                      </span>
                      {/* <span className="text-xs text-gray-500 font-semibold font-heading line-through">
                        $40.99
                      </span> */}
                    </p>
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
