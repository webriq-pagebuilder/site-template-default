import { createContext, useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toast";

const EcwidContext = createContext();

export function EcwidContextProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [products, setProducts] = useState(null);
  const [isAddingToBag, setIsAddingToBag] = useState(false);
  const [options, setOptions] = useState({});
  const [price, setPrice] = useState(0);
  const [success, setSuccess] = useState(null);

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
    fetchProducts();

    function load_ecwid() {
      if (typeof Ecwid != "undefined") {
        Ecwid.OnAPILoaded.add(function () {
          Ecwid.init();

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
      callback: function (success, product, cart, error) {
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
        console.log;
        Ecwid.Cart.addProduct(payload);
      }
    }, 1000);
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
          success,
        }}
      >
        {children}
      </EcwidContext.Provider>
      <div style={{ zIndex: 1 }}>
        <ToastContainer position="top-center" />;
      </div>
    </>
  );
}

export function useEcwid() {
  return useContext(EcwidContext);
}
