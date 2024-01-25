"use strict";
(self.webpackChunk_webriq_pagebuilder_site_template_default =
  self.webpackChunk_webriq_pagebuilder_site_template_default || []).push([
  [6371],
  {
    "./components/ui/Card/Card.stories.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Primary: () => Primary,
          WithClassName: () => WithClassName,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        });
      var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          "./node_modules/next/dist/compiled/react/index.js"
        ),
        _Card__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          "./components/ui/Card/Card.tsx"
        ),
        __jsx = react__WEBPACK_IMPORTED_MODULE_0__.createElement;
      const __WEBPACK_DEFAULT_EXPORT__ = {
        title: "Components/UI/Card",
        component: _Card__WEBPACK_IMPORTED_MODULE_1__.Z,
        tags: ["autodocs"],
        args: { children: __jsx("p", null, "This is a sample card") },
      };
      var Primary = {},
        WithClassName = {
          args: {
            className:
              "bg-gray-200 border-solid border border-brand-primary-foreground",
          },
        };
      (Primary.parameters = {
        ...Primary.parameters,
        docs: {
          ...Primary.parameters?.docs,
          source: { originalSource: "{}", ...Primary.parameters?.docs?.source },
        },
      }),
        (WithClassName.parameters = {
          ...WithClassName.parameters,
          docs: {
            ...WithClassName.parameters?.docs,
            source: {
              originalSource:
                '{\n  args: {\n    className: "bg-gray-200 border-solid border border-brand-primary-foreground"\n  }\n}',
              ...WithClassName.parameters?.docs?.source,
            },
          },
        });
      const __namedExportsOrder = ["Primary", "WithClassName"];
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
