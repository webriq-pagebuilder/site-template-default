import {
  Heading,
  Stack,
  Box,
  Text,
  Button,
  TextInput,
  Dialog,
  Select,
} from "@sanity/ui";
import { Form } from "../types";

interface FormEditDialogProps {
  form: Form;
  onClose: () => void;
  onSubmitForm: () => void;
}

export default function FormEditDialog({ form, onClose, onSubmitForm }: FormEditDialogProps) {
  const {
    id,
    name,
    siteUrls,
    testUrls,
    notifications: { email, webhooks } = {},
    recaptcha,
  } = form;

  return (
    <Dialog header={`Edit Form`} onClose={onClose} zOffset={1000} width={1} id="form-edit">
      <Box padding={4} as="form" onSubmit={onSubmitForm}>
        <Stack space={4}>
          <Stack space={3}>
            <Text muted size={1}>
              NAME
            </Text>
            <TextInput name="name" value={name} />
          </Stack>

          <Stack space={3}>
            <Text muted size={1}>
              URL(s)
            </Text>
            <TextInput
              name="siteUrls"
              value={[...siteUrls].join(", ") || undefined}
            />
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
                  value={email?.subject ?? ""}
                  placeholder="New Form Submission via WebriQ Forms"
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
                  value={email?.to?.join(", ") || undefined}
                  placeholder=""
                />
                <Text muted size={0}>
                  Enter email(s) that are notified when form submission is
                  received. Separate emails by comma.
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
                <Select name="recaptcha[version]">
                  <option value="v2">v2</option>
                  <option value="v3">v3</option>
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
                  value={recaptcha?.key || undefined}
                  placeholder="Leave blank to use default key"
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
                  value={recaptcha?.secret || undefined}
                  placeholder="Leave blank to use default secret"
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
                  value={
                    (webhooks ?? [])
                      .filter((w) => w?.status === "enabled")
                      .map((w) => w?.url)
                      .join(",") || undefined
                  }
                  placeholder=""
                />
                <Text muted size={0}>
                  Enter URL(s) to POST request data when form submission is
                  received.
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
                  value={testUrls.join(", ") || undefined}
                  placeholder=""
                />
                <Text muted size={0}>
                  Enter additional URLs that are allowed to send submission.
                </Text>
              </Stack>
            </Box>
          </Stack>

          <Button type="submit" tone="primary" text="Update Form" />
        </Stack>
      </Box>
    </Dialog>
  );
}
