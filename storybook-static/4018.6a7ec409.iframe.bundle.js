"use strict";
(self.webpackChunk_webriq_pagebuilder_site_template_default =
  self.webpackChunk_webriq_pagebuilder_site_template_default || []).push([
  [4018],
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
    "./components/sections/header/variant_d.tsx": (
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
        next_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          "./node_modules/@storybook/nextjs/dist/images/next-image.mjs"
        ),
        components_ui_ConditionalLink__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__("./components/ui/ConditionalLink/index.ts"),
        __jsx = react__WEBPACK_IMPORTED_MODULE_0__.createElement;
      function VariantD(_ref) {
        _ref.template;
        var _mainImage$image,
          _mainImage$alt,
          mainImage = _ref.mainImage,
          title = _ref.title,
          description = _ref.description,
          primaryButton = _ref.primaryButton,
          secondaryButton = _ref.secondaryButton;
        return __jsx(
          "section",
          { className: "overflow-hidden" },
          __jsx(
            "div",
            {
              className:
                "relative py-20 overflow-hidden bg-gray-50 md:pb-40 md:pt-20 lg:pb-40 lg:pt-28 xl:pb-40 xl:pt-28 2xl:pb-40 2xl:pt-28",
            },
            __jsx(
              "div",
              { className: "container px-4 mx-auto" },
              __jsx(
                "div",
                { className: "flex flex-wrap -mx-4" },
                __jsx(
                  "div",
                  { className: "flex items-center w-full px-4 lg:w-1/2" },
                  __jsx(
                    "div",
                    {
                      className:
                        "w-full text-center lg:text-left xl:text-left 2xl:text-left",
                    },
                    __jsx(
                      "div",
                      { className: "relative max-w-md mx-auto" },
                      __jsx(
                        "h1",
                        {
                          className:
                            "max-w-md mb-3 text-3xl font-bold md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-5xl",
                        },
                        title && __jsx("span", null, title)
                      )
                    ),
                    __jsx(
                      "div",
                      { className: "relative max-w-md mx-auto" },
                      description &&
                        __jsx(
                          "p",
                          { className: "mb-6 leading-loose text-gray-500" },
                          description
                        ),
                      __jsx(
                        "div",
                        null,
                        (null == primaryButton
                          ? void 0
                          : primaryButton.label) &&
                          __jsx(
                            components_ui_ConditionalLink__WEBPACK_IMPORTED_MODULE_3__.M,
                            {
                              ariaLabel:
                                null == primaryButton
                                  ? void 0
                                  : primaryButton.label,
                              link: primaryButton,
                              className: "mb-3 lg:mb-0 lg:mr-3",
                            },
                            null == primaryButton ? void 0 : primaryButton.label
                          ),
                        (null == secondaryButton
                          ? void 0
                          : secondaryButton.label) &&
                          __jsx(
                            components_ui_ConditionalLink__WEBPACK_IMPORTED_MODULE_3__.M,
                            {
                              ariaLabel:
                                null == secondaryButton
                                  ? void 0
                                  : secondaryButton.label,
                              link: secondaryButton,
                              className: "text-black bg-white hover:bg-gray-50",
                            },
                            null == secondaryButton
                              ? void 0
                              : secondaryButton.label
                          )
                      )
                    )
                  )
                ),
                __jsx(
                  "div",
                  { className: "w-full px-4 lg:w-1/2 xl:w-1/2 2xl:w-1/2" },
                  (null == mainImage ||
                  null === (_mainImage$image = mainImage.image) ||
                  void 0 === _mainImage$image ||
                  null === (_mainImage$image = _mainImage$image.asset) ||
                  void 0 === _mainImage$image
                    ? void 0
                    : _mainImage$image._ref) &&
                    __jsx(
                      "div",
                      {
                        className:
                          "top-0 w-full h-full my-12 rounded-none lg:absolute lg:my-0 lg:w-1/2 xl:absolute xl:my-0 xl:w-1/2 2xl:absolute 2xl:my-0 2xl:w-1/2",
                      },
                      __jsx(next_image__WEBPACK_IMPORTED_MODULE_2__.Z, {
                        src: (0, lib_sanity__WEBPACK_IMPORTED_MODULE_1__.uH)(
                          null == mainImage ? void 0 : mainImage.image
                        ),
                        width: 1050,
                        height: 700,
                        sizes: "100vw",
                        style: { objectFit: "contain" },
                        alt:
                          null !==
                            (_mainImage$alt =
                              null == mainImage ? void 0 : mainImage.alt) &&
                          void 0 !== _mainImage$alt
                            ? _mainImage$alt
                            : "header-main-image",
                      })
                    )
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
              template: {
                defaultValue: null,
                description: "",
                name: "template",
                required: !1,
                type: { name: "Template" },
              },
              mainImage: {
                defaultValue: null,
                description: "",
                name: "mainImage",
                required: !1,
                type: { name: "MainImage" },
              },
              images: {
                defaultValue: null,
                description: "",
                name: "images",
                required: !1,
                type: { name: "Images[]" },
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
              primaryButton: {
                defaultValue: null,
                description: "",
                name: "primaryButton",
                required: !1,
                type: { name: "LabeledRoute" },
              },
              secondaryButton: {
                defaultValue: null,
                description: "",
                name: "secondaryButton",
                required: !1,
                type: { name: "LabeledRoute" },
              },
              videoLink: {
                defaultValue: null,
                description: "",
                name: "videoLink",
                required: !1,
                type: { name: "string" },
              },
              formLinks: {
                defaultValue: null,
                description: "",
                name: "formLinks",
                required: !1,
                type: { name: "LabeledRouteWithKey[]" },
              },
              form: {
                defaultValue: null,
                description: "",
                name: "form",
                required: !1,
                type: { name: "Form" },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES[
              "components/sections/header/variant_d.tsx#VariantD"
            ] = {
              docgenInfo: VariantD.__docgenInfo,
              name: "VariantD",
              path: "components/sections/header/variant_d.tsx#VariantD",
            });
      } catch (__react_docgen_typescript_loader_error) {}
    },
    "./components/ui/ConditionalLink/ConditionalLink.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, { M: () => ConditionalLink });
      var _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_extends_js__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(
            "./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/extends.js"
          ),
        _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            "./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"
          ),
        next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          "./node_modules/next/link.js"
        ),
        next_link__WEBPACK_IMPORTED_MODULE_1___default = __webpack_require__.n(
          next_link__WEBPACK_IMPORTED_MODULE_1__
        ),
        react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          "./node_modules/next/dist/compiled/react/index.js"
        ),
        utils_cn__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__("./utils/cn.ts"),
        _excluded = [
          "variant",
          "className",
          "ariaLabel",
          "children",
          "link",
          "target",
        ],
        __jsx = react__WEBPACK_IMPORTED_MODULE_0__.createElement,
        ConditionalLink = function ConditionalLink(_ref) {
          var _variants$variant,
            _link$internalLink,
            _ref$variant = _ref.variant,
            variant = void 0 === _ref$variant ? "primary" : _ref$variant,
            className = _ref.className,
            ariaLabel = _ref.ariaLabel,
            children = _ref.children,
            link = _ref.link,
            target = _ref.target,
            props = (0,
            _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_2__.Z)(
              _ref,
              _excluded
            ),
            commonStyles =
              "inline-block py-2 px-6 rounded-l-xl rounded-t-xl font-bold leading-loose transition duration-200",
            primary = "".concat(
              commonStyles,
              " bg-brand-primary hover:bg-brand-primary-foreground text-gray-50  outline-none "
            ),
            outline = "".concat(
              commonStyles,
              " bg-white hover:bg-slate-100  font-bold outline text-brand-primary-foreground outline-brand-primary-foreground "
            ),
            variantClass =
              null !==
                (_variants$variant = {
                  primary,
                  secondary: "".concat(
                    commonStyles,
                    " bg-brand-secondary hover:bg-brand-primary font-bold  text-gray-50"
                  ),
                  outline,
                  link: "",
                }[variant]) && void 0 !== _variants$variant
                ? _variants$variant
                : primary,
            commonProps = {
              className: (0, utils_cn__WEBPACK_IMPORTED_MODULE_3__.cn)(
                variantClass,
                className
              ),
              ariaLabel,
              target,
            };
          return (null != link && link.internalLink) ||
            (null != link && link.externalLink)
            ? "linkInternal" === (null == link ? void 0 : link.type) &&
              null != link &&
              null !== (_link$internalLink = link.internalLink) &&
              void 0 !== _link$internalLink &&
              null !==
                (_link$internalLink = _link$internalLink.toLowerCase()) &&
              void 0 !== _link$internalLink &&
              _link$internalLink.includes("home")
              ? __jsx(
                  next_link__WEBPACK_IMPORTED_MODULE_1___default(),
                  (0,
                  _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_extends_js__WEBPACK_IMPORTED_MODULE_4__.Z)(
                    { href: "/" },
                    commonProps,
                    props
                  ),
                  children
                )
              : "linkInternal" === (null == link ? void 0 : link.type)
              ? __jsx(
                  next_link__WEBPACK_IMPORTED_MODULE_1___default(),
                  (0,
                  _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_extends_js__WEBPACK_IMPORTED_MODULE_4__.Z)(
                    {},
                    commonProps,
                    props,
                    {
                      href: "/".concat(
                        null == link ? void 0 : link.internalLink
                      ),
                    }
                  ),
                  children
                )
              : "linkExternal" === (null == link ? void 0 : link.type)
              ? __jsx(
                  "a",
                  (0,
                  _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_extends_js__WEBPACK_IMPORTED_MODULE_4__.Z)(
                    {},
                    commonProps,
                    props,
                    {
                      href: null == link ? void 0 : link.externalLink,
                      rel:
                        "_blank" === (null == link ? void 0 : link.linkTarget)
                          ? "noopener noreferrer"
                          : null,
                    }
                  ),
                  children
                )
              : __jsx(
                  next_link__WEBPACK_IMPORTED_MODULE_1___default(),
                  (0,
                  _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_extends_js__WEBPACK_IMPORTED_MODULE_4__.Z)(
                    {},
                    commonProps,
                    props,
                    { href: "/" }
                  ),
                  children
                )
            : __jsx(
                "a",
                (0,
                _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_extends_js__WEBPACK_IMPORTED_MODULE_4__.Z)(
                  {},
                  commonProps,
                  props,
                  { href: "/page-not-found" }
                ),
                children
              );
        };
      ConditionalLink.displayName = "ConditionalLink";
      try {
        (ConditionalLink.displayName = "ConditionalLink"),
          (ConditionalLink.__docgenInfo = {
            description: "",
            displayName: "ConditionalLink",
            props: {
              className: {
                defaultValue: null,
                description: "",
                name: "className",
                required: !1,
                type: { name: "string" },
              },
              variant: {
                defaultValue: { value: "primary" },
                description: "",
                name: "variant",
                required: !1,
                type: {
                  name: "enum",
                  value: [
                    { value: '"primary"' },
                    { value: '"outline"' },
                    { value: '"secondary"' },
                    { value: '"link"' },
                  ],
                },
              },
              ariaLabel: {
                defaultValue: null,
                description: "",
                name: "ariaLabel",
                required: !0,
                type: { name: "string" },
              },
              link: {
                defaultValue: null,
                description: "",
                name: "link",
                required: !0,
                type: { name: "any" },
              },
              target: {
                defaultValue: null,
                description: "",
                name: "target",
                required: !1,
                type: {
                  name: "enum",
                  value: [{ value: '"_self"' }, { value: '"_blank"' }],
                },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES[
              "components/ui/ConditionalLink/ConditionalLink.tsx#ConditionalLink"
            ] = {
              docgenInfo: ConditionalLink.__docgenInfo,
              name: "ConditionalLink",
              path: "components/ui/ConditionalLink/ConditionalLink.tsx#ConditionalLink",
            });
      } catch (__react_docgen_typescript_loader_error) {}
    },
    "./components/ui/ConditionalLink/index.ts": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, {
        M: () => _ConditionalLink__WEBPACK_IMPORTED_MODULE_0__.M,
      });
      var _ConditionalLink__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        "./components/ui/ConditionalLink/ConditionalLink.tsx"
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
