import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Text } from "components/ui";
import { useTheme } from "context/ThemeContext";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useClickOutside } from "utils/theme";

export function SearchBar({ options, id }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(""); 
  const [noThemeFound, setNoThemeFound] = useState(false);

  const inputRef = useRef();

  const close = useCallback(() => setIsOpen(false), []);
  useClickOutside(inputRef, close);

  const {
    themes,
    setCustomizedThemeConfig,
    currentThemeName,
    setCurrentThemeName,
  } = useTheme() || {}; // Use the context

  const handleSettingTheme = (theme) => {
    const updatedConfig = themes?.find(({ name }) => name === theme);
      
    setCurrentThemeName?.(theme);
    setCustomizedThemeConfig?.(updatedConfig)
  }

  // search function
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchValue) {
        setIsOpen(true);

        const searchedConfig = themes?.find(({ name }) => name?.includes(searchValue));
        setNoThemeFound(!searchedConfig);
      }
    }, 500); // Adjust debounce time as needed

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue, themes]);


  // Update the input value when currentThemeName changes
  useEffect(() => {
    const inputElement = document.getElementById(id) as HTMLInputElement;
    if (inputElement) {
      inputElement.value = currentThemeName;
    }
  }, [currentThemeName, id]);

  return (
    <div className="relative">
      <div className="flex items-center">
        <input
          id={id}
          ref={inputRef}
          type="text"
          placeholder={currentThemeName}
          name="search theme version"
          className={`w-full h-10 text-gray-300 text-sm focus:outline-none px-2 ${isOpen ? "border-x border-t border-gray-300 rounded-t" : "border border-gray-300 rounded"}`}
          onChange={(e) => setSearchValue(e.target.value)}
          onClick={() => setIsOpen(!isOpen)}
        />
        <Button
          as="button"
          ariaLabel="Show fonts"
          variant="unstyled"
          className="absolute top-0 right-0 p-3 bg-transparent text-black pointer-events-none"
        >
          <MdKeyboardArrowDown className="w-5 h-5"/>
        </Button>
      </div>
      {isOpen && (
        <div className="bg-white border shadow-md box-border -mt-[1px] max-h-[200px] overflow-y-auto absolute top-full w-full z-50">
          {searchValue && noThemeFound ? ( 
            <div className="block box-border text-gray-700 px-2 py-3">
              No theme settings found
            </div>
          ) : options?.length > 0 ? options?.map((option) => (
                <div
                  onClick={() => handleSettingTheme(option?.name)}
                  className={`block box-border px-2 py-3 ${
                    option?.name === currentThemeName ? "text-gray-500" : "hover:bg-gray-50 cursor-pointer"
                  }`}
                  key={option?._key}
                >
                  <Text>
                    {option?.name}
                  </Text>
                  {option?.name === currentThemeName && (
                    <Text fontSize="xs">
                      Current theme
                    </Text>
                  )}
                </div>
            )) : (
              <div className="block box-border text-gray-700 px-2 py-3">
                No theme settings found
              </div>
            )
          }
        </div>
      )}
    </div>
  )
};