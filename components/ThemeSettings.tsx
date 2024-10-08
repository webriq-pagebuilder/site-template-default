import React, { useState } from "react";
import { useTheme } from "context/ThemeSettingsContext";
import { Button, Heading } from "components/ui";
import { FaSpinner, FaUndo } from "react-icons/fa";
import { MdFormatColorFill, MdOutlineClose } from "react-icons/md";
import { ToastContainer } from "react-toast";
import {
  AdvancedThemeSettings,
  BasicThemeSettings,
  ConfirmThemeDialog,
  SearchBar,
} from "./theme-settings";
import themeOptions from "components/theme-settings/options";
import _ from "lodash";

export function ThemeSettings(): React.JSX.Element {
  const [showSettings, setShowSettings] = useState(false);
  
  const {
    isReady,
    currentThemeName,
    savedThemeConfig,
    customizedThemeConfig,
    setCustomizedThemeConfig,
    themes,
    loading,
    openModal,
    onModalOpen,
    modalAction,
    handleRevertSetting,
  } = useTheme() || {}; // Use the context

  // tab
  const settingTabs = ["Basic", "Advanced"];
  const [activeTab, setActiveTab] = useState(settingTabs?.[0]);

  return (
    <>
      <div className="fixed [@media(max-width:1175px)]:hidden z-50 -top-7 right-10 p-7">
        <Button
          as="button"
          type="button"
          ariaLabel="Show theme"
          variant="unstyled"
          className="text-white hover:text-gray-50 flex gap-2 items-center p-2 font-sans text-sm"
          onClick={() => setShowSettings(!showSettings)}
        >
          <MdFormatColorFill />
          <span>Theme</span>
        </Button>
      </div>
      {/* Mobile button */}
      <div className="fixed [@media(min-width:1175px)]:hidden bg-black w-full z-50">
        <Button
          as="button"
          type="button"
          ariaLabel="Show theme"
          variant="unstyled"
          className="text-white flex gap-2 p-2 font-sans text-sm float-right"
          onClick={() => setShowSettings(!showSettings)}
        >
          <MdFormatColorFill />
          <span>Theme</span>
        </Button>
      </div>
      {showSettings && (
        <div className="fixed z-50 inset-y-0 right-0 [@media(min-width:1175px)]:top-10 [@media(min-width:1175px)]:right-16 p-7 bg-slate-100 shadow-inner text-black font-sans [@media(min-width:1175px)]:rounded-md w-fit xl:w-sm flex-col space-y-5">
          <div className="flex flex-row justify-between items-center">
            <Heading fontSize="lg">Theme Settings</Heading>
            <Button
              as="button"
              type="button"
              ariaLabel="Close theme"
              variant="unstyled"
              className="flex gap-2 items-center p-2"
              onClick={() => setShowSettings(!showSettings)}
            >
              <MdOutlineClose className="text-gray-500 hover:text-black w-5 h-5" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          <SearchBar
            options={themes}
            id="theme"
          />
          <div className="flex gap-5 border-b border-b-gray-300">
            {settingTabs?.map((tab, index) => (
              <div
                className="mb-0"
                id={tab}
                key={index}
              >
                <button
                  className={`py-3 ${
                    activeTab === tab ? "font-bold text-black" : "text-gray-500"
                  }`}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              </div>
            ))}
          </div>
          {activeTab === "Basic" && (
            <BasicThemeSettings
              {...{
                isLoaded: loading || !isReady,
                options: themeOptions,
                savedThemeConfig,
                customizedThemeConfig,
                setCustomizedThemeConfig,
                handleRevertSetting,
              }}
            />
          )}
          {activeTab === "Advanced" && (
            <AdvancedThemeSettings
              {...{
                isLoaded: loading || !isReady,
                options: themeOptions,
                customizedThemeConfig,
                setCustomizedThemeConfig,
                handleRevertSetting,
              }}
            />
          )}
          <div className="flex flex-wrap gap-2 justify-between pt-5">
            <Button
              as="button"
              ariaLabel="Set theme"
              variant="solid"
              className="text-sm px-3 py-2 rounded-lg cursor-pointer bg-black hover:bg-gray-500 text-white disabled:bg-gray-500 disabled:cursor-default"
              disabled={loading || !isReady || _.isEqual(currentThemeName, savedThemeConfig?.currentTheme) || !_.isEqual(customizedThemeConfig, themes?.find(({ name }) => name === customizedThemeConfig?.name ))}
              onClick={() => onModalOpen("setTheme")}
            >
              Set theme
            </Button>
            <div className="flex flex-wrap gap-2">
              <Button
                as="button"
                ariaLabel="Revert all"
                variant="unstyled"
                className="text-sm rounded-lg px-3 py-2 cursor-pointer disabled:cursor-default border border-black hover:bg-black hover:text-white disabled:border-gray-400 disabled:text-gray-400 disabled:bg-transparent"
                disabled={loading || !isReady || _.isEqual(customizedThemeConfig, themes?.find(({ name }) => name === customizedThemeConfig?.name ))}
                onClick={() => onModalOpen("revertAll")}
              >
                {loading ? (
                  <FaSpinner className="animate-spin w-5 h-5" />
                ): (
                  <FaUndo className="w-3 h-3" />
                )}
              </Button>
              <Button
                as="button"
                ariaLabel="Save"
                variant="unstyled"
                className="text-sm px-3 py-2 rounded-lg cursor-pointer disabled:cursor-default border border-black hover:bg-black hover:text-white disabled:border-gray-400 disabled:text-gray-400 disabled:bg-transparent"
                disabled={loading || !isReady || _.isEqual(customizedThemeConfig, themes?.find(({ name }) => name === customizedThemeConfig?.name ))}
                onClick={() => onModalOpen("saveAs")}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
      {openModal && (
        <ConfirmThemeDialog
          {...{
            action: modalAction || null,
            loading
          }}
        />
      )}
      <div style={{ zIndex: 1 }}>
        <ToastContainer delay={5000} position="bottom-right" />
      </div>
    </>
  );
}