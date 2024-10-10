   import React from "react";
   import { cn } from "utils/cn";

   type TextProps = {
     className?: string;
     children: React.ReactNode;
     style?: React.CSSProperties;
     muted?: boolean;
     weight?: Weight;
     fontSize?: Size;
     [key: string]: any;
   };

   type Size =
     | "xs"
     | "sm"
     | "base"
     | "lg"
     | "xl"
     | "2xl"
     | "3xl"
     | "4xl"
     | "5xl"

   type Weight =
     | "light"
     | "normal"
     | "semibold"
     | "bold"
     | "medium"

   export function Text({
     type = "p",
     className,
     children,
     style,
     muted = false,
     weight,
     fontSize,
     ...props
   }: TextProps) {

     const fontSizeMap = {
       xs: "text-xs",
       sm: "text-sm",
       base: "text-base",
       lg: "text-lg",
       xl: "text-xl",
       "2xl": "text-2xl",
       "3xl": "text-3xl",
       "4xl": "text-4xl",
       "5xl": "text-5xl",
     };

     const fontWeightMap = {
       light: "font-light",
       normal: "font-normal",
       medium: "font-medium",
       semibold: "font-semibold",
       bold: "font-bold",
     };

     const size = fontSize ? fontSizeMap[fontSize] : "text-global";
     const fontWeight = weight ? fontWeightMap[weight] : "font-global";
     const commonClass = `${size} ${fontWeight} ${muted && "text-gray-500"}`;

     const variants = {
       p: `${commonClass}`,
     };

     const variantClass = variants[type] ?? variants["p"];

     return (
       <p
         style={style}
         className={cn(variantClass, className)}
         {...props}
       >
         {children}
       </p>
     );
   }