import React from "react";
import { Button, Text } from "components/ui";

export function RevertAllTemplate({ onClose, loading, onClickAction }) {
  return (
    <div className="flex flex-col gap-y-5 p-10 font-sans">
      <Text
        fontSize="base"
        weight="normal"
      >
        Are you sure you want to revert ALL changes made to this theme?
      </Text>
      <Text
        fontSize="sm"
        weight="semibold"
        className="text-red-500"
      >
        NOTE: This action is irreversible! Confirming will also refresh the page.
      </Text>
      <div className="flex flex-wrap gap-2 mt-5 justify-end">
        <Button
          as="button"
          ariaLabel="Cancel revert"
          variant="unstyled"
          className="text-sm p-3 text-black hover:text-gray-500 disabled:text-gray-500"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          as="button"
          ariaLabel="Confirm save"
          className="text-sm p-3 rounded-lg bg-black text-white hover:bg-gray-500 disabled:bg-gray-500"
          loading={loading}
          disabled={loading}
          onClick={onClickAction}
        >
          {loading ? "Reverting" : "Confirm Revert"}
        </Button>
      </div>
    </div>
  )
}