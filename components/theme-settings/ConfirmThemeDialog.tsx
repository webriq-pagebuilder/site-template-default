import React from "react"
import {
  Dialog,
  ThemeProvider as SanityUIThemeProvider,
  studioTheme,
} from "@sanity/ui"
import {
  RevertAllTemplate,
  SaveAsTemplate,
  SetThemeTemplate
} from "./templates";

export function ConfirmThemeDialog({
  action,
  zOffset = 1000,
  loading,
  currentThemeName,
  handleSaveConfigAs,
  handleSetCurrentTheme,
  handleRevertAll,
  onModalClose
}) {
  return (
    <SanityUIThemeProvider theme={studioTheme}>
      <Dialog
        id="theme-actions"
        onClose={onModalClose}
        zOffset={zOffset}
        header={action === "revertAll" ? "Revert changes" : action === "setTheme" ? "Set theme" : "Save theme"}
        width={1}
      >
        {action === "saveAs" ? (
          <SaveAsTemplate
            {...{
              currentThemeName,
              onClose: onModalClose,
              loading,
              onClickAction: handleSaveConfigAs
            }}
          />
        ) : action === "setTheme" ? (
          <SetThemeTemplate 
            {...{
              currentThemeName,
              onClose: onModalClose,
              loading,
              onClickAction: handleSetCurrentTheme
            }}
          />
        ) : (
          <RevertAllTemplate 
            {...{
              onClose: onModalClose,
              loading,
              onClickAction: handleRevertAll
            }}
          />
        )}
        
      </Dialog>
    </SanityUIThemeProvider>
  )
};