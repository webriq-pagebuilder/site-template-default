"use strict";
(self.webpackChunk_webriq_pagebuilder_site_template_default =
  self.webpackChunk_webriq_pagebuilder_site_template_default || []).push([
  [2236],
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
    "./components/sections/sign_in_sign_up/variant_b.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        });
      var _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_9__ =
          __webpack_require__(
            "./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js"
          ),
        _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__ =
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
        components_ui_Card__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          "./components/ui/Card/index.ts"
        ),
        components_ui_Form_Form__WEBPACK_IMPORTED_MODULE_6__ =
          __webpack_require__("./components/ui/Form/Form.tsx"),
        components_ui_Button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
          "./components/ui/Button/index.ts"
        ),
        __jsx = react__WEBPACK_IMPORTED_MODULE_0__.createElement;
      function VariantB(_ref) {
        var _logo$alt,
          _form$fields,
          _form$fields2,
          _form$buttonLabel,
          logo = _ref.logo,
          form = _ref.form,
          formLinks = _ref.formLinks,
          signInLink = _ref.signInLink;
        return __jsx(
          "section",
          { className: "py-10 bg-brand-primary lg:py-20" },
          __jsx(
            "div",
            { className: "container px-4 mx-auto" },
            __jsx(
              "div",
              { className: "max-w-xl mx-auto" },
              __jsx(
                "div",
                { className: "mb-10" },
                (null == logo ? void 0 : logo.image) &&
                  __jsx(
                    next_link__WEBPACK_IMPORTED_MODULE_1___default(),
                    {
                      "aria-label": "Go to ".concat(
                        "/" ===
                          (0, helper__WEBPACK_IMPORTED_MODULE_4__.oQ)(logo)
                          ? "home page"
                          : (0, helper__WEBPACK_IMPORTED_MODULE_4__.oQ)(logo)
                      ),
                      className:
                        "flex justify-center text-3xl font-bold leading-none text-white",
                      href: (0, helper__WEBPACK_IMPORTED_MODULE_4__.oQ)(logo),
                    },
                    __jsx(next_image__WEBPACK_IMPORTED_MODULE_2__.Z, {
                      src: (0, lib_sanity__WEBPACK_IMPORTED_MODULE_3__.uH)(
                        null == logo ? void 0 : logo.image
                      ),
                      width: 50,
                      height: 50,
                      quality: 100,
                      alt:
                        null !==
                          (_logo$alt = null == logo ? void 0 : logo.alt) &&
                        void 0 !== _logo$alt
                          ? _logo$alt
                          : "signUp-logo",
                    })
                  )
              ),
              __jsx(
                components_ui_Card__WEBPACK_IMPORTED_MODULE_5__.Z,
                { className: "p-6 mb-6 bg-white lg:mb-10 lg:p-12" },
                __jsx(
                  "div",
                  { className: "mb-6" },
                  __jsx(
                    "span",
                    { className: "text-gray-500" },
                    null == form ? void 0 : form.subtitle
                  ),
                  __jsx(
                    "h1",
                    { className: "text-2xl font-bold" },
                    null == form ? void 0 : form.name
                  )
                ),
                (null == form ? void 0 : form.fields) &&
                  __jsx(
                    components_ui_Form_Form__WEBPACK_IMPORTED_MODULE_6__.l,
                    {
                      id: null == form ? void 0 : form.id,
                      name: "SignUp-VariantB-Form",
                      className: "form-signup",
                      thankyouPage: (0, helper__WEBPACK_IMPORTED_MODULE_4__.W6)(
                        null == form ? void 0 : form.thankYouPage
                      ),
                    },
                    __jsx(
                      "div",
                      { className: "flex flex-wrap -mx-2" },
                      null == form ||
                        null === (_form$fields = form.fields) ||
                        void 0 === _form$fields ||
                        null === (_form$fields = _form$fields.slice(0, 2)) ||
                        void 0 === _form$fields
                        ? void 0
                        : _form$fields.map(function (formFields, index) {
                            return __jsx(
                              "div",
                              {
                                className: "w-full px-2 mb-3 lg:w-1/2",
                                key: index,
                              },
                              __jsx(FormFields, { fields: formFields })
                            );
                          })
                    ),
                    null == form ||
                      null === (_form$fields2 = form.fields) ||
                      void 0 === _form$fields2 ||
                      null === (_form$fields2 = _form$fields2.slice(2)) ||
                      void 0 === _form$fields2
                      ? void 0
                      : _form$fields2.map(function (formFields, index) {
                          return __jsx(
                            "div",
                            { key: index },
                            __jsx(FormFields, { fields: formFields })
                          );
                        }),
                    __jsx(
                      "div",
                      null,
                      __jsx("div", { className: "webriq-recaptcha" })
                    ),
                    __jsx(
                      "div",
                      { className: "text-center" },
                      (null == form ? void 0 : form.buttonLabel) &&
                        __jsx(
                          components_ui_Button__WEBPACK_IMPORTED_MODULE_7__.z,
                          {
                            className: "w-full py-4",
                            ariaLabel:
                              null !==
                                (_form$buttonLabel =
                                  null == form ? void 0 : form.buttonLabel) &&
                              void 0 !== _form$buttonLabel
                                ? _form$buttonLabel
                                : "Sign Up form submit button",
                            variant: "tertiary",
                            type: "submit",
                          },
                          null == form ? void 0 : form.buttonLabel
                        ),
                      (null == signInLink ? void 0 : signInLink.label) &&
                        __jsx(
                          "span",
                          { className: "text-xs text-gray-900" },
                          __jsx("span", null, "Already have an account?"),
                          " ",
                          __jsx(
                            helper__WEBPACK_IMPORTED_MODULE_4__.MT,
                            {
                              link: signInLink,
                              className: "text-brand-primary hover:underline",
                              ariaLabel:
                                null == signInLink ? void 0 : signInLink.label,
                            },
                            null == signInLink ? void 0 : signInLink.label
                          )
                        )
                    )
                  )
              ),
              formLinks &&
                __jsx(
                  "p",
                  {
                    className:
                      "text-xs text-center text-brand-secondary-foreground",
                  },
                  null == formLinks
                    ? void 0
                    : formLinks.map(function (link, index, _ref2) {
                        var length = _ref2.length;
                        return __jsx(
                          "span",
                          { key: index },
                          __jsx(
                            helper__WEBPACK_IMPORTED_MODULE_4__.MT,
                            {
                              link,
                              className: "underline hover:text-gray-50",
                              ariaLabel: null == link ? void 0 : link.label,
                            },
                            null == link ? void 0 : link.label
                          ),
                          index === length - 1
                            ? null
                            : __jsx(
                                "span",
                                null,
                                index === length - 2 ? " and " : " , "
                              )
                        );
                      })
                )
            )
          )
        );
      }
      function FormFields(_ref3) {
        var _fields$placeholder,
          _fields$placeholder2,
          _fields$placeholder3,
          _fields$placeholder4,
          _fields$placeholder5,
          _fields$items,
          _fields$items2,
          _fields$items3,
          _fields$placeholder6,
          fields = _ref3.fields,
          _React$useState = react__WEBPACK_IMPORTED_MODULE_0__.useState(!1),
          _React$useState2 = (0,
          _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__.Z)(
            _React$useState,
            2
          ),
          showPassword = _React$useState2[0],
          setShowPassword = _React$useState2[1],
          _React$useState3 = react__WEBPACK_IMPORTED_MODULE_0__.useState(null),
          _React$useState4 = (0,
          _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__.Z)(
            _React$useState3,
            2
          ),
          value = _React$useState4[0],
          setValue = _React$useState4[1],
          _React$useState5 = react__WEBPACK_IMPORTED_MODULE_0__.useState([]),
          _React$useState6 = (0,
          _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__.Z)(
            _React$useState5,
            2
          ),
          checked = _React$useState6[0],
          setChecked = _React$useState6[1],
          handleRadioChange = function handleRadioChange(e) {
            setValue(e.target.value);
          },
          handleCheckboxChange = function handleCheckboxChange(e) {
            var _e$target = e.target,
              checked = _e$target.checked,
              value = _e$target.value;
            setChecked(function (prev) {
              return checked
                ? [].concat(
                    (0,
                    _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_9__.Z)(
                      prev
                    ),
                    [value]
                  )
                : prev.filter(function (v) {
                    return v !== value;
                  });
            });
          };
        return "textarea" === (null == fields ? void 0 : fields.type)
          ? __jsx("textarea", {
              "aria-label":
                null !==
                  (_fields$placeholder =
                    null == fields ? void 0 : fields.placeholder) &&
                void 0 !== _fields$placeholder
                  ? _fields$placeholder
                  : null == fields
                  ? void 0
                  : fields.name,
              className: "w-full p-4 text-xs bg-gray-100 rounded outline-none",
              placeholder: null == fields ? void 0 : fields.name,
              name: null == fields ? void 0 : fields.name,
              required: null == fields ? void 0 : fields.isRequired,
            })
          : "inputFile" === (null == fields ? void 0 : fields.type)
          ? __jsx(
              "label",
              { className: "flex px-2 bg-gray-100 rounded" },
              __jsx("input", {
                "aria-label":
                  null !==
                    (_fields$placeholder2 =
                      null == fields ? void 0 : fields.placeholder) &&
                  void 0 !== _fields$placeholder2
                    ? _fields$placeholder2
                    : "Choose file..",
                className:
                  "w-full p-4 text-xs bg-gray-100 rounded outline-none",
                type: "file",
                placeholder:
                  null !==
                    (_fields$placeholder3 =
                      null == fields ? void 0 : fields.placeholder) &&
                  void 0 !== _fields$placeholder3
                    ? _fields$placeholder3
                    : "Choose file..",
                name: null == fields ? void 0 : fields.name,
                required: null == fields ? void 0 : fields.isRequired,
              })
            )
          : "inputPassword" === (null == fields ? void 0 : fields.type)
          ? __jsx(
              "div",
              { className: "flex p-4 mb-4 bg-gray-100 rounded" },
              __jsx("input", {
                "aria-label":
                  null !==
                    (_fields$placeholder4 =
                      null == fields ? void 0 : fields.placeholder) &&
                  void 0 !== _fields$placeholder4
                    ? _fields$placeholder4
                    : null == fields
                    ? void 0
                    : fields.name,
                className: "w-full text-xs bg-gray-100 outline-none",
                type: showPassword ? "text" : "password",
                placeholder: null == fields ? void 0 : fields.placeholder,
                name: null == fields ? void 0 : fields.name,
                required: null == fields ? void 0 : fields.isRequired,
              }),
              __jsx(
                "button",
                {
                  "aria-label": showPassword
                    ? "Show password"
                    : "Hide password",
                  className: "focus:outline-none",
                  type: "button",
                  onClick: function onClick() {
                    return setShowPassword(!showPassword);
                  },
                },
                __jsx(
                  "svg",
                  {
                    className: "w-5 h-5 my-auto ml-4 text-gray-500",
                    xmlns: "http://www.w3.org/2000/svg",
                    "aria-hidden": "true",
                    role: "img",
                    width: "1em",
                    height: "1em",
                    preserveAspectRatio: "xMidYMid meet",
                    viewBox: "0 0 16 16",
                  },
                  showPassword
                    ? __jsx(
                        "g",
                        { fill: "currentColor" },
                        __jsx("path", {
                          d: "M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288c-.335.48-.83 1.12-1.465 1.755c-.165.165-.337.328-.517.486l.708.709z",
                        }),
                        __jsx("path", {
                          d: "M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299l.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z",
                        }),
                        __jsx("path", {
                          d: "M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884l-12-12l.708-.708l12 12l-.708.708z",
                        })
                      )
                    : __jsx(
                        "g",
                        { fill: "currentColor" },
                        __jsx("path", {
                          d: "M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z",
                        }),
                        __jsx("path", {
                          d: "M8 5.5a2.5 2.5 0 1 0 0 5a2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0a3.5 3.5 0 0 1-7 0z",
                        })
                      )
                )
              )
            )
          : "inputNumber" === (null == fields ? void 0 : fields.type)
          ? __jsx(
              "div",
              { className: "flex p-4 mb-4 bg-gray-100 rounded" },
              __jsx("input", {
                "aria-label":
                  null !==
                    (_fields$placeholder5 =
                      null == fields ? void 0 : fields.placeholder) &&
                  void 0 !== _fields$placeholder5
                    ? _fields$placeholder5
                    : null == fields
                    ? void 0
                    : fields.name,
                className: "w-full text-xs bg-gray-100 outline-none",
                type: "number",
                placeholder: null == fields ? void 0 : fields.placeholder,
                name: null == fields ? void 0 : fields.name,
                required: null == fields ? void 0 : fields.isRequired,
              })
            )
          : "inputSelect" === (null == fields ? void 0 : fields.type)
          ? __jsx(
              "div",
              { className: "flex mb-4" },
              __jsx(
                "label",
                {
                  className: "m-auto text-xs text-left text-gray-500",
                  htmlFor: null == fields ? void 0 : fields.name,
                },
                null == fields ? void 0 : fields.label
              ),
              __jsx(
                "select",
                {
                  className:
                    "w-full p-3 text-xs bg-gray-100 rounded outline-none",
                  name: "header-".concat(null == fields ? void 0 : fields.name),
                  defaultValue: "default-value",
                  required: null == fields ? void 0 : fields.isRequired,
                },
                __jsx("option", { value: "" }),
                null == fields ||
                  null === (_fields$items = fields.items) ||
                  void 0 === _fields$items
                  ? void 0
                  : _fields$items.map(function (item, index) {
                      return __jsx("option", { key: index, value: item }, item);
                    })
              )
            )
          : "inputRadio" === (null == fields ? void 0 : fields.type)
          ? __jsx(
              "div",
              { className: "mb-4 text-left" },
              __jsx(
                "label",
                {
                  className: "m-auto text-xs text-left text-gray-500",
                  htmlFor: null == fields ? void 0 : fields.name,
                },
                null == fields ? void 0 : fields.label
              ),
              __jsx(
                "div",
                null,
                null == fields ||
                  null === (_fields$items2 = fields.items) ||
                  void 0 === _fields$items2
                  ? void 0
                  : _fields$items2.map(function (item, index) {
                      return __jsx(
                        "label",
                        { className: "mr-4 text-xs text-gray-500", key: index },
                        __jsx("input", {
                          className: "mr-2",
                          name: null == fields ? void 0 : fields.name,
                          value: item,
                          type: "radio",
                          onChange: handleRadioChange,
                          checked: value === item,
                          required: null == fields ? void 0 : fields.isRequired,
                        }),
                        item
                      );
                    })
              )
            )
          : "inputCheckbox" === (null == fields ? void 0 : fields.type)
          ? __jsx(
              "div",
              { className: "mb-4 text-left" },
              __jsx(
                "label",
                {
                  className: "m-auto text-xs text-left text-gray-500",
                  htmlFor: null == fields ? void 0 : fields.name,
                },
                null == fields ? void 0 : fields.label
              ),
              __jsx(
                "div",
                null,
                null == fields ||
                  null === (_fields$items3 = fields.items) ||
                  void 0 === _fields$items3
                  ? void 0
                  : _fields$items3.map(function (item, index) {
                      return __jsx(
                        "label",
                        { className: "mr-4 text-xs text-gray-500", key: index },
                        __jsx("input", {
                          className: "mr-2",
                          name: null == fields ? void 0 : fields.name,
                          value: item,
                          type: "checkbox",
                          onChange: handleCheckboxChange,
                          checked: checked.some(function (v) {
                            return v === item;
                          }),
                          required: !(
                            null == fields ||
                            !fields.isRequired ||
                            0 !== checked.length
                          ),
                        }),
                        item
                      );
                    })
              )
            )
          : __jsx(
              "div",
              { className: "flex p-4 mb-4 bg-gray-100 rounded" },
              __jsx("input", {
                "aria-label":
                  null !==
                    (_fields$placeholder6 =
                      null == fields ? void 0 : fields.placeholder) &&
                  void 0 !== _fields$placeholder6
                    ? _fields$placeholder6
                    : null == fields
                    ? void 0
                    : fields.name,
                className: "w-full text-xs bg-gray-100 outline-none",
                type:
                  "inputEmail" === (null == fields ? void 0 : fields.type)
                    ? "email"
                    : "text",
                placeholder: null == fields ? void 0 : fields.placeholder,
                name: null == fields ? void 0 : fields.name,
                required: null == fields ? void 0 : fields.isRequired,
              }),
              "inputEmail" === (null == fields ? void 0 : fields.type) &&
                __jsx(
                  "svg",
                  {
                    className: "w-6 h-6 my-auto ml-4 text-gray-500",
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                  },
                  __jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207",
                  })
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
              title: {
                defaultValue: null,
                description: "",
                name: "title",
                required: !1,
                type: { name: "string" },
              },
              subtitle: {
                defaultValue: null,
                description: "",
                name: "subtitle",
                required: !1,
                type: { name: "string" },
              },
              text: {
                defaultValue: null,
                description: "",
                name: "text",
                required: !1,
                type: { name: "string" },
              },
              firstButton: {
                defaultValue: null,
                description: "",
                name: "firstButton",
                required: !1,
                type: { name: "LabeledRoute" },
              },
              secondButton: {
                defaultValue: null,
                description: "",
                name: "secondButton",
                required: !1,
                type: { name: "LabeledRoute" },
              },
              formLinks: {
                defaultValue: null,
                description: "",
                name: "formLinks",
                required: !1,
                type: { name: "LabeledRouteWithKey[]" },
              },
              signInLink: {
                defaultValue: null,
                description: "",
                name: "signInLink",
                required: !1,
                type: { name: "LabeledRoute" },
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
              "components/sections/sign_in_sign_up/variant_b.tsx#VariantB"
            ] = {
              docgenInfo: VariantB.__docgenInfo,
              name: "VariantB",
              path: "components/sections/sign_in_sign_up/variant_b.tsx#VariantB",
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
