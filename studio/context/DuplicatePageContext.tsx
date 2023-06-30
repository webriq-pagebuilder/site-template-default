import { createContext, useState } from "react";

export const DuplicatePageContext = createContext(null); // pass fallback value

export default function DuplicatePageContextProvider({ duplicatePageData, children }) {
  console.log("context: ", duplicatePageData);
  return (
    <DuplicatePageContext.Provider value={duplicatePageData}>
      {children}
    </DuplicatePageContext.Provider>
  );
}
