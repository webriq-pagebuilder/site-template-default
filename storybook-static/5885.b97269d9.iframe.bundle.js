"use strict";
(self.webpackChunk_webriq_pagebuilder_site_template_default =
  self.webpackChunk_webriq_pagebuilder_site_template_default || []).push([
  [5885],
  {
    "./components/ui/Checkbox/Checkbox.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, { X: () => Checkbox });
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
        utils_cn__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__("./utils/cn.ts"),
        _excluded = [
          "item",
          "variant",
          "required",
          "name",
          "label",
          "labelClass",
          "className",
          "ariaLabel",
          "onChange",
        ],
        __jsx = react__WEBPACK_IMPORTED_MODULE_0__.createElement,
        Checkbox = function Checkbox(_ref) {
          var _variants$variant,
            item = _ref.item,
            _ref$variant = _ref.variant,
            variant = void 0 === _ref$variant ? "primary" : _ref$variant,
            _ref$required = _ref.required,
            required = void 0 !== _ref$required && _ref$required,
            name = _ref.name,
            label = _ref.label,
            labelClass = _ref.labelClass,
            className = _ref.className,
            ariaLabel = _ref.ariaLabel,
            onChange = _ref.onChange,
            props = (0,
            _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_1__.Z)(
              _ref,
              _excluded
            ),
            primary = "".concat(""),
            variantClass =
              null !== (_variants$variant = { primary }[variant]) &&
              void 0 !== _variants$variant
                ? _variants$variant
                : primary;
          return __jsx(
            "label",
            {
              htmlFor: item,
              className: (0, utils_cn__WEBPACK_IMPORTED_MODULE_2__.cn)(
                "flex gap-2 items-center",
                labelClass
              ),
            },
            __jsx(
              "input",
              (0,
              _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_extends_js__WEBPACK_IMPORTED_MODULE_3__.Z)(
                {
                  "aria-label": ariaLabel || name,
                  className: (0, utils_cn__WEBPACK_IMPORTED_MODULE_2__.cn)(
                    variantClass,
                    className
                  ),
                  name,
                  type: "checkbox",
                  value: item,
                  required,
                  onChange,
                  id: item,
                },
                props
              )
            ),
            label || item
          );
        };
      Checkbox.displayName = "Checkbox";
      try {
        (Checkbox.displayName = "Checkbox"),
          (Checkbox.__docgenInfo = {
            description: "",
            displayName: "Checkbox",
            props: {
              required: {
                defaultValue: { value: "false" },
                description: "Is this required?",
                name: "required",
                required: !1,
                type: { name: "boolean" },
              },
              name: {
                defaultValue: null,
                description: "Name attribute for the checkbox element",
                name: "name",
                required: !0,
                type: { name: "string" },
              },
              ariaLabel: {
                defaultValue: null,
                description: "String value that labels an interactive element",
                name: "ariaLabel",
                required: !0,
                type: { name: "string" },
              },
              label: {
                defaultValue: null,
                description:
                  "Label for the checkbox element; defaults to the value",
                name: "label",
                required: !1,
                type: { name: "string" },
              },
              labelClass: {
                defaultValue: null,
                description: "Classname for the LABEL element",
                name: "labelClass",
                required: !1,
                type: { name: "string" },
              },
              className: {
                defaultValue: null,
                description: "Classname for the INPUT element",
                name: "className",
                required: !1,
                type: { name: "string" },
              },
              variant: {
                defaultValue: { value: "primary" },
                description: "",
                name: "variant",
                required: !1,
                type: { name: '"primary"' },
              },
              onChange: {
                defaultValue: null,
                description: "Function that runs when the checkbox changes",
                name: "onChange",
                required: !1,
                type: { name: "() => void" },
              },
              item: {
                defaultValue: null,
                description: "String value for the checkbox element",
                name: "item",
                required: !0,
                type: { name: "string" },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES[
              "components/ui/Checkbox/Checkbox.tsx#Checkbox"
            ] = {
              docgenInfo: Checkbox.__docgenInfo,
              name: "Checkbox",
              path: "components/ui/Checkbox/Checkbox.tsx#Checkbox",
            });
      } catch (__react_docgen_typescript_loader_error) {}
    },
    "./components/ui/CheckboxGroup/CheckboxGroup.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, { c: () => CheckboxGroup });
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
          "children",
          "variant",
          "className",
          "name",
          "label",
          "noLabel",
          "labelClass",
        ],
        __jsx = react__WEBPACK_IMPORTED_MODULE_0__.createElement,
        CheckboxGroup = function CheckboxGroup(_ref) {
          var _variants$variant,
            children = _ref.children,
            _ref$variant = _ref.variant,
            variant = void 0 === _ref$variant ? "primary" : _ref$variant,
            className = _ref.className,
            name = _ref.name,
            label = _ref.label,
            _ref$noLabel = _ref.noLabel,
            noLabel = void 0 !== _ref$noLabel && _ref$noLabel,
            labelClass = _ref.labelClass,
            props = (0,
            _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_1__.Z)(
              _ref,
              _excluded
            ),
            primary = "".concat("ml-2", " block"),
            variantClass =
              null !==
                (_variants$variant = {
                  primary,
                  inline: "".concat("ml-2", " flex gap-4"),
                }[variant]) && void 0 !== _variants$variant
                ? _variants$variant
                : primary;
          return __jsx(
            "div",
            null,
            !noLabel && __jsx("p", { className: labelClass }, label || name),
            __jsx(
              "div",
              (0,
              _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_extends_js__WEBPACK_IMPORTED_MODULE_2__.Z)(
                {
                  className: (0, utils_cn__WEBPACK_IMPORTED_MODULE_3__.cn)(
                    variantClass,
                    className
                  ),
                },
                props
              ),
              children
            )
          );
        };
      CheckboxGroup.displayName = "CheckboxGroup";
      try {
        (CheckboxGroup.displayName = "CheckboxGroup"),
          (CheckboxGroup.__docgenInfo = {
            description: "",
            displayName: "CheckboxGroup",
            props: {
              variant: {
                defaultValue: { value: "primary" },
                description: "",
                name: "variant",
                required: !1,
                type: {
                  name: "enum",
                  value: [{ value: '"primary"' }, { value: '"inline"' }],
                },
              },
              className: {
                defaultValue: null,
                description:
                  "Applies the class to the elements that wraps the checkboxes",
                name: "className",
                required: !1,
                type: { name: "string" },
              },
              name: {
                defaultValue: null,
                description: "",
                name: "name",
                required: !0,
                type: { name: "string" },
              },
              label: {
                defaultValue: null,
                description:
                  "Label for the checkboxes. Defaults to the name property",
                name: "label",
                required: !1,
                type: { name: "string" },
              },
              noLabel: {
                defaultValue: { value: "false" },
                description: "",
                name: "noLabel",
                required: !1,
                type: { name: "boolean" },
              },
              labelClass: {
                defaultValue: null,
                description: "",
                name: "labelClass",
                required: !1,
                type: { name: "string" },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES[
              "components/ui/CheckboxGroup/CheckboxGroup.tsx#CheckboxGroup"
            ] = {
              docgenInfo: CheckboxGroup.__docgenInfo,
              name: "CheckboxGroup",
              path: "components/ui/CheckboxGroup/CheckboxGroup.tsx#CheckboxGroup",
            });
      } catch (__react_docgen_typescript_loader_error) {}
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
    "./components/ui/FormField/FormField.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, { W: () => FormField });
      var esm_extends = __webpack_require__(
          "./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/extends.js"
        ),
        objectWithoutProperties = __webpack_require__(
          "./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"
        ),
        react = __webpack_require__(
          "./node_modules/next/dist/compiled/react/index.js"
        ),
        Checkbox = __webpack_require__("./components/ui/Checkbox/Checkbox.tsx"),
        CheckboxGroup = __webpack_require__(
          "./components/ui/CheckboxGroup/CheckboxGroup.tsx"
        ),
        InputFile = __webpack_require__("./components/ui/File/InputFile.tsx"),
        Input = __webpack_require__("./components/ui/Input/index.ts"),
        Radio = __webpack_require__("./components/ui/Radio/Radio.tsx"),
        RadioGroup = __webpack_require__(
          "./components/ui/RadioGroup/RadioGroup.tsx"
        ),
        Select = __webpack_require__("./components/ui/Select/Select.tsx"),
        Textarea = __webpack_require__("./components/ui/Textarea/Textarea.tsx"),
        _excluded = [
          "type",
          "items",
          "name",
          "label",
          "required",
          "placeholder",
          "textSize",
          "noLabel",
          "variant",
        ],
        __jsx = react.createElement,
        FormField = function FormField(_ref) {
          var type = _ref.type,
            items = _ref.items,
            name = _ref.name,
            label = _ref.label,
            required = _ref.required,
            placeholder = _ref.placeholder,
            textSize = _ref.textSize,
            noLabel = _ref.noLabel,
            variant = _ref.variant,
            props = (0, objectWithoutProperties.Z)(_ref, _excluded),
            formType = {
              inputText: "text",
              inputEmail: "email",
              inputPassword: "password",
              inputNumber: "number",
            }[type];
          switch (type) {
            case "inputRadio":
              return __jsx(
                RadioGroup.E,
                { noLabel, label, name },
                null == items
                  ? void 0
                  : items.map(function (item, index) {
                      return __jsx(
                        Radio.Y,
                        (0, esm_extends.Z)(
                          { key: item, ariaLabel: name, name, item },
                          props
                        )
                      );
                    })
              );
            case "inputSelect":
              return __jsx(
                Select.P,
                (0, esm_extends.Z)(
                  { items, label, ariaLabel: label, name, required, noLabel },
                  props
                )
              );
            case "inputCheckbox":
              return __jsx(
                CheckboxGroup.c,
                { noLabel, variant, name, label },
                null == items
                  ? void 0
                  : items.map(function (item, index) {
                      return __jsx(
                        Checkbox.X,
                        (0, esm_extends.Z)(
                          {
                            key: item,
                            label: item,
                            ariaLabel: name,
                            name,
                            item,
                          },
                          props
                        )
                      );
                    })
              );
            case "inputFile":
              return __jsx(
                InputFile.h,
                (0, esm_extends.Z)({ ariaLabel: name, name, required }, props)
              );
            case "textarea":
              return __jsx(
                Textarea.g,
                (0, esm_extends.Z)(
                  {
                    noLabel,
                    ariaLabel: null != placeholder ? placeholder : name,
                    className:
                      "w-full h-24 p-4 text-xs font-semibold leading-none bg-white rounded outline-none resize-none",
                    placeholder,
                    name,
                    required,
                    label,
                  },
                  props
                )
              );
            default:
              return __jsx(
                Input.I,
                (0, esm_extends.Z)(
                  {
                    noLabel,
                    textSize,
                    label: label || name,
                    ariaLabel: name,
                    required,
                    name,
                    placeholder,
                    type: formType,
                    variant,
                  },
                  props
                )
              );
          }
        };
      try {
        (FormField.displayName = "FormField"),
          (FormField.__docgenInfo = {
            description: "",
            displayName: "FormField",
            props: {
              type: {
                defaultValue: null,
                description: "",
                name: "type",
                required: !1,
                type: { name: "FormTypes" },
              },
              items: {
                defaultValue: null,
                description: "",
                name: "items",
                required: !1,
                type: { name: "string[]" },
              },
              variant: {
                defaultValue: null,
                description: "",
                name: "variant",
                required: !1,
                type: {
                  name: "enum",
                  value: [
                    { value: '"primary"' },
                    { value: '"outline"' },
                    { value: '"secondary"' },
                  ],
                },
              },
              name: {
                defaultValue: null,
                description: "",
                name: "name",
                required: !0,
                type: { name: "string" },
              },
              label: {
                defaultValue: null,
                description: "",
                name: "label",
                required: !1,
                type: { name: "string" },
              },
              required: {
                defaultValue: null,
                description: "",
                name: "required",
                required: !1,
                type: { name: "boolean" },
              },
              placeholder: {
                defaultValue: null,
                description: "",
                name: "placeholder",
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
              textSize: {
                defaultValue: null,
                description: "",
                name: "textSize",
                required: !1,
                type: {
                  name: "enum",
                  value: [
                    { value: '"sm"' },
                    { value: '"md"' },
                    { value: '"lg"' },
                  ],
                },
              },
              noLabel: {
                defaultValue: null,
                description: "",
                name: "noLabel",
                required: !1,
                type: { name: "boolean" },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES[
              "components/ui/FormField/FormField.tsx#FormField"
            ] = {
              docgenInfo: FormField.__docgenInfo,
              name: "FormField",
              path: "components/ui/FormField/FormField.tsx#FormField",
            });
      } catch (__react_docgen_typescript_loader_error) {}
    },
    "./components/ui/Input/Input.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, { I: () => Input });
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
          "type",
          "ariaLabel",
          "labelClass",
          "className",
          "label",
          "variant",
          "required",
          "name",
          "placeholder",
          "textSize",
          "onChange",
          "noLabel",
        ],
        __jsx = react__WEBPACK_IMPORTED_MODULE_0__.createElement,
        Input = function Input(_ref) {
          var _variants$variant,
            _ref$type = _ref.type,
            type = void 0 === _ref$type ? "text" : _ref$type,
            ariaLabel = _ref.ariaLabel,
            labelClass = _ref.labelClass,
            className = _ref.className,
            label = _ref.label,
            _ref$variant = _ref.variant,
            variant = void 0 === _ref$variant ? "primary" : _ref$variant,
            _ref$required = _ref.required,
            required = void 0 !== _ref$required && _ref$required,
            name = _ref.name,
            placeholder = _ref.placeholder,
            textSize = _ref.textSize,
            onChange = _ref.onChange,
            noLabel = _ref.noLabel,
            props = (0,
            _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_1__.Z)(
              _ref,
              _excluded
            ),
            commonStyle = "w-full rounded bg-white px-4 py-2 leading-loose",
            primary = "".concat(commonStyle),
            secondary = "".concat(
              commonStyle,
              " bg-gray-100 p-4 text-xs outline-none"
            ),
            outline = "".concat(
              commonStyle,
              "  text-xs py-3 border border-slate-300"
            ),
            text = { sm: "text-xs", nm: "text-base", lg: "text-lg" }[textSize],
            variantClass =
              null !==
                (_variants$variant = { primary, secondary, outline }[
                  variant
                ]) && void 0 !== _variants$variant
                ? _variants$variant
                : primary;
          return __jsx(
            react__WEBPACK_IMPORTED_MODULE_0__.Fragment,
            null,
            !noLabel &&
              __jsx(
                "label",
                { className: labelClass, htmlFor: name },
                label || name
              ),
            __jsx(
              "input",
              (0,
              _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_extends_js__WEBPACK_IMPORTED_MODULE_2__.Z)(
                {
                  name,
                  id: name,
                  placeholder,
                  required,
                  "aria-label": ariaLabel || name,
                  type,
                  className: (0, utils_cn__WEBPACK_IMPORTED_MODULE_3__.cn)(
                    variantClass,
                    text,
                    className
                  ),
                  onChange,
                },
                props
              )
            )
          );
        };
      try {
        (Input.displayName = "Input"),
          (Input.__docgenInfo = {
            description: "",
            displayName: "Input",
            props: {
              noLabel: {
                defaultValue: null,
                description: "Determines if the label should be displayed",
                name: "noLabel",
                required: !1,
                type: { name: "boolean" },
              },
              label: {
                defaultValue: null,
                description: "Display label text",
                name: "label",
                required: !1,
                type: { name: "string" },
              },
              ariaLabel: {
                defaultValue: null,
                description:
                  "A string value that labels an interactive element",
                name: "ariaLabel",
                required: !0,
                type: { name: "string" },
              },
              required: {
                defaultValue: { value: "false" },
                description: "Is the input field required?",
                name: "required",
                required: !1,
                type: { name: "boolean" },
              },
              name: {
                defaultValue: null,
                description: "Html name for the input field",
                name: "name",
                required: !0,
                type: { name: "string" },
              },
              labelClass: {
                defaultValue: null,
                description: "Classname for the label element",
                name: "labelClass",
                required: !1,
                type: { name: "string" },
              },
              className: {
                defaultValue: null,
                description: "Classname for the input element",
                name: "className",
                required: !1,
                type: { name: "string" },
              },
              placeholder: {
                defaultValue: null,
                description: "",
                name: "placeholder",
                required: !1,
                type: { name: "string" },
              },
              type: {
                defaultValue: { value: "text" },
                description: "",
                name: "type",
                required: !1,
                type: {
                  name: "enum",
                  value: [
                    { value: '"number"' },
                    { value: '"password"' },
                    { value: '"email"' },
                    { value: '"text"' },
                  ],
                },
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
                  ],
                },
              },
              onChange: {
                defaultValue: null,
                description: "Function that runs when an input value change",
                name: "onChange",
                required: !1,
                type: { name: "() => void" },
              },
              textSize: {
                defaultValue: null,
                description: "",
                name: "textSize",
                required: !1,
                type: {
                  name: "enum",
                  value: [
                    { value: '"sm"' },
                    { value: '"md"' },
                    { value: '"lg"' },
                  ],
                },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["components/ui/Input/Input.tsx#Input"] = {
              docgenInfo: Input.__docgenInfo,
              name: "Input",
              path: "components/ui/Input/Input.tsx#Input",
            });
      } catch (__react_docgen_typescript_loader_error) {}
    },
    "./components/ui/Input/index.ts": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, {
        I: () => _Input__WEBPACK_IMPORTED_MODULE_0__.I,
      });
      var _Input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        "./components/ui/Input/Input.tsx"
      );
    },
    "./components/ui/Radio/Radio.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, { Y: () => Radio });
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
        utils_cn__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__("./utils/cn.ts"),
        _excluded = [
          "className",
          "variant",
          "name",
          "ariaLabel",
          "labelClass",
          "item",
          "onChange",
        ],
        __jsx = react__WEBPACK_IMPORTED_MODULE_0__.createElement,
        Radio = function Radio(_ref) {
          var _variants$variant,
            className = _ref.className,
            _ref$variant = _ref.variant,
            variant = void 0 === _ref$variant ? "primary" : _ref$variant,
            name = _ref.name,
            ariaLabel = _ref.ariaLabel,
            labelClass = _ref.labelClass,
            item = _ref.item,
            onChange = _ref.onChange,
            props = (0,
            _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_1__.Z)(
              _ref,
              _excluded
            ),
            primary = "".concat(""),
            variantClass =
              null !== (_variants$variant = { primary }[variant]) &&
              void 0 !== _variants$variant
                ? _variants$variant
                : primary;
          return __jsx(
            "label",
            {
              htmlFor: item,
              className: (0, utils_cn__WEBPACK_IMPORTED_MODULE_2__.cn)(
                "flex items-center gap-2",
                labelClass
              ),
            },
            __jsx(
              "input",
              (0,
              _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_extends_js__WEBPACK_IMPORTED_MODULE_3__.Z)(
                {
                  onChange,
                  className: (0, utils_cn__WEBPACK_IMPORTED_MODULE_2__.cn)(
                    variantClass,
                    className
                  ),
                  name,
                  value: item,
                  type: "radio",
                  "aria-label": ariaLabel || name,
                  id: item,
                },
                props
              )
            ),
            item
          );
        };
      Radio.displayName = "Radio";
      try {
        (Radio.displayName = "Radio"),
          (Radio.__docgenInfo = {
            description: "",
            displayName: "Radio",
            props: {
              className: {
                defaultValue: null,
                description: "Classname for the input element",
                name: "className",
                required: !1,
                type: { name: "string" },
              },
              name: {
                defaultValue: null,
                description: "Html name for the input element",
                name: "name",
                required: !0,
                type: { name: "string" },
              },
              ariaLabel: {
                defaultValue: null,
                description: "String value that labels an interactive element",
                name: "ariaLabel",
                required: !0,
                type: { name: "string" },
              },
              variant: {
                defaultValue: { value: "primary" },
                description: "",
                name: "variant",
                required: !1,
                type: { name: '"primary"' },
              },
              item: {
                defaultValue: null,
                description: "String value of input element",
                name: "item",
                required: !0,
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
                description: "Function that runs when an input value changes",
                name: "onChange",
                required: !1,
                type: { name: "() => void" },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["components/ui/Radio/Radio.tsx#Radio"] = {
              docgenInfo: Radio.__docgenInfo,
              name: "Radio",
              path: "components/ui/Radio/Radio.tsx#Radio",
            });
      } catch (__react_docgen_typescript_loader_error) {}
    },
    "./components/ui/RadioGroup/RadioGroup.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, { E: () => RadioGroup });
      var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          "./node_modules/next/dist/compiled/react/index.js"
        ),
        utils_cn__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__("./utils/cn.ts"),
        __jsx = react__WEBPACK_IMPORTED_MODULE_0__.createElement,
        RadioGroup = function RadioGroup(_ref) {
          var _variants$variant,
            children = _ref.children,
            _ref$variant = _ref.variant,
            variant = void 0 === _ref$variant ? "primary" : _ref$variant,
            name = _ref.name,
            className = _ref.className,
            labelClass = _ref.labelClass,
            label = _ref.label,
            _ref$noLabel = _ref.noLabel,
            noLabel = void 0 !== _ref$noLabel && _ref$noLabel,
            primary = "".concat("ml-2"),
            variantClass =
              null !==
                (_variants$variant = {
                  primary,
                  inline: "".concat("ml-2", " flex items-center gap-2"),
                }[variant]) && void 0 !== _variants$variant
                ? _variants$variant
                : primary;
          return __jsx(
            "div",
            null,
            !noLabel && __jsx("p", { className: labelClass }, label || name),
            __jsx(
              "div",
              {
                className: (0, utils_cn__WEBPACK_IMPORTED_MODULE_1__.cn)(
                  variantClass,
                  className
                ),
              },
              children
            )
          );
        };
      RadioGroup.displayName = "RadioGroup";
      try {
        (RadioGroup.displayName = "RadioGroup"),
          (RadioGroup.__docgenInfo = {
            description: "",
            displayName: "RadioGroup",
            props: {
              variant: {
                defaultValue: { value: "primary" },
                description: "",
                name: "variant",
                required: !1,
                type: {
                  name: "enum",
                  value: [{ value: '"primary"' }, { value: '"inline"' }],
                },
              },
              className: {
                defaultValue: null,
                description: "",
                name: "className",
                required: !1,
                type: { name: "string" },
              },
              label: {
                defaultValue: null,
                description: "",
                name: "label",
                required: !1,
                type: { name: "string" },
              },
              name: {
                defaultValue: null,
                description: "",
                name: "name",
                required: !0,
                type: { name: "string" },
              },
              labelClass: {
                defaultValue: null,
                description: "",
                name: "labelClass",
                required: !1,
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
            (STORYBOOK_REACT_CLASSES[
              "components/ui/RadioGroup/RadioGroup.tsx#RadioGroup"
            ] = {
              docgenInfo: RadioGroup.__docgenInfo,
              name: "RadioGroup",
              path: "components/ui/RadioGroup/RadioGroup.tsx#RadioGroup",
            });
      } catch (__react_docgen_typescript_loader_error) {}
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
    "./components/ui/Textarea/Textarea.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, { g: () => Textarea });
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
          "labelClass",
          "name",
          "label",
          "placeholder",
          "required",
          "ariaLabel",
          "onChange",
          "noLabel",
        ],
        __jsx = react__WEBPACK_IMPORTED_MODULE_0__.createElement,
        Textarea = function Textarea(_ref) {
          var _variants$variant,
            className = _ref.className,
            _ref$variant = _ref.variant,
            variant = void 0 === _ref$variant ? "primary" : _ref$variant,
            labelClass = _ref.labelClass,
            name = _ref.name,
            label = _ref.label,
            placeholder = _ref.placeholder,
            _ref$required = _ref.required,
            required = void 0 !== _ref$required && _ref$required,
            ariaLabel = _ref.ariaLabel,
            onChange = _ref.onChange,
            _ref$noLabel = _ref.noLabel,
            noLabel = void 0 !== _ref$noLabel && _ref$noLabel,
            props = (0,
            _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_1__.Z)(
              _ref,
              _excluded
            ),
            commonStyle =
              "h-24 w-full resize-none rounded bg-white p-4 text-xs font-semibold leading-none",
            primary = "".concat(commonStyle),
            secondary = "".concat(
              commonStyle,
              " bg-gray-100 p-4 text-xs outline-none"
            ),
            variantClass =
              null !==
                (_variants$variant = {
                  primary,
                  outline: "".concat(
                    commonStyle,
                    "  text-xs py-3 border border-slate-300"
                  ),
                  secondary,
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
              "textarea",
              (0,
              _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_extends_js__WEBPACK_IMPORTED_MODULE_2__.Z)(
                {
                  onChange,
                  "aria-label": ariaLabel || name,
                  className: (0, utils_cn__WEBPACK_IMPORTED_MODULE_3__.cn)(
                    variantClass,
                    className
                  ),
                  placeholder,
                  name,
                  required,
                  id: name,
                },
                props
              )
            )
          );
        };
      try {
        (Textarea.displayName = "Textarea"),
          (Textarea.__docgenInfo = {
            description: "",
            displayName: "Textarea",
            props: {
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
              placeholder: {
                defaultValue: null,
                description: "",
                name: "placeholder",
                required: !1,
                type: { name: "string" },
              },
              onChange: {
                defaultValue: null,
                description: "",
                name: "onChange",
                required: !1,
                type: { name: "(...args: any) => any" },
              },
              labelClass: {
                defaultValue: null,
                description: "",
                name: "labelClass",
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
                  ],
                },
              },
              label: {
                defaultValue: null,
                description: "",
                name: "label",
                required: !1,
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
            (STORYBOOK_REACT_CLASSES[
              "components/ui/Textarea/Textarea.tsx#Textarea"
            ] = {
              docgenInfo: Textarea.__docgenInfo,
              name: "Textarea",
              path: "components/ui/Textarea/Textarea.tsx#Textarea",
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
