"use strict";
(self.webpackChunk_webriq_pagebuilder_site_template_default =
  self.webpackChunk_webriq_pagebuilder_site_template_default || []).push([
  [8124],
  {
    "./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js":
      (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        function _arrayLikeToArray(arr, len) {
          (null == len || len > arr.length) && (len = arr.length);
          for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
          return arr2;
        }
        __webpack_require__.d(__webpack_exports__, {
          Z: () => _arrayLikeToArray,
        });
      },
    "./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/slicedToArray.js":
      (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        __webpack_require__.d(__webpack_exports__, { Z: () => _slicedToArray });
        var unsupportedIterableToArray = __webpack_require__(
          "./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js"
        );
        function _slicedToArray(arr, i) {
          return (
            (function _arrayWithHoles(arr) {
              if (Array.isArray(arr)) return arr;
            })(arr) ||
            (function _iterableToArrayLimit(r, l) {
              var t =
                null == r
                  ? null
                  : ("undefined" != typeof Symbol && r[Symbol.iterator]) ||
                    r["@@iterator"];
              if (null != t) {
                var e,
                  n,
                  i,
                  u,
                  a = [],
                  f = !0,
                  o = !1;
                try {
                  if (((i = (t = t.call(r)).next), 0 === l)) {
                    if (Object(t) !== t) return;
                    f = !1;
                  } else
                    for (
                      ;
                      !(f = (e = i.call(t)).done) &&
                      (a.push(e.value), a.length !== l);
                      f = !0
                    );
                } catch (r) {
                  (o = !0), (n = r);
                } finally {
                  try {
                    if (
                      !f &&
                      null != t.return &&
                      ((u = t.return()), Object(u) !== u)
                    )
                      return;
                  } finally {
                    if (o) throw n;
                  }
                }
                return a;
              }
            })(arr, i) ||
            (0, unsupportedIterableToArray.Z)(arr, i) ||
            (function _nonIterableRest() {
              throw new TypeError(
                "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
              );
            })()
          );
        }
      },
    "./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js":
      (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        __webpack_require__.d(__webpack_exports__, {
          Z: () => _unsupportedIterableToArray,
        });
        var _arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            "./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js"
          );
        function _unsupportedIterableToArray(o, minLen) {
          if (o) {
            if ("string" == typeof o)
              return (0, _arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__.Z)(
                o,
                minLen
              );
            var n = Object.prototype.toString.call(o).slice(8, -1);
            return (
              "Object" === n && o.constructor && (n = o.constructor.name),
              "Map" === n || "Set" === n
                ? Array.from(o)
                : "Arguments" === n ||
                  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                ? (0, _arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__.Z)(
                    o,
                    minLen
                  )
                : void 0
            );
          }
        }
      },
    "./components/sections/blog/variant_d.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        });
      var _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(
            "./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/slicedToArray.js"
          ),
        react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          "./node_modules/next/dist/compiled/react/index.js"
        ),
        next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          "./node_modules/next/link.js"
        ),
        next_link__WEBPACK_IMPORTED_MODULE_1___default = __webpack_require__.n(
          next_link__WEBPACK_IMPORTED_MODULE_1__
        ),
        next_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          "./node_modules/@storybook/nextjs/dist/images/next-image.mjs"
        ),
        lib_sanity__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__("./lib/sanity.ts"),
        date_fns__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          "./node_modules/date-fns/esm/format/index.js"
        ),
        __jsx = react__WEBPACK_IMPORTED_MODULE_0__.createElement;
      function VariantD(_ref) {
        var _posts$slice,
          subtitle = _ref.subtitle,
          title = _ref.title,
          posts = _ref.posts,
          _React$useState = react__WEBPACK_IMPORTED_MODULE_0__.useState("All"),
          _React$useState2 = (0,
          _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_4__.Z)(
            _React$useState,
            2
          ),
          activeTab = _React$useState2[0],
          setActiveTab = _React$useState2[1],
          transformedPosts =
            null == posts
              ? void 0
              : posts
                  .map(function (post) {
                    var _post$categories;
                    return null == post ||
                      null === (_post$categories = post.categories) ||
                      void 0 === _post$categories
                      ? void 0
                      : _post$categories.map(function (category) {
                          return {
                            category:
                              null == category ? void 0 : category.title,
                            title: null == post ? void 0 : post.title,
                            slug: null == post ? void 0 : post.slug,
                            excerpt: null == post ? void 0 : post.excerpt,
                            publishedAt:
                              null == post ? void 0 : post.publishedAt,
                            mainImage: null == post ? void 0 : post.mainImage,
                            authors: null == post ? void 0 : post.authors,
                          };
                        });
                  })
                  .flat(),
          categories =
            null == transformedPosts
              ? void 0
              : transformedPosts.reduce(function (newArr, items) {
                  var titles = null == items ? void 0 : items.category;
                  return (
                    -1 === newArr.indexOf(titles) && newArr.push(titles), newArr
                  );
                }, []),
          postsPerCategory =
            null == transformedPosts
              ? void 0
              : transformedPosts.filter(function (items) {
                  return (
                    (null == items ? void 0 : items.category) === activeTab
                  );
                });
        return __jsx(
          "section",
          null,
          __jsx(
            "div",
            { className: "py-20 radius-for-skewed bg-gray-50" },
            __jsx(
              "div",
              { className: "container px-4 mx-auto" },
              __jsx(
                "div",
                { className: "flex flex-wrap items-center mb-16" },
                __jsx(
                  "div",
                  { className: "w-full lg:w-1/2" },
                  subtitle &&
                    __jsx(
                      "span",
                      { className: "font-bold text-brand-primary" },
                      subtitle
                    ),
                  title &&
                    __jsx(
                      "h1",
                      {
                        className:
                          "text-4xl font-bold font-heading lg:text-5xl",
                      },
                      title
                    )
                )
              ),
              __jsx(
                "div",
                { className: "flex flex-wrap -mx-3" },
                __jsx(
                  "div",
                  { className: "w-full px-3 mb-8 lg:mb-0 lg:w-1/4" },
                  __jsx(
                    "div",
                    { className: "px-6 py-4 bg-white rounded shadow" },
                    categories &&
                      __jsx(
                        react__WEBPACK_IMPORTED_MODULE_0__.Fragment,
                        null,
                        __jsx(
                          "h1",
                          {
                            className: "mb-4 font-bold text-gray-500 uppercase",
                          },
                          "Topics"
                        ),
                        __jsx(
                          "ul",
                          null,
                          (null == categories ? void 0 : categories.length) >
                            1 &&
                            __jsx(
                              "li",
                              {
                                className:
                                  "rounded hover:bg-brand-secondary-foreground hover:text-brand-primary ".concat(
                                    "All" === activeTab
                                      ? "bg-brand-secondary-foreground"
                                      : null
                                  ),
                              },
                              __jsx(
                                "button",
                                {
                                  "aria-label": "Show all blog posts",
                                  className:
                                    "mb-4 block px-3 py-2 focus:outline-none ".concat(
                                      "All" === activeTab
                                        ? "font-bold text-brand-primary focus:outline-none"
                                        : null
                                    ),
                                  onClick: function onClick() {
                                    return setActiveTab("All");
                                  },
                                },
                                "All"
                              )
                            ),
                          null == categories
                            ? void 0
                            : categories.map(function (category, index) {
                                return __jsx(
                                  "li",
                                  {
                                    className:
                                      "rounded hover:bg-brand-secondary-foreground hover:text-brand-primary ".concat(
                                        activeTab === category
                                          ? "bg-brand-secondary-foreground"
                                          : null
                                      ),
                                    key: index,
                                  },
                                  __jsx(
                                    "button",
                                    {
                                      "aria-label": category,
                                      className:
                                        "mb-4 block px-3 py-2 focus:outline-none ".concat(
                                          activeTab === category
                                            ? "font-bold text-brand-primary focus:outline-none"
                                            : null
                                        ),
                                      onClick: function onClick() {
                                        return setActiveTab(category);
                                      },
                                    },
                                    category
                                  )
                                );
                              })
                        )
                      )
                  )
                ),
                posts &&
                  __jsx(
                    "div",
                    { className: "w-full px-3 lg:w-3/4" },
                    "All" === activeTab
                      ? null == posts ||
                        null === (_posts$slice = posts.slice(0, 6)) ||
                        void 0 === _posts$slice
                        ? void 0
                        : _posts$slice.map(function (post, index) {
                            var _post$slug$current, _post$slug, _post$authors;
                            return __jsx(
                              "div",
                              {
                                className: "flex flex-wrap mb-8 -mx-3 lg:mb-6",
                                key: index,
                              },
                              __jsx(
                                "div",
                                {
                                  className:
                                    "w-full h-full px-3 mb-4 lg:mb-0 lg:w-1/4",
                                },
                                (null == post ? void 0 : post.mainImage) &&
                                  __jsx(
                                    next_image__WEBPACK_IMPORTED_MODULE_2__.Z,
                                    {
                                      className:
                                        "object-cover w-full h-full overflow-hidden rounded",
                                      src: (0,
                                      lib_sanity__WEBPACK_IMPORTED_MODULE_3__.uH)(
                                        null == post ? void 0 : post.mainImage
                                      ),
                                      sizes: "100vw",
                                      width: 188,
                                      height: 129,
                                      alt: "blog-variantD-image-".concat(index),
                                    }
                                  )
                              ),
                              __jsx(
                                "div",
                                { className: "w-full px-3 lg:w-3/4" },
                                (null == post ? void 0 : post.title) &&
                                  __jsx(
                                    next_link__WEBPACK_IMPORTED_MODULE_1___default(),
                                    {
                                      "aria-label":
                                        null == post ? void 0 : post.title,
                                      className: "hover:text-brand-secondary",
                                      href: "/".concat(
                                        null !==
                                          (_post$slug$current =
                                            null == post ||
                                            null === (_post$slug = post.slug) ||
                                            void 0 === _post$slug
                                              ? void 0
                                              : _post$slug.current) &&
                                          void 0 !== _post$slug$current
                                          ? _post$slug$current
                                          : "page-not-added"
                                      ),
                                    },
                                    __jsx(
                                      "p",
                                      {
                                        className:
                                          "mb-1 text-2xl font-bold font-heading",
                                      },
                                      null == post ? void 0 : post.title
                                    )
                                  ),
                                __jsx(
                                  "div",
                                  {
                                    className: "flex items-center mb-2 text-sm",
                                  },
                                  (null == post ? void 0 : post.authors) &&
                                    (null == post ||
                                    null === (_post$authors = post.authors) ||
                                    void 0 === _post$authors
                                      ? void 0
                                      : _post$authors.map(
                                          function (author, index, _ref2) {
                                            var length = _ref2.length;
                                            return __jsx(
                                              "div",
                                              { className: "flex", key: index },
                                              __jsx(
                                                "span",
                                                {
                                                  className:
                                                    "text-brand-primary",
                                                },
                                                null == author
                                                  ? void 0
                                                  : author.name
                                              ),
                                              index + 1 !== length
                                                ? __jsx("span", null, " , ")
                                                : null
                                            );
                                          }
                                        )),
                                  (null == post ? void 0 : post.publishedAt) &&
                                    (null == post ? void 0 : post.authors) &&
                                    __jsx(
                                      "span",
                                      { className: "mx-2 text-gray-500" },
                                      "•"
                                    ),
                                  (null == post ? void 0 : post.publishedAt) &&
                                    __jsx(
                                      "span",
                                      { className: "text-gray-500" },
                                      (0,
                                      date_fns__WEBPACK_IMPORTED_MODULE_5__.Z)(
                                        new Date(
                                          null == post
                                            ? void 0
                                            : post.publishedAt
                                        ),
                                        " dd MMM, yyyy"
                                      )
                                    )
                                ),
                                (null == post ? void 0 : post.excerpt) &&
                                  __jsx(
                                    "p",
                                    { className: "text-sm text-gray-500" },
                                    null == post ? void 0 : post.excerpt
                                  )
                              )
                            );
                          })
                      : null == postsPerCategory
                      ? void 0
                      : postsPerCategory.map(function (post, index) {
                          var _ref3, _post$slug2, _post$authors2;
                          return __jsx(
                            "div",
                            {
                              className: "flex flex-wrap mb-8 -mx-3 lg:mb-6",
                              key: index,
                            },
                            __jsx(
                              "div",
                              {
                                className:
                                  "w-full h-full px-3 mb-4 lg:mb-0 lg:w-1/4",
                              },
                              (null == post ? void 0 : post.mainImage) &&
                                __jsx(
                                  next_image__WEBPACK_IMPORTED_MODULE_2__.Z,
                                  {
                                    className:
                                      "object-cover w-full h-full overflow-hidden rounded",
                                    src: (0,
                                    lib_sanity__WEBPACK_IMPORTED_MODULE_3__.uH)(
                                      null == post ? void 0 : post.mainImage
                                    ),
                                    sizes: "100vw",
                                    width: 188,
                                    height: 129,
                                    alt: "blog-variantD-image-".concat(index),
                                  }
                                )
                            ),
                            __jsx(
                              "div",
                              { className: "w-full px-3 lg:w-3/4" },
                              (null == post ? void 0 : post.title) &&
                                __jsx(
                                  next_link__WEBPACK_IMPORTED_MODULE_1___default(),
                                  {
                                    "aria-label":
                                      null == post ? void 0 : post.title,
                                    className: "hover:text-brand-secondary",
                                    href:
                                      null !==
                                        (_ref3 = "/".concat(
                                          null == post ||
                                            null ===
                                              (_post$slug2 = post.slug) ||
                                            void 0 === _post$slug2
                                            ? void 0
                                            : _post$slug2.current
                                        )) && void 0 !== _ref3
                                        ? _ref3
                                        : "/page-not-found",
                                  },
                                  __jsx(
                                    "p",
                                    {
                                      className:
                                        "mb-1 text-2xl font-bold font-heading",
                                    },
                                    null == post ? void 0 : post.title
                                  )
                                ),
                              __jsx(
                                "div",
                                { className: "flex items-center mb-2 text-sm" },
                                (null == post ? void 0 : post.authors) &&
                                  (null == post ||
                                  null === (_post$authors2 = post.authors) ||
                                  void 0 === _post$authors2
                                    ? void 0
                                    : _post$authors2.map(
                                        function (author, index, _ref4) {
                                          var length = _ref4.length;
                                          return __jsx(
                                            "div",
                                            { className: "flex", key: index },
                                            __jsx(
                                              "span",
                                              {
                                                className: "text-brand-primary",
                                              },
                                              null == author
                                                ? void 0
                                                : author.name
                                            ),
                                            index + 1 !== length
                                              ? __jsx("span", null, " , ")
                                              : null
                                          );
                                        }
                                      )),
                                (null == post ? void 0 : post.publishedAt) &&
                                  (null == post ? void 0 : post.authors) &&
                                  __jsx(
                                    "span",
                                    { className: "mx-2 text-gray-500" },
                                    "•"
                                  ),
                                (null == post ? void 0 : post.publishedAt) &&
                                  __jsx(
                                    "span",
                                    { className: "text-gray-500" },
                                    (0,
                                    date_fns__WEBPACK_IMPORTED_MODULE_5__.Z)(
                                      new Date(
                                        null == post ? void 0 : post.publishedAt
                                      ),
                                      " dd MMM, yyyy"
                                    )
                                  )
                              ),
                              (null == post ? void 0 : post.excerpt) &&
                                __jsx(
                                  "p",
                                  { className: "text-sm text-gray-500" },
                                  null == post ? void 0 : post.excerpt
                                )
                            )
                          );
                        })
                  )
              )
            )
          )
        );
      }
      VariantD.displayName = "VariantD";
      const __WEBPACK_DEFAULT_EXPORT__ =
        react__WEBPACK_IMPORTED_MODULE_0__.memo(VariantD);
      try {
        (VariantD.displayName = "VariantD"),
          (VariantD.__docgenInfo = {
            description: "",
            displayName: "VariantD",
            props: {
              subtitle: {
                defaultValue: null,
                description: "",
                name: "subtitle",
                required: !1,
                type: { name: "string" },
              },
              title: {
                defaultValue: null,
                description: "",
                name: "title",
                required: !1,
                type: { name: "string" },
              },
              posts: {
                defaultValue: null,
                description: "",
                name: "posts",
                required: !1,
                type: { name: "BlogPost[]" },
              },
              primaryButton: {
                defaultValue: null,
                description: "",
                name: "primaryButton",
                required: !1,
                type: { name: "LabeledRoute" },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES[
              "components/sections/blog/variant_d.tsx#VariantD"
            ] = {
              docgenInfo: VariantD.__docgenInfo,
              name: "VariantD",
              path: "components/sections/blog/variant_d.tsx#VariantD",
            });
      } catch (__react_docgen_typescript_loader_error) {}
    },
    "./lib/config.ts": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, { v: () => config });
      var _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ =
        __webpack_require__(
          "./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/defineProperty.js"
        );
      function ownKeys(e, r) {
        var t = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var o = Object.getOwnPropertySymbols(e);
          r &&
            (o = o.filter(function (r) {
              return Object.getOwnPropertyDescriptor(e, r).enumerable;
            })),
            t.push.apply(t, o);
        }
        return t;
      }
      function _objectSpread(e) {
        for (var r = 1; r < arguments.length; r++) {
          var t = null != arguments[r] ? arguments[r] : {};
          r % 2
            ? ownKeys(Object(t), !0).forEach(function (r) {
                (0,
                _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__.Z)(
                  e,
                  r,
                  t[r]
                );
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t))
            : ownKeys(Object(t)).forEach(function (r) {
                Object.defineProperty(
                  e,
                  r,
                  Object.getOwnPropertyDescriptor(t, r)
                );
              });
        }
        return e;
      }
      var config = {
        dataset: "staging",
        projectId: "9itgab5x",
        useCdn: "undefined" != typeof document && !0,
        apiVersion: "2022-03-13",
      };
      config = _objectSpread(
        _objectSpread({}, config),
        {},
        {
          token:
            "skr8WZ2B2tm4HerKBsoY6D5n1bLIPcHsvSbfj6MbmSkctoqznf2e8MGsymGKeoalP8v09S0OYV5N8hjVpqstE35EoU1K5u0sE7aTWKlB4Rk42KmCm6Rijuwj6u9z4VPISFDDKe5yLoJbLE6maUkrCzLV2SiG9Vm3MY7g3Qus50nwlmoq9jms",
        }
      );
    },
    "./lib/sanity.ts": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, {
        YI: () => _portabletext_react__WEBPACK_IMPORTED_MODULE_3__.YI,
        uH: () => urlFor,
      });
      var _sanity_image_url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          "./node_modules/@sanity/image-url/lib/browser/image-url.umd.js"
        ),
        _sanity_image_url__WEBPACK_IMPORTED_MODULE_1___default =
          __webpack_require__.n(_sanity_image_url__WEBPACK_IMPORTED_MODULE_1__),
        _portabletext_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          "./node_modules/@portabletext/react/dist/react-portable-text.esm.js"
        ),
        next_sanity_preview__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          "./node_modules/@sanity/preview-kit/dist/index.js"
        ),
        _config__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__("./lib/config.ts"),
        imageBuilder = _sanity_image_url__WEBPACK_IMPORTED_MODULE_1___default()(
          _config__WEBPACK_IMPORTED_MODULE_0__.v
        ),
        urlFor = function urlFor(source) {
          var _imageBuilder$image$f;
          return (
            (null == source ? void 0 : source.asset) &&
            (null ===
              (_imageBuilder$image$f = imageBuilder
                .image(source)
                .format("webp")) || void 0 === _imageBuilder$image$f
              ? void 0
              : _imageBuilder$image$f.url())
          );
        };
      (0, next_sanity_preview__WEBPACK_IMPORTED_MODULE_2__.R2)(
        _config__WEBPACK_IMPORTED_MODULE_0__.v
      );
    },
  },
]);
