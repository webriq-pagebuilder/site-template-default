import React from "react";
import { Button } from "@stackshift-ui/button";
import { Text } from "@stackshift-ui/text";

export function SetThemeTemplate({
  currentThemeName,
  onClose,
  loading,
  onClickAction,
}) {
  return (
    <div className="flex flex-col gap-y-5 p-10 font-sans">
      <Text fontSize="base" weight="normal">
        Are you sure you want to set this as the CURRENT theme?
      </Text>
      <Text fontSize="sm" weight="semibold" className="text-red-500">
        NOTE: This action is irreversible! 
      </Text>
      <div className="flex flex-col gap-5">
        <div className="flex flex-wrap gap-2 mt-5 justify-end">
          <Button
            as="button"
            ariaLabel="Cancel save"
            variant="unstyled"
            className="text-sm p-3 !text-black hover:!text-gray-500 disabled:!text-gray-500"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            as="button"
            ariaLabel="Confirm save"
            className="text-sm p-3 rounded-lg !bg-black !text-white hover:!bg-gray-500 disabled:!bg-gray-500"
            disabled={loading}
            onClick={() => onClickAction(currentThemeName)}
          >
            {loading ? "Saving..." : "Confirm Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}
