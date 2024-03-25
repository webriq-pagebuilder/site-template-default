import React from "react";
import { setBrandData, setOffersData, ImagesData } from "../helpers";
import { ProductJsonLdProps } from "../types";
import toJson from "utils/toJson";

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

  return toJson(type, schema);
}
