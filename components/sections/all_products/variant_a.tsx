import { memo, useState, useEffect } from "react";
import { urlFor } from "lib/sanity";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { AllProductsProps } from ".";
import { Collection, CollectionProduct } from "types";
import { Container } from "@stackshift-ui/container";
import { Flex } from "@stackshift-ui/flex";
import { Heading } from "@stackshift-ui/heading";
import { Text } from "@stackshift-ui/text";

function VariantA({ products }: AllProductsProps) {
  // get Ecwid product details
  const [productQuery, setProductQuery] = useState("");
  const [selectInput, setSelectInput] = useState(products?.[0]?.name); // initial value will be the first option from the list of collections
  const router = useRouter();

  useEffect(() => {
    // temp: on first render always return to the search page
    router.push("/search", undefined, { shallow: true });
  }, []);

  // reads the param from the router object to get the query
  useEffect(() => {
    if (router.query.q && typeof router.query.q === "string") {
      setProductQuery(router.query.q);
    }
  }, [router.query.q]);

  // get selected input
  const handleSelectInput = (e) => {
    setSelectInput(e.target.value);
  };

  const displayProducts = getFinalProducts(products, productQuery, selectInput);

  return (
    <section className="py-20 bg-background">
      <Container>
        <Flex wrap align="center" justify="center" className="mb-5">
          <div className="w-full mb-12 lg:w-auto lg:px-4 xl:mb-0">
            <Heading>
              {productQuery &&
                `Showing ${displayProducts?.length} results for "${productQuery}"`}
            </Heading>
          </div>
          {!productQuery && products?.length > 1 && (
            <select
              className="p-4 text-lg bg-white border border-gray-400 rounded-md focus:border-primary-foreground focus:ring-primary-foreground"
              name="by-collection"
              value={selectInput}
              onChange={handleSelectInput}
            >
              <option value={selectInput}>{selectInput}</option>
              {products
                ?.filter((collection) => collection?.name !== selectInput)
                ?.map((collection, index) => (
                  <option value={collection?.name} key={index}>
                    {collection?.name}
                  </option>
                ))}
            </select>
          )}
        </Flex>
        {displayProducts && (
          <Flex wrap>
            <div className="w-full px-3">
              {displayProducts?.length !== 0 ? (
                <Flex wrap>
                  {displayProducts?.map((product, index) => (
                    <div
                      className="w-full px-3 mb-8 sm:w-1/2 lg:w-1/3 xl:w-1/4"
                      key={index}
                    >
                      <div className="mx-10">
                        <Link
                          className="block mt-6 mb-2 md:px-6"
                          href={`/products/${product?.slug?.current}`}
                        >
                          {product?.productInfo?.images ? (
                            <Image
                              className="object-contain w-full h-56 mx-auto mb-3 transition-all duration-700 hover:scale-110 sm:mb-5"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              src={urlFor(
                                product?.productInfo?.images?.[0]?.image
                              )}
                              width={350}
                              height={250}
                              alt={
                                product?.productInfo?.images?.[0]?.alt ??
                                `product-image-${index}`
                              }
                            />
                          ) : (
                            <Image
                              className="object-contain w-full h-56 mx-auto mb-3 transition-all duration-700 hover:scale-110 sm:mb-5"
                              src="https://cdn.sanity.io/images/9itgab5x/production/9523d40461371b7b4948456c57bb663bd8998c4a-500x362.png"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              width={350}
                              height={250}
                              alt={
                                product?.productInfo?.images?.[0]?.alt ??
                                `product-image-${index}`
                              }
                            />
                          )}
                          {product?.name && (
                            <Heading
                              type="h2"
                              className="mb-2 text-lg text-center sm:text-left sm:text-xl"
                            >
                              {product?.name}
                            </Heading>
                          )}
                          {product?.price && (
                            <Text
                              fontSize="lg"
                              weight="bold"
                              className="text-center sm:text-left text-primary"
                            >
                              ${product?.price}
                            </Text>
                          )}
                        </Link>
                      </div>
                    </div>
                  ))}
                </Flex>
              ) : (
                <div className="text-center">
                  <Image
                    className="object-contain mx-auto h-96 w-96"
                    src="https://cdn.sanity.io/images/9itgab5x/production/951b1f5f26048374711fa6800e0b542528240432-982x638.png"
                    width={384}
                    height={384}
                    alt="no-query-results"
                  />
                  <span className="mb-6 text-4xl font-bold text-primary">
                    Whoops!
                  </span>
                  <Text className="my-8 text-gray-700">
                    {`No results for query "${productQuery}". Kindly try another keyword.`}
                  </Text>
                </div>
              )}
            </div>
          </Flex>
        )}
      </Container>
    </section>
  );
}
export default memo(VariantA);

const getFinalProducts = (
  products: Collection[],
  productQuery: string | undefined,
  activeTab: string | undefined
): CollectionProduct[] => {
  if (productQuery) {
    const arr: CollectionProduct[] = products
      .flatMap((obj) => obj.products || [])
      .reduce((uniqueProducts, product) => {
        const duplicateIndex = uniqueProducts.findIndex(
          (p) => p.ecwidProductId === product.ecwidProductId
        );
        if (duplicateIndex === -1) {
          uniqueProducts.push(product);
        }
        return uniqueProducts;
      }, [])
      .filter((product) =>
        product.name.toLowerCase().includes(productQuery.toLowerCase())
      );
    return arr;
  } else {
    const arr =
      products && products?.filter((product) => product?.name === activeTab);
    return arr[0].products;
  }
};
