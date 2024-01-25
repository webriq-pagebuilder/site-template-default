"use strict";
(self.webpackChunk_webriq_pagebuilder_site_template_default =
  self.webpackChunk_webriq_pagebuilder_site_template_default || []).push([
  [5778],
  {
    "./components/sections/call_to_action/variant_e.tsx": (
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
        components_common_form_sign_up_form__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__("./components/common/form/sign-up-form.tsx"),
        __jsx = react__WEBPACK_IMPORTED_MODULE_0__.createElement;
      function VariantE(_ref) {
        var form = _ref.form,
          formLinks = _ref.formLinks,
          signInLink = _ref.signInLink;
        return __jsx(
          "section",
          { className: "px-5 py-20 bg-gray-50 sm:px-10" },
          __jsx(
            "div",
            { className: "container px-4 mx-auto" },
            __jsx(
              "div",
              { className: "mx-auto sm:max-w-md" },
              (null == form ? void 0 : form.fields) &&
                __jsx(
                  components_common_form_sign_up_form__WEBPACK_IMPORTED_MODULE_2__.W,
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
                            helper__WEBPACK_IMPORTED_MODULE_1__.MT,
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
        );
      }
      VariantE.displayName = "VariantE";
      const __WEBPACK_DEFAULT_EXPORT__ =
        react__WEBPACK_IMPORTED_MODULE_0__.memo(VariantE);
      try {
        (VariantE.displayName = "VariantE"),
          (VariantE.__docgenInfo = {
            description: "",
            displayName: "VariantE",
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
              "components/sections/call_to_action/variant_e.tsx#VariantE"
            ] = {
              docgenInfo: VariantE.__docgenInfo,
              name: "VariantE",
              path: "components/sections/call_to_action/variant_e.tsx#VariantE",
            });
      } catch (__react_docgen_typescript_loader_error) {}
    },
  },
]);
