"use strict";
(self.webpackChunk_webriq_pagebuilder_site_template_default =
  self.webpackChunk_webriq_pagebuilder_site_template_default || []).push([
  [4081],
  {
    "./components/ui/Badge/Badge.stories.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Primary: () => Primary,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        });
      const __WEBPACK_DEFAULT_EXPORT__ = {
        title: "Components/UI/Badge",
        component: __webpack_require__("./components/ui/Badge/Badge.tsx").C,
        tags: ["autodocs"],
        args: { children: "Travel" },
        parameters: { backgrounds: { default: "dark" } },
      };
      var Primary = {};
      Primary.parameters = {
        ...Primary.parameters,
        docs: {
          ...Primary.parameters?.docs,
          source: { originalSource: "{}", ...Primary.parameters?.docs?.source },
        },
      };
      const __namedExportsOrder = ["Primary"];
    },
    "./components/ui/Badge/Badge.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, { C: () => Badge });
      var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          "./node_modules/next/dist/compiled/react/index.js"
        ),
        utils_cn__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__("./utils/cn.ts"),
        __jsx = react__WEBPACK_IMPORTED_MODULE_0__.createElement;
      function Badge(_ref) {
        var children = _ref.children,
          className = _ref.className;
        return __jsx(
          "div",
          { className: "flex" },
          __jsx(
            "div",
            {
              className: (0, utils_cn__WEBPACK_IMPORTED_MODULE_1__.cn)(
                "px-3 py-1 mr-3 text-sm font-bold uppercase bg-white rounded-full text-brand-primary",
                className
              ),
            },
            children
          )
        );
      }
      Badge.displayName = "Badge";
      try {
        (Badge.displayName = "Badge"),
          (Badge.__docgenInfo = {
            description: "",
            displayName: "Badge",
            props: {
              children: {
                defaultValue: null,
                description: "Defines the content inside the button.",
                name: "children",
                required: !0,
                type: { name: "ReactNode" },
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
            (STORYBOOK_REACT_CLASSES["components/ui/Badge/Badge.tsx#Badge"] = {
              docgenInfo: Badge.__docgenInfo,
              name: "Badge",
              path: "components/ui/Badge/Badge.tsx#Badge",
            });
      } catch (__react_docgen_typescript_loader_error) {}
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
