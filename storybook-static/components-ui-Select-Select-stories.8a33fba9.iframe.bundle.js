"use strict";
(self.webpackChunk_webriq_pagebuilder_site_template_default =
  self.webpackChunk_webriq_pagebuilder_site_template_default || []).push([
  [8774],
  {
    "./components/ui/Select/Select.stories.tsx": (
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
      var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          "./node_modules/next/dist/compiled/react/index.js"
        ),
        _Select__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          "./components/ui/Select/Select.tsx"
        ),
        __jsx = react__WEBPACK_IMPORTED_MODULE_0__.createElement;
      const __WEBPACK_DEFAULT_EXPORT__ = {
        title: "Components/UI/Select",
        component: _Select__WEBPACK_IMPORTED_MODULE_1__.P,
        args: { items: ["Option 1", "Option 2", "Option 3"], name: "Select" },
        decorators: [
          function (Story) {
            return __jsx(
              "div",
              { className: "bg-gray-50 rounded-lg p-4" },
              __jsx(Story, null)
            );
          },
        ],
        tags: ["autodocs"],
      };
      var Primary = { args: {} };
      Primary.parameters = {
        ...Primary.parameters,
        docs: {
          ...Primary.parameters?.docs,
          source: {
            originalSource: "{\n  args: {}\n}",
            ...Primary.parameters?.docs?.source,
          },
        },
      };
      const __namedExportsOrder = ["Primary"];
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
    "./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js":
      (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        function _objectWithoutProperties(source, excluded) {
          if (null == source) return {};
          var key,
            i,
            target = (function _objectWithoutPropertiesLoose(source, excluded) {
              if (null == source) return {};
              var key,
                i,
                target = {},
                sourceKeys = Object.keys(source);
              for (i = 0; i < sourceKeys.length; i++)
                (key = sourceKeys[i]),
                  excluded.indexOf(key) >= 0 || (target[key] = source[key]);
              return target;
            })(source, excluded);
          if (Object.getOwnPropertySymbols) {
            var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
            for (i = 0; i < sourceSymbolKeys.length; i++)
              (key = sourceSymbolKeys[i]),
                excluded.indexOf(key) >= 0 ||
                  (Object.prototype.propertyIsEnumerable.call(source, key) &&
                    (target[key] = source[key]));
          }
          return target;
        }
        __webpack_require__.d(__webpack_exports__, {
          Z: () => _objectWithoutProperties,
        });
      },
    "./components/ui/Select/Select.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, { P: () => Select });
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
          "className",
          "variant",
          "required",
          "name",
          "defaultValue",
          "label",
          "labelClass",
          "items",
          "onChange",
          "noLabel",
        ],
        __jsx = react__WEBPACK_IMPORTED_MODULE_0__.createElement,
        Select = function Select(_ref) {
          var _variants$variant,
            className = _ref.className,
            _ref$variant = _ref.variant,
            variant = void 0 === _ref$variant ? "primary" : _ref$variant,
            _ref$required = _ref.required,
            required = void 0 !== _ref$required && _ref$required,
            name = _ref.name,
            defaultValue = _ref.defaultValue,
            label = _ref.label,
            labelClass = _ref.labelClass,
            items = _ref.items,
            onChange = _ref.onChange,
            _ref$noLabel = _ref.noLabel,
            noLabel = void 0 !== _ref$noLabel && _ref$noLabel,
            props = (0,
            _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_1__.Z)(
              _ref,
              _excluded
            ),
            commonStyle =
              "w-full rounded bg-white p-4 text-xs font-semibold leading-none outline-none",
            primary = "".concat(commonStyle),
            variantClass =
              null !==
                (_variants$variant = {
                  primary,
                  outline: "".concat(
                    commonStyle,
                    " border border-solid border-brand-primary-foreground"
                  ),
                }[variant]) && void 0 !== _variants$variant
                ? _variants$variant
                : primary;
          return __jsx(
            react__WEBPACK_IMPORTED_MODULE_0__.Fragment,
            null,
            !noLabel &&
              __jsx(
                "label",
                { htmlFor: name, className: labelClass },
                label || name
              ),
            __jsx(
              "select",
              (0,
              _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_extends_js__WEBPACK_IMPORTED_MODULE_2__.Z)(
                {
                  onChange,
                  className: (0, utils_cn__WEBPACK_IMPORTED_MODULE_3__.cn)(
                    variantClass,
                    className
                  ),
                  name,
                  defaultValue,
                  required,
                },
                props
              ),
              items &&
                items.length > 0 &&
                items.map(function (opt) {
                  return __jsx("option", { value: opt, key: opt }, opt);
                })
            )
          );
        };
      try {
        (Select.displayName = "Select"),
          (Select.__docgenInfo = {
            description: "",
            displayName: "Select",
            props: {
              defaultValue: {
                defaultValue: null,
                description: "Default value for the select element",
                name: "defaultValue",
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
                  value: [{ value: '"primary"' }, { value: '"outline"' }],
                },
              },
              label: {
                defaultValue: null,
                description: "Label for the element. Defaults to name",
                name: "label",
                required: !1,
                type: { name: "string" },
              },
              labelClass: {
                defaultValue: null,
                description: "Classname for the label element",
                name: "labelClass",
                required: !1,
                type: { name: "string" },
              },
              onChange: {
                defaultValue: null,
                description: "Function that runs when the value changes",
                name: "onChange",
                required: !1,
                type: { name: "() => void" },
              },
              className: {
                defaultValue: null,
                description: "",
                name: "className",
                required: !1,
                type: { name: "string" },
              },
              required: {
                defaultValue: { value: "false" },
                description: "",
                name: "required",
                required: !1,
                type: { name: "boolean" },
              },
              name: {
                defaultValue: null,
                description: "Name of the select element",
                name: "name",
                required: !0,
                type: { name: "string" },
              },
              items: {
                defaultValue: null,
                description: "A list of string as options",
                name: "items",
                required: !0,
                type: { name: "string[]" },
              },
              ariaLabel: {
                defaultValue: null,
                description: "",
                name: "ariaLabel",
                required: !0,
                type: { name: "string" },
              },
              noLabel: {
                defaultValue: { value: "false" },
                description: "",
                name: "noLabel",
                required: !1,
                type: { name: "boolean" },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["components/ui/Select/Select.tsx#Select"] =
              {
                docgenInfo: Select.__docgenInfo,
                name: "Select",
                path: "components/ui/Select/Select.tsx#Select",
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
