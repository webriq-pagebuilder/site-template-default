import React from "react";
import { Heading, Stack, Box, Text, Button, Grid } from "@sanity/ui";
import { SecretsManager } from "./index";

export default function Header() {
  const [showSettings, setShowSettings] = React.useState(false);

  return (
    <>
      <Grid margin={5} gap={3} columns={4}>
        <Stack space={4} style={{ gridColumn: `1/4` }}>
          <Heading as="h2" size={3}>
            WebriQ Forms
          </Heading>
          <Text as="p">
            Every form created in your account will appear below. You can do
            more than just capture form submissions such as adding email
            recipients and forwarding the payload via webhooks for further
            processing.
          </Text>
        </Stack>
        <Stack space={4}>
          <Button onClick={() => setShowSettings(true)} text="Configure" />
          <Text muted size={1}>
            Click here to update your API settings.
          </Text>
        </Stack>
      </Grid>
      <SecretsManager
        showSettings={showSettings}
        setShowSettings={setShowSettings}
      />
    </>
  );
}
