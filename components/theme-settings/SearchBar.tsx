import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@stackshift-ui/button";
import { Text } from "@stackshift-ui/text";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useClickOutside } from "@/utils/theme";

export function SearchBar({
  options,
  id,
  isReady,
  loading,
  setCustomizedThemeConfig,
  currentThemeName,
  setCurrentThemeName,
  savedThemeConfig,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [noThemeFound, setNoThemeFound] = useState(false);

  const inputRef = useRef();

  const close = useCallback(() => setIsOpen(false), []);
  useClickOutside(inputRef, close);

  const handleSettingTheme = (theme) => {
    setCurrentThemeName(theme.name);
    setCustomizedThemeConfig(theme);
  };

  const handleSearchTheme = (e) => {
    const value = e.target.value;
    setSearchInput(value);
  };

  // search function
  useEffect(() => {
    const handler = setTimeout(() => {
      if (!loading && isReady && searchInput) {
        setIsOpen(true);

        const searchedConfig = options?.filter(
          ({ name }) =>
            name?.toLowerCase()?.includes(searchInput?.toLowerCase())
        );

        if (!searchedConfig || searchedConfig?.length === 0) {
          setNoThemeFound(true);
        }

        setSearchResults(searchedConfig);
      }
    }, 500); // Adjust debounce time as needed

    return () => {
      clearTimeout(handler);
    };
  }, [isReady, loading, searchInput, options]);

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
          id="search-theme"
          name="search theme"
          aria-autocomplete="none"
          autoComplete="off"
          ref={inputRef}
          disabled={loading || !isReady}
          type="text"
          placeholder={searchInput || currentThemeName}
          className={`w-full h-10 text-gray-300 text-sm disabled:bg-gray-50 focus:outline-none px-2 ${
            isOpen
              ? "border-x border-t border-gray-300 rounded-t"
              : "border border-gray-300 rounded"
          }`}
          onChange={handleSearchTheme}
          onClick={() => setIsOpen(!isOpen)}
        />
        <Button
          as="button"
          ariaLabel="Show themes"
          variant="unstyled"
          className="absolute top-0 right-0 p-3 bg-transparent text-black pointer-events-none"
          disabled={loading || !isReady}
        >
          <MdKeyboardArrowDown className="w-5 h-5" />
        </Button>
      </div>
      {isOpen && (
        <div className="bg-white border shadow-md box-border -mt-[1px] max-h-[200px] overflow-y-auto absolute top-full w-full z-50">
          {!searchInput && options?.length !== 0 ? (
            options?.map((option) => (
              <div
                onClick={() => handleSettingTheme(option)}
                className={`flex justify-between items-center box-border px-2 py-3 cursor-pointer hover:bg-gray-50 ${
                  option?.name === currentThemeName ? "bg-gray-100" : ""
                }`}
                key={option?._key}
              >
                <Text>{option?.name}</Text>
                {option?.name === savedThemeConfig?.currentTheme && (
                  <span className="text-xs rounded-lg px-2 bg-black text-white">
                    Current
                  </span>
                )}
              </div>
            ))
          ) : noThemeFound || options?.length === 0 ? (
            <div className="block box-border text-gray-700 px-2 py-3">
              No theme settings found
            </div>
          ) : (
            searchResults?.map((results) => (
              <div
                onClick={() => handleSettingTheme(results?.name)}
                className="flex justify-between items-center box-border px-2 py-3 cursor-pointer hover:bg-gray-50"
                key={results?._key}
              >
                <Text>{results?.name}</Text>
                {results?.name === savedThemeConfig?.currentTheme && (
                  <span className="text-xs rounded-lg px-2 bg-black text-white">
                    Current
                  </span>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
