"use strict";
(self.webpackChunk_webriq_pagebuilder_site_template_default =
  self.webpackChunk_webriq_pagebuilder_site_template_default || []).push([
  [365],
  {
    "./components/ui/Button/Button.stories.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Borderless: () => Borderless,
          CustomClass: () => CustomClass,
          Loading: () => Loading,
          Outline: () => Outline,
          Primary: () => Primary,
          Secondary: () => Secondary,
          Tertiary: () => Tertiary,
          WithLoadingComponent: () => WithLoadingComponent,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        });
      var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          "./node_modules/next/dist/compiled/react/index.js"
        ),
        _Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          "./components/ui/Button/Button.tsx"
        ),
        react_icons_im__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          "./node_modules/react-icons/im/index.esm.js"
        ),
        __jsx = react__WEBPACK_IMPORTED_MODULE_0__.createElement;
      const __WEBPACK_DEFAULT_EXPORT__ = {
        title: "Components/UI/Button",
        component: _Button__WEBPACK_IMPORTED_MODULE_1__.z,
        tags: ["autodocs"],
        args: { children: "Submit" },
        argTypes: { onClick: { action: "onClick" } },
      };
      var Primary = { args: { variant: "primary" } },
        Secondary = { args: { variant: "secondary" } },
        Tertiary = { args: { variant: "tertiary" } },
        Outline = { args: { variant: "outline" } },
        Borderless = { args: { variant: "borderless" } },
        Loading = { args: { loading: !0 } },
        WithLoadingComponent = {
          args: {
            loading: !0,
            loadingComponent: __jsx(
              react_icons_im__WEBPACK_IMPORTED_MODULE_2__.Cd,
              { className: "animate-spin", size: 30 }
            ),
          },
        },
        CustomClass = {
          args: {
            className:
              "rounded-none bg-orange-600 tracking-widest text-gray-200 hover:bg-orange-400",
          },
        };
      (Primary.parameters = {
        ...Primary.parameters,
        docs: {
          ...Primary.parameters?.docs,
          source: {
            originalSource: '{\n  args: {\n    variant: "primary"\n  }\n}',
            ...Primary.parameters?.docs?.source,
          },
        },
      }),
        (Secondary.parameters = {
          ...Secondary.parameters,
          docs: {
            ...Secondary.parameters?.docs,
            source: {
              originalSource: '{\n  args: {\n    variant: "secondary"\n  }\n}',
              ...Secondary.parameters?.docs?.source,
            },
          },
        }),
        (Tertiary.parameters = {
          ...Tertiary.parameters,
          docs: {
            ...Tertiary.parameters?.docs,
            source: {
              originalSource: '{\n  args: {\n    variant: "tertiary"\n  }\n}',
              ...Tertiary.parameters?.docs?.source,
            },
          },
        }),
        (Outline.parameters = {
          ...Outline.parameters,
          docs: {
            ...Outline.parameters?.docs,
            source: {
              originalSource: '{\n  args: {\n    variant: "outline"\n  }\n}',
              ...Outline.parameters?.docs?.source,
            },
          },
        }),
        (Borderless.parameters = {
          ...Borderless.parameters,
          docs: {
            ...Borderless.parameters?.docs,
            source: {
              originalSource: '{\n  args: {\n    variant: "borderless"\n  }\n}',
              ...Borderless.parameters?.docs?.source,
            },
          },
        }),
        (Loading.parameters = {
          ...Loading.parameters,
          docs: {
            ...Loading.parameters?.docs,
            source: {
              originalSource: "{\n  args: {\n    loading: true\n  }\n}",
              ...Loading.parameters?.docs?.source,
            },
          },
        }),
        (WithLoadingComponent.parameters = {
          ...WithLoadingComponent.parameters,
          docs: {
            ...WithLoadingComponent.parameters?.docs,
            source: {
              originalSource:
                '{\n  args: {\n    loading: true,\n    loadingComponent: <ImSpinner2 className="animate-spin" size={30} />\n  }\n}',
              ...WithLoadingComponent.parameters?.docs?.source,
            },
          },
        }),
        (CustomClass.parameters = {
          ...CustomClass.parameters,
          docs: {
            ...CustomClass.parameters?.docs,
            source: {
              originalSource:
                '{\n  args: {\n    className: "rounded-none bg-orange-600 tracking-widest text-gray-200 hover:bg-orange-400"\n  }\n}',
              ...CustomClass.parameters?.docs?.source,
            },
          },
        });
      const __namedExportsOrder = [
        "Primary",
        "Secondary",
        "Tertiary",
        "Outline",
        "Borderless",
        "Loading",
        "WithLoadingComponent",
        "CustomClass",
      ];
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
