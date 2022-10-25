import { memo, useState, useEffect } from "react";
import { urlFor } from "lib/sanity";
import { sanityClient } from "lib/sanity.server";
import Link from "next/link";

function VariantB() {
  const [collections, setCollections] = useState([]); // get C-Studio collections pages
  const [products, setProducts] = useState([]); // get C-Studio products pages
  const [activeTab, setActiveTab] = useState("All");

  // fetch data on page load
  useEffect(() => {
    async function getData() {
      try {
        // fetch product pages
        await sanityClient
          .fetch(
            `*[_type == 'mainProduct']{
            ...,
            collections-> 
          }`
          )
          .then((product) => setProducts(product));
        // fetch collection pages
        await sanityClient
          .fetch("*[_type == 'mainCollection']")
          .then((collection) => setCollections(collection));
      } catch (err) {
        console.log(err);
      }
    }

    getData(); // run function
  }, []);

  // filtered products array based on active collection tab
  const filteredProducts = products?.filter(
    (product) => product?.collections?.name === activeTab
  );

  return (
    <section className="pt-20">
      <div className="container mx-auto px-4 bg-white">
        <div className="flex flex-wrap -mx-3 mb-24">
          <div className="w-full lg:hidden px-3">
            <div className="flex flex-wrap -mx-2">
              <div className="w-1/2 md:w-1/3 px-2 mb-4">
                <div className="py-6 px-2 text-center bg-gray-50">
                  <h1 className="font-bold font-heading">Category</h1>
                  {collections && (
                    <ul className="hidden text-left mt-6">
                      <li
                        className={`mb-4 ${
                          activeTab === "All"
                            ? " font-bold text-webriq-darkblue"
                            : "hover:text-webriq-blue"
                        }`}
                      >
                        <button
                          className="text-lg"
                          type="button"
                          onClick={() => setActiveTab("All")}
                        >
                          All
                        </button>
                      </li>
                      {collections?.map((collection, index) => (
                        <li
                          className={`mb-4 ${
                            activeTab === collection?.name
                              ? " font-bold text-webriq-darkblue"
                              : "hover:text-webriq-blue"
                          }`}
                          key={index}
                        >
                          <button
                            className="text-lg"
                            type="button"
                            onClick={() => setActiveTab(collection?.name)}
                          >
                            {collection?.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="hidden lg:block w-1/4 px-3">
            <div className="mb-6 py-10 px-12 font-custom bg-gray-50">
              <h1 className="mb-8 text-2xl font-bold font-heading">Category</h1>
              {collections && (
                <ul>
                  <li
                    className={`mb-4 ${
                      activeTab === "All"
                        ? " font-bold text-webriq-darkblue"
                        : "hover:text-webriq-blue"
                    }`}
                  >
                    <button
                      className="text-lg"
                      type="button"
                      onClick={() => setActiveTab("All")}
                    >
                      All
                    </button>
                  </li>
                  {collections?.map((collection, index) => (
                    <li
                      className={`mb-4 ${
                        activeTab === collection?.name
                          ? " font-bold text-webriq-darkblue"
                          : "hover:text-webriq-blue"
                      }`}
                      key={index}
                    >
                      <button
                        className="text-lg"
                        type="button"
                        onClick={() => setActiveTab(collection?.name)}
                      >
                        {collection?.name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="w-full lg:w-3/4 px-3">
            {products && (
              <div className="flex flex-wrap -mx-3">
                {(activeTab !== "All" ? filteredProducts : products)?.map(
                  (product, index) => (
                    <div
                      className="w-full sm:w-1/2 md:w-1/3 px-3 mb-8"
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
                                  `product-image-${index + 1}`
                                }
                              />
                            ) : (
                              <img
                                className="mb-5 mx-auto h-56 w-full object-contain"
                                src="https://cdn.sanity.io/images/9itgab5x/production/b362a413487c075bc56646b996ffaf5b888b8fd1-1200x1063.png"
                                alt={
                                  product?.productPreview?.alt ??
                                  `product-image-${index + 1}`
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
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
export default memo(VariantB);
