import { memo, useState, useEffect } from "react";
import { urlFor } from "lib/sanity";
import { sanityClient } from "lib/sanity.server";
import Link from "next/link";
import { useRouter } from "next/router";

function VariantB() {
  const [collections, setCollections] = useState([]); // get C-Studio collections pages
  const [products, setProducts] = useState([]); // get C-Studio products pages
  const [activeTab, setActiveTab] = useState("All");
  const [productQuery, setProductQuery] = useState("");
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

      if (q) {
        setProductQuery(q);
      }
    }
  }, [router.query.q]);

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

  // filtered products array based on active collection tab
  const filterProductsByCollection =
    products &&
    products?.filter((product) => product?.collections?.name === activeTab);

  // filtered products array based on search query input
  const filterProductsByQuery =
    products &&
    products?.filter((product) =>
      product?.name?.toLowerCase()?.includes(productQuery?.toLowerCase())
    );

  // set products array to display based on conditions met
  let displayProducts = products;

  // set array to display
  if (!productQuery) {
    if (activeTab !== "All") {
      displayProducts = filterProductsByCollection;
    }
  } else {
    displayProducts = filterProductsByQuery;
  }

  return (
    <section className="pt-20">
      <div className="container mx-auto px-4 bg-white">
        <div className="flex flex-wrap -mx-3 mb-24">
          {!productQuery && (
            <div className="block w-full sm:w-1/3 lg:w-1/4 px-3">
              <div className="lg:mb-6 py-5 lg:py-10 px-6 lg:px-12 font-custom bg-gray-50">
                <h1 className="mb-8 text-2xl font-bold font-heading">
                  Category
                </h1>
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
                        className="lg:text-lg"
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
                          className="lg:text-lg"
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
          )}
          {products && (
            <div className={`w-full ${!productQuery && "lg:w-3/4"} px-3`}>
              {productQuery && (
                <h1 className="text-4xl font-bold font-heading">
                  {`Search results for "${productQuery}"`}
                </h1>
              )}
              {displayProducts?.length !== 0 ? (
                <div className="flex flex-wrap -mx-3">
                  {displayProducts?.map((product, index) => (
                    <div
                      className={`w-full sm:w-1/2 ${
                        !productQuery ? "md:w-1/3" : "md:w-1/4"
                      } px-3 mb-8`}
                      key={index}
                    >
                      <div className="p-6">
                        <Link href={`/products/${product?.slug?.current}`}>
                          <a className="block px-6 mt-6 mb-2 text-center">
                            {product?.productPreview?.image ? (
                              <img
                                className="mb-5 mx-auto h-56 w-full object-contain hover:scale-110 transition-all duration-700"
                                src={urlFor(product?.productPreview?.image)}
                                alt={
                                  product?.productPreview?.alt ??
                                  `product-image-${index + 1}`
                                }
                              />
                            ) : (
                              <img
                                className="mb-5 mx-auto h-56 w-full object-contain hover:scale-110 transition-all duration-700"
                                src="https://cdn.sanity.io/images/9itgab5x/production/b362a413487c075bc56646b996ffaf5b888b8fd1-1200x1063.png"
                                alt={
                                  product?.productPreview?.alt ??
                                  `product-image-${index + 1}`
                                }
                              />
                            )}
                            {product?.name && (
                              <h2 className="mb-2 text-xl font-heading">
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
                  ))}
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
          )}
        </div>
      </div>
    </section>
  );
}
export default memo(VariantB);
