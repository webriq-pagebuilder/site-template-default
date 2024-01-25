"use strict";
(self.webpackChunk_webriq_pagebuilder_site_template_default =
  self.webpackChunk_webriq_pagebuilder_site_template_default || []).push([
  [8988],
  {
    "./components/ui/SocialIcons/SocialIcons.stories.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          AllIcons: () => AllIcons,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        });
      var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          "./node_modules/next/dist/compiled/react/index.js"
        ),
        _SocialIcons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          "./components/ui/SocialIcons/SocialIcons.tsx"
        ),
        __jsx = react__WEBPACK_IMPORTED_MODULE_0__.createElement;
      const __WEBPACK_DEFAULT_EXPORT__ = {
        title: "Components/UI/Social Icons",
        component: _SocialIcons__WEBPACK_IMPORTED_MODULE_1__.Q,
        tags: ["autodocs"],
      };
      var AllIcons = {
        render: function render() {
          return __jsx(
            "div",
            { className: "flex gap-4" },
            ["facebook", "linkedin", "instagram", "youtube"].map(function (i) {
              return __jsx(_SocialIcons__WEBPACK_IMPORTED_MODULE_1__.Q, {
                social: i,
              });
            })
          );
        },
      };
      AllIcons.parameters = {
        ...AllIcons.parameters,
        docs: {
          ...AllIcons.parameters?.docs,
          source: {
            originalSource:
              '{\n  render: () => {\n    const icons = ["facebook", "linkedin", "instagram", "youtube"];\n    return <div className="flex gap-4">\n        {icons.map(i => {\n        return <SocialIcon social={(i as Socials)} />;\n        //   return <div>test</div>;\n      })}\n      </div>;\n  }\n}',
            ...AllIcons.parameters?.docs?.source,
          },
        },
      };
      const __namedExportsOrder = ["AllIcons"];
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
    "./components/ui/SocialIcons/SocialIcons.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, { Q: () => SocialIcon });
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
        react_icons_fa__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          "./node_modules/react-icons/fa/index.esm.js"
        ),
        utils_cn__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__("./utils/cn.ts"),
        _excluded = ["social", "className"],
        __jsx = react__WEBPACK_IMPORTED_MODULE_0__.createElement,
        FacebookIcon = function FacebookIcon(props) {
          return __jsx(
            "svg",
            {
              className: "",
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24",
            },
            __jsx("path", {
              fill: "#0045d8",
              d: "M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z",
            })
          );
        };
      FacebookIcon.displayName = "FacebookIcon";
      var TwitterIcon = function TwitterIcon(props) {
        return __jsx(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            width: "24",
            height: "24",
            viewBox: "0 0 24 24",
          },
          __jsx("path", {
            fill: "#0045d8",
            d: "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z",
          })
        );
      };
      TwitterIcon.displayName = "TwitterIcon";
      var InstagramIcon = function InstagramIcon(props) {
        return __jsx(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            width: "24",
            height: "24",
            viewBox: "0 0 24 24",
          },
          __jsx("path", {
            fill: "#0045d8",
            d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
          })
        );
      };
      InstagramIcon.displayName = "InstagramIcon";
      var SocialIconMap = {
        facebook: FacebookIcon,
        twitter: TwitterIcon,
        instagram: InstagramIcon,
        youtube: react_icons_fa__WEBPACK_IMPORTED_MODULE_1__.V2E,
        linkedin: react_icons_fa__WEBPACK_IMPORTED_MODULE_1__.ltd,
      };
      function SocialIcon(_ref) {
        var _SocialIconMap$social,
          _ref$social = _ref.social,
          social = void 0 === _ref$social ? "facebook" : _ref$social,
          className = _ref.className,
          props = (0,
          _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_2__.Z)(
            _ref,
            _excluded
          ),
          Component =
            null !== (_SocialIconMap$social = SocialIconMap[social]) &&
            void 0 !== _SocialIconMap$social
              ? _SocialIconMap$social
              : react_icons_fa__WEBPACK_IMPORTED_MODULE_1__.Am9;
        return __jsx(
          Component,
          (0,
          _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_extends_js__WEBPACK_IMPORTED_MODULE_3__.Z)(
            {
              className: (0, utils_cn__WEBPACK_IMPORTED_MODULE_4__.cn)(
                "w-8 h-8 text-brand-primary-foreground",
                className
              ),
            },
            props
          )
        );
      }
      SocialIcon.displayName = "SocialIcon";
      try {
        (SocialIcon.displayName = "SocialIcon"),
          (SocialIcon.__docgenInfo = {
            description: "",
            displayName: "SocialIcon",
            props: {
              social: {
                defaultValue: { value: "facebook" },
                description: "",
                name: "social",
                required: !1,
                type: {
                  name: "enum",
                  value: [
                    { value: '"facebook"' },
                    { value: '"instagram"' },
                    { value: '"youtube"' },
                    { value: '"linkedin"' },
                    { value: '"twitter"' },
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
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES[
              "components/ui/SocialIcons/SocialIcons.tsx#SocialIcon"
            ] = {
              docgenInfo: SocialIcon.__docgenInfo,
              name: "SocialIcon",
              path: "components/ui/SocialIcons/SocialIcons.tsx#SocialIcon",
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
