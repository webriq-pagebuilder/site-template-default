import React, { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@stackshift-ui/button";
import { Heading } from "@stackshift-ui/heading";
import { FaUndo } from "react-icons/fa";
import { MdFormatColorFill, MdOutlineClose } from "react-icons/md";
import { sanityClient } from 'lib/sanity.client';
import { toast, ToastContainer } from "react-toast";
import {
  AdvancedThemeSettings,
  BasicThemeSettings,
  ConfirmThemeDialog,
  SearchBar,
} from "./theme-settings";
import {
  NEXT_PUBLIC_APP_URL,
  SANITY_PROJECT_DATASET,
  SANITY_PROJECT_ID
} from 'studio/config';
import { nanoid } from "nanoid";
import { defaultThemeConfig } from "components/theme-settings/defaultThemeConfig";
import { debounce } from "utils/theme";
import themeOptions from "components/theme-settings/options";
import _ from "lodash";

export function ThemeSettings({ preview, themeSettings }): React.JSX.Element {
  const baseApiUrl = `${NEXT_PUBLIC_APP_URL}/api/app/theme-settings`;

  const [isReady, setIsReady] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [activeTab, setActiveTab] = useState("Basic");

  // theme states
  const [currentThemeName, setCurrentThemeName] = useState(themeSettings?.currentTheme || defaultThemeConfig?.currentTheme);
  const [themes, setThemes] = useState(themeSettings?.themes);
  const [savedThemeConfig, setSavedThemeConfig] = useState(themeSettings?.themes?.find(({ name }) => name === currentThemeName));
  const [customizedThemeConfig, setCustomizedThemeConfig] = useState(savedThemeConfig);
  const customizedThemeRef = useRef(customizedThemeConfig);
  const prevCustomizedThemeConfigRef = useRef(customizedThemeConfig);

  // modal states and actions
  const [openModal, setOpenModal] = useState(false);
  const [modalAction, setModalAction] = useState<"setTheme" | "saveAs" | "revertAll" | null>(null);

  const onModalOpen = useCallback((action: "setTheme" | "saveAs" | "revertAll") => {
    setModalAction(action);
    setOpenModal(true);
  }, []);

  const onModalClose = useCallback(() => {
    setOpenModal(false);
    setModalAction(null);
  }, []);

  const syncThemeConfig = useCallback(
    async ({ configToSync, currentTheme, hasChanges = false }) => {
      try {
        const response = await fetch(baseApiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "sync-theme",
            sanityProjectId: SANITY_PROJECT_ID,
            dataset: SANITY_PROJECT_DATASET,
            themeConfig: configToSync,
            themeName: currentTheme,
            hasChanges,
          }),
        });

        if (response.ok) {
          toast.info("Successfully synced theme");
        } else {
          toast.error("Failed to sync theme");
        }
      } catch (error) {
        console.error("[ERROR] Failed to sync theme settings ", error);
        toast.error("Failed to sync theme! See logs.");

        // revert all config on failed request
        setCurrentThemeName(savedThemeConfig?.currentTheme);
        setCustomizedThemeConfig(themes?.find(({ name }) => name === savedThemeConfig?.currentTheme));
        customizedThemeRef.current = customizedThemeConfig;
      }
    },
    [baseApiUrl]
  );

  // get current theme settings
  const fetchThemeSettings = async () => {
    const query = "*[_type=='themeSettings']";
    const config = await sanityClient.fetch(`${query}{
      ...,
      themes[] {
        ...,
        colors {
          light {
            background,
            primary,
            secondary,
          },
          dark {
            background,
            primary,
            secondary,
          }
        }
      }
    }`);

    const saved = config?.find((theme) => !theme?._id?.startsWith("drafts."));

    if (config && config.length > 0) {
      setThemes(saved?.themes);
      setCustomizedThemeConfig(saved?.themes?.find(({ name }) => name === currentThemeName));
      setSavedThemeConfig({
        ...saved?.themes?.find(({ name }) => name === saved?.currentTheme),
        currentTheme: saved?.currentTheme,
      });
    } else {
      // add fallback if no theme settings found
      await syncThemeConfig({
        configToSync: defaultThemeConfig?.themes?.find(({ name }) => name === currentThemeName),
        currentTheme: currentThemeName
      });
    }
  };

  useEffect(() => {
    fetchThemeSettings().then(() => {
      setIsInitialLoad(false);
      setIsReady(true);
    });

    // listen to real-time updates to theme settings
    const subscription = sanityClient.listen(`*[_type=='themeSettings'][0]`).subscribe((config) => {
      if (config) {
        const data = config?.result;

        if (data?._id?.startsWith("drafts.")) { 
          const draftConfig = data?.themes?.find(({ name }) => name === currentThemeName);

          setCustomizedThemeConfig(draftConfig);
          customizedThemeRef.current = draftConfig;
        } else {
          const savedConfig = data?.themes?.find(({ name, currentTheme }) => name === currentTheme);

          setThemes(savedConfig?.themes);
          setSavedThemeConfig(savedConfig);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [preview, currentThemeName]);

  const debouncedGenerateThemeConfig = useCallback(
    debounce(async (customizedThemeConfig) => {
      const themeToSync = customizedThemeRef.current;

      await syncThemeConfig({
        configToSync: themeToSync,
        currentTheme: themeToSync?.name,
        hasChanges: !_.isEqual(customizedThemeConfig, savedThemeConfig)
      });
    }, 300),
    [currentThemeName, customizedThemeConfig, syncThemeConfig]
  );

  useEffect(() => {
    try {
      if (
        !isInitialLoad &&
        customizedThemeConfig &&
        !_.isEqual(customizedThemeConfig, savedThemeConfig) &&
        !_.isEqual(customizedThemeConfig, prevCustomizedThemeConfigRef.current)
      ) {
        customizedThemeRef.current = customizedThemeConfig;
        debouncedGenerateThemeConfig(customizedThemeConfig);
      }
      prevCustomizedThemeConfigRef.current = customizedThemeConfig;
    } catch (error) {
      console.error("[ERROR] Failed to set theme ", error);
    }
  }, [
    currentThemeName,
    customizedThemeConfig,
    debouncedGenerateThemeConfig,
    savedThemeConfig,
    isInitialLoad,
  ]);

  const handleSetCurrentTheme = async (currentConfig: any) => {
    if (!currentConfig) {
      toast.error("Failed to set theme config. See logs.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(baseApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "update-current",
          sanityProjectId: SANITY_PROJECT_ID,
          dataset: SANITY_PROJECT_DATASET,
          documentId: `${SANITY_PROJECT_ID}-theme-settings`,
          draftId: `drafts.${SANITY_PROJECT_ID}-theme-settings`,
          themeName: currentConfig,
          themes: themes?.find(({ name }) => name === currentConfig),
        }),
      });

      if (response.ok) {
        setCurrentThemeName(currentConfig);
        setThemes(themes);

        const config = themes?.find(({ name }) => name === currentConfig)
        setCustomizedThemeConfig(config);
        customizedThemeRef.current = config;

        setSavedThemeConfig({
          ...config,
          currentTheme: currentConfig,
        });

        toast.success("Successfully set current theme!");
        onModalClose();
      } else {
        toast.error("Failed to update theme");
      }
    } catch (error) {
      console.error("[ERROR] Failed to set theme ", error);
      toast.error("Failed to set theme! See logs.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveConfigAs = async (action: "overwrite" | "saveNew", themeName?: string) => {
    try {
      setLoading(true);

      const themeIndex = themes?.findIndex(({ name }) => name === currentThemeName);
      const isOverride = action === "overwrite";

      if (!action) return;

      let updatedThemes = themes;

      if (isOverride && themeIndex !== -1) {
        updatedThemes[themeIndex] = customizedThemeConfig;
      } else if (themes?.find(({ name }) => name === themeName)) {
        toast.error("Theme name is already added. Please enter a unique name.");
        return;
      } else {
        updatedThemes = [
          ...(themes || []),
          {
            ...customizedThemeConfig,
            name: themeName,
            _key: nanoid(),
          },
        ];
      }

      const response = await fetch(baseApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "save-theme",
          sanityProjectId: SANITY_PROJECT_ID,
          dataset: SANITY_PROJECT_DATASET,
          themeName: savedThemeConfig?.name,
          themes: updatedThemes,
          documentId: `${SANITY_PROJECT_ID}-theme-settings`,
        }),
      });

      if (response.ok) {
        setThemes(updatedThemes);
        await fetchThemeSettings();

        toast.success("Successfully saved theme");
        onModalClose();
      } else {
        toast.error("Failed to save theme");
      }
    } catch (error) {
      console.error("[ERROR] Failed to save theme ", error);
      toast.error("Failed to save theme settings! See logs.");
    } finally {
      setLoading(false);
    }
  };

  const handleRevertSetting = async (value) => {
    setLoading(true);
    try {
      await fetch(baseApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "revert-theme",
          sanityProjectId: SANITY_PROJECT_ID,
          dataset: SANITY_PROJECT_DATASET,
          themeConfig: value,
          draftId: `drafts.${SANITY_PROJECT_ID}-theme-settings`,
        }),
      });
      setCustomizedThemeConfig(value);
      toast.warn("Successfully reverted setting");
    } catch (error) {
      console.error("[ERROR] Failed to revert setting ", error);
      toast.error("Failed to revert theme setting! See logs.");
    } finally {
      setLoading(false);
    }
  };

  const handleRevertAll = async () => {
    setLoading(true);
    try {
      await fetch(baseApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "revert-all",
          sanityProjectId: SANITY_PROJECT_ID,
          dataset: SANITY_PROJECT_DATASET,
          themeName: savedThemeConfig?.name,
          themes: themes,
          documentId: `${SANITY_PROJECT_ID}-theme-settings`,
          draftId: `drafts.${SANITY_PROJECT_ID}-theme-settings`,
        }),
      });
      setCustomizedThemeConfig(themes?.find(({ name }) => name === currentThemeName))
      await fetchThemeSettings();

      toast.warn("Successfully reverted ALL settings");
      onModalClose();
    } catch (error) {
      console.error("[ERROR] Failed to revert settings ", error);
      toast.error("Failed to revert theme settings! See logs.");
    } finally {
      setLoading(false);
    }
  };

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
          className="text-white flex gap-2 p-2 font-sans text-sm items-center sm:float-right"
          onClick={() => setShowSettings(!showSettings)}
        >
          <MdFormatColorFill />
          <span>Theme</span>
        </Button>
      </div>
      {showSettings && (
        <div className="fixed z-50 w-full h-full p-8 [@media(min-width:1175px)]:py-10 [@media(min-width:1175px)]:px-16 pointer-events-none">
          <div className="overflow-auto overscroll-contain p-7 bg-slate-100 shadow-inner !text-black font-sans rounded-bl-lg w-fit sm:w-sm flex-col space-y-5 absolute h-auto max-h-full top-0 right-0 pointer-events-auto">
            <div className="flex flex-row justify-between items-center">
              <Heading fontSize="lg" className="!text-black">Theme Settings</Heading>
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
              {...{
                options: themes,
                id: "theme",
                isReady,
                loading,
                themes,
                setCustomizedThemeConfig,
                currentThemeName,
                setCurrentThemeName,
                savedThemeConfig,
              }}
            />
            <div className="flex gap-5 border-b border-b-gray-300">
              {["Basic", "Advanced"].map((tab, index) => (
                <div className="mb-0" id={tab} key={index}>
                  <button
                    className={`pt-2 pb-3 ${
                      activeTab === tab
                        ? "font-bold text-black"
                        : "text-gray-500"
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
                  isLoaded: !loading || isReady,
                  options: themeOptions,
                  savedThemeConfig: themes?.find(({ name }) => name === customizedThemeConfig?.name),
                  customizedThemeConfig,
                  setCustomizedThemeConfig,
                  handleRevertSetting,
                }}
              />
            )}
            {activeTab === "Advanced" && (
              <AdvancedThemeSettings
                {...{
                  isLoaded: !loading || isReady,
                  options: themeOptions,
                  customizedThemeConfig,
                  setCustomizedThemeConfig,
                  handleRevertSetting,
                }}
              />
            )}
            <div className="flex flex-wrap gap-2 justify-between pt-3">
              <Button
                as="button"
                ariaLabel="Set theme"
                variant="unstyled"
                className="text-sm px-3 py-2 rounded-lg cursor-pointer !bg-black hover:!bg-gray-500 !text-white disabled:!bg-gray-500 disabled:cursor-default"
                disabled={
                  loading ||
                  !isReady ||
                  _.isEqual(currentThemeName, savedThemeConfig?.name) ||
                  !_.isEqual(
                    customizedThemeConfig,
                    themes?.find(
                      ({ name }) => name === customizedThemeConfig?.name
                    )
                  )
                }
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
                  disabled={
                    loading ||
                    !isReady ||
                    _.isEqual(
                      customizedThemeConfig,
                      themes?.find(
                        ({ name }) => name === currentThemeName
                      )
                    )
                  }
                  onClick={() => onModalOpen("revertAll")}
                >
                  <FaUndo className="w-3 h-3" />
                </Button>
                <Button
                  as="button"
                  ariaLabel="Save"
                  variant="unstyled"
                  className="text-sm px-3 py-2 rounded-lg cursor-pointer disabled:cursor-default border border-black hover:bg-black hover:text-white disabled:border-gray-400 disabled:text-gray-400 disabled:bg-transparent"
                  disabled={
                    loading ||
                    !isReady ||
                    _.isEqual(
                      customizedThemeConfig,
                      themes?.find(
                        ({ name }) => name === currentThemeName
                      )
                    )
                  }
                  onClick={() => onModalOpen("saveAs")}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {openModal && (
        <ConfirmThemeDialog
          {...{
            action: modalAction || null,
            loading,
            currentThemeName,
            handleSaveConfigAs,
            handleSetCurrentTheme,
            handleRevertAll,
            onModalClose
          }}
        />
      )}
      <div style={{ zIndex: 1 }}>
        <ToastContainer delay={5000} position="bottom-right" />
      </div>
    </>
  );
}