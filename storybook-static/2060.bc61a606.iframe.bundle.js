"use strict";
(self.webpackChunk_webriq_pagebuilder_site_template_default =
  self.webpackChunk_webriq_pagebuilder_site_template_default || []).push([
  [2060],
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
    "./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js":
      (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        function _assertThisInitialized(self) {
          if (void 0 === self)
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called"
            );
          return self;
        }
        __webpack_require__.d(__webpack_exports__, {
          Z: () => _assertThisInitialized,
        });
      },
    "./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/classCallCheck.js":
      (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor))
            throw new TypeError("Cannot call a class as a function");
        }
        __webpack_require__.d(__webpack_exports__, {
          Z: () => _classCallCheck,
        });
      },
    "./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/createClass.js":
      (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        __webpack_require__.d(__webpack_exports__, { Z: () => _createClass });
        var _toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            "./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/toPropertyKey.js"
          );
        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            (descriptor.enumerable = descriptor.enumerable || !1),
              (descriptor.configurable = !0),
              "value" in descriptor && (descriptor.writable = !0),
              Object.defineProperty(
                target,
                (0, _toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__.Z)(
                  descriptor.key
                ),
                descriptor
              );
          }
        }
        function _createClass(Constructor, protoProps, staticProps) {
          return (
            protoProps && _defineProperties(Constructor.prototype, protoProps),
            staticProps && _defineProperties(Constructor, staticProps),
            Object.defineProperty(Constructor, "prototype", { writable: !1 }),
            Constructor
          );
        }
      },
    "./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js":
      (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        function _getPrototypeOf(o) {
          return (
            (_getPrototypeOf = Object.setPrototypeOf
              ? Object.getPrototypeOf.bind()
              : function _getPrototypeOf(o) {
                  return o.__proto__ || Object.getPrototypeOf(o);
                }),
            _getPrototypeOf(o)
          );
        }
        __webpack_require__.d(__webpack_exports__, {
          Z: () => _getPrototypeOf,
        });
      },
    "./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/inherits.js":
      (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        function _setPrototypeOf(o, p) {
          return (
            (_setPrototypeOf = Object.setPrototypeOf
              ? Object.setPrototypeOf.bind()
              : function _setPrototypeOf(o, p) {
                  return (o.__proto__ = p), o;
                }),
            _setPrototypeOf(o, p)
          );
        }
        function _inherits(subClass, superClass) {
          if ("function" != typeof superClass && null !== superClass)
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          (subClass.prototype = Object.create(
            superClass && superClass.prototype,
            { constructor: { value: subClass, writable: !0, configurable: !0 } }
          )),
            Object.defineProperty(subClass, "prototype", { writable: !1 }),
            superClass && _setPrototypeOf(subClass, superClass);
        }
        __webpack_require__.d(__webpack_exports__, { Z: () => _inherits });
      },
    "./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js":
      (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        __webpack_require__.d(__webpack_exports__, {
          Z: () => _possibleConstructorReturn,
        });
        var _typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
            "./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/typeof.js"
          ),
          _assertThisInitialized_js__WEBPACK_IMPORTED_MODULE_1__ =
            __webpack_require__(
              "./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js"
            );
        function _possibleConstructorReturn(self, call) {
          if (
            call &&
            ("object" ===
              (0, _typeof_js__WEBPACK_IMPORTED_MODULE_0__.Z)(call) ||
              "function" == typeof call)
          )
            return call;
          if (void 0 !== call)
            throw new TypeError(
              "Derived constructors may only return object or undefined"
            );
          return (0, _assertThisInitialized_js__WEBPACK_IMPORTED_MODULE_1__.Z)(
            self
          );
        }
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
    "./components/sections/contact/variant_a.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        });
      var _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_extends_js__WEBPACK_IMPORTED_MODULE_9__ =
          __webpack_require__(
            "./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/extends.js"
          ),
        _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_7__ =
          (__webpack_require__(
            "./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js"
          ),
          __webpack_require__(
            "./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/slicedToArray.js"
          )),
        react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          "./node_modules/next/dist/compiled/react/index.js"
        ),
        next_image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          "./node_modules/@storybook/nextjs/dist/images/next-image.mjs"
        ),
        lib_sanity__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__("./lib/sanity.ts"),
        helper__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__("./helper/index.tsx"),
        components_ui_Form_Form__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__("./components/ui/Form/Form.tsx"),
        components_ui_FormField__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__("./components/ui/FormField/index.ts"),
        components_ui_Button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
          "./components/ui/Button/index.ts"
        ),
        __jsx = react__WEBPACK_IMPORTED_MODULE_0__.createElement;
      function VariantA(_ref) {
        var _form$fields,
          _form$buttonLabel,
          contactDescription = _ref.contactDescription,
          officeInformation = _ref.officeInformation,
          contactEmail = _ref.contactEmail,
          contactNumber = _ref.contactNumber,
          socialLinks = _ref.socialLinks,
          form = _ref.form,
          block = _ref.block,
          _React$useState = react__WEBPACK_IMPORTED_MODULE_0__.useState(null),
          _React$useState2 = (0,
          _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_7__.Z)(
            _React$useState,
            2
          ),
          _React$useState3 =
            (_React$useState2[0],
            _React$useState2[1],
            react__WEBPACK_IMPORTED_MODULE_0__.useState([])),
          _React$useState4 = (0,
          _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_7__.Z)(
            _React$useState3,
            2
          ),
          _React$useState5 =
            (_React$useState4[0],
            _React$useState4[1],
            react__WEBPACK_IMPORTED_MODULE_0__.useState(null)),
          _React$useState6 = (0,
          _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_7__.Z)(
            _React$useState5,
            2
          ),
          blockCustomization =
            (_React$useState6[0],
            _React$useState6[1],
            {
              marks: {
                internalLink: function internalLink(_ref2) {
                  var _value$href,
                    children = _ref2.children,
                    value = _ref2.value;
                  return __jsx(
                    "a",
                    {
                      "aria-label":
                        null !== (_value$href = value.href) &&
                        void 0 !== _value$href
                          ? _value$href
                          : "internal link",
                      style: { color: "red" },
                      href: value.slug.current,
                    },
                    children
                  );
                },
                link: function link(_ref3) {
                  var _value$href2,
                    _value$href3,
                    children = _ref3.children,
                    value = _ref3.value;
                  return value.blank
                    ? __jsx(
                        "a",
                        {
                          "aria-label":
                            null !== (_value$href2 = value.href) &&
                            void 0 !== _value$href2
                              ? _value$href2
                              : "external link",
                          href: value.href,
                          target: "_blank",
                          rel: "noopener noreferrer",
                        },
                        children
                      )
                    : __jsx(
                        "a",
                        {
                          "aria-label":
                            null !== (_value$href3 = value.href) &&
                            void 0 !== _value$href3
                              ? _value$href3
                              : "external link",
                          style: { color: "blue" },
                          href: value.href,
                        },
                        children
                      );
                },
              },
            });
        return __jsx(
          "section",
          null,
          __jsx(
            "div",
            { className: "py-20 bg-gray-50" },
            __jsx(
              "div",
              { className: "container px-4 mx-auto" },
              contactDescription &&
                __jsx(
                  "div",
                  { className: "px-5 mb-12 sm:px-10 lg:px-0 lg:pl-10" },
                  __jsx(
                    "h1",
                    {
                      className: "text-4xl font-bold font-heading lg:text-5xl",
                    },
                    "Contact"
                  ),
                  __jsx(
                    "p",
                    { className: "mt-5 leading-loose text-gray-700" },
                    contactDescription
                  )
                ),
              __jsx(
                "div",
                { className: "flex flex-wrap" },
                __jsx(
                  "div",
                  {
                    className:
                      "w-full px-5 mb-16 sm:px-10 lg:mb-0 lg:w-1/2 lg:pr-0 lg:pl-10",
                  },
                  __jsx(
                    "div",
                    { className: "flex flex-wrap" },
                    officeInformation &&
                      __jsx(
                        "div",
                        { className: "w-full pr-10 mb-12 md:w-1/2 lg:w-1/2" },
                        __jsx(
                          "h2",
                          { className: "mb-5 text-3xl font-bold lg:text-4xl" },
                          "Office"
                        ),
                        __jsx(
                          "p",
                          { className: "text-gray-700" },
                          officeInformation
                        )
                      ),
                    contactEmail || contactNumber
                      ? __jsx(
                          "div",
                          { className: "w-full pr-10 mb-12 md:w-1/2" },
                          __jsx(
                            "h2",
                            {
                              className: "mb-5 text-3xl font-bold lg:text-4xl",
                            },
                            "Contacts"
                          ),
                          __jsx(
                            "p",
                            { className: "mb-5 text-gray-700" },
                            contactEmail
                          ),
                          __jsx(
                            "p",
                            { className: "text-gray-700" },
                            contactNumber
                          )
                        )
                      : null,
                    socialLinks &&
                      __jsx(
                        "div",
                        { className: "w-full md:w-1/3 lg:w-full" },
                        __jsx(
                          "h2",
                          { className: "mb-5 text-3xl font-bold lg:text-4xl" },
                          "Socials"
                        ),
                        __jsx(
                          "div",
                          {
                            className: "order-first mb-4 lg:order-last lg:mb-0",
                          },
                          null == socialLinks
                            ? void 0
                            : socialLinks.map(function (social) {
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
                                        "inline-block mr-5 rounded bg-gray-50 hover:bg-gray-100",
                                      target: "_blank",
                                      rel: "noopener noreferrer",
                                      href:
                                        null == social
                                          ? void 0
                                          : social.socialMediaLink,
                                      key:
                                        null == social ? void 0 : social._key,
                                    },
                                    "facebook" ===
                                      (null == social
                                        ? void 0
                                        : social.socialMedia)
                                      ? __jsx(
                                          "svg",
                                          {
                                            xmlns: "http://www.w3.org/2000/svg",
                                            width: "24",
                                            height: "24",
                                            viewBox: "0 0 24 24",
                                          },
                                          __jsx("path", {
                                            fill: "#0045d8",
                                            d: "M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z",
                                          })
                                        )
                                      : "twitter" ===
                                        (null == social
                                          ? void 0
                                          : social.socialMedia)
                                      ? __jsx(
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
                                        )
                                      : "instagram" ===
                                        (null == social
                                          ? void 0
                                          : social.socialMedia)
                                      ? __jsx(
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
                                        )
                                      : (null == social ||
                                        null ===
                                          (_social$socialMediaIc =
                                            social.socialMediaIcon) ||
                                        void 0 === _social$socialMediaIc
                                          ? void 0
                                          : _social$socialMediaIc.image) &&
                                        __jsx(
                                          next_image__WEBPACK_IMPORTED_MODULE_1__.Z,
                                          {
                                            src: (0,
                                            lib_sanity__WEBPACK_IMPORTED_MODULE_2__.uH)(
                                              null == social ||
                                                null ===
                                                  (_social$socialMediaIc2 =
                                                    social.socialMediaIcon) ||
                                                void 0 ===
                                                  _social$socialMediaIc2
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
                                                  void 0 ===
                                                    _social$socialMediaIc4
                                                    ? void 0
                                                    : _social$socialMediaIc4.alt) &&
                                              void 0 !== _social$socialMediaIc3
                                                ? _social$socialMediaIc3
                                                : "contact-socialMedia-icon",
                                          }
                                        )
                                  )
                                );
                              })
                        )
                      )
                  )
                ),
                __jsx(
                  "div",
                  {
                    className: "w-full px-5 sm:px-10 lg:w-1/2 lg:px-0 lg:pl-10",
                  },
                  (null == form ? void 0 : form.fields) &&
                    __jsx(
                      "div",
                      { className: "lg:mx-auto lg:max-w-md" },
                      __jsx(
                        components_ui_Form_Form__WEBPACK_IMPORTED_MODULE_4__.l,
                        {
                          id: null == form ? void 0 : form.id,
                          name: "Contact-VariantA-Form",
                          className: "space-y-3 form-contacts",
                          thankyouPage: (0,
                          helper__WEBPACK_IMPORTED_MODULE_3__.W6)(
                            null == form ? void 0 : form.thankYouPage
                          ),
                        },
                        null == form ||
                          null === (_form$fields = form.fields) ||
                          void 0 === _form$fields
                          ? void 0
                          : _form$fields.map(function (formFields, index) {
                              return __jsx(
                                "div",
                                { key: index },
                                "inputCheckbox" ===
                                  (null == formFields
                                    ? void 0
                                    : formFields.type)
                                  ? __jsx(
                                      components_ui_FormField__WEBPACK_IMPORTED_MODULE_5__.W,
                                      (0,
                                      _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_extends_js__WEBPACK_IMPORTED_MODULE_9__.Z)(
                                        {},
                                        formFields,
                                        {
                                          name:
                                            null == formFields
                                              ? void 0
                                              : formFields.name,
                                          noLabel: !0,
                                          variant: "inline",
                                        }
                                      )
                                    )
                                  : __jsx(
                                      components_ui_FormField__WEBPACK_IMPORTED_MODULE_5__.W,
                                      (0,
                                      _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_extends_js__WEBPACK_IMPORTED_MODULE_9__.Z)(
                                        {},
                                        formFields,
                                        {
                                          name:
                                            null == formFields
                                              ? void 0
                                              : formFields.name,
                                          noLabel: !0,
                                          variant: "primary",
                                        }
                                      )
                                    )
                              );
                            }),
                        __jsx(
                          "div",
                          {
                            className:
                              "items-center sm:flex sm:justify-between",
                          },
                          block &&
                            __jsx(
                              "div",
                              { className: "inline-flex" },
                              __jsx("input", {
                                "aria-label": "Agree to terms",
                                className: "mt-1 mr-2",
                                type: "checkbox",
                                id: "terms",
                                name: "terms",
                                defaultValue: 1,
                                required: !0,
                              }),
                              __jsx(
                                "span",
                                { className: "text-sm font-semibold" },
                                __jsx(
                                  lib_sanity__WEBPACK_IMPORTED_MODULE_2__.YI,
                                  {
                                    value: block,
                                    components: blockCustomization,
                                  }
                                )
                              )
                            ),
                          __jsx(
                            "div",
                            null,
                            __jsx("div", { className: "webriq-recaptcha" })
                          ),
                          (null == form ? void 0 : form.buttonLabel) &&
                            __jsx(
                              components_ui_Button__WEBPACK_IMPORTED_MODULE_6__.z,
                              {
                                ariaLabel:
                                  null !==
                                    (_form$buttonLabel =
                                      null == form
                                        ? void 0
                                        : form.buttonLabel) &&
                                  void 0 !== _form$buttonLabel
                                    ? _form$buttonLabel
                                    : "Contact form submit button",
                                className:
                                  "inline-block px-6 py-2 mt-5 font-bold leading-loose text-white transition duration-200 rounded-l-xl rounded-t-xl bg-brand-primary hover:bg-brand-primary-foreground sm:mt-0",
                                type: "submit",
                              },
                              null == form ? void 0 : form.buttonLabel
                            )
                        )
                      )
                    )
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
              "components/sections/contact/variant_a.tsx#VariantA"
            ] = {
              docgenInfo: VariantA.__docgenInfo,
              name: "VariantA",
              path: "components/sections/contact/variant_a.tsx#VariantA",
            });
      } catch (__react_docgen_typescript_loader_error) {}
    },
    "./components/ui/Button/Button.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, { z: () => Button });
      var _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_extends_js__WEBPACK_IMPORTED_MODULE_3__ =
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
        utils_cn__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__("./utils/cn.ts"),
        react_icons_fa__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          "./node_modules/react-icons/fa/index.esm.js"
        ),
        _excluded = [
          "variant",
          "className",
          "ariaLabel",
          "children",
          "loading",
          "disabled",
          "loadingComponent",
          "onClick",
          "type",
        ],
        __jsx = react__WEBPACK_IMPORTED_MODULE_0__.createElement;
      function Button(_ref) {
        var _variants$variant,
          _ref$variant = _ref.variant,
          variant = void 0 === _ref$variant ? "primary" : _ref$variant,
          className = _ref.className,
          ariaLabel = _ref.ariaLabel,
          children = _ref.children,
          loading = _ref.loading,
          disabled = _ref.disabled,
          loadingComponent = _ref.loadingComponent,
          onClick = _ref.onClick,
          _ref$type = _ref.type,
          type = void 0 === _ref$type ? "button" : _ref$type,
          props = (0,
          _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_1__.Z)(
            _ref,
            _excluded
          ),
          commonStyles =
            "inline-block py-2 px-6 rounded-l-xl rounded-t-xl font-bold  transition duration-200",
          primary = "".concat(
            commonStyles,
            " bg-brand-primary hover:bg-brand-primary-foreground text-gray-50  outline-none "
          ),
          outline = "".concat(
            commonStyles,
            " bg-white hover:bg-slate-100  font-bold border text-brand-primary-foreground border-brand-primary-foreground "
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
                borderless: "".concat(
                  commonStyles,
                  " bg-transparent hover:bg-slate-100 border-0"
                ),
                tertiary: "".concat(
                  commonStyles,
                  " rounded bg-brand-primary hover:bg-brand-primary-foreground text-gray-50  outline-none"
                ),
              }[variant]) && void 0 !== _variants$variant
              ? _variants$variant
              : primary,
          Loader =
            null != loadingComponent
              ? loadingComponent
              : __jsx(react_icons_fa__WEBPACK_IMPORTED_MODULE_2__.fCD, {
                  className: "animate-spin",
                  size: 30,
                });
        return __jsx(
          "button",
          (0,
          _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_extends_js__WEBPACK_IMPORTED_MODULE_3__.Z)(
            {
              onClick,
              disabled: null != disabled ? disabled : loading,
              className: (0, utils_cn__WEBPACK_IMPORTED_MODULE_4__.cn)(
                variantClass,
                className
              ),
              "aria-label": ariaLabel,
              type,
            },
            props
          ),
          loading ? Loader : children
        );
      }
      Button.displayName = "Button";
      try {
        (Button.displayName = "Button"),
          (Button.__docgenInfo = {
            description: "",
            displayName: "Button",
            props: {
              className: {
                defaultValue: null,
                description: "Defines the classname of the button.",
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
                    { value: '"borderless"' },
                    { value: '"tertiary"' },
                  ],
                },
              },
              ariaLabel: {
                defaultValue: null,
                description:
                  'String value that labels the interactive element e.g. "Submit"',
                name: "ariaLabel",
                required: !0,
                type: { name: "string" },
              },
              children: {
                defaultValue: null,
                description: "Defines the content inside the button.",
                name: "children",
                required: !0,
                type: { name: "ReactNode" },
              },
              loading: {
                defaultValue: null,
                description: "Sets the button in a loading state.",
                name: "loading",
                required: !1,
                type: { name: "boolean" },
              },
              disabled: {
                defaultValue: null,
                description: "Sets the button in a disabled state.",
                name: "disabled",
                required: !1,
                type: { name: "boolean" },
              },
              loadingComponent: {
                defaultValue: null,
                description: "Custom loading component.",
                name: "loadingComponent",
                required: !1,
                type: { name: "ReactNode" },
              },
              onClick: {
                defaultValue: null,
                description: "Function that runs when the button is clicked.",
                name: "onClick",
                required: !1,
                type: { name: "() => void" },
              },
              type: {
                defaultValue: { value: "button" },
                description: "Set button type. Defaults to button",
                name: "type",
                required: !1,
                type: {
                  name: "enum",
                  value: [{ value: '"button"' }, { value: '"submit"' }],
                },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["components/ui/Button/Button.tsx#Button"] =
              {
                docgenInfo: Button.__docgenInfo,
                name: "Button",
                path: "components/ui/Button/Button.tsx#Button",
              });
      } catch (__react_docgen_typescript_loader_error) {}
    },
    "./components/ui/Button/index.ts": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, {
        z: () => _Button__WEBPACK_IMPORTED_MODULE_0__.z,
      });
      var _Button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        "./components/ui/Button/Button.tsx"
      );
    },
    "./components/ui/Form/Form.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, { l: () => Form });
      var components_webriq_form__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__("./components/webriq-form.js"),
        helper__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__("./helper/index.tsx"),
        __jsx = __webpack_require__(
          "./node_modules/next/dist/compiled/react/index.js"
        ).createElement,
        Form = function Form(_ref) {
          var id = _ref.id,
            name = _ref.name,
            thankyouPage = _ref.thankyouPage,
            className = _ref.className,
            children = _ref.children;
          return __jsx(
            components_webriq_form__WEBPACK_IMPORTED_MODULE_1__.Z,
            {
              method: "POST",
              "data-form-id": id,
              name: null != name ? name : "Form",
              className,
              "data-thankyou-url": (0, helper__WEBPACK_IMPORTED_MODULE_2__.W6)(
                thankyouPage
              ),
              scriptsrc:
                "https://pagebuilderforms.webriq.com/js/initReactForms",
            },
            children
          );
        };
      Form.displayName = "Form";
      try {
        (Form.displayName = "Form"),
          (Form.__docgenInfo = {
            description: "",
            displayName: "Form",
            props: {
              className: {
                defaultValue: null,
                description: "",
                name: "className",
                required: !1,
                type: { name: "string" },
              },
              id: {
                defaultValue: null,
                description: "",
                name: "id",
                required: !0,
                type: { name: "string" },
              },
              name: {
                defaultValue: null,
                description: "",
                name: "name",
                required: !0,
                type: { name: "string" },
              },
              thankyouPage: {
                defaultValue: null,
                description: "",
                name: "thankyouPage",
                required: !1,
                type: { name: "LabeledRoute" },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["components/ui/Form/Form.tsx#Form"] = {
              docgenInfo: Form.__docgenInfo,
              name: "Form",
              path: "components/ui/Form/Form.tsx#Form",
            });
      } catch (__react_docgen_typescript_loader_error) {}
    },
    "./components/ui/FormField/index.ts": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, {
        W: () => _FormField__WEBPACK_IMPORTED_MODULE_0__.W,
      });
      var _FormField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        "./components/ui/FormField/FormField.tsx"
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
    "./components/webriq-form.js": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, {
        Z: () => __WEBPACK_DEFAULT_EXPORT__,
      });
      var _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_extends_js__WEBPACK_IMPORTED_MODULE_8__ =
          __webpack_require__(
            "./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/extends.js"
          ),
        _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_7__ =
          __webpack_require__(
            "./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"
          ),
        _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(
            "./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/classCallCheck.js"
          ),
        _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_6__ =
          __webpack_require__(
            "./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/createClass.js"
          ),
        _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_assertThisInitialized_js__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(
            "./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js"
          ),
        _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_inherits_js__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(
            "./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/inherits.js"
          ),
        _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn_js__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            "./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js"
          ),
        _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_getPrototypeOf_js__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            "./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js"
          ),
        react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          "./node_modules/next/dist/compiled/react/index.js"
        ),
        _excluded = ["id", "name", "className"],
        __jsx = react__WEBPACK_IMPORTED_MODULE_0__.createElement;
      function _createSuper(Derived) {
        var hasNativeReflectConstruct = (function _isNativeReflectConstruct() {
          if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ("function" == typeof Proxy) return !0;
          try {
            return (
              Boolean.prototype.valueOf.call(
                Reflect.construct(Boolean, [], function () {})
              ),
              !0
            );
          } catch (e) {
            return !1;
          }
        })();
        return function _createSuperInternal() {
          var result,
            Super = (0,
            _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_getPrototypeOf_js__WEBPACK_IMPORTED_MODULE_1__.Z)(
              Derived
            );
          if (hasNativeReflectConstruct) {
            var NewTarget = (0,
            _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_getPrototypeOf_js__WEBPACK_IMPORTED_MODULE_1__.Z)(
              this
            ).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
          } else result = Super.apply(this, arguments);
          return (0,
          _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn_js__WEBPACK_IMPORTED_MODULE_2__.Z)(
            this,
            result
          );
        };
      }
      var WebriQForm = (function (_React$Component) {
        (0,
        _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_inherits_js__WEBPACK_IMPORTED_MODULE_3__.Z)(
          WebriQForm,
          _React$Component
        );
        var _super = _createSuper(WebriQForm);
        function WebriQForm(props) {
          var _this;
          return (
            (0,
            _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_4__.Z)(
              this,
              WebriQForm
            ),
            ((_this = _super.call(this, props)).loadWebriQFormScript =
              _this.loadWebriQFormScript.bind(
                (0,
                _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_assertThisInitialized_js__WEBPACK_IMPORTED_MODULE_5__.Z)(
                  _this
                )
              )),
            _this
          );
        }
        return (
          (0,
          _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_6__.Z)(
            WebriQForm,
            [
              {
                key: "componentDidMount",
                value: function componentDidMount() {
                  window &&
                    !window.isWebriQFormLoaded &&
                    this.loadWebriQFormScript(),
                    window &&
                      window.isWebriQFormLoaded &&
                      window.webriqFormRefresh();
                },
              },
              {
                key: "loadWebriQFormScript",
                value: function loadWebriQFormScript() {
                  if (!document.getElementById("webriqform")) {
                    var script = document.createElement("script");
                    (script.type = "text/javascript"),
                      (script.id = "webriqform"),
                      (script.defer = !0),
                      (script.src =
                        this.props.scriptSrc ||
                        "https://pagebuilderforms.webriq.com/js/initReactForms"),
                      document.body.appendChild(script);
                    var headScript = document.getElementsByTagName("script")[0];
                    headScript.parentNode.insertBefore(script, headScript);
                  }
                },
              },
              {
                key: "componentWillUnmount",
                value: function componentWillUnmount() {
                  var unmountScript = this.props.unmountScript,
                    webriqFormScript = document.getElementById("webriqform");
                  webriqFormScript &&
                    unmountScript &&
                    webriqFormScript.parentNode.removeChild(webriqFormScript),
                    window && unmountScript && (window.isWebriQFormLoaded = !1);
                  var webriqFormRecaptcha = document.getElementById(
                    "webriqFormRecaptcha"
                  );
                  webriqFormRecaptcha &&
                    unmountScript &&
                    webriqFormRecaptcha.parentNode.removeChild(
                      webriqFormRecaptcha
                    );
                },
              },
              {
                key: "render",
                value: function render() {
                  var _this$props = this.props,
                    id = _this$props.id,
                    name = _this$props.name,
                    className = _this$props.className,
                    rest = (0,
                    _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_7__.Z)(
                      _this$props,
                      _excluded
                    ),
                    formId = this.props.formId || this.props["data-form-id"],
                    redirectURL =
                      this.props.redirectUrl ||
                      this.props["data-thankyou-url"] ||
                      "/thank-you";
                  return __jsx(
                    "form",
                    (0,
                    _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_extends_js__WEBPACK_IMPORTED_MODULE_8__.Z)(
                      {
                        name,
                        id,
                        className,
                        method: "POST",
                        "data-form-id": formId,
                        "data-thankyou-url": redirectURL,
                        webriq: "true",
                      },
                      rest
                    ),
                    this.props.children
                  );
                },
              },
            ]
          ),
          WebriQForm
        );
      })(react__WEBPACK_IMPORTED_MODULE_0__.Component);
      WebriQForm.displayName = "WebriQForm";
      const __WEBPACK_DEFAULT_EXPORT__ = WebriQForm;
      WebriQForm.__docgenInfo = {
        description: "",
        methods: [
          {
            name: "loadWebriQFormScript",
            docblock: null,
            modifiers: [],
            params: [],
            returns: null,
          },
        ],
        displayName: "WebriQForm",
      };
    },
  },
]);
