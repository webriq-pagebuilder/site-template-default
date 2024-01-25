"use strict";
(self.webpackChunk_webriq_pagebuilder_site_template_default =
  self.webpackChunk_webriq_pagebuilder_site_template_default || []).push([
  [6043],
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
    "./components/sections/navigation/variant_b.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        });
      var _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_6__ =
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
        helper__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__("./helper/index.tsx"),
        components_ui_ConditionalLink__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__("./components/ui/ConditionalLink/index.ts"),
        __jsx = react__WEBPACK_IMPORTED_MODULE_0__.createElement;
      function VariantB(_ref) {
        var _logo$alt,
          links = _ref.links,
          primaryButton = _ref.primaryButton,
          secondaryButton = _ref.secondaryButton,
          logo = _ref.logo,
          _React$useState = react__WEBPACK_IMPORTED_MODULE_0__.useState(!1),
          _React$useState2 = (0,
          _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_6__.Z)(
            _React$useState,
            2
          ),
          menu = _React$useState2[0],
          setMenu = _React$useState2[1],
          showMenu = function showMenu() {
            setMenu(function (prevState) {
              return !prevState;
            });
          };
        return __jsx(
          "section",
          null,
          __jsx(
            "nav",
            { className: "relative py-6 bg-white" },
            __jsx(
              "div",
              {
                className:
                  "container flex items-center justify-between px-4 mx-auto",
              },
              (null == logo ? void 0 : logo.image) &&
                __jsx(
                  next_link__WEBPACK_IMPORTED_MODULE_1___default(),
                  {
                    "aria-label": "Go to ".concat(
                      "/" === (0, helper__WEBPACK_IMPORTED_MODULE_4__.oQ)(logo)
                        ? "home page"
                        : (0, helper__WEBPACK_IMPORTED_MODULE_4__.oQ)(logo)
                    ),
                    className: "text-3xl font-bold leading-none",
                    href: (0, helper__WEBPACK_IMPORTED_MODULE_4__.oQ)(logo),
                  },
                  __jsx(next_image__WEBPACK_IMPORTED_MODULE_2__.Z, {
                    src: (0, lib_sanity__WEBPACK_IMPORTED_MODULE_3__.uH)(
                      null == logo ? void 0 : logo.image
                    ),
                    width: 48,
                    height: 48,
                    alt:
                      null !== (_logo$alt = null == logo ? void 0 : logo.alt) &&
                      void 0 !== _logo$alt
                        ? _logo$alt
                        : "navigation-logo",
                  })
                ),
              __jsx(
                "div",
                { className: "lg:hidden" },
                __jsx(
                  "button",
                  {
                    "aria-label": "Navigation menu",
                    className:
                      "flex items-center p-3 navbar-burger text-brand-primary",
                    onClick: showMenu,
                  },
                  __jsx(
                    "svg",
                    {
                      className: "block w-4 h-4 fill-current",
                      viewBox: "0 0 20 20",
                      xmlns: "http://www.w3.org/2000/svg",
                    },
                    __jsx("title", null, "Mobile menu"),
                    __jsx("path", {
                      d: "M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z",
                    })
                  )
                )
              ),
              __jsx(
                "ul",
                {
                  className:
                    "absolute hidden transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 lg:mx-auto lg:flex lg:w-auto lg:items-center lg:space-x-6",
                },
                links &&
                  (null == links
                    ? void 0
                    : links.map(function (link, index) {
                        return __jsx(
                          react__WEBPACK_IMPORTED_MODULE_0__.Fragment,
                          { key: index },
                          __jsx(
                            "li",
                            null,
                            __jsx(
                              components_ui_ConditionalLink__WEBPACK_IMPORTED_MODULE_5__.M,
                              {
                                variant: "link",
                                ariaLabel: null == link ? void 0 : link.label,
                                link,
                                className:
                                  "text-sm text-gray-500 hover:text-gray-900",
                              },
                              null == link ? void 0 : link.label
                            )
                          ),
                          links.length !== index + 1
                            ? __jsx(
                                "li",
                                { className: "text-gray-500" },
                                __jsx(
                                  "svg",
                                  {
                                    className: "w-4 h-4 current-fill",
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
                      }))
              ),
              (null == primaryButton ? void 0 : primaryButton.label) &&
                __jsx(
                  components_ui_ConditionalLink__WEBPACK_IMPORTED_MODULE_5__.M,
                  {
                    ariaLabel:
                      null == primaryButton ? void 0 : primaryButton.label,
                    link: primaryButton,
                    className:
                      "hidden px-6 py-2 text-sm font-bold text-gray-900 transition duration-200 lg:inline-block lg:ml-auto lg:mr-3 bg-gray-50 hover:bg-gray-100 rounded-l-xl rounded-t-xl",
                  },
                  null == primaryButton ? void 0 : primaryButton.label
                ),
              (null == secondaryButton ? void 0 : secondaryButton.label) &&
                __jsx(
                  components_ui_ConditionalLink__WEBPACK_IMPORTED_MODULE_5__.M,
                  {
                    ariaLabel:
                      null == secondaryButton ? void 0 : secondaryButton.label,
                    link: secondaryButton,
                    className:
                      "hidden px-6 py-2 text-sm font-bold text-white transition duration-200 lg:inline-block bg-brand-primary hover:bg-brand-primary-foreground rounded-l-xl rounded-t-xl",
                  },
                  null == secondaryButton ? void 0 : secondaryButton.label
                )
            )
          ),
          __jsx(
            "div",
            {
              className: "".concat(
                menu ? null : "hidden",
                " navbar-menu relative z-50"
              ),
            },
            __jsx("div", {
              className: "fixed inset-0 bg-gray-800 opacity-25 navbar-backdrop",
              onClick: showMenu,
            }),
            __jsx(
              "nav",
              {
                className:
                  "fixed top-0 bottom-0 left-0 flex flex-col w-5/6 max-w-sm px-6 py-6 overflow-y-auto bg-white border-r",
              },
              __jsx(
                "div",
                { className: "flex items-center mb-8" },
                __jsx(
                  "button",
                  {
                    "aria-label": "Navigation menu",
                    className: "navbar-close",
                    onClick: showMenu,
                  },
                  __jsx(
                    "svg",
                    {
                      className:
                        "w-6 h-6 text-gray-500 cursor-pointer hover:text-gray-500",
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      stroke: "currentColor",
                    },
                    __jsx("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: "2",
                      d: "M6 18L18 6M6 6l12 12",
                    })
                  )
                )
              ),
              __jsx(
                "div",
                null,
                __jsx(
                  "ul",
                  null,
                  links &&
                    (null == links
                      ? void 0
                      : links.map(function (link, index) {
                          return __jsx(
                            "li",
                            { className: "mb-1", key: index },
                            __jsx(
                              components_ui_ConditionalLink__WEBPACK_IMPORTED_MODULE_5__.M,
                              {
                                variant: "link",
                                ariaLabel: null == link ? void 0 : link.label,
                                link,
                                className:
                                  "block p-4 text-sm font-semibold text-gray-700 rounded hover:bg-brand-secondary-foreground hover:text-brand-primary",
                              },
                              null == link ? void 0 : link.label
                            )
                          );
                        }))
                )
              ),
              __jsx(
                "div",
                { className: "mt-auto" },
                __jsx(
                  "div",
                  { className: "pt-6" },
                  (null == primaryButton ? void 0 : primaryButton.label) &&
                    __jsx(
                      components_ui_ConditionalLink__WEBPACK_IMPORTED_MODULE_5__.M,
                      {
                        ariaLabel:
                          null == primaryButton ? void 0 : primaryButton.label,
                        link: primaryButton,
                        className:
                          "block px-4 py-3 mb-3 text-xs font-semibold leading-loose text-center text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-l-xl rounded-t-xl",
                      },
                      null == primaryButton ? void 0 : primaryButton.label
                    ),
                  (null == secondaryButton ? void 0 : secondaryButton.label) &&
                    __jsx(
                      components_ui_ConditionalLink__WEBPACK_IMPORTED_MODULE_5__.M,
                      {
                        ariaLabel:
                          null == secondaryButton
                            ? void 0
                            : secondaryButton.label,
                        link: secondaryButton,
                        className:
                          "block px-4 py-3 mb-2 text-xs font-semibold leading-loose text-center text-white bg-brand-primary hover:bg-brand-primary-foreground rounded-l-xl rounded-t-xl",
                      },
                      null == secondaryButton ? void 0 : secondaryButton.label
                    )
                ),
                __jsx(
                  "p",
                  { className: "my-4 text-xs text-center text-gray-900" },
                  __jsx(
                    "span",
                    null,
                    "© ".concat(
                      new Date().getFullYear(),
                      " All rights reserved."
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
              template: {
                defaultValue: null,
                description: "",
                name: "template",
                required: !1,
                type: { name: "any" },
              },
              logo: {
                defaultValue: null,
                description: "",
                name: "logo",
                required: !1,
                type: { name: "Logo" },
              },
              links: {
                defaultValue: null,
                description: "",
                name: "links",
                required: !1,
                type: { name: "LabeledRouteWithKey[]" },
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
              banner: {
                defaultValue: null,
                description: "",
                name: "banner",
                required: !1,
                type: { name: "any" },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES[
              "components/sections/navigation/variant_b.tsx#VariantB"
            ] = {
              docgenInfo: VariantB.__docgenInfo,
              name: "VariantB",
              path: "components/sections/navigation/variant_b.tsx#VariantB",
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
