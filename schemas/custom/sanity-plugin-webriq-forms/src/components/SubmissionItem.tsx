import {
  Card,
  Text,
  Heading,
  Stack,
  Flex,
  Box,
  Button,
} from "@sanity/ui";
import { TrashIcon } from "@sanity/icons";
import { format, isToday, isYesterday, getYear } from "date-fns";
import { namespace } from "../config";
import Tooltip from "./Tooltip";
import { Submission } from "../types";

function SubmissionItem(props: Submission) {
  const { id, payload, attachments, createdAt, onDeleteSubmission } = props;

  return (
    <Card padding={[3, 3, 4]} shadow={1} radius={2}>
      <Flex justify="space-between" align="center">
        <Box>
          <Stack space={5}>
            <Heading size={1}>ID: {id}</Heading>
            <Stack space={3}>
              {Object.entries(payload).map(([key, value]) => {
                let attachment = attachments.find(
                  (attachment) => attachment.url === value
                );
                return (
                  <Flex key={key} align="center">
                    <Box marginRight={1}>
                      <Text muted>{key}:</Text>
                    </Box>{" "}
                    {attachment ? (
                      <a href={typeof value === "string" ? value : undefined} target="_blank" rel="noopener nofollow">
                        {attachment?.original_filename}
                      </a>
                    ) : (
                      <Text>{value as string}</Text>
                    )}
                  </Flex>
                );
              })}
            </Stack>
            <Text size={1} muted>
              {formatDate(new Date(createdAt))}
            </Text>
          </Stack>
        </Box>
        <Box>
          <Tooltip text="Delete Submission">
            <Button
              mode="ghost"
              tone="primary"
              icon={TrashIcon}
              as="button"
              onClick={onDeleteSubmission}
            />
          </Tooltip>
        </Box>
      </Flex>
    </Card>
  );
}

const formatDate = (d: Date) => {
  if (isToday(d)) {
    return `Today at ${format(d, "p")}`;
  }

  if (isYesterday(d)) {
    return `Yesterday at ${format(d, "p")}`;
  }

  const localizedDate = format(d, "PP").replace(`, ${getYear(d)}`, "");

  return `${localizedDate} at ${format(d, "p")}`;
};

export default SubmissionItem;
