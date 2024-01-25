"use strict";
(self.webpackChunk_webriq_pagebuilder_site_template_default =
  self.webpackChunk_webriq_pagebuilder_site_template_default || []).push([
  [4960],
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
    "./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js":
      (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        __webpack_require__.d(__webpack_exports__, {
          Z: () => _toConsumableArray,
        });
        var arrayLikeToArray = __webpack_require__(
          "./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js"
        );
        var unsupportedIterableToArray = __webpack_require__(
          "./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js"
        );
        function _toConsumableArray(arr) {
          return (
            (function _arrayWithoutHoles(arr) {
              if (Array.isArray(arr)) return (0, arrayLikeToArray.Z)(arr);
            })(arr) ||
            (function _iterableToArray(iter) {
              if (
                ("undefined" != typeof Symbol &&
                  null != iter[Symbol.iterator]) ||
                null != iter["@@iterator"]
              )
                return Array.from(iter);
            })(arr) ||
            (0, unsupportedIterableToArray.Z)(arr) ||
            (function _nonIterableSpread() {
              throw new TypeError(
                "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
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
    "./components/sections/testimonials/variant_c.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        });
      var _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_7__ =
          __webpack_require__(
            "./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js"
          ),
        _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_6__ =
          __webpack_require__(
            "./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/slicedToArray.js"
          ),
        react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          "./node_modules/next/dist/compiled/react/index.js"
        ),
        lib_sanity__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__("./lib/sanity.ts"),
        components_ui_SwiperButton_SwiperButton__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__("./components/ui/SwiperButton/SwiperButton.tsx"),
        components_ui_Avatar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          "./components/ui/Avatar/index.ts"
        ),
        components_ui_Card__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          "./components/ui/Card/index.ts"
        ),
        components_ui_Text__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          "./components/ui/Text/index.ts"
        ),
        __jsx = react__WEBPACK_IMPORTED_MODULE_0__.createElement;
      function VariantC(_ref) {
        var _testimony$slice,
          caption = _ref.caption,
          title = _ref.title,
          testimonials = _ref.testimonials,
          _React$useState =
            react__WEBPACK_IMPORTED_MODULE_0__.useState(testimonials),
          _React$useState2 = (0,
          _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_6__.Z)(
            _React$useState,
            2
          ),
          testimony = _React$useState2[0],
          setTestimony = _React$useState2[1],
          slider = function slider(action) {
            if ("next" === action) {
              var firstItem = null == testimony ? void 0 : testimony.shift();
              setTestimony(function (prevState) {
                return [].concat(
                  (0,
                  _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_7__.Z)(
                    prevState
                  ),
                  [firstItem]
                );
              });
            } else if ("prev" === action) {
              var lastItem = null == testimony ? void 0 : testimony.pop();
              setTestimony(function (prevState) {
                return [lastItem].concat(
                  (0,
                  _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_7__.Z)(
                    prevState
                  )
                );
              });
            }
          };
        return __jsx(
          "section",
          null,
          __jsx(
            "div",
            {
              className:
                "py-10 overflow-hidden radius-for-skewed bg-gray-50 lg:py-20",
            },
            __jsx(
              "div",
              { className: "max-w-6xl px-4 pb-6 mx-auto lg:pb-16" },
              __jsx(
                "div",
                {
                  className:
                    "flex flex-wrap items-center justify-center text-center lg:justify-between lg:text-left",
                },
                __jsx(
                  "div",
                  { className: "w-full mb-4 lg:mb-0 lg:w-4/5" },
                  __jsx(
                    "span",
                    { className: "font-bold text-brand-primary" },
                    caption
                  ),
                  __jsx(
                    components_ui_Text__WEBPACK_IMPORTED_MODULE_5__.x,
                    { type: "h1", className: "" },
                    title
                  )
                ),
                __jsx(
                  "div",
                  { className: "w-full lg:w-1/5" },
                  (null == testimony ? void 0 : testimony.length) >= 4 &&
                    __jsx(
                      components_ui_SwiperButton_SwiperButton__WEBPACK_IMPORTED_MODULE_2__.L,
                      {
                        type: "left",
                        className: "order-last p-5 mr-4 lg:order-first",
                        onClick: function onClick() {
                          return slider("prev");
                        },
                        ariaLabel: "Show previous testimonial",
                      }
                    ),
                  (null == testimony ? void 0 : testimony.length) >= 4 &&
                    __jsx(
                      components_ui_SwiperButton_SwiperButton__WEBPACK_IMPORTED_MODULE_2__.L,
                      {
                        type: "right",
                        className: "order-last p-5",
                        onClick: function onClick() {
                          return slider("next");
                        },
                        ariaLabel: "Show next testimonial",
                      }
                    )
                )
              )
            ),
            __jsx(
              "div",
              { className: "relative flex" },
              testimony &&
                __jsx(
                  "div",
                  { className: "flex flex-wrap max-w-6xl px-2 mx-auto" },
                  null == testimony ||
                    null === (_testimony$slice = testimony.slice(0, 3)) ||
                    void 0 === _testimony$slice
                    ? void 0
                    : _testimony$slice.map(function (item, index) {
                        var _item$mainImage,
                          _item$mainImage2,
                          _item$mainImage$alt,
                          _item$mainImage3;
                        return __jsx(
                          "div",
                          {
                            className: "w-full px-3 mb-4 lg:w-1/3",
                            key: index,
                          },
                          __jsx(
                            components_ui_Card__WEBPACK_IMPORTED_MODULE_4__.Z,
                            { className: "p-8 text-center " },
                            __jsx(
                              components_ui_Text__WEBPACK_IMPORTED_MODULE_5__.x,
                              { className: "mb-8 leading-loose", muted: !0 },
                              null == item ? void 0 : item.testimony
                            ),
                            (null == item ||
                            null === (_item$mainImage = item.mainImage) ||
                            void 0 === _item$mainImage
                              ? void 0
                              : _item$mainImage.image) &&
                              __jsx(
                                components_ui_Avatar__WEBPACK_IMPORTED_MODULE_3__.q,
                                {
                                  size: 48,
                                  className: "mx-auto border-0",
                                  src: (0,
                                  lib_sanity__WEBPACK_IMPORTED_MODULE_1__.uH)(
                                    null == item ||
                                      null ===
                                        (_item$mainImage2 = item.mainImage) ||
                                      void 0 === _item$mainImage2
                                      ? void 0
                                      : _item$mainImage2.image
                                  ),
                                  alt:
                                    null !==
                                      (_item$mainImage$alt =
                                        null == item ||
                                        null ===
                                          (_item$mainImage3 = item.mainImage) ||
                                        void 0 === _item$mainImage3
                                          ? void 0
                                          : _item$mainImage3.alt) &&
                                    void 0 !== _item$mainImage$alt
                                      ? _item$mainImage$alt
                                      : "testimonial-source-".concat(
                                          null == item ? void 0 : item.name,
                                          "-profile-image"
                                        ),
                                }
                              ),
                            __jsx(
                              "p",
                              {
                                className:
                                  "mb-1 text-2xl font-bold font-heading",
                              },
                              null == item ? void 0 : item.name
                            ),
                            __jsx(
                              components_ui_Text__WEBPACK_IMPORTED_MODULE_5__.x,
                              { muted: !0 },
                              null == item ? void 0 : item.jobTitle
                            )
                          )
                        );
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
              testimonials: {
                defaultValue: null,
                description: "",
                name: "testimonials",
                required: !1,
                type: { name: "ITestimonial[]" },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES[
              "components/sections/testimonials/variant_c.tsx#VariantC"
            ] = {
              docgenInfo: VariantC.__docgenInfo,
              name: "VariantC",
              path: "components/sections/testimonials/variant_c.tsx#VariantC",
            });
      } catch (__react_docgen_typescript_loader_error) {}
    },
    "./components/ui/Avatar/Avatar.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, { q: () => Avatar });
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
        next_image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          "./node_modules/@storybook/nextjs/dist/images/next-image.mjs"
        ),
        utils_cn__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__("./utils/cn.ts"),
        _excluded = ["src", "alt", "size", "text", "className"],
        __jsx = react__WEBPACK_IMPORTED_MODULE_0__.createElement;
      function Avatar(_ref) {
        var _text$split,
          src = _ref.src,
          _ref$alt = _ref.alt,
          alt = void 0 === _ref$alt ? "image" : _ref$alt,
          _ref$size = _ref.size,
          size = void 0 === _ref$size ? "sm" : _ref$size,
          text = _ref.text,
          className = _ref.className,
          props = (0,
          _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_2__.Z)(
            _ref,
            _excluded
          ),
          _useState = (0, react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),
          loaded = _useState[0],
          setLoaded = _useState[1],
          avatarSize = "".concat(
            "number" == typeof size
              ? size
              : { sm: 40, md: 80, lg: 120, xl: 160 }[size],
            "px"
          ),
          initials = text
            ? null == text ||
              null === (_text$split = text.split(" ")) ||
              void 0 === _text$split
              ? void 0
              : _text$split.reduce(function (acc, curr) {
                  return acc + curr[0];
                }, "")
            : "AB";
        return __jsx(
          "div",
          (0,
          _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_extends_js__WEBPACK_IMPORTED_MODULE_3__.Z)(
            {
              style: { maxWidth: avatarSize },
              className: (0, utils_cn__WEBPACK_IMPORTED_MODULE_4__.cn)(
                "relative rounded-full aspect-square overflow-hidden border-2 border-solid border-brand-primary-foreground",
                className
              ),
            },
            props
          ),
          (!loaded || !src) &&
            __jsx(
              "div",
              {
                className:
                  "flex items-center justify-center w-full h-full bg-brand-primary-foreground",
              },
              __jsx(
                "p",
                {
                  style: { fontSize: "calc(".concat(avatarSize, "/2)") },
                  className: "text-white",
                },
                initials
              )
            ),
          src &&
            __jsx(next_image__WEBPACK_IMPORTED_MODULE_1__.Z, {
              className: "object-cover object-center",
              src,
              alt,
              fill: !0,
              onLoad: function onLoad() {
                return setLoaded(!0);
              },
            })
        );
      }
      Avatar.displayName = "Avatar";
      try {
        (Avatar.displayName = "Avatar"),
          (Avatar.__docgenInfo = {
            description: "",
            displayName: "Avatar",
            props: {
              src: {
                defaultValue: null,
                description: "",
                name: "src",
                required: !0,
                type: { name: "string" },
              },
              alt: {
                defaultValue: { value: "image" },
                description: "",
                name: "alt",
                required: !1,
                type: { name: "string" },
              },
              size: {
                defaultValue: { value: "sm" },
                description: "",
                name: "size",
                required: !1,
                type: { name: "number | ImageSize" },
              },
              text: {
                defaultValue: null,
                description: "",
                name: "text",
                required: !1,
                type: { name: "string" },
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
            (STORYBOOK_REACT_CLASSES["components/ui/Avatar/Avatar.tsx#Avatar"] =
              {
                docgenInfo: Avatar.__docgenInfo,
                name: "Avatar",
                path: "components/ui/Avatar/Avatar.tsx#Avatar",
              });
      } catch (__react_docgen_typescript_loader_error) {}
    },
    "./components/ui/Avatar/index.ts": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, {
        q: () => _Avatar__WEBPACK_IMPORTED_MODULE_0__.q,
      });
      var _Avatar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        "./components/ui/Avatar/Avatar.tsx"
      );
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
    "./components/ui/SwiperButton/SwiperButton.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, { L: () => SwiperButton });
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
        _excluded = ["children", "ariaLabel", "type", "className", "onClick"],
        __jsx = react__WEBPACK_IMPORTED_MODULE_0__.createElement;
      function SwiperButton(_ref) {
        var children = _ref.children,
          ariaLabel = _ref.ariaLabel,
          type = _ref.type,
          className = _ref.className,
          onClick = _ref.onClick,
          props = (0,
          _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_1__.Z)(
            _ref,
            _excluded
          ),
          svgElement = __jsx(
            "svg",
            {
              className: "w-6 h-6",
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
            },
            __jsx(
              "path",
              "left" === type
                ? {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M10 19l-7-7m0 0l7-7m-7 7h18",
                  }
                : {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M14 5l7 7m0 0l-7 7m7-7H3",
                  }
            )
          );
        return __jsx(
          "button",
          (0,
          _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_extends_js__WEBPACK_IMPORTED_MODULE_2__.Z)(
            {
              onClick,
              className: (0, utils_cn__WEBPACK_IMPORTED_MODULE_3__.cn)(
                "inline-block p-2 bg-white rounded-full shadow text-brand-primary hover:text-brand-secondary focus:outline-none",
                className
              ),
              "aria-label": ariaLabel,
            },
            props
          ),
          children || svgElement
        );
      }
      SwiperButton.displayName = "SwiperButton";
      try {
        (SwiperButton.displayName = "SwiperButton"),
          (SwiperButton.__docgenInfo = {
            description: "",
            displayName: "SwiperButton",
            props: {
              ariaLabel: {
                defaultValue: null,
                description: "",
                name: "ariaLabel",
                required: !0,
                type: { name: "string" },
              },
              type: {
                defaultValue: null,
                description: "",
                name: "type",
                required: !1,
                type: {
                  name: "enum",
                  value: [{ value: '"left"' }, { value: '"right"' }],
                },
              },
              className: {
                defaultValue: null,
                description: "",
                name: "className",
                required: !1,
                type: { name: "string" },
              },
              onClick: {
                defaultValue: null,
                description: "",
                name: "onClick",
                required: !1,
                type: { name: "() => void" },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES[
              "components/ui/SwiperButton/SwiperButton.tsx#SwiperButton"
            ] = {
              docgenInfo: SwiperButton.__docgenInfo,
              name: "SwiperButton",
              path: "components/ui/SwiperButton/SwiperButton.tsx#SwiperButton",
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
