// Custom block content
import React from "react";
import { BlockEditor } from "sanity";
import { HTMLtoPortableText } from "../utils/ConvertPortableText";

export default function CustomBlockEditor(props: any) {
  const { client, documentId, fieldName } = props;

  // The custom paste handler function to pass as props to BlockEditor
  // TODO: update implementation to work when pasting HTML content on multiple events
  // Note: It seems there is an existing issue with Sanity block content where even when I have updated to the latest version, pasting HTML content returns an error in the studio
  const handlePasteContent = async (data: any) => {
    const html = data.event.clipboardData.getData("text") || "";
    const content = [...HTMLtoPortableText(html, props?.type)];

    // update value if it doesn't match
    try {
      await client
        .patch(documentId)
        .set({
          [fieldName]: content,
        })
        .commit(); // perform the patch and return a promise
    } catch (error) {
      console.error("Error updating content:", error);
    }
  };

  return <BlockEditor {...props} />;
}
