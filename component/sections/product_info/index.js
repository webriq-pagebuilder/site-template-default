import { memo, useMemo } from "react";
import dynamic from "next/dynamic";
import { useEcwid } from "context/EcwidContext";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
};

function ProductInfo({ data, product }) {
  const ecwid = useEcwid();
  const ecwid_products = ecwid?.products || null;
  const price = ecwid?.price || 0;
  const getPriceDisplay = ecwid?.getPriceDisplay;

  const variant = data?.variant || data?.variants?.condition;
  const Variant = Variants?.[variant];

  console.log("product info", data, product);
  const ecwidProduct = useMemo(() => {
    let data = null;
    if (ecwid_products && product?.ecwidProductId) {
      data = ecwid_products[Number(product?.ecwidProductId)];
    }
    return data;
  }, [ecwid_products, product]);

  const props = {
    subtitle: data?.variants?.subtitle,
    images: data?.variants?.images,
    productDetails: data?.variants?.productDetails,
    socialLinks: data?.variants?.socialLinks,
    btnLabel: data?.variants?.btnLabel,
    product,
    ecwidProduct,
    getPriceDisplay: () => getPriceDisplay(price),
  };

  return Variant ? <Variant {...props} /> : null;
}
export default memo(ProductInfo);
