import { Heading, Text } from "components/ui";
import React from "react";
import { HeaderProps } from ".";

function VariantF({ title, description }: HeaderProps) {
  return (
    <div>
      <Heading>{title}</Heading>
      <Text>{description}</Text>
    </div>
  );
}

export default React.memo(VariantF);
