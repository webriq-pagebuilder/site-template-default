"use strict";
(self.webpackChunk_webriq_pagebuilder_site_template_default =
  self.webpackChunk_webriq_pagebuilder_site_template_default || []).push([
  [4310],
  {
    "./components/sections/contact/variant_b.tsx": (
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
        components_ui_Card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          "./components/ui/Card/index.ts"
        ),
        components_ui_SocialIcons__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__("./components/ui/SocialIcons/index.tsx"),
        __jsx = react__WEBPACK_IMPORTED_MODULE_0__.createElement;
      function VariantB(_ref) {
        var contactDescription = _ref.contactDescription,
          officeInformation = _ref.officeInformation,
          contactNumber = _ref.contactNumber,
          contactEmail = _ref.contactEmail,
          socialLinks = _ref.socialLinks;
        return __jsx(
          "section",
          null,
          __jsx(
            "div",
            { className: "py-20 radius-for-skewed bg-gray-50" },
            __jsx(
              "div",
              { className: "container px-4 mx-auto" },
              contactDescription &&
                __jsx(
                  "div",
                  { className: "max-w-md mx-auto mb-16 text-center" },
                  __jsx(
                    "h1",
                    {
                      className:
                        "mb-5 text-4xl font-bold font-heading lg:text-5xl",
                    },
                    "Contact"
                  ),
                  __jsx("p", { className: "text-gray-500" }, contactDescription)
                ),
              __jsx(
                "div",
                { className: "flex flex-wrap -mx-4" },
                __jsx(
                  "div",
                  { className: "w-full px-4 mb-8 lg:mb-0 lg:w-1/3" },
                  officeInformation &&
                    __jsx(
                      components_ui_Card__WEBPACK_IMPORTED_MODULE_3__.Z,
                      { className: "p-12 text-center lg:p-20" },
                      __jsx(
                        "h2",
                        {
                          className:
                            "mb-8 text-3xl font-bold font-heading lg:mb-20",
                        },
                        "Office"
                      ),
                      __jsx(
                        "p",
                        { className: "text-gray-500" },
                        officeInformation
                      )
                    )
                ),
                __jsx(
                  "div",
                  { className: "w-full px-4 mb-8 lg:mb-0 lg:w-1/3" },
                  contactEmail || contactNumber
                    ? __jsx(
                        components_ui_Card__WEBPACK_IMPORTED_MODULE_3__.Z,
                        { className: "py-12 text-center lg:py-20" },
                        __jsx(
                          "h2",
                          {
                            className:
                              "mb-8 text-3xl font-bold font-heading lg:mb-20",
                          },
                          "Contacts"
                        ),
                        __jsx(
                          "p",
                          { className: "text-gray-500" },
                          contactEmail
                        ),
                        __jsx(
                          "p",
                          { className: "text-gray-500" },
                          contactNumber
                        )
                      )
                    : null
                ),
                __jsx(
                  "div",
                  { className: "flex items-stretch w-full px-4 lg:w-1/3" },
                  socialLinks &&
                    __jsx(
                      components_ui_Card__WEBPACK_IMPORTED_MODULE_3__.Z,
                      { className: "w-full py-12 text-center lg:py-20" },
                      __jsx(
                        "h2",
                        {
                          className:
                            "mb-8 text-3xl font-bold font-heading lg:mb-20",
                        },
                        "Socials"
                      ),
                      __jsx(
                        "div",
                        { className: "flex justify-center" },
                        null == socialLinks
                          ? void 0
                          : socialLinks.map(function (social) {
                              var _social$socialMediaIc,
                                _social$socialMediaIc2,
                                _social$socialMediaIc3,
                                _social$socialMediaIc4;
                              return __jsx(
                                "a",
                                {
                                  "aria-label":
                                    (null == social
                                      ? void 0
                                      : social.socialMedia) ||
                                    (null == social
                                      ? void 0
                                      : social.socialMediaPlatform),
                                  className:
                                    "inline-block mr-4 rounded hover:bg-gray-100",
                                  target: "_blank",
                                  rel: "noopener noreferrer",
                                  href:
                                    null == social
                                      ? void 0
                                      : social.socialMediaLink,
                                  key: null == social ? void 0 : social._key,
                                },
                                null != social &&
                                  null !==
                                    (_social$socialMediaIc =
                                      social.socialMediaIcon) &&
                                  void 0 !== _social$socialMediaIc &&
                                  _social$socialMediaIc.image
                                  ? __jsx(
                                      next_image__WEBPACK_IMPORTED_MODULE_2__.Z,
                                      {
                                        src: (0,
                                        lib_sanity__WEBPACK_IMPORTED_MODULE_1__.uH)(
                                          null == social ||
                                            null ===
                                              (_social$socialMediaIc2 =
                                                social.socialMediaIcon) ||
                                            void 0 === _social$socialMediaIc2
                                            ? void 0
                                            : _social$socialMediaIc2.image
                                        ),
                                        width: 24,
                                        height: 24,
                                        alt:
                                          null !==
                                            (_social$socialMediaIc3 =
                                              null == social ||
                                              null ===
                                                (_social$socialMediaIc4 =
                                                  social.socialMediaIcon) ||
                                              void 0 === _social$socialMediaIc4
                                                ? void 0
                                                : _social$socialMediaIc4.alt) &&
                                          void 0 !== _social$socialMediaIc3
                                            ? _social$socialMediaIc3
                                            : "contact-socialMedia-icon",
                                      }
                                    )
                                  : __jsx(
                                      components_ui_SocialIcons__WEBPACK_IMPORTED_MODULE_4__.Q,
                                      { social: social.socialMedia }
                                    )
                              );
                            })
                      )
                    )
                )
              )
            )
          )
        );
      }
      VariantB.displayName = "VariantB";
      const __WEBPACK_DEFAULT_EXPORT__ =
        react__WEBPACK_IMPORTED_MODULE_0__.memo(VariantB);
      try {
        (VariantB.displayName = "VariantB"),
          (VariantB.__docgenInfo = {
            description: "",
            displayName: "VariantB",
            props: {
              title: {
                defaultValue: null,
                description: "",
                name: "title",
                required: !1,
                type: { name: "string" },
              },
              contactDescription: {
                defaultValue: null,
                description: "",
                name: "contactDescription",
                required: !1,
                type: { name: "string" },
              },
              officeInformation: {
                defaultValue: null,
                description: "",
                name: "officeInformation",
                required: !1,
                type: { name: "string" },
              },
              contactEmail: {
                defaultValue: null,
                description: "",
                name: "contactEmail",
                required: !1,
                type: { name: "string" },
              },
              contactNumber: {
                defaultValue: null,
                description: "",
                name: "contactNumber",
                required: !1,
                type: { name: "string" },
              },
              socialLinks: {
                defaultValue: null,
                description: "",
                name: "socialLinks",
                required: !1,
                type: { name: "SocialLink[]" },
              },
              form: {
                defaultValue: null,
                description: "",
                name: "form",
                required: !1,
                type: { name: "Form" },
              },
              block: {
                defaultValue: null,
                description: "",
                name: "block",
                required: !1,
                type: { name: "any" },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES[
              "components/sections/contact/variant_b.tsx#VariantB"
            ] = {
              docgenInfo: VariantB.__docgenInfo,
              name: "VariantB",
              path: "components/sections/contact/variant_b.tsx#VariantB",
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
    "./components/ui/SocialIcons/SocialIcons.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, { Q: () => SocialIcon });
      var _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_extends_js__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(
            "./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/extends.js"
          ),
        _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            "./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"
          ),
        react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          "./node_modules/next/dist/compiled/react/index.js"
        ),
        react_icons_fa__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          "./node_modules/react-icons/fa/index.esm.js"
        ),
        utils_cn__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__("./utils/cn.ts"),
        _excluded = ["social", "className"],
        __jsx = react__WEBPACK_IMPORTED_MODULE_0__.createElement,
        FacebookIcon = function FacebookIcon(props) {
          return __jsx(
            "svg",
            {
              className: "",
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24",
            },
            __jsx("path", {
              fill: "#0045d8",
              d: "M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z",
            })
          );
        };
      FacebookIcon.displayName = "FacebookIcon";
      var TwitterIcon = function TwitterIcon(props) {
        return __jsx(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            width: "24",
            height: "24",
            viewBox: "0 0 24 24",
          },
          __jsx("path", {
            fill: "#0045d8",
            d: "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z",
          })
        );
      };
      TwitterIcon.displayName = "TwitterIcon";
      var InstagramIcon = function InstagramIcon(props) {
        return __jsx(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            width: "24",
            height: "24",
            viewBox: "0 0 24 24",
          },
          __jsx("path", {
            fill: "#0045d8",
            d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
          })
        );
      };
      InstagramIcon.displayName = "InstagramIcon";
      var SocialIconMap = {
        facebook: FacebookIcon,
        twitter: TwitterIcon,
        instagram: InstagramIcon,
        youtube: react_icons_fa__WEBPACK_IMPORTED_MODULE_1__.V2E,
        linkedin: react_icons_fa__WEBPACK_IMPORTED_MODULE_1__.ltd,
      };
      function SocialIcon(_ref) {
        var _SocialIconMap$social,
          _ref$social = _ref.social,
          social = void 0 === _ref$social ? "facebook" : _ref$social,
          className = _ref.className,
          props = (0,
          _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_2__.Z)(
            _ref,
            _excluded
          ),
          Component =
            null !== (_SocialIconMap$social = SocialIconMap[social]) &&
            void 0 !== _SocialIconMap$social
              ? _SocialIconMap$social
              : react_icons_fa__WEBPACK_IMPORTED_MODULE_1__.Am9;
        return __jsx(
          Component,
          (0,
          _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_extends_js__WEBPACK_IMPORTED_MODULE_3__.Z)(
            {
              className: (0, utils_cn__WEBPACK_IMPORTED_MODULE_4__.cn)(
                "w-8 h-8 text-brand-primary-foreground",
                className
              ),
            },
            props
          )
        );
      }
      SocialIcon.displayName = "SocialIcon";
      try {
        (SocialIcon.displayName = "SocialIcon"),
          (SocialIcon.__docgenInfo = {
            description: "",
            displayName: "SocialIcon",
            props: {
              social: {
                defaultValue: { value: "facebook" },
                description: "",
                name: "social",
                required: !1,
                type: {
                  name: "enum",
                  value: [
                    { value: '"facebook"' },
                    { value: '"instagram"' },
                    { value: '"youtube"' },
                    { value: '"linkedin"' },
                    { value: '"twitter"' },
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
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES[
              "components/ui/SocialIcons/SocialIcons.tsx#SocialIcon"
            ] = {
              docgenInfo: SocialIcon.__docgenInfo,
              name: "SocialIcon",
              path: "components/ui/SocialIcons/SocialIcons.tsx#SocialIcon",
            });
      } catch (__react_docgen_typescript_loader_error) {}
    },
    "./components/ui/SocialIcons/index.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, {
        Q: () => _SocialIcons__WEBPACK_IMPORTED_MODULE_0__.Q,
      });
      var _SocialIcons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        "./components/ui/SocialIcons/SocialIcons.tsx"
      );
      try {
        (SocialIcon.displayName = "SocialIcon"),
          (SocialIcon.__docgenInfo = {
            description: "",
            displayName: "SocialIcon",
            props: {
              social: {
                defaultValue: { value: "facebook" },
                description: "",
                name: "social",
                required: !1,
                type: {
                  name: "enum",
                  value: [
                    { value: '"facebook"' },
                    { value: '"instagram"' },
                    { value: '"youtube"' },
                    { value: '"linkedin"' },
                    { value: '"twitter"' },
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
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES[
              "components/ui/SocialIcons/index.tsx#SocialIcon"
            ] = {
              docgenInfo: SocialIcon.__docgenInfo,
              name: "SocialIcon",
              path: "components/ui/SocialIcons/index.tsx#SocialIcon",
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
