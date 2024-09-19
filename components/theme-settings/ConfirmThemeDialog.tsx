import React, { useState } from "react"
import {
  Dialog,
  ThemeProvider as SanityUIThemeProvider,
  studioTheme,
} from "@sanity/ui"
import { useTheme } from "context/ThemeContext";
import {
  RevertAllTemplate,
  SaveAsTemplate,
  SetThemeTemplate
} from "./templates";

export function ConfirmThemeDialog({
  id,
  action,
  heading,
  onClose,
  zOffset = 1000,
  loading,
  onClickAction
}) {
  const { currentThemeName } = useTheme() || {};
  const [selectedOption, setSelectedOption] = useState(currentThemeName);

  return (
    <SanityUIThemeProvider theme={studioTheme}>
      <Dialog
        id={id}
        onClose={onClose}
        zOffset={zOffset}
        header={heading}
        width={1}
      >
        {action === "saveAs" ? (
          <SaveAsTemplate
            {...{
              selectedOption,
              setSelectedOption,
              onClose,
              loading,
              onClickAction
            }}
          />
        ) : action === "setTheme" ? (
          <SetThemeTemplate 
            {...{
              selectedOption,
              onClose,
              loading,
              onClickAction
            }}
          />
        ) : (
          <RevertAllTemplate 
            {...{
              selectedOption,
              onClose,
              loading,
              onClickAction
            }}
          />
        )}
        
      </Dialog>
    </SanityUIThemeProvider>
  )
};