import { createContext } from "react";

export const InlineEditorContext = createContext(false); // pass default value

export default function InlineEditorContextProvider ({ showInlineEditor, children }) {
  return (
    <InlineEditorContext.Provider value={showInlineEditor}>
      {children}
    </InlineEditorContext.Provider>
  );
};