import { urlFor } from "lib/sanity";
import { useRouter } from "next/router";
import { memo, useEffect, useState } from "react";

function VariantA({ products, ecwidProduct, getPriceDisplay }) {
  // get Ecwid product details
  const defaultProduct = ecwidProduct ? ecwidProduct : products;
  const [productQuery, setProductQuery] = useState("");
  const [selectInput, setSelectInput] = useState(products?.[0]?.name); // initial value will be the first option from the list of collections
  const router = useRouter();

  useEffect(() => {
    // temp: on first render always return to the search page
    router.push("/search", undefined, { shallow: true });
  }, []);

  // reads the param from the router object to get the query
  useEffect(() => {
    let mount = true;
    if (mount) {
      const { q } = router.query;

      // the query changed
      if (q) {
        setProductQuery(q); // pass query to state variable
      }
    }
  }, [router.query.q, productQuery]);

  // get selected input
  const handleSelectInput = (e) => {
    setSelectInput(e.target.value);
  };

  // filtered products array based on select input
  const filterProductsByCollection =
    products && products?.filter((product) => product?.name === selectInput);

  // filtered products array based on search query input
  const filterProductsByQuery = products?.reduce((newArr, currArr) => {
    if (newArr?.indexOf(currArr) === -1) {
      newArr?.push(...currArr?.products);
    }

    return newArr?.filter((product) =>
      product?.name?.toLowerCase()?.includes(productQuery?.toLowerCase())
    );
  }, []);

  // set products array to display based on conditions met
  let displayProducts = products?.products;

  // set array to display
  if (productQuery) {
    displayProducts = filterProductsByQuery;
  } else {
    displayProducts = filterProductsByCollection?.[0];
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap lg:-mx-4 mb-20 items-center justify-between">
          <div className="w-full lg:w-auto lg:px-4 mb-12 xl:mb-0">
            <h1 className="text-2xl sm:text-4xl font-bold font-heading">
              {productQuery &&
                `Showing ${displayProducts?.length} results for "${productQuery}"`}
            </h1>
          </div>
          {!productQuery && products?.length > 1 && (
            <select
              className="p-4 bg-white text-lg border border-gray-400 focus:ring-webriq-blue focus:border-webriq-blue rounded-md"
              name="by-collection"
              value={selectInput}
              onChange={handleSelectInput}
            >
              <option name="default-value" value={selectInput}>
                {selectInput}
              </option>
              {products
                ?.filter((collection) => collection?.name !== selectInput)
                ?.map((collection, index) => (
                  <option value={collection?.name} key={index}>
                    {collection?.name}
                  </option>
                ))}
            </select>
          )}
        </div>
        {displayProducts && (
          <div className="flex flex-wrap -mx-3">
            <div className="w-full px-3">
              {displayProducts?.length !== 0 ? (
                <div className="flex flex-wrap -mx-3">
                  {(displayProducts?.products ?? displayProducts)?.map(
                    (product, index) => (
                      <div
                        className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 px-3 mb-8"
                        key={index}
                      >
                        <div className="mx-10">
                          <a
                            className="block md:px-6 mt-6 mb-2"
                            href={`/products/${product?.slug?.current}`}
                          >
                            {product?.productInfo?.images ? (
                              <img
                                className="mb-3 sm:mb-5 mx-auto h-56 w-full object-contain hover:scale-110 transition-all duration-700"
                                src={urlFor(
                                  product?.productInfo?.images?.[0]?.image
                                )}
                                alt={
                                  product?.productInfo?.images?.[0]?.alt ??
                                  `product-image-${index}`
                                }
                              />
                            ) : (
                              <img
                                className="mb-3 sm:mb-5 mx-auto h-56 w-full object-contain hover:scale-110 transition-all duration-700"
                                src="https://cdn.sanity.io/images/9itgab5x/production/9523d40461371b7b4948456c57bb663bd8998c4a-500x362.png"
                                alt={
                                  product?.productInfo?.images?.[0]?.alt ??
                                  `product-image-${index}`
                                }
                              />
                            )}
                            {product?.name && (
                              <h2 className="mb-2 text-lg sm:text-xl font-heading">
                                {product?.name}
                              </h2>
                            )}
                            {product?.price && (
                              <p className="text-lg font-bold font-heading text-webriq-darkblue">
                                ${product?.price}
                              </p>
                            )}
                          </a>
                        </div>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <div className="text-center">
                  <img
                    className="w-96 h-96 object-contain mx-auto"
                    src="https://cdn.sanity.io/images/9itgab5x/production/951b1f5f26048374711fa6800e0b542528240432-982x638.png"
                    alt="no-query-results"
                  />
                  <span className="mb-6 text-4xl text-webriq-darkblue font-bold">
                    Whoops!
                  </span>
                  <p className="my-8 text-gray-700">
                    {`No results for query "${productQuery}". Kindly try another keyword.`}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
export default memo(VariantA);
