import { Fragment, memo, useState } from "react";
import { urlFor, PortableText } from "lib/sanity";
import Image from "next/image";
import ProductDetail from "component/ecwid/ProductDetail";
import AddToBag from "component/ecwid/AddToBag";
import Ribbon from "component/ecwid/Ribbon";
import Description from "component/ecwid/Description";

function VariantA({
  subtitle,
  images,
  productDetails,
  btnLabel,
  product,
  socialLinks,
  ecwidProduct,
  getPriceDisplay,
}) {
  // block styling as props to `serializers` of the PortableText component
  const blockStyle = {
    block: {
      h1: ({ children }) => {
        return (
          <h1 className="mb-8 leading-loose text-7xl font-bold font-heading">
            {children}
          </h1>
        );
      },
      h2: ({ children }) => {
        return (
          <h2 className="mb-8 leading-loose text-5xl font-bold font-heading">
            {children}
          </h2>
        );
      },
      h3: ({ children }) => {
        return (
          <h3 className="mb-8 leading-loose text-3xl font-bold font-heading">
            {children}
          </h3>
        );
      },
      h4: ({ children }) => {
        return (
          <h4 className="mb-6 leading-loose text-xl font-bold font-heading">
            {children}
          </h4>
        );
      },
      normal: ({ children }) => {
        return <p className="max-w-2xl text-gray-500">{children}</p>;
      },
      blockquote: ({ children }) => {
        return (
          <blockquote className="mb-6 px-14 leading-loose italic text-gray-500">
            - {children}
          </blockquote>
        );
      },
    },
    list: {
      bullet: ({ children }) => {
        return (
          <ul className="mb-6 pl-10 leading-loose text-gray-900 list-disc">
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
        <li className="mb-6 leading-loose text-gray-900">{props.children}</li>
      ),
    },
    marks: {
      strong: ({ children }) => <strong>{children}</strong>,
      em: ({ children }) => <em>{children}</em>,
      code: ({ children }) => <code>{children}</code>,
      link: ({ children, value }) => (
        <a
          aria-label={children ?? "external link"}
          className="hover:text-webriq-lightblue text-webriq-blue"
          href={value.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      ),
    },
  };

  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  // view previous and next images
  const arrowRightClick = () => {
    activeImage !== images.length - 1 // Check index length
      ? setActiveImage(activeImage + 1)
      : setActiveImage((activeImage = 0));
  };
  const arrowLeftClick = () => {
    activeImage !== 0 // Check index length
      ? setActiveImage(activeImage - 1)
      : setActiveImage((activeImage = images.length - 1));
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-4 mb-24">
          <div className="w-full lg:w-1/2 px-4 mb-8 md:mb-0">
            <div className="relative mb-10">
              <button
                className="absolute z-50 top-1/2 left-0 ml-5 hover:bg-gray-50 hover:opacity-50 rounded-r-sm rounded-l-md px-2 py-5 transition duration-200"
                onClick={arrowLeftClick}
                type="button"
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
              <div className="w-full h-full">
                {images?.[activeImage]?.image && (
                  <Image
                    layout="responsive"
                    width={736}
                    height={564}
                    objectFit="cover"
                    src={urlFor(images?.[activeImage]?.image)}
                    alt={images?.[activeImage]?.alt}
                  />
                )}
              </div>
              <button
                className="absolute z-50 top-1/2 right-0 mr-5 hover:bg-gray-50 hover:opacity-50 rounded-l-sm rounded-r-md px-2 py-5 transition duration-200"
                onClick={arrowRightClick}
                type="button"
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
            <div className="hidden md:flex md:flex-wrap md:-mx-2">
              {images?.map((item, index) => (
                <div className="w-1/4 p-2" key={index}>
                  <div
                    className={`block ${
                      activeImage === index
                        ? "border border-webriq-darkblue"
                        : "hover:border hover:border-gray-400"
                    }`}
                    onClick={() => setActiveImage(index)}
                  >
                    <div className="w-full h-full">
                      {item?.image && (
                        <Image
                          layout="responsive"
                          width={170}
                          height={128}
                          objectFit="cover"
                          src={urlFor(item?.image)}
                          alt={item?.alt}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full lg:w-1/2 px-4 mt-10">
            <div className="lg:pl-20">
              <div className="mb-10 pb-10 border-b">
                {product?.pid && (
                  <div className="mb-3">
                    <Ribbon data={ecwidProduct} />
                  </div>
                )}
                {subtitle && (
                  <span className="font-custom font-bold text-webriq-darkblue">
                    {subtitle}
                  </span>
                )}
                {product?.name && (
                  <h1 className="mt-2 mb-6 lg:max-w-xl text-5xl md:text-6xl font-bold font-heading">
                    {product?.name}
                  </h1>
                )}
                <div className="mb-8">{/* Ratings from Ecwid */}</div>
                <p className="inline-block mb-8 text-2xl font-bold font-heading">
                  {/* Product price from Ecwid */}
                  <span className="text-webriq-darkblue">
                    {getPriceDisplay()}
                  </span>
                </p>
                <Description data={ecwidProduct} />

                {product?.description && (
                  <p className="max-w-md text-gray-500 font-custom">
                    {product?.description}
                  </p>
                )}
              </div>
              <div className="flex mb-12">
                <div className="mr-6">
                  {/* elements from Ecwid such as Quantity, Size */}
                </div>
                <div>{/* elements from Ecwid such as Quantity, Size */}</div>
              </div>

              <ProductDetail product={ecwidProduct}>
                <div className="flex flex-wrap -mx-4 mb-14 items-center mt-8">
                  {btnLabel && (
                    <div className="w-2/3 px-4 lg:mb-4 xl:mb-0">
                      <AddToBag
                        inStock={!ecwidProduct?.inStock}
                        classNames="block w-full text-center text-white font-bold font-heading py-5 px-8 rounded-md uppercase transition duration-200 bg-webriq-darkblue hover:bg-webriq-blue cursor-pointer"
                      >
                        {btnLabel}
                      </AddToBag>
                    </div>
                  )}
                  <div className="w-1/3 px-4">
                    {/* Add to wishlist button */}
                    <button
                      className="ml-auto sm:ml-0 flex-shrink-0 inline-flex mr-4 items-center justify-center w-16 h-16 rounded-md border hover:border-webriq-darkblue"
                      type="button"
                    >
                      <svg
                        className="w-6 h-6"
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
                    </button>
                    {/* Share product */}
                    <button
                      className="flex-shrink-0 inline-flex items-center justify-center w-16 h-16 rounded-md border hover:border-webriq-darkblue"
                      type="button"
                    >
                      <svg
                        className="w-6 h-6"
                        width={24}
                        height={23}
                        viewBox="0 0 24 23"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.01328 18.9877C2.05682 16.7902 2.71436 12.9275 6.3326 9.87096L6.33277 9.87116L6.33979 9.86454L6.3398 9.86452C6.34682 9.85809 8.64847 7.74859 13.4997 7.74859C13.6702 7.74859 13.8443 7.75111 14.0206 7.757L14.0213 7.75702L14.453 7.76978L14.6331 7.77511V7.59486V3.49068L21.5728 10.5736L14.6331 17.6562V13.6558V13.5186L14.4998 13.4859L14.1812 13.4077C14.1807 13.4075 14.1801 13.4074 14.1792 13.4072M2.01328 18.9877L14.1792 13.4072M2.01328 18.9877C7.16281 11.8391 14.012 13.3662 14.1792 13.4072M2.01328 18.9877L14.1792 13.4072M23.125 10.6961L23.245 10.5736L23.125 10.4512L13.7449 0.877527L13.4449 0.571334V1V6.5473C8.22585 6.54663 5.70981 8.81683 5.54923 8.96832C-0.317573 13.927 0.931279 20.8573 0.946581 20.938L0.946636 20.9383L1.15618 22.0329L1.24364 22.4898L1.47901 22.0885L2.041 21.1305L2.04103 21.1305C4.18034 17.4815 6.71668 15.7763 8.8873 15.0074C10.9246 14.2858 12.6517 14.385 13.4449 14.4935V20.1473V20.576L13.7449 20.2698L23.125 10.6961Z"
                          fill="black"
                          stroke="black"
                          strokeWidth="0.35"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </ProductDetail>

              {socialLinks && (
                <div className="flex items-center">
                  <span className="mr-8 font-bold font-heading uppercase">
                    SHARE IT
                  </span>
                  {socialLinks?.map(
                    (social, index) =>
                      social?.socialMediaLink && (
                        <a
                          aria-label={
                            social?.socialMedia || social?.socialMediaPlatform
                          }
                          className="mr-1 w-8 h-8"
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
                </div>
              )}
            </div>
          </div>
        </div>
        {productDetails && (
          <div>
            <ul className="flex flex-wrap mb-16 border-b-2">
              {productDetails?.map((details, index) => (
                <li className="w-1/2 md:w-auto" key={index}>
                  <button
                    className={`inline-block py-6 px-7 lg:px-10 font-bold font-heading ${
                      activeTab === index
                        ? "bg-white shadow-2xl text-webriq-darkblue"
                        : "text-gray-500 hover:shadow-2xl"
                    }`}
                    onClick={() => setActiveTab(index)}
                    type="button"
                  >
                    {details?.tabName}
                  </button>
                </li>
              ))}
            </ul>
            {productDetails?.[activeTab]?.contentType !== "textOnly" ? (
              <div className="flex flex-wrap gap-x-5">
                {productDetails?.[activeTab]?.media &&
                productDetails?.[activeTab]?.media === "imageArray" ? (
                  <Fragment>
                    {productDetails?.[activeTab]?.images?.map((item, index) => (
                      <div className="w-1/4 h-full" key={index}>
                        {item?.image && (
                          <Image
                            layout="responsive"
                            width={250}
                            height={128}
                            objectFit="cover"
                            src={urlFor(item?.image)}
                            alt={item?.alt}
                          />
                        )}
                      </div>
                    ))}
                  </Fragment>
                ) : (
                  <div className="aspect-video">
                    <iframe
                      width={635}
                      height={357}
                      loading="lazy"
                      src={productDetails?.[activeTab]?.url}
                      frameBorder={0}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}
                {productDetails?.[activeTab]?.blockContent && (
                  <PortableText
                    value={productDetails?.[activeTab]?.blockContent}
                    components={blockStyle}
                  />
                )}
              </div>
            ) : (
              productDetails?.[activeTab]?.blockContent && (
                <PortableText
                  value={productDetails?.[activeTab]?.blockContent}
                  components={blockStyle}
                />
              )
            )}
            {/* @TO DO: ADD VALUE SOURCE FOR CUSTOMER REVIEWS HERE */}
          </div>
        )}
      </div>
    </section>
  );
}
export default memo(VariantA);
