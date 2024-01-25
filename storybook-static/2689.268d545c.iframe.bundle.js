"use strict";
(self.webpackChunk_webriq_pagebuilder_site_template_default =
  self.webpackChunk_webriq_pagebuilder_site_template_default || []).push([
  [2689],
  {
    "./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/extends.js":
      (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        function _extends() {
          return (
            (_extends = Object.assign
              ? Object.assign.bind()
              : function (target) {
                  for (var i = 1; i < arguments.length; i++) {
                    var source = arguments[i];
                    for (var key in source)
                      Object.prototype.hasOwnProperty.call(source, key) &&
                        (target[key] = source[key]);
                  }
                  return target;
                }),
            _extends.apply(this, arguments)
          );
        }
        __webpack_require__.d(__webpack_exports__, { Z: () => _extends });
      },
    "./components/sections/features/variant_g.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        });
      var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          "./node_modules/next/dist/compiled/react/index.js"
        ),
        next_image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          "./node_modules/@storybook/nextjs/dist/images/next-image.mjs"
        ),
        lib_sanity__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__("./lib/sanity.ts"),
        components_ui_Text__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          "./components/ui/Text/index.ts"
        ),
        __jsx = react__WEBPACK_IMPORTED_MODULE_0__.createElement;
      function VariantG(_ref) {
        var _images$,
          _images$2,
          _images$0$alt,
          _images$3,
          _images$4,
          _images$5,
          _images$1$alt,
          _images$6,
          _images$7,
          _images$8,
          _images$2$alt,
          _images$9,
          _images$10,
          _images$11,
          _images$3$alt,
          _images$12,
          caption = _ref.caption,
          title = _ref.title,
          description = _ref.description,
          images = _ref.images,
          tags = _ref.tags;
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
                { className: "flex flex-wrap items-center -mx-4" },
                __jsx(
                  "div",
                  { className: "w-full px-4 mb-12 lg:mb-0 lg:w-1/2" },
                  __jsx(
                    "div",
                    { className: "max-w-md" },
                    caption &&
                      __jsx(
                        "span",
                        { className: "font-bold text-brand-primary" },
                        caption
                      ),
                    title &&
                      __jsx(
                        components_ui_Text__WEBPACK_IMPORTED_MODULE_3__.x,
                        { type: "h1", className: "mb-3" },
                        title
                      ),
                    description &&
                      __jsx(
                        "p",
                        {
                          className:
                            "max-w-sm mb-6 leading-loose text-gray-500",
                        },
                        description
                      ),
                    __jsx(
                      "ul",
                      { className: "font-bold text-gray-500" },
                      tags &&
                        tags.map(function (item) {
                          return __jsx(
                            "li",
                            { className: "flex items-center mb-2", key: item },
                            __jsx(
                              "svg",
                              {
                                className:
                                  "w-5 h-5 mr-2 text-brand-primary-foreground",
                                xmlns: "http://www.w3.org/2000/svg",
                                viewBox: "0 0 20 20",
                                fill: "currentColor",
                              },
                              __jsx("path", {
                                fillRule: "evenodd",
                                d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
                                clipRule: "evenodd",
                              })
                            ),
                            __jsx("span", null, item)
                          );
                        })
                    )
                  )
                ),
                images &&
                  __jsx(
                    "div",
                    { className: "w-full lg:w-1/2" },
                    __jsx(
                      "div",
                      {
                        className:
                          "items-end mb-4 lg:flex lg:flex-wrap xl:flex xl:flex-wrap 2xl:flex 2xl:flex-wrap",
                      },
                      __jsx(
                        "div",
                        {
                          className:
                            "h-full px-3 mb-4 lg:mb-0 lg:w-2/3 xl:mb-0 xl:w-2/3 2xl:mb-0 2xl:w-2/3",
                        },
                        (null == images ||
                        null === (_images$ = images[0]) ||
                        void 0 === _images$
                          ? void 0
                          : _images$.image) &&
                          __jsx(
                            "div",
                            { className: "overflow-hidden rounded" },
                            __jsx(next_image__WEBPACK_IMPORTED_MODULE_1__.Z, {
                              className: "h-[269px] w-full object-cover",
                              src: (0,
                              lib_sanity__WEBPACK_IMPORTED_MODULE_2__.uH)(
                                null === (_images$2 = images[0]) ||
                                  void 0 === _images$2
                                  ? void 0
                                  : _images$2.image
                              ),
                              sizes: "100vw",
                              width: 356,
                              height: 192,
                              alt:
                                null !==
                                  (_images$0$alt =
                                    null === (_images$3 = images[0]) ||
                                    void 0 === _images$3
                                      ? void 0
                                      : _images$3.alt) &&
                                void 0 !== _images$0$alt
                                  ? _images$0$alt
                                  : "features-image-1",
                            })
                          )
                      ),
                      __jsx(
                        "div",
                        {
                          className: "h-full px-3 lg:w-1/3 xl:w-1/3 2xl:w-1/3",
                        },
                        (null == images ||
                        null === (_images$4 = images[1]) ||
                        void 0 === _images$4
                          ? void 0
                          : _images$4.image) &&
                          __jsx(
                            "div",
                            { className: "overflow-hidden rounded" },
                            __jsx(next_image__WEBPACK_IMPORTED_MODULE_1__.Z, {
                              className: "object-cover w-full h-auto",
                              src: (0,
                              lib_sanity__WEBPACK_IMPORTED_MODULE_2__.uH)(
                                null === (_images$5 = images[1]) ||
                                  void 0 === _images$5
                                  ? void 0
                                  : _images$5.image
                              ),
                              sizes: "100vw",
                              width: 166,
                              height: 128,
                              alt:
                                null !==
                                  (_images$1$alt =
                                    null === (_images$6 = images[1]) ||
                                    void 0 === _images$6
                                      ? void 0
                                      : _images$6.alt) &&
                                void 0 !== _images$1$alt
                                  ? _images$1$alt
                                  : "features-image-2",
                            })
                          )
                      )
                    ),
                    __jsx(
                      "div",
                      {
                        className:
                          "items-start mb-4 lg:flex lg:flex-wrap xl:flex xl:flex-wrap 2xl:flex 2xl:flex-wrap",
                      },
                      __jsx(
                        "div",
                        {
                          className:
                            "h-full px-3 mb-4 lg:mb-0 lg:w-1/3 xl:mb-0 xl:w-1/3 2xl:mb-0 2xl:w-1/3",
                        },
                        (null == images ||
                        null === (_images$7 = images[2]) ||
                        void 0 === _images$7
                          ? void 0
                          : _images$7.image) &&
                          __jsx(
                            "div",
                            { className: "overflow-hidden rounded" },
                            __jsx(next_image__WEBPACK_IMPORTED_MODULE_1__.Z, {
                              className:
                                "h-[269px] w-full object-cover lg:h-[126px]",
                              src: (0,
                              lib_sanity__WEBPACK_IMPORTED_MODULE_2__.uH)(
                                null === (_images$8 = images[2]) ||
                                  void 0 === _images$8
                                  ? void 0
                                  : _images$8.image
                              ),
                              width: 166,
                              height: 128,
                              sizes: "100vw",
                              alt:
                                null !==
                                  (_images$2$alt =
                                    null === (_images$9 = images[2]) ||
                                    void 0 === _images$9
                                      ? void 0
                                      : _images$9.alt) &&
                                void 0 !== _images$2$alt
                                  ? _images$2$alt
                                  : "features-image-3",
                            })
                          )
                      ),
                      __jsx(
                        "div",
                        {
                          className: "h-full px-3 lg:w-2/3 xl:w-2/3 2xl:w-2/3",
                        },
                        (null == images ||
                        null === (_images$10 = images[3]) ||
                        void 0 === _images$10
                          ? void 0
                          : _images$10.image) &&
                          __jsx(
                            "div",
                            { className: "overflow-hidden rounded" },
                            __jsx(next_image__WEBPACK_IMPORTED_MODULE_1__.Z, {
                              className: "object-cover w-full h-auto",
                              src: (0,
                              lib_sanity__WEBPACK_IMPORTED_MODULE_2__.uH)(
                                null === (_images$11 = images[3]) ||
                                  void 0 === _images$11
                                  ? void 0
                                  : _images$11.image
                              ),
                              width: 356,
                              height: 192,
                              sizes: "100vw",
                              alt:
                                null !==
                                  (_images$3$alt =
                                    null === (_images$12 = images[3]) ||
                                    void 0 === _images$12
                                      ? void 0
                                      : _images$12.alt) &&
                                void 0 !== _images$3$alt
                                  ? _images$3$alt
                                  : "features-image-4",
                            })
                          )
                      )
                    )
                  )
              )
            )
          )
        );
      }
      VariantG.displayName = "VariantG";
      const __WEBPACK_DEFAULT_EXPORT__ =
        react__WEBPACK_IMPORTED_MODULE_0__.memo(VariantG);
      try {
        (VariantG.displayName = "VariantG"),
          (VariantG.__docgenInfo = {
            description: "",
            displayName: "VariantG",
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
              "components/sections/features/variant_g.tsx#VariantG"
            ] = {
              docgenInfo: VariantG.__docgenInfo,
              name: "VariantG",
              path: "components/sections/features/variant_g.tsx#VariantG",
            });
      } catch (__react_docgen_typescript_loader_error) {}
    },
    "./components/ui/Text/Text.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, { x: () => Text });
      var _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_extends_js__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            "./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/extends.js"
          ),
        _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            "./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"
          ),
        react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          "./node_modules/next/dist/compiled/react/index.js"
        ),
        utils_cn__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__("./utils/cn.ts"),
        _excluded = ["type", "className", "children", "style", "muted"],
        __jsx = react__WEBPACK_IMPORTED_MODULE_0__.createElement;
      function Text(_ref) {
        var _variants$type,
          _ref$type = _ref.type,
          type = void 0 === _ref$type ? "p" : _ref$type,
          className = _ref.className,
          children = _ref.children,
          style = _ref.style,
          _ref$muted = _ref.muted,
          muted = void 0 !== _ref$muted && _ref$muted,
          props = (0,
          _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_1__.Z)(
            _ref,
            _excluded
          ),
          Element = ["h1", "h2", "h3", "h4", "h5", "h6", "p"].includes(type)
            ? type
            : "p",
          commonClass = "".concat(muted && "text-gray-500"),
          variants = {
            h1: "".concat(
              commonClass,
              " text-4xl font-bold lg:text-5xl font-heading"
            ),
            h2: "".concat(commonClass, " text-3xl font-bold lg:text-4xl"),
            h3: "".concat(commonClass, " text-2xl font-bold lg:text-3xl"),
            h4: "".concat(commonClass, " font-bold text-2xl"),
            h5: "".concat(commonClass, " font-medium text-xl"),
            h6: "".concat(commonClass, " font-medium text-lg"),
            p: "".concat(commonClass, " text-base"),
          },
          variantClass =
            null !== (_variants$type = variants[type]) &&
            void 0 !== _variants$type
              ? _variants$type
              : variants.p;
        return __jsx(
          Element,
          (0,
          _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_extends_js__WEBPACK_IMPORTED_MODULE_2__.Z)(
            {
              style,
              className: (0, utils_cn__WEBPACK_IMPORTED_MODULE_3__.cn)(
                variantClass,
                className
              ),
            },
            props
          ),
          children
        );
      }
      Text.displayName = "Text";
      try {
        (Text.displayName = "Text"),
          (Text.__docgenInfo = {
            description: "",
            displayName: "Text",
            props: {
              type: {
                defaultValue: { value: "p" },
                description: "",
                name: "type",
                required: !1,
                type: {
                  name: "enum",
                  value: [
                    { value: '"h1"' },
                    { value: '"h2"' },
                    { value: '"h3"' },
                    { value: '"h4"' },
                    { value: '"h5"' },
                    { value: '"h6"' },
                    { value: '"p"' },
                  ],
                },
              },
              className: {
                defaultValue: null,
                description: "",
                name: "className",
                required: !1,
                type: { name: "string" },
              },
              style: {
                defaultValue: null,
                description: "",
                name: "style",
                required: !1,
                type: { name: "CSSProperties" },
              },
              muted: {
                defaultValue: { value: "false" },
                description: "",
                name: "muted",
                required: !1,
                type: { name: "boolean" },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["components/ui/Text/Text.tsx#Text"] = {
              docgenInfo: Text.__docgenInfo,
              name: "Text",
              path: "components/ui/Text/Text.tsx#Text",
            });
      } catch (__react_docgen_typescript_loader_error) {}
    },
    "./components/ui/Text/index.ts": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, {
        x: () => _Text__WEBPACK_IMPORTED_MODULE_0__.x,
      });
      var _Text__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        "./components/ui/Text/Text.tsx"
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
