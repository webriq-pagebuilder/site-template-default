import React from "react";
import dynamic from "next/dynamic";
import EditSection from "components/EditSection";
import {
  SectionsProps,
  PortfoliosWithCategories,
  Portfolio,
  LabeledRoute,
} from "types";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
  variant_c: dynamic(() => import("./variant_c")),
  variant_d: dynamic(() => import("./variant_d")),
};

export interface PortfolioProps {
  template?: any;
  caption?: string;
  title?: string;
  portfoliosWithCategory?: PortfoliosWithCategories[];
  portfolios?: Portfolio[];
  primaryButton?: LabeledRoute;
}

function Portfolio({ template, data, enableInlineEditing }: SectionsProps) {
  const variant = data?.variant || data?.variants?.condition;
  const Variant = Variants?.[variant];

  const props = {
    template,
    caption: data?.variants?.subtitle,
    title: data?.variants?.title,
    portfoliosWithCategory: data?.variants?.portfoliosWithCategories,
    portfolios: data?.variants?.portfolios,
    primaryButton: data?.variants?.primaryButton,
  };

  return (
    <>
      {enableInlineEditing && (
        <EditSection documentType={data?._type} documentId={data?._id} />
      )}
      {Variant ? <Variant {...props} /> : null}
    </>
  );
}
export default React.memo(Portfolio);
