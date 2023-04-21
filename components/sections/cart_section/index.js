import { memo } from "react";
import dynamic from "next/dynamic";
import { useEcwid } from "context/EcwidContext";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
};

function Cart({ data }) {
  const variant = data?.variant || data?.variants?.condition;
  const Variant = Variants?.[variant];
  const ecwid = useEcwid();

  const props = {
    isReady: ecwid.isScript,
  };

  return Variant ? <Variant {...props} /> : null;
}
export default memo(Cart);