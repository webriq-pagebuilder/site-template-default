"use strict";
(self.webpackChunk_webriq_pagebuilder_site_template_default =
  self.webpackChunk_webriq_pagebuilder_site_template_default || []).push([
  [8030],
  {
    "./components/ui/File/InputFile.stories.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Outline: () => Outline,
          Primary: () => Primary,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        });
      const __WEBPACK_DEFAULT_EXPORT__ = {
        title: "Components/UI/Input File",
        component: __webpack_require__("./components/ui/File/InputFile.tsx").h,
        tags: ["autodocs"],
        parameters: { backgrounds: { default: "dark" } },
      };
      var Primary = { args: { name: "Browse" } },
        Outline = { args: { name: "Browse", variant: "outline" } };
      (Primary.parameters = {
        ...Primary.parameters,
        docs: {
          ...Primary.parameters?.docs,
          source: {
            originalSource: '{\n  args: {\n    name: "Browse"\n  }\n}',
            ...Primary.parameters?.docs?.source,
          },
        },
      }),
        (Outline.parameters = {
          ...Outline.parameters,
          docs: {
            ...Outline.parameters?.docs,
            source: {
              originalSource:
                '{\n  args: {\n    name: "Browse",\n    variant: "outline"\n  }\n}',
              ...Outline.parameters?.docs?.source,
            },
          },
        });
      const __namedExportsOrder = ["Primary", "Outline"];
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
    "./components/ui/File/InputFile.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, { h: () => InputFile });
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
        _excluded = ["className", "variant", "required", "name", "ariaLabel"],
        __jsx = react__WEBPACK_IMPORTED_MODULE_0__.createElement,
        InputFile = function InputFile(_ref) {
          var _variants$variant,
            className = _ref.className,
            _ref$variant = _ref.variant,
            variant = void 0 === _ref$variant ? "primary" : _ref$variant,
            _ref$required = _ref.required,
            required = void 0 !== _ref$required && _ref$required,
            name = _ref.name,
            ariaLabel = _ref.ariaLabel,
            props = (0,
            _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_1__.Z)(
              _ref,
              _excluded
            ),
            _useState = (0, react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
            filename = _useState[0],
            setFilename = _useState[1],
            commonStyle =
              "my-1 ml-auto bg-white cursor-pointer rounded  px-4 py-3 text-xs font-semibold leading-none text-white transition duration-200",
            primary = "".concat(
              commonStyle,
              " bg-brand-primary-foreground hover:bg-brand-primary"
            ),
            variantClass =
              null !==
                (_variants$variant = {
                  primary,
                  outline: "".concat(
                    commonStyle,
                    " text-brand-primary-foreground border border-solid bg-white border-brand-primary-foreground hover:bg-slate-100"
                  ),
                }[variant]) && void 0 !== _variants$variant
                ? _variants$variant
                : primary;
          return __jsx(
            "div",
            { className: "relative rounded bg-white px-2 w-full" },
            __jsx(
              "input",
              (0,
              _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_extends_js__WEBPACK_IMPORTED_MODULE_2__.Z)(
                {
                  "aria-label": null != ariaLabel ? ariaLabel : "Attach file",
                  className: "absolute w-full h-full opacity-0 cursor-pointer",
                  type: "file",
                  name,
                  required,
                  id: name,
                  onChange: function onChange(e) {
                    var _e$target$files$0$nam, _e$target;
                    return setFilename(
                      null !==
                        (_e$target$files$0$nam =
                          null === (_e$target = e.target) ||
                          void 0 === _e$target ||
                          null === (_e$target = _e$target.files[0]) ||
                          void 0 === _e$target
                            ? void 0
                            : _e$target.name) &&
                        void 0 !== _e$target$files$0$nam
                        ? _e$target$files$0$nam
                        : ""
                    );
                  },
                },
                props
              )
            ),
            __jsx(
              "div",
              { className: "flex" },
              __jsx(
                "span",
                { className: "px-2 py-4 text-xs font-semibold leading-none" },
                filename
              ),
              __jsx(
                "label",
                {
                  htmlFor: name,
                  className: (0, utils_cn__WEBPACK_IMPORTED_MODULE_3__.cn)(
                    variantClass,
                    className
                  ),
                },
                name
              )
            )
          );
        };
      InputFile.displayName = "InputFile";
      try {
        (InputFile.displayName = "InputFile"),
          (InputFile.__docgenInfo = {
            description: "",
            displayName: "InputFile",
            props: {
              className: {
                defaultValue: null,
                description: "Will apply on the label element",
                name: "className",
                required: !1,
                type: { name: "string" },
              },
              required: {
                defaultValue: { value: "false" },
                description: "Is this element required?",
                name: "required",
                required: !1,
                type: { name: "boolean" },
              },
              name: {
                defaultValue: null,
                description: "",
                name: "name",
                required: !0,
                type: { name: "string" },
              },
              ariaLabel: {
                defaultValue: null,
                description: "",
                name: "ariaLabel",
                required: !0,
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
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES[
              "components/ui/File/InputFile.tsx#InputFile"
            ] = {
              docgenInfo: InputFile.__docgenInfo,
              name: "InputFile",
              path: "components/ui/File/InputFile.tsx#InputFile",
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
