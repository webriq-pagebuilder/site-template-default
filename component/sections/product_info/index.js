import { memo, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import { useEcwid } from "context/EcwidContext";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
};

function ProductInfo({ data, product }) {
  const ecwid = useEcwid();
  const ecwid_products = ecwid?.products || null;
  const price = product?.price || 0;
  const getPriceDisplay = ecwid?.getPriceDisplay;

  const variant = data?.variant || data?.variants?.condition;
  const Variant = Variants?.[variant];

  useEffect(() => {
    ecwid.setId(product.ecwidProductId);
  }, [ecwid.id]);

  const ecwidProduct = useMemo(() => {
    let data = null;
    if (ecwid_products && product?.ecwidProductId) {
      data = ecwid_products;
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
