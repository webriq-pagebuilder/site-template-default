(self.webpackChunk_webriq_pagebuilder_site_template_default =
  self.webpackChunk_webriq_pagebuilder_site_template_default || []).push([
  [2944],
  {
    "./components/sections/pricing/variant_d.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      "use strict";
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        });
      var _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_14__ =
          __webpack_require__(
            "./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js"
          ),
        _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            "./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/defineProperty.js"
          ),
        _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_12__ =
          __webpack_require__(
            "./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js"
          ),
        _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_11__ =
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
        components_webriq_form__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__("./components/webriq-form.js"),
        next_image__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          "./node_modules/@storybook/nextjs/dist/images/next-image.mjs"
        ),
        lib_sanity__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__("./lib/sanity.ts"),
        _stripe_react_stripe_js__WEBPACK_IMPORTED_MODULE_6__ =
          __webpack_require__(
            "./node_modules/@stripe/react-stripe-js/dist/react-stripe.umd.js"
          ),
        _stripe_stripe_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
          "./node_modules/@stripe/stripe-js/dist/stripe.esm.js"
        ),
        axios__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
          "./node_modules/axios/lib/axios.js"
        ),
        next_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
          "./node_modules/next/router.js"
        ),
        next_router__WEBPACK_IMPORTED_MODULE_8___default =
          __webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_8__),
        helper__WEBPACK_IMPORTED_MODULE_9__ =
          __webpack_require__("./helper/index.tsx"),
        components_ui_ConditionalLink__WEBPACK_IMPORTED_MODULE_10__ =
          __webpack_require__("./components/ui/ConditionalLink/index.ts"),
        console = __webpack_require__(
          "./node_modules/console-browserify/index.js"
        ),
        __jsx = react__WEBPACK_IMPORTED_MODULE_0__.createElement;
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
                _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_2__.Z)(
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
      function VariantD(_ref) {
        var _banner$banners,
          _banner$banners2,
          _banner$banners3,
          caption = _ref.caption,
          title = _ref.title,
          description = _ref.description,
          annualBilling = _ref.annualBilling,
          monthlyBilling = _ref.monthlyBilling,
          banner = _ref.banner,
          formFields = _ref.formFields,
          formId = _ref.formId,
          formName = _ref.formName,
          formThankYouPage = _ref.formThankYouPage,
          block = _ref.block,
          signInLink = _ref.signInLink,
          hashKey = _ref.hashKey,
          apiVersion = _ref.apiVersion,
          stripeSKey = _ref.stripeSKey,
          stripePKey = _ref.stripePKey,
          NEXT_PUBLIC_APP_URL = _ref.NEXT_PUBLIC_APP_URL,
          _React$useState = react__WEBPACK_IMPORTED_MODULE_0__.useState({
            monthlyCheckout: "",
            yearlyCheckout: "",
          }),
          _React$useState2 = (0,
          _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_11__.Z)(
            _React$useState,
            2
          ),
          useCheckout = _React$useState2[0],
          setUseCheckout = _React$useState2[1],
          _React$useState3 = react__WEBPACK_IMPORTED_MODULE_0__.useState(0),
          _React$useState4 = (0,
          _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_11__.Z)(
            _React$useState3,
            2
          ),
          banners = _React$useState4[0],
          setBanners = _React$useState4[1],
          _React$useState5 = react__WEBPACK_IMPORTED_MODULE_0__.useState({
            amount: 0,
            billType: "",
          }),
          _React$useState6 = (0,
          _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_11__.Z)(
            _React$useState5,
            2
          ),
          billing = _React$useState6[0],
          setBilling = _React$useState6[1],
          _React$useState7 = react__WEBPACK_IMPORTED_MODULE_0__.useState(!1),
          _React$useState8 = (0,
          _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_11__.Z)(
            _React$useState7,
            2
          ),
          paymentOngoing = _React$useState8[0],
          setPaymentOngoing = _React$useState8[1],
          stripePromise = (0, _stripe_stripe_js__WEBPACK_IMPORTED_MODULE_7__.J)(
            stripePKey
          ),
          handleChange = function handleChange(e) {
            e.target.value === monthlyBilling
              ? setBilling({ amount: e.target.value, billType: "Monthly" })
              : setBilling({ amount: e.target.value, billType: "Annual" });
          };
        react__WEBPACK_IMPORTED_MODULE_0__.useEffect(
          function () {
            function _getPriceId() {
              return (_getPriceId = (0,
              _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_12__.Z)(
                _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_1___default().mark(
                  function _callee() {
                    var productPayload,
                      pricePayload,
                      product,
                      _yield$product$data,
                      data,
                      prices;
                    return _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_1___default().wrap(
                      function _callee$(_context) {
                        for (;;)
                          switch ((_context.prev = _context.next)) {
                            case 0:
                              return (
                                (productPayload = {
                                  credentials: {
                                    hashKey,
                                    stripeSKey,
                                    apiVersion,
                                  },
                                  stripeParams: {
                                    id: "webriq-studio-pricing-formPayment-"
                                      .concat(
                                        formId,
                                        "-recurring-monthlyPrice-"
                                      )
                                      .concat(monthlyBilling, "-yearlyPrice-")
                                      .concat(annualBilling),
                                  },
                                }),
                                (pricePayload = {
                                  credentials: {
                                    hashKey,
                                    stripeSKey,
                                    apiVersion,
                                  },
                                }),
                                (_context.prev = 2),
                                (_context.next = 5),
                                axios__WEBPACK_IMPORTED_MODULE_13__.Z.post(
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
                                (_yield$product$data = _context.sent),
                                (data = _yield$product$data.data),
                                (_context.next = 12),
                                axios__WEBPACK_IMPORTED_MODULE_13__.Z.post(
                                  "".concat(
                                    NEXT_PUBLIC_APP_URL,
                                    "/api/payments/stripe?resource=prices&action=list"
                                  ),
                                  pricePayload
                                )
                              );
                            case 12:
                              return (
                                (prices = _context.sent),
                                (_context.next = 15),
                                prices.data
                              );
                            case 15:
                              _context.sent.data.map(function (price) {
                                price.product === data.id &&
                                "month" === price.recurring.interval
                                  ? (useCheckout.monthlyCheckout = price.id)
                                  : price.product === data.id &&
                                    "year" === price.recurring.interval &&
                                    ((useCheckout.yearlyCheckout = price.id),
                                    setUseCheckout(function (prevState) {
                                      return _objectSpread({}, prevState);
                                    }));
                              }),
                                (_context.next = 22);
                              break;
                            case 19:
                              (_context.prev = 19),
                                (_context.t0 = _context.catch(2)),
                                console.log(_context.t0);
                            case 22:
                            case "end":
                              return _context.stop();
                          }
                      },
                      _callee,
                      null,
                      [[2, 19]]
                    );
                  }
                )
              )).apply(this, arguments);
            }
            !(function getPriceId() {
              return _getPriceId.apply(this, arguments);
            })();
          },
          [
            NEXT_PUBLIC_APP_URL,
            annualBilling,
            apiVersion,
            formId,
            hashKey,
            monthlyBilling,
            stripeSKey,
            useCheckout,
          ]
        );
        var blockCustomization = {
          block: {
            normal: function normal(_ref2) {
              var children = _ref2.children;
              return __jsx("p", { className: "text-xs" }, children);
            },
          },
          marks: {
            link: function link(_ref3) {
              var _value$href,
                children = _ref3.children,
                value = _ref3.value;
              return __jsx(
                "a",
                {
                  "aria-label":
                    null !== (_value$href = value.href) &&
                    void 0 !== _value$href
                      ? _value$href
                      : "external link",
                  className:
                    "font-bold text-brand-primary hover:text-brand-primary",
                  href: value.href,
                },
                children
              );
            },
          },
        };
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
                { className: "max-w-2xl mx-auto mb-16 text-center" },
                __jsx(
                  "div",
                  { className: "max-w-lg mx-auto" },
                  __jsx(
                    "span",
                    { className: "font-bold text-brand-primary" },
                    caption
                  ),
                  __jsx(
                    "h1",
                    {
                      className:
                        "mb-2 text-4xl font-bold font-heading lg:text-5xl",
                    },
                    title
                  ),
                  __jsx("p", { className: "mb-8 text-gray-500" }, description)
                ),
                __jsx(
                  "div",
                  { className: "flex flex-wrap justify-center" },
                  monthlyBilling &&
                    __jsx(
                      "label",
                      {
                        className:
                          "flex items-center w-full mb-2 mr-8 sm:w-auto md:mr-4",
                      },
                      __jsx("input", {
                        "aria-label": "Select ".concat(monthlyBilling),
                        type: "radio",
                        name: "billing",
                        defaultValue: monthlyBilling,
                        onChange: function onChange(e) {
                          return handleChange(e);
                        },
                      }),
                      __jsx(
                        "span",
                        { className: "mx-2 font-semibold" },
                        "Monthly Billing"
                      ),
                      __jsx(
                        "span",
                        {
                          className:
                            "inline-flex items-center justify-center w-16 h-10 font-semibold text-white rounded-lg bg-brand-primary",
                        },
                        "$",
                        monthlyBilling
                      )
                    ),
                  annualBilling &&
                    __jsx(
                      "label",
                      { className: "flex items-center w-full mb-2 sm:w-auto" },
                      __jsx("input", {
                        "aria-label": "Select ".concat(annualBilling),
                        type: "radio",
                        name: "billing",
                        defaultValue: annualBilling,
                        onChange: function onChange(e) {
                          return handleChange(e);
                        },
                      }),
                      __jsx(
                        "span",
                        { className: "mx-2 font-semibold" },
                        "Annual Billing"
                      ),
                      __jsx(
                        "span",
                        {
                          className:
                            "inline-flex items-center justify-center w-16 h-10 font-semibold text-white rounded-lg bg-brand-primary",
                        },
                        "$",
                        annualBilling
                      )
                    )
                )
              ),
              __jsx(
                "div",
                { className: "flex flex-wrap bg-white rounded shadow" },
                __jsx(
                  _stripe_react_stripe_js__WEBPACK_IMPORTED_MODULE_6__.Elements,
                  { stripe: stripePromise },
                  __jsx(function Form() {
                    var elements = (0,
                      _stripe_react_stripe_js__WEBPACK_IMPORTED_MODULE_6__.useElements)(),
                      stripe = (0,
                      _stripe_react_stripe_js__WEBPACK_IMPORTED_MODULE_6__.useStripe)(),
                      _React$useState9 =
                        react__WEBPACK_IMPORTED_MODULE_0__.useState(!1),
                      _React$useState10 = (0,
                      _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_11__.Z)(
                        _React$useState9,
                        2
                      ),
                      showPassword = _React$useState10[0],
                      setShowPassword = _React$useState10[1],
                      _React$useState11 =
                        react__WEBPACK_IMPORTED_MODULE_0__.useState(null),
                      _React$useState12 = (0,
                      _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_11__.Z)(
                        _React$useState11,
                        2
                      ),
                      value = _React$useState12[0],
                      setValue = _React$useState12[1],
                      _React$useState13 =
                        react__WEBPACK_IMPORTED_MODULE_0__.useState([]),
                      _React$useState14 = (0,
                      _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_11__.Z)(
                        _React$useState13,
                        2
                      ),
                      checked = _React$useState14[0],
                      setChecked = _React$useState14[1],
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
                                _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_14__.Z)(
                                  prev
                                ),
                                [value]
                              )
                            : prev.filter(function (v) {
                                return v !== value;
                              });
                        });
                      },
                      handleSubmit = (function () {
                        var _ref4 = (0,
                        _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_12__.Z)(
                          _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_1___default().mark(
                            function _callee2(event) {
                              var data,
                                _yield$axios$post,
                                monthlyBilling_ClientSecret,
                                _yield$axios$post2,
                                yearlyBilling_ClientSecret,
                                _yield$stripe$createP,
                                paymentMethod,
                                _yield$stripe$confirm,
                                response;
                              return _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_1___default().wrap(
                                function _callee2$(_context2) {
                                  for (;;)
                                    switch ((_context2.prev = _context2.next)) {
                                      case 0:
                                        if (
                                          (event.preventDefault(),
                                          (data = {}),
                                          null == formFields ||
                                            formFields.forEach(
                                              function (field) {
                                                var formData = new FormData(
                                                  document.querySelector(
                                                    "form[name='".concat(
                                                      formName,
                                                      "']"
                                                    )
                                                  )
                                                ).get(field.name);
                                                "Card number" === field.name
                                                  ? (data.creditCard =
                                                      "************************")
                                                  : (data[field.name] =
                                                      formData);
                                              }
                                            ),
                                          null != elements)
                                        ) {
                                          _context2.next = 5;
                                          break;
                                        }
                                        return _context2.abrupt("return");
                                      case 5:
                                        return (
                                          (_context2.next = 7),
                                          axios__WEBPACK_IMPORTED_MODULE_13__.Z.post(
                                            "/api/paymentIntent",
                                            {
                                              amount: 100 * +monthlyBilling,
                                              stripeSKey,
                                              hashKey,
                                            }
                                          )
                                        );
                                      case 7:
                                        return (
                                          (_yield$axios$post = _context2.sent),
                                          (monthlyBilling_ClientSecret =
                                            _yield$axios$post.data),
                                          (_context2.next = 11),
                                          axios__WEBPACK_IMPORTED_MODULE_13__.Z.post(
                                            "/api/paymentIntent",
                                            {
                                              amount: 100 * +annualBilling,
                                              stripeSKey,
                                              hashKey,
                                            }
                                          )
                                        );
                                      case 11:
                                        return (
                                          (_yield$axios$post2 = _context2.sent),
                                          (yearlyBilling_ClientSecret =
                                            _yield$axios$post2.data),
                                          (_context2.next = 15),
                                          stripe.createPaymentMethod({
                                            type: "card",
                                            card: elements.getElement(
                                              _stripe_react_stripe_js__WEBPACK_IMPORTED_MODULE_6__.CardElement
                                            ),
                                          })
                                        );
                                      case 15:
                                        if (
                                          ((_yield$stripe$createP =
                                            _context2.sent),
                                          !(paymentMethod =
                                            _yield$stripe$createP.paymentMethod))
                                        ) {
                                          _context2.next = 32;
                                          break;
                                        }
                                        return (
                                          (_context2.next = 20),
                                          stripe.confirmCardPayment(
                                            "Monthly" === billing.billType
                                              ? monthlyBilling_ClientSecret
                                              : yearlyBilling_ClientSecret,
                                            { payment_method: paymentMethod.id }
                                          )
                                        );
                                      case 20:
                                        if (
                                          ((_yield$stripe$confirm =
                                            _context2.sent),
                                          _yield$stripe$confirm.error,
                                          !_yield$stripe$confirm.paymentIntent)
                                        ) {
                                          _context2.next = 32;
                                          break;
                                        }
                                        return (
                                          (_context2.next = 26),
                                          fetch("/api/submitForm", {
                                            method: "POST",
                                            body: JSON.stringify({
                                              data,
                                              id: formId,
                                            }),
                                          })
                                        );
                                      case 26:
                                        return (
                                          (response = _context2.sent),
                                          (_context2.next = 29),
                                          response.json()
                                        );
                                      case 29:
                                        _context2.sent,
                                          setPaymentOngoing(!0),
                                          "OK" === response.statusText &&
                                            next_router__WEBPACK_IMPORTED_MODULE_8___default().push(
                                              "/success"
                                            );
                                      case 32:
                                      case "end":
                                        return _context2.stop();
                                    }
                                },
                                _callee2
                              );
                            }
                          )
                        );
                        return function handleSubmit(_x) {
                          return _ref4.apply(this, arguments);
                        };
                      })();
                    return __jsx(
                      "div",
                      { className: "w-full mb-8 md:mb-0 md:w-1/2" },
                      __jsx(
                        "div",
                        { className: "px-6 py-8 text-center lg:px-8" },
                        __jsx(
                          "p",
                          { className: "mb-8 text-2xl font-heading" },
                          formName
                        ),
                        formFields &&
                          __jsx(
                            components_webriq_form__WEBPACK_IMPORTED_MODULE_3__.Z,
                            {
                              stripepkey: stripePKey,
                              method: "POST",
                              "data-form-id": formId,
                              name: formName,
                              className: "form-pricing",
                              "data-thankyou-url": (0,
                              helper__WEBPACK_IMPORTED_MODULE_9__.W6)(
                                formThankYouPage
                              ),
                              scriptsrc:
                                "https://pagebuilderforms.webriq.com/js/initReactForms",
                            },
                            null == formFields
                              ? void 0
                              : formFields.map(function (field, index) {
                                  var _field$placeholder,
                                    _field$placeholder2,
                                    _field$placeholder3,
                                    _field$items,
                                    _field$items2,
                                    _field$items3;
                                  return __jsx(
                                    "div",
                                    { key: index },
                                    "textarea" === field.pricingType
                                      ? __jsx(
                                          "div",
                                          { className: "mb-4" },
                                          __jsx("textarea", {
                                            "aria-label":
                                              null !==
                                                (_field$placeholder =
                                                  null == field
                                                    ? void 0
                                                    : field.placeholder) &&
                                              void 0 !== _field$placeholder
                                                ? _field$placeholder
                                                : null == field
                                                ? void 0
                                                : field.name,
                                            className:
                                              "w-full h-24 p-4 text-xs font-semibold leading-none rounded outline-none resize-none bg-gray-50",
                                            placeholder:
                                              null == field
                                                ? void 0
                                                : field.placeholder,
                                            name:
                                              null == field
                                                ? void 0
                                                : field.name,
                                            required:
                                              null == field
                                                ? void 0
                                                : field.isRequired,
                                          })
                                        )
                                      : "inputFile" === field.pricingType
                                      ? __jsx(
                                          "div",
                                          { className: "mb-4" },
                                          __jsx(
                                            "label",
                                            {
                                              className:
                                                "flex px-2 bg-white rounded",
                                            },
                                            __jsx("input", {
                                              "aria-label": "Choose file..",
                                              className: "hidden",
                                              type: "file",
                                              placeholder: "Choose file..",
                                              name:
                                                null == field
                                                  ? void 0
                                                  : field.name,
                                              required:
                                                null == field
                                                  ? void 0
                                                  : field.isRequired,
                                            }),
                                            __jsx(
                                              "div",
                                              {
                                                className:
                                                  "px-4 py-3 my-1 ml-auto text-xs font-semibold leading-none text-white transition duration-200 bg-gray-500 rounded cursor-pointer hover:bg-gray-600",
                                              },
                                              "Browse"
                                            )
                                          )
                                        )
                                      : "inputCard" === field.pricingType
                                      ? __jsx(
                                          "div",
                                          { className: "mb-4" },
                                          __jsx(
                                            _stripe_react_stripe_js__WEBPACK_IMPORTED_MODULE_6__.CardElement,
                                            {
                                              className:
                                                "w-full p-4 text-xs font-semibold leading-none rounded outline-none bg-gray-50",
                                            }
                                          ),
                                          paymentOngoing &&
                                            __jsx(
                                              "div",
                                              {
                                                style: {
                                                  textAlign: "left",
                                                  marginTop: 12,
                                                  fontSize: 12,
                                                  color: "green",
                                                },
                                              },
                                              "Payment Success!"
                                            )
                                        )
                                      : "inputNumber" === field.pricingType
                                      ? __jsx(
                                          "div",
                                          { className: "mb-4" },
                                          __jsx("input", {
                                            "aria-label":
                                              null !==
                                                (_field$placeholder2 =
                                                  null == field
                                                    ? void 0
                                                    : field.placeholder) &&
                                              void 0 !== _field$placeholder2
                                                ? _field$placeholder2
                                                : null == field
                                                ? void 0
                                                : field.name,
                                            className:
                                              "w-full p-4 text-xs font-semibold leading-none rounded outline-none bg-gray-50",
                                            type: "number",
                                            placeholder:
                                              null == field
                                                ? void 0
                                                : field.placeholder,
                                            name:
                                              null == field
                                                ? void 0
                                                : field.name,
                                            required:
                                              null == field
                                                ? void 0
                                                : field.isRequired,
                                          })
                                        )
                                      : "inputPassword" === field.pricingType
                                      ? __jsx(
                                          "div",
                                          {
                                            className:
                                              "flex mb-4 rounded bg-gray-50",
                                          },
                                          __jsx("input", {
                                            "aria-label":
                                              null !==
                                                (_field$placeholder3 =
                                                  null == field
                                                    ? void 0
                                                    : field.placeholder) &&
                                              void 0 !== _field$placeholder3
                                                ? _field$placeholder3
                                                : null == field
                                                ? void 0
                                                : field.name,
                                            className:
                                              "w-full p-4 text-xs font-semibold leading-none rounded outline-none bg-gray-50",
                                            type: showPassword
                                              ? "text"
                                              : "password",
                                            placeholder:
                                              null == field
                                                ? void 0
                                                : field.placeholder,
                                            name:
                                              null == field
                                                ? void 0
                                                : field.name,
                                            required:
                                              null == field
                                                ? void 0
                                                : field.isRequired,
                                          }),
                                          __jsx(
                                            "button",
                                            {
                                              "aria-label": showPassword
                                                ? "Show password"
                                                : "Hide password",
                                              className:
                                                "pr-4 focus:outline-none",
                                              onClick: function onClick() {
                                                return setShowPassword(
                                                  !showPassword
                                                );
                                              },
                                            },
                                            __jsx(
                                              "svg",
                                              {
                                                className:
                                                  "w-5 h-5 my-auto ml-4 text-gray-500",
                                                xmlns:
                                                  "http://www.w3.org/2000/svg",
                                                "aria-hidden": "true",
                                                role: "img",
                                                width: "1em",
                                                height: "1em",
                                                preserveAspectRatio:
                                                  "xMidYMid meet",
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
                                      : "inputSelect" === field.pricingType
                                      ? __jsx(
                                          "div",
                                          { className: "flex mb-4" },
                                          __jsx(
                                            "label",
                                            {
                                              className:
                                                "m-auto text-xs text-left text-gray-500",
                                              htmlFor:
                                                null == field
                                                  ? void 0
                                                  : field.name,
                                            },
                                            null == field ? void 0 : field.label
                                          ),
                                          __jsx(
                                            "select",
                                            {
                                              className:
                                                "w-full p-3 text-xs rounded outline-none bg-gray-50",
                                              name: "pricing-".concat(
                                                null == field
                                                  ? void 0
                                                  : field.name
                                              ),
                                              defaultValue: "default-value",
                                              required:
                                                null == field
                                                  ? void 0
                                                  : field.isRequired,
                                            },
                                            __jsx("option", { value: "" }),
                                            null == field ||
                                              null ===
                                                (_field$items = field.items) ||
                                              void 0 === _field$items
                                              ? void 0
                                              : _field$items.map(
                                                  function (item, index) {
                                                    return __jsx(
                                                      "option",
                                                      {
                                                        key: index,
                                                        value: item,
                                                      },
                                                      item
                                                    );
                                                  }
                                                )
                                          )
                                        )
                                      : "inputRadio" ===
                                        (null == field ? void 0 : field.type)
                                      ? __jsx(
                                          "div",
                                          { className: "mb-4 text-left" },
                                          __jsx(
                                            "label",
                                            {
                                              className:
                                                "m-auto text-xs text-left text-gray-500",
                                              htmlFor:
                                                null == field
                                                  ? void 0
                                                  : field.name,
                                            },
                                            null == field ? void 0 : field.label
                                          ),
                                          __jsx(
                                            "div",
                                            null,
                                            null == field ||
                                              null ===
                                                (_field$items2 = field.items) ||
                                              void 0 === _field$items2
                                              ? void 0
                                              : _field$items2.map(
                                                  function (item, index) {
                                                    return __jsx(
                                                      "label",
                                                      {
                                                        className:
                                                          "mr-4 text-xs text-gray-500",
                                                        key: index,
                                                      },
                                                      __jsx("input", {
                                                        className: "mr-2",
                                                        name:
                                                          null == field
                                                            ? void 0
                                                            : field.name,
                                                        value: item,
                                                        type: "radio",
                                                        onChange:
                                                          handleRadioChange,
                                                        checked: value === item,
                                                        required:
                                                          null == field
                                                            ? void 0
                                                            : field.isRequired,
                                                      }),
                                                      item
                                                    );
                                                  }
                                                )
                                          )
                                        )
                                      : "inputCheckbox" ===
                                        (null == field ? void 0 : field.type)
                                      ? __jsx(
                                          "div",
                                          { className: "mb-4 text-left" },
                                          __jsx(
                                            "label",
                                            {
                                              className:
                                                "m-auto text-xs text-left text-gray-500",
                                              htmlFor:
                                                null == field
                                                  ? void 0
                                                  : field.name,
                                            },
                                            null == field ? void 0 : field.label
                                          ),
                                          __jsx(
                                            "div",
                                            null,
                                            null == field ||
                                              null ===
                                                (_field$items3 = field.items) ||
                                              void 0 === _field$items3
                                              ? void 0
                                              : _field$items3.map(
                                                  function (item, index) {
                                                    return __jsx(
                                                      "label",
                                                      {
                                                        className:
                                                          "mr-4 text-xs text-gray-500",
                                                        key: index,
                                                      },
                                                      __jsx("input", {
                                                        className: "mr-2",
                                                        name:
                                                          null == field
                                                            ? void 0
                                                            : field.name,
                                                        value: item,
                                                        type: "checkbox",
                                                        onChange:
                                                          handleCheckboxChange,
                                                        checked: checked.some(
                                                          function (v) {
                                                            return v === item;
                                                          }
                                                        ),
                                                        required: !(
                                                          null == field ||
                                                          !field.isRequired ||
                                                          0 !== checked.length
                                                        ),
                                                      }),
                                                      item
                                                    );
                                                  }
                                                )
                                          )
                                        )
                                      : __jsx(
                                          "div",
                                          {
                                            className:
                                              "flex mb-4 rounded bg-gray-50",
                                          },
                                          __jsx("input", {
                                            "aria-label": "".concat(
                                              "inputText" ===
                                                (null == field
                                                  ? void 0
                                                  : field.type)
                                                ? "Input ".concat(
                                                    null == field
                                                      ? void 0
                                                      : field.name
                                                  )
                                                : "".concat(
                                                    null == field
                                                      ? void 0
                                                      : field.type
                                                  )
                                            ),
                                            className:
                                              "w-full p-4 text-xs font-semibold leading-none rounded outline-none bg-gray-50",
                                            type:
                                              "inputEmail" === field.pricingType
                                                ? "email"
                                                : "inputPassword" ===
                                                  field.pricingType
                                                ? "password"
                                                : "text",
                                            placeholder:
                                              null == field
                                                ? void 0
                                                : field.placeholder,
                                            name:
                                              null == field
                                                ? void 0
                                                : field.name,
                                            required:
                                              null == field
                                                ? void 0
                                                : field.isRequired,
                                          }),
                                          "inputEmail" ===
                                            (null == field
                                              ? void 0
                                              : field.pricingType) &&
                                            __jsx(
                                              "svg",
                                              {
                                                className:
                                                  "w-6 h-6 my-auto ml-4 mr-4 text-gray-500",
                                                xmlns:
                                                  "http://www.w3.org/2000/svg",
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
                                        )
                                  );
                                }),
                            __jsx(
                              "div",
                              {
                                className:
                                  "mb-5 text-sm text-left text-gray-500",
                              },
                              __jsx(
                                "label",
                                { className: "inline-flex" },
                                __jsx("input", {
                                  "aria-label": "Agree to terms",
                                  className: "mr-2",
                                  type: "checkbox",
                                  name: "terms",
                                  defaultValue: 1,
                                }),
                                __jsx(
                                  lib_sanity__WEBPACK_IMPORTED_MODULE_5__.YI,
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
                            __jsx(
                              "button",
                              {
                                id: "submitBtn",
                                "aria-label": "Submit Pricing Form button",
                                onClick: function onClick(e) {
                                  return handleSubmit(e);
                                },
                                className:
                                  "block w-full rounded-l-xl rounded-t-xl bg-brand-primary-foreground p-4 text-center font-bold leading-none text-white transition duration-200 hover:bg-brand-primary ".concat(
                                    "" === billing.billType &&
                                      "cursor-not-allowed disabled:opacity-50"
                                  ),
                                disabled: "" === billing.billType,
                              },
                              "Buy ",
                              billing.billType,
                              " Supply"
                            )
                          ),
                        (null == signInLink ? void 0 : signInLink.label) &&
                          __jsx(
                            "p",
                            { className: "text-xs text-gray-500" },
                            "Already have an account?",
                            " ",
                            __jsx(
                              components_ui_ConditionalLink__WEBPACK_IMPORTED_MODULE_10__.M,
                              {
                                variant: "link",
                                link: signInLink,
                                className: "text-brand-primary hover:underline",
                                ariaLabel:
                                  null == signInLink
                                    ? void 0
                                    : signInLink.label,
                              },
                              null == signInLink ? void 0 : signInLink.label
                            )
                          )
                      )
                    );
                  }, null)
                ),
                __jsx(
                  "div",
                  {
                    className:
                      "flex flex-col w-full py-10 overflow-hidden bg-brand-primary md:w-1/2 lg:rounded-r",
                  },
                  (null == banner ||
                  null === (_banner$banners = banner[banners]) ||
                  void 0 === _banner$banners ||
                  null === (_banner$banners = _banner$banners.mainImage) ||
                  void 0 === _banner$banners ||
                  null === (_banner$banners = _banner$banners.image) ||
                  void 0 === _banner$banners ||
                  null === (_banner$banners = _banner$banners.asset) ||
                  void 0 === _banner$banners
                    ? void 0
                    : _banner$banners._ref) &&
                    __jsx(
                      "div",
                      { className: "w-full mx-auto my-auto md:max-w-xs" },
                      __jsx(next_image__WEBPACK_IMPORTED_MODULE_4__.Z, {
                        className: "object-cover",
                        src: (0, lib_sanity__WEBPACK_IMPORTED_MODULE_5__.uH)(
                          null == banner ||
                            null === (_banner$banners2 = banner[banners]) ||
                            void 0 === _banner$banners2
                            ? void 0
                            : _banner$banners2.mainImage.image
                        ),
                        sizes: "100vw",
                        width: 320,
                        height: 296,
                        alt: "pricing-image-".concat(banners),
                      })
                    ),
                  __jsx(
                    "p",
                    {
                      className:
                        "max-w-sm mx-auto mb-4 text-xl text-center text-white",
                    },
                    null == banner ||
                      null === (_banner$banners3 = banner[banners]) ||
                      void 0 === _banner$banners3
                      ? void 0
                      : _banner$banners3.title
                  ),
                  __jsx(
                    "div",
                    { className: "text-center" },
                    null == banner
                      ? void 0
                      : banner.map(function (item, index) {
                          return __jsx("button", {
                            "aria-label": "Page ".concat(index, " button"),
                            key: null == item ? void 0 : item._key,
                            className: " ".concat(
                              banners === index
                                ? "mr-2 inline-block h-2 w-2 rounded-full bg-white focus:outline-none"
                                : "mr-2 inline-block h-2 w-2 rounded-full bg-brand-secondary focus:outline-none",
                              " "
                            ),
                            onClick: function onClick() {
                              return setBanners(index);
                            },
                          });
                        })
                  )
                )
              )
            )
          )
        );
      }
      VariantD.displayName = "VariantD";
      const __WEBPACK_DEFAULT_EXPORT__ =
        react__WEBPACK_IMPORTED_MODULE_0__.memo(VariantD);
      try {
        (VariantD.displayName = "VariantD"),
          (VariantD.__docgenInfo = {
            description: "",
            displayName: "VariantD",
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
              "components/sections/pricing/variant_d.tsx#VariantD"
            ] = {
              docgenInfo: VariantD.__docgenInfo,
              name: "VariantD",
              path: "components/sections/pricing/variant_d.tsx#VariantD",
            });
      } catch (__react_docgen_typescript_loader_error) {}
    },
    "./components/ui/ConditionalLink/ConditionalLink.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      "use strict";
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
      "use strict";
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
      "use strict";
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
      "use strict";
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
      "use strict";
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
      "use strict";
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
      "use strict";
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
    "?c969": () => {},
    "?ed1b": () => {},
    "?d17e": () => {},
  },
]);
