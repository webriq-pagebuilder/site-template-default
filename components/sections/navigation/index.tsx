import React from "react";
import dynamic from "next/dynamic";
import {
  LabeledRoute,
  LabeledRouteWithKey,
  Logo,
  SectionsProps,
} from "../../../types";
import * as NavigationVariants from "@stackshift-ui/navigation";

const DefaultVariants = Object.keys(NavigationVariants).reduce(
  (acc, key) => {
    const variantKey = key.toLowerCase();
    acc[variantKey] = NavigationVariants[key];

    return acc;
  },
  {} as Record<string, any>
);

const Variants = {
  ...DefaultVariants,
  variant_e: dynamic(() => import("./variant_e")),
};

export interface ResponsiveNavLinksProps {
  menu: boolean;
  showMenu: () => void;
  links?: LabeledRouteWithKey[];
  primaryButton?: LabeledRoute;
  secondaryButton?: LabeledRoute;
}

export interface NavigationProps {
  template?: any;
  logo?: Logo;
  links?: LabeledRouteWithKey[];
  primaryButton?: LabeledRoute;
  secondaryButton?: LabeledRoute;
  banner?: any;
}

const displayName = "Navigation";

export const Navigation: React.FC<SectionsProps> = ({ data }) => {
  const variant = data?.variant;
  const Variant = variant && Variants?.[variant as keyof typeof Variants];

  const props = {
    logo: data?.variants?.logo ?? undefined,
    links: data?.variants?.routes ?? undefined,
    primaryButton: data?.variants?.primaryButton ?? undefined,
    secondaryButton: data?.variants?.secondaryButton ?? undefined,
    banner: data?.variants?.banner ?? undefined,
  };

  return Variant ? <Variant {...props} /> : null;
};

Navigation.displayName = displayName;
