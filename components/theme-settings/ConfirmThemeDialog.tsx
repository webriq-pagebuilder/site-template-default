import React from "react"
import {
  Dialog,
  ThemeProvider,
  studioTheme,
} from "@sanity/ui"
import { Button, Text } from "components/ui";

interface DialogProps {
  id: string;
  heading: string;
  content: string;
  onClose: () => void,
  zOffset?: number;
  onClickSave: () => Promise<void>;
  loading?: boolean;
}

export function ConfirmThemeDialog({
  id,
  heading,
  content,
  onClose,
  zOffset,
  onClickSave,
  loading
}: DialogProps) {
  return (
    <ThemeProvider theme={studioTheme}>
      <Dialog
        id={id}
        onClose={onClose}
        zOffset={zOffset ?? 1000}
        header={heading}
        width={1}
      >
        <div className="flex flex-col gap-y-10 p-10 font-sans">
          <div className="flex flex-col gap-3">
            <Text>
              {content}
            </Text>
            <Text
              weight="semibold"
              className="text-primary"
            >
              NOTE: This action is irreversible! Confirming will also refresh the page.
            </Text>
          </div>
          <div className="flex flex-wrap gap-2 justify-end">
            <Button
              as="button"
              ariaLabel="Cancel save"
              variant="unstyled"
              className="py-3 px-6 text-secondary hover:text-secondary/50 rounded-md"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              as="button"
              ariaLabel="Confirm save"
              className="rounded-md"
              loading={loading}
              onClick={onClickSave}
            >
              Confirm Save
            </Button>
          </div>
        </div>
      </Dialog>
    </ThemeProvider>
  )
}