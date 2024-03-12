import { useState } from "react";
import { defineConfig, ToolMenuProps, ToolLink } from "sanity";
import { Flex, Button } from "@sanity/ui";
import { PlugIcon } from "@sanity/icons";

export function StackshiftStudioTools(props) {
  const { activeToolName, context, tools } = props;
  const isSidebar = context === "sidebar";

  // Change flex direction depending on context
  const direction = isSidebar ? "column" : "row";

  const [activeTab, setActiveTab] = useState(activeToolName);
  const [hoverTab, setHoverTab] = useState(null);

  const handleActiveTab = (tabName: string) => {
    setActiveTab(tabName);
  };

  const handleHover = (toolName: string) => {
    setHoverTab(toolName);
  };

  return (
    <Flex gap={1} direction={direction}>
      {tools?.map((tool) => (
        <Button
          as={ToolLink}
          icon={tool.icon || PlugIcon}
          key={tool.name}
          name={tool.name}
          padding={3}
          selected={tool.name === activeToolName}
          text={tool.title || tool.name}
          mode="default"
          tone="primary"
          style={{
            backgroundColor:
              activeTab === tool?.name || hoverTab === tool?.name
                ? "#184082"
                : "#0c1f3c",
            boxShadow: "unset",
          }}
          onClick={() => handleActiveTab(tool?.name)}
          onMouseEnter={() => handleHover(tool.name)}
          onMouseLeave={() => setHoverTab(null)}
        />
      ))}
    </Flex>
  );
}
