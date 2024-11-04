import React from "react";
import { namespace, getAuthHeaders, apiBaseURL } from "../config";
import { Card, Box, Text, useToast } from "@sanity/ui";
import { useLocalStorage, useSecrets } from "../hooks";
import { FormEdit } from "../components";
import { Secret } from "../types";

export default function Form({ formId }: { formId: any }) {
  const toast = useToast();
  const { secrets }: { secrets?: Secret } = useSecrets(namespace);
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [form, setForm] = useLocalStorage(`${namespace}--form-${formId}`);

  React.useEffect(() => {
    let abortController = new AbortController();
    if (secrets && formId) {
      const fetchData = async () => {
        try {
          const response = await fetch(`${apiBaseURL}/forms/${formId}`, {
            headers: getAuthHeaders(secrets as any),
          });
          const newData = await response.json();
          setForm(newData);
        } catch (error) {
          console.log("error", error);
        }
      };

      fetchData();
    }
    return () => {
      abortController.abort();
    };
  }, [secrets, formId]);

  const onSubmitForm = (e: any) => {
    e.preventDefault();

    const form = e.currentTarget;
    const { elements } = form;

    let requestBody: any = {};
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].value) {
        switch (elements[i].name) {
          case "name":
            requestBody = {
              ...requestBody,
              ...{ [elements[i].name]: elements[i].value },
            };
            break;
          case "notifications[email][subject]":
            requestBody = {
              ...requestBody,
              notifications: {
                ...requestBody?.notifications,
                email: {
                  ...requestBody?.notifications?.email,
                  subject: elements[i].value,
                },
              },
            };
            break;
          case "notifications[email][to]":
            requestBody = {
              ...requestBody,
              notifications: {
                ...requestBody?.notifications,
                email: {
                  ...requestBody?.notifications?.email,
                  to: elements[i].value
                    ?.split(",")
                    ?.reduce((allItems: any[], item: any) => {
                      function validateEmail(email: any) {
                        const re =
                          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        return re.test(String(email).toLowerCase());
                      }
                      if (validateEmail(item)) {
                        allItems = [...allItems, item];
                      }

                      return allItems;
                    }, []),
                },
              },
            };
            break;
          case "recaptcha[version]":
            requestBody = {
              ...requestBody,
              recaptcha: {
                ...requestBody.recaptcha,
                version: elements[i].value,
              },
            };
            break;
          case "recaptcha[key]":
            requestBody = {
              ...requestBody,
              recaptcha: {
                ...requestBody.recaptcha,
                key: elements[i].value,
              },
            };
            break;
          case "recaptcha[secret]":
            requestBody = {
              ...requestBody,
              recaptcha: {
                ...requestBody.recaptcha,
                secret: elements[i].value,
              },
            };
            break;
          case "notifications[webhooks]":
            requestBody = {
              ...requestBody,
              notifications: {
                ...requestBody?.notifications,
                webhooks: elements[i].value?.split(",")?.map((webhook: any) => ({
                  name: `Webhook ${new Date().getTime()}`,
                  url: webhook,
                  status: "enabled",
                })),
              },
            };
            break;
          case "testUrls":
            requestBody = {
              ...requestBody,
              testUrls: elements[i].value?.split(","),
            };
            break;
          default:
        }
      }
    }

    // empty webhooks
    if (!elements["notifications[webhooks]"]?.value) {
      requestBody = {
        ...requestBody,
        notifications: {
          ...requestBody?.notifications,
          webhooks: [],
        },
      };
    }
    // empty testUrls aka additional urls
    if (!elements["testUrls"]?.value) {
      requestBody = {
        ...requestBody,
        testUrls: [],
      };
    }
    // make sure we have latest urls from allowedDomains
    if (secrets) {
      requestBody = {
        ...requestBody,
        siteUrls: [secrets?.primaryDomain],
      };
    }

    // Send update
    setIsUpdating(true);
    fetch(`${apiBaseURL}/forms/${formId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(secrets as any),
      },
      body: JSON.stringify(requestBody),
    })
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then(setForm)
      .then(() =>
        toast.push({
          status: "success",
          title: "Successfully updated form!",
        })
      )
      .catch(() =>
        toast.push({
          status: "warning",
          title: "Unable to update form!",
        })
      )
      .finally(() => setIsUpdating(false));
  };

  if (!form) {
    return (
      <Card margin={5} padding={4} shadow={1} radius={2}>
        <Box padding={[3, 3, 4]}>
          <Text muted>Fetching form information...</Text>
        </Box>
      </Card>
    );
  }

  return (
    <>
      <FormEdit {...{ form, onSubmitForm, isUpdating }} />
    </>
  );
}
