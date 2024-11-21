import { memo, useEffect } from "react";
import { urlFor, PortableText } from "lib/sanity";
import Image from "next/image";
import AddToBag from "components/ecwid/AddToBag";
import AddToWishlist from "components/ecwid/AddToWishlist";
import Ribbon from "components/ecwid/Ribbon";
import ProductDetail from "components/ecwid/ProductDetail";
import { useEcwid } from "context/EcwidContext";
import { defaultBlockStyle } from "helper";
import { PagesProductInfoProps } from ".";
import { Container } from "@stackshift-ui/container";
import { Flex } from "@stackshift-ui/flex";
import { Heading } from "@stackshift-ui/heading";
import { Text } from "@stackshift-ui/text";

function VariantB({ products }: PagesProductInfoProps) {
  const ecwid = useEcwid();

  const ecwidProduct = ecwid?.products;

  useEffect(() => {
    if (products?.ecwidProductId) {
      ecwid.setId(products.ecwidProductId);
    }
  }, [ecwid, products?.ecwidProductId]);

  return (
    <section className="sm:p-10 md:p-20 bg-background">
      <Container>
        {products && (
          <Flex wrap>
            <div className="w-full px-4 mb-8 md:mb-0 md:w-1/2">
              <Flex wrap>
                <div className="px-5 md:w-full">
                  <div className="relative">
                    {products?.productInfo?.images ? (
                      <div className="w-full h-full">
                        <Image
                          sizes="(min-width: 1840px) 704px, (min-width: 1540px) calc(27.86vw + 197px), (min-width: 1320px) calc(30vw + 120px), (min-width: 1260px) calc(145vw - 1379px), (min-width: 1040px) 36vw, (min-width: 980px) 320px, (min-width: 780px) calc(41.11vw - 75px), (min-width: 640px) calc(66.67vw + 69px), calc(100vw - 64px)"
                          width={736}
                          height={564}
                          src={urlFor(
                            products?.productInfo?.images?.[0]?.image
                          )}
                          style={{
                            objectFit: "cover",
                          }}
                          alt={
                            products?.productInfo?.images?.[0]?.alt ??
                            "product-info-main-image"
                          }
                        />
                      </div>
                    ) : (
                      <Image
                        className="object-cover"
                        sizes="(min-width: 1840px) 704px, (min-width: 1540px) calc(27.86vw + 197px), (min-width: 1320px) calc(30vw + 120px), (min-width: 1260px) calc(145vw - 1379px), (min-width: 1040px) 36vw, (min-width: 980px) 320px, (min-width: 780px) calc(41.11vw - 75px), (min-width: 640px) calc(66.67vw + 69px), calc(100vw - 64px)"
                        width={736}
                        height={564}
                        src="https://cdn.sanity.io/images/9itgab5x/production/9523d40461371b7b4948456c57bb663bd8998c4a-500x362.png"
                        alt="default image for product"
                      />
                    )}
                  </div>
                </div>
                <div className="px-5 mt-8 mr-auto">
                  <Flex wrap align="center">
                    <span className="mr-8 font-bold uppercase font-heading">
                      SHARE IT
                    </span>
                    {products?.productInfo?.socialLinks?.map(
                      (social, index) =>
                        social?.socialMediaLink && (
                          <a
                            aria-label={
                              social?.socialMedia || social?.socialMediaPlatform
                            }
                            className="w-8 h-8 mr-2 flex items-center justify-center"
                            target="_blank"
                            rel="noopener noreferrer"
                            href={social?.socialMediaLink}
                            key={index}
                          >
                            {social?.socialMedia === "facebook" ? (
                              <svg
                                className=""
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fill="#0045d8"
                                  d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
                                />
                              </svg>
                            ) : social?.socialMedia === "twitter" ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fill="#0045d8"
                                  d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                                />
                              </svg>
                            ) : social?.socialMedia === "instagram" ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fill="#0045d8"
                                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                                />
                              </svg>
                            ) : (
                              social?.socialMediaIcon?.image && (
                                <Image
                                  src={urlFor(social?.socialMediaIcon?.image)}
                                  width={32}
                                  height={32}
                                  quality={100}
                                  alt={
                                    social?.socialMediaIcon?.alt ??
                                    "contact-socialMedia-icon"
                                  }
                                />
                              )
                            )}
                          </a>
                        )
                    )}
                  </Flex>
                </div>
              </Flex>
            </div>
            <div className="w-full px-4 md:w-1/2">
              <div>
                <div className="pb-10 mb-10 border-b">
                  {products?.ecwidProductId && (
                    <div className="mb-3">
                      <Ribbon data={ecwidProduct} />
                    </div>
                  )}
                  {products?.name && (
                    <Heading
                      weight="bold"
                      className="max-w-xl mt-2 mb-6 text-5xl md:text-6xl"
                    >
                      {products?.name}
                    </Heading>
                  )}
                  <div className="mb-8">{/* Add product rating here */}</div>
                  {products?.price && (
                    <Text
                      weight="bold"
                      fontSize="2xl"
                      className={`inline-blockd text-primary ${
                        !products?.compareToPrice && "mb-8"
                      }`}
                    >
                      {(ecwid &&
                        ecwid?.products?.defaultDisplayedPriceFormatted) ||
                        ecwid?.getPriceDisplay(products?.price)}
                    </Text>
                  )}
                  {products?.compareToPrice && (
                    <Text
                      muted
                      className="mt-3 mb-8 "
                      style={{
                        fontSize: "15px",
                      }}
                    >
                      Before{" "}
                      <span className="line-through">
                        {ecwidProduct?.compareToPriceFormatted}
                      </span>{" "}
                      (
                      <span
                        className="text-secondary"
                        style={{ fontSize: "15px" }}
                      >
                        Save{" "}
                        {ecwidProduct?.compareToPriceDiscountPercentFormatted}
                      </span>
                      )
                    </Text>
                  )}
                  {products?.description && (
                    // <p
                    //   dangerouslySetInnerHTML={{
                    //     __html: products?.description,
                    //   }}
                    // />
                    <PortableText
                      value={products?.description}
                      components={defaultBlockStyle}
                      onMissingComponent={false} // Disabling warnings / handling unknown types
                    />
                  )}
                </div>

                <ProductDetail product={ecwidProduct}>
                  <Flex align="center" gap={4} className="my-8 flex-col lg:flex-row">
                    <div className="w-full lg:mb-4 xl:mb-0">
                      <AddToBag
                        inStock={!ecwidProduct?.inStock}
                        classNames="block w-full py-5 px-8 cursor-pointer uppercase"
                      >
                        {products?.productInfo?.btnLabel ?? "ADD TO CART"}
                      </AddToBag>
                    </div>
                    <AddToWishlist
                      classNames="w-full items-center justify-center rounded-md border hover:border-primary"
                      product={ecwidProduct}
                      containerClass="w-full"
                    >
                      <span className="font-bold uppercase">
                        Add to wishlist
                      </span>
                    </AddToWishlist>
                  </Flex>
                </ProductDetail>
              </div>
            </div>
          </Flex>
        )}
      </Container>
    </section>
  );
}
export default memo(VariantB);
