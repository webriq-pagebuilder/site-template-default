"use strict";
(self.webpackChunk_webriq_pagebuilder_site_template_default =
  self.webpackChunk_webriq_pagebuilder_site_template_default || []).push([
  [6751],
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
    "./components/sections/portfolio/variant_a.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        });
      var _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__ =
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
        components_ui_ConditionalLink__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__("./components/ui/ConditionalLink/index.ts"),
        components_ui_Text__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          "./components/ui/Text/index.ts"
        ),
        __jsx = react__WEBPACK_IMPORTED_MODULE_0__.createElement;
      function VariantA(_ref) {
        var _portfoliosWithCatego,
          _portfoliosPerCategor,
          _portfoliosPerCategor2,
          _portfoliosPerCategor3,
          _portfoliosPerCategor4,
          _portfoliosPerCategor5,
          _portfoliosPerCategor6,
          caption = _ref.caption,
          title = _ref.title,
          portfoliosWithCategory = _ref.portfoliosWithCategory,
          _React$useState = react__WEBPACK_IMPORTED_MODULE_0__.useState(
            null == portfoliosWithCategory ||
              null === (_portfoliosWithCatego = portfoliosWithCategory[0]) ||
              void 0 === _portfoliosWithCatego
              ? void 0
              : _portfoliosWithCatego.category
          ),
          _React$useState2 = (0,
          _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__.Z)(
            _React$useState,
            2
          ),
          activeTab = _React$useState2[0],
          setActiveTab = _React$useState2[1],
          portfoliosPerCategory =
            null == portfoliosWithCategory
              ? void 0
              : portfoliosWithCategory.filter(function (data) {
                  return (null == data ? void 0 : data.category) === activeTab;
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
                { className: "max-w-lg mx-auto mb-8 text-center md:mb-16" },
                caption &&
                  __jsx(
                    "span",
                    { className: "font-bold text-brand-primary" },
                    caption
                  ),
                title &&
                  __jsx(
                    components_ui_Text__WEBPACK_IMPORTED_MODULE_4__.x,
                    { className: "mb-6 " },
                    title
                  ),
                portfoliosWithCategory &&
                  __jsx(
                    "div",
                    {
                      className:
                        "inline-flex flex-wrap py-1 text-sm bg-white rounded",
                    },
                    null == portfoliosWithCategory
                      ? void 0
                      : portfoliosWithCategory.map(function (content, index) {
                          return __jsx(
                            "button",
                            {
                              "aria-label":
                                null == content ? void 0 : content.category,
                              key: index,
                              className:
                                "mx-auto mb-1 w-auto px-4 py-2 ".concat(
                                  activeTab ===
                                    (null == content
                                      ? void 0
                                      : content.category)
                                    ? "rounded bg-gray-50 font-bold text-brand-primary shadow transition duration-200 focus:outline-none"
                                    : "rounded font-bold text-gray-700 transition duration-200 hover:bg-brand-secondary-foreground hover:text-brand-primary-foreground hover:shadow focus:outline-none"
                                ),
                              onClick: function onClick() {
                                return setActiveTab(
                                  null == content ? void 0 : content.category
                                );
                              },
                            },
                            null == content ? void 0 : content.category
                          );
                        })
                  )
              ),
              (null == portfoliosPerCategory ||
              null === (_portfoliosPerCategor = portfoliosPerCategory[0]) ||
              void 0 === _portfoliosPerCategor
                ? void 0
                : _portfoliosPerCategor.content) &&
                __jsx(
                  "div",
                  { className: "flex flex-wrap mb-8 -mx-4" },
                  null == portfoliosPerCategory ||
                    null ===
                      (_portfoliosPerCategor2 = portfoliosPerCategory[0]) ||
                    void 0 === _portfoliosPerCategor2 ||
                    null ===
                      (_portfoliosPerCategor2 =
                        _portfoliosPerCategor2.content) ||
                    void 0 === _portfoliosPerCategor2 ||
                    null ===
                      (_portfoliosPerCategor2 = _portfoliosPerCategor2.slice(
                        0,
                        8
                      )) ||
                    void 0 === _portfoliosPerCategor2
                    ? void 0
                    : _portfoliosPerCategor2.map(function (content, index) {
                        var _content$mainImage,
                          _content$mainImage2,
                          _content$mainImage$al,
                          _content$mainImage3,
                          _content$primaryButto,
                          _content$primaryButto2,
                          _content$primaryButto3;
                        return __jsx(
                          "div",
                          {
                            className:
                              "w-full px-4 mb-8 sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4",
                            key: index,
                          },
                          __jsx(
                            "div",
                            {
                              className:
                                "relative mx-auto h-[256px] w-[352px] overflow-hidden rounded-lg",
                            },
                            (null == content ||
                            null === (_content$mainImage = content.mainImage) ||
                            void 0 === _content$mainImage
                              ? void 0
                              : _content$mainImage.image) &&
                              __jsx(next_image__WEBPACK_IMPORTED_MODULE_1__.Z, {
                                className: "object-cover w-full h-full",
                                src: (0,
                                lib_sanity__WEBPACK_IMPORTED_MODULE_2__.uH)(
                                  null == content ||
                                    null ===
                                      (_content$mainImage2 =
                                        content.mainImage) ||
                                    void 0 === _content$mainImage2
                                    ? void 0
                                    : _content$mainImage2.image
                                ),
                                sizes: "100vw",
                                width: 352,
                                height: 256,
                                alt:
                                  null !==
                                    (_content$mainImage$al =
                                      null == content ||
                                      null ===
                                        (_content$mainImage3 =
                                          content.mainImage) ||
                                      void 0 === _content$mainImage3
                                        ? void 0
                                        : _content$mainImage3.alt) &&
                                  void 0 !== _content$mainImage$al
                                    ? _content$mainImage$al
                                    : "portfolio-image".concat(index),
                              }),
                            __jsx(
                              "div",
                              {
                                className:
                                  "absolute inset-0 z-10 flex items-center justify-center duration-300 bg-gray-900 rounded-lg opacity-0 hover:opacity-75",
                              },
                              (null == content ||
                              null ===
                                (_content$primaryButto =
                                  content.primaryButton) ||
                              void 0 === _content$primaryButto
                                ? void 0
                                : _content$primaryButto.label) &&
                                __jsx(
                                  components_ui_ConditionalLink__WEBPACK_IMPORTED_MODULE_3__.M,
                                  {
                                    variant: "outline",
                                    ariaLabel:
                                      null == content ||
                                      null ===
                                        (_content$primaryButto2 =
                                          content.primaryButton) ||
                                      void 0 === _content$primaryButto2
                                        ? void 0
                                        : _content$primaryButto2.label,
                                    link:
                                      null == content
                                        ? void 0
                                        : content.primaryButton,
                                    className:
                                      "bg-transparent border-2 border-gray-400 !outline-none hover:border-white hover:opacity-100 text-gray-50 hover:bg-white hover:text-gray-900",
                                  },
                                  null == content ||
                                    null ===
                                      (_content$primaryButto3 =
                                        content.primaryButton) ||
                                    void 0 === _content$primaryButto3
                                    ? void 0
                                    : _content$primaryButto3.label
                                )
                            )
                          )
                        );
                      })
                ),
              (null == portfoliosPerCategory ||
              null === (_portfoliosPerCategor3 = portfoliosPerCategory[0]) ||
              void 0 === _portfoliosPerCategor3 ||
              null ===
                (_portfoliosPerCategor3 =
                  _portfoliosPerCategor3.primaryButton) ||
              void 0 === _portfoliosPerCategor3
                ? void 0
                : _portfoliosPerCategor3.label) &&
                __jsx(
                  "div",
                  { className: "text-center" },
                  __jsx(
                    components_ui_ConditionalLink__WEBPACK_IMPORTED_MODULE_3__.M,
                    {
                      ariaLabel:
                        null == portfoliosPerCategory ||
                        null ===
                          (_portfoliosPerCategor4 = portfoliosPerCategory[0]) ||
                        void 0 === _portfoliosPerCategor4 ||
                        null ===
                          (_portfoliosPerCategor4 =
                            _portfoliosPerCategor4.primaryButton) ||
                        void 0 === _portfoliosPerCategor4
                          ? void 0
                          : _portfoliosPerCategor4.label,
                      link:
                        null == portfoliosPerCategory ||
                        null ===
                          (_portfoliosPerCategor5 = portfoliosPerCategory[0]) ||
                        void 0 === _portfoliosPerCategor5
                          ? void 0
                          : _portfoliosPerCategor5.primaryButton,
                      className:
                        "inline-block px-6 py-2 font-bold leading-loose transition duration-200 outline-none rounded-l-xl rounded-t-xl bg-brand-primary hover:bg-brand-primary-foreground text-gray-50",
                    },
                    null == portfoliosPerCategory ||
                      null ===
                        (_portfoliosPerCategor6 = portfoliosPerCategory[0]) ||
                      void 0 === _portfoliosPerCategor6 ||
                      null ===
                        (_portfoliosPerCategor6 =
                          _portfoliosPerCategor6.primaryButton) ||
                      void 0 === _portfoliosPerCategor6
                      ? void 0
                      : _portfoliosPerCategor6.label
                  )
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
              template: {
                defaultValue: null,
                description: "",
                name: "template",
                required: !1,
                type: { name: "any" },
              },
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
              portfoliosWithCategory: {
                defaultValue: null,
                description: "",
                name: "portfoliosWithCategory",
                required: !1,
                type: { name: "PortfoliosWithCategories[]" },
              },
              portfolios: {
                defaultValue: null,
                description: "",
                name: "portfolios",
                required: !1,
                type: { name: "TPortfolio[]" },
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
              "components/sections/portfolio/variant_a.tsx#VariantA"
            ] = {
              docgenInfo: VariantA.__docgenInfo,
              name: "VariantA",
              path: "components/sections/portfolio/variant_a.tsx#VariantA",
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
