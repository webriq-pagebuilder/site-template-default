import { memo } from "react";
import { urlFor } from "lib/sanity";
import { useEcwid } from "context/EcwidContext";

function VariantB({ title, featured, primaryButton }) {
  const ecwid = useEcwid();

  return (
    <section className="py-20 overflow-x-hidden">
      <div className="container mx-auto px-4">
        {title && (
          <h1 className="mb-16 md:mb-24 text-4xl md:text-5xl font-bold">
            {title}
          </h1>
        )}
        {featured && (
          <div className="flex flex-wrap -mx-3 mb-20">
            <div className="w-full lg:w-1/2 px-3 mb-6 lg:mb-0">
              {featured?.products?.slice(0, 2)?.map((items, index) => {
                let item = null;
                if (items?.pid && ecwid?.products) {
                  item = ecwid.products[parseInt(items.pid)];
                }

                return (
                  <div
                    className="relative mb-6 h-64 w-full bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url(${
                        items?.productPreview?.image &&
                        urlFor(items?.productPreview?.image)
                      })`,
                    }}
                    key={index}
                  >
                    {item?.ribbon?.text && (
                      <div className="absolute top-2 left-0 z-50">
                        <p
                          className="inline text-white p-2"
                          style={{ backgroundColor: item.ribbon.color }}
                        >
                          {item.ribbon.text}
                        </p>
                      </div>
                    )}

                    {/* <span className="inline-block mt-4 ml-4 px-2 py-1 text-xs font-bold font-heading border-2 border-red-500 rounded-full text-red-500 bg-white">
                      -10%
                    </span> */}
                    <div className="absolute inset-0 flex items-end">
                      <div className="pl-12 pb-6">
                        {items?.name && (
                          <a
                            className="text-3xl font-bold"
                            href={`/products/${items?.slug?.current}`}
                          >
                            {items?.name}
                          </a>
                        )}
                        <p className="mb-3 text-xl font-bold font-heading">
                          <span className="mr-2">
                            {item?.defaultDisplayedPriceFormatted}
                          </span>
                          {/* <span className="text-sm font-normal line-through">
                            11.99
                          </span> */}
                        </p>
                        {featured?.btnLabel && (
                          <button
                            className="inline-block text-white font-bold font-heading py-4 px-8 rounded-md uppercase transition duration-200 bg-webriq-darkblue"
                            type="button"
                          >
                            {featured?.btnLabel}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {featured?.products?.slice(2)?.map((items, i) => (
              <div className="w-full lg:w-1/2 px-3" key={i}>
                <div
                  className="relative inline-block mb-6 h-96 lg:h-full w-full bg-no-repeat bg-cover"
                  style={{
                    backgroundImage: `url(${
                      items?.productPreview?.image &&
                      urlFor(items?.productPreview?.image)
                    })`,
                  }}
                >
                  <span className="inline-block px-2 py-1 ml-4 mt-4 text-xs font-bold border-2 rounded-full uppercase border-webriq-darkblue bg-white">
                    New
                  </span>
                  <div className="absolute top-1/2 left-0 pb-20 pl-12">
                    <p className="text-xl font-bold font-heading mb-3">
                      Excellent value bike
                    </p>
                    {items?.name && (
                      <a
                        className="text-3xl font-bold font-heading"
                        href={`/products/${items?.slug?.current}`}
                      >
                        {items?.name}
                      </a>
                    )}
                    <p className="mt-2 mb-10 font-bold font-heading">$379.90</p>
                    {featured?.btnLabel && (
                      <button
                        className="inline-block font-bold font-heading py-4 px-8 rounded-md uppercase transition duration-200 bg-webriq-darkblue text-white"
                        type="button"
                      >
                        {featured?.btnLabel}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {primaryButton?.label && (
          <a
            className="text-white font-bold font-heading py-6 px-8 rounded-md uppercase bg-webriq-darkblue"
            href="#"
          >
            {primaryButton?.label}
          </a>
        )}
      </div>
    </section>
  );
}
export default memo(VariantB);
