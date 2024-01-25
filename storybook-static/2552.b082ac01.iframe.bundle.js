"use strict";
(self.webpackChunk_webriq_pagebuilder_site_template_default =
  self.webpackChunk_webriq_pagebuilder_site_template_default || []).push([
  [2552, 8526],
  {
    "./components/sections/text_component/variant_a.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          default: () => __WEBPACK_DEFAULT_EXPORT__,
          textComponentBlockStyling: () => textComponentBlockStyling,
        });
      var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          "./node_modules/next/dist/compiled/react/index.js"
        ),
        lib_sanity__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__("./lib/sanity.ts"),
        __jsx = react__WEBPACK_IMPORTED_MODULE_0__.createElement,
        textComponentBlockStyling = {
          block: {
            h1: function h1(_ref) {
              var children = _ref.children;
              return __jsx(
                "h1",
                { className: "mb-6 text-7xl leading-loose text-gray-900" },
                children
              );
            },
            h2: function h2(_ref2) {
              var children = _ref2.children;
              return __jsx(
                "h2",
                { className: "mb-6 text-5xl leading-loose text-gray-900" },
                children
              );
            },
            h3: function h3(_ref3) {
              var children = _ref3.children;
              return __jsx(
                "h3",
                { className: "mb-6 text-3xl leading-loose text-gray-900" },
                children
              );
            },
            h4: function h4(_ref4) {
              var children = _ref4.children;
              return __jsx(
                "h4",
                { className: "mb-6 text-xl leading-loose text-gray-900" },
                children
              );
            },
            normal: function normal(_ref5) {
              var children = _ref5.children;
              return __jsx(
                "p",
                {
                  className: "mb-5 text-justify leading-relaxed text-gray-500",
                },
                children
              );
            },
            blockquote: function blockquote(_ref6) {
              var children = _ref6.children;
              return __jsx(
                "blockquote",
                { className: "mb-6 px-14 italic leading-loose text-gray-500" },
                "- ",
                children
              );
            },
          },
          code: function code(_ref7) {
            var value = _ref7.value;
            return __jsx(
              "pre",
              { "data-language": value.language },
              __jsx("code", null, value.code)
            );
          },
          list: {
            bullet: function bullet(_ref8) {
              var children = _ref8.children;
              return __jsx(
                "ul",
                {
                  className: "mb-6 list-disc pl-10 leading-loose text-gray-900",
                },
                children
              );
            },
            number: function number(_ref9) {
              var children = _ref9.children;
              return __jsx(
                "ol",
                { className: "mb-6 list-decimal leading-loose text-gray-900" },
                children
              );
            },
          },
          listItem: {
            bullet: function bullet(_ref10) {
              var children = _ref10.children;
              return __jsx(
                "li",
                { className: "mb-6 leading-loose text-gray-900" },
                children
              );
            },
          },
          marks: {
            strong: function strong(_ref11) {
              var children = _ref11.children;
              return __jsx("strong", null, children);
            },
            em: function em(_ref12) {
              var children = _ref12.children;
              return __jsx("em", null, children);
            },
            code: function code(_ref13) {
              var children = _ref13.children;
              return __jsx("code", null, children);
            },
            link: function link(_ref14) {
              var _value$href,
                children = _ref14.children,
                value = _ref14.value;
              return __jsx(
                "a",
                {
                  "aria-label":
                    null !== (_value$href = value.href) &&
                    void 0 !== _value$href
                      ? _value$href
                      : "external link",
                  className:
                    "text-brand-primary-foreground hover:text-brand-secondary-foreground",
                  href: null == value ? void 0 : value.href,
                  target: "_blank",
                  rel: "noopener noreferrer",
                },
                children
              );
            },
          },
        };
      function VariantA(_ref15) {
        var heading = _ref15.heading,
          firstColumn = _ref15.firstColumn;
        return __jsx(
          "section",
          { className: "py-20" },
          __jsx(
            "div",
            { className: "container mx-auto px-4" },
            __jsx(
              "h1",
              {
                className:
                  "font-heading mb-5 text-center text-xl font-semibold lg:text-3xl",
              },
              heading
            ),
            __jsx(
              "div",
              { className: "mx-auto flex flex-wrap justify-center" },
              firstColumn &&
                __jsx(
                  "div",
                  { className: "mb-2 text-xs md:mb-0 md:w-1/2 lg:text-base" },
                  __jsx(lib_sanity__WEBPACK_IMPORTED_MODULE_1__.YI, {
                    value: firstColumn,
                    components: textComponentBlockStyling,
                  })
                )
            )
          )
        );
      }
      VariantA.displayName = "VariantA";
      const __WEBPACK_DEFAULT_EXPORT__ =
        react__WEBPACK_IMPORTED_MODULE_0__.memo(VariantA);
      try {
        (VariantA.displayName = "VariantA"),
          (VariantA.__docgenInfo = {
            description: "",
            displayName: "VariantA",
            props: {
              heading: {
                defaultValue: null,
                description: "",
                name: "heading",
                required: !1,
                type: { name: "string" },
              },
              firstColumn: {
                defaultValue: null,
                description: "",
                name: "firstColumn",
                required: !1,
                type: { name: "PortableTextBlock[]" },
              },
              secondColumn: {
                defaultValue: null,
                description: "",
                name: "secondColumn",
                required: !1,
                type: { name: "PortableTextBlock[]" },
              },
              thirdColumn: {
                defaultValue: null,
                description: "",
                name: "thirdColumn",
                required: !1,
                type: { name: "PortableTextBlock[]" },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES[
              "components/sections/text_component/variant_a.tsx#VariantA"
            ] = {
              docgenInfo: VariantA.__docgenInfo,
              name: "VariantA",
              path: "components/sections/text_component/variant_a.tsx#VariantA",
            });
      } catch (__react_docgen_typescript_loader_error) {}
    },
    "./components/sections/text_component/variant_c.tsx": (
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
        lib_sanity__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__("./lib/sanity.ts"),
        _variant_a__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          "./components/sections/text_component/variant_a.tsx"
        ),
        __jsx = react__WEBPACK_IMPORTED_MODULE_0__.createElement;
      function VariantC(_ref) {
        var heading = _ref.heading,
          firstColumn = _ref.firstColumn,
          secondColumn = _ref.secondColumn,
          thirdColumn = _ref.thirdColumn;
        return __jsx(
          "section",
          { className: "py-20" },
          __jsx(
            "div",
            { className: "container mx-auto px-4" },
            __jsx(
              "h1",
              {
                className:
                  "font-heading mb-5 text-center text-xl font-semibold lg:text-3xl",
              },
              heading
            ),
            __jsx(
              "div",
              { className: "mx-auto flex flex-wrap justify-center" },
              firstColumn &&
                __jsx(
                  "div",
                  {
                    className:
                      "mb-6 px-3 text-justify text-xs leading-relaxed text-gray-500 md:mb-0 lg:w-1/4 lg:text-base",
                  },
                  __jsx(lib_sanity__WEBPACK_IMPORTED_MODULE_1__.YI, {
                    value: firstColumn,
                    components:
                      _variant_a__WEBPACK_IMPORTED_MODULE_2__.textComponentBlockStyling,
                  })
                ),
              secondColumn &&
                __jsx(
                  "div",
                  {
                    className:
                      "mb-6 px-3 text-justify text-xs leading-relaxed text-gray-500 md:mb-0 lg:w-1/4 lg:text-base",
                  },
                  __jsx(lib_sanity__WEBPACK_IMPORTED_MODULE_1__.YI, {
                    value: secondColumn,
                    components:
                      _variant_a__WEBPACK_IMPORTED_MODULE_2__.textComponentBlockStyling,
                  })
                ),
              thirdColumn &&
                __jsx(
                  "div",
                  {
                    className:
                      "mb-6 px-3 text-justify text-xs leading-relaxed text-gray-500 md:mb-0 lg:w-1/4 lg:text-base",
                  },
                  __jsx(lib_sanity__WEBPACK_IMPORTED_MODULE_1__.YI, {
                    value: thirdColumn,
                    components:
                      _variant_a__WEBPACK_IMPORTED_MODULE_2__.textComponentBlockStyling,
                  })
                )
            )
          )
        );
      }
      VariantC.displayName = "VariantC";
      const __WEBPACK_DEFAULT_EXPORT__ =
        react__WEBPACK_IMPORTED_MODULE_0__.memo(VariantC);
      try {
        (VariantC.displayName = "VariantC"),
          (VariantC.__docgenInfo = {
            description: "",
            displayName: "VariantC",
            props: {
              heading: {
                defaultValue: null,
                description: "",
                name: "heading",
                required: !1,
                type: { name: "string" },
              },
              firstColumn: {
                defaultValue: null,
                description: "",
                name: "firstColumn",
                required: !1,
                type: { name: "PortableTextBlock[]" },
              },
              secondColumn: {
                defaultValue: null,
                description: "",
                name: "secondColumn",
                required: !1,
                type: { name: "PortableTextBlock[]" },
              },
              thirdColumn: {
                defaultValue: null,
                description: "",
                name: "thirdColumn",
                required: !1,
                type: { name: "PortableTextBlock[]" },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES[
              "components/sections/text_component/variant_c.tsx#VariantC"
            ] = {
              docgenInfo: VariantC.__docgenInfo,
              name: "VariantC",
              path: "components/sections/text_component/variant_c.tsx#VariantC",
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
