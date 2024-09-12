import React, {
  useCallback,
  useEffect,
  useRef,
  useState
} from "react"
import { Button, Heading } from "components/ui";
import { themeClient } from "lib/sanity.client";
import { MdFormatColorFill, MdOutlineClose, MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { ToastContainer, toast } from "react-toast";
import { SANITY_PROJECT_ID } from "studio/config";
import {
  AdvancedThemeSettings,
  BasicThemeSettings,
  ConfirmThemeDialog,
} from "./theme-settings";
import _ from "lodash";

export function ThemeSettings ({ preview, theme }): React.JSX.Element {    
  // for the current saved theme
  const [savedTheme, setSavedTheme] = useState(theme);

  // state to handle theme changes
  const [customizedTheme, setCustomizedTheme] = useState(savedTheme);
  const customizedThemeRef = useRef(customizedTheme);

  // flag to indicate initial load
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const [loading, setLoading] = useState(false);

  // confirm dialog
  const [openModal, setOpenModal] = useState(false);
  const [modalAction, setModalAction] = useState<"save" | "revert" | null>(null);
  const onModalOpen = useCallback((action: "save" | "revert") => {
    setModalAction(action);
    setOpenModal(true);
  }, []);
  const onModalClose = useCallback(() => setOpenModal(false), []);

  // show or hide settings menu
  const [showSettings, setShowSettings] = useState(false);

  // accordion
  const accordionTabs = ["Basic", "Advanced"];
  const [activeAccordion, setActiveAccordion] = useState({
    tab: accordionTabs?.[0],
    toggle: true,
  });

  // fetch theme and updating customizedTheme
  useEffect(() => {
    const getCurrentTheme = async () => {
      try {
        let fetchedTheme = theme;

        if (preview) {
          // fetch published theme settings in preview mode
          const query = `*[_type=='themeSettings' && !(_id in path('drafts.**'))]`;
          const result = await themeClient.fetch(query);

          if (result && result.length > 0) {
            fetchedTheme = result[0].theme;
          }
        }

        // get appearance or mode
        const isDarkMode = localStorage.getItem("theme-mode") === "dark";

        if (isDarkMode || fetchedTheme?.mode === "dark") {
          document.documentElement.classList.toggle("dark", isDarkMode);
        } else {
          localStorage.setItem("theme-mode", fetchedTheme?.mode);
        }

        if (fetchedTheme) {
          const currentColors = fetchedTheme?.extend?.colors;

          const newSavedTheme = {
            ...fetchedTheme,
            extend: {
              ...fetchedTheme?.extend,
              colors: {
                primary: currentColors?.primary,
                secondary: currentColors?.secondary,
                light: currentColors?.light,
                dark: currentColors?.dark,
                ...currentColors
              },
            }
          }

          setSavedTheme(newSavedTheme);
        }
      } catch (error) {
        console.log(
          "[ERROR] Failed to fetch theme settings for current project.",
          error
        );

        setSavedTheme(theme);
        setCustomizedTheme(theme);
        customizedThemeRef.current = theme;
      } finally {
        setIsInitialLoad(false); // Mark initial load as complete
      }
    }

    getCurrentTheme();
  }, [theme, preview])

  const debouncedGenerateThemeConfig = useCallback(debounce(async () => {
    // Use the latest value from the ref
    const themeToSync = customizedThemeRef.current;

    // create draft document to sync current theme changes
    await themeClient
      .createOrReplace({
          name: "Theme Settings",
          _id: `drafts.${SANITY_PROJECT_ID}-theme-settings`,
          _type: "themeSettings",
          theme: themeToSync
        })
      .then(() => {
        console.log("[INFO] Successfully synced theme settings!");
        toast.info("Successfully synced theme settings");
      })
      .catch((error) => {
        console.log("[ERROR] Failed to sync theme settings ", error);
        toast.warn("Failed to sync theme settings! See logs.");
      });
  }, 500), []);

  // handle real-time changes on theme values with debounce
  useEffect(() => {
    if (
      !isInitialLoad &&
      customizedTheme &&
      !_.isEqual(customizedTheme, savedTheme)
    ) {
      customizedThemeRef.current = customizedTheme; // Update the ref
      debouncedGenerateThemeConfig(customizedTheme);
    }
  }, [
    customizedTheme,
    debouncedGenerateThemeConfig,
    savedTheme,
    isInitialLoad,
  ]);

  const handleSaveConfig = async () => {
    try {
      setLoading(true);

      await themeClient
        .createOrReplace({
          name: "Theme Settings",
          _id: `${SANITY_PROJECT_ID}-theme-settings`,
          _type: "themeSettings",
          theme: customizedThemeRef.current
        })
        .then(async (result) => {
          setSavedTheme(customizedThemeRef.current);

          // delete the draft doc
          await themeClient
            .delete(`drafts.${result?._id}`)
            .then(() => {
              console.log("[INFO] Successfully saved theme settings");
              toast.success("Successfully saved theme settings")
            })
        })
    } catch (error) {
      console.log("[ERROR] Failed to save theme settings ", error);
      toast.error("Failed to save theme settings! See logs.")
    } finally {
      setLoading(false);
      onModalClose();
      window.location.reload();
    }
  }

  return (
    <>
      <div className="fixed z-50 -top-7 right-10 p-7">
        <Button
          as="button"
          ariaLabel="Show theme"
          variant="unstyled"
          className="text-white hover:text-primary flex gap-2 items-center p-2 font-sans text-sm"
          onClick={() => setShowSettings(!showSettings)}
        >
          <MdFormatColorFill />
          <span>Theme</span>
        </Button>
      </div>
      {showSettings && (
        <div className="fixed z-50 top-10 right-16 p-7 bg-slate-100 shadow-inner text-black font-sans rounded-md w-md flex-col space-y-5">
          <div className="flex flex-row justify-between items-center">
            <Heading
              fontSize="lg"
            >
              Theme Settings
            </Heading>
            <Button
              as="button"
              ariaLabel="Close theme"
              variant="unstyled"
              className="flex gap-2 items-center p-2"
              onClick={() => setShowSettings(!showSettings)}
            >
              <MdOutlineClose className="text-gray-500 hover:text-primary w-6 h-6" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          {accordionTabs?.map((tab, index) => (
            <div className="mb-0" id={tab} key={index}>
              <button
                className={`${
                  activeAccordion.tab === tab && activeAccordion.toggle && "font-bold text-primary"
                } group relative flex w-full items-center pb-4 border-b last:border-b-0 text-left [overflow-anchor:none]`}
                type="button"
                onClick={() => setActiveAccordion((prev) => ({
                  tab,
                  toggle: prev.tab !== tab ? true : !prev.toggle
                }))}
              >
                {tab}
                <span className="ml-auto h-5 w-5 shrink-0">
                  {activeAccordion.tab === tab && activeAccordion.toggle ? (
                    <MdKeyboardArrowUp />
                  ) : ( 
                    <MdKeyboardArrowDown />
                  )}
                </span>
              </button>
              <div>
                {activeAccordion.tab === tab && activeAccordion.toggle && (
                  tab === "Basic" ? (
                    <BasicThemeSettings
                      {...{
                        savedTheme,
                        customizedTheme,
                        setCustomizedTheme
                      }}
                    />
                  ) : (
                    <AdvancedThemeSettings
                      {...{
                        savedTheme,
                        customizedTheme,
                        setCustomizedTheme
                      }}
                    />
                  )
                )}
              </div>
            </div>
          ))}
          <div className="flex flex-wrap gap-2 justify-end">
            <Button
              as="button"
              ariaLabel="Revert all"
              variant="unstyled"
              className="py-3 px-6 text-secondary hover:text-secondary/50 rounded-md"
              disabled={_.isEqual(customizedTheme, savedTheme)}
              onClick={() => onModalOpen("revert")}
            >
              Revert All
            </Button>
            <Button
              as="button"
              ariaLabel="Save theme"
              variant="solid"
              className="font-semibold rounded-lg cursor-pointer disabled:bg-inherit/50"
              disabled={_.isEqual(customizedTheme, savedTheme)}
              onClick={() => onModalOpen("save")}
            >
              Save
            </Button>
          </div>
        </div>
      )}
      {openModal && (
        <ConfirmThemeDialog
          {...{
            id: "confirm-theme-modal",
            heading: modalAction === "save" ? "Save theme" : "Revert ALL",
            content: modalAction === "save" ? "Are you sure you want to SAVE this theme?" : "Are you sure you want to REVERT ALL changes?",
            onClose: onModalClose,
            onClickSave: handleSaveConfig,
            loading
          }}
        />
      )}
      <div style={{ zIndex: 1 }}>
        <ToastContainer delay={5000} position="bottom-right" />
      </div>
    </>
  )
}

const debounce = (func, delay) => {
  let timeoutId

  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      func(...args)
    }, delay)
  }
}