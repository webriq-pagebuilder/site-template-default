import { memo, useState, Fragment } from "react";
import { urlFor, PortableText } from "lib/sanity";
import Image from "next/image";
import Link from "next/link";
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
import { Heading } from "@stackshift-ui/heading";
import { Text } from "@stackshift-ui/text";
import { Button } from "@stackshift-ui/button";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";
import "swiper/css/a11y";

function VariantB({
  subtitle,
  images,
  productDetails,
  btnLabel,
  product,
  socialLinks,
  ecwidProduct,
  getPriceDisplay,
}: ProductInfoProps) {
  // get Ecwid product details
  const defaultProduct = ecwidProduct ? ecwidProduct : product;
  const buttonLabel = btnLabel ? btnLabel : "Add to cart";

  // block styling as props to `serializers` of the PortableText component
  const blockStyle: MyPortableTextComponents = {
    block: {
      h1: ({ children }) => {
        return (
          <Heading weight="bold" className="mt-6 leading-loose text-7xl">
            {children}
          </Heading>
        );
      },
      h2: ({ children }) => {
        return (
          <Heading
            type="h2"
            weight="bold"
            className="mt-6 leading-loose text-5xl"
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
            className="mt-6 leading-loose "
          >
            {children}
          </Heading>
        );
      },
      h4: ({ children }) => {
        return (
          <Heading
            weight="bold"
            type="h4"
            fontSize="xl"
            className="mt-6 leading-loose"
          >
            {children}
          </Heading>
        );
      },
      normal: ({ children }) => {
        return (
          <Text muted className="max-w-2xl my-6">
            {children}
          </Text>
        );
      },
      blockquote: ({ children }) => {
        return (
          <blockquote className="mt-6 italic leading-loose text-gray-500 px-14">
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

  const [activeTab, setActiveTab] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <section className="sm:p-12 md:p-20 bg-background">
      <Container>
        <div className=" xl:flex xl:flex-wrap">
          <div className="w-full px-4">
            <Flex as="ul" wrap align="center" className="items-center mb-8 ">
              <li className="mr-5">
                <Link
                  className="inline-block mr-5 text-xs font-bold uppercase font-heading"
                  href="/"
                >
                  HOME
                </Link>
                <span className="inline-block">
                  <svg
                    width={6}
                    height={11}
                    viewBox="0 0 6 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.131073 0.755835C-0.0436907 0.581885 -0.0436907 0.302414 0.131073 0.129744C0.305837 -0.0429273 0.588197 -0.0435662 0.76296 0.129744L5.86893 5.18707C6.04369 5.35975 6.04369 5.63922 5.86893 5.81317L0.762959 10.8705C0.588196 11.0432 0.305836 11.0432 0.131072 10.8705C-0.0436916 10.6972 -0.0436916 10.4171 0.131072 10.2444L4.78774 5.4998L0.131073 0.755835Z"
                      fill="#151515"
                    />
                  </svg>
                </span>
              </li>
              <li>
                {product?.name && (
                  <Text
                    fontSize="xs"
                    weight="bold"
                    className="inline-block uppercase "
                  >
                    {product?.name}
                  </Text>
                )}
              </li>
            </Flex>
          </div>
          <div className="w-full px-4 mb-8 xl:mb-0 xl:w-1/2">
            <Flex gap={3} className="relative">
              <Swiper
                modules={[Thumbs, Navigation, Pagination, A11y]}
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={images?.length > 1 ? true : false}
                direction="vertical"
                navigation={{
                  prevEl: "#thumbPrevB",
                  nextEl: "#thumbNextB",
                }}
                className="hidden w-40 thumb-swiper-B md:flex md:flex-wrap"
                style={{ height: "618px" }}
              >
                {images &&
                  images?.map((item, index) => (
                    <SwiperSlide
                      className="h-full hover:border hover:border-gray-400"
                      key={index}
                    >
                      <div className="h-full">
                        {item?.image && (
                          <Image
                            className="object-cover"
                            src={urlFor(item?.image)}
                            alt={item?.alt}
                            fill
                          />
                        )}
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
              <Swiper
                navigation={{
                  prevEl: "#piprevB",
                  nextEl: "#pinextB",
                }}
                modules={[Thumbs, Navigation, Pagination, A11y]}
                spaceBetween={20}
                slidesPerView={1}
                speed={500}
                loop={images?.length > 1 ? true : false}
                watchSlidesProgress={images?.length > 1 ? true : false}
                thumbs={{ swiper: thumbsSwiper }}
                className="w-full"
              >
                {images &&
                  images?.map((item, index) => (
                    <SwiperSlide key={index}>
                      <div className="w-3/4 h-full mx-auto xl:mx-0 xl:w-full">
                        <Image
                          className="object-cover"
                          sizes="100vw"
                          width={593}
                          height={611}
                          src={urlFor(item?.image)}
                          alt={item?.alt}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
              <div className="mt-5">
                <button
                  id="piprevB"
                  className="absolute left-0 top-60 z-40 ml-5 rounded-l-md rounded-r-sm px-2 py-5 transition duration-200 hover:bg-gray-50 hover:opacity-50 md:left-32"
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
                  id="pinextB"
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
            </Flex>
            <div className="w-full mt-12 ml-auto lg:w-3/4">
              {socialLinks && (
                <Flex align="center">
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
                              <img
                                src={urlFor(social?.socialMediaIcon?.image)}
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
              )}
            </div>
          </div>
          <div className="w-full px-4 pt-20 xl:w-1/2 xl:pt-0">
            <div>
              <div className="pb-10 mb-10 border-b">
                {product?.ecwidProductId && (
                  <div className="mb-3">
                    <Ribbon data={ecwidProduct} />
                  </div>
                )}

                {subtitle && (
                  <span className="font-bold font-custom text-primary">
                    {subtitle}
                  </span>
                )}

                {product?.name && (
                  <Heading className="max-w-xl mt-2 mb-6 text-5xl md:text-6xl">
                    {product?.name}
                  </Heading>
                )}

                <div className="mb-8">
                  {/* TO DO: ADD PRODUCT RATING HERE */}
                </div>

                {/* PRICING HERE */}
                {product?.price && (
                  <p
                    className={`font-heading text-primary inline-block text-2xl font-bold ${
                      !ecwidProduct?.compareToPrice && "mb-8"
                    }`}
                  >
                    {ecwidProduct
                      ? getPriceDisplay()
                      : ecwidProduct?.defaultDisplayedPriceFormatted
                      ? ecwidProduct?.defaultDisplayedPriceFormatted
                      : product?.price}
                  </p>
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
                  <div className="flex flex-col items-start mt-8 gap-y-4 sm:flex-row sm:gap-x-4 sm:gap-y-0">
                    {buttonLabel && ecwidProduct?.inStock && (
                      <div className="w-full lg:mb-4 xl:mb-0">
                        <AddToBag
                          inStock={!ecwidProduct?.inStock}
                          classNames="block w-full py-5 px-8  cursor-pointer uppercase"
                        >
                          {buttonLabel}
                        </AddToBag>
                      </div>
                    )}
                    <AddToWishlist
                      classNames="w-full flex-shrink-0 flex flex-wrap items-center justify-center py-5 px-8 rounded-md border hover:border-primary bg-white text-primary"
                      product={defaultProduct}
                      containerClass="w-full"
                    >
                      <svg
                        className="mr-2 -mt-1"
                        width={27}
                        height={27}
                        viewBox="0 0 27 27"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.4993 26.2061L4.70067 16.9253C3.9281 16.1443 3.41815 15.1374 3.24307 14.0471C3.06798 12.9568 3.23664 11.8385 3.72514 10.8505V10.8505C4.09415 10.1046 4.63318 9.45803 5.29779 8.96406C5.96241 8.47008 6.73359 8.14284 7.54782 8.00931C8.36204 7.87578 9.19599 7.93978 9.98095 8.19603C10.7659 8.45228 11.4794 8.89345 12.0627 9.48319L13.4993 10.9358L14.9359 9.48319C15.5192 8.89345 16.2327 8.45228 17.0177 8.19603C17.8026 7.93978 18.6366 7.87578 19.4508 8.00931C20.265 8.14284 21.0362 8.47008 21.7008 8.96406C22.3654 9.45803 22.9045 10.1046 23.2735 10.8505V10.8505C23.762 11.8385 23.9306 12.9568 23.7556 14.0471C23.5805 15.1374 23.0705 16.1443 22.298 16.9253L13.4993 26.2061Z"
                          stroke="black"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="font-bold uppercase font-heading">
                        Add to wishlist
                      </span>
                    </AddToWishlist>
                  </div>
                </ProductDetail>
              )}

              {productDetails && (
                <div className="mt-10">
                  {productDetails?.map((details, index) => (
                    <Fragment key={index}>
                      <Flex
                        align="center"
                        justify="between"
                        className={` px-3 py-6 hover:bg-secondary-foreground ${
                          index !== productDetails?.length - 1 && "border-b"
                        }`}
                        onClick={() =>
                          activeTab !== index
                            ? setActiveTab(index)
                            : setActiveTab(null)
                        }
                      >
                        <Text
                          weight="bold"
                          fontSize="xl"
                          className={` ${
                            activeTab === index && "text-primary"
                          }`}
                        >
                          {details?.tabName}
                        </Text>
                        <Button
                          variant="unstyled"
                          as="button"
                          ariaLabel=""
                          className="inline-flex items-center justify-center w-12 h-12 text-black border rounded-md hover:border-gray-500"
                          type="button"
                        >
                          <svg
                            width={12}
                            height={12}
                            viewBox="0 0 12 12"
                            fill="#161616"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            {activeTab !== index && (
                              <rect
                                x={5}
                                width={2}
                                height={12}
                                fill="#161616"
                              />
                            )}
                            <rect
                              x={12}
                              y={5}
                              width={2}
                              height={12}
                              transform="rotate(90 12 5)"
                              fill="#161616"
                            />
                          </svg>
                        </Button>
                      </Flex>
                      {productDetails?.[activeTab]?.contentType && (
                        <div
                          className={`${
                            activeTab === index ? "h-auto lg:h-52" : "hidden"
                          }`}
                        >
                          {productDetails?.[activeTab]?.contentType !==
                          "textOnly" ? (
                            <div className="flex flex-wrap gap-x-5">
                              {productDetails?.[activeTab]?.media &&
                              productDetails?.[activeTab]?.media ===
                                "imageArray" ? (
                                <Fragment>
                                  {productDetails?.[activeTab]?.images &&
                                    productDetails?.[activeTab]?.images?.map(
                                      (item, index) => (
                                        <div
                                          className="w-1/4 h-full mt-5"
                                          key={index}
                                        >
                                          {item?.image && (
                                            <Image
                                              className="object-cover"
                                              sizes="100vw"
                                              width={128}
                                              height={128}
                                              src={urlFor(item?.image)}
                                              alt={
                                                item?.alt ??
                                                `product-image-${index}`
                                              }
                                            />
                                          )}
                                        </div>
                                      )
                                    )}
                                </Fragment>
                              ) : (
                                <div className="mt-5 aspect-video">
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
                                  value={
                                    productDetails?.[activeTab]?.blockContent
                                  }
                                  components={blockStyle}
                                  onMissingComponent={false} // Disabling warnings / handling unknown types
                                />
                              )}
                            </div>
                          ) : (
                            productDetails?.[activeTab]?.blockContent && (
                              <PortableText
                                value={
                                  productDetails?.[activeTab]?.blockContent
                                }
                                components={blockStyle}
                                onMissingComponent={false} // Disabling warnings / handling unknown types
                              />
                            )
                          )}
                          {/* @TO DO: ADD VALUE SOURCE FOR CUSTOMER REVIEWS HERE */}
                        </div>
                      )}
                    </Fragment>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
export default memo(VariantB);
