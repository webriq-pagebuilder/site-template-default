import {
  Card,
  Heading,
  Stack,
  Box,
  Text,
  Button,
  TextInput,
  Select,
  Flex,
  useToast,
} from "@sanity/ui";
import { Link } from "sanity/router";
import { ArrowLeftIcon, ClipboardIcon } from "@sanity/icons";
import { namespace, studioBaseUrl } from "../config";
import Tooltip from "./Tooltip";
import { Form } from "../types";

export interface FormEditProps {
  form: Form;
  isUpdating: boolean;
  onSubmitForm: (e: any) => void;
}

export default function FormEdit({ form, onSubmitForm, isUpdating }: FormEditProps) {
  const toast = useToast();
  const {
    id,
    name,
    siteUrls,
    testUrls,
    notifications: { email, webhooks } = {},
    recaptcha,
  } = form;

  return (
    <Box margin={5} as="form" onSubmit={onSubmitForm}>
      <Flex justify="space-between" align="center" marginBottom={6}>
        <Box>
          <Stack space={3}>
            <Flex align="center">
              <Heading size={2}>Updating Form ID: {id}</Heading>
              <Box marginLeft={2}>
                <Tooltip text="Copy to clipboard">
                  <Button
                    mode="ghost"
                    icon={ClipboardIcon}
                    tone="primary"
                    fontSize={1}
                    onClick={() => {
                      navigator.clipboard.writeText(id);
                      toast.push({
                        status: "success",
                        title: "Successfully copied to clipboard!",
                      });
                    }}
                  />
                </Tooltip>
              </Box>
            </Flex>
          </Stack>
        </Box>
        <Link style={{ textDecoration: `none` }} href={`${studioBaseUrl}/${namespace}`}>
          <Tooltip text="Go Back">
            <Button icon={ArrowLeftIcon} mode="ghost" />
          </Tooltip>
        </Link>
      </Flex>
      <Card padding={4} shadow={1} radius={2}>
        <Stack space={4}>
          <Stack space={3}>
            <Text muted size={1}>
              NAME
            </Text>
            <TextInput name="name" defaultValue={name} disabled={isUpdating} />
          </Stack>

          <Stack space={3}>
            <Text muted size={1}>
              PRIMARY DOMAIN
            </Text>
            <TextInput
              name="siteUrls"
              defaultValue={[...siteUrls].join(", ") || undefined}
              disabled
            />
            <Text muted size={0}>
              Allows WebriQ Forms to work on the domain you specified! For
              additional URL(s), use <strong>ADDITIONAL URLS</strong> below. 👇
            </Text>
          </Stack>

          <Stack space={3}>
            <Box marginBottom={2}>
              <Heading muted size={0}>
                EMAIL SETTINGS
              </Heading>
            </Box>

            <Box marginBottom={2}>
              <Stack space={3}>
                <Text muted size={1}>
                  Subject
                </Text>
                <TextInput
                  name="notifications[email][subject]"
                  defaultValue={email?.subject ?? ""}
                  placeholder="New Form Submission via WebriQ Forms"
                  disabled={isUpdating}
                />
                <Text muted size={0}>
                  Enter email subject.
                </Text>
              </Stack>
            </Box>

            <Box marginBottom={2}>
              <Stack space={3}>
                <Text muted size={1}>
                  To
                </Text>
                <TextInput
                  name="notifications[email][to]"
                  defaultValue={email?.to?.join(", ") || undefined}
                  placeholder=""
                  disabled={isUpdating}
                />
                <Text muted size={0}>
                  Enter email(s) that are notified when form submission is
                  received. Separate emails by comma (,).
                </Text>
              </Stack>
            </Box>
          </Stack>

          <Stack space={3}>
            <Box marginBottom={2}>
              <Heading muted size={0}>
                RECAPTCHA SETTINGS
              </Heading>
            </Box>

            <Box marginBottom={2}>
              <Stack space={3}>
                <Text muted size={1}>
                  Version
                </Text>
                <Select name="recaptcha[version]" disabled={isUpdating}>
                  <option
                    value="v2"
                    selected={
                      !recaptcha?.version || recaptcha?.version === "v2"
                    }
                  >
                    v2
                  </option>
                  <option value="v3" selected={recaptcha?.version === "v3"}>
                    v3
                  </option>
                </Select>
              </Stack>
            </Box>

            <Box marginBottom={2}>
              <Stack space={3}>
                <Text muted size={1}>
                  Key
                </Text>
                <TextInput
                  name="recaptcha[key]"
                  defaultValue={!recaptcha?.isDefault ? recaptcha?.key : ""}
                  placeholder="Leave blank to use default key"
                  disabled={isUpdating}
                />
              </Stack>
            </Box>
            <Box marginBottom={2}>
              <Stack space={3}>
                <Text muted size={1}>
                  Secret
                </Text>
                <TextInput
                  name="recaptcha[secret]"
                  defaultValue={!recaptcha?.isDefault ? recaptcha?.secret : ""}
                  placeholder="Leave blank to use default secret"
                  disabled={isUpdating}
                />
                <Text muted size={0}>
                  Get your{" "}
                  <a
                    href="https://www.google.com/recaptcha/admin/create"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    recaptcha key and secret here
                  </a>
                  . You can{" "}
                  <a
                    href="https://developers.google.com/recaptcha/docs/versions"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    see the difference between v2 and v3 here
                  </a>
                  .
                </Text>
              </Stack>
            </Box>
          </Stack>

          <Stack space={3}>
            <Box marginBottom={2}>
              <Heading muted size={0}>
                WEBHOOK SETTINGS
              </Heading>
            </Box>

            <Box marginBottom={2}>
              <Stack space={3}>
                <Text muted size={1}>
                  URL(s)
                </Text>
                <TextInput
                  name="notifications[webhooks]"
                  defaultValue={
                    (webhooks ?? [])
                      .filter((w) => w?.status === "enabled")
                      .map((w) => w?.url)
                      .join(",") || undefined
                  }
                  placeholder=""
                  disabled={isUpdating}
                />
                <Text muted size={0}>
                  Enter URL(s) to POST request data when form submission is
                  received. Useful for things such as automating through Zapier
                  and other similar services.
                </Text>
              </Stack>
            </Box>
          </Stack>

          <Stack space={3}>
            <Box marginBottom={2}>
              <Heading muted size={0}>
                ADDITIONAL URLS
              </Heading>
            </Box>

            <Box marginBottom={2}>
              <Stack space={3}>
                <Text muted size={1}>
                  URL(s)
                </Text>
                <TextInput
                  name="testUrls"
                  defaultValue={testUrls.join(",") || undefined}
                  placeholder=""
                  disabled={isUpdating}
                />
                <Text muted size={0}>
                  Enter additional URLs that are allowed to send form
                  submission. Separate domain by comma (,).
                </Text>
              </Stack>
            </Box>
          </Stack>

          <Button
            type="submit"
            tone="primary"
            text={isUpdating ? "Updating..." : "Update"}
            disabled={isUpdating}
          />
        </Stack>
      </Card>
    </Box>
  );
}
