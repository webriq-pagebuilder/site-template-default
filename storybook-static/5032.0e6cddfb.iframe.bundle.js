"use strict";
(self.webpackChunk_webriq_pagebuilder_site_template_default =
  self.webpackChunk_webriq_pagebuilder_site_template_default || []).push([
  [5032],
  {
    "./components/sections/footer/variant_b.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        });
      var lib_sanity__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__("./lib/sanity.ts"),
        next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          "./node_modules/next/link.js"
        ),
        next_link__WEBPACK_IMPORTED_MODULE_2___default = __webpack_require__.n(
          next_link__WEBPACK_IMPORTED_MODULE_2__
        ),
        next_image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          "./node_modules/@storybook/nextjs/dist/images/next-image.mjs"
        ),
        react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          "./node_modules/next/dist/compiled/react/index.js"
        ),
        helper__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__("./helper/index.tsx"),
        components_ui_SocialIcons__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__("./components/ui/SocialIcons/index.tsx"),
        components_ui_ConditionalLink__WEBPACK_IMPORTED_MODULE_6__ =
          __webpack_require__("./components/ui/ConditionalLink/index.ts"),
        __jsx = react__WEBPACK_IMPORTED_MODULE_0__.createElement;
      function VariantB(_ref) {
        var _logo$alt,
          logo = _ref.logo,
          copyright = _ref.copyright,
          socialMedia = _ref.socialMedia,
          menu = _ref.menu;
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
                {
                  className:
                    "flex flex-wrap items-center justify-between pb-12 border-b border-gray-100",
                },
                __jsx(
                  "div",
                  { className: "w-full mx-20 mb-12 lg:mb-4 lg:w-1/5" },
                  (null == logo ? void 0 : logo.image) &&
                    __jsx(
                      next_link__WEBPACK_IMPORTED_MODULE_2___default(),
                      {
                        "aria-label":
                          "/" ===
                          (0, helper__WEBPACK_IMPORTED_MODULE_4__.oQ)(logo)
                            ? "Go to home page"
                            : "Go to ".concat(
                                (0, helper__WEBPACK_IMPORTED_MODULE_4__.oQ)(
                                  logo
                                )
                              ),
                        className:
                          "inline-block text-3xl font-bold leading-none",
                        href: (0, helper__WEBPACK_IMPORTED_MODULE_4__.oQ)(logo),
                      },
                      __jsx(next_image__WEBPACK_IMPORTED_MODULE_3__.Z, {
                        className: "h-14",
                        src: (0, lib_sanity__WEBPACK_IMPORTED_MODULE_1__.uH)(
                          null == logo ? void 0 : logo.image
                        ),
                        width: 132,
                        height: 56,
                        alt:
                          null !==
                            (_logo$alt = null == logo ? void 0 : logo.alt) &&
                          void 0 !== _logo$alt
                            ? _logo$alt
                            : "footer-logo",
                      })
                    )
                ),
                menu &&
                  __jsx(
                    "div",
                    { className: "w-full lg:w-auto" },
                    __jsx(
                      "ul",
                      {
                        className:
                          "flex flex-wrap items-center justify-between mx-20 mt-8 lg:space-x-5",
                      },
                      null == menu
                        ? void 0
                        : menu.map(function (links, index, _ref2) {
                            var length = _ref2.length;
                            return __jsx(
                              react__WEBPACK_IMPORTED_MODULE_0__.Fragment,
                              {
                                key:
                                  (null == links ? void 0 : links._key) ||
                                  index,
                              },
                              __jsx(
                                "li",
                                {
                                  className: "w-full mb-2 md:mb-0 md:w-auto",
                                  key: index,
                                },
                                __jsx(
                                  components_ui_ConditionalLink__WEBPACK_IMPORTED_MODULE_6__.M,
                                  {
                                    variant: "link",
                                    link: links,
                                    className:
                                      "text-gray-500 lg:text-sm hover:text-gray-700",
                                    ariaLabel:
                                      null == links ? void 0 : links.label,
                                  },
                                  null == links ? void 0 : links.label
                                )
                              ),
                              index + 1 !== length
                                ? __jsx(
                                    "li",
                                    { className: "hidden md:block" },
                                    __jsx(
                                      "svg",
                                      {
                                        className: "w-4 h-4 mx-4 text-gray-500",
                                        xmlns: "http://www.w3.org/2000/svg",
                                        fill: "none",
                                        viewBox: "0 0 24 24",
                                        stroke: "currentColor",
                                      },
                                      __jsx("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: "2",
                                        d: "M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z",
                                      })
                                    )
                                  )
                                : null
                            );
                          })
                    )
                  )
              ),
              __jsx(
                "div",
                {
                  className:
                    "flex flex-wrap items-center justify-between mx-20 mt-8",
                },
                __jsx(
                  "p",
                  { className: "order-last text-sm text-gray-500" },
                  copyright
                ),
                socialMedia &&
                  __jsx(
                    "div",
                    { className: "order-first mb-4 lg:order-last lg:mb-0" },
                    null == socialMedia
                      ? void 0
                      : socialMedia.map(function (social) {
                          var _social$socialMediaIc,
                            _social$socialMediaIc2,
                            _social$socialMediaIc3,
                            _social$socialMediaIc4;
                          return (
                            (null == social
                              ? void 0
                              : social.socialMediaLink) &&
                            __jsx(
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
                                  "inline-block p-2 mr-2 rounded bg-gray-50 hover:bg-gray-100",
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
                                    next_image__WEBPACK_IMPORTED_MODULE_3__.Z,
                                    {
                                      className: "h-6",
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
                                      quality: 100,
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
                                    components_ui_SocialIcons__WEBPACK_IMPORTED_MODULE_5__.Q,
                                    {
                                      social:
                                        null == social
                                          ? void 0
                                          : social.socialMedia,
                                    }
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
      VariantB.displayName = "VariantB";
      const __WEBPACK_DEFAULT_EXPORT__ =
        react__WEBPACK_IMPORTED_MODULE_0__.memo(VariantB);
      try {
        (VariantB.displayName = "VariantB"),
          (VariantB.__docgenInfo = {
            description: "",
            displayName: "VariantB",
            props: {
              logo: {
                defaultValue: null,
                description: "",
                name: "logo",
                required: !1,
                type: { name: "Logo" },
              },
              text: {
                defaultValue: null,
                description: "",
                name: "text",
                required: !1,
                type: { name: "string" },
              },
              contacts: {
                defaultValue: null,
                description: "",
                name: "contacts",
                required: !1,
                type: { name: "ContactDetails[]" },
              },
              copyright: {
                defaultValue: null,
                description: "",
                name: "copyright",
                required: !1,
                type: { name: "string" },
              },
              socialMedia: {
                defaultValue: null,
                description: "",
                name: "socialMedia",
                required: !1,
                type: { name: "SocialLink[]" },
              },
              menu: {
                defaultValue: null,
                description: "",
                name: "menu",
                required: !1,
                type: { name: "LabeledRouteWithKey[]" },
              },
              multipleMenus: {
                defaultValue: null,
                description: "",
                name: "multipleMenus",
                required: !1,
                type: { name: "any" },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES[
              "components/sections/footer/variant_b.tsx#VariantB"
            ] = {
              docgenInfo: VariantB.__docgenInfo,
              name: "VariantB",
              path: "components/sections/footer/variant_b.tsx#VariantB",
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
    "./helper/index.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, {
        Dt: () => defaultBlockStyle,
        MT: () => ConditionalLink,
        W6: () => thankYouPageLink,
        oQ: () => logoLink,
      });
      var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
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
        __jsx = react__WEBPACK_IMPORTED_MODULE_0__.createElement,
        thankYouPageLink = function thankYouPageLink(link) {
          return link
            ? "linkInternal" === (null == link ? void 0 : link.linkType)
              ? "/".concat(null == link ? void 0 : link.internalLink)
              : null == link
              ? void 0
              : link.externalLink
            : "/thank-you";
        },
        logoLink = function logoLink(logo) {
          var _logo$internalLink, _logo$externalLink;
          return null != logo &&
            logo.internalLink &&
            "linkInternal" === (null == logo ? void 0 : logo.type)
            ? null != logo &&
              null !== (_logo$internalLink = logo.internalLink) &&
              void 0 !== _logo$internalLink &&
              null !==
                (_logo$internalLink = _logo$internalLink.toLowerCase()) &&
              void 0 !== _logo$internalLink &&
              _logo$internalLink.includes("home")
              ? "/"
              : "/".concat(logo.internalLink)
            : null != logo &&
              logo.externalLink &&
              "linkExternal" === (null == logo ? void 0 : logo.type) &&
              null !==
                (_logo$externalLink =
                  null == logo ? void 0 : logo.externalLink) &&
              void 0 !== _logo$externalLink
            ? _logo$externalLink
            : "/";
        },
        ConditionalLink = function ConditionalLink(_ref) {
          var _link$internalLink,
            className = _ref.className,
            ariaLabel = _ref.ariaLabel,
            children = (_ref.style, _ref.children),
            link = _ref.link,
            target = _ref.target,
            defaultStyle =
              "inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-brand-primary hover:bg-brand-primary-foreground text-gray-50 font-bold leading-loose outline-none transition duration-200";
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
                  {
                    href: "/",
                    "aria-label": ariaLabel,
                    className: null != className ? className : defaultStyle,
                    target,
                  },
                  children
                )
              : "linkInternal" === (null == link ? void 0 : link.type)
              ? __jsx(
                  next_link__WEBPACK_IMPORTED_MODULE_1___default(),
                  {
                    href: "/".concat(null == link ? void 0 : link.internalLink),
                    "aria-label": ariaLabel,
                    className: null != className ? className : defaultStyle,
                    target,
                  },
                  children
                )
              : "linkExternal" === (null == link ? void 0 : link.type)
              ? __jsx(
                  "a",
                  {
                    "aria-label": ariaLabel,
                    className: null != className ? className : defaultStyle,
                    href: null == link ? void 0 : link.externalLink,
                    target,
                    rel:
                      "_blank" === (null == link ? void 0 : link.linkTarget)
                        ? "noopener noreferrer"
                        : null,
                  },
                  children
                )
              : __jsx(
                  next_link__WEBPACK_IMPORTED_MODULE_1___default(),
                  {
                    href: "/",
                    "aria-label": ariaLabel,
                    className: null != className ? className : defaultStyle,
                    target,
                  },
                  children
                )
            : __jsx(
                "a",
                {
                  className: null != className ? className : defaultStyle,
                  "aria-label": ariaLabel,
                  target,
                  href: "/page-not-found",
                },
                children
              );
        },
        defaultBlockStyle = {
          block: {
            h1: function h1(_ref2) {
              var children = _ref2.children;
              return __jsx(
                "h1",
                { className: "mb-6 text-7xl leading-loose text-gray-900" },
                children
              );
            },
            h2: function h2(_ref3) {
              var children = _ref3.children;
              return __jsx(
                "h2",
                { className: "mb-6 text-5xl leading-loose text-gray-900" },
                children
              );
            },
            h3: function h3(_ref4) {
              var children = _ref4.children;
              return __jsx(
                "h3",
                { className: "mb-6 text-3xl leading-loose text-gray-900" },
                children
              );
            },
            h4: function h4(_ref5) {
              var children = _ref5.children;
              return __jsx(
                "h4",
                { className: "mb-6 text-xl leading-loose text-gray-900" },
                children
              );
            },
            normal: function normal(_ref6) {
              var children = _ref6.children;
              return __jsx(
                "p",
                { className: "mb-6 text-justify leading-loose text-gray-900" },
                children
              );
            },
            blockquote: function blockquote(_ref7) {
              var children = _ref7.children;
              return __jsx(
                "blockquote",
                { className: "mb-6 px-14 italic leading-loose text-gray-500" },
                "- ",
                children
              );
            },
          },
          code: function code(_ref8) {
            var value = _ref8.value;
            return __jsx(
              "pre",
              { "data-language": value.language },
              __jsx("code", null, value.code)
            );
          },
          list: {
            bullet: function bullet(_ref9) {
              var children = _ref9.children;
              return __jsx(
                "ul",
                {
                  className: "mb-6 list-disc pl-10 leading-loose text-gray-900",
                },
                children
              );
            },
            number: function number(_ref10) {
              var children = _ref10.children;
              return __jsx(
                "ol",
                { className: "mb-6 list-decimal leading-loose text-gray-900" },
                children
              );
            },
          },
          listItem: {
            bullet: function bullet(_ref11) {
              var children = _ref11.children;
              return __jsx(
                "li",
                { className: "mb-6 leading-loose text-gray-900" },
                children
              );
            },
          },
          marks: {
            strong: function strong(_ref12) {
              var children = _ref12.children;
              return __jsx("strong", null, children);
            },
            em: function em(_ref13) {
              var children = _ref13.children;
              return __jsx("em", null, children);
            },
            code: function code(_ref14) {
              var children = _ref14.children;
              return __jsx("code", null, children);
            },
            link: function link(_ref15) {
              var children = _ref15.children,
                value = _ref15.value;
              return __jsx(
                "a",
                {
                  className:
                    "hover:text-brand-primary-foreground text-brand-primary",
                  href: value.href,
                  target: "_blank",
                  rel: "noopener noreferrer",
                },
                children
              );
            },
          },
          types: {
            addImage: function addImage(_ref16) {
              var _value$alt,
                _value$image,
                value = _ref16.value;
              return __jsx(next_image__WEBPACK_IMPORTED_MODULE_2__.Z, {
                className: "mb-5 h-full w-full",
                width: 500,
                height: 500,
                sizes:
                  "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
                src: (0, lib_sanity__WEBPACK_IMPORTED_MODULE_3__.uH)(
                  null == value ? void 0 : value.image
                ),
                alt:
                  null !== (_value$alt = null == value ? void 0 : value.alt) &&
                  void 0 !== _value$alt
                    ? _value$alt
                    : null == value ||
                      null === (_value$image = value.image) ||
                      void 0 === _value$image ||
                      null === (_value$image = _value$image.asset) ||
                      void 0 === _value$image
                    ? void 0
                    : _value$image._ref,
              });
            },
          },
        };
      try {
        (thankYouPageLink.displayName = "thankYouPageLink"),
          (thankYouPageLink.__docgenInfo = {
            description: "",
            displayName: "thankYouPageLink",
            props: {},
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["helper/index.tsx#thankYouPageLink"] = {
              docgenInfo: thankYouPageLink.__docgenInfo,
              name: "thankYouPageLink",
              path: "helper/index.tsx#thankYouPageLink",
            });
      } catch (__react_docgen_typescript_loader_error) {}
      try {
        (logoLink.displayName = "logoLink"),
          (logoLink.__docgenInfo = {
            description: "",
            displayName: "logoLink",
            props: {},
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["helper/index.tsx#logoLink"] = {
              docgenInfo: logoLink.__docgenInfo,
              name: "logoLink",
              path: "helper/index.tsx#logoLink",
            });
      } catch (__react_docgen_typescript_loader_error) {}
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
              ariaLabel: {
                defaultValue: null,
                description: "",
                name: "ariaLabel",
                required: !0,
                type: { name: "string" },
              },
              style: {
                defaultValue: { value: "{}" },
                description: "",
                name: "style",
                required: !1,
                type: { name: "any" },
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
                type: { name: "string" },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["helper/index.tsx#ConditionalLink"] = {
              docgenInfo: ConditionalLink.__docgenInfo,
              name: "ConditionalLink",
              path: "helper/index.tsx#ConditionalLink",
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
