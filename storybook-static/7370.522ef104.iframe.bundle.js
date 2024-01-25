"use strict";
(self.webpackChunk_webriq_pagebuilder_site_template_default =
  self.webpackChunk_webriq_pagebuilder_site_template_default || []).push([
  [7370],
  {
    "./components/sections/call_to_action/variant_d.tsx": (
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
        react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          "./node_modules/next/dist/compiled/react/index.js"
        ),
        next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          "./node_modules/next/link.js"
        ),
        next_link__WEBPACK_IMPORTED_MODULE_2___default = __webpack_require__.n(
          next_link__WEBPACK_IMPORTED_MODULE_2__
        ),
        next_image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          "./node_modules/@storybook/nextjs/dist/images/next-image.mjs"
        ),
        helper__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__("./helper/index.tsx"),
        components_common_form_sign_up_form__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__("./components/common/form/sign-up-form.tsx"),
        __jsx = react__WEBPACK_IMPORTED_MODULE_0__.createElement;
      function VariantD(_ref) {
        var _logo$alt,
          logo = _ref.logo,
          title = _ref.title,
          text = _ref.text,
          button = _ref.button,
          form = _ref.form,
          formLinks = _ref.formLinks,
          signInLink = _ref.signInLink;
        return __jsx(
          "section",
          { className: "px-10 py-20 bg-gray-50" },
          __jsx(
            "div",
            { className: "container px-4 mx-auto" },
            __jsx(
              "div",
              { className: "flex flex-wrap items-center justify-center -mx-4" },
              __jsx(
                "div",
                { className: "max-w-2xl px-4 mb-16 lg:mb-0 lg:w-1/2" },
                (null == logo ? void 0 : logo.image) &&
                  __jsx(
                    next_link__WEBPACK_IMPORTED_MODULE_2___default(),
                    {
                      "aria-label":
                        "/" ===
                        (0, helper__WEBPACK_IMPORTED_MODULE_4__.oQ)(logo)
                          ? "Go to home page"
                          : "Go to ".concat(
                              (0, helper__WEBPACK_IMPORTED_MODULE_4__.oQ)(logo)
                            ),
                      className:
                        "inline-block mb-10 text-3xl font-bold leading-none",
                      href: (0, helper__WEBPACK_IMPORTED_MODULE_4__.oQ)(logo),
                    },
                    __jsx(next_image__WEBPACK_IMPORTED_MODULE_3__.Z, {
                      className: "h-14",
                      src: (0, lib_sanity__WEBPACK_IMPORTED_MODULE_1__.uH)(
                        null == logo ? void 0 : logo.image
                      ),
                      width: 56,
                      height: 56,
                      alt:
                        null !==
                          (_logo$alt = null == logo ? void 0 : logo.alt) &&
                        void 0 !== _logo$alt
                          ? _logo$alt
                          : "callToAction-logo",
                    })
                  ),
                __jsx(
                  "h1",
                  {
                    className:
                      "mb-4 text-4xl font-bold font-heading md:text-5xl",
                  },
                  title
                ),
                __jsx(
                  "p",
                  { className: "mb-8 leading-loose text-gray-700" },
                  text
                ),
                (null == button ? void 0 : button.label) &&
                  __jsx(
                    helper__WEBPACK_IMPORTED_MODULE_4__.MT,
                    {
                      link: button,
                      className:
                        "inline-block px-6 py-2 font-bold leading-loose text-white transition bg-brand-primary hover:bg-brand-primary-foreground duration-250 rounded-l-xl rounded-t-xl",
                      ariaLabel: null == button ? void 0 : button.label,
                    },
                    null == button ? void 0 : button.label
                  )
              ),
              __jsx(
                "div",
                { className: "w-full lg:w-1/2" },
                __jsx(
                  "div",
                  { className: "max-w-sm mx-auto lg:ml-auto lg:mr-0" },
                  (null == form ? void 0 : form.fields) &&
                    __jsx(
                      components_common_form_sign_up_form__WEBPACK_IMPORTED_MODULE_5__.W,
                      { form, signInLink }
                    ),
                  formLinks &&
                    __jsx(
                      "div",
                      {
                        className:
                          "flex flex-wrap items-center justify-center text-sm text-gray-500",
                      },
                      null == formLinks
                        ? void 0
                        : formLinks.map(function (link, index, _ref2) {
                            var length = _ref2.length;
                            return __jsx(
                              "div",
                              { key: index },
                              __jsx(
                                helper__WEBPACK_IMPORTED_MODULE_4__.MT,
                                {
                                  link,
                                  className:
                                    "font-bold text-brand-primary hover:text-brand-primary-foreground",
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
              "components/sections/call_to_action/variant_d.tsx#VariantD"
            ] = {
              docgenInfo: VariantD.__docgenInfo,
              name: "VariantD",
              path: "components/sections/call_to_action/variant_d.tsx#VariantD",
            });
      } catch (__react_docgen_typescript_loader_error) {}
    },
  },
]);
