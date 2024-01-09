import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";
import { cn } from "utils/cn";

type TSocialIcons = {
  social: Socials;
  className?: string;
};

const SocialIconMap: Record<Socials, (x: any) => JSX.Element> = {
  facebook: FaFacebook,
  instagram: FaInstagram,
  youtube: FaYoutube,
  linkedin: FaLinkedin,
};

export type Socials = "facebook" | "instagram" | "youtube" | "linkedin";

export function SocialIcon({
  social = "facebook",
  className,
  ...props
}: TSocialIcons) {
  const Component = SocialIconMap[social] ?? FaFacebook;
  console.log("Component", Component);
  const commonClass = `w-8 h-8 text-webriq-blue`;
  return <Component className={cn(commonClass, className)} {...props} />;
}
