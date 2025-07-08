import React, { useState, useEffect } from "react";
import { useToast, Tooltip, Box, Text } from "@sanity/ui";
import { useClient, useDocumentOperation, useValidationStatus } from "sanity";
import { SCHEDULED_PUBLISHING_URL, SUPABASE_ANON_KEY } from "studio/config";

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

        const currentDateTime = new Date().toISOString();

        // remove any scheduled publish from supabase for the document ID
        const scheduledFnRequest = await fetch(
          `${SCHEDULED_PUBLISHING_URL}/functions/v1/schedule`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            },
            body: JSON.stringify({
              documentId: props.id,
              dataset: props.dataset,
            }),
          }
        ).then((response) => response.json());

        if (!scheduledFnRequest.success) {
          console.log(
            "[ERROR] Failed to remove existing scheduled publish. ",
            scheduledFnRequest
          );
          toast.push({
            status: "error",
            title: "Failed to remove existing scheduled publish",
          });
        } else {
          console.log(
            "[INFO] Successfully removed existing scheduled publish."
          );
          toast.push({
            status: "info",
            title: "Successfully removed existing scheduled publish",
          });
        }

        await client
          .patch(props.id, {
            set: { publishedAt: currentDateTime },
            unset: ["publishStatus", "scheduledId"],
          })
          .commit();

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
