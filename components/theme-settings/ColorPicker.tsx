import React, { useCallback, useRef, useState } from "react";
import { Button } from "@stackshift-ui/button";
import { Text } from "@stackshift-ui/text";
import { FaSpinner, FaUndo } from "react-icons/fa";
import { HexColorInput, HexColorPicker } from "react-colorful";
import { ToastContainer, toast } from "react-toast";
import { useClickOutside, debounce } from "utils/theme";

export function ColorPicker({
  isLoaded,
  defaultColor,
  mode,
  customizedThemeConfig,
  setCustomizedThemeConfig,
  colorKey,
  savedThemeConfig,
  handleRevertSetting,
}) {
  const customColor = customizedThemeConfig?.colors?.[mode];
  const colorInputLabel =
    colorKey?.charAt(0)?.toUpperCase() + colorKey?.slice(1);

  const [loading, setLoading] = useState(false);
  const [colorPickerOpen, setColorPickerOpen] = useState<string | null>(null);
  const colorPickerPopupRef = useRef();

  const isOpen = colorPickerOpen === colorKey;
  const close = useCallback(() => setColorPickerOpen(null), []);
  useClickOutside(colorPickerPopupRef, close);

  const debouncedHandleColorChange = useCallback(
    debounce((colors) => {
      setCustomizedThemeConfig({
        ...customizedThemeConfig,
        colors: {
          ...customizedThemeConfig.colors,
          [mode]: {
            ...customizedThemeConfig?.colors?.[mode],
            ...colors,
          },
        },
      });
    }, 500),
    [customizedThemeConfig, mode, setCustomizedThemeConfig]
  );

  const handleRevertColor = (colorToRevert) => {
    try {
      setLoading(true);

      const existingThemeConfig = {
        ...savedThemeConfig,
        mode,
        colors: {
          ...savedThemeConfig?.colors,
          [mode]: {
            ...customColor,
            ...colorToRevert,
          },
        },
      };

      handleRevertSetting(existingThemeConfig);
    } catch (error) {
      console.log("[ERROR] Failed to revert color changes ", error);
      toast.error("Failed to revert color changes! See logs.");
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
      <Text fontSize="sm" weight="semibold">
        {colorInputLabel}
      </Text>
      <div className="relative rounded bg-white border border-gray-300 text-sm">
        <div className="flex gap-x-2">
          <div
            className="w-6 h-5 m-2 cursor-pointer rounded border border-gray-300"
            style={{
              backgroundColor: customColor?.[colorKey],
            }}
            onClick={() => isLoaded && handleColorPickerToggle(colorKey)}
          />
          <HexColorInput
            color={customColor?.[colorKey]}
            onChange={(newColor) => debouncedHandleColorChange({ [colorKey]: newColor })}
            disabled={!isLoaded}
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
            className="absolute top-2 right-0 px-2 bg-transparent text-black disabled:text-gray-300 hover:text-red-500 cursor-pointer disabled:cursor-auto items-center"
            loading={loading}
            onClick={() =>
              handleRevertColor({
                [colorKey]: defaultColor?.value,
              })
            }
            disabled={
              !isLoaded ||
              customColor?.[colorKey] === defaultColor?.value ||
              !defaultColor
            }
          >
            {loading ? (
              <FaSpinner className="animate-spin w-3 h-3 mt-1" />
            ) : (
              <FaUndo className="w-3 h-3 mt-1" />
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
                color={customColor?.[colorKey]}
                onChange={(newColor) =>
                  debouncedHandleColorChange({ [colorKey]: newColor })
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
  );
}