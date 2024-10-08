import React, { useCallback, useEffect } from "react";
import { Button } from "@stackshift/components-common";
import { MdLightMode, MdOutlineLightMode, MdDarkMode, MdOutlineDarkMode } from "react-icons/md";

export function ToggleDarkMode({ isLoaded, customMode, setCustomizedThemeConfig }) {
  const darkMode = customMode !== "light";

  const handleModeChange = useCallback((isDarkMode) => {
    setCustomizedThemeConfig((prev) => ({
      ...prev,
      mode: isDarkMode ? "dark" : "light",
    }));
  }, [setCustomizedThemeConfig]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme-mode", customMode);
  }, [customMode, darkMode]);

  return (
    <div className="flex text-sm">
      <Button
        as="button"
        ariaLabel="Light mode"
        className={`px-3 py-2 flex gap-2 items-center rounded-l-md rounded-r-none ${
          !darkMode
            ? "bg-black text-white disabled:hover:bg-black"
            : "bg-transparent text-black hover:bg-inherit/50 font-bold border"
        }`}
        variant={!darkMode ? "solid" : "ghost"}
        disabled={isLoaded || customMode === "light"}
        onClick={() => handleModeChange(!darkMode)}
      >
        {!darkMode ? (
          <MdLightMode />
        ) : (
          <MdOutlineLightMode />
        )}
        <span>Light</span>
      </Button>
      <Button
        as="button"
        ariaLabel="Dark mode"
        className={`px-3 py-2 flex gap-2 items-center rounded-l-none rounded-r-md ${
          darkMode
            ? "bg-black text-white disabled:hover:bg-black"
            : "bg-transparent text-black hover:bg-inherit/50 font-bold border"
        }`}
        variant={darkMode ? "solid" : "ghost"}
        disabled={isLoaded || customMode === "dark"}
        onClick={() => handleModeChange(!darkMode)}
      >
        {darkMode ? (
          <MdDarkMode />
        ) : (
          <MdOutlineDarkMode />
        )}
        <span>Dark</span>
      </Button>
    </div>
  )
}
