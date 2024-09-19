import React, { useCallback } from "react";
import { SelectSettings } from ".";

export function AdvancedThemeSettings({
  options,
  savedThemeConfig,
  customizedThemeConfig,
  setCustomizedThemeConfig
}) {
  const handleSettingChange = useCallback((e, key) => {
    const targetValue = (e?.target as HTMLSelectElement)?.value;

    setCustomizedThemeConfig((prev) => ({
      ...prev,
      [key]: targetValue
    }));
  }, [setCustomizedThemeConfig]);
  
  return (
    <div className="flex flex-col gap-y-5">
      <SelectSettings
        {...{
          label: "Border Radius",
          value: customizedThemeConfig?.["border-radius"],
          placeholder: "Select Radius",
          options: options?.borderRadius,
          customizedThemeConfig,
          handleChangeFn: (e) => handleSettingChange(e, "border-radius")
        }}
      />
      <SelectSettings
        {...{
          label: "Font Weight",
          value: customizedThemeConfig?.["font-weight"],
          placeholder: "Select Font Weight",
          options: options?.fontWeight,
          customizedThemeConfig,
          handleChangeFn: (e) => handleSettingChange(e, "font-weight")
        }}
      />
      <SelectSettings
        {...{
          label: "Font Size",
          value: customizedThemeConfig?.["font-size"],
          placeholder: "Select Font Size",
          options: options?.fontSize,
          customizedThemeConfig,
          handleChangeFn: (e) => handleSettingChange(e, "font-size")
        }}
      />
    </div>
  )
}
