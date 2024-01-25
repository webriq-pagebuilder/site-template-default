"use strict";
(self.webpackChunk_webriq_pagebuilder_site_template_default =
  self.webpackChunk_webriq_pagebuilder_site_template_default || []).push([
  [3564],
  {
    "./components/ui/BlockStyle/Blockstyle.stories.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          CustomBlockStyle: () => CustomBlockStyle,
          Primary: () => Primary,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => Blockstyle_stories,
        });
      var react = __webpack_require__(
          "./node_modules/next/dist/compiled/react/index.js"
        ),
        sanity = __webpack_require__("./lib/sanity.ts");
      const portable_value_namespaceObject = JSON.parse(
        '{"S":[{"_key":"b94b23c4e304","markDefs":[],"children":[{"_type":"span","marks":[],"text":"HEADING 1","_key":"5494ced50fc2"}],"_type":"block","style":"h1"},{"children":[{"_type":"span","marks":[],"text":"HEADING 2","_key":"04166d6b0eb6"}],"_type":"block","style":"h2","_key":"4b017195514c","markDefs":[]},{"markDefs":[],"children":[{"marks":[],"text":"HEADING 3","_key":"e9eb014b1616","_type":"span"}],"_type":"block","style":"h3","_key":"2ac1eb7bbbf6"},{"children":[{"_type":"span","marks":[],"text":"HEADING 4","_key":"09bd3ccdf332"}],"_type":"block","style":"h4","_key":"2f86bde6d252","markDefs":[]},{"style":"h5","_key":"46387bc8682c","markDefs":[],"children":[{"_type":"span","marks":[],"text":"HEADING 5","_key":"15c6e8ff67c8"}],"_type":"block"},{"style":"h6","_key":"b39d7b6c3900","markDefs":[],"children":[{"text":"HEADING 6","_key":"c9fc5e943dfc","_type":"span","marks":[]}],"_type":"block"},{"markDefs":[],"children":[{"_key":"2ed46e54ea89","_type":"span","marks":[],"text":"QUOTE"}],"_type":"block","style":"blockquote","_key":"f09fda873227"},{"children":[{"marks":[],"text":"NORMAL","_key":"0d401d5e6510","_type":"span"}],"_type":"block","style":"normal","_key":"46a3eb0ac47d","markDefs":[]},{"children":[{"_type":"span","marks":["strong"],"text":"BOLD","_key":"a3e1e4cadd67"}],"_type":"block","style":"normal","_key":"54377c5ac879","markDefs":[]},{"_type":"block","style":"normal","_key":"b7ee435f763c","markDefs":[],"children":[{"text":"ITALIC","_key":"d6898cb42ada","_type":"span","marks":["em"]}]},{"markDefs":[],"children":[{"text":"CODE","_key":"bb704cdff8f5","_type":"span","marks":["code"]}],"_type":"block","style":"normal","_key":"90575d415a73"},{"markDefs":[],"children":[{"_type":"span","marks":["underline"],"text":"UNDERLINE","_key":"b8200a2ce28b"}],"_type":"block","style":"normal","_key":"7cc2fe9cfd36"},{"children":[{"marks":["strike-through"],"text":"STRIKE","_key":"f4be00bc0984","_type":"span"}],"_type":"block","style":"normal","_key":"4dbccbf5b121","markDefs":[]},{"markDefs":[],"children":[{"_type":"span","marks":[],"text":"BULLET 1","_key":"547d38c15232"}],"level":1,"_type":"block","style":"normal","_key":"df585340f944","listItem":"bullet"},{"level":1,"_type":"block","style":"normal","_key":"795b4744df1d","listItem":"bullet","markDefs":[],"children":[{"_type":"span","marks":[],"text":"BULLET 2","_key":"1d77a36a0023"}]},{"_type":"block","style":"normal","_key":"86ad1caf3c48","listItem":"number","markDefs":[],"children":[{"_type":"span","marks":[],"text":"NUMBERED 1","_key":"5e31dba7c689"}],"level":1},{"level":1,"_type":"block","style":"normal","_key":"30ff76de2154","listItem":"number","markDefs":[],"children":[{"_type":"span","marks":[],"text":"NUMBERED 2","_key":"c8e5dcc01af6"}]},{"markDefs":[{"_type":"link","href":"webriq.com","_key":"caac08e48bec"}],"children":[{"_type":"span","marks":["caac08e48bec"],"text":"LINK","_key":"a886d6f6a3b1"}],"_type":"block","style":"normal","_key":"6bf02f510dc2"}]}'
      );
      var helper = __webpack_require__("./helper/index.tsx"),
        cjs = __webpack_require__("./node_modules/deepmerge/dist/cjs.js"),
        cjs_default = __webpack_require__.n(cjs),
        __jsx = react.createElement;
      const Blockstyle_stories = {
        title: "Components/UI/Blockstyle",
        component: sanity.YI,
        args: {
          value: portable_value_namespaceObject.S,
          components: helper.Dt,
        },
      };
      var Primary = {},
        myBlock = {
          block: {
            h1: function h1(_ref) {
              var children = _ref.children;
              return __jsx(
                "h1",
                {
                  className:
                    "mb-0 font-extrabold text-black-500 text-4xl text-brand-primary-foreground",
                },
                children
              );
            },
            h2: function h2(_ref2) {
              var children = _ref2.children;
              return __jsx(
                "h1",
                {
                  className:
                    "mb-0 font-extrabold text-black-500 text-3xl text-brand-primary-foreground",
                },
                children
              );
            },
            h3: function h3(_ref3) {
              var children = _ref3.children;
              return __jsx(
                "h1",
                {
                  className:
                    "mb-0 font-extrabold text-black-500 text-2xl text-brand-primary-foreground",
                },
                children
              );
            },
            h4: function h4(_ref4) {
              var children = _ref4.children;
              return __jsx(
                "h1",
                {
                  className:
                    "mb-0 font-extrabold text-black-500 text-xl text-brand-primary-foreground",
                },
                children
              );
            },
          },
        },
        CustomBlockStyle = {
          args: { components: cjs_default()(helper.Dt, myBlock) },
        };
      (Primary.parameters = {
        ...Primary.parameters,
        docs: {
          ...Primary.parameters?.docs,
          source: { originalSource: "{}", ...Primary.parameters?.docs?.source },
        },
      }),
        (CustomBlockStyle.parameters = {
          ...CustomBlockStyle.parameters,
          docs: {
            ...CustomBlockStyle.parameters?.docs,
            source: {
              originalSource: "{\n  args: {\n    components: newBlock\n  }\n}",
              ...CustomBlockStyle.parameters?.docs?.source,
            },
          },
        });
      const __namedExportsOrder = ["Primary", "CustomBlockStyle"];
    },
    "./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/defineProperty.js":
      (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        __webpack_require__.d(__webpack_exports__, {
          Z: () => _defineProperty,
        });
        var _toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            "./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/toPropertyKey.js"
          );
        function _defineProperty(obj, key, value) {
          return (
            (key = (0, _toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__.Z)(
              key
            )) in obj
              ? Object.defineProperty(obj, key, {
                  value,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (obj[key] = value),
            obj
          );
        }
      },
    "./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/toPropertyKey.js":
      (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        __webpack_require__.d(__webpack_exports__, { Z: () => toPropertyKey });
        var esm_typeof = __webpack_require__(
          "./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/typeof.js"
        );
        function toPropertyKey(t) {
          var i = (function toPrimitive(t, r) {
            if ("object" != (0, esm_typeof.Z)(t) || !t) return t;
            var e = t[Symbol.toPrimitive];
            if (void 0 !== e) {
              var i = e.call(t, r || "default");
              if ("object" != (0, esm_typeof.Z)(i)) return i;
              throw new TypeError(
                "@@toPrimitive must return a primitive value."
              );
            }
            return ("string" === r ? String : Number)(t);
          })(t, "string");
          return "symbol" == (0, esm_typeof.Z)(i) ? i : String(i);
        }
      },
    "./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/typeof.js":
      (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        function _typeof(o) {
          return (
            (_typeof =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (o) {
                    return typeof o;
                  }
                : function (o) {
                    return o &&
                      "function" == typeof Symbol &&
                      o.constructor === Symbol &&
                      o !== Symbol.prototype
                      ? "symbol"
                      : typeof o;
                  }),
            _typeof(o)
          );
        }
        __webpack_require__.d(__webpack_exports__, { Z: () => _typeof });
      },
    "./helper/index.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, {
        Dt: () => defaultBlockStyle,
        MT: () => ConditionalLink,
        W6: () => thankYouPageLink,
        oQ: () => logoLink,
      });
      var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          "./node_modules/next/dist/compiled/react/index.js"
        ),
        next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          "./node_modules/next/link.js"
        ),
        next_link__WEBPACK_IMPORTED_MODULE_1___default = __webpack_require__.n(
          next_link__WEBPACK_IMPORTED_MODULE_1__
        ),
        next_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          "./node_modules/@storybook/nextjs/dist/images/next-image.mjs"
        ),
        lib_sanity__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__("./lib/sanity.ts"),
        __jsx = react__WEBPACK_IMPORTED_MODULE_0__.createElement,
        thankYouPageLink = function thankYouPageLink(link) {
          return link
            ? "linkInternal" === (null == link ? void 0 : link.linkType)
              ? "/".concat(null == link ? void 0 : link.internalLink)
              : null == link
              ? void 0
              : link.externalLink
            : "/thank-you";
        },
        logoLink = function logoLink(logo) {
          var _logo$internalLink, _logo$externalLink;
          return null != logo &&
            logo.internalLink &&
            "linkInternal" === (null == logo ? void 0 : logo.type)
            ? null != logo &&
              null !== (_logo$internalLink = logo.internalLink) &&
              void 0 !== _logo$internalLink &&
              null !==
                (_logo$internalLink = _logo$internalLink.toLowerCase()) &&
              void 0 !== _logo$internalLink &&
              _logo$internalLink.includes("home")
              ? "/"
              : "/".concat(logo.internalLink)
            : null != logo &&
              logo.externalLink &&
              "linkExternal" === (null == logo ? void 0 : logo.type) &&
              null !==
                (_logo$externalLink =
                  null == logo ? void 0 : logo.externalLink) &&
              void 0 !== _logo$externalLink
            ? _logo$externalLink
            : "/";
        },
        ConditionalLink = function ConditionalLink(_ref) {
          var _link$internalLink,
            className = _ref.className,
            ariaLabel = _ref.ariaLabel,
            children = (_ref.style, _ref.children),
            link = _ref.link,
            target = _ref.target,
            defaultStyle =
              "inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-brand-primary hover:bg-brand-primary-foreground text-gray-50 font-bold leading-loose outline-none transition duration-200";
          return (null != link && link.internalLink) ||
            (null != link && link.externalLink)
            ? "linkInternal" === (null == link ? void 0 : link.type) &&
              null != link &&
              null !== (_link$internalLink = link.internalLink) &&
              void 0 !== _link$internalLink &&
              null !==
                (_link$internalLink = _link$internalLink.toLowerCase()) &&
              void 0 !== _link$internalLink &&
              _link$internalLink.includes("home")
              ? __jsx(
                  next_link__WEBPACK_IMPORTED_MODULE_1___default(),
                  {
                    href: "/",
                    "aria-label": ariaLabel,
                    className: null != className ? className : defaultStyle,
                    target,
                  },
                  children
                )
              : "linkInternal" === (null == link ? void 0 : link.type)
              ? __jsx(
                  next_link__WEBPACK_IMPORTED_MODULE_1___default(),
                  {
                    href: "/".concat(null == link ? void 0 : link.internalLink),
                    "aria-label": ariaLabel,
                    className: null != className ? className : defaultStyle,
                    target,
                  },
                  children
                )
              : "linkExternal" === (null == link ? void 0 : link.type)
              ? __jsx(
                  "a",
                  {
                    "aria-label": ariaLabel,
                    className: null != className ? className : defaultStyle,
                    href: null == link ? void 0 : link.externalLink,
                    target,
                    rel:
                      "_blank" === (null == link ? void 0 : link.linkTarget)
                        ? "noopener noreferrer"
                        : null,
                  },
                  children
                )
              : __jsx(
                  next_link__WEBPACK_IMPORTED_MODULE_1___default(),
                  {
                    href: "/",
                    "aria-label": ariaLabel,
                    className: null != className ? className : defaultStyle,
                    target,
                  },
                  children
                )
            : __jsx(
                "a",
                {
                  className: null != className ? className : defaultStyle,
                  "aria-label": ariaLabel,
                  target,
                  href: "/page-not-found",
                },
                children
              );
        },
        defaultBlockStyle = {
          block: {
            h1: function h1(_ref2) {
              var children = _ref2.children;
              return __jsx(
                "h1",
                { className: "mb-6 text-7xl leading-loose text-gray-900" },
                children
              );
            },
            h2: function h2(_ref3) {
              var children = _ref3.children;
              return __jsx(
                "h2",
                { className: "mb-6 text-5xl leading-loose text-gray-900" },
                children
              );
            },
            h3: function h3(_ref4) {
              var children = _ref4.children;
              return __jsx(
                "h3",
                { className: "mb-6 text-3xl leading-loose text-gray-900" },
                children
              );
            },
            h4: function h4(_ref5) {
              var children = _ref5.children;
              return __jsx(
                "h4",
                { className: "mb-6 text-xl leading-loose text-gray-900" },
                children
              );
            },
            normal: function normal(_ref6) {
              var children = _ref6.children;
              return __jsx(
                "p",
                { className: "mb-6 text-justify leading-loose text-gray-900" },
                children
              );
            },
            blockquote: function blockquote(_ref7) {
              var children = _ref7.children;
              return __jsx(
                "blockquote",
                { className: "mb-6 px-14 italic leading-loose text-gray-500" },
                "- ",
                children
              );
            },
          },
          code: function code(_ref8) {
            var value = _ref8.value;
            return __jsx(
              "pre",
              { "data-language": value.language },
              __jsx("code", null, value.code)
            );
          },
          list: {
            bullet: function bullet(_ref9) {
              var children = _ref9.children;
              return __jsx(
                "ul",
                {
                  className: "mb-6 list-disc pl-10 leading-loose text-gray-900",
                },
                children
              );
            },
            number: function number(_ref10) {
              var children = _ref10.children;
              return __jsx(
                "ol",
                { className: "mb-6 list-decimal leading-loose text-gray-900" },
                children
              );
            },
          },
          listItem: {
            bullet: function bullet(_ref11) {
              var children = _ref11.children;
              return __jsx(
                "li",
                { className: "mb-6 leading-loose text-gray-900" },
                children
              );
            },
          },
          marks: {
            strong: function strong(_ref12) {
              var children = _ref12.children;
              return __jsx("strong", null, children);
            },
            em: function em(_ref13) {
              var children = _ref13.children;
              return __jsx("em", null, children);
            },
            code: function code(_ref14) {
              var children = _ref14.children;
              return __jsx("code", null, children);
            },
            link: function link(_ref15) {
              var children = _ref15.children,
                value = _ref15.value;
              return __jsx(
                "a",
                {
                  className:
                    "hover:text-brand-primary-foreground text-brand-primary",
                  href: value.href,
                  target: "_blank",
                  rel: "noopener noreferrer",
                },
                children
              );
            },
          },
          types: {
            addImage: function addImage(_ref16) {
              var _value$alt,
                _value$image,
                value = _ref16.value;
              return __jsx(next_image__WEBPACK_IMPORTED_MODULE_2__.Z, {
                className: "mb-5 h-full w-full",
                width: 500,
                height: 500,
                sizes:
                  "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
                src: (0, lib_sanity__WEBPACK_IMPORTED_MODULE_3__.uH)(
                  null == value ? void 0 : value.image
                ),
                alt:
                  null !== (_value$alt = null == value ? void 0 : value.alt) &&
                  void 0 !== _value$alt
                    ? _value$alt
                    : null == value ||
                      null === (_value$image = value.image) ||
                      void 0 === _value$image ||
                      null === (_value$image = _value$image.asset) ||
                      void 0 === _value$image
                    ? void 0
                    : _value$image._ref,
              });
            },
          },
        };
      try {
        (thankYouPageLink.displayName = "thankYouPageLink"),
          (thankYouPageLink.__docgenInfo = {
            description: "",
            displayName: "thankYouPageLink",
            props: {},
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["helper/index.tsx#thankYouPageLink"] = {
              docgenInfo: thankYouPageLink.__docgenInfo,
              name: "thankYouPageLink",
              path: "helper/index.tsx#thankYouPageLink",
            });
      } catch (__react_docgen_typescript_loader_error) {}
      try {
        (logoLink.displayName = "logoLink"),
          (logoLink.__docgenInfo = {
            description: "",
            displayName: "logoLink",
            props: {},
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["helper/index.tsx#logoLink"] = {
              docgenInfo: logoLink.__docgenInfo,
              name: "logoLink",
              path: "helper/index.tsx#logoLink",
            });
      } catch (__react_docgen_typescript_loader_error) {}
      try {
        (ConditionalLink.displayName = "ConditionalLink"),
          (ConditionalLink.__docgenInfo = {
            description: "",
            displayName: "ConditionalLink",
            props: {
              className: {
                defaultValue: null,
                description: "",
                name: "className",
                required: !1,
                type: { name: "string" },
              },
              ariaLabel: {
                defaultValue: null,
                description: "",
                name: "ariaLabel",
                required: !0,
                type: { name: "string" },
              },
              style: {
                defaultValue: { value: "{}" },
                description: "",
                name: "style",
                required: !1,
                type: { name: "any" },
              },
              link: {
                defaultValue: null,
                description: "",
                name: "link",
                required: !0,
                type: { name: "any" },
              },
              target: {
                defaultValue: null,
                description: "",
                name: "target",
                required: !1,
                type: { name: "string" },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["helper/index.tsx#ConditionalLink"] = {
              docgenInfo: ConditionalLink.__docgenInfo,
              name: "ConditionalLink",
              path: "helper/index.tsx#ConditionalLink",
            });
      } catch (__react_docgen_typescript_loader_error) {}
    },
    "./lib/config.ts": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, { v: () => config });
      var _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ =
        __webpack_require__(
          "./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/defineProperty.js"
        );
      function ownKeys(e, r) {
        var t = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var o = Object.getOwnPropertySymbols(e);
          r &&
            (o = o.filter(function (r) {
              return Object.getOwnPropertyDescriptor(e, r).enumerable;
            })),
            t.push.apply(t, o);
        }
        return t;
      }
      function _objectSpread(e) {
        for (var r = 1; r < arguments.length; r++) {
          var t = null != arguments[r] ? arguments[r] : {};
          r % 2
            ? ownKeys(Object(t), !0).forEach(function (r) {
                (0,
                _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__.Z)(
                  e,
                  r,
                  t[r]
                );
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t))
            : ownKeys(Object(t)).forEach(function (r) {
                Object.defineProperty(
                  e,
                  r,
                  Object.getOwnPropertyDescriptor(t, r)
                );
              });
        }
        return e;
      }
      var config = {
        dataset: "staging",
        projectId: "9itgab5x",
        useCdn: "undefined" != typeof document && !0,
        apiVersion: "2022-03-13",
      };
      config = _objectSpread(
        _objectSpread({}, config),
        {},
        {
          token:
            "skr8WZ2B2tm4HerKBsoY6D5n1bLIPcHsvSbfj6MbmSkctoqznf2e8MGsymGKeoalP8v09S0OYV5N8hjVpqstE35EoU1K5u0sE7aTWKlB4Rk42KmCm6Rijuwj6u9z4VPISFDDKe5yLoJbLE6maUkrCzLV2SiG9Vm3MY7g3Qus50nwlmoq9jms",
        }
      );
    },
    "./lib/sanity.ts": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, {
        YI: () => _portabletext_react__WEBPACK_IMPORTED_MODULE_3__.YI,
        uH: () => urlFor,
      });
      var _sanity_image_url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          "./node_modules/@sanity/image-url/lib/browser/image-url.umd.js"
        ),
        _sanity_image_url__WEBPACK_IMPORTED_MODULE_1___default =
          __webpack_require__.n(_sanity_image_url__WEBPACK_IMPORTED_MODULE_1__),
        _portabletext_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          "./node_modules/@portabletext/react/dist/react-portable-text.esm.js"
        ),
        next_sanity_preview__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          "./node_modules/@sanity/preview-kit/dist/index.js"
        ),
        _config__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__("./lib/config.ts"),
        imageBuilder = _sanity_image_url__WEBPACK_IMPORTED_MODULE_1___default()(
          _config__WEBPACK_IMPORTED_MODULE_0__.v
        ),
        urlFor = function urlFor(source) {
          var _imageBuilder$image$f;
          return (
            (null == source ? void 0 : source.asset) &&
            (null ===
              (_imageBuilder$image$f = imageBuilder
                .image(source)
                .format("webp")) || void 0 === _imageBuilder$image$f
              ? void 0
              : _imageBuilder$image$f.url())
          );
        };
      (0, next_sanity_preview__WEBPACK_IMPORTED_MODULE_2__.R2)(
        _config__WEBPACK_IMPORTED_MODULE_0__.v
      );
    },
    "./node_modules/deepmerge/dist/cjs.js": (module) => {
      var isMergeableObject = function isMergeableObject(value) {
        return (
          (function isNonNullObject(value) {
            return !!value && "object" == typeof value;
          })(value) &&
          !(function isSpecial(value) {
            var stringValue = Object.prototype.toString.call(value);
            return (
              "[object RegExp]" === stringValue ||
              "[object Date]" === stringValue ||
              (function isReactElement(value) {
                return value.$$typeof === REACT_ELEMENT_TYPE;
              })(value)
            );
          })(value)
        );
      };
      var REACT_ELEMENT_TYPE =
        "function" == typeof Symbol && Symbol.for
          ? Symbol.for("react.element")
          : 60103;
      function cloneUnlessOtherwiseSpecified(value, options) {
        return !1 !== options.clone && options.isMergeableObject(value)
          ? deepmerge(
              (function emptyTarget(val) {
                return Array.isArray(val) ? [] : {};
              })(value),
              value,
              options
            )
          : value;
      }
      function defaultArrayMerge(target, source, options) {
        return target.concat(source).map(function (element) {
          return cloneUnlessOtherwiseSpecified(element, options);
        });
      }
      function getKeys(target) {
        return Object.keys(target).concat(
          (function getEnumerableOwnPropertySymbols(target) {
            return Object.getOwnPropertySymbols
              ? Object.getOwnPropertySymbols(target).filter(function (symbol) {
                  return Object.propertyIsEnumerable.call(target, symbol);
                })
              : [];
          })(target)
        );
      }
      function propertyIsOnObject(object, property) {
        try {
          return property in object;
        } catch (_) {
          return !1;
        }
      }
      function mergeObject(target, source, options) {
        var destination = {};
        return (
          options.isMergeableObject(target) &&
            getKeys(target).forEach(function (key) {
              destination[key] = cloneUnlessOtherwiseSpecified(
                target[key],
                options
              );
            }),
          getKeys(source).forEach(function (key) {
            (function propertyIsUnsafe(target, key) {
              return (
                propertyIsOnObject(target, key) &&
                !(
                  Object.hasOwnProperty.call(target, key) &&
                  Object.propertyIsEnumerable.call(target, key)
                )
              );
            })(target, key) ||
              (propertyIsOnObject(target, key) &&
              options.isMergeableObject(source[key])
                ? (destination[key] = (function getMergeFunction(key, options) {
                    if (!options.customMerge) return deepmerge;
                    var customMerge = options.customMerge(key);
                    return "function" == typeof customMerge
                      ? customMerge
                      : deepmerge;
                  })(key, options)(target[key], source[key], options))
                : (destination[key] = cloneUnlessOtherwiseSpecified(
                    source[key],
                    options
                  )));
          }),
          destination
        );
      }
      function deepmerge(target, source, options) {
        ((options = options || {}).arrayMerge =
          options.arrayMerge || defaultArrayMerge),
          (options.isMergeableObject =
            options.isMergeableObject || isMergeableObject),
          (options.cloneUnlessOtherwiseSpecified =
            cloneUnlessOtherwiseSpecified);
        var sourceIsArray = Array.isArray(source);
        return sourceIsArray === Array.isArray(target)
          ? sourceIsArray
            ? options.arrayMerge(target, source, options)
            : mergeObject(target, source, options)
          : cloneUnlessOtherwiseSpecified(source, options);
      }
      deepmerge.all = function deepmergeAll(array, options) {
        if (!Array.isArray(array))
          throw new Error("first argument should be an array");
        return array.reduce(function (prev, next) {
          return deepmerge(prev, next, options);
        }, {});
      };
      var deepmerge_1 = deepmerge;
      module.exports = deepmerge_1;
    },
  },
]);
