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
  const displayPriceFormatted = ecwid?.displayPriceFormatted || 0;

  const variant = data?.variant || data?.variants?.condition;
  const Variant = Variants?.[variant];

  const ecwidProducts = useMemo(() => {
    let data = null;
    if (ecwid_products && product?.pid) {
      data = ecwid_products[Number(product.pid)];
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
    ecwidProducts,
    displayPriceFormatted,
  };

  return Variant ? <Variant {...props} /> : null;
}
export default memo(ProductInfo);
