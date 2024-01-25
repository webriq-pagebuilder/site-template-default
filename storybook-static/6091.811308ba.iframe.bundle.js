"use strict";
(self.webpackChunk_webriq_pagebuilder_site_template_default =
  self.webpackChunk_webriq_pagebuilder_site_template_default || []).push([
  [6091],
  {
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
    "./components/sections/call_to_action/variant_c.tsx": (
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
        helper__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__("./helper/index.tsx"),
        components_ui_Text__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          "./components/ui/Text/index.ts"
        ),
        components_ui_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          "./components/ui/Button/index.ts"
        ),
        components_ui_Form_Form__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__("./components/ui/Form/Form.tsx"),
        components_ui_Input__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          "./components/ui/Input/index.ts"
        ),
        __jsx = react__WEBPACK_IMPORTED_MODULE_0__.createElement;
      function VariantC(_ref) {
        var _form$fields,
          _form$fields$,
          _form$fields$0$placeh,
          _form$fields$2,
          _form$fields$3,
          _form$fields$4,
          _form$fields$5,
          _form$fields$6,
          _form$fields$7,
          _form$fields$8,
          _form$fields$9,
          _form$buttonLabel,
          title = _ref.title,
          text = _ref.text,
          features = _ref.features,
          form = _ref.form;
        return __jsx(
          "section",
          { className: "bg-gray-50 py-20" },
          __jsx(
            "div",
            { className: "container mx-auto px-4" },
            __jsx(
              "div",
              { className: "-mx-4 flex flex-wrap items-center" },
              __jsx(
                "div",
                { className: "mb-8 w-full px-4 lg:mb-0 lg:w-1/2" },
                __jsx(
                  components_ui_Text__WEBPACK_IMPORTED_MODULE_2__.x,
                  { type: "h1" },
                  title
                ),
                __jsx(
                  "p",
                  { className: "max-w-lg leading-loose text-gray-700" },
                  text
                )
              ),
              __jsx(
                "div",
                { className: "w-full px-4 lg:w-1/2" },
                (null == form ? void 0 : form.fields) &&
                  __jsx(
                    components_ui_Form_Form__WEBPACK_IMPORTED_MODULE_4__.l,
                    {
                      id: null == form ? void 0 : form.id,
                      name: "Calltoaction-VariantC-Form",
                      className:
                        "form-callToAction mb-4 sm:flex items-center lg:justify-end",
                      thankyouPage: (0, helper__WEBPACK_IMPORTED_MODULE_1__.W6)(
                        null == form ? void 0 : form.thankYouPage
                      ),
                    },
                    (null == form ||
                    null === (_form$fields = form.fields) ||
                    void 0 === _form$fields
                      ? void 0
                      : _form$fields[0]) &&
                      (null == form ||
                      null === (_form$fields$ = form.fields[0]) ||
                      void 0 === _form$fields$
                        ? void 0
                        : _form$fields$.type) &&
                      __jsx(
                        components_ui_Input__WEBPACK_IMPORTED_MODULE_5__.I,
                        {
                          noLabel: !0,
                          ariaLabel:
                            null !==
                              (_form$fields$0$placeh =
                                null == form ||
                                null === (_form$fields$2 = form.fields[0]) ||
                                void 0 === _form$fields$2
                                  ? void 0
                                  : _form$fields$2.placeholder) &&
                            void 0 !== _form$fields$0$placeh
                              ? _form$fields$0$placeh
                              : null == form ||
                                null === (_form$fields$3 = form.fields[0]) ||
                                void 0 === _form$fields$3
                              ? void 0
                              : _form$fields$3.name,
                          className: "mr-2",
                          type:
                            "inputEmail" ===
                            (null == form ||
                            null === (_form$fields$4 = form.fields[0]) ||
                            void 0 === _form$fields$4
                              ? void 0
                              : _form$fields$4.type)
                              ? "email"
                              : "inputPassword" ===
                                (null == form ||
                                null === (_form$fields$5 = form.fields[0]) ||
                                void 0 === _form$fields$5
                                  ? void 0
                                  : _form$fields$5.type)
                              ? "password"
                              : "inputNumber" ===
                                (null == form ||
                                null === (_form$fields$6 = form.fields[0]) ||
                                void 0 === _form$fields$6
                                  ? void 0
                                  : _form$fields$6.type)
                              ? "number"
                              : "text",
                          placeholder:
                            null == form ||
                            null === (_form$fields$7 = form.fields[0]) ||
                            void 0 === _form$fields$7
                              ? void 0
                              : _form$fields$7.placeholder,
                          name:
                            null == form ||
                            null === (_form$fields$8 = form.fields[0]) ||
                            void 0 === _form$fields$8
                              ? void 0
                              : _form$fields$8.name,
                          required:
                            null == form ||
                            null === (_form$fields$9 = form.fields[0]) ||
                            void 0 === _form$fields$9
                              ? void 0
                              : _form$fields$9.isRequired,
                        }
                      ),
                    __jsx(
                      "div",
                      null,
                      __jsx("div", { className: "webriq-recaptcha" })
                    ),
                    (null == form ? void 0 : form.buttonLabel) &&
                      __jsx(
                        components_ui_Button__WEBPACK_IMPORTED_MODULE_3__.z,
                        {
                          ariaLabel:
                            null !==
                              (_form$buttonLabel =
                                null == form ? void 0 : form.buttonLabel) &&
                            void 0 !== _form$buttonLabel
                              ? _form$buttonLabel
                              : "Call to action form submit button",
                          type: "submit",
                        },
                        null == form ? void 0 : form.buttonLabel
                      )
                  ),
                __jsx(
                  "div",
                  null,
                  __jsx(
                    "ul",
                    {
                      className:
                        "flex items-center text-gray-500 lg:justify-end",
                    },
                    features &&
                      (null == features
                        ? void 0
                        : features.map(function (feature, index) {
                            return __jsx(
                              "li",
                              {
                                className: "mr-4 flex items-center",
                                key: index,
                              },
                              __jsx(
                                "span",
                                null,
                                __jsx(
                                  "svg",
                                  {
                                    className:
                                      "mr-2 h-6 w-6 text-brand-primary-foreground",
                                    xmlns: "http://www.w3.org/2000/svg",
                                    viewBox: "0 0 20 20",
                                    fill: "currentColor",
                                  },
                                  __jsx("path", {
                                    fillRule: "evenodd",
                                    d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
                                    clipRule: "evenodd",
                                  })
                                )
                              ),
                              __jsx("span", null, feature)
                            );
                          }))
                  )
                )
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
              text: {
                defaultValue: null,
                description: "",
                name: "text",
                required: !1,
                type: { name: "string" },
              },
              button: {
                defaultValue: null,
                description: "",
                name: "button",
                required: !1,
                type: { name: "LabeledRoute" },
              },
              features: {
                defaultValue: null,
                description: "",
                name: "features",
                required: !1,
                type: { name: "string[]" },
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
              signInLink: {
                defaultValue: null,
                description: "",
                name: "signInLink",
                required: !1,
                type: { name: "LabeledRoute" },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES[
              "components/sections/call_to_action/variant_c.tsx#VariantC"
            ] = {
              docgenInfo: VariantC.__docgenInfo,
              name: "VariantC",
              path: "components/sections/call_to_action/variant_c.tsx#VariantC",
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
    "./components/ui/Input/Input.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, { I: () => Input });
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
        _excluded = [
          "type",
          "ariaLabel",
          "labelClass",
          "className",
          "label",
          "variant",
          "required",
          "name",
          "placeholder",
          "textSize",
          "onChange",
          "noLabel",
        ],
        __jsx = react__WEBPACK_IMPORTED_MODULE_0__.createElement,
        Input = function Input(_ref) {
          var _variants$variant,
            _ref$type = _ref.type,
            type = void 0 === _ref$type ? "text" : _ref$type,
            ariaLabel = _ref.ariaLabel,
            labelClass = _ref.labelClass,
            className = _ref.className,
            label = _ref.label,
            _ref$variant = _ref.variant,
            variant = void 0 === _ref$variant ? "primary" : _ref$variant,
            _ref$required = _ref.required,
            required = void 0 !== _ref$required && _ref$required,
            name = _ref.name,
            placeholder = _ref.placeholder,
            textSize = _ref.textSize,
            onChange = _ref.onChange,
            noLabel = _ref.noLabel,
            props = (0,
            _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_1__.Z)(
              _ref,
              _excluded
            ),
            commonStyle = "w-full rounded bg-white px-4 py-2 leading-loose",
            primary = "".concat(commonStyle),
            secondary = "".concat(
              commonStyle,
              " bg-gray-100 p-4 text-xs outline-none"
            ),
            outline = "".concat(
              commonStyle,
              "  text-xs py-3 border border-slate-300"
            ),
            text = { sm: "text-xs", nm: "text-base", lg: "text-lg" }[textSize],
            variantClass =
              null !==
                (_variants$variant = { primary, secondary, outline }[
                  variant
                ]) && void 0 !== _variants$variant
                ? _variants$variant
                : primary;
          return __jsx(
            react__WEBPACK_IMPORTED_MODULE_0__.Fragment,
            null,
            !noLabel &&
              __jsx(
                "label",
                { className: labelClass, htmlFor: name },
                label || name
              ),
            __jsx(
              "input",
              (0,
              _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_extends_js__WEBPACK_IMPORTED_MODULE_2__.Z)(
                {
                  name,
                  id: name,
                  placeholder,
                  required,
                  "aria-label": ariaLabel || name,
                  type,
                  className: (0, utils_cn__WEBPACK_IMPORTED_MODULE_3__.cn)(
                    variantClass,
                    text,
                    className
                  ),
                  onChange,
                },
                props
              )
            )
          );
        };
      try {
        (Input.displayName = "Input"),
          (Input.__docgenInfo = {
            description: "",
            displayName: "Input",
            props: {
              noLabel: {
                defaultValue: null,
                description: "Determines if the label should be displayed",
                name: "noLabel",
                required: !1,
                type: { name: "boolean" },
              },
              label: {
                defaultValue: null,
                description: "Display label text",
                name: "label",
                required: !1,
                type: { name: "string" },
              },
              ariaLabel: {
                defaultValue: null,
                description:
                  "A string value that labels an interactive element",
                name: "ariaLabel",
                required: !0,
                type: { name: "string" },
              },
              required: {
                defaultValue: { value: "false" },
                description: "Is the input field required?",
                name: "required",
                required: !1,
                type: { name: "boolean" },
              },
              name: {
                defaultValue: null,
                description: "Html name for the input field",
                name: "name",
                required: !0,
                type: { name: "string" },
              },
              labelClass: {
                defaultValue: null,
                description: "Classname for the label element",
                name: "labelClass",
                required: !1,
                type: { name: "string" },
              },
              className: {
                defaultValue: null,
                description: "Classname for the input element",
                name: "className",
                required: !1,
                type: { name: "string" },
              },
              placeholder: {
                defaultValue: null,
                description: "",
                name: "placeholder",
                required: !1,
                type: { name: "string" },
              },
              type: {
                defaultValue: { value: "text" },
                description: "",
                name: "type",
                required: !1,
                type: {
                  name: "enum",
                  value: [
                    { value: '"number"' },
                    { value: '"password"' },
                    { value: '"email"' },
                    { value: '"text"' },
                  ],
                },
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
                  ],
                },
              },
              onChange: {
                defaultValue: null,
                description: "Function that runs when an input value change",
                name: "onChange",
                required: !1,
                type: { name: "() => void" },
              },
              textSize: {
                defaultValue: null,
                description: "",
                name: "textSize",
                required: !1,
                type: {
                  name: "enum",
                  value: [
                    { value: '"sm"' },
                    { value: '"md"' },
                    { value: '"lg"' },
                  ],
                },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["components/ui/Input/Input.tsx#Input"] = {
              docgenInfo: Input.__docgenInfo,
              name: "Input",
              path: "components/ui/Input/Input.tsx#Input",
            });
      } catch (__react_docgen_typescript_loader_error) {}
    },
    "./components/ui/Input/index.ts": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, {
        I: () => _Input__WEBPACK_IMPORTED_MODULE_0__.I,
      });
      var _Input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        "./components/ui/Input/Input.tsx"
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
