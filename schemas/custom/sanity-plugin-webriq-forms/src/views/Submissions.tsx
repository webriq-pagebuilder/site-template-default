import React from "react";
import {
  Card,
  Heading,
  Stack,
  Box,
  Text,
  Button,
  Flex,
  Grid,
  Dialog,
  useToast,
} from "@sanity/ui";
import { Link } from "sanity/router";
import { ArrowLeftIcon, BookIcon, ResetIcon } from "@sanity/icons";
import { useLocalStorage, useSecrets } from "../hooks";
import { SubmissionItem, Tooltip } from "../components";
import { namespace, getAuthHeaders, apiBaseURL, studioBaseUrl } from "../config";
import { Submission } from "../types";

export default function Submissions({ formId }: { formId: any }) {
  const toast = useToast();
  const [submissions, setSubmissions] = useLocalStorage(
    `${namespace}--submissions-${formId}`,
    undefined
  );
  const { secrets } = useSecrets(namespace);

  // dialog
  const [modal, setModal] = React.useState({
    heading: "Delete All Submissions",
    body: "",
    confirmText: "",
    onSubmit: () => {},
  });
  const [open, setOpen] = React.useState(false);
  const onClose = React.useCallback(() => setOpen(false), []);
  const onOpen = React.useCallback(() => setOpen(true), []);

  console.log('submissions',submissions)

  React.useEffect(() => {
    const abortController = new AbortController();
    if (secrets) {
      const fetchsubmissions = async () => {
        try {
          const response = await fetch(
            `${apiBaseURL}/forms/${formId}/submissions`,
            {
              headers: getAuthHeaders(secrets as any),
            }
          );
          const data = await response.json();
          setSubmissions(data);
        } catch (error) {
          console.log("error", error);
        }
      };

      fetchsubmissions();
    }
    return () => {
      abortController.abort();
    };
  }, [secrets]);

  const handleDeleteSubmission = (id: string) => {
    setModal({
      heading: "Delete Submission?",
      body: `This action is irreversible! Are you sure you want to delete submission with id: ${id}?`,
      confirmText: "Yes, confirm delete",
      onSubmit: () => {
        fetch(`${apiBaseURL}/forms/${formId}/submissions/${id}`, {
          method: "DELETE",
          headers: getAuthHeaders(secrets as any),
        })
          .then((res) => {})
          .then(() => {
            setSubmissions(
              submissions.filter((submission: { id: string; }) => submission.id !== id)
            );
            toast.push({
              status: "info",
              title: "Successfully deleted submission!",
            });
          })
          .catch((err) => {
            toast.push({
              status: "warning",
              title: "Unable to delete submission!",
            });
          });

        onClose();
      },
    });

    onOpen();
  };

  const handleDeleteAllSubmissions = (e: any) => {
    e.preventDefault();

    setModal({
      heading: "Delete All Submissions?",
      body: "This action is irreversible! Are you sure you want to continue deleting all submissions?",
      confirmText: "Yes, confirm delete all",
      onSubmit: () => {
        fetch(`${apiBaseURL}/forms/${formId}/submissions`, {
          method: "DELETE",
          headers: getAuthHeaders(secrets as any),
        })
          .then((res) => {})
          .then(() => {
            setSubmissions([]);
            toast.push({
              status: "info",
              title: "Successfully deleted all submissions!",
            });
          })
          .catch((err) => {
            toast.push({
              status: "warning",
              title: "Unable to delete all submissions!",
            });
          });

        onClose();
      },
    });

    onOpen();
  };

  if (!submissions) {
    return (
      <Card margin={5} padding={4} shadow={1} radius={2}>
        <Box padding={[3, 3, 4]}>
          <Text muted>Fetching submissions...</Text>
        </Box>
      </Card>
    );
  }

  return (
    <Box margin={5}>
      <Flex justify="space-between" align="center" marginBottom={6}>
        <Box>
          <Stack space={3}>
            <Heading size={2}>Submissions Form ID: {formId}</Heading>
            <Text muted>Viewing recorded submissions of your form.</Text>
          </Stack>
        </Box>
        <Grid columns={2} gap={2}>
          <Link
            style={{ textDecoration: `none` }}
            href={`${namespace}/${formId}/submissions`}
          >
            <Tooltip text="Delete All Submissions">
              <Button
                icon={ResetIcon}
                mode="ghost"
                onClick={handleDeleteAllSubmissions}
              />
            </Tooltip>
          </Link>
          <Link style={{ textDecoration: `none` }} href={`${studioBaseUrl}/${namespace}`}>
            <Tooltip text="Go Back">
              <Button icon={ArrowLeftIcon} mode="ghost" />
            </Tooltip>
          </Link>
        </Grid>
      </Flex>
      <Stack space={4}>
        {submissions?.map((submission: Submission) => (
          <SubmissionItem
            key={submission.id}
            {...submission}
            onDeleteSubmission={() => handleDeleteSubmission(submission.id)}
          />
        ))}
        {submissions.length === 0 && (
          <Card padding={[3, 3, 4]} radius={2} shadow={1} tone="primary">
            <Text muted>No submissions yet, come back later!</Text>
          </Card>
        )}
      </Stack>
      {open && (
        <Dialog header={modal.heading} onClose={onClose} zOffset={1000} id="view-submissions">
          <Box padding={4} as="form" onSubmit={(e) => modal.onSubmit()}>
            <Stack space={5}>
              <Text>{modal.body}</Text>
              <Button text={modal.confirmText} tone="critical" type="submit" />
            </Stack>
          </Box>
        </Dialog>
      )}
    </Box>
  );
}
