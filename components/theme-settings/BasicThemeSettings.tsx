import React from "react"
import { themeClient } from "lib/sanity.client";
import { toast } from "react-toast";
import { SANITY_PROJECT_ID } from "studio/config";
import { Text } from "components/ui";
import { ColorPicker, CustomSelectInput, ToggleDarkMode } from "../theme-settings";
import _ from "lodash";

export function BasicThemeSettings ({ savedTheme, customizedTheme, setCustomizedTheme }): React.JSX.Element {    

  const handleChangeFont = async (e) => { 
    const newFont = (e?.target as HTMLSelectElement)?.value;
    
    try {
      const updatedThemeFont = {
        ...customizedTheme,
        font: newFont
      };

      if (newFont !== savedTheme?.font) {
        setCustomizedTheme(updatedThemeFont);
      } else {
        await themeClient
          .createOrReplace({
            name: "Theme Settings",
            _id: `drafts.${SANITY_PROJECT_ID}-theme-settings`,
            _type: "themeSettings",
            theme: updatedThemeFont
          })
          .then(() => {
            setCustomizedTheme(updatedThemeFont);

            console.log("[INFO] Successfully reverted font");
            toast.info("Successfully reverted font")
          });
      } 
    } catch (error) {
      console.log("[ERROR] Failed to set theme font ", error);
      toast.error("Failed to set theme font! See logs.")
    }
  }

  return (
    <div className="flex flex-col gap-y-5 py-4">
      <div className="flex flex-col gap-2">
        <Text
          fontSize="sm"
          weight="semibold"
        >
          Appearance
        </Text>
        <ToggleDarkMode
          {...{
            customMode: customizedTheme?.mode,
            setCustomizedTheme
          }}
        />
      </div>
      <div className="flex flex-col gap-3">
        {savedTheme?.extend?.colors &&
          Object.entries(savedTheme?.extend?.colors)?.map(([key, value]) => (
            <ColorPicker
              key={value as string | number}
              {...{
                defaultColor: {
                  label: key,
                  value: value,
                },
                customizedTheme,
                setCustomizedTheme,
                colorKey: key,
                savedTheme,
              }}
            />
          ))}
      </div>
      <CustomSelectInput
        {...{
          label: "Font Family",
          value: customizedTheme?.font,
          placeholder: "Select Font",
          savedTheme: savedTheme?.extend?.fontFamily,
          customizedTheme,
          handleChangeFn: handleChangeFont
        }}
      />
    </div>
  )
}