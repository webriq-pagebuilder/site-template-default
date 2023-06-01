import { Card, Flex } from "@sanity/ui";

export default function AutologinPrepage({ children }) {  
  return (
    <Card padding={8}>
      <Flex
        align="center"
        direction="column"
        gap={5}
        height="fill"
        justify="center"
      >
        {children}
      </Flex>
    </Card>
  );
}