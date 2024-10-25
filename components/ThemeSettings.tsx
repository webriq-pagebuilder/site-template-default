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
import themeOptions from "components/theme-settings/options";
import _ from "lodash";

export function ThemeSettings({ preview = false, themeSettings }): React.JSX.Element {
  const baseApiUrl = `${NEXT_PUBLIC_APP_URL}/api/app/theme-settings`;

  const [isReady, setIsReady] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  // tab
  const settingTabs = ["Basic", "Advanced"];
  const [activeTab, setActiveTab] = useState(settingTabs?.[0]);

  // theme versions
  const [currentThemeName, setCurrentThemeName] = useState(
    themeSettings?.currentTheme || defaultThemeConfig?.currentTheme
  );
  const [themes, setThemes] = useState(themeSettings?.themes); // all saved themes
  const currentThemeConfig = themeSettings?.themes?.find(
    ({ _key, name }) => name === currentThemeName
  );

  // saved changes for the current theme config
  const [savedThemeConfig, setSavedThemeConfig] = useState(currentThemeConfig);

  // real-time/unsaved changes for the current theme config
  const [customizedThemeConfig, setCustomizedThemeConfig] =
    useState(savedThemeConfig);
  const customizedThemeRef = useRef(customizedThemeConfig);
  const prevCustomizedThemeConfigRef = useRef(customizedThemeConfig);

  // loading states
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [loading, setLoading] = useState(false);

  // confirm dialog
  const [openModal, setOpenModal] = useState(false);
  const [modalAction, setModalAction] = useState<
    "setTheme" | "saveAs" | "revertAll" | null
  >(null);
  const onModalOpen = useCallback(
    (action: "setTheme" | "saveAs" | "revertAll") => {
      setModalAction(action);
      setOpenModal(true); // Open the modal
    },
    []
  );

  const onModalClose = useCallback(() => {
    setOpenModal(false); // Close the modal
    setModalAction(null);
  }, []);

  const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;

    return (...args: any[]) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

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
          console.log("[INFO] Successfully synced theme settings!");
          toast.info("Successfully synced theme settings");
        } else {
          console.error("[ERROR] Failed to sync theme settings");
          toast.error("Failed to sync theme settings");
        }
      } catch (error) {
        console.error("[ERROR] Failed to sync theme settings ", error);
        toast.error("Failed to sync theme settings! See logs.");
      }
    },
    [baseApiUrl]
  );

  const refetchThemeSettings = useCallback(async () => {
    try {
      const query = preview
        ? "*[_type=='themeSettings'][0]"
        : "*[_type=='themeSettings' && !(_id in path('drafts.**'))][0]";
      
      const result = await sanityClient.fetch(query);

      if (result) {
        const fetchedThemes = result.themes;
        const fetchedCurrentThemeName = result.currentTheme;
        const fetchedCurrentThemeConfig = fetchedThemes.find(
          ({ name }) => name === fetchedCurrentThemeName
        );

        setThemes(fetchedThemes);
        setCurrentThemeName(fetchedCurrentThemeName);
        setSavedThemeConfig({
          ...fetchedCurrentThemeConfig,
          currentTheme: fetchedCurrentThemeName,
        });
        setCustomizedThemeConfig(fetchedCurrentThemeConfig);
      }
    } catch (error) {
      console.error("[ERROR] Failed to refetch theme settings.", error);
    }
  }, [preview]);

  // handles get-set theme settings
  useEffect(() => {
    const currentConfig = async () => {
      try {
        let fetchedThemeConfig = savedThemeConfig;
        let savedThemeName = themeSettings?.currentTheme;

        await syncThemeConfig({
          configToSync: themes,
          currentTheme: savedThemeName
        });

        // since in 'preview' mode, we primarily get the data for the real-time/unsaved current theme config,
        // so we also need to fetch separately its saved config based on the currentTheme for data comparison
        if (preview) {
          const query = `*[_type=='themeSettings' && !(_id in path('drafts.**'))]`;
          const result = await sanityClient.fetch(query);

          if (result && result.length !== 0) {
            fetchedThemeConfig = result[0]?.themes?.find(
              ({ name }) => name === currentThemeName
            );
            (savedThemeName = result[0]?.currentTheme),
              setThemes(result[0]?.themes);
          }
        }

        // set appearance or mode based on current theme config
        if (!fetchedThemeConfig?.mode) {
          localStorage.setItem("theme-mode", "light");
        } else {
          if (fetchedThemeConfig?.mode === "dark") {
            document.documentElement.classList.toggle("dark", true);
          }

          localStorage.setItem("theme-mode", fetchedThemeConfig?.mode);
        }

        const finalThemeConfig = {
          ...fetchedThemeConfig,
          currentTheme: savedThemeName,
        };

        if (fetchedThemeConfig) {
          setSavedThemeConfig(finalThemeConfig);
        }
      } catch (error) {
        console.error("[ERROR] Failed to fetch theme settings.", error);
        setIsReady(false);
      } finally {
        setIsInitialLoad(false);
      }
    };

    currentConfig();
  }, [themeSettings, preview, currentThemeName]);

  // debounced function handler for real-time changes
  const debouncedGenerateThemeConfig = useCallback(
    debounce(async () => {
      const themeToSync = customizedThemeRef.current;
      
      await syncThemeConfig({
        configToSync: themeToSync,
        currentTheme: currentThemeName,
        hasChanges: !_.isEqual(themeToSync, savedThemeConfig)
      });
    }, 500),
    []
  );

  // handle real-time changes on current theme
  useEffect(() => {
    if (
      !isInitialLoad &&
      customizedThemeConfig &&
      !_.isEqual(customizedThemeConfig, savedThemeConfig) &&
      !_.isEqual(currentThemeName, customizedThemeConfig.currentTheme) &&
      !_.isEqual(customizedThemeConfig, prevCustomizedThemeConfigRef.current) // Check if the config has actually changed
    ) {
      customizedThemeRef.current = customizedThemeConfig;
      debouncedGenerateThemeConfig();
    }
    prevCustomizedThemeConfigRef.current = customizedThemeConfig; // Update the ref with the current config
  }, [
    currentThemeName,
    customizedThemeConfig,
    debouncedGenerateThemeConfig,
    savedThemeConfig,
    themeSettings,
    isInitialLoad,
  ]);

  const handleSetCurrentTheme = async (currentConfig: any) => {
    try {
      setLoading(true);
      if (!currentConfig) {
        toast.error("Failed to set theme config. See logs.");
        return;
      }

      await fetch(baseApiUrl, {
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
        }),
      }).then((response) => {
        setLoading(false);
        setCurrentThemeName(currentConfig);

        if (response.ok && response.status === 200) { 
          console.log("[INFO] Successfully set current theme");
          toast.success("Successfully set current theme!");
          onModalClose();
          refetchThemeSettings(); // Refetch instead of reload
        }        
      })
    } catch (error) {
      setLoading(false);
      console.error("[ERROR] Failed to set theme ", error);
      toast.error("Failed to set theme! See logs.");
    }
  };

  const handleSaveConfigAs = async (
    action: "overwrite" | "saveNew",
    themeName?: string
  ) => {
    try {
      setLoading(true);

      const themeIndex = themes?.findIndex(
        ({ name }) => name === currentThemeName
      );
      const isOverride = action === "overwrite";

      if (!action) return; // Early return if no action

      if (isOverride && themeIndex !== -1) {
        themes[themeIndex] = customizedThemeRef.current;
      }

      if (themes?.find(({ name }) => name === themeName)) {
        toast.error("Theme name is already added. Please enter a unique name.");
        return; // Early return if theme name is not unique
      }

      const updatedThemes = isOverride
        ? themes
        : [
            ...(themes || []), // Ensure themes is an array
            {
              ...customizedThemeRef.current,
              name: themeName,
              _key: nanoid(),
            },
          ];

      await fetch(baseApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "save-theme",
          sanityProjectId: SANITY_PROJECT_ID,
          dataset: SANITY_PROJECT_DATASET,
          themeName: savedThemeConfig?.currentTheme,
          themes: updatedThemes,
          documentId: `${SANITY_PROJECT_ID}-theme-settings`,
          draftId: `drafts.${SANITY_PROJECT_ID}-theme-settings`,
        }),
      }).then((response) => {
        setLoading(false);
        
        if (response.ok && response.status === 200) {
          console.log("[INFO] Successfully saved theme settings");
          toast.success("Successfully saved theme settings");
          onModalClose();
          refetchThemeSettings(); // Refetch instead of reload
        };
      });
    } catch (error) {
      setLoading(false);
      console.error("[ERROR] Failed to save theme settings ", error);
      toast.error("Failed to save theme settings! See logs.");
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
      }).then(() => {
        setCustomizedThemeConfig(value);

        console.log("[INFO] Successfully reverted setting");
        toast.warn("Successfully reverted setting");
      });
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
          themeName: savedThemeConfig?.currentTheme,
          themes: themes,
          documentId: `${SANITY_PROJECT_ID}-theme-settings`,
          draftId: `drafts.${SANITY_PROJECT_ID}-theme-settings`,
        }),
      }).then(() => {
        console.log("[INFO] Successfully reverted ALL settings");
        toast.info("Successfully reverted ALL settings");
        
      });
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
              {settingTabs?.map((tab, index) => (
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
            <div className="flex flex-wrap gap-2 justify-between pt-3">
              <Button
                as="button"
                ariaLabel="Set theme"
                variant="unstyled"
                className="text-sm px-3 py-2 rounded-lg cursor-pointer !bg-black hover:!bg-gray-500 !text-white disabled:!bg-gray-500 disabled:cursor-default"
                disabled={
                  loading ||
                  !isReady ||
                  _.isEqual(currentThemeName, savedThemeConfig?.currentTheme) ||
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
                        ({ name }) => name === customizedThemeConfig?.name
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
                        ({ name }) => name === customizedThemeConfig?.name
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