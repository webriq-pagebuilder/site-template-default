import { createContext, useContext, useEffect, useMemo, useState } from "react";

const EcwidContext = createContext();

export function EcwidContextProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [products, setProducts] = useState(null);
  const [isAddingToBag, setIsAddingToBag] = useState(false);
  const [options, setOptions] = useState({});
  const [price, setPrice] = useState(0);

  const fetchProducts = () => {
    fetch(`/api/ecwid/products`)
      .then((res) => res.json())
      .then((response) => {
        setProducts(
          response.result.total > 0 &&
            response.result.items.reduce((acc, item) => {
              acc[item.id] = item;
              return acc;
            }, {})
        );
      })
      .catch((error) => {
        console.error(error);
        setProducts({ error });
      });
  };

  useEffect(() => {
    function load_ecwid() {
      if (typeof Ecwid != "undefined") {
        Ecwid.init();

        Ecwid.OnAPILoaded.add(function () {
          Ecwid.Cart.get(function (cart) {
            console.log("GetCart: ", cart);
            setCart(cart);
          });

          Ecwid.OnCartChanged.add(function (cart) {
            console.log("OnCartChanged: ", cart);
            setCart(cart);
          });
        });

        Ecwid.OnPageLoaded.add(function (page) {
          if (page.type === "CATEGORY" || page.type === "PRODUCT") {
            location.href = "/store";
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
    window.ec.config.store_main_page_url = `${process.env.NEXT_PUBLIC_SITE_URL}/store`;

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
    }

    if (!document.getElementById("ecwid-script")) {
      var script = document.createElement("script");
      script.charset = "utf-8";
      script.type = "text/javascript";
      script.src = process.env.NEXT_PUBLIC_ECWID_SCRIPT;
      script.id = "ecwid-script";
      script.onload = load_ecwid;
      document.body.appendChild(script);
    } else {
      load_ecwid();
    }

    fetchProducts();
  }, []);

  const displayPriceFormatted = useMemo(() => {
    if (typeof Ecwid != "undefined") {
      return Ecwid.formatCurrency(price);
    }
  }, [price]);

  const addToBag = (data, options) => {
    setIsAddingToBag(true);

    let payload = {
      ...data,
      callback: function (success, product, cart) {
        alert(
          success
            ? "Product was successfully added to your cart."
            : "There was an error adding this product to your cart."
        );
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

  return (
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
        displayPriceFormatted,
      }}
    >
      {children}
    </EcwidContext.Provider>
  );
}

export function useEcwid() {
  return useContext(EcwidContext);
}
