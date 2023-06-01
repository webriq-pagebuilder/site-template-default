import { Card, Flex, Spinner, Text } from "@sanity/ui";

export default function AutologinPrepage({ready, retrying}: {ready: boolean, retrying: boolean}) {
  return (
    <Card padding={8}>
      <Flex
        align="center"
        direction="column"
        gap={5}
        height="fill"
        justify="center"
        >
        {!ready && !retrying ? (
          <>
            <Text size={3} weight="bold">
              Oops, unable to autologin!
            </Text>
            <Text muted size={1}>
              Please notify WebriQ about this issue...
            </Text>
          </>
        ) : (
          // auto login is still in progress
          <>
            <Spinner size={4} />
            <Text size={3} weight="bold">
              Logging in to WebriQ Studio
            </Text>
            <Text muted size={1}>
              Please wait...
            </Text>
          </>
        )}
      </Flex>
    </Card>
  );
}