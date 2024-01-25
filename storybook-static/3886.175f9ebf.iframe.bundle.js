"use strict";
(self.webpackChunk_webriq_pagebuilder_site_template_default =
  self.webpackChunk_webriq_pagebuilder_site_template_default || []).push([
  [3886],
  {
    "./components/sections/pricing/variant_b.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        });
      var _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_7__ =
          __webpack_require__(
            "./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js"
          ),
        _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_6__ =
          __webpack_require__(
            "./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/slicedToArray.js"
          ),
        _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            "./node_modules/@storybook/nextjs/node_modules/@babel/runtime/regenerator/index.js"
          ),
        _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_1___default =
          __webpack_require__.n(
            _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_1__
          ),
        react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          "./node_modules/next/dist/compiled/react/index.js"
        ),
        axios__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
          "./node_modules/axios/lib/axios.js"
        ),
        lib_checkout__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__("./lib/checkout.ts"),
        components_ui_Card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          "./components/ui/Card/index.ts"
        ),
        components_ui_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          "./components/ui/Button/index.ts"
        ),
        components_ui_Text__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          "./components/ui/Text/index.ts"
        ),
        console = __webpack_require__(
          "./node_modules/console-browserify/index.js"
        ),
        __jsx = react__WEBPACK_IMPORTED_MODULE_0__.createElement;
      function VariantB(_ref) {
        var caption = _ref.caption,
          title = _ref.title,
          description = _ref.description,
          plans = _ref.plans,
          hashKey = _ref.hashKey,
          apiVersion = _ref.apiVersion,
          stripeSKey = _ref.stripeSKey,
          stripePKey = _ref.stripePKey,
          NEXT_PUBLIC_APP_URL = _ref.NEXT_PUBLIC_APP_URL,
          _React$useState = react__WEBPACK_IMPORTED_MODULE_0__.useState(plans),
          _React$useState2 = (0,
          _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_6__.Z)(
            _React$useState,
            2
          ),
          usePlan = _React$useState2[0],
          setUsePlan = _React$useState2[1],
          _React$useState3 = react__WEBPACK_IMPORTED_MODULE_0__.useState(!1),
          _React$useState4 = (0,
          _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_6__.Z)(
            _React$useState3,
            2
          ),
          pKeyError = _React$useState4[0],
          comma = (_React$useState4[1], Intl.NumberFormat("en-us"));
        return (
          react__WEBPACK_IMPORTED_MODULE_0__.useEffect(
            function () {
              function _getPriceId() {
                return (
                  (_getPriceId = (0,
                  _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_7__.Z)(
                    _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_1___default().mark(
                      function _callee(plans) {
                        var i, _loop;
                        return _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_1___default().wrap(
                          function _callee$(_context2) {
                            for (;;)
                              switch ((_context2.prev = _context2.next)) {
                                case 0:
                                  (i = 0),
                                    (_loop =
                                      _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_1___default().mark(
                                        function _loop() {
                                          var productPayload,
                                            pricePayload,
                                            product,
                                            productResponse,
                                            _yield$axios$post,
                                            data,
                                            _data$data;
                                          return _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_1___default().wrap(
                                            function _loop$(_context) {
                                              for (;;)
                                                switch (
                                                  (_context.prev =
                                                    _context.next)
                                                ) {
                                                  case 0:
                                                    return (
                                                      (productPayload = {
                                                        credentials: {
                                                          hashKey,
                                                          stripeSKey,
                                                          apiVersion,
                                                        },
                                                        stripeParams: {
                                                          id: "webriq-studio-pricing-"
                                                            .concat(
                                                              plans[i]._key,
                                                              "-"
                                                            )
                                                            .concat(i + 1, "-")
                                                            .concat(
                                                              plans[
                                                                i
                                                              ].planType.replace(
                                                                / /g,
                                                                "-"
                                                              ),
                                                              "-oneTime-Payment-"
                                                            )
                                                            .concat(
                                                              plans[i].price
                                                            ),
                                                        },
                                                      }),
                                                      (pricePayload = {
                                                        credentials: {
                                                          hashKey,
                                                          stripeSKey,
                                                          apiVersion,
                                                        },
                                                        stripeParams: {},
                                                      }),
                                                      (_context.prev = 2),
                                                      (_context.next = 5),
                                                      axios__WEBPACK_IMPORTED_MODULE_8__.Z.post(
                                                        "".concat(
                                                          NEXT_PUBLIC_APP_URL,
                                                          "/api/payments/stripe?resource=products&action=retrieve"
                                                        ),
                                                        productPayload
                                                      )
                                                    );
                                                  case 5:
                                                    return (
                                                      (product = _context.sent),
                                                      (_context.next = 8),
                                                      product.data
                                                    );
                                                  case 8:
                                                    return (
                                                      (productResponse =
                                                        _context.sent),
                                                      (_context.next = 11),
                                                      axios__WEBPACK_IMPORTED_MODULE_8__.Z.post(
                                                        "".concat(
                                                          NEXT_PUBLIC_APP_URL,
                                                          "/api/payments/stripe?resource=prices&action=list"
                                                        ),
                                                        pricePayload
                                                      )
                                                    );
                                                  case 11:
                                                    (_yield$axios$post =
                                                      _context.sent),
                                                      (data =
                                                        _yield$axios$post.data) &&
                                                        (null == data ||
                                                          null ===
                                                            (_data$data =
                                                              data.data) ||
                                                          void 0 ===
                                                            _data$data ||
                                                          _data$data.forEach(
                                                            function (item) {
                                                              item.product ===
                                                                productResponse
                                                                  .data.id &&
                                                                (plans[
                                                                  i
                                                                ].variant_b_checkoutButton =
                                                                  item.id);
                                                            }
                                                          )),
                                                      setUsePlan(plans),
                                                      (_context.next = 20);
                                                    break;
                                                  case 17:
                                                    (_context.prev = 17),
                                                      (_context.t0 =
                                                        _context.catch(2)),
                                                      console.log(_context.t0);
                                                  case 20:
                                                    i++;
                                                  case 21:
                                                  case "end":
                                                    return _context.stop();
                                                }
                                            },
                                            _loop,
                                            null,
                                            [[2, 17]]
                                          );
                                        }
                                      ));
                                case 2:
                                  if (
                                    !(
                                      i <
                                      (null == plans ? void 0 : plans.length)
                                    )
                                  ) {
                                    _context2.next = 6;
                                    break;
                                  }
                                  return _context2.delegateYield(
                                    _loop(),
                                    "t0",
                                    4
                                  );
                                case 4:
                                  _context2.next = 2;
                                  break;
                                case 6:
                                case "end":
                                  return _context2.stop();
                              }
                          },
                          _callee
                        );
                      }
                    )
                  )),
                  _getPriceId.apply(this, arguments)
                );
              }
              !(function getPriceId(_x) {
                return _getPriceId.apply(this, arguments);
              })(usePlan);
            },
            [NEXT_PUBLIC_APP_URL, apiVersion, hashKey, stripeSKey, usePlan]
          ),
          __jsx(
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
                  { className: "flex flex-wrap items-center w-full mb-16" },
                  __jsx(
                    "div",
                    { className: "w-full lg:w-1/2" },
                    caption &&
                      __jsx(
                        "span",
                        {
                          className:
                            "lg:text=base text-sm font-bold text-brand-primary xl:text-base 2xl:text-base",
                        },
                        caption
                      ),
                    title &&
                      __jsx(
                        components_ui_Text__WEBPACK_IMPORTED_MODULE_5__.x,
                        {
                          type: "h1",
                          className:
                            "mb-2 text-2xl font-bold font-heading lg:text-5xl xl:text-5xl 2xl:text-5xl",
                        },
                        title
                      )
                  ),
                  __jsx(
                    "div",
                    { className: "w-full lg:w-1/2" },
                    description
                      ? __jsx(
                          "p",
                          {
                            className:
                              "max-w-xs text-sm leading-loose text-gray-500 lg:mx-auto lg:text-base xl:text-base 2xl:text-base",
                          },
                          description
                        )
                      : null
                  )
                ),
                pKeyError &&
                  __jsx(
                    "div",
                    null,
                    __jsx(
                      "p",
                      {
                        style: {
                          fontSize: 9,
                          color: "red",
                          textAlign: "center",
                          padding: 20,
                        },
                      },
                      "Stripe Checkout won't work because of an Invalid",
                      __jsx("strong", null, " Stripe Public Key"),
                      ", please fix it in your studio under webriq-payments to get rid of this error message."
                    )
                  ),
                usePlan &&
                  usePlan.map(function (plan) {
                    var _plan$planIncludes;
                    return __jsx(
                      components_ui_Card__WEBPACK_IMPORTED_MODULE_3__.Z,
                      {
                        className:
                          "flex flex-wrap items-center w-full p-8 mb-8",
                        key: plan._key,
                      },
                      __jsx(
                        "div",
                        { className: "self-start w-full px-3 lg:w-1/5" },
                        __jsx(
                          "h3",
                          {
                            className:
                              "mb-4 text-xl font-bold font-heading lg:text-2xl xl:text-2xl 2xl:text-2xl",
                          },
                          plan.planType
                        )
                      ),
                      __jsx(
                        "div",
                        { className: "w-full px-3 lg:w-2/5" },
                        __jsx(
                          "ul",
                          { className: "mb-4 text-gray-500" },
                          null === (_plan$planIncludes = plan.planIncludes) ||
                            void 0 === _plan$planIncludes
                            ? void 0
                            : _plan$planIncludes.map(function (include) {
                                return __jsx(
                                  "li",
                                  { className: "flex mb-4", key: include },
                                  __jsx(
                                    "svg",
                                    {
                                      className:
                                        "w-5 h-5 mr-2 text-brand-primary",
                                      xmlns: "http://www.w3.org/2000/svg",
                                      viewBox: "0 0 20 20",
                                      fill: "currentColor",
                                    },
                                    __jsx("path", {
                                      fillRule: "evenodd",
                                      d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
                                      clipRule: "evenodd",
                                    })
                                  ),
                                  __jsx(
                                    "span",
                                    {
                                      className:
                                        "text-sm lg:text-base xl:text-base 2xl:text-base",
                                    },
                                    include
                                  )
                                );
                              })
                        )
                      ),
                      __jsx(
                        "div",
                        { className: "w-full px-3 lg:w-1/5 lg:text-center" },
                        __jsx(
                          "span",
                          { className: "text-4xl font-bold" },
                          isNaN(parseInt(plan.price))
                            ? plan.price
                            : "$".concat(comma.format(+plan.price))
                        )
                      ),
                      __jsx(
                        "div",
                        { className: "w-full px-3 lg:w-1/5" },
                        plan.checkoutButtonName &&
                          __jsx(
                            components_ui_Button__WEBPACK_IMPORTED_MODULE_4__.z,
                            {
                              ariaLabel: plan.checkoutButtonName,
                              className: "mt-4 lg:mt-0  ".concat(
                                !plan ||
                                  (!(
                                    null != plan &&
                                    plan.variant_b_checkoutButton
                                  ) &&
                                    "cursor-not-allowed  disabled:opacity-50")
                              ),
                              disabled:
                                !plan ||
                                !(
                                  null != plan && plan.variant_b_checkoutButton
                                ),
                              onClick: function onClick() {
                                (0,
                                lib_checkout__WEBPACK_IMPORTED_MODULE_2__.q)(
                                  {
                                    lineItems: [
                                      {
                                        price: plan.variant_b_checkoutButton,
                                        quantity: 1,
                                      },
                                    ],
                                  },
                                  stripePKey,
                                  window.location.origin + "/success",
                                  window.location.href,
                                  !1
                                );
                              },
                            },
                            usePlan ? plan.checkoutButtonName : "Processing..."
                          )
                      )
                    );
                  })
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
              caption: {
                defaultValue: null,
                description: "",
                name: "caption",
                required: !0,
                type: { name: "string" },
              },
              title: {
                defaultValue: null,
                description: "",
                name: "title",
                required: !0,
                type: { name: "string" },
              },
              description: {
                defaultValue: null,
                description: "",
                name: "description",
                required: !0,
                type: { name: "string" },
              },
              plans: {
                defaultValue: null,
                description: "",
                name: "plans",
                required: !0,
                type: { name: "Plans[]" },
              },
              annualBilling: {
                defaultValue: null,
                description: "",
                name: "annualBilling",
                required: !0,
                type: { name: "string" },
              },
              monthlyBilling: {
                defaultValue: null,
                description: "",
                name: "monthlyBilling",
                required: !0,
                type: { name: "string" },
              },
              banner: {
                defaultValue: null,
                description: "",
                name: "banner",
                required: !0,
                type: { name: "any" },
              },
              formFields: {
                defaultValue: null,
                description: "",
                name: "formFields",
                required: !0,
                type: { name: "FormFields[]" },
              },
              formId: {
                defaultValue: null,
                description: "",
                name: "formId",
                required: !0,
                type: { name: "string" },
              },
              formName: {
                defaultValue: null,
                description: "",
                name: "formName",
                required: !0,
                type: { name: "string" },
              },
              formThankYouPage: {
                defaultValue: null,
                description: "",
                name: "formThankYouPage",
                required: !0,
                type: { name: "ThankYouPage" },
              },
              stripePKey: {
                defaultValue: null,
                description: "",
                name: "stripePKey",
                required: !0,
                type: { name: "string" },
              },
              stripeSKey: {
                defaultValue: null,
                description: "",
                name: "stripeSKey",
                required: !0,
                type: { name: "string" },
              },
              hashKey: {
                defaultValue: null,
                description: "",
                name: "hashKey",
                required: !0,
                type: { name: "string" },
              },
              apiVersion: {
                defaultValue: null,
                description: "",
                name: "apiVersion",
                required: !0,
                type: { name: "string" },
              },
              NEXT_PUBLIC_APP_URL: {
                defaultValue: null,
                description: "",
                name: "NEXT_PUBLIC_APP_URL",
                required: !0,
                type: { name: "string" },
              },
              block: {
                defaultValue: null,
                description: "",
                name: "block",
                required: !0,
                type: { name: "any" },
              },
              signInLink: {
                defaultValue: null,
                description: "",
                name: "signInLink",
                required: !0,
                type: { name: "LabeledRoute" },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES[
              "components/sections/pricing/variant_b.tsx#VariantB"
            ] = {
              docgenInfo: VariantB.__docgenInfo,
              name: "VariantB",
              path: "components/sections/pricing/variant_b.tsx#VariantB",
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
    "./lib/checkout.ts": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, { q: () => initiateCheckout });
      var _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            "./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js"
          ),
        _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            "./node_modules/@storybook/nextjs/node_modules/@babel/runtime/regenerator/index.js"
          ),
        _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_0___default =
          __webpack_require__.n(
            _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_0__
          ),
        _stripe_stripe_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          "./node_modules/@stripe/stripe-js/dist/stripe.esm.js"
        );
      function initiateCheckout() {
        return _initiateCheckout.apply(this, arguments);
      }
      function _initiateCheckout() {
        return (
          (_initiateCheckout = (0,
          _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__.Z)(
            _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_0___default().mark(
              function _callee() {
                var _ref$lineItems,
                  lineItems,
                  stripePKey,
                  successUrl,
                  cancelUrl,
                  isSubscription,
                  stripe,
                  _args = arguments;
                return _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_0___default().wrap(
                  function _callee$(_context) {
                    for (;;)
                      switch ((_context.prev = _context.next)) {
                        case 0:
                          return (
                            (_ref$lineItems = (
                              _args.length > 0 && void 0 !== _args[0]
                                ? _args[0]
                                : {}
                            ).lineItems),
                            (lineItems =
                              void 0 === _ref$lineItems ? [] : _ref$lineItems),
                            (stripePKey = _args.length > 1 ? _args[1] : void 0),
                            (successUrl = _args.length > 2 ? _args[2] : void 0),
                            (cancelUrl = _args.length > 3 ? _args[3] : void 0),
                            (isSubscription =
                              _args.length > 4 ? _args[4] : void 0),
                            (stripe = (0,
                            _stripe_stripe_js__WEBPACK_IMPORTED_MODULE_1__.J)(
                              stripePKey
                            )),
                            (_context.next = 8),
                            stripe
                          );
                        case 8:
                          return (
                            (_context.next = 10),
                            _context.sent.redirectToCheckout({
                              lineItems,
                              mode: isSubscription ? "subscription" : "payment",
                              successUrl,
                              cancelUrl,
                            })
                          );
                        case 10:
                        case "end":
                          return _context.stop();
                      }
                  },
                  _callee
                );
              }
            )
          )),
          _initiateCheckout.apply(this, arguments)
        );
      }
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
