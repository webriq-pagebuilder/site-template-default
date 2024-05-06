/* eslint-disable no-console */
import React from "react";
import { TextArea, TextInput, Stack, Text, Card } from "@sanity/ui";
import { payload, ecwidApiUrl } from "./config";
import { set, unset, useFormValue, useClient } from "sanity";
import { apiVersion } from "../sanity";
import CustomBlockEditor from "../components/CustomBlockEditor";
import {
  HTMLtoPortableText,
  PortableTextToHTML,
} from "../utils/ConvertPortableText";

export default function ProductInputComponent(props: any) {
  const client = useClient({ apiVersion: apiVersion });
  const {
    onChange,
    value = "",
    schemaType,
    elementProps,
    // forwardRefs
    id,
    focusRef,
    onBlur,
    onFocus,
  } = props;

  // ⬇ We aren't doing anything with these except forwarding them to our input.
  const fwdProps = { id, ref: focusRef, onBlur, onFocus };

  const [state, setState] = React.useState("idle"); // idle > fetching > done | error

  // Actual name value of the schema field instead of `text`, `string`, `number` which I think is a bug in Sanity itself
  const currentSchemaFieldName = elementProps?.id;

  // for Ecwid data
  const ecwidProductId = useFormValue(["ecwidProductId"]);
  const documentId = useFormValue(["_id"]);

  const isBlockDescription =
    currentSchemaFieldName === "description" && schemaType?.name === "array";

  // if block type, convert current value to html to compare with fetched Ecwid value
  const currentSchemaFieldValue = isBlockDescription
    ? PortableTextToHTML(value)
    : value;

  React.useEffect(() => {
    if (ecwidProductId) {
      setState("fetching");
      fetch(`${ecwidApiUrl}/${ecwidProductId}`, payload)
        .then((res) => {
          if (!res.ok) {
            throw new Error(res.statusText);
          }

          return res.json();
        })
        .then((product) => product?.[currentSchemaFieldName]) // we just need the ecwid value on field
        .then(async (currentEcwidValue) => {
          // check if it matches current Sanity field value
          if (currentEcwidValue !== value) {
            console.log(
              `[INFO] Out of sync value! Updating '${currentSchemaFieldName}' from '${currentSchemaFieldValue}' to '${currentEcwidValue}'...`
            );

            // convert Ecwid value for block content
            const content = isBlockDescription
              ? [...HTMLtoPortableText(currentEcwidValue, schemaType)]
              : currentEcwidValue;

            // update value if it doesn't match
            await client
              .patch(documentId)
              .set({
                [currentSchemaFieldName]: content,
              })
              .commit() // perform the patch and return a promise
              // eslint-disable-next-line max-nested-callbacks
              .then(() => {
                console.log(
                  `Updated product with latest data from Ecwid store...`
                );
              });
          }

          console.log("[INFO] Nothing to do! Values are up to date... Yay");
        })
        .then(() => setState("done"))
        .catch((err) => {
          console.error("[ERR] Error fetching ECWID product details", err);
          setState("error");
        });
    }
  }, [ecwidProductId]);

  // Creates a change handler for patching data
  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      let value;

      if (
        typeof event.currentTarget.value === "string" &&
        schemaType?.name === "number"
      ) {
        value = parseFloat(event.currentTarget.value);
      } else {
        value = event.currentTarget.value;
      }

      onChange(value ? set(value) : unset());
    },
    [onChange]
  );

  return (
    <Stack space={2}>
      {isBlockDescription ? (
        <CustomBlockEditor
          {...{
            ...props,
            client,
            documentId,
            fieldName: currentSchemaFieldName,
            readOnly: ["fetching"].includes(state) || props?.readOnly,
            type: schemaType,
          }}
        />
      ) : (
        <MaybeTextInputOrTextArea
          {...fwdProps}
          onChange={handleChange}
          value={value || ""} // Current field value
          readOnly={["fetching"].includes(state) || elementProps?.readOnly} // If "readOnly" is defined make this field read only
          type={schemaType}
        />
      )}

      {state === "error" && (
        <Card padding={[2]} radius={2} shadow={1} tone="caution">
          <Text align="left" size={[1]}>
            Caution: Unable to fetch latest product info! Current value might
            override product on Ecwid if they're not the same which is not what
            you want. Please, proceed with caution...
          </Text>
        </Card>
      )}
    </Stack>
  );
}

const MaybeTextInputOrTextArea = (props: any) => {
  const { type, ...rest } = props;

  if (type.name === "text") {
    const defaultTextAreaRowCount = 10;
    //rest["value"] = rest.value.replace(/(<.*?>)|\s+/g, " ");

    return <TextArea {...rest} rows={defaultTextAreaRowCount} />;
  }

  if (type.name === "number") {
    return <TextInput {...rest} type="number" step="0.01" />;
  }

  if (type.name === "string") {
    return <TextInput {...rest} />;
  }

  return <Text>Unsupported type! Only string and text is supported...</Text>;
};
