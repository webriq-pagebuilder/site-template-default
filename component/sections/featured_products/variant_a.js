import { memo } from "react";
import { urlFor } from "lib/sanity";
import Image from "next/image";
import { useEcwid } from "context/EcwidContext";
import Ribbon from "component/ecwid/Ribbon";

function VariantA({ title, featured }) {
  const ecwid = useEcwid();

  return (
    <section className="relative pt-20">
      <div className="relative container mx-auto px-4">
        {title && (
          <h1 className="mb-16 text-4xl md:text-5xl font-bold">{title}</h1>
        )}
        {featured && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featured?.map((items, index) => {
              let item = null;
              if (items?.pid && ecwid?.products) {
                item = ecwid.products[parseInt(items.pid)];
              }

              return (
                <div className="w-full" key={index}>
                  <a
                    href={`/products/${items?.slug?.current}`}
                    className="flex flex-col gap-4"
                  >
                    <div className="relative">
                      <div className="absolute z-10">
                        <Ribbon data={item} />
                      </div>
                      <div className="w-full h-96 object-cover">
                        {items?.productPreview?.image && (
                          <Image
                            layout="responsive"
                            width={485}
                            height={384}
                            objectFit="cover"
                            src={urlFor(items?.productPreview?.image)}
                            alt={
                              items?.productPreview?.alt ??
                              `product-image-${index}`
                            }
                          />
                        )}
                      </div>
                    </div>

                    <p className="text-2xl xl:text-3xl font-bold">
                      {items?.name}
                    </p>
                    <p className="text-xl font-bold font-heading text-white">
                      <span className="text-webriq-darkblue mr-2">
                        {item?.defaultDisplayedPriceFormatted}
                      </span>
                    </p>
                  </a>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
export default memo(VariantA);
