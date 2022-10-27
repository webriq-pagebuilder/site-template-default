import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { ToastContainer, toast } from "react-toast";
import { sanityClient } from "lib/sanity";
import { includes } from "lodash";

const EcwidContext = createContext();

export function EcwidContextProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [products, setProducts] = useState(null);
  const [isAddingToBag, setIsAddingToBag] = useState(false);
  const [options, setOptions] = useState({});
  const [price, setPrice] = useState(0);
  const [wishlist, setWishlist] = useState({ productIds: [] });
  const [favorited, setFavorited] = useState(false);
  const [id, setId] = useState(null);
  const [favorites, setFavorites] = useState(null);
  const [productCollection, setProductCollection] = useState(null);
  const storageName = `PSecwid__${process.env.NEXT_PUBLIC_ECWID_STORE_ID}PSfavorites`;

  const fetchProducts = () => {
    id !== null &&
      fetch(`/api/ecwid/products/${id}`)
        .then((res) => res.json())
        .then((response) => {
          response && setProducts(response.result);
        })
        .catch((error) => {
          console.error(error);
          setProducts({ error });
        });
  };

  const fetchCollections = async (ids) => {
    const productReq = await fetch(
      `/api/ecwid/products/search?productIds=${ids}`
    ).then((res) => res.json());

    setProductCollection(productReq.items);
  };

  const fetchFavorites = async () => {
    const favoriteIds = localStorage.getItem(storageName);
    const favorites = JSON.parse(favoriteIds);

    try {
      const query =
        '*[_type=="mainProduct" && ecwidProductId in $ids && !(_id in path("drafts.**"))]';
      const params = {
        ids: favorites?.productIds?.map((id) => id),
      };

      const studio = await sanityClient
        .fetch(query, params)
        .then((products) => products);

      const productReq = await fetch(
        `/api/ecwid/products/search?productIds=${favorites.productIds}`
      );
      const productRes = await productReq.json();

      const favoriteProducts = studio
        .map((item) => {
          return productRes.items
            .map((prod) => {
              if (prod.id === item.ecwidProductId) {
                return {
                  ...item,
                  ...prod,
                  ecwidId: prod.id,
                  price: prod.defaultDisplayedPriceFormatted,
                };
              }
            })
            .flat();
        })
        .flat()
        .filter((item) => item !== undefined);

      setFavorites(favoriteProducts);
    } catch (error) {
      console.log(error);
    }
  };
  useMemo(() => {
    fetchProducts();
  }, [id]);
  useEffect(() => {
    function load_ecwid() {
      if (typeof Ecwid != "undefined") {
        try {
          Ecwid.OnAPILoaded.add(function () {
            Ecwid.init();

            Ecwid.Cart.get(function (cart) {
              setCart(cart);
            });

            Ecwid.OnCartChanged.add(function (cart) {
              setCart(cart);
            });
          });
        } catch (error) {
          console.error();
        }

        Ecwid.OnPageLoaded.add(function (page) {
          if (page.type === "CATEGORY" || page.type === "PRODUCT") {
            Ecwid.openPage("cart");
          }
        });
      }
    }

    window.ec = window.ec || {};
    window.ec.config = window.ec.config || {};
    window.ec.config.storefrontUrls = window.ec.config.storefrontUrls || {};
    window.ec.config.storefrontUrls.cleanUrls = true;
    window.ec.config.storefrontUrls.queryBasedCleanUrls = true;
    // window.ec.config.baseUrl = "/store";
    window.ec.config.store_main_page_url = `${process.env.NEXT_PUBLIC_SITE_URL}/cart`;

    window.ecwid_script_defer = true;
    // window.ecwid_dynamic_widgets = true;

    if (document.getElementById("ecwid-shop-store")) {
      window._xnext_initialization_scripts = [
        {
          widgetType: "ProductBrowser",
          id: "ecwid-shop-store",
          arg: ["id=ecwid-shop-store"],
        },
      ];

      load_ecwid();
    }
  }, []);

  const getPriceDisplay = (amount) => {
    let priceFormated = amount;
    if (typeof Ecwid != "undefined") {
      Ecwid.OnAPILoaded.add(function () {
        priceFormated = Ecwid.formatCurrency(amount);
      });
    }

    return priceFormated;
  };

  const addToBag = (data, options) => {
    setIsAddingToBag(true);

    let payload = {
      ...data,
      callback: function (success, product, cart) {
        if (success) {
          toast.success("Product was successfully added to your cart");
        } else {
          toast.error("There was an error adding this product to your cart.");
        }
        setIsAddingToBag(false);
      },
    };

    if (options && Object.keys(options).length) payload.options = options;

    setTimeout(() => {
      if (typeof Ecwid != "undefined") {
        Ecwid.Cart.addProduct(payload);
      }
    }, 1000);
  };

  useEffect(() => {
    if (typeof window !== undefined) {
      if (localStorage.getItem(storageName)) {
        let ids = JSON.parse(localStorage.getItem(storageName));

        if (ids.productIds.length > 0) {
          setWishlist((prev) => ({
            ...prev,
            productIds: ids.productIds,
          }));
          setFavorited(includes(ids.productIds, id) ? true : false);
        }
      }
    }
  }, [id]);

  useEffect(() => {
    fetchFavorites();
  }, [wishlist.productIds]);

  const addWishlist = (id) => {
    const productIds = wishlist?.productIds;

    const productId = includes(productIds, id)
      ? productIds.filter((i) => i !== id)
      : productIds.concat(id);

    setWishlist((prev) => ({
      ...prev,
      productIds: productId,
    }));

    setFavorited(includes(productIds, id) ? false : true);

    localStorage.setItem(
      storageName,
      JSON.stringify({ productIds: productId })
    );
  };

  return (
    <>
      <EcwidContext.Provider
        value={{
          cart,
          setCart,
          products,
          options,
          setOptions,
          price,
          setPrice,
          addToBag,
          isAddingToBag,
          getPriceDisplay,
          setWishlist,
          wishlist,
          setId,
          id,
          favorited,
          addWishlist,
          favorites,
          fetchCollections,
          productCollection,
        }}
      >
        {children}
      </EcwidContext.Provider>
      <div style={{ zIndex: 1 }}>
        <ToastContainer position="top-center" />
      </div>
    </>
  );
}

export function useEcwid() {
  return useContext(EcwidContext);
}
