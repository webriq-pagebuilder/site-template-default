import React, { useCallback, useRef, useState } from "react";
import {
  Button,
  Text
} from "components/ui";
import { FaSpinner } from "react-icons/fa";
import { HexColorInput, HexColorPicker } from "react-colorful";
import { MdOutlineRestore } from "react-icons/md";
import { themeClient } from "lib/sanity.client";
import { ToastContainer, toast } from "react-toast";
import { SANITY_PROJECT_ID } from "studio/config";
import { useClickOutside } from "utils/theme";

export function ColorPicker({
  defaultColor,
  customizedTheme,
  setCustomizedTheme,
  colorKey,
  savedTheme
}) {
  const customColor = customizedTheme?.extend?.colors;

  const colorName =
    defaultColor?.label === "background" ? "light" : defaultColor?.label;
  
  const colorInputLabel = colorName?.charAt(0)?.toUpperCase() + colorName?.slice(1);

  const [loading, setLoading] = useState(false);
  const [colorPickerOpen, setColorPickerOpen] = useState<string | null>(null); // Track active color picker
  const colorPickerPopupRef = useRef();

  const isOpen = colorPickerOpen === colorKey;
  const close = useCallback(() => setColorPickerOpen(null), []);
  useClickOutside(colorPickerPopupRef, close);

  const handleColorChange = (colors) => {
    setCustomizedTheme((prev) => ({
      ...prev,
      extend: {
        ...prev?.extend,
        colors: {
          ...prev?.extend?.colors, // Preserve existing colors
          ...colors, // Update only the changed color
        },
      },
    }));
  };

  const handleRevertColor = async (colorToRevert) => {
    try {
      setLoading(true);

      const existingThemeConfig = {
        ...savedTheme,
        extend: {
          ...savedTheme?.extend,
          colors: {
            ...customColor,
            ...colorToRevert, // revert only the active color picker
          },
        },
      };

      await themeClient
        .createOrReplace({
          name: "Theme Settings",
          _id: `drafts.${SANITY_PROJECT_ID}-theme-settings`,
          _type: "themeSettings",
          theme: existingThemeConfig
        })
        .then(() => {
          setCustomizedTheme(existingThemeConfig);

          console.log("[INFO] Successfully reverted theme changes");
          toast.info("Successfully reverted theme changes")
        });
    }  catch (error) {
      console.log("[ERROR] Failed to revert color changes ", error);
      toast.error("Failed to revert color changes! See logs.")
    } finally {
      setLoading(false);
      close();
    }
  };

  const handleColorPickerToggle = (key: string) => {
    setColorPickerOpen((prev) => (prev === key ? null : key));
  };

  return (
    <div className="flex flex-col gap-2">
      <Text
        fontSize="sm"
        weight="semibold"
      >
        {colorInputLabel}
      </Text>
      <div className="relative rounded bg-white border border-gray-300 text-sm">
        <div className="flex gap-x-2">
          <div
            className="w-9 h-7 m-2 cursor-pointer rounded"
            style={{
              backgroundColor: customColor?.[colorName],
            }}
            onClick={() => handleColorPickerToggle(colorKey)}
          />
          <HexColorInput
            color={customColor?.[colorName]}
            onChange={(newColor) =>
              handleColorChange({ [colorName]: newColor })
            }
            placeholder="Enter hex color"
            style={{
              border: 0,
              color: "inherit",
              width: "100%",
              outline: "none",
              lineHeight: "1.25rem",
              borderRadius: "0.25rem",
            }}
          />
          <Button
            as="button"
            ariaLabel="Restore color"
            variant="unstyled"
            className="absolute top-0 right-0 p-3 bg-transparent text-black disabled:text-gray-300 hover:text-red-500 cursor-pointer disabled:cursor-auto"
            onClick={() =>
              handleRevertColor({
                [colorName]: defaultColor?.value,
              })
            }
            disabled={
              customColor?.[colorName] === defaultColor?.value ||
              !defaultColor
            }
          >
            {loading ? (
              <FaSpinner className="animate-spin w-5 h-5" />
            ): (
              <MdOutlineRestore className="w-5 h-5" />
            )}
          </Button>
        </div>
        {colorPickerOpen === colorKey && (
          <div
            className="absolute w-auto transition ease-in-out delay-150 border border-slate-300 bg-white mt-2 pt-0 px-2 pb-2 z-10 overflow-visible shadow-xl rounded-md"
            ref={colorPickerPopupRef}
          >
            <div className="custom-layout color-picker">
              <HexColorPicker
                color={customColor?.[colorName]}
                onChange={(newColor) =>
                  handleColorChange({ [colorName]: newColor })
                }
              />
            </div>
          </div>
        )}
      </div>
      <div style={{ zIndex: 1 }}>
        <ToastContainer delay={5000} position="bottom-right" />
      </div>
    </div>
  )
}