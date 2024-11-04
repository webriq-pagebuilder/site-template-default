import React, { ChangeEvent, useCallback } from "react";
import { Flex, Box, Button, ThemeProvider, studioTheme, TextInput } from "@sanity/ui";
import { set, unset } from "sanity";
import { useSecrets } from "../hooks";
import { namespace, apiBaseURL, getAuthHeaders, studioBaseUrl } from "../config";

export const withSecrets = (Component: any) => {
  return (props: any) => {
    const { secrets } = useSecrets(namespace);

    return <Component secrets={secrets} {...props} />;
  };
};

function WebriqFormInputComponent (props: any) {
  const [state, setState] = React.useState({ status: "idle" });
  
  const {
    onChange, 
    value = '',
    schemaType,
    validation, 
    elementProps, 
    secrets 
  } = props

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.currentTarget.value
    onChange(nextValue ? set(nextValue): unset())
  }, [onChange]);

  const createPatchFrom = (value: any) => value !== "" ? set(value) : unset();

  const handleClickSetFormId = async (onChange: any) => {
    // @todo: convert to dialog
    if (
      value &&
      !confirm("Are you sure to want to create a new form?")
    ) {
      return;
    }

    setState({ status: "creating_form" });

    let formId = "";
    if (secrets) {
      try {
        formId = await fetch(`${apiBaseURL}/forms`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders(secrets),
          },
          body: JSON.stringify({
            name: "Untitled WebriQ Form",
            siteUrls: [secrets?.primaryDomain || ""],
            recaptcha: {
              version: "v3",
            },
          }),
        })
          .then((res) => res.json())
          .then((result) => result.id);

        if (formId) {
          onChange(createPatchFrom(formId));
          setState({ status: "created" });
        }
      } catch (err) {
        console.log("generate form error", err);
        setState({ status: "create_error" });
      }
    }
  };

  return (
    <ThemeProvider theme={studioTheme}>
      <Flex>
        <Box flex={[1, 2, 3]}>
          <TextInput {...elementProps} onChange={handleChange} value={value} />
        </Box>
        <Box marginLeft={2}>
          <Flex>
            <Button
              mode="ghost"
              as="button"
              text={
                state.status === "creating_form"
                  ? "Generating..."
                  : "Generate ID"
              }
              disabled={state.status === "creating_form"}
              onClick={() => handleClickSetFormId(onChange)}
            />
            {value && (
              <Box marginLeft={1}>
                <Button
                  mode="ghost"
                  text="Manage"
                  as="a"
                  href={`${studioBaseUrl}/${namespace}/${value}`}
                  target="_blank"
                  rel="noopener"
                />
              </Box>
            )}
          </Flex>
        </Box>
      </Flex>
    </ThemeProvider>
  );
};
export default withSecrets(WebriqFormInputComponent);
