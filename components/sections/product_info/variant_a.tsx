import { Fragment, memo, useState } from "react";
import { urlFor, PortableText } from "lib/sanity";
import Image from "next/image";
import ProductDetail from "components/ecwid/ProductDetail";
import AddToBag from "components/ecwid/AddToBag";
import AddToWishlist from "components/ecwid/AddToWishlist";
import Ribbon from "components/ecwid/Ribbon";
//import Description from "components/ecwid/Description";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Pagination, A11y } from "swiper/modules";
import { ProductInfoProps } from ".";
import { MyPortableTextComponents } from "types";
import { Container } from "@stackshift-ui/container";
import { Flex } from "@stackshift-ui/flex";
import { Text } from "@stackshift-ui/text";
import { Heading } from "@stackshift-ui/heading";
import { Button } from "@stackshift-ui/button";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";
import "swiper/css/a11y";

function VariantA({
  subtitle,
  images,
  productDetails,
  btnLabel,
  product,
  socialLinks,
  ecwidProduct,
  getPriceDisplay,
}: ProductInfoProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  // get Ecwid product details
  const defaultProduct = ecwidProduct ? ecwidProduct : product;
  const buttonLabel = btnLabel ? btnLabel : "Add to cart";

  // block styling as props to `serializers` of the PortableText component
  const blockStyle: MyPortableTextComponents = {
    block: {
      h1: ({ children }) => {
        return (
          <Heading weight="bold" className="mb-8 leading-loose text-7xl">
            {children}
          </Heading>
        );
      },
      h2: ({ children }) => {
        return (
          <Heading
            type="h2"
            weight="bold"
            className="mb-8 leading-loose text-5xl"
          >
            {children}
          </Heading>
        );
      },
      h3: ({ children }) => {
        return (
          <Heading
            type="h3"
            weight="bold"
            fontSize="3xl"
            className="mb-8 leading-loose"
          >
            {children}
          </Heading>
        );
      },
      h4: ({ children }) => {
        return (
          <Heading
            type="h4"
            weight="bold"
            fontSize="xl"
            className="mb-6 leading-loose"
          >
            {children}
          </Heading>
        );
      },
      normal: ({ children }) => {
        return <Text muted>{children}</Text>;
      },
      blockquote: ({ children }) => {
        return (
          <blockquote className="mb-6 italic leading-loose text-gray-500 px-14">
            - {children}
          </blockquote>
        );
      },
    },
    list: {
      bullet: ({ children }) => {
        return (
          <ul className="pl-10 mb-6 leading-loose text-gray-900 list-disc">
            {children}
          </ul>
        );
      },
      number: ({ children }) => {
        return (
          <ol className="mb-6 leading-loose text-gray-900 list-decimal">
            {children}
          </ol>
        );
      },
    },
    listItem: {
      bullet: ({ children }) => (
        <li className="mb-6 leading-loose text-gray-900">{children}</li>
      ),
    },
    marks: {
      strong: ({ children }) => <strong>{children}</strong>,
      em: ({ children }) => <em>{children}</em>,
      code: ({ children }) => <code>{children}</code>,
      link: ({ children, value }) => (
        <a
          aria-label={value.href ?? "external link"}
          className="text-primary-foreground hover:text-secondary-foreground"
          href={value.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      ),
    },
  };

  return (
    <section className="sm:p-12 md:p-20 bg-background">
      <Container>
        <Flex wrap className="mb-5 ">
          <div className="w-full px-4 mb-8 mt-14 md:mb-0 lg:w-1/2">
            <div className="relative mb-10">
              <Swiper
                navigation={{
                  prevEl: "#piprev",
                  nextEl: "#pinext",
                }}
                modules={[Thumbs, Navigation, Pagination, A11y]}
                spaceBetween={20}
                slidesPerView={1}
                loop={images?.length > 1 ? true : false}
                speed={500}
                watchSlidesProgress={images?.length > 1 ? true : false}
                thumbs={{ swiper: thumbsSwiper }}
                style={{ height: "618px" }}
              >
                {images &&
                  images?.map((item, index) => (
                    <SwiperSlide key={index}>
                      <div className="h-full">
                        <Image
                          sizes="100vw"
                          fill
                          quality={100}
                          src={urlFor(item?.image)}
                          style={{
                            objectFit: "cover",
                            objectPosition: "center",
                          }}
                          alt={item?.alt ?? `product-image-${index + 1}`}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
              <Swiper
                modules={[Thumbs, Navigation, Pagination, A11y]}
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={images?.length > 1 ? true : false}
                navigation={{
                  prevEl: "#thumbPrev",
                  nextEl: "#thumbNext",
                }}
                className="hidden md:-mx-2 md:flex md:flex-wrap mt-3"
                pagination={{
                  clickable: true,
                }}
              >
                {images &&
                  images?.map((item, index) => (
                    <SwiperSlide className="w-1/4" key={index}>
                      {item?.image && (
                        <Image
                          className="flex h-[147px] object-cover hover:border hover:border-gray-400"
                          sizes="100vw"
                          width={170}
                          height={128}
                          src={urlFor(item?.image)}
                          alt={item?.alt ?? `product-image-${index + 1}`}
                        />
                      )}
                    </SwiperSlide>
                  ))}
              </Swiper>
              <div className="mt-5">
                <button
                  id="piprev"
                  className="absolute left-0 top-60 z-40 ml-5 rounded-l-md rounded-r-sm px-2 py-5 transition duration-200 hover:bg-gray-50 hover:opacity-50"
                >
                  <svg
                    width={36}
                    height={36}
                    viewBox="0 0 10 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 16.0185C9.268 16.2905 9.268 16.7275 9 16.9975C8.732 17.2675 8.299 17.2685 8.031 16.9975L0.201 9.0895C-0.067 8.8195 -0.067 8.3825 0.201 8.1105L8.031 0.2025C8.299 -0.0675 8.732 -0.0675 9 0.2025C9.268 0.4735 9.268 0.9115 9 1.1815L1.859 8.6005L9 16.0185Z"
                      fill="#0045d8"
                    />
                  </svg>
                </button>
                <button
                  id="pinext"
                  className="absolute right-0 top-60 z-40 mr-5 rounded-l-sm rounded-r-md px-2 py-5 transition duration-200 hover:bg-gray-50 hover:opacity-50"
                >
                  <svg
                    width={36}
                    height={36}
                    viewBox="0 0 10 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.19922 1.1817C-0.0687795 0.909696 -0.0687794 0.472695 0.19922 0.202695C0.46722 -0.0673054 0.90022 -0.0683048 1.16822 0.202695L8.99822 8.11069C9.26622 8.3807 9.26622 8.81769 8.99822 9.08969L1.16822 16.9977C0.900219 17.2677 0.467218 17.2677 0.199219 16.9977C-0.0687809 16.7267 -0.0687808 16.2887 0.199219 16.0187L7.34022 8.5997L0.19922 1.1817Z"
                      fill="#0045d8"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="w-full px-4 lg:w-1/2">
            <div className="lg:px-10">
              <div className="pb-10 border-b">
                {ecwidProduct && product?.ecwidProductId && (
                  <div className="mb-3">
                    <Ribbon data={ecwidProduct} />
                  </div>
                )}
                {subtitle && (
                  <Text weight="bold" className="text-primary">
                    {subtitle}
                  </Text>
                )}
                {product?.name && (
                  <Heading
                    weight="bold"
                    className="mt-2 mb-6 text-5xl md:text-6xl lg:max-w-xl"
                  >
                    {product?.name}
                  </Heading>
                )}
                <div className="mb-8">{/* Ratings from Ecwid */}</div>
                {/* Product price */}
                {product?.price && (
                  <Text
                    weight="bold"
                    fontSize="2xl"
                    className={` text-primary inline-block ${
                      !ecwidProduct?.compareToPrice && "mb-8"
                    }`}
                  >
                    {/* Product price from Ecwid */}
                    {ecwidProduct
                      ? getPriceDisplay()
                      : ecwidProduct?.defaultDisplayedPriceFormatted
                      ? ecwidProduct?.defaultDisplayedPriceFormatted
                      : product?.price}
                  </Text>
                )}
                {/* "CompareTo" price */}
                {ecwidProduct?.compareToPrice && (
                  <p
                    className="mt-3 mb-8"
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
                      {`Save ${ecwidProduct?.compareToPriceDiscountPercentFormatted}`}
                    </span>
                    )
                  </p>
                )}

                {/* <Description data={product} /> */}
                {product?.description && (
                  <PortableText
                    value={product?.description}
                    components={blockStyle}
                    onMissingComponent={false} // Disabling warnings / handling unknown types
                  />
                )}
              </div>

              {product?.ecwidProductId && ecwidProduct && (
                <ProductDetail product={defaultProduct}>
                  <div className="flex flex-row items-start gap-4 my-8">
                    {buttonLabel && ecwidProduct?.inStock && (
                      <div className="w-full lg:mb-4 xl:mb-0">
                        <AddToBag
                          inStock={!ecwidProduct?.inStock}
                          classNames="block w-full py-5 px-8 cursor-pointer uppercase"
                        >
                          {buttonLabel}
                        </AddToBag>
                      </div>
                    )}

                    {/* Add to wishlist button */}
                    <AddToWishlist
                      classNames="ml-auto sm:ml-0 flex-shrink-0 inline-flex items-center justify-center w-full h-16 rounded-md border hover:border-primary"
                      product={defaultProduct}
                    >
                      <svg
                        className="w-6 h-6"
                        width={27}
                        height={27}
                        viewBox="0 0 27 27"
                        fill="inherit"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.4993 26.2061L4.70067 16.9253C3.9281 16.1443 3.41815 15.1374 3.24307 14.0471C3.06798 12.9568 3.23664 11.8385 3.72514 10.8505V10.8505C4.09415 10.1046 4.63318 9.45803 5.29779 8.96406C5.96241 8.47008 6.73359 8.14284 7.54782 8.00931C8.36204 7.87578 9.19599 7.93978 9.98095 8.19603C10.7659 8.45228 11.4794 8.89345 12.0627 9.48319L13.4993 10.9358L14.9359 9.48319C15.5192 8.89345 16.2327 8.45228 17.0177 8.19603C17.8026 7.93978 18.6366 7.87578 19.4508 8.00931C20.265 8.14284 21.0362 8.47008 21.7008 8.96406C22.3654 9.45803 22.9045 10.1046 23.2735 10.8505V10.8505C23.762 11.8385 23.9306 12.9568 23.7556 14.0471C23.5805 15.1374 23.0705 16.1443 22.298 16.9253L13.4993 26.2061Z"
                          //stroke="black"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </AddToWishlist>
                  </div>
                </ProductDetail>
              )}

              {socialLinks && (
                <div className="flex items-center mt-4">
                  <span className="mr-8 font-bold uppercase font-heading">
                    SHARE IT
                  </span>
                  {socialLinks?.map(
                    (social, index) =>
                      social?.socialMediaLink && (
                        <a
                          aria-label={
                            social?.socialMedia || social?.socialMediaPlatform
                          }
                          className="w-8 h-8 mr-1 flex items-center justify-center"
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
                </div>
              )}
            </div>
          </div>
        </Flex>
        {productDetails && (
          <div>
            <Flex as="ul" wrap className="mb-16 border-b-2">
              {productDetails?.map((details, index) => (
                <li className="w-1/2 md:w-auto" key={index}>
                  <Button
                    variant="unstyled"
                    as="button"
                    ariaLabel="Current Image"
                    className={`font-heading inline-block px-7 py-6 font-bold lg:px-10 ${
                      activeTab === index
                        ? "bg-white text-primary shadow-2xl"
                        : "text-gray-500 hover:shadow-2xl"
                    }`}
                    onClick={() => setActiveTab(index)}
                    type="button"
                  >
                    {details?.tabName}
                  </Button>
                </li>
              ))}
            </Flex>
            {productDetails?.[activeTab]?.contentType !== "textOnly" ? (
              <div className="flex flex-wrap gap-x-5">
                {productDetails?.[activeTab]?.media &&
                productDetails?.[activeTab]?.media === "imageArray" ? (
                  <Fragment>
                    {productDetails?.[activeTab]?.images &&
                      productDetails?.[activeTab]?.images?.map(
                        (item, index) => (
                          <div className="w-1/4 h-full" key={index}>
                            {item?.image && (
                              <Image
                                className="object-cover"
                                sizes="100vw"
                                width={250}
                                height={128}
                                src={urlFor(item?.image)}
                                alt={item?.alt ?? `product-image-${index + 1}`}
                              />
                            )}
                          </div>
                        )
                      )}
                  </Fragment>
                ) : (
                  <div className="aspect-video">
                    <iframe
                      width={635}
                      height={357}
                      loading="lazy"
                      src={productDetails?.[activeTab]?.url}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}
                {productDetails?.[activeTab]?.blockContent && (
                  <PortableText
                    value={productDetails?.[activeTab]?.blockContent}
                    components={blockStyle}
                    onMissingComponent={false} // Disabling warnings / handling unknown types
                  />
                )}
              </div>
            ) : (
              productDetails?.[activeTab]?.blockContent && (
                <PortableText
                  value={productDetails?.[activeTab]?.blockContent}
                  components={blockStyle}
                  onMissingComponent={false} // Disabling warnings / handling unknown types
                />
              )
            )}
            {/* @TO DO: ADD VALUE SOURCE FOR CUSTOMER REVIEWS HERE */}
          </div>
        )}
      </Container>
    </section>
  );
}
export default memo(VariantA);
