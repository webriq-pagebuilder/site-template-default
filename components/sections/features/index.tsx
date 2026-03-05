import dynamic from "next/dynamic";
import { Features } from "@stackshift-ui/features";
import { SectionsProps } from "types";
import { FeaturesIProps } from "./variant_i";

const CustomVariants: Record<string, React.ComponentType<FeaturesIProps>> = {
  variant_i: dynamic(() => import("./variant_i")),
};

function FeaturesSection({ data }: SectionsProps) {
  const variant = data?.variant;
  const CustomVariant = variant ? CustomVariants[variant] : undefined;

  if (CustomVariant) {
    const props: FeaturesIProps = {
      caption: data?.variants?.subtitle ?? undefined,
      title: data?.variants?.title ?? undefined,
      description: data?.variants?.description ?? undefined,
      mainImage: data?.variants?.mainImage ?? undefined,
      logo: data?.variants?.logo ?? undefined,
      primaryButton: data?.variants?.primaryButton ?? undefined,
      features: data?.variants?.arrayOfImageTitleAndText ?? undefined,
    };
    return <CustomVariant {...props} />;
  }

  return <Features data={data} />;
}

export default FeaturesSection;
