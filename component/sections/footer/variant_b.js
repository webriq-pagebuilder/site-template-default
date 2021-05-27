import { urlFor } from "lib/sanity"
import React from "react"

function VariantB({ logo, copyright, socialMedia, menu }) {
  return (
    <section>
      <div className="py-20 bg-gray-50 radius-for-skewed">
        <div className="container mx-auto px-4">
          <div className="pb-12 flex flex-wrap items-center justify-between border-b border-gray-100">
            <div className="w-full lg:w-1/5 mb-12 lg:mb-4 mx-20">
              {logo && (
                <a
                  className="inline-block text-3xl font-bold leading-none"
                  href="#"
                >
                  <img
                    className="h-14"
                    src={urlFor(logo?.image)}
                    alt={logo?.alt}
                    width="auto"
                  />
                </a>
              )}
            </div>
            {menu && (
              <div className="w-full lg:w-auto">
                <ul className="mt-8 flex flex-wrap lg:space-x-5 justify-between items-center mx-20">
                  {menu[0] && (
                    <li className="w-full md:w-auto mb-2 md:mb-0">
                      {menu[0].label && (
                        <a
                          className="lg:text-sm text-gray-400 hover:text-gray-500"
                          href={
                            menu[0].type === "linkExternal"
                              ? menu[0]?.externalLink
                              : menu[0].type === "linkInternal"
                              ? menu[0].internalLink === "Home" ||
                                menu[0].internalLink === "home"
                                ? "/"
                                : menu[0]?.internalLink
                              : "page-not-found"
                          }
                        >
                          {menu[0]?.label}
                        </a>
                      )}
                    </li>
                  )}
                  {menu[1] && (
                    <>
                      <li className="hidden md:block">
                        <svg
                          className="mx-4 w-4 h-4 text-gray-300"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                          ></path>
                        </svg>
                      </li>
                      <li className="w-full md:w-auto mb-2 md:mb-0">
                        {menu[1].label && (
                          <a
                            className="lg:text-sm text-gray-400 hover:text-gray-500"
                            href={
                              menu[1].type === "linkExternal"
                                ? menu[1]?.externalLink
                                : menu[1].type === "linkInternal"
                                ? menu[1].internalLink === "Home" ||
                                  menu[1].internalLink === "home"
                                  ? "/"
                                  : menu[1]?.internalLink
                                : "page-not-found"
                            }
                          >
                            {menu[1]?.label}
                          </a>
                        )}
                      </li>
                    </>
                  )}
                  {menu[2] && (
                    <>
                      <li className="hidden md:block">
                        <svg
                          className="mx-4 w-4 h-4 text-gray-300"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                          ></path>
                        </svg>
                      </li>
                      <li className="w-full md:w-auto mb-2 md:mb-0">
                        {menu[2].label && (
                          <a
                            className="lg:text-sm text-gray-400 hover:text-gray-500"
                            href={
                              menu[2].type === "linkExternal"
                                ? menu[2]?.externalLink
                                : menu[2].type === "linkInternal"
                                ? menu[2].internalLink === "Home" ||
                                  menu[2].internalLink === "home"
                                  ? "/"
                                  : menu[2]?.internalLink
                                : "page-not-found"
                            }
                          >
                            {menu[2]?.label}
                          </a>
                        )}
                      </li>
                    </>
                  )}
                  {menu[3] && (
                    <>
                      <li className="hidden md:block">
                        <svg
                          className="mx-4 w-4 h-4 text-gray-300"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                          ></path>
                        </svg>
                      </li>
                      <li className="w-full md:w-auto mb-2 md:mb-0">
                        {menu[3].label && (
                          <a
                            className="lg:text-sm text-gray-400 hover:text-gray-500"
                            href={
                              menu[3].type === "linkExternal"
                                ? menu[3]?.externalLink
                                : menu[3].type === "linkInternal"
                                ? menu[3].internalLink === "Home" ||
                                  menu[3].internalLink === "home"
                                  ? "/"
                                  : menu[3]?.internalLink
                                : "page-not-found"
                            }
                          >
                            {menu[3]?.label}
                          </a>
                        )}
                      </li>
                    </>
                  )}
                  {menu[4] && (
                    <>
                      <li className="hidden md:block">
                        <svg
                          className="mx-4 w-4 h-4 text-gray-300"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                          ></path>
                        </svg>
                      </li>
                      <li>
                        {menu[4].label && (
                          <a
                            className="lg:text-sm text-gray-400 hover:text-gray-500"
                            href={
                              menu[4].type === "linkExternal"
                                ? menu[4]?.externalLink
                                : menu[4].type === "linkInternal"
                                ? menu[4].internalLink === "Home" ||
                                  menu[4].internalLink === "home"
                                  ? "/"
                                  : menu[4]?.internalLink
                                : "page-not-found"
                            }
                          >
                            {menu[4]?.label}
                          </a>
                        )}
                      </li>
                    </>
                  )}
                </ul>
              </div>
            )}
          </div>
          <div className="mt-8 flex flex-wrap justify-between items-center mx-20">
            <p className="order-last text-sm text-gray-400">{copyright}</p>
            {socialMedia && (
              <div className="mb-4 lg:mb-0 order-first lg:order-last">
                {socialMedia?.fbLink && (
                  <a
                    className="inline-block mr-2 p-2 bg-gray-50 hover:bg-gray-100 rounded"
                    href={socialMedia?.fbLink}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="rgb(5,150,105)"
                        d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
                      />
                    </svg>
                  </a>
                )}
                {socialMedia?.twitterLink && (
                  <a
                    className="inline-block mr-2 p-2 bg-gray-50 hover:bg-gray-100 rounded"
                    href={socialMedia?.twitterLink}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="rgb(5,150,105)"
                        d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                      />
                    </svg>
                  </a>
                )}
                {socialMedia?.instagramLink && (
                  <a
                    className="inline-block mr-2 p-2 bg-gray-50 hover:bg-gray-100 rounded"
                    href={socialMedia?.instagramLink}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="rgb(5,150,105)"
                        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                      />
                    </svg>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
export default React.memo(VariantB)
