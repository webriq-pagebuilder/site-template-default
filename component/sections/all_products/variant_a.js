import { memo } from "react";
import { urlFor } from "lib/sanity";
import { sanityClient } from "lib/sanity.server";
import Image from "next/image";
import Link from "next/link";

function VariantA() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-4 mb-20 items-center justify-between">
          <div className="w-full lg:w-auto px-4 mb-12 xl:mb-0">
            <h2 className="text-5xl font-bold font-heading">
              <span>Found 125 results for</span>
              <a className="relative underline text-webriq-darkblue" href="#">
                Sports
              </a>
            </h2>
          </div>
          <div className="w-full lg:w-auto px-4 flex flex-wrap items-center">
            <div className="w-full sm:w-auto mb-4 sm:mb-0 mr-5">
              <p className="mx-5">
                <span className="font-bold">125 </span>results
              </p>
            </div>
            <a
              className="inline-block mr-3 h-full p-4 bg-white rounded-md border"
              href="#"
            >
              <svg
                width={20}
                height={24}
                viewBox="0 0 20 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width={4} height={4} rx={2} fill="#0045D8" />
                <rect x={8} width={4} height={4} rx={2} fill="#0045D8" />
                <rect x={16} width={4} height={4} rx={2} fill="#0045D8" />
                <rect y={10} width={4} height={4} rx={2} fill="#0045D8" />
                <rect x={8} y={10} width={4} height={4} rx={2} fill="#0045D8" />
                <rect
                  x={16}
                  y={10}
                  width={4}
                  height={4}
                  rx={2}
                  fill="#0045D8"
                />
                <rect y={20} width={4} height={4} rx={2} fill="#0045D8" />
                <rect x={8} y={20} width={4} height={4} rx={2} fill="#0045D8" />
                <rect
                  x={16}
                  y={20}
                  width={4}
                  height={4}
                  rx={2}
                  fill="#0045D8"
                />
              </svg>
            </a>
            <a
              className="inline-block h-full p-4 hover:bg-white border rounded-md group"
              href="#"
            >
              <svg
                className="text-gray-200 group-hover:text-blue-300"
                width={28}
                height={24}
                viewBox="0 0 28 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width={4} height={4} rx={2} fill="currentColor" />
                <rect x={8} width={4} height={4} rx={2} fill="currentColor" />
                <rect x={16} width={4} height={4} rx={2} fill="currentColor" />
                <rect x={24} width={4} height={4} rx={2} fill="currentColor" />
                <rect y={10} width={4} height={4} rx={2} fill="currentColor" />
                <rect
                  x={8}
                  y={10}
                  width={4}
                  height={4}
                  rx={2}
                  fill="currentColor"
                />
                <rect
                  x={16}
                  y={10}
                  width={4}
                  height={4}
                  rx={2}
                  fill="currentColor"
                />
                <rect
                  x={24}
                  y={10}
                  width={4}
                  height={4}
                  rx={2}
                  fill="currentColor"
                />
                <rect y={20} width={4} height={4} rx={2} fill="currentColor" />
                <rect
                  x={8}
                  y={20}
                  width={4}
                  height={4}
                  rx={2}
                  fill="currentColor"
                />
                <rect
                  x={16}
                  y={20}
                  width={4}
                  height={4}
                  rx={2}
                  fill="currentColor"
                />
                <rect
                  x={24}
                  y={20}
                  width={4}
                  height={4}
                  rx={2}
                  fill="currentColor"
                />
              </svg>
            </a>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-24">
          <div className="w-full px-3 mb-20"></div>
          <div className="w-full px-3">
            <div className="flex flex-wrap -mx-3">
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-3 mb-8">
                <div className="p-6 bg-gray-50">
                  <a className="block px-6 mt-6 mb-2" href="#">
                    <img
                      className="mb-5 mx-auto h-56 w-full object-contain"
                      src="yofte-assets/images/waterbottle.png"
                      alt=""
                    />
                    <h3 className="mb-2 text-xl font-bold font-heading">
                      BRILE water filter
                    </h3>
                    <p className="text-lg font-bold font-heading text-blue-500">
                      <span className="text-webriq-darkblue">$29.89</span>
                      <span className="text-xs text-gray-500 font-semibold font-heading line-through">
                        $33.69
                      </span>
                    </p>
                  </a>
                  <a
                    className="ml-auto mr-2 flex items-center justify-center w-12 h-12 border rounded-lg hover:border-gray-500"
                    href="#"
                  >
                    <svg
                      width={12}
                      height={12}
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect x={5} width={2} height={12} fill="#161616" />
                      <rect
                        x={12}
                        y={5}
                        width={2}
                        height={12}
                        transform="rotate(90 12 5)"
                        fill="#161616"
                      />
                    </svg>
                  </a>
                </div>
              </div>
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-3 mb-8">
                <div className="p-6 bg-gray-50">
                  <a className="block px-6 mt-6 mb-2" href="#">
                    <img
                      className="mb-5 mx-auto h-56 w-full object-contain"
                      src="yofte-assets/images/cycle.png"
                      alt=""
                    />
                    <h3 className="mb-2 text-xl font-bold font-heading">
                      Bicycle S20
                    </h3>
                    <p className="text-lg font-bold font-heading text-blue-500">
                      <span className="text-webriq-darkblue">$14.30</span>
                      <span className="text-xs text-gray-500 font-semibold font-heading line-through">
                        $15.90
                      </span>
                    </p>
                  </a>
                  <a
                    className="ml-auto mr-2 flex items-center justify-center w-12 h-12 border rounded-lg hover:border-gray-500"
                    href="#"
                  >
                    <svg
                      width={12}
                      height={12}
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect x={5} width={2} height={12} fill="#161616" />
                      <rect
                        x={12}
                        y={5}
                        width={2}
                        height={12}
                        transform="rotate(90 12 5)"
                        fill="#161616"
                      />
                    </svg>
                  </a>
                </div>
              </div>
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-3 mb-8">
                <div className="p-6 bg-gray-50">
                  <span className="px-2 py-1" />
                  <a className="block px-6 mt-6 mb-2" href="#">
                    <img
                      className="mb-5 mx-auto h-56 w-full object-contain"
                      src="yofte-assets/images/basketball.png"
                      alt=""
                    />
                    <h3 className="mb-2 text-xl font-bold font-heading">
                      Basketball ball
                    </h3>
                    <p className="text-lg font-bold font-heading text-blue-500">
                      <span className="text-webriq-darkblue">$34.89</span>
                      <span className="text-xs text-gray-500 font-semibold font-heading line-through">
                        $33.69
                      </span>
                    </p>
                  </a>
                  <a
                    className="ml-auto mr-2 flex items-center justify-center w-12 h-12 border rounded-lg hover:border-gray-500"
                    href="#"
                  >
                    <svg
                      width={12}
                      height={12}
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect x={5} width={2} height={12} fill="#161616" />
                      <rect
                        x={12}
                        y={5}
                        width={2}
                        height={12}
                        transform="rotate(90 12 5)"
                        fill="#161616"
                      />
                    </svg>
                  </a>
                </div>
              </div>
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-3 mb-8">
                <div className="p-6 bg-gray-50">
                  <a className="block px-6 mt-6 mb-2" href="#">
                    <img
                      className="mb-5 mx-auto h-56 w-full object-contain"
                      src="yofte-assets/images/skateboard.png"
                      alt=""
                    />
                    <h3 className="mb-2 text-xl font-bold font-heading">
                      Kiteboard WH-004
                    </h3>
                    <p className="text-lg font-bold font-heading text-blue-500">
                      <span className="text-webriq-darkblue">$19.90</span>
                      <span className="text-xs text-gray-500 font-semibold font-heading line-through">
                        $33.69
                      </span>
                    </p>
                  </a>
                  <a
                    className="ml-auto mr-2 flex items-center justify-center w-12 h-12 border rounded-lg hover:border-gray-500"
                    href="#"
                  >
                    <svg
                      width={12}
                      height={12}
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect x={5} width={2} height={12} fill="#161616" />
                      <rect
                        x={12}
                        y={5}
                        width={2}
                        height={12}
                        transform="rotate(90 12 5)"
                        fill="#161616"
                      />
                    </svg>
                  </a>
                </div>
              </div>
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-3 mb-8"></div>
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-3 mb-8"></div>
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-3 mb-8"></div>
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-3 mb-8"></div>
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-3 mb-8">
                <div className="p-6 bg-gray-50">
                  <span className="px-2 py-1" />
                  <a className="block px-6 mt-6 mb-2" href="#">
                    <img
                      className="mb-5 mx-auto h-56 w-full object-contain"
                      src="yofte-assets/images/basketball.png"
                      alt=""
                    />
                    <h3 className="mb-2 text-xl font-bold font-heading">
                      Basketball ball
                    </h3>
                    <p className="text-lg font-bold font-heading text-blue-500">
                      <span className="text-webriq-darkblue">$34.89</span>
                      <span className="text-xs text-gray-500 font-semibold font-heading line-through">
                        $33.69
                      </span>
                    </p>
                  </a>
                  <a
                    className="ml-auto mr-2 flex items-center justify-center w-12 h-12 border rounded-lg hover:border-gray-500"
                    href="#"
                  >
                    <svg
                      width={12}
                      height={12}
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect x={5} width={2} height={12} fill="#161616" />
                      <rect
                        x={12}
                        y={5}
                        width={2}
                        height={12}
                        transform="rotate(90 12 5)"
                        fill="#161616"
                      />
                    </svg>
                  </a>
                </div>
              </div>
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-3 mb-8">
                <div className="p-6 bg-gray-50">
                  <a className="block px-6 mt-6 mb-2" href="#">
                    <img
                      className="mb-5 mx-auto h-56 w-full object-contain"
                      src="yofte-assets/images/cycle.png"
                      alt=""
                    />
                    <h3 className="mb-2 text-xl font-bold font-heading">
                      Bicycle S20
                    </h3>
                    <p className="text-lg font-bold font-heading text-blue-500">
                      <span className="text-webriq-darkblue">$14.30</span>
                      <span className="text-xs text-gray-500 font-semibold font-heading line-through">
                        $15.90
                      </span>
                    </p>
                  </a>
                  <a
                    className="ml-auto mr-2 flex items-center justify-center w-12 h-12 border rounded-lg hover:border-gray-500"
                    href="#"
                  >
                    <svg
                      width={12}
                      height={12}
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect x={5} width={2} height={12} fill="#161616" />
                      <rect
                        x={12}
                        y={5}
                        width={2}
                        height={12}
                        transform="rotate(90 12 5)"
                        fill="#161616"
                      />
                    </svg>
                  </a>
                </div>
              </div>
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-3 mb-8">
                <div className="p-6 bg-gray-50">
                  <a className="block px-6 mt-6 mb-2" href="#">
                    <img
                      className="mb-5 mx-auto h-56 w-full object-contain"
                      src="yofte-assets/images/skateboard.png"
                      alt=""
                    />
                    <h3 className="mb-2 text-xl font-bold font-heading">
                      Kiteboard WH-004
                    </h3>
                    <p className="text-lg font-bold font-heading text-blue-500">
                      <span className="text-webriq-darkblue">$19.90</span>
                      <span className="text-xs text-gray-500 font-semibold font-heading line-through">
                        $33.69
                      </span>
                    </p>
                  </a>
                  <a
                    className="ml-auto mr-2 flex items-center justify-center w-12 h-12 border rounded-lg hover:border-gray-500"
                    href="#"
                  >
                    <svg
                      width={12}
                      height={12}
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect x={5} width={2} height={12} fill="#161616" />
                      <rect
                        x={12}
                        y={5}
                        width={2}
                        height={12}
                        transform="rotate(90 12 5)"
                        fill="#161616"
                      />
                    </svg>
                  </a>
                </div>
              </div>
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-3 mb-8">
                <div className="p-6 bg-gray-50">
                  <a className="block px-6 mt-6 mb-2" href="#">
                    <img
                      className="mb-5 mx-auto h-56 w-full object-contain"
                      src="yofte-assets/images/backpack.png"
                      alt=""
                    />
                    <h3 className="mb-2 text-xl font-bold font-heading">
                      Backpack Travel
                    </h3>
                    <p className="text-lg font-bold font-heading text-blue-500">
                      <span className="text-webriq-darkblue">$21.99</span>
                      <span className="text-xs text-gray-500 font-semibold font-heading line-through">
                        $24.00
                      </span>
                    </p>
                  </a>
                  <a
                    className="ml-auto mr-2 flex items-center justify-center w-12 h-12 border rounded-lg hover:border-gray-500"
                    href="#"
                  >
                    <svg
                      width={12}
                      height={12}
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect x={5} width={2} height={12} fill="#161616" />
                      <rect
                        x={12}
                        y={5}
                        width={2}
                        height={12}
                        transform="rotate(90 12 5)"
                        fill="#161616"
                      />
                    </svg>
                  </a>
                </div>
              </div>
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-3 mb-8"></div>
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-3 mb-8"></div>
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-3 mb-8"></div>
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-3 mb-8"></div>
            </div>
          </div>
        </div>
        <div className="text-center"></div>
      </div>
    </section>
  );
}
export default memo(VariantA);
