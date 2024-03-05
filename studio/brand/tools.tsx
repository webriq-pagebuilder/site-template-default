import { defineConfig, ToolMenuProps, ToolLink } from "sanity";
import { Flex, Button } from "@sanity/ui";
import { PlugIcon } from "@sanity/icons";

export function StackshiftStudioTools(props) {
  const { activeToolName, context, tools } = props;
  const isSidebar = context === "sidebar";

  // Change flex direction depending on context
  const direction = isSidebar ? "column" : "row";

  return (
    <Flex gap={1} direction={direction}>
      {tools.map((tool) => (
        <Button
          as={ToolLink}
          icon={tool.icon || PlugIcon}
          key={tool.name}
          name={tool.name}
          padding={3}
          selected={tool.name === activeToolName}
          text={tool.title || tool.name}
          mode="bleed"
          tone="primary"
        />
      ))}
    </Flex>
  );
}
