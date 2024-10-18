import React, { useState } from "react";
import { Button } from "@stackshift-ui/button";
import { Text } from "@stackshift-ui/text";

export function SaveAsTemplate({
  currentThemeName,
  onClose,
  loading,
  onClickAction,
}) {
  const [saveOption, setSaveOption] = useState("");
  const [themeName, setThemeName] = useState("");

  const handleSetOption = (e) => {
    setSaveOption(e.target.value);
  };

  const handleSaveThemeName = (e) => {
    setThemeName(e.target.value);
  };

  const notReadyToSave =
    saveOption === "saveNew"
      ? themeName.trim().length < 3
      : saveOption.trim().length === 0;

  return (
    <div className="flex flex-col gap-y-5 p-10 font-sans">
      <Text>How would you like to save this theme?</Text>
      <div className="flex flex-col gap-5">
        <div className="flex">
          <div className="flex items-center h-5">
            <input
              id="overwrite"
              aria-describedby="overwrite-text"
              type="radio"
              value="overwrite"
              disabled={currentThemeName === "Default Theme"}
              checked={saveOption === "overwrite"}
              onChange={handleSetOption}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div className="ms-2 text-sm">
            <label
              className="text-start disabled:text-gray-400 disabled:pointer-events-none"
              htmlFor="overwrite"
            >
              Overwrite theme
              <Text fontSize="sm" className="text-gray-400">
                Update the current theme with your changes. This action cannot
                be undone.
              </Text>
            </label>
          </div>
        </div>
        <div className="flex">
          <div className="flex items-center h-5">
            <input
              id="saveNew"
              aria-describedby="saveNew-text"
              type="radio"
              value="saveNew"
              checked={saveOption === "saveNew"}
              onChange={handleSetOption}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div className="ms-2 text-sm">
            <label
              className="text-start hover:cursor-pointer disabled:text-gray-400"
              htmlFor="saveNew"
            >
              Save as new theme
              <Text fontSize="sm" className="text-gray-400">
                Create a NEW theme with your changes.
              </Text>
            </label>
          </div>
        </div>
        {saveOption === "saveNew" && (
          <div className="px-5 mb-4">
            <label
              className="inline-flex gap-2 text-gray-700 text-sm font-bold mb-2"
              htmlFor="savenewtheme"
            >
              New theme name
              <span className="text-red-700">*</span>
            </label>
            <input
              id="savenewtheme"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-blue-700 placeholder:text-sm"
              type="text"
              placeholder="Project 1 theme"
              value={themeName}
              onChange={handleSaveThemeName}
            />
            {themeName.trim().length < 3 && (
              <span className="text-red-700 text-xs">
                Please enter at least 3 characters
              </span>
            )}
          </div>
        )}
        <div className="flex flex-wrap gap-2 mt-5 justify-end">
          <Button
            as="button"
            ariaLabel="Cancel save"
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
            disabled={loading || notReadyToSave}
            onClick={() => onClickAction(saveOption, themeName)}
          >
            {loading ? "Saving" : "Confirm Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}
