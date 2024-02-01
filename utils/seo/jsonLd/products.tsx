import React from "react";
import { SEOJsonLd } from "./jsonld";
import { setBrandData, setOffersData, ImagesData } from "../helpers";
import { ProductJsonLdProps } from "../types";

export function ProductJsonLd({
  type = "Product",
  productName,
  images,
  url,
  brand,
  description,
  price,
  priceCurrency,
}: ProductJsonLdProps) {
  const schema = {
    name: productName,
    description,
    image: ImagesData(images),
    brand: setBrandData(brand),
    offers: setOffersData({ price, priceCurrency, url }),
  };

  return <SEOJsonLd type={type} scriptKey="product" {...schema} />;
}
