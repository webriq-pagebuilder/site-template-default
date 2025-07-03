import dynamic from "next/dynamic";
import {
  LabeledRoute,
  LabeledRouteWithKey,
  Logo,
  Logos,
  MegaMenu,
  SectionsProps,
  SocialLink,
} from "../../../types";
import * as NavigationVariants from "@stackshift-ui/navigation";

const Variants = {
  variant_a: NavigationVariants.Navigation_A,
  variant_b: NavigationVariants.Navigation_B,
  variant_c: NavigationVariants.Navigation_C,
  variant_d: NavigationVariants.Navigation_D,
  variant_e: dynamic(() => import("./variant_e")),
  variant_f: NavigationVariants.Navigation_F,
  variant_g: NavigationVariants.Navigation_G,
  variant_h: NavigationVariants.Navigation_H,
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
  logos?: Logos[];
  links?: LabeledRouteWithKey[];
  primaryButton?: LabeledRoute;
  secondaryButton?: LabeledRoute;
  banner?: any;
  multipleLinks?: any;
  title?: string;
  socialMedia?: SocialLink[];
  dropdownMenu?: LabeledRouteWithKey[];
  iconLinks?: LabeledRouteWithKey[];
  megaMenu?: MegaMenu[];
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
    multipleLinks: data?.variants?.multipleLinks ?? undefined,
    title: data?.variants?.title ?? undefined,
    dropdownMenu: data?.variants?.dropdownMenu ?? undefined,
    logos: data?.variants?.logos ?? undefined,
    socialMedia: data?.variants?.socialMedia ?? undefined,
    socialLinks: data?.variants?.socialLinks ?? undefined,
    iconLinks: data?.variants?.iconLinks ?? undefined,
    megaMenu: data?.variants?.megaMenu ?? undefined,
  };

  return Variant ? <Variant {...props} /> : null;
};

Navigation.displayName = displayName;
