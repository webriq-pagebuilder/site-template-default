import React from "react"
import { toast } from "react-toast";
import { Text } from "components/ui";
import { ColorPicker, SelectSettings, ToggleDarkMode } from "../theme-settings";
import _ from "lodash";

export function BasicThemeSettings({
  isLoaded,
  options,
  savedThemeConfig,
  customizedThemeConfig,
  setCustomizedThemeConfig,
  handleRevertSetting,
}): React.JSX.Element {    
  const handleChangeFont = async (e) => { 
    const newFont = (e?.target as HTMLSelectElement)?.value;
    
    try {
      const updatedThemeFont = {
        ...customizedThemeConfig,
        font: newFont
      };

      if (newFont !== savedThemeConfig?.font) {
        setCustomizedThemeConfig(updatedThemeFont);
      } else {
        handleRevertSetting(updatedThemeFont)
      } 
    } catch (error) {
      console.log("[ERROR] Failed to set theme font ", error);
      toast.error("Failed to set theme font! See logs.")
    }
  }

  return (
    <div className="flex flex-col gap-y-5">
      <div className="flex flex-col gap-2">
        <Text fontSize="sm" weight="semibold">
          Appearance
        </Text>
        <ToggleDarkMode
          {...{
            isLoaded,
            customMode: customizedThemeConfig?.mode,
            setCustomizedThemeConfig
          }}
        />
      </div>
      <div className="flex flex-col gap-3">
        {savedThemeConfig?.colors &&
          Object.entries(savedThemeConfig?.colors?.[savedThemeConfig?.mode])?.map(([key, value]) => (
            <ColorPicker
              key={value as string | number}
              {...{
                defaultColor: {
                  label: key,
                  value: value,
                },
                isLoaded,
                mode: customizedThemeConfig?.mode,
                customizedThemeConfig,
                setCustomizedThemeConfig,
                colorKey: key,
                savedThemeConfig,
                handleRevertSetting,
              }}
            />
          ))}
      </div>
      <hr className="h-px bg-gray-300 border-0" />
      <SelectSettings
        {...{
          label: "Font Family",
          value: customizedThemeConfig?.font,
          placeholder: "Select Font",
          options: options?.fontFamily,
          handleChangeFn: handleChangeFont,
          isLoaded
        }}
      />
    </div>
  )
}