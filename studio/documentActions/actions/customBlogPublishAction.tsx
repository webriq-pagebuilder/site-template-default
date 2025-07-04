import React, { useState, useEffect } from "react";
import { useToast, Tooltip, Box, Text } from "@sanity/ui";
import { useClient, useDocumentOperation, useValidationStatus } from "sanity";

export default function customBlogPublishAction(props) {
  const toast = useToast();
  const client = useClient({ apiVersion: "v2021-10-21" });

  const { validation } = useValidationStatus(props.id, props.type);
  const { publish } = useDocumentOperation(props.id, props.type);

  const [isPublishing, setIsPublishing] = useState(false);

  useEffect(() => {
    // if the isPublishing state was set to true and the draft has changed
    // to become `null` the document has been published
    if (isPublishing && !props.draft) {
      setIsPublishing(false);
    }
  }, [props.draft]);

  const isDisabled = validation.length !== 0 || isPublishing;

  return {
    disabled: isDisabled || !props?.draft,
    label: (
      <CustomPublishLabel hasErrors={isDisabled} isPublishing={isPublishing} />
    ),
    onHandle: async () => {
      // This will update the button text
      setIsPublishing(true);

      try {
        // Perform the publish
        publish.execute();

        const publishedAt = props?.draft?.publishedAt || props?.publishedAt;
        const publishStatus =
          props?.draft?.publishStatus || props?.publishStatus;

        // If the document has a publishedAt or publishStatus field, update them
        if (publishedAt || publishStatus) {
          await client
            .patch(props.id, {
              set: {
                publishedAt: new Date().toISOString(),
                publishStatus: "published",
              },
            })
            .commit();
        }

        // Signal that the action is completed
        props.onComplete();
      } catch (error) {
        console.log("Error: ", error);

        // show toast notification on failed request
        toast.push({
          status: "error",
          title: "Ooops, unable to publish document! See logs for more info...",
        });

        // Signal that the action is completed
        props.onComplete();
      }
    },
  };
}

function CustomPublishLabel({ hasErrors = false, isPublishing = false }) {
  if (hasErrors) {
    return (
      <Tooltip
        content={
          <Box padding={2}>
            <Text size={2}>
              There are validation errors that need to be fixed
              <br /> before this document can be published!
            </Text>
          </Box>
        }
        placement="top"
        portal
      >
        <span>Publish Blog</span>
      </Tooltip>
    );
  }

  return isPublishing ? (
    <span>Publishing Blog...</span>
  ) : (
    <span>Publish Blog</span>
  );
}
