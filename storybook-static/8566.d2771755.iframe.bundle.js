"use strict";
(self.webpackChunk_webriq_pagebuilder_site_template_default =
  self.webpackChunk_webriq_pagebuilder_site_template_default || []).push([
  [8566],
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
    "./components/sections/app_promo/variant_b.tsx": (
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
        components_ui_Text__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          "./components/ui/Text/index.ts"
        ),
        components_ui_SwiperButton__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__("./components/ui/SwiperButton/index.ts"),
        __jsx = react__WEBPACK_IMPORTED_MODULE_0__.createElement;
      function VariantB(_ref) {
        var _images$currentPositi,
          _images$currentPositi2,
          _images$currentPositi3,
          _images$currentPositi4,
          _images$currentPositi5,
          _images$currentPositi6,
          _images$currentPositi7,
          _images$currentPositi8,
          subtitle = _ref.subtitle,
          title = _ref.title,
          description = _ref.description,
          statistics = _ref.statistics,
          images = _ref.images,
          _React$useState = react__WEBPACK_IMPORTED_MODULE_0__.useState(0),
          _React$useState2 = (0,
          _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__.Z)(
            _React$useState,
            2
          ),
          currentPosition = _React$useState2[0],
          setCurrentPosition = _React$useState2[1],
          arrowRightClick = function arrowRightClick() {
            currentPosition !== images.length - 1
              ? setCurrentPosition(currentPosition + 1)
              : setCurrentPosition((currentPosition = 0));
          },
          arrowLeftClick = function arrowLeftClick() {
            setCurrentPosition(
              0 !== currentPosition
                ? currentPosition - 1
                : (currentPosition = images.length - 1)
            );
          };
        return __jsx(
          "section",
          null,
          __jsx(
            "div",
            { className: "py-20 bg-gray-50" },
            __jsx(
              "div",
              { className: "container px-10 mx-auto" },
              __jsx(
                "div",
                { className: "lg:mx-4 lg:flex lg:flex-wrap" },
                __jsx(
                  "div",
                  { className: "w-full px-4 lg:w-1/2" },
                  __jsx(
                    "div",
                    { className: "max-w-xl mt-8" },
                    __jsx(
                      components_ui_Text__WEBPACK_IMPORTED_MODULE_3__.x,
                      {
                        className:
                          "font-bold text-center text-brand-primary md:text-left lg:text-left",
                      },
                      subtitle
                    ),
                    __jsx(
                      components_ui_Text__WEBPACK_IMPORTED_MODULE_3__.x,
                      {
                        type: "h1",
                        className:
                          "mt-3 text-xl text-center md:text-4xl lg:text-5xl md:text-left",
                      },
                      title
                    ),
                    __jsx(
                      components_ui_Text__WEBPACK_IMPORTED_MODULE_3__.x,
                      {
                        className:
                          "mt-3 mb-10 leading-loose text-center text-gray-500 break-words md:text-left lg:text-left",
                      },
                      description
                    ),
                    __jsx(
                      "div",
                      { className: "sm:flex sm:flex-wrap" },
                      statistics &&
                        statistics.map(function (items, index) {
                          return __jsx(
                            "div",
                            {
                              className:
                                "w-full mb-8 text-center md:text-left lg:w-1/2 lg:text-left",
                              key: index,
                            },
                            __jsx(
                              "p",
                              { className: "mb-3 text-gray-500" },
                              null == items ? void 0 : items.label
                            ),
                            __jsx(
                              "span",
                              {
                                className:
                                  "text-xl font-bold md:text-3xl lg:text-4xl",
                              },
                              null == items ? void 0 : items.value
                            )
                          );
                        })
                    )
                  )
                ),
                __jsx(
                  "div",
                  {
                    className:
                      "flex items-center justify-center w-full sm:flex-wrap lg:w-1/2 xl:w-1/2 2xl:w-1/2",
                  },
                  images &&
                    (images.length > 1
                      ? __jsx(
                          react__WEBPACK_IMPORTED_MODULE_0__.Fragment,
                          null,
                          __jsx(
                            components_ui_SwiperButton__WEBPACK_IMPORTED_MODULE_4__.L,
                            {
                              type: "left",
                              ariaLabel: "Left Arrow button",
                              className:
                                "hidden mx-2 order-0 md:order-0 lg:order-0 sm:inline-block md:mr-12 md:p-4 lg:mr-12 lg:p-4 xl:order-1 xl:mr-12 xl:p-4 2xl:order-1 2xl:mr-12 2xl:p-4",
                              onClick: arrowLeftClick,
                            }
                          ),
                          __jsx(
                            "div",
                            {
                              className:
                                "order-1 object-contain w-1/2 mr-2 xl:order-0 2xl:order-0 md:order-1 lg:order-1",
                            },
                            (null == images ||
                            null ===
                              (_images$currentPositi =
                                images[currentPosition]) ||
                            void 0 === _images$currentPositi
                              ? void 0
                              : _images$currentPositi.image) &&
                              __jsx(next_image__WEBPACK_IMPORTED_MODULE_1__.Z, {
                                className:
                                  "object-cover w-full mx-auto mb-8 xl:mb-0",
                                src: (0,
                                lib_sanity__WEBPACK_IMPORTED_MODULE_2__.uH)(
                                  null == images ||
                                    null ===
                                      (_images$currentPositi2 =
                                        images[currentPosition]) ||
                                    void 0 === _images$currentPositi2
                                    ? void 0
                                    : _images$currentPositi2.image
                                ),
                                sizes: "100vw",
                                width: 500,
                                height: 850,
                                alt:
                                  null !==
                                    (_images$currentPositi3 =
                                      null == images ||
                                      null ===
                                        (_images$currentPositi4 =
                                          images[currentPosition]) ||
                                      void 0 === _images$currentPositi4
                                        ? void 0
                                        : _images$currentPositi4.alt) &&
                                  void 0 !== _images$currentPositi3
                                    ? _images$currentPositi3
                                    : "appPromo-variantB-image".concat(
                                        currentPosition
                                      ),
                              })
                          ),
                          __jsx(
                            components_ui_SwiperButton__WEBPACK_IMPORTED_MODULE_4__.L,
                            {
                              type: "right",
                              ariaLabel: "Right Arrow button",
                              className:
                                "order-2 hidden sm:inline-block md:ml-12 md:p-4 lg:ml-12 lg:p-4 xl:ml-12 xl:p-4 2xl:ml-12 2xl:p-4",
                              onClick: arrowRightClick,
                            }
                          )
                        )
                      : __jsx(
                          "div",
                          { className: "object-contain md:w-2/5 xl:w-2/5" },
                          (null == images ||
                          null ===
                            (_images$currentPositi5 =
                              images[currentPosition]) ||
                          void 0 === _images$currentPositi5
                            ? void 0
                            : _images$currentPositi5.image) &&
                            __jsx(next_image__WEBPACK_IMPORTED_MODULE_1__.Z, {
                              className: "object-cover mx-auto mb-8 xl:mb-0",
                              src: (0,
                              lib_sanity__WEBPACK_IMPORTED_MODULE_2__.uH)(
                                null == images ||
                                  null ===
                                    (_images$currentPositi6 =
                                      images[currentPosition]) ||
                                  void 0 === _images$currentPositi6
                                  ? void 0
                                  : _images$currentPositi6.image
                              ),
                              sizes: "100vw",
                              width: 500,
                              height: 850,
                              alt:
                                null !==
                                  (_images$currentPositi7 =
                                    null == images ||
                                    null ===
                                      (_images$currentPositi8 =
                                        images[currentPosition]) ||
                                    void 0 === _images$currentPositi8
                                      ? void 0
                                      : _images$currentPositi8.alt) &&
                                void 0 !== _images$currentPositi7
                                  ? _images$currentPositi7
                                  : "appPromo-variantB-image".concat(
                                      currentPosition
                                    ),
                            })
                        ))
                ),
                __jsx(
                  "div",
                  { className: "flex justify-between sm:hidden" },
                  __jsx(
                    components_ui_SwiperButton__WEBPACK_IMPORTED_MODULE_4__.L,
                    {
                      type: "left",
                      ariaLabel: "Left Arrow button",
                      className:
                        "order-0 md:order-0 lg:order-0xl:order-1 2xl:order-1",
                      onClick: arrowLeftClick,
                    }
                  ),
                  __jsx(
                    components_ui_SwiperButton__WEBPACK_IMPORTED_MODULE_4__.L,
                    {
                      type: "right",
                      ariaLabel: "Right Arrow button",
                      className: "order-2 ",
                      onClick: arrowRightClick,
                    }
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
              logo: {
                defaultValue: null,
                description: "",
                name: "logo",
                required: !1,
                type: { name: "Logo" },
              },
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
              description: {
                defaultValue: null,
                description: "",
                name: "description",
                required: !1,
                type: { name: "string" },
              },
              statistics: {
                defaultValue: null,
                description: "",
                name: "statistics",
                required: !1,
                type: { name: "StatItems[]" },
              },
              features: {
                defaultValue: null,
                description: "",
                name: "features",
                required: !1,
                type: { name: "string[]" },
              },
              images: {
                defaultValue: null,
                description: "",
                name: "images",
                required: !1,
                type: { name: "Images[]" },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES[
              "components/sections/app_promo/variant_b.tsx#VariantB"
            ] = {
              docgenInfo: VariantB.__docgenInfo,
              name: "VariantB",
              path: "components/sections/app_promo/variant_b.tsx#VariantB",
            });
      } catch (__react_docgen_typescript_loader_error) {}
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
    "./components/ui/SwiperButton/index.ts": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, {
        L: () => _SwiperButton__WEBPACK_IMPORTED_MODULE_0__.L,
      });
      var _SwiperButton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        "./components/ui/SwiperButton/SwiperButton.tsx"
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
