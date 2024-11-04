import React from "react";
import { Box, Stack, Card, Heading, Text, useToast } from "@sanity/ui";
import { useLocalStorage, useSecrets } from "../hooks";
import { FormItem } from "../components";
import { namespace, getAuthHeaders, apiBaseURL } from "../config";
import { Form, Secret } from "../types";

export default function Forms() {
  const toast = useToast();
  const [forms, setForms] = useLocalStorage(`${namespace}--forms`, undefined);
  const { secrets }: { secrets?: Secret } = useSecrets(namespace);

  React.useEffect(() => {
    let abortController = new AbortController();
    if (secrets) {
      const fetchForms = async () => {
        try {
          const response = await fetch(`${apiBaseURL}/forms`, {
            headers: getAuthHeaders(secrets as any),
          });
          if (!response.ok) {
            setForms("ERROR");
          } else {
            setForms(await response.json());
          }
        } catch (error) {
          console.log("error", error);
        }
      };

      fetchForms();
    }
    return () => {
      abortController.abort();
    };
  }, [secrets]);

  // Update all forms when primaryDomain is updated
  React.useEffect(() => {
    if (secrets?.primaryDomain) {
      let primaryDomainUrl: URL | undefined;
      try {
        primaryDomainUrl = new URL(secrets?.primaryDomain);
      } catch (err) {
        console.error("Not updating forms! Invalid primary domain URL");
      }

      if (!primaryDomainUrl) {
        toast.push({
          status: "warning",
          title:
            "Invalid primary domain! Please make sure you've specified a proper URL including the protocol...",
        });
      }

      // get all forms
      if (forms?.length !== 0) {
        forms?.forEach((form: Form) => {
          // primaryDomain url exists, nothing to do
          if (form?.siteUrls?.find((url) => url === primaryDomainUrl?.host)) {
            return;
          }

          fetch(`${apiBaseURL}/forms/${form.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              ...getAuthHeaders(secrets as any),
            },
            body: JSON.stringify({
              siteUrls: [primaryDomainUrl?.host],
            }),
          });
        });
      }
    }
  }, [secrets?.primaryDomain]);

  if (forms === "ERROR") {
    return (
      <Card
        margin={5}
        padding={[3, 3, 4]}
        radius={2}
        shadow={1}
        tone="critical"
      >
        <Stack space={4}>
          <Heading>Unable to verify credentials! </Heading>
          <Text>Please check the API email and key entered...</Text>
        </Stack>
      </Card>
    );
  }

  if (forms?.length === 0) {
    return (
      <Card margin={5} padding={[3, 3, 4]} radius={2} shadow={1} tone="primary">
        <Stack space={4}>
          <Heading>Great! Setup is complete...</Heading>
          <Text>Now, go create forms in your pages' sections...</Text>
        </Stack>
      </Card>
    );
  }

  return (
    <Box margin={5}>
      <Stack space={4}>
        {forms?.map((form: Form) => (
          <FormItem key={form.id} {...form} />
        ))}
      </Stack>
    </Box>
  );
}
