import React, { useState } from "react";
import { useTheme } from "context/ThemeSettingsContext";
import { Button, Heading } from "components/ui";
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
    currentThemeName,
    savedThemeConfig,
    customizedThemeConfig,
    setCustomizedThemeConfig,
    themes,
    loading,
    openModal,
    onModalOpen,
    onModalClose,
    modalAction,
    handleSetThemeConfig,
    handleSaveConfigAs,
    handleRevertSetting,
    handleRevertAll,
  } = useTheme() || {}; // Use the context

  // tab
  const settingTabs = ["Basic", "Advanced"];
  const [activeTab, setActiveTab] = useState(settingTabs?.[0]);

  return (
    <>
      <div className="fixed z-50 -top-7 right-10 p-7">
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
      {showSettings && (
        <div className="fixed z-50 top-10 right-16 p-7 bg-slate-100 shadow-inner text-black font-sans rounded-md w-sm flex-col space-y-5">
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
              <MdOutlineClose className="text-gray-500 hover:text-primary w-6 h-6" />
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
                options: themeOptions,
                savedThemeConfig,
                customizedThemeConfig,
                setCustomizedThemeConfig,
                handleRevertSetting,
              }}
            />
          )}
          <div className="flex flex-wrap gap-2 justify-end">
            <Button
              as="button"
              ariaLabel="Revert all"
              variant="unstyled"
              className="text-sm py-3 px-6 text-gray-700 hover:text-gray-500 disabled:text-gray-500"
              disabled={_.isEqual(customizedThemeConfig, savedThemeConfig)}
              onClick={() => onModalOpen("revertAll")}
            >
              Revert All
            </Button>
            {_.isEqual(customizedThemeConfig, themes?.find(({ name }) => name === customizedThemeConfig?.name )) ? (
              <Button
                as="button"
                ariaLabel="Save theme"
                variant="solid"
                className="text-sm rounded-lg cursor-pointer bg-black hover:bg-gray-500 text-white disabled:bg-gray-500 disabled:cursor-default"
                disabled={_.isEqual(currentThemeName, savedThemeConfig?.currentTheme)}
                onClick={() => onModalOpen("setTheme")}
              >
                Save
              </Button>
            ): (
              <Button
                as="button"
                ariaLabel="Save As"
                variant="solid"
                className="text-sm rounded-lg cursor-pointer bg-black hover:bg-gray-500 text-white disabled:bg-gray-500 disabled:cursor-default"
                disabled={_.isEqual(customizedThemeConfig, savedThemeConfig)}
                onClick={() => onModalOpen("saveAs")}
              >
                Save As
              </Button>
            )}
          </div>
        </div>
      )}
      {openModal && (
        <ConfirmThemeDialog
          {...{
            id: "confirm-theme-modal",
            action: modalAction || null,
            heading: modalAction === "revertAll" ? "Revert changes" : "Save theme",
            onClose: onModalClose,
            onClickAction:
              modalAction === "saveAs" ? handleSaveConfigAs
                : modalAction === "setTheme" ? handleSetThemeConfig
                  : handleRevertAll,
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