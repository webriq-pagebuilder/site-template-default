import { useEcwid } from "context/EcwidContext";
import React from "react";
import Ribbon from "./Ribbon";
import Image from "next/image";
import { urlFor } from "lib/sanity";

const WishList = () => {
  const ecwid = useEcwid();
  const { favorites } = ecwid;

  return (
    <div className="flex flex-row gap-x-4">
      {favorites !== null ? (
        favorites.map((items, index) => {
          let item = null;
          if (items?.pid && ecwid?.products) {
            item = ecwid.products[parseInt(items.pid)];
          }
          return (
            <div className="w-full sm:w-1/3" key={index}>
              <a
                href={`/products/${items?.slug?.current}`}
                className="flex flex-col gap-4"
              >
                <div className="relative">
                  <div className="absolute z-10">
                    <Ribbon data={item} />
                  </div>
                  <div className="w-full object-cover">
                    {items?.productPreview?.image && (
                      <Image
                        layout="responsive"
                        width={485}
                        height={384}
                        objectFit="cover"
                        src={urlFor(items?.productPreview?.image)}
                        alt={
                          items?.productPreview?.alt ?? `product-image-${index}`
                        }
                      />
                    )}
                  </div>
                </div>

                <p className="text-2xl xl:text-3xl font-bold">{items?.name}</p>
                <p className="text-xl font-bold font-heading text-white">
                  <span className="text-webriq-darkblue mr-2">
                    {item?.defaultDisplayedPriceFormatted}
                  </span>
                </p>
              </a>
            </div>
          );
        })
      ) : (
        <div className="w-full">
          <p>No favorited products</p>
        </div>
      )}
    </div>
  );
};

export default WishList;
