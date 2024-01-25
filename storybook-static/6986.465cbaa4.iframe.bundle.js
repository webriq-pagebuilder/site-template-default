(self.webpackChunk_webriq_pagebuilder_site_template_default =
  self.webpackChunk_webriq_pagebuilder_site_template_default || []).push([
  [6986],
  {
    "./components/sections/navigation/variant_e.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      "use strict";
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          default: () => variant_e,
        });
      var react = __webpack_require__(
          "./node_modules/next/dist/compiled/react/index.js"
        ),
        next_image = __webpack_require__(
          "./node_modules/@storybook/nextjs/dist/images/next-image.mjs"
        ),
        next_link = __webpack_require__("./node_modules/next/link.js"),
        link_default = __webpack_require__.n(next_link),
        next_router = __webpack_require__("./node_modules/next/router.js"),
        sanity = __webpack_require__("./lib/sanity.ts"),
        asyncToGenerator = __webpack_require__(
          "./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js"
        ),
        defineProperty = __webpack_require__(
          "./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/defineProperty.js"
        ),
        regenerator = __webpack_require__(
          "./node_modules/@storybook/nextjs/node_modules/@babel/runtime/regenerator/index.js"
        ),
        regenerator_default = __webpack_require__.n(regenerator),
        react_toast_esm = __webpack_require__(
          "./node_modules/react-toast/dist/react-toast.esm.js"
        ),
        dist = __webpack_require__("./node_modules/next-sanity/dist/index.js"),
        config = __webpack_require__("./lib/config.ts");
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
                (0, defineProperty.Z)(e, r, t[r]);
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
      (0, dist.e)(config.v);
      var sanityClient = (0, dist.e)(config.v);
      (0, dist.e)(
        _objectSpread(
          _objectSpread({}, config.v),
          {},
          {
            useCdn: !1,
            token:
              "skr8WZ2B2tm4HerKBsoY6D5n1bLIPcHsvSbfj6MbmSkctoqznf2e8MGsymGKeoalP8v09S0OYV5N8hjVpqstE35EoU1K5u0sE7aTWKlB4Rk42KmCm6Rijuwj6u9z4VPISFDDKe5yLoJbLE6maUkrCzLV2SiG9Vm3MY7g3Qus50nwlmoq9jms",
          }
        )
      );
      var lodash = __webpack_require__("./node_modules/lodash/lodash.js"),
        console = __webpack_require__(
          "./node_modules/console-browserify/index.js"
        ),
        __jsx = react.createElement;
      function EcwidContext_ownKeys(e, r) {
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
      function EcwidContext_objectSpread(e) {
        for (var r = 1; r < arguments.length; r++) {
          var t = null != arguments[r] ? arguments[r] : {};
          r % 2
            ? EcwidContext_ownKeys(Object(t), !0).forEach(function (r) {
                (0, defineProperty.Z)(e, r, t[r]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t))
            : EcwidContext_ownKeys(Object(t)).forEach(function (r) {
                Object.defineProperty(
                  e,
                  r,
                  Object.getOwnPropertyDescriptor(t, r)
                );
              });
        }
        return e;
      }
      var EcwidContext = (0, react.createContext)({
        products: null,
        addToBag: null,
        addWishlist: function addWishlist() {},
        cart: null,
        favorited: !1,
        favorites: null,
        fetchCollections: function fetchCollections() {},
        getPriceDisplay: function getPriceDisplay() {
          return 0;
        },
        id: null,
        isAddingToBag: !1,
        isScript: !1,
        options: {},
        price: 0,
        productCollection: null,
        selected: null,
        selectedOpt: null,
        setCart: function setCart() {},
        setId: function setId() {},
        setOptions: function setOptions() {},
        setPrice: function setPrice() {},
        setSelectedOpt: function setSelectedOpt() {},
        setWishlist: function setWishlist() {},
        wishlist: { productIds: [] },
      });
      function EcwidContextProvider(_ref) {
        var children = _ref.children,
          _useState = (0, react.useState)(null),
          cart = _useState[0],
          setCart = _useState[1],
          _useState2 = (0, react.useState)(null),
          products = _useState2[0],
          setProducts = _useState2[1],
          _useState3 = (0, react.useState)(!1),
          isAddingToBag = _useState3[0],
          setIsAddingToBag = _useState3[1],
          _useState4 = (0, react.useState)({}),
          options = _useState4[0],
          setOptions = _useState4[1],
          _useState5 = (0, react.useState)([]),
          selectedOpt = _useState5[0],
          setSelectedOpt = _useState5[1],
          _useState6 = (0, react.useState)(null),
          selected = _useState6[0],
          setSelected = _useState6[1],
          _useState7 = (0, react.useState)(0),
          price = _useState7[0],
          setPrice = _useState7[1],
          _useState8 = (0, react.useState)({ productIds: [] }),
          wishlist = _useState8[0],
          setWishlist = _useState8[1],
          _useState9 = (0, react.useState)(!1),
          favorited = _useState9[0],
          setFavorited = _useState9[1],
          _useState10 = (0, react.useState)(null),
          id = _useState10[0],
          setId = _useState10[1],
          _useState11 = (0, react.useState)(null),
          favorites = _useState11[0],
          setFavorites = _useState11[1],
          _useState12 = (0, react.useState)(null),
          productCollection = _useState12[0],
          setProductCollection = _useState12[1],
          storageName = "PSecwid__".concat("27901018", "PSfavorites"),
          _useState13 = (0, react.useState)(!1),
          storage = _useState13[0],
          setStorage = _useState13[1],
          _useState14 = (0, react.useState)(0),
          setCount = (_useState14[0], _useState14[1]),
          _useState15 = (0, react.useState)(!1),
          isScript = _useState15[0];
        _useState15[1];
        (0, react.useEffect)(
          function () {
            !(function fetchProducts() {
              null !== id &&
                fetch("/api/ecwid/products/".concat(id))
                  .then(function (res) {
                    return res.json();
                  })
                  .then(function (response) {
                    response && setProducts(response.result);
                  })
                  .catch(function (error) {
                    console.error(error);
                  });
            })();
          },
          [id]
        ),
          (0, react.useMemo)(
            function () {
              var data = null;
              if (selectedOpt.length) {
                var _variants$,
                  variants =
                    products &&
                    (null == products ? void 0 : products.combinations),
                  sortingArr =
                    null === (_variants$ = variants[0]) || void 0 === _variants$
                      ? void 0
                      : _variants$.options.map(function (i) {
                          return i.name;
                        }),
                  sortArrSelected =
                    null == selectedOpt
                      ? void 0
                      : selectedOpt.sort(function (a, b) {
                          return (
                            (null == sortingArr
                              ? void 0
                              : sortingArr.indexOf(a.name)) -
                            (null == sortingArr
                              ? void 0
                              : sortingArr.indexOf(b.name))
                          );
                        }),
                  filterArrSelected = sortArrSelected.filter(function (items) {
                    return (0, lodash.includes)(sortingArr, items.name);
                  }),
                  finalVariant = variants
                    .flatMap(function (items) {
                      items.options.length;
                      var arrOptions = items.options.map(function (i) {
                        return { name: i.name, value: i.value };
                      });
                      if ((0, lodash.isEqual)(arrOptions, filterArrSelected))
                        return items;
                    })
                    .find(function (i) {
                      return i;
                    });
                variants
                  .flatMap(function (items) {
                    var arrOptions = items.options.map(function (i) {
                      return { name: i.name, value: i.value };
                    });
                    if ((0, lodash.isEqual)(arrOptions, sortArrSelected))
                      return items;
                  })
                  .find(function (i) {
                    return i;
                  }),
                  selectedOpt
                    .flatMap(function (sel) {
                      return variants.flatMap(function (vrt) {
                        return vrt.options.map(function (item) {
                          if (
                            vrt.options.length < 2 &&
                            (0, lodash.isEqual)(
                              { name: item.name, value: item.value },
                              sel
                            )
                          )
                            return vrt;
                        });
                      });
                    })
                    .find(function (i) {
                      return i;
                    });
                finalVariant && setSelected(finalVariant), (data = selectedOpt);
              }
              return data;
            },
            [selectedOpt, products]
          ),
          (0, react.useEffect)(function () {
            (window.ec = window.ec || {}),
              (window.ec.config = window.ec.config || {}),
              (window.ec.config.storefrontUrls =
                window.ec.config.storefrontUrls || {}),
              ["/cart"].includes(location.pathname) &&
                ((window.ec.config.storefrontUrls.cleanUrls = !0),
                (window.ec.config.storefrontUrls.queryBasedCleanUrls = !0)),
              (window.ec.config.store_main_page_url = "".concat(
                "https://wstudio-site-template-default-staging.webriq.me",
                "/cart"
              )),
              (window.ecwid_script_defer = !0),
              "/cart" === location.pathname &&
                (window._xnext_initialization_scripts = [
                  {
                    widgetType: "ProductBrowser",
                    id: "ecwid-shop-store",
                    arg: ["id=ecwid-shop-store"],
                  },
                ]),
              (function load_ecwid() {
                if ("undefined" != typeof Ecwid)
                  try {
                    Ecwid.OnAPILoaded.add(function () {
                      Ecwid.init();
                    });
                  } catch (error) {
                    console.error();
                  }
                else
                  setCount(function (prev) {
                    return prev + 1;
                  });
              })();
          }, []),
          (0, react.useEffect)(
            function () {
              if (
                void 0 !== typeof window &&
                localStorage.getItem(storageName)
              ) {
                setStorage(!0);
                var ids = JSON.parse(localStorage.getItem(storageName));
                ids.productIds.length > 0 &&
                  (setWishlist(function (prev) {
                    return EcwidContext_objectSpread(
                      EcwidContext_objectSpread({}, prev),
                      {},
                      { productIds: ids.productIds }
                    );
                  }),
                  setFavorited(!!(0, lodash.includes)(ids.productIds, id)));
              }
            },
            [id, storage]
          ),
          (0, react.useEffect)(
            function () {
              var fetchFavorites = (function () {
                var _ref2 = (0, asyncToGenerator.Z)(
                  regenerator_default().mark(function _callee() {
                    var favoriteIds,
                      favorites,
                      params,
                      studio,
                      productReq,
                      productRes,
                      favoriteProducts;
                    return regenerator_default().wrap(
                      function _callee$(_context) {
                        for (;;)
                          switch ((_context.prev = _context.next)) {
                            case 0:
                              if (
                                ((favoriteIds =
                                  localStorage.getItem(storageName)),
                                null == (favorites = JSON.parse(favoriteIds)) ||
                                  !favorites.productIds)
                              ) {
                                _context.next = 22;
                                break;
                              }
                              return (
                                (_context.prev = 3),
                                '*[_type=="mainProduct" && ecwidProductId in $ids && !(_id in path("drafts.**"))]',
                                (params = {
                                  ids:
                                    null == favorites
                                      ? void 0
                                      : favorites.productIds,
                                }),
                                (_context.next = 8),
                                sanityClient
                                  .fetch(
                                    '*[_type=="mainProduct" && ecwidProductId in $ids && !(_id in path("drafts.**"))]',
                                    params
                                  )
                                  .then(function (result) {
                                    return result;
                                  })
                              );
                            case 8:
                              return (
                                (studio = _context.sent),
                                (_context.next = 11),
                                fetch(
                                  "/api/ecwid/products/search?productIds=".concat(
                                    favorites.productIds
                                  )
                                )
                              );
                            case 11:
                              return (
                                (productReq = _context.sent),
                                (_context.next = 14),
                                productReq.json()
                              );
                            case 14:
                              (productRes = _context.sent),
                                (favoriteProducts =
                                  null == studio
                                    ? void 0
                                    : studio
                                        .map(function (item) {
                                          var _productRes$items;
                                          return null ===
                                            (_productRes$items =
                                              productRes.items) ||
                                            void 0 === _productRes$items
                                            ? void 0
                                            : _productRes$items
                                                .map(function (prod) {
                                                  if (
                                                    prod.id ===
                                                    item.ecwidProductId
                                                  )
                                                    return EcwidContext_objectSpread(
                                                      EcwidContext_objectSpread(
                                                        EcwidContext_objectSpread(
                                                          {},
                                                          item
                                                        ),
                                                        prod
                                                      ),
                                                      {},
                                                      {
                                                        ecwidId: prod.id,
                                                        price:
                                                          prod.defaultDisplayedPriceFormatted,
                                                      }
                                                    );
                                                })
                                                .flat();
                                        })
                                        .flat()
                                        .filter(function (item) {
                                          return void 0 !== item;
                                        })),
                                setFavorites(favoriteProducts),
                                (_context.next = 22);
                              break;
                            case 19:
                              (_context.prev = 19),
                                (_context.t0 = _context.catch(3)),
                                console.log(_context.t0);
                            case 22:
                            case "end":
                              return _context.stop();
                          }
                      },
                      _callee,
                      null,
                      [[3, 19]]
                    );
                  })
                );
                return function fetchFavorites() {
                  return _ref2.apply(this, arguments);
                };
              })();
              fetchFavorites();
            },
            [storage]
          );
        var fetchCollections = (function () {
          var _ref3 = (0, asyncToGenerator.Z)(
            regenerator_default().mark(function _callee2(ids) {
              var productReq;
              return regenerator_default().wrap(function _callee2$(_context2) {
                for (;;)
                  switch ((_context2.prev = _context2.next)) {
                    case 0:
                      return (
                        (_context2.next = 2),
                        fetch(
                          "/api/ecwid/products/search?productIds=".concat(ids)
                        ).then(function (res) {
                          return res.json();
                        })
                      );
                    case 2:
                      (productReq = _context2.sent),
                        setProductCollection(productReq.items);
                    case 4:
                    case "end":
                      return _context2.stop();
                  }
              }, _callee2);
            })
          );
          return function fetchCollections(_x) {
            return _ref3.apply(this, arguments);
          };
        })();
        return __jsx(
          react.Fragment,
          null,
          __jsx(
            EcwidContext.Provider,
            {
              value: {
                cart,
                setCart,
                products,
                options,
                setOptions,
                price,
                setPrice,
                addToBag: function addToBag(data, options) {
                  setIsAddingToBag(!0);
                  var payload = EcwidContext_objectSpread(
                    EcwidContext_objectSpread({}, data),
                    {},
                    {
                      callback: function callback(success) {
                        success
                          ? react_toast_esm.A.success(
                              "Product was successfully added to your cart"
                            )
                          : react_toast_esm.A.error(
                              "There was an error adding this product to your cart."
                            ),
                          setIsAddingToBag(!1);
                      },
                    }
                  );
                  options &&
                    Object.keys(options).length &&
                    (payload.options = options),
                    setTimeout(function () {
                      "undefined" != typeof Ecwid &&
                        Ecwid.Cart.addProduct(payload);
                    }, 1e3);
                },
                isAddingToBag,
                getPriceDisplay: function getPriceDisplay(amount) {
                  var priceFormated = "$".concat(amount);
                  return (
                    "undefined" != typeof Ecwid &&
                      Ecwid.OnAPILoaded.add(function () {
                        priceFormated = Ecwid.formatCurrency(amount);
                      }),
                    priceFormated
                  );
                },
                setWishlist,
                wishlist,
                setId,
                id,
                favorited,
                addWishlist: function addWishlist(id) {
                  var productIds =
                      null == wishlist ? void 0 : wishlist.productIds,
                    productId = (0, lodash.includes)(productIds, id)
                      ? productIds.filter(function (i) {
                          return i !== id;
                        })
                      : productIds.concat(id);
                  setWishlist(function (prev) {
                    return EcwidContext_objectSpread(
                      EcwidContext_objectSpread({}, prev),
                      {},
                      { productIds: productId }
                    );
                  }),
                    setFavorited(!(0, lodash.includes)(productIds, id)),
                    localStorage.setItem(
                      storageName,
                      JSON.stringify({ productIds: productId })
                    );
                },
                favorites,
                fetchCollections,
                productCollection,
                setSelectedOpt,
                selectedOpt,
                selected,
                isScript,
              },
            },
            children
          ),
          __jsx(
            "div",
            { style: { zIndex: 1 } },
            __jsx(react_toast_esm.I, { delay: 5e3, position: "top-center" })
          )
        );
      }
      try {
        (EcwidContextProvider.displayName = "EcwidContextProvider"),
          (EcwidContextProvider.__docgenInfo = {
            description: "",
            displayName: "EcwidContextProvider",
            props: {},
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES[
              "context/EcwidContext.tsx#EcwidContextProvider"
            ] = {
              docgenInfo: EcwidContextProvider.__docgenInfo,
              name: "EcwidContextProvider",
              path: "context/EcwidContext.tsx#EcwidContextProvider",
            });
      } catch (__react_docgen_typescript_loader_error) {}
      var helper = __webpack_require__("./helper/index.tsx"),
        ConditionalLink = __webpack_require__(
          "./components/ui/ConditionalLink/index.ts"
        ),
        variant_e_jsx = react.createElement;
      function VariantE(_ref) {
        var _logo$alt,
          _logo$alt2,
          banner = _ref.banner,
          logo = _ref.logo,
          links = _ref.links,
          router = (0, next_router.useRouter)(),
          _useState = (0, react.useState)(!1),
          menu = _useState[0],
          setMenu = _useState[1],
          _useState2 = (0, react.useState)(!1),
          showSearchBar = _useState2[0],
          setShowSearchBar = _useState2[1],
          _useState3 = (0, react.useState)(""),
          productQuery = _useState3[0],
          setProductQuery = _useState3[1],
          prevQuery = (0, react.useRef)("");
        (0, react.useEffect)(function () {
          "undefined" != typeof Ecwid && Ecwid.init();
        }, []),
          (0, react.useEffect)(
            function () {
              prevQuery.current = productQuery;
            },
            [productQuery]
          );
        var blockStyle = {
            block: {
              normal: function normal(_ref2) {
                var children = _ref2.children;
                return variant_e_jsx(
                  "p",
                  { className: "text-xs font-bold text-white font-heading" },
                  children
                );
              },
            },
            code: function code(_ref3) {
              var value = _ref3.value;
              return variant_e_jsx(
                "pre",
                { "data-language": value.language },
                variant_e_jsx("code", null, value.code)
              );
            },
            marks: {
              strong: function strong(_ref4) {
                var children = _ref4.children;
                return variant_e_jsx("strong", null, children);
              },
              em: function em(_ref5) {
                var children = _ref5.children;
                return variant_e_jsx("em", null, children);
              },
              code: function code(_ref6) {
                var children = _ref6.children;
                return variant_e_jsx("code", null, children);
              },
              link: function link(_ref7) {
                var _value$href,
                  children = _ref7.children,
                  value = _ref7.value;
                return variant_e_jsx(
                  link_default(),
                  {
                    "aria-label":
                      null !==
                        (_value$href = null == value ? void 0 : value.href) &&
                      void 0 !== _value$href
                        ? _value$href
                        : "external link",
                    className:
                      "text-brand-primary-foreground hover:text-brand-secondary-foreground",
                    href: null == value ? void 0 : value.href,
                    target: "_blank",
                    rel: "noopener noreferrer",
                  },
                  children
                );
              },
            },
          },
          showMenu = function showMenu() {
            setMenu(function (prevState) {
              return !prevState;
            });
          },
          handleSearchRouting = function handleSearchRouting(e) {
            var q = document.getElementById("query");
            e.preventDefault(),
              setProductQuery(q.value),
              router.push("/search?q=".concat(productQuery), void 0, {
                shallow: !0,
              });
          };
        return variant_e_jsx(
          EcwidContextProvider,
          null,
          variant_e_jsx(
            "section",
            { className: "relative" },
            banner &&
              variant_e_jsx(
                "div",
                { className: "py-2 bg-brand-primary" },
                variant_e_jsx(
                  "div",
                  { className: "flex items-center justify-center" },
                  variant_e_jsx(
                    "svg",
                    {
                      className: "mr-2",
                      width: 18,
                      height: 11,
                      viewBox: "0 0 18 11",
                      fill: "none",
                      xmlns: "http://www.w3.org/2000/svg",
                    },
                    variant_e_jsx("rect", {
                      y: "3.07129",
                      width: 4,
                      height: 10,
                      rx: 2,
                      transform: "rotate(-45 0 3.07129)",
                      fill: "white",
                    }),
                    variant_e_jsx("rect", {
                      x: 8,
                      y: "2.82861",
                      width: 4,
                      height: 10,
                      rx: 2,
                      transform: "rotate(-45 8 2.82861)",
                      fill: "white",
                    })
                  ),
                  variant_e_jsx(sanity.YI, {
                    value: banner,
                    components: blockStyle,
                  })
                )
              ),
            variant_e_jsx(
              "nav",
              { className: "relative flex justify-between" },
              variant_e_jsx(
                "div",
                { className: "flex items-center w-full px-12 py-8" },
                (null == logo ? void 0 : logo.image) &&
                  variant_e_jsx(
                    link_default(),
                    {
                      "aria-label": "Go to ".concat(
                        "/" === (0, helper.oQ)(logo)
                          ? "home page"
                          : (0, helper.oQ)(logo)
                      ),
                      className: "text-3xl font-bold leading-none",
                      href: (0, helper.oQ)(logo),
                      prefetch: !1,
                    },
                    variant_e_jsx(next_image.Z, {
                      src: (0, sanity.uH)(null == logo ? void 0 : logo.image),
                      width: 48,
                      height: 48,
                      alt:
                        null !==
                          (_logo$alt = null == logo ? void 0 : logo.alt) &&
                        void 0 !== _logo$alt
                          ? _logo$alt
                          : "navigation-logo",
                    })
                  ),
                variant_e_jsx(
                  "ul",
                  {
                    className:
                      "absolute hidden transform main-nav top-1/2 lg:flex lg:-translate-x-1/2 lg:-translate-y-1/2",
                  },
                  links &&
                    links.map(function (link, index) {
                      return variant_e_jsx(
                        react.Fragment,
                        { key: index },
                        variant_e_jsx(
                          "li",
                          null,
                          variant_e_jsx(
                            ConditionalLink.M,
                            {
                              variant: "link",
                              ariaLabel: null == link ? void 0 : link.label,
                              link,
                              className:
                                "linkInternal" ===
                                (null == link ? void 0 : link.type)
                                  ? "xl:mr-12 lg:mr-8 font-bold font-heading hover:text-gray-600"
                                  : "mr-12 font-bold font-heading hover:text-gray-600",
                            },
                            null == link ? void 0 : link.label
                          )
                        )
                      );
                    })
                )
              ),
              variant_e_jsx(
                "div",
                { className: "items-center justify-end hidden mr-12 xl:flex" },
                variant_e_jsx(
                  "button",
                  {
                    "aria-label": "Search button",
                    type: "button",
                    onClick: function onClick() {
                      return setShowSearchBar(!showSearchBar);
                    },
                  },
                  variant_e_jsx(
                    "svg",
                    {
                      width: 24,
                      height: 24,
                      xmlns: "http://www.w3.org/2000/svg",
                      fillRule: "evenodd",
                      clipRule: "evenodd",
                    },
                    variant_e_jsx("path", {
                      d: "M15.853 16.56c-1.683 1.517-3.911 2.44-6.353 2.44-5.243 0-9.5-4.257-9.5-9.5s4.257-9.5 9.5-9.5 9.5 4.257 9.5 9.5c0 2.442-.923 4.67-2.44 6.353l7.44 7.44-.707.707-7.44-7.44zm-6.353-15.56c4.691 0 8.5 3.809 8.5 8.5s-3.809 8.5-8.5 8.5-8.5-3.809-8.5-8.5 3.809-8.5 8.5-8.5z",
                    })
                  )
                ),
                showSearchBar &&
                  variant_e_jsx(
                    "form",
                    {
                      id: "form",
                      className:
                        "flex items-center pl-8 mb-10 mr-auto bg-white lg:mb-0",
                      method: "get",
                      role: "search",
                      onSubmit: handleSearchRouting,
                    },
                    variant_e_jsx("input", {
                      id: "query",
                      name: "query",
                      "aria-label": "Search...",
                      className:
                        "inline-block w-40 h-full p-2 mt-1 text-sm bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:border-brand-primary-foreground focus:outline-none focus:ring-1 focus:ring-brand-primary-foreground",
                      placeholder: "Search...",
                      onChange: function onChange(e) {
                        return setProductQuery(e.target.value);
                      },
                      type: "search",
                    }),
                    variant_e_jsx(
                      "button",
                      {
                        "aria-label": "Submit product search",
                        className:
                          "mt-1 inline-flex h-[35px] w-10 items-center justify-center bg-brand-primary ".concat(
                            "" === productQuery
                              ? "cursor-not-allowed opacity-50"
                              : "transition duration-200 hover:bg-brand-primary-foreground"
                          ),
                        disabled: "" === productQuery,
                        type: "submit",
                      },
                      variant_e_jsx(
                        "svg",
                        {
                          width: 7,
                          height: 12,
                          viewBox: "0 0 7 12",
                          fill: "none",
                          xmlns: "http://www.w3.org/2000/svg",
                        },
                        variant_e_jsx("path", {
                          d: "M4.125 6.00252L0 1.87752L1.17801 0.699219L6.48102 6.00252L1.17801 11.3058L0 10.1275L4.125 6.00252Z",
                          fill: "white",
                        })
                      )
                    )
                  ),
                variant_e_jsx(
                  "div",
                  { className: "mx-10 cart-icon" },
                  variant_e_jsx("div", {
                    "data-icon": "BAG",
                    className: "ec-cart-widget",
                  }),
                  variant_e_jsx("a", {
                    className: "cart-link",
                    href: "/cart?store-page=cart",
                    "aria-label": "Cart",
                  })
                ),
                variant_e_jsx(
                  "a",
                  { href: "/cart?store-page=account" },
                  variant_e_jsx(
                    "svg",
                    {
                      width: 32,
                      height: 31,
                      viewBox: "0 0 32 31",
                      fill: "none",
                      xmlns: "http://www.w3.org/2000/svg",
                    },
                    variant_e_jsx("path", {
                      d: "M16.0006 16.3154C19.1303 16.3154 21.6673 13.799 21.6673 10.6948C21.6673 7.59064 19.1303 5.07422 16.0006 5.07422C12.871 5.07422 10.334 7.59064 10.334 10.6948C10.334 13.799 12.871 16.3154 16.0006 16.3154Z",
                      stroke: "currentColor",
                      strokeWidth: "1.5",
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                    }),
                    variant_e_jsx("path", {
                      d: "M24.4225 23.8963C23.6678 22.3507 22.4756 21.0445 20.9845 20.1298C19.4934 19.2151 17.7647 18.7295 15.9998 18.7295C14.2349 18.7295 12.5063 19.2151 11.0152 20.1298C9.52406 21.0445 8.33179 22.3507 7.57715 23.8963",
                      stroke: "currentColor",
                      strokeWidth: "1.5",
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                    })
                  )
                )
              ),
              variant_e_jsx(
                "button",
                {
                  className: "self-center mr-12 navbar-burger xl:hidden",
                  onClick: showMenu,
                },
                variant_e_jsx(
                  "svg",
                  {
                    width: 20,
                    height: 12,
                    viewBox: "0 0 20 12",
                    fill: "none",
                    xmlns: "http://www.w3.org/2000/svg",
                  },
                  variant_e_jsx("path", {
                    d: "M1 2H19C19.2652 2 19.5196 1.89464 19.7071 1.70711C19.8946 1.51957 20 1.26522 20 1C20 0.734784 19.8946 0.48043 19.7071 0.292893C19.5196 0.105357 19.2652 0 19 0H1C0.734784 0 0.48043 0.105357 0.292893 0.292893C0.105357 0.48043 0 0.734784 0 1C0 1.26522 0.105357 1.51957 0.292893 1.70711C0.48043 1.89464 0.734784 2 1 2ZM19 10H1C0.734784 10 0.48043 10.1054 0.292893 10.2929C0.105357 10.4804 0 10.7348 0 11C0 11.2652 0.105357 11.5196 0.292893 11.7071C0.48043 11.8946 0.734784 12 1 12H19C19.2652 12 19.5196 11.8946 19.7071 11.7071C19.8946 11.5196 20 11.2652 20 11C20 10.7348 19.8946 10.4804 19.7071 10.2929C19.5196 10.1054 19.2652 10 19 10ZM19 5H1C0.734784 5 0.48043 5.10536 0.292893 5.29289C0.105357 5.48043 0 5.73478 0 6C0 6.26522 0.105357 6.51957 0.292893 6.70711C0.48043 6.89464 0.734784 7 1 7H19C19.2652 7 19.5196 6.89464 19.7071 6.70711C19.8946 6.51957 20 6.26522 20 6C20 5.73478 19.8946 5.48043 19.7071 5.29289C19.5196 5.10536 19.2652 5 19 5Z",
                    fill: "currentColor",
                  })
                )
              )
            ),
            variant_e_jsx(
              "div",
              {
                className: "".concat(
                  menu ? null : "hidden",
                  " mobile-nav fixed bottom-0 right-0 top-0 w-5/6 max-w-sm"
                ),
                style: { zIndex: 60 },
              },
              variant_e_jsx("div", {
                className: "fixed inset-0 bg-gray-800 opacity-25",
                onClick: showMenu,
              }),
              variant_e_jsx(
                "nav",
                {
                  className:
                    "relative flex flex-col w-full h-full px-6 py-6 overflow-y-auto bg-white border-r",
                },
                variant_e_jsx(
                  "div",
                  { className: "flex items-center mb-8" },
                  (null == logo ? void 0 : logo.image) &&
                    variant_e_jsx(
                      link_default(),
                      {
                        "aria-label": "Go to ".concat(
                          "/" === (0, helper.oQ)(logo)
                            ? "home page"
                            : (0, helper.oQ)(logo)
                        ),
                        className: "text-3xl font-bold leading-none",
                        href: (0, helper.oQ)(logo),
                        prefetch: !1,
                      },
                      variant_e_jsx(next_image.Z, {
                        src: (0, sanity.uH)(null == logo ? void 0 : logo.image),
                        width: 48,
                        height: 48,
                        alt:
                          null !==
                            (_logo$alt2 = null == logo ? void 0 : logo.alt) &&
                          void 0 !== _logo$alt2
                            ? _logo$alt2
                            : "navigation-logo",
                      })
                    ),
                  variant_e_jsx(
                    "button",
                    {
                      "aria-label": "Close navigation menu",
                      className: "ml-auto",
                      onClick: showMenu,
                    },
                    variant_e_jsx(
                      "svg",
                      {
                        className: "w-2 h-2 text-gray-500 cursor-pointer",
                        width: 10,
                        height: 10,
                        viewBox: "0 0 10 10",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg",
                      },
                      variant_e_jsx("path", {
                        d: "M9.00002 1L1 9.00002M1.00003 1L9.00005 9.00002",
                        stroke: "black",
                        strokeWidth: "1.5",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                      })
                    )
                  )
                ),
                variant_e_jsx(
                  "form",
                  {
                    id: "form",
                    className: "flex mt-3 bg-white",
                    method: "get",
                    role: "search",
                    onSubmit: handleSearchRouting,
                  },
                  variant_e_jsx("input", {
                    id: "query",
                    name: "query",
                    "aria-label": "Search product",
                    className:
                      "inline-block w-full h-full p-2 text-sm bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:border-brand-primary-foreground focus:outline-none focus:ring-1 focus:ring-brand-primary-foreground sm:w-60",
                    placeholder: "Search...",
                    onChange: function onChange(e) {
                      return setProductQuery(e.target.value);
                    },
                    type: "search",
                  }),
                  variant_e_jsx(
                    "button",
                    {
                      "aria-label": "Submit product search",
                      className:
                        "inline-flex h-full w-10 items-center justify-center bg-brand-primary ".concat(
                          "" === productQuery
                            ? "cursor-not-allowed opacity-50"
                            : "transition duration-200 hover:bg-brand-primary-foreground"
                        ),
                      disabled: "" === productQuery,
                      type: "submit",
                    },
                    variant_e_jsx(
                      "svg",
                      {
                        width: 7,
                        height: 12,
                        viewBox: "0 0 7 12",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg",
                      },
                      variant_e_jsx("path", {
                        d: "M4.125 6.00252L0 1.87752L1.17801 0.699219L6.48102 6.00252L1.17801 11.3058L0 10.1275L4.125 6.00252Z",
                        fill: "white",
                      })
                    )
                  )
                ),
                variant_e_jsx(
                  "ul",
                  { className: "mt-10 mb-5" },
                  links &&
                    links.map(function (link, index) {
                      return variant_e_jsx(
                        react.Fragment,
                        { key: index },
                        variant_e_jsx(
                          "li",
                          { className: "mb-8" },
                          variant_e_jsx(
                            ConditionalLink.M,
                            {
                              variant: "link",
                              ariaLabel: null == link ? void 0 : link.label,
                              link,
                              className:
                                "font-bold font-heading hover:text-gray-600",
                            },
                            null == link ? void 0 : link.label
                          )
                        )
                      );
                    })
                ),
                variant_e_jsx("hr", null),
                variant_e_jsx(
                  "div",
                  { className: "flex items-center mx-auto mt-3" },
                  variant_e_jsx(
                    "a",
                    {
                      className: "flex mr-10 cart-icon cart-link",
                      "aria-label": "Cart",
                      href: "/cart?store-page=cart",
                    },
                    variant_e_jsx("div", {
                      "data-icon": "BAG",
                      className: "ec-cart-widget",
                    }),
                    variant_e_jsx(
                      "span",
                      { className: "my-auto text-sm" },
                      "Cart"
                    )
                  ),
                  variant_e_jsx(
                    "a",
                    {
                      className: "flex",
                      "aria-label": "Account",
                      href: "/cart?store-page=account",
                    },
                    variant_e_jsx(
                      "svg",
                      {
                        width: 32,
                        height: 31,
                        viewBox: "0 0 32 31",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg",
                      },
                      variant_e_jsx("path", {
                        d: "M16.0006 16.3154C19.1303 16.3154 21.6673 13.799 21.6673 10.6948C21.6673 7.59064 19.1303 5.07422 16.0006 5.07422C12.871 5.07422 10.334 7.59064 10.334 10.6948C10.334 13.799 12.871 16.3154 16.0006 16.3154Z",
                        stroke: "currentColor",
                        strokeWidth: "1.5",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                      }),
                      variant_e_jsx("path", {
                        d: "M24.4225 23.8963C23.6678 22.3507 22.4756 21.0445 20.9845 20.1298C19.4934 19.2151 17.7647 18.7295 15.9998 18.7295C14.2349 18.7295 12.5063 19.2151 11.0152 20.1298C9.52406 21.0445 8.33179 22.3507 7.57715 23.8963",
                        stroke: "currentColor",
                        strokeWidth: "1.5",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                      })
                    ),
                    variant_e_jsx(
                      "span",
                      { className: "my-auto text-sm" },
                      "Account"
                    )
                  )
                )
              )
            )
          )
        );
      }
      VariantE.displayName = "VariantE";
      const variant_e = (0, react.memo)(VariantE);
      try {
        (VariantE.displayName = "VariantE"),
          (VariantE.__docgenInfo = {
            description: "",
            displayName: "VariantE",
            props: {
              template: {
                defaultValue: null,
                description: "",
                name: "template",
                required: !1,
                type: { name: "any" },
              },
              logo: {
                defaultValue: null,
                description: "",
                name: "logo",
                required: !1,
                type: { name: "Logo" },
              },
              links: {
                defaultValue: null,
                description: "",
                name: "links",
                required: !1,
                type: { name: "LabeledRouteWithKey[]" },
              },
              primaryButton: {
                defaultValue: null,
                description: "",
                name: "primaryButton",
                required: !1,
                type: { name: "LabeledRoute" },
              },
              secondaryButton: {
                defaultValue: null,
                description: "",
                name: "secondaryButton",
                required: !1,
                type: { name: "LabeledRoute" },
              },
              banner: {
                defaultValue: null,
                description: "",
                name: "banner",
                required: !1,
                type: { name: "any" },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES[
              "components/sections/navigation/variant_e.tsx#VariantE"
            ] = {
              docgenInfo: VariantE.__docgenInfo,
              name: "VariantE",
              path: "components/sections/navigation/variant_e.tsx#VariantE",
            });
      } catch (__react_docgen_typescript_loader_error) {}
    },
    "./components/ui/ConditionalLink/ConditionalLink.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      "use strict";
      __webpack_require__.d(__webpack_exports__, { M: () => ConditionalLink });
      var _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_extends_js__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(
            "./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/extends.js"
          ),
        _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            "./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"
          ),
        next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          "./node_modules/next/link.js"
        ),
        next_link__WEBPACK_IMPORTED_MODULE_1___default = __webpack_require__.n(
          next_link__WEBPACK_IMPORTED_MODULE_1__
        ),
        react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          "./node_modules/next/dist/compiled/react/index.js"
        ),
        utils_cn__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__("./utils/cn.ts"),
        _excluded = [
          "variant",
          "className",
          "ariaLabel",
          "children",
          "link",
          "target",
        ],
        __jsx = react__WEBPACK_IMPORTED_MODULE_0__.createElement,
        ConditionalLink = function ConditionalLink(_ref) {
          var _variants$variant,
            _link$internalLink,
            _ref$variant = _ref.variant,
            variant = void 0 === _ref$variant ? "primary" : _ref$variant,
            className = _ref.className,
            ariaLabel = _ref.ariaLabel,
            children = _ref.children,
            link = _ref.link,
            target = _ref.target,
            props = (0,
            _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_2__.Z)(
              _ref,
              _excluded
            ),
            commonStyles =
              "inline-block py-2 px-6 rounded-l-xl rounded-t-xl font-bold leading-loose transition duration-200",
            primary = "".concat(
              commonStyles,
              " bg-brand-primary hover:bg-brand-primary-foreground text-gray-50  outline-none "
            ),
            outline = "".concat(
              commonStyles,
              " bg-white hover:bg-slate-100  font-bold outline text-brand-primary-foreground outline-brand-primary-foreground "
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
                  link: "",
                }[variant]) && void 0 !== _variants$variant
                ? _variants$variant
                : primary,
            commonProps = {
              className: (0, utils_cn__WEBPACK_IMPORTED_MODULE_3__.cn)(
                variantClass,
                className
              ),
              ariaLabel,
              target,
            };
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
                  (0,
                  _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_extends_js__WEBPACK_IMPORTED_MODULE_4__.Z)(
                    { href: "/" },
                    commonProps,
                    props
                  ),
                  children
                )
              : "linkInternal" === (null == link ? void 0 : link.type)
              ? __jsx(
                  next_link__WEBPACK_IMPORTED_MODULE_1___default(),
                  (0,
                  _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_extends_js__WEBPACK_IMPORTED_MODULE_4__.Z)(
                    {},
                    commonProps,
                    props,
                    {
                      href: "/".concat(
                        null == link ? void 0 : link.internalLink
                      ),
                    }
                  ),
                  children
                )
              : "linkExternal" === (null == link ? void 0 : link.type)
              ? __jsx(
                  "a",
                  (0,
                  _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_extends_js__WEBPACK_IMPORTED_MODULE_4__.Z)(
                    {},
                    commonProps,
                    props,
                    {
                      href: null == link ? void 0 : link.externalLink,
                      rel:
                        "_blank" === (null == link ? void 0 : link.linkTarget)
                          ? "noopener noreferrer"
                          : null,
                    }
                  ),
                  children
                )
              : __jsx(
                  next_link__WEBPACK_IMPORTED_MODULE_1___default(),
                  (0,
                  _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_extends_js__WEBPACK_IMPORTED_MODULE_4__.Z)(
                    {},
                    commonProps,
                    props,
                    { href: "/" }
                  ),
                  children
                )
            : __jsx(
                "a",
                (0,
                _Users_johnchristophermoreno_Desktop_workspace_webriq_site_template_default_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_extends_js__WEBPACK_IMPORTED_MODULE_4__.Z)(
                  {},
                  commonProps,
                  props,
                  { href: "/page-not-found" }
                ),
                children
              );
        };
      ConditionalLink.displayName = "ConditionalLink";
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
                    { value: '"link"' },
                  ],
                },
              },
              ariaLabel: {
                defaultValue: null,
                description: "",
                name: "ariaLabel",
                required: !0,
                type: { name: "string" },
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
                type: {
                  name: "enum",
                  value: [{ value: '"_self"' }, { value: '"_blank"' }],
                },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES[
              "components/ui/ConditionalLink/ConditionalLink.tsx#ConditionalLink"
            ] = {
              docgenInfo: ConditionalLink.__docgenInfo,
              name: "ConditionalLink",
              path: "components/ui/ConditionalLink/ConditionalLink.tsx#ConditionalLink",
            });
      } catch (__react_docgen_typescript_loader_error) {}
    },
    "./components/ui/ConditionalLink/index.ts": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      "use strict";
      __webpack_require__.d(__webpack_exports__, {
        M: () => _ConditionalLink__WEBPACK_IMPORTED_MODULE_0__.M,
      });
      var _ConditionalLink__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        "./components/ui/ConditionalLink/ConditionalLink.tsx"
      );
    },
    "./helper/index.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      "use strict";
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
      "use strict";
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
      "use strict";
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
    "./utils/cn.ts": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      "use strict";
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
    "?c969": () => {},
    "?ed1b": () => {},
    "?d17e": () => {},
  },
]);
