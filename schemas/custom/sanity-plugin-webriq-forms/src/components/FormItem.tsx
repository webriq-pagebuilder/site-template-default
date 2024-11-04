import React from "react";
import {
  Card,
  Text,
  Heading,
  Stack,
  Grid,
  Flex,
  Box,
  Button,
  useToast,
} from "@sanity/ui";
import { Link } from "sanity/router";
import { ClipboardIcon, EditIcon, BookIcon } from "@sanity/icons";
import { namespace } from "../config";
import Tooltip from "./Tooltip";

interface FormItemProps {
  id: string;
  name: string;
  siteUrls: string[];
  testUrls: string[];
}

function FormItem(props: FormItemProps) {
  const toast = useToast();
  const { id, name, siteUrls, testUrls } = props;

  return (
    <Card padding={[3, 3, 4]} shadow={1} radius={2}>
      <Flex justify="space-between" align="center">
        <Box>
          <Stack space={3}>
            <Heading size={1}>{name}</Heading>
            <Flex align="center">
              <Text>{id}</Text>
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
            <Text muted>
              {[...new Set([...siteUrls, ...testUrls])].join(", ") ||
                "No URL(s) specified..."}
            </Text>
          </Stack>
        </Box>
        <Box>
          <Grid columns={2} gap={2}>
            <Link
              href={`${namespace}/${id}/submissions`}
              style={{ textDecoration: `none` }}
            >
              <Tooltip text="View submissions">
                <Button
                  mode="ghost"
                  tone="primary"
                  icon={BookIcon}
                  as="button"
                />
              </Tooltip>
            </Link>
            <Link
              href={`${namespace}/${id}`}
              style={{ textDecoration: `none` }}
            >
              <Tooltip text="Manage Form">
                <Button
                  mode="ghost"
                  tone="primary"
                  icon={EditIcon}
                  as="button"
                />
              </Tooltip>
            </Link>
          </Grid>
        </Box>
      </Flex>
    </Card>
  );
}

export default FormItem;
