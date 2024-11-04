import { Link } from "sanity/router";
import { namespace, studioBaseUrl } from "../config";
import {
  Card,
  Heading,
  Stack,
  Box,
  Text,
  Flex,
  Button,
} from "@sanity/ui";
import { ArrowLeftIcon, ClipboardIcon, EditIcon } from "@sanity/icons";
import { Form } from "../types";

interface FormDetailProps {
  form: Form;
  onOpen: () => void;
}

export default function FormDetail({ form, onOpen }: FormDetailProps ) {
  const {
    id,
    name,
    siteUrls,
    testUrls,
    notifications: { email, webhooks } = {},
    recaptcha,
  } = form;

  return (
    <Card margin={5} padding={4} shadow={1} radius={2}>
      <Box padding={[3, 3, 4]} as="form">
        <Stack space={6}>
          <Flex justify="space-between">
            <Box>
              <Stack space={3}>
                <Flex align="center">
                  <Heading muted size={2}>
                    {id}
                  </Heading>
                  <Box marginLeft={2}>
                    <Button mode="ghost" icon={ClipboardIcon} tone="primary" />
                  </Box>
                </Flex>
              </Stack>
            </Box>
            <Flex align="center">
              <Box marginRight={2}>
                <Link style={{ textDecoration: `none` }} href={`${studioBaseUrl}/${namespace}`}>
                  <Button icon={ArrowLeftIcon} />
                </Link>
              </Box>
              <Button
                mode="ghost"
                tone="primary"
                text="Edit"
                icon={EditIcon}
                onClick={onOpen}
              />
            </Flex>
          </Flex>

          <Section
            items={[
              {
                name: "NAME",
                value: name,
              },
              {
                name: "URL(s)",
                value: [...siteUrls].join(", ") || "N/A",
              },
            ]}
          />

          <Section
            heading="EMAIL SETTINGS"
            items={[
              {
                name: "SUBJECT",
                value: email?.subject || "New Form Submission via WebriQ Forms",
              },
              {
                name: "TO",
                value: email?.to?.join(", ") || "N/A",
              },
            ]}
          />

          <Section
            heading="RECAPTCHA SETTINGS"
            items={[
              {
                name: "VERSION",
                value: recaptcha?.version || "v2",
              },
              {
                name: "KEY / SECRET",
                value: !recaptcha?.isDefault
                  ? `${recaptcha?.key} / ${recaptcha?.secret}}`
                  : "Default Key / Secret",
              },
            ]}
          />

          <Section
            heading="WEBHOOK SETTINGS"
            items={[
              {
                name: "URL(s)",
                value:
                  (webhooks ?? [])
                    .filter((w) => w.status === "enabled")
                    .map((w) => w.url)
                    .join(", ") || "N/A",
              },
            ]}
          />

          <Section
            heading="ADDITIONAL URLS"
            items={[
              {
                name: "URL(s)",
                value: testUrls?.join(", ") || "N/A",
              },
            ]}
          />
        </Stack>
      </Box>
    </Card>
  );
}

function Section({ heading, items }: { heading?: string, items: { name: string, value: string }[] }) {
  return (
    <Stack space={3}>
      {heading && (
        <Box marginBottom={1}>
          <Heading size={0} muted>
            {heading}
          </Heading>
        </Box>
      )}
      {items?.map((item) => (
        <>
          <Flex align="center">
            <Box marginRight={1}>
              <Text muted size={1}>
                {item.name.toUpperCase()}:
              </Text>
            </Box>
            <Text>{item.value}</Text>
          </Flex>
        </>
      ))}
    </Stack>
  );
}
