"use strict";
(self.webpackChunk_webriq_pagebuilder_site_template_default =
  self.webpackChunk_webriq_pagebuilder_site_template_default || []).push([
  [5019],
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
    "./components/sections/features/variant_e.tsx": (
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
        next_image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          "./node_modules/@storybook/nextjs/dist/images/next-image.mjs"
        ),
        lib_sanity__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__("./lib/sanity.ts"),
        components_ui_Card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          "./components/ui/Card/index.ts"
        ),
        __jsx = react__WEBPACK_IMPORTED_MODULE_0__.createElement;
      function VariantE(_ref) {
        var _featuredItems$item,
          _featuredItems$item2,
          _featuredItems$item$m,
          _featuredItems$item3,
          _featuredItems$item4,
          _featuredItems$item5,
          _featuredItems$item6,
          _featuredItems$item7,
          _featuredItems$item8,
          _featuredItems$item9,
          featuredItems = _ref.featuredItems,
          _React$useState = react__WEBPACK_IMPORTED_MODULE_0__.useState(0),
          _React$useState2 = (0,
          _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_4__.Z)(
            _React$useState,
            2
          ),
          item = _React$useState2[0],
          setItem = _React$useState2[1],
          slider = function slider(action) {
            "next" === action
              ? item !== featuredItems.length - 1
                ? setItem(function (prevState) {
                    return prevState + 1;
                  })
                : setItem(0)
              : setItem(
                  item >= 1
                    ? function (prevState) {
                        return prevState - 1;
                      }
                    : featuredItems.length - 1
                );
          };
        return __jsx(
          "section",
          null,
          __jsx(
            "div",
            { className: "py-20 overflow-x-auto radius-for-skewed bg-gray-50" },
            __jsx(
              "div",
              { className: "container px-4 mx-auto" },
              __jsx(
                "div",
                { className: "relative flex" },
                __jsx(
                  "div",
                  {
                    className:
                      "absolute left-0 z-40 items-center mt-20 -mx-3 order-0 md:mt-40 lg:mt-60 xl:-mx-6 xl:flex",
                  },
                  (null == featuredItems ? void 0 : featuredItems.length) >=
                    2 &&
                    __jsx(
                      "button",
                      {
                        "aria-label": "Show Previous Feature",
                        className:
                          "z-10 p-4 text-white rounded-l-xl rounded-t-xl bg-brand-primary-foreground hover:bg-brand-primary focus:outline-none",
                        onClick: function onClick() {
                          return slider("prev");
                        },
                      },
                      __jsx(
                        "svg",
                        {
                          className: "w-4 h-4",
                          xmlns: "http://www.w3.org/2000/svg",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          stroke: "currentColor",
                        },
                        __jsx("path", {
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          strokeWidth: "2",
                          d: "M10 19l-7-7m0 0l7-7m-7 7h18",
                        })
                      )
                    )
                ),
                __jsx(
                  "div",
                  { className: "order-1 w-full ml-auto xl:w-4/5" },
                  (null == featuredItems ||
                  null === (_featuredItems$item = featuredItems[item]) ||
                  void 0 === _featuredItems$item ||
                  null ===
                    (_featuredItems$item = _featuredItems$item.mainImage) ||
                  void 0 === _featuredItems$item ||
                  null === (_featuredItems$item = _featuredItems$item.image) ||
                  void 0 === _featuredItems$item ||
                  null === (_featuredItems$item = _featuredItems$item.asset) ||
                  void 0 === _featuredItems$item
                    ? void 0
                    : _featuredItems$item._ref) &&
                    __jsx(
                      "div",
                      {
                        className:
                          "mx-auto overflow-hidden rounded-md md:max-w-xl xl:max-w-4xl",
                      },
                      __jsx(next_image__WEBPACK_IMPORTED_MODULE_1__.Z, {
                        className: "relative object-cover",
                        src: (0, lib_sanity__WEBPACK_IMPORTED_MODULE_2__.uH)(
                          null == featuredItems ||
                            null ===
                              (_featuredItems$item2 = featuredItems[item]) ||
                            void 0 === _featuredItems$item2 ||
                            null ===
                              (_featuredItems$item2 =
                                _featuredItems$item2.mainImage) ||
                            void 0 === _featuredItems$item2
                            ? void 0
                            : _featuredItems$item2.image
                        ),
                        sizes: "100vw",
                        width: 896,
                        height: 575,
                        alt:
                          null !==
                            (_featuredItems$item$m =
                              null == featuredItems ||
                              null ===
                                (_featuredItems$item3 = featuredItems[item]) ||
                              void 0 === _featuredItems$item3 ||
                              null ===
                                (_featuredItems$item3 =
                                  _featuredItems$item3.mainImage) ||
                              void 0 === _featuredItems$item3
                                ? void 0
                                : _featuredItems$item3.alt) &&
                          void 0 !== _featuredItems$item$m
                            ? _featuredItems$item$m
                            : "features-image-".concat(item),
                      })
                    ),
                  __jsx(
                    components_ui_Card__WEBPACK_IMPORTED_MODULE_3__.Z,
                    {
                      className:
                        "top-0 left-0 max-w-xl p-6 mx-auto text-center md:mt-12 md:p-10 lg:mt-12 lg:p-10 xl:absolute xl:mx-0 xl:mt-20 xl:py-24",
                    },
                    __jsx(
                      "span",
                      {
                        className:
                          "text-xs font-bold lg:text-md text-brand-primary md:text-sm xl:text-lg",
                      },
                      (null == featuredItems ||
                      null === (_featuredItems$item4 = featuredItems[item]) ||
                      void 0 === _featuredItems$item4
                        ? void 0
                        : _featuredItems$item4.subtitle) &&
                        (null == featuredItems ||
                        null === (_featuredItems$item5 = featuredItems[item]) ||
                        void 0 === _featuredItems$item5
                          ? void 0
                          : _featuredItems$item5.subtitle)
                    ),
                    __jsx(
                      "h1",
                      {
                        className:
                          "text-lg font-bold font-heading md:mt-5 md:text-3xl lg:mt-5 lg:text-5xl",
                      },
                      (null == featuredItems ||
                      null === (_featuredItems$item6 = featuredItems[item]) ||
                      void 0 === _featuredItems$item6
                        ? void 0
                        : _featuredItems$item6.title) &&
                        (null == featuredItems ||
                        null === (_featuredItems$item7 = featuredItems[item]) ||
                        void 0 === _featuredItems$item7
                          ? void 0
                          : _featuredItems$item7.title)
                    ),
                    __jsx(
                      "p",
                      {
                        className:
                          "mx-auto text-xs leading-loose text-gray-500 md:mt-5 md:text-sm lg:mt-5 lg:text-sm",
                      },
                      (null == featuredItems ||
                      null === (_featuredItems$item8 = featuredItems[item]) ||
                      void 0 === _featuredItems$item8
                        ? void 0
                        : _featuredItems$item8.description) &&
                        (null == featuredItems ||
                        null === (_featuredItems$item9 = featuredItems[item]) ||
                        void 0 === _featuredItems$item9
                          ? void 0
                          : _featuredItems$item9.description)
                    )
                  )
                ),
                __jsx(
                  "div",
                  {
                    className:
                      "absolute right-0 items-center order-2 mt-20 -mx-3 md:mt-40 lg:mt-60 xl:-mx-6 xl:flex",
                  },
                  (null == featuredItems ? void 0 : featuredItems.length) >=
                    2 &&
                    __jsx(
                      "button",
                      {
                        "aria-label": "Show Next Feature",
                        className:
                          "p-4 text-white rounded-r-xl rounded-t-xl bg-brand-primary-foreground hover:bg-brand-primary focus:outline-none",
                        onClick: function onClick() {
                          return slider("next");
                        },
                      },
                      __jsx(
                        "svg",
                        {
                          className: "w-4 h-4",
                          xmlns: "http://www.w3.org/2000/svg",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          stroke: "currentColor",
                        },
                        __jsx("path", {
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          strokeWidth: "2",
                          d: "M14 5l7 7m0 0l-7 7m7-7H3",
                        })
                      )
                    )
                )
              )
            )
          )
        );
      }
      VariantE.displayName = "VariantE";
      const __WEBPACK_DEFAULT_EXPORT__ =
        react__WEBPACK_IMPORTED_MODULE_0__.memo(VariantE);
      try {
        (VariantE.displayName = "VariantE"),
          (VariantE.__docgenInfo = {
            description: "",
            displayName: "VariantE",
            props: {
              caption: {
                defaultValue: null,
                description: "",
                name: "caption",
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
              description: {
                defaultValue: null,
                description: "",
                name: "description",
                required: !1,
                type: { name: "string" },
              },
              features: {
                defaultValue: null,
                description: "",
                name: "features",
                required: !1,
                type: { name: "ArrayOfImageTitleAndText[]" },
              },
              tags: {
                defaultValue: null,
                description: "",
                name: "tags",
                required: !1,
                type: { name: "string[]" },
              },
              featuredItems: {
                defaultValue: null,
                description: "",
                name: "featuredItems",
                required: !1,
                type: { name: "FeaturedItem[]" },
              },
              images: {
                defaultValue: null,
                description: "",
                name: "images",
                required: !1,
                type: { name: "Images[]" },
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
              "components/sections/features/variant_e.tsx#VariantE"
            ] = {
              docgenInfo: VariantE.__docgenInfo,
              name: "VariantE",
              path: "components/sections/features/variant_e.tsx#VariantE",
            });
      } catch (__react_docgen_typescript_loader_error) {}
    },
    "./components/ui/Card/Card.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, { Z: () => Card });
      var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          "./node_modules/next/dist/compiled/react/index.js"
        ),
        utils_cn__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__("./utils/cn.ts"),
        __jsx = react__WEBPACK_IMPORTED_MODULE_0__.createElement;
      function Card(_ref) {
        var children = _ref.children,
          className = _ref.className;
        return __jsx(
          "div",
          {
            className: (0, utils_cn__WEBPACK_IMPORTED_MODULE_1__.cn)(
              "rounded-lg border border-solid border-slate-300/30 p-4 shadow-sm ",
              className
            ),
          },
          children
        );
      }
      Card.displayName = "Card";
      try {
        (Card.displayName = "Card"),
          (Card.__docgenInfo = {
            description: "",
            displayName: "Card",
            props: {
              className: {
                defaultValue: null,
                description: "",
                name: "className",
                required: !1,
                type: { name: "string" },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["components/ui/Card/Card.tsx#Card"] = {
              docgenInfo: Card.__docgenInfo,
              name: "Card",
              path: "components/ui/Card/Card.tsx#Card",
            });
      } catch (__react_docgen_typescript_loader_error) {}
    },
    "./components/ui/Card/index.ts": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, {
        Z: () => _Card__WEBPACK_IMPORTED_MODULE_0__.Z,
      });
      var _Card__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        "./components/ui/Card/Card.tsx"
      );
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
    "./utils/cn.ts": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, { cn: () => cn });
      var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          "./node_modules/clsx/dist/clsx.mjs"
        ),
        tailwind_merge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          "./node_modules/tailwind-merge/dist/bundle-mjs.mjs"
        );
      function cn() {
        for (
          var _len = arguments.length, inputs = new Array(_len), _key = 0;
          _key < _len;
          _key++
        )
          inputs[_key] = arguments[_key];
        return (0, tailwind_merge__WEBPACK_IMPORTED_MODULE_0__.m6)(
          (0, clsx__WEBPACK_IMPORTED_MODULE_1__.W)(inputs)
        );
      }
    },
  },
]);
