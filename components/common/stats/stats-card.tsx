import { Text } from "components/ui/Text";
import Image from "next/image";
import { cn } from "utils/cn";
type TStatsCard = {
  icon: string;
  value: string;
  label: string;
  alt?: string;
  className?: string;
  variant?: "inline" | "stacked";
};

export function StatsCard({
  icon,
  value,
  label,
  alt,
  className,
  variant = "inline",
}: TStatsCard) {
  const commonClass = `w-full px-4`;

  const variantClass = {
    inline: `${commonClass} flex items-center`,
    stacked: `${commonClass} block`,
  };

  const imageVariantClass = {
    inline: `inline-block p-4 mr-4 rounded bg-secondary-foreground`,
    stacked: `inline-block p-4 mx-auto rounded bg-secondary-foreground`,
  };

  const classes = variantClass[variant] ?? variantClass["inline"];
  const imageClasses =
    imageVariantClass[variant] ?? imageVariantClass["inline"];
  return (
    <div className={cn(classes, className)}>
      {icon && (
        <div className={imageClasses}>
          <Image
            src={icon}
            width={24}
            height={24}
            quality={100}
            alt={alt ?? "statistics-icon"}
          />
        </div>
      )}
      <div>
        <p className="text-2xl font-bold">{value}</p>
        <Text muted>{label}</Text>
      </div>
    </div>
  );
}
