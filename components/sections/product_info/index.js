import { memo, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import { useEcwid } from "context/EcwidContext";
import EditSection from "components/EditSection";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
};

function ProductInfo({ data, product, pageInfo, enableInlineEditing }) {
  const ecwid = useEcwid();
  const ecwid_products = ecwid?.products || null;
  const price = ecwid?.price || 0;
  const getPriceDisplay = ecwid?.getPriceDisplay;

  const variantSku = ecwid.selected;

  const variant = data?.variant || data?.variants?.condition;
  const Variant = Variants?.[variant];

  useEffect(() => {
    if (product?.ecwidProductId) {
      ecwid.setId(product?.ecwidProductId);
    }
  }, [ecwid, product?.ecwidProductId]);

  const ecwidProduct = useMemo(() => {
    let data = null;
    if (product?.ecwidProductId && ecwid_products) {
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
    variantSku,
    getPriceDisplay: () => getPriceDisplay(price),
  };

  if(Variant) {
    if(enableInlineEditing) {
      return (
        <EditSection 
          documentId={pageInfo?.documentId} 
          documentType={pageInfo?.documentType} 
          children={
            <Variant {...props} />
          } 
        /> 
      )
    }

    return <Variant {...props} />
  } 
}
export default memo(ProductInfo);
