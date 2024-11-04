import { Box, Text, Tooltip as SanityTooltip } from "@sanity/ui";

interface ToolTipProps {
  children: any;
  text: string;
}

//Temporary any type for children prop, issue if it will be ReactNode
export default function Tooltip({ children, text }: ToolTipProps) {
  return (
    <SanityTooltip
      content={
        <Box padding={2}>
          <Text muted size={1}>
            {text}
          </Text>
        </Box>
      }
      fallbackPlacements={["right", "left"]}
      placement="top"
    >
      {children}
    </SanityTooltip>
  );
}
