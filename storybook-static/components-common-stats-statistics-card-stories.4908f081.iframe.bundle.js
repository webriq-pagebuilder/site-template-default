"use strict";
(self.webpackChunk_webriq_pagebuilder_site_template_default =
  self.webpackChunk_webriq_pagebuilder_site_template_default || []).push([
  [7897],
  {
    "./components/common/stats/statistics-card.stories.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Primary: () => Primary,
          Stacked: () => Stacked,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        });
      var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          "./node_modules/next/dist/compiled/react/index.js"
        ),
        _stats_card__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          "./components/common/stats/stats-card.tsx"
        ),
        __jsx = react__WEBPACK_IMPORTED_MODULE_0__.createElement,
        ARGS_LABEL = "Total Revenue",
        ARGS_VALUE = "$33,261",
        ARGS_ICON =
          "https://cdn.sanity.io/images/9itgab5x/staging/97b6696849c90facc200537fd780b03d373e5212-980x830.png";
      const __WEBPACK_DEFAULT_EXPORT__ = {
        title: "Components/Common/Statistics",
        component: _stats_card__WEBPACK_IMPORTED_MODULE_1__.A,
        tags: ["autodocs"],
        args: { label: ARGS_LABEL, value: ARGS_VALUE, icon: ARGS_ICON },
        decorators: [
          function (Story) {
            return __jsx(
              "div",
              { className: "max-w-[300px]" },
              __jsx(Story, null)
            );
          },
        ],
      };
      var Primary = { args: { variant: "inline" } },
        Stacked = { args: { variant: "stacked" } };
      (Primary.parameters = {
        ...Primary.parameters,
        docs: {
          ...Primary.parameters?.docs,
          source: {
            originalSource: '{\n  args: {\n    variant: "inline"\n  }\n}',
            ...Primary.parameters?.docs?.source,
          },
        },
      }),
        (Stacked.parameters = {
          ...Stacked.parameters,
          docs: {
            ...Stacked.parameters?.docs,
            source: {
              originalSource: '{\n  args: {\n    variant: "stacked"\n  }\n}',
              ...Stacked.parameters?.docs?.source,
            },
          },
        });
      const __namedExportsOrder = ["Primary", "Stacked"];
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
    "./components/common/stats/stats-card.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, { A: () => StatsCard });
      var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          "./node_modules/next/dist/compiled/react/index.js"
        ),
        components_ui_Text__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          "./components/ui/Text/index.ts"
        ),
        next_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          "./node_modules/@storybook/nextjs/dist/images/next-image.mjs"
        ),
        utils_cn__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__("./utils/cn.ts"),
        __jsx = react__WEBPACK_IMPORTED_MODULE_0__.createElement;
      function StatsCard(_ref) {
        var _variantClass$variant,
          _imageVariantClass$va,
          icon = _ref.icon,
          value = _ref.value,
          label = _ref.label,
          alt = _ref.alt,
          className = _ref.className,
          _ref$variant = _ref.variant,
          variant = void 0 === _ref$variant ? "inline" : _ref$variant,
          variantClass = {
            inline: "".concat("w-full px-4", " flex items-center"),
            stacked: "".concat("w-full px-4", " block"),
          },
          imageVariantClass = {
            inline:
              "inline-block p-4 mr-4 rounded bg-brand-secondary-foreground",
            stacked:
              "inline-block p-4 mx-auto rounded bg-brand-secondary-foreground",
          },
          classes =
            null !== (_variantClass$variant = variantClass[variant]) &&
            void 0 !== _variantClass$variant
              ? _variantClass$variant
              : variantClass.inline,
          imageClasses =
            null !== (_imageVariantClass$va = imageVariantClass[variant]) &&
            void 0 !== _imageVariantClass$va
              ? _imageVariantClass$va
              : imageVariantClass.inline;
        return __jsx(
          "div",
          {
            className: (0, utils_cn__WEBPACK_IMPORTED_MODULE_3__.cn)(
              classes,
              className
            ),
          },
          icon &&
            __jsx(
              "div",
              { className: imageClasses },
              __jsx(next_image__WEBPACK_IMPORTED_MODULE_2__.Z, {
                src: icon,
                width: 24,
                height: 24,
                quality: 100,
                alt: null != alt ? alt : "statistics-icon",
              })
            ),
          __jsx(
            "div",
            null,
            __jsx("p", { className: "text-2xl font-bold" }, value),
            __jsx(
              components_ui_Text__WEBPACK_IMPORTED_MODULE_1__.x,
              { muted: !0 },
              label
            )
          )
        );
      }
      StatsCard.displayName = "StatsCard";
      try {
        (StatsCard.displayName = "StatsCard"),
          (StatsCard.__docgenInfo = {
            description: "",
            displayName: "StatsCard",
            props: {
              icon: {
                defaultValue: null,
                description: "",
                name: "icon",
                required: !0,
                type: { name: "string" },
              },
              value: {
                defaultValue: null,
                description: "",
                name: "value",
                required: !0,
                type: { name: "string" },
              },
              label: {
                defaultValue: null,
                description: "",
                name: "label",
                required: !0,
                type: { name: "string" },
              },
              alt: {
                defaultValue: null,
                description: "",
                name: "alt",
                required: !1,
                type: { name: "string" },
              },
              className: {
                defaultValue: null,
                description: "",
                name: "className",
                required: !1,
                type: { name: "string" },
              },
              variant: {
                defaultValue: { value: "inline" },
                description: "",
                name: "variant",
                required: !1,
                type: {
                  name: "enum",
                  value: [{ value: '"inline"' }, { value: '"stacked"' }],
                },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES[
              "components/common/stats/stats-card.tsx#StatsCard"
            ] = {
              docgenInfo: StatsCard.__docgenInfo,
              name: "StatsCard",
              path: "components/common/stats/stats-card.tsx#StatsCard",
            });
      } catch (__react_docgen_typescript_loader_error) {}
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
