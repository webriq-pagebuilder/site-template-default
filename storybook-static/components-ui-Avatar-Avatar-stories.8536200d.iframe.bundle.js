"use strict";
(self.webpackChunk_webriq_pagebuilder_site_template_default =
  self.webpackChunk_webriq_pagebuilder_site_template_default || []).push([
  [2016],
  {
    "./components/ui/Avatar/Avatar.stories.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Initials: () => Initials,
          Primary: () => Primary,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        });
      const __WEBPACK_DEFAULT_EXPORT__ = {
        title: "Components/UI/Avatar",
        component: __webpack_require__("./components/ui/Avatar/Avatar.tsx").q,
        args: { alt: "image" },
        tags: ["autodocs"],
      };
      var Primary = {
          args: {
            src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            text: "John Moreno",
          },
        },
        Initials = { args: { text: "John Moreno" } };
      (Primary.parameters = {
        ...Primary.parameters,
        docs: {
          ...Primary.parameters?.docs,
          source: {
            originalSource:
              '{\n  args: {\n    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",\n    text: "John Moreno"\n  }\n}',
            ...Primary.parameters?.docs?.source,
          },
        },
      }),
        (Initials.parameters = {
          ...Initials.parameters,
          docs: {
            ...Initials.parameters?.docs,
            source: {
              originalSource: '{\n  args: {\n    text: "John Moreno"\n  }\n}',
              ...Initials.parameters?.docs?.source,
            },
          },
        });
      const __namedExportsOrder = ["Primary", "Initials"];
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
    "./components/ui/Avatar/Avatar.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, { q: () => Avatar });
      var _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_extends_js__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(
            "./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/extends.js"
          ),
        _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            "./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"
          ),
        react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          "./node_modules/next/dist/compiled/react/index.js"
        ),
        next_image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          "./node_modules/@storybook/nextjs/dist/images/next-image.mjs"
        ),
        utils_cn__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__("./utils/cn.ts"),
        _excluded = ["src", "alt", "size", "text", "className"],
        __jsx = react__WEBPACK_IMPORTED_MODULE_0__.createElement;
      function Avatar(_ref) {
        var _text$split,
          src = _ref.src,
          _ref$alt = _ref.alt,
          alt = void 0 === _ref$alt ? "image" : _ref$alt,
          _ref$size = _ref.size,
          size = void 0 === _ref$size ? "sm" : _ref$size,
          text = _ref.text,
          className = _ref.className,
          props = (0,
          _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_2__.Z)(
            _ref,
            _excluded
          ),
          _useState = (0, react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),
          loaded = _useState[0],
          setLoaded = _useState[1],
          avatarSize = "".concat(
            "number" == typeof size
              ? size
              : { sm: 40, md: 80, lg: 120, xl: 160 }[size],
            "px"
          ),
          initials = text
            ? null == text ||
              null === (_text$split = text.split(" ")) ||
              void 0 === _text$split
              ? void 0
              : _text$split.reduce(function (acc, curr) {
                  return acc + curr[0];
                }, "")
            : "AB";
        return __jsx(
          "div",
          (0,
          _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_extends_js__WEBPACK_IMPORTED_MODULE_3__.Z)(
            {
              style: { maxWidth: avatarSize },
              className: (0, utils_cn__WEBPACK_IMPORTED_MODULE_4__.cn)(
                "relative rounded-full aspect-square overflow-hidden border-2 border-solid border-brand-primary-foreground",
                className
              ),
            },
            props
          ),
          (!loaded || !src) &&
            __jsx(
              "div",
              {
                className:
                  "flex items-center justify-center w-full h-full bg-brand-primary-foreground",
              },
              __jsx(
                "p",
                {
                  style: { fontSize: "calc(".concat(avatarSize, "/2)") },
                  className: "text-white",
                },
                initials
              )
            ),
          src &&
            __jsx(next_image__WEBPACK_IMPORTED_MODULE_1__.Z, {
              className: "object-cover object-center",
              src,
              alt,
              fill: !0,
              onLoad: function onLoad() {
                return setLoaded(!0);
              },
            })
        );
      }
      Avatar.displayName = "Avatar";
      try {
        (Avatar.displayName = "Avatar"),
          (Avatar.__docgenInfo = {
            description: "",
            displayName: "Avatar",
            props: {
              src: {
                defaultValue: null,
                description: "",
                name: "src",
                required: !0,
                type: { name: "string" },
              },
              alt: {
                defaultValue: { value: "image" },
                description: "",
                name: "alt",
                required: !1,
                type: { name: "string" },
              },
              size: {
                defaultValue: { value: "sm" },
                description: "",
                name: "size",
                required: !1,
                type: { name: "number | ImageSize" },
              },
              text: {
                defaultValue: null,
                description: "",
                name: "text",
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
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["components/ui/Avatar/Avatar.tsx#Avatar"] =
              {
                docgenInfo: Avatar.__docgenInfo,
                name: "Avatar",
                path: "components/ui/Avatar/Avatar.tsx#Avatar",
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
