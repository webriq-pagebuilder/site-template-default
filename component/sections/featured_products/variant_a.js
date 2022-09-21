import { memo } from "react";
import { urlFor } from "lib/sanity";
import Image from "next/image";

function VariantA({ title, featured }) {
  console.log(title, featured);
  return (
    <section className="relative py-20">
      <div className="relative container mx-auto px-4">
        {title && (
          <h1 className="mb-16 text-4xl md:text-5xl font-bold">{title}</h1>
        )}
        {featured && (
          <div className="flex flex-wrap -mx-3">
            {featured?.products?.map((items, index) => (
              <div className="w-full lg:w-1/3 px-3 mb-16 lg:mb-0" key={index}>
                <div className="block mb-10">
                  <div className="relative">
                    <span className="absolute bottom-0 left-0 ml-6 mb-6 px-2 py-1 text-xs font-bold font-heading bg-white border-2 border-red-500 rounded-full text-red-500">
                      -15%
                    </span>
                    <a href={items?.slug?.current}>
                      <div className="w-full h-96 object-cover">
                        <Image
                          layout="responsive"
                          width={485}
                          height={384}
                          objectFit="cover"
                          src={urlFor(items?.productPreview?.image)}
                          alt={items?.productPreview?.alt}
                        />
                      </div>
                    </a>
                  </div>
                  <div className="mt-12">
                    <div className="mb-2">
                      {items?.name && (
                        <a
                          className="text-3xl font-bold"
                          href={items?.slug?.current}
                        >
                          {items?.name}
                        </a>
                      )}
                      <p className="mt-3 text-xl font-bold font-heading text-white">
                        <span className="text-black mr-2">$295.30</span>
                        <span className="text-xs text-gray-500 font-semibold font-heading line-through">
                          $330.90
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                {featured?.btnLabel && (
                  <button
                    className="inline-block text-white font-bold font-heading py-4 px-8 rounded-md uppercase transition duration-200 bg-webriq-darkblue"
                    type="button"
                  >
                    {featured?.btnLabel}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
export default memo(VariantA);
