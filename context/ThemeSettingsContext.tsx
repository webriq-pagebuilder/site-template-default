import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback
} from 'react';
import { sanityClient } from 'lib/sanity.client';
import { toast } from "react-toast";
import {
  NEXT_PUBLIC_APP_URL,
  SANITY_PROJECT_DATASET,
  SANITY_PROJECT_ID
} from 'studio/config';
import { nanoid } from "nanoid";
import { defaultThemeConfig } from "components/theme-settings/defaultThemeConfig";
import _ from 'lodash';

interface ThemeSettingsContext {
  isReady: boolean;
  themeSettings: any;
  currentThemeName: any;
  setCurrentThemeName: (theme: any) => void;
  savedThemeConfig: any;
  setSavedThemeConfig: (theme: any) => void;
  themes: any;
  setThemes: (themes: any) => void;
  customizedThemeConfig: any;
  setCustomizedThemeConfig: (theme: any) => void;
  loading: boolean;
  openModal: boolean;
  onModalOpen: (action: "setTheme" | "saveAs" | "revertAll") => any | undefined;
  onModalClose: () => void;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  modalAction: "setTheme" | "saveAs" | "revertAll" | null;
  setModalAction: React.Dispatch<React.SetStateAction<"setTheme" | "saveAs" | "revertAll" | null>>;
  handleSetCurrentTheme: (currentConfig: any) => void;
  handleSaveConfigAs: (action: "overwrite" | "saveNew", versionName?: string) => Promise<void>;
  handleRevertSetting: (value: any) => Promise<void>;
  handleRevertAll: () => Promise<void>;
}

const ThemeSettingsContext = createContext<ThemeSettingsContext | null>(null);

export const ThemeSettingsProvider = ({ children, preview = false, themeSettings }) => {
  const baseApiUrl = `${NEXT_PUBLIC_APP_URL}/api/app/theme-settings`;

  const [isReady, setIsReady] = useState(true);
  
  // theme versions
  const [currentThemeName, setCurrentThemeName] = useState(themeSettings?.currentTheme || defaultThemeConfig?.currentTheme);
  const [themes, setThemes] = useState(themeSettings?.themes); // all saved themes
  const currentThemeConfig = themeSettings?.themes?.find(({ _key, name }) => name === currentThemeName);

  // saved changes for the current theme config
  const [savedThemeConfig, setSavedThemeConfig] = useState(currentThemeConfig);

  // real-time/unsaved changes for the current theme config
  const [customizedThemeConfig, setCustomizedThemeConfig] = useState(savedThemeConfig);
  const customizedThemeRef = useRef(customizedThemeConfig);

  // loading states
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [loading, setLoading] = useState(false);

  // confirm dialog
  const [openModal, setOpenModal] = useState(false);
  const [modalAction, setModalAction] = useState<"setTheme" | "saveAs" | "revertAll" | null>(null);
  const onModalOpen = useCallback((action: "setTheme" | "saveAs" | "revertAll") => {
    setModalAction(action); 
    setOpenModal(true); // Open the modal
  }, []);

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

  // handles getting-setting the current theme values
  useEffect(() => {
    const currentConfig = async () => {
      try {
        let fetchedThemeConfig = savedThemeConfig;
        let savedThemeName = themeSettings?.currentName;

        // since in 'preview' mode, we primarily get the data for the real-time/unsaved current theme config changes, 
        // we also need to fetch its saved config based on the currentTheme set, the saved config theme name and the themes list (array) for data comparison
        if (preview) {
          const query = `*[_type=='themeSettings' && !(_id in path('drafts.**'))]`;
          const result = await sanityClient.fetch(query);

          if (result && result.length !== 0) {
            fetchedThemeConfig = result[0]?.themes?.find(({ name }) => name === currentThemeName);
            savedThemeName = result[0]?.currentTheme,
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
        
        if (fetchedThemeConfig) {
          setSavedThemeConfig({
            ...fetchedThemeConfig,
            currentTheme: savedThemeName
          });
        }
      } catch (error) {
        console.error("[ERROR] Failed to fetch theme settings for current project.", error);
        setIsReady(false);

        setSavedThemeConfig(currentThemeConfig);
        setCustomizedThemeConfig(currentThemeConfig);
        customizedThemeRef.current = currentThemeConfig;
      } finally {
        setIsInitialLoad(false); // Mark initial load as complete
      }
    };

    currentConfig();
  }, [themeSettings, preview, currentThemeName]);

  // debounced function handler for real-time changes
  const debouncedGenerateThemeConfig = useCallback(debounce(async () => {
    const themeToSync = customizedThemeRef.current;

    try {
      await fetch(baseApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "sync-theme",
          sanityProjectId: SANITY_PROJECT_ID,
          dataset: SANITY_PROJECT_DATASET,
          themeConfig: themeToSync,
          themeName: themeToSync?.name,
        })
      })
      .then((response) => {
        if (response.status === 200 || response.status === 204) {
          console.log("[INFO] Successfully synced theme settings!");
          toast.info("Successfully synced theme settings");
        } else {
          setIsReady(false);
        }
      })
    } catch (error) {
      console.error("[ERROR] Failed to sync theme settings ", error);
      toast.error("Failed to sync theme settings! See logs.");

      setIsReady(false);
    }
  }, 500), []);

  // handle real-time changes on current theme
  useEffect(() => {
    if (
      !isInitialLoad &&
      customizedThemeConfig &&
      !_.isEqual(customizedThemeConfig, savedThemeConfig)
    ) {
      customizedThemeRef.current = customizedThemeConfig; // Update the ref
      debouncedGenerateThemeConfig(customizedThemeConfig);
    }
  }, [
    customizedThemeConfig,
    debouncedGenerateThemeConfig,
    savedThemeConfig,
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
          themeName: currentConfig,
        })
      })
      .then(() => {
        console.log("[INFO] Successfully set current theme");
        toast.success("Successfully set current theme");

        setLoading(false);
        onModalClose();
        window.location.reload();
      })
    } catch (error) {
      setLoading(false);
      
      console.error("[ERROR] Failed to save theme settings ", error);
      toast.error("Failed to save theme settings! See logs.");
    }
  };

  const handleSaveConfigAs = async (action: "overwrite" | "saveNew", themeName?: string) => {
    try {
      setLoading(true);

      const themeIndex = themes?.findIndex(({ name }) => name === currentThemeName);
      const isOverride = action === "overwrite";

      if (!action) return; // Early return if no action

      if (isOverride && themeIndex !== -1) {
        themes[themeIndex] = customizedThemeRef.current;
      }

      if (themes?.find(({ name }) => name === themeName)) {
        toast.error("Theme name is already added. Please enter a unique name.");
        return; // Early return if theme name is not unique
      }

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
          themes: isOverride
            ? themes
            : [
                ...themes,
                {
                  ...customizedThemeRef.current,
                  name: themeName,
                  _key: nanoid(),
                }
              ],
          documentId: `${SANITY_PROJECT_ID}-theme-settings`,
          draftId: `drafts.${SANITY_PROJECT_ID}-theme-settings`
        })
      })
      .then(() => {
        console.log("[INFO] Successfully saved theme settings");
        toast.success("Successfully saved theme settings");

        setLoading(false);
        onModalClose();
        window.location.reload();
      })
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
          draftId: `drafts.${SANITY_PROJECT_ID}-theme-settings`
        })
      })
      .then(() => {
        setCustomizedThemeConfig(value);

        console.log("[INFO] Successfully reverted setting");
        toast.info("Successfully reverted setting");
      })
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
          draftId: `drafts.${SANITY_PROJECT_ID}-theme-settings`
        })
      })
      .then(() => {
        console.log("[INFO] Successfully reverted ALL settings");
        toast.info("Successfully reverted ALL settings");
        window.location.reload();
      })
    } catch (error) {
      console.error("[ERROR] Failed to revert settings ", error);
      toast.error("Failed to revert theme settings! See logs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeSettingsContext.Provider
      value={{
        isReady,
        themeSettings,
        currentThemeName,
        setCurrentThemeName,
        savedThemeConfig,
        setSavedThemeConfig,
        themes,
        setThemes,
        customizedThemeConfig,
        setCustomizedThemeConfig,
        loading,
        openModal,
        onModalOpen,
        onModalClose,
        setOpenModal,
        modalAction,
        setModalAction,
        handleSetCurrentTheme,
        handleSaveConfigAs,
        handleRevertSetting,
        handleRevertAll,
      }}
    >
      {children}
    </ThemeSettingsContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeSettingsContext);