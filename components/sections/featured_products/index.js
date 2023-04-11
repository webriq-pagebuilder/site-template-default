import { memo } from "react";
import dynamic from "next/dynamic";
import { EcwidContextProvider } from "context/EcwidContext";
import EditSection from "components/EditSection";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
};

function FeaturedProducts({ data, enableInlineEditing }) {
  const variant = data?.variant || data?.variants?.condition;
  const Variant = Variants?.[variant];

  const props = {
    title: data?.variants?.collections?.name,
    featured: data?.variants?.collections?.products,
  };

  return (
    <EcwidContextProvider>
      {Variant && 
        enableInlineEditing ? (
          <EditSection 
            documentId={data?._id} 
            documentType={data?._type} 
            children={
              <Variant {...props} />
            } 
          /> 
        ) : <Variant {...props} /> 
      }
    </EcwidContextProvider>
  )
}
export default memo(FeaturedProducts);
