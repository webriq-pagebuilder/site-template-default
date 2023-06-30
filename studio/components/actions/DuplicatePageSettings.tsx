import React, { useState } from "react";
import {
  Badge,
  Box, 
  Button, 
  Card, 
  Flex,
  Inline, 
  useToast,
  Stack, 
  Switch, 
  Text, 
  TextInput, 
} from "@sanity/ui";
import { ComposeIcon, ArrowLeftIcon, RestoreIcon, CloseCircleIcon } from "@sanity/icons"
import { ButtonWithTooltip, SearchBar } from ".";
import DuplicatePageContextProvider from "studio/context/DuplicatePageContext";


export default function DuplicatePageSettings({ page, variants, setDialogOpen }) {
  const toast = useToast();
  let variantStr = "", sectionVariant = "Variant not selected";

  //const [duplicateSections, setDuplicateSections] = useState(page?.sections);
  //const [pageTitle, setPageTitle] = useState(page?.title || page?.name);
  const [duplicatePage, setDuplicatePage] = useState({
    document: page,
    title: page?.title || page?.name, 
    sections: page?.sections,
    setDialogOpen: setDialogOpen,
  });

  // FEATURE BUTTONS: NEW | EXCLUDE | REVERT REFERENCES
  const handleFeatureButtons = (feature: "new" | "exclude" | "revert", position: number) => {
    const updated = duplicatePage?.sections?.map((section, index) => {
      if(index !== position) {
        return section; // no change
      } else {
        if(feature === "new") {
          return {
            ...section,
            current: !section.current
          }
        } else if(feature === "exclude") {
          return {
            ...section,
            include: !section?.include,
            isEditing: false,
          }
        } else if(feature === "revert") {
          return {
            ...page?.sections[position],
            current: true,
            include: true,
            replaced: false,
            isEditing: false,
          };
        } else {
          console.log("[ERROR] Supported features: 'new' | 'exclude' | 'revert' only")
        }
      }
    });

    //setDuplicateSections(updated);
    setDuplicatePage((prev) => ({...prev, sections: updated}));
  }

  // EDIT REFERENCE
  const handleEditReferenceBtn = (value: any, position) => {
    const updated = duplicatePage?.sections?.map((section, index) => {
      if(index !== position) {
        return section; // no change
      } else {
        if(value) {
          toast.push({
            status: "success",
            title: "Current reference was updated!",
          });

          // return new shape
          const { replaced, isEditing, ...rest } = value;

          // using non-null assertion operator
          return duplicatePage!.sections[index] = { 
            replaced: true, 
            isEditing: false, 
            ...rest 
          };
        }

        return {
          ...section,
          isEditing: !section?.isEditing,
        };
      }
    });

    //setDuplicateSections(updated);
    setDuplicatePage((prev) => ({...prev, sections: updated}));
  }

  return (
    <DuplicatePageContextProvider duplicatePageData={duplicatePage}>
      <Card padding={2}>
        <Stack space={2}>
          <Text size={1} weight="bold">
            Title
          </Text>
          <div className="relative">
            <TextInput
              fontSize={2}
              value={duplicatePage?.title}
              padding={[3, 3, 4]}
              placeholder="Document title"
              onChange={(event) => setDuplicatePage((prev) => ({...prev, title: event.target.value}))}
              radius={2} 
              required
            />
            {duplicatePage?.title !== (page?.title || page?.name)  && (
              <ButtonWithTooltip toolTipText="Revert">
                <button
                  className="absolute top-0 right-0 z-20 mt-3 mr-3"
                  style={{ 
                    cursor: duplicatePage?.title !== page?.title || page?.name ? null : "not-allowed"
                  }}
                  disabled={duplicatePage?.title === page?.title || page?.name}
                  onClick={() => setDuplicatePage((prev) => ({...prev, title: page?.title || page?.name}))}
                >
                  <RestoreIcon style={{ fontSize: 24 }} />
                </button>
              </ButtonWithTooltip>
            )}
          </div>
        </Stack>
        <Box paddingY={4}>
          <Stack space={2}>
            <Text size={1} weight="bold">
              Sections
            </Text>
            {duplicatePage?.sections?.map((section, index) => {
              if (section?.variant) {
                variantStr =
                  section?.variant?.charAt(0).toUpperCase() +
                  section?.variant?.substr(1, section?.variant.length - 2) +
                  section?.variant?.charAt(section?.variant.length - 1).toUpperCase() // the first and last letters of variant to uppercase
      
                sectionVariant = variantStr?.replace(/_/g, " ") // replace underscore (_) with whitespace
              }

              return (
                <React.Fragment key={section?._id}>
                  <Card 
                    className="relative showBtn"
                    padding={3} 
                    radius={2} 
                    shadow={1} 
                    style={{
                      backgroundColor: !section?.include && "#e5e7ebb5"
                    }}
                  >
                    {section?.isEditing ? (
                      <div className="flex flex-wrap justify-between">
                        {/* Cancel button + search bar + feature buttons (restore and/or exclude) */}
                        <div className="flex flex-wrap w-3/4">
                          <ButtonWithTooltip toolTipText="Cancel">
                            <button
                              className="items-center text-center font-medium text-webriq-darkblue hover:text-webriq-babyblue"
                              onClick={() => handleEditReferenceBtn(null, index)}
                            >
                              <ArrowLeftIcon style={{ fontSize: 30 }} />
                            </button>
                          </ButtonWithTooltip>
                          {/* Search bar to select variant */}
                          <Box padding={2} style={{ width: "90%" }}>
                            <SearchBar 
                              searchItems={variants?.filter((variant) => 
                                variant?._type === section?._type && variant?.label !== section?.variants?.label
                              )} 
                              onClickHandler={(value) => handleEditReferenceBtn(value, index)}
                            />
                          </Box>
                        </div>
                        <div className="flex flex-wrap">
                          {/* Revert changes button */}
                          {(section?.replaced || !section?.include) && (
                            <ButtonWithTooltip toolTipText="Revert">
                              <button
                                className="mr-3"
                                onClick={() => handleFeatureButtons("revert", index)}
                              >
                                <RestoreIcon style={{ fontSize: 30 }} />
                              </button>
                            </ButtonWithTooltip>
                          )}
                          {/* Exclude reference button */}
                          <ButtonWithTooltip toolTipText="Exclude">
                            <button
                              onClick={() => handleFeatureButtons("exclude", index)}
                            >
                              <CloseCircleIcon style={{ fontSize: 30, color: "maroon" }} />
                            </button>
                          </ButtonWithTooltip>
                        </div>
                      </div>
                    ) : (
                      <>
                        <Flex justify="space-between">
                          <Inline space={2} padding={2}>
                            <Text style={{ paddingTop: 7, minHeight: "24px" }}>
                              {section?.label ?? "Untitled document"}
                            </Text>
                            {!section?.include ? (
                              <Badge mode="outline" tone="critical">Not included</Badge> 
                            ) : (
                              !section?.current && (
                                <Badge mode="outline" tone="primary">New Copy</Badge>
                              )
                            )}
                            {/* Replace reference button */}
                            {section?.include && (
                              <ButtonWithTooltip toolTipText="Edit">
                                <button
                                  className={`text-webriq-darkblue hover:text-webriq-babyblue ${!section?.isEditing && "hide"}`}
                                  onClick={() => handleEditReferenceBtn(null, index)}
                                >
                                  <ComposeIcon style={{ fontSize: 24 }} />
                                </button>
                              </ButtonWithTooltip>
                            )}
                            {/* Revert changes button */}
                            {!section?.isEditing && !section?.include && (
                              <ButtonWithTooltip toolTipText="Revert">
                                <button
                                  className="mr-3"
                                  onClick={() => handleFeatureButtons("revert", index)}
                                >
                                  <RestoreIcon style={{ fontSize: 30 }} />
                                </button>
                              </ButtonWithTooltip>
                            )}
                          </Inline>
                          {/* Reference toggle button */}
                          <Box padding={3}>
                            <ButtonWithTooltip toolTipText={!duplicatePage?.sections[index]?.current ? "Use Current" : "New Copy"}>
                              <Switch 
                                id={`${section?._type}-${index + 1}`}
                                name={`${section?.label} include`}
                                value={section?._type}
                                disabled={!section?.include}
                                checked={!duplicatePage?.sections[index]?.current}
                                onChange={() => handleFeatureButtons("new", index)}
                              />
                            </ButtonWithTooltip>
                          </Box>
                        </Flex>
                        <Box paddingX={2} paddingBottom={2}>
                          <Text size={1} muted>
                            {`${sectionVariant} • ${section?._type?.toUpperCase()}`}
                          </Text>
                        </Box>
                        {section?.replaced && (
                          <Box padding={2}>
                            <Text size={1} style={{ fontStyle: "italic", color: "blue" }} muted>
                              This section has been updated
                            </Text>
                          </Box>
                        )}
                      </>
                    )}
                  </Card>
                </React.Fragment>
              )
            })}
          </Stack>
        </Box>
      </Card>
    </DuplicatePageContextProvider>
  )
}