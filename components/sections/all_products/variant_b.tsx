import { memo, useState, useEffect } from "react";
import { urlFor } from "lib/sanity";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { Collection, CollectionProduct } from "types";
import { AllProductsProps } from ".";
import { Container } from "components/layout/Container";
import { Flex } from "components/layout/Flex/Flex";
import { Heading } from "components/ui/Heading";
import { Text } from "components/ui/Text";
import { Button } from "components/ui/Button";

function VariantB({ products }: AllProductsProps) {
  const [productQuery, setProductQuery] = useState("");
  const [activeTab, setActiveTab] = useState(products?.[0]?.name); // initial value will be the first option from the list of collections

  const router = useRouter();

  useEffect(() => {
    // temp: on first render always return to the search page
    router.push("/search", undefined, { shallow: true });
  }, []);

  // reads the param from the router object to get the query
  useEffect(() => {
    if (router.query.q && typeof router.query.q == "string") {
      setProductQuery(router.query.q);
    }
  }, [router.query.q]);

  // set products array to display based on conditions met
  const displayProducts = getFinalProducts(products, productQuery, activeTab);

  return (
    <section className="pt-20 bg-white">
      <Container>
        <Flex wrap className="mb-24 ">
          {!productQuery && (
            <div className="block w-full px-3 sm:w-1/3 lg:w-1/4">
              <div className="px-6 py-5 lg:mb-6 lg:py-10 lg:px-12 font-custom bg-gray-50">
                <Heading fontSize="2xl" className="mb-8 ">
                  Category
                </Heading>
                {products && (
                  <ul>
                    {products?.map((collection, index) => (
                      <li
                        className={`mb-4 ${
                          activeTab === collection?.name
                            ? " font-bold text-primary"
                            : "hover:text-primary-foreground"
                        }`}
                        key={index}
                      >
                        <Button
                          as="button"
                          variant="link"
                          ariaLabel="Change Active Tab"
                          className="no-underline lg:text-lg"
                          type="button"
                          onClick={() => setActiveTab(collection?.name)}
                        >
                          {collection?.name}
                        </Button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
          {displayProducts && (
            <div className={`w-full ${!productQuery && "lg:w-3/4"} px-3`}>
              {productQuery && (
                <Heading>
                  {`Showing ${displayProducts?.length} results for "${productQuery}"`}
                </Heading>
              )}
              {displayProducts?.length !== 0 ? (
                <Flex wrap>
                  {displayProducts?.map((product, index) => (
                    <div
                      className={`w-full sm:w-1/2 ${
                        !productQuery ? "md:w-1/3" : "md:w-1/4"
                      } px-3 mb-8`}
                      key={index}
                    >
                      <div className="p-6">
                        <Link
                          className="block px-6 mt-6 mb-2 text-center"
                          href={`/products/${product?.slug?.current}`}
                        >
                          {product?.productInfo?.images ? (
                            <Image
                              className="object-contain w-full h-56 mx-auto mb-5 transition-all duration-700 hover:scale-110"
                              src={urlFor(
                                product?.productInfo?.images?.[0]?.image
                              )}
                              width={350}
                              height={250}
                              alt={
                                product?.productInfo?.images?.[0]?.alt ??
                                `product-image-${index + 1}`
                              }
                            />
                          ) : (
                            <Image
                              className="object-contain w-full h-56 mx-auto mb-5 transition-all duration-700 hover:scale-110"
                              src="https://cdn.sanity.io/images/9itgab5x/production/9523d40461371b7b4948456c57bb663bd8998c4a-500x362.png"
                              width={350}
                              height={250}
                              alt={
                                product?.productInfo?.images?.[0]?.alt ??
                                `product-image-${index + 1}`
                              }
                            />
                          )}
                          {product?.name && (
                            <Heading type="h2" fontSize="xl" className="mb-2">
                              {product?.name}
                            </Heading>
                          )}
                          {product?.price && (
                            <Text
                              fontSize="lg"
                              weight="bold"
                              className="text-primary"
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
                    className="object-contain mx-auto w-96 h-96"
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
          )}
        </Flex>
      </Container>
    </section>
  );
}
export default memo(VariantB);

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
