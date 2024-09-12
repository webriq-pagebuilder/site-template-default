import React, { useCallback, useEffect } from "react";
import { Button } from "components/ui";
import { MdLightMode, MdOutlineLightMode, MdDarkMode, MdOutlineDarkMode } from "react-icons/md";

export function ToggleDarkMode({ customMode, setCustomizedTheme }) {
  const darkMode = customMode !== "light";

  const handleModeChange = useCallback((isDarkMode) => {
    setCustomizedTheme((prev) => ({
      ...prev,
      mode: isDarkMode ? "dark" : "light",
    }));
  }, [setCustomizedTheme]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme-mode", customMode);
  }, [customMode, darkMode]);

  return (
    <div className="flex text-sm">
      <Button
        as="button"
        ariaLabel="Light mode"
        className={`flex gap-2 items-center rounded-md disabled:hover:bg-black ${!darkMode ? "bg-black text-white" : "bg-transparent text-black hover:bg-inherit/50"}`}
        variant={!darkMode ? "solid" : "ghost"}
        disabled={customMode === "light"}
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
        className={`flex gap-2 items-center rounded-md ${darkMode ? "bg-black text-white" : "bg-transparent text-black hover:bg-inherit/50"}`}
        variant={darkMode ? "solid" : "ghost"}
        disabled={customMode === "dark"}
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
