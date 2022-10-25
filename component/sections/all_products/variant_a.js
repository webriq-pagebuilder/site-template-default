import { memo, useState, useEffect } from "react";
import { urlFor } from "lib/sanity";
import { sanityClient } from "lib/sanity.server";
import Link from "next/link";

function VariantA() {
  const [collections, setCollections] = useState([]); // get C-Studio collections pages
  const [products, setProducts] = useState([]); // get C-Studio products pages
  const [selectInput, setSelectInput] = useState(""); // contain value for the select input

  // fetch data on page load
  useEffect(() => {
    async function getData() {
      try {
        // fetch product pages
        await sanityClient
          .fetch(
            `*[_type == 'mainProduct' && !(_id in path("drafts.**"))]{
            ...,
            collections-> 
          }`
          )
          .then((product) => setProducts(product));
        // fetch collection pages
        await sanityClient
          .fetch(`*[_type == 'mainCollection' && !(_id in path("drafts.**"))]`)
          .then((collection) => setCollections(collection));
      } catch (err) {
        console.log(err);
      }
    }

    getData(); // run function
  }, []);

  // get selected input
  const handleSelectInput = (e) => {
    setSelectInput(e.target.value);
  };

  // filtered products array based on select input
  const filteredProducts = products?.filter(
    (product) => product?.collections?.name === selectInput
  );

  // get products array length
  const productLength =
    selectInput === "" ? products?.length : filteredProducts?.length;

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-4 mb-20 items-center justify-between">
          <div className="w-full lg:w-auto px-4 mb-12 xl:mb-0">
            <h1 className="text-5xl font-bold font-heading">
              {`Showing ${productLength} results`}
            </h1>
          </div>
          <select
            className="p-4 bg-white text-lg border border-gray-400 focus:ring-webriq-blue focus:border-webriq-blue rounded-md"
            name="by-collection"
            value={selectInput}
            onChange={handleSelectInput}
          >
            <option name="default-value" value=""></option>
            {collections?.map((collection, index) => (
              <option value={collection?.name} key={index}>
                {collection?.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-wrap -mx-3">
          <div className="w-full px-3">
            <div className="flex flex-wrap -mx-3">
              {(selectInput !== "" ? filteredProducts : products)?.map(
                (product, index) => (
                  <div
                    className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-3 mb-8"
                    key={index}
                  >
                    <div className="p-6">
                      <Link href={`/products/${product?.slug?.current}`}>
                        <a className="block px-6 mt-6 mb-2">
                          {product?.productPreview?.image ? (
                            <img
                              className="mb-5 mx-auto h-56 w-full object-contain"
                              src={urlFor(product?.productPreview?.image)}
                              alt={
                                product?.productPreview?.alt ??
                                `product-image-${index}`
                              }
                            />
                          ) : (
                            <img
                              className="mb-5 mx-auto h-56 w-full object-contain"
                              src="https://cdn.sanity.io/images/9itgab5x/production/b362a413487c075bc56646b996ffaf5b888b8fd1-1200x1063.png"
                              alt={
                                product?.productPreview?.alt ??
                                `product-image-${index}`
                              }
                            />
                          )}
                          {product?.name && (
                            <h2 className="mb-2 text-xl font-bold font-heading">
                              {product?.name}
                            </h2>
                          )}
                          {product?.price && (
                            <p className="text-lg font-bold font-heading text-webriq-darkblue">
                              {product?.price}
                            </p>
                          )}
                        </a>
                      </Link>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
        <div className="text-center"></div>
      </div>
    </section>
  );
}
export default memo(VariantA);
