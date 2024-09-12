import React, { useCallback } from "react";
import { CustomSelectInput } from ".";

export function AdvancedThemeSettings({ savedTheme, customizedTheme, setCustomizedTheme }) {
  const handleSettingChange = useCallback((e, key) => {
    const targetValue = (e?.target as HTMLSelectElement)?.value;

    setCustomizedTheme((prev) => ({
      ...prev,
      [key]: targetValue
    }));
  }, [setCustomizedTheme]);
  
  return (
    <div className="flex flex-col gap-y-5 py-4">
      <CustomSelectInput
        {...{
          label: "Border Radius",
          value: customizedTheme?.radius,
          placeholder: "Select Radius",
          savedTheme: savedTheme?.extend?.borderRadius,
          customizedTheme,
          handleChangeFn: (e) => handleSettingChange(e, "radius")
        }}
      />
      <CustomSelectInput
        {...{
          label: "Font Weight",
          value: customizedTheme?.["font-weight"],
          placeholder: "Select Font Weight",
          savedTheme: savedTheme?.extend?.fontWeight,
          customizedTheme,
          handleChangeFn: (e) => handleSettingChange(e, "font-weight")
        }}
      />
      <CustomSelectInput
        {...{
          label: "Font Size",
          value: customizedTheme?.["font-size"],
          placeholder: "Select Font Size",
          savedTheme: savedTheme?.extend?.fontSize,
          customizedTheme,
          handleChangeFn: (e) => handleSettingChange(e, "font-size")
        }}
      />
    </div>
  )
}
