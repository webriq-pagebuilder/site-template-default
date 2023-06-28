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
import { ComposeIcon, CloseIcon, RestoreIcon, CloseCircleIcon } from "@sanity/icons"
import { ButtonWithTooltip, SearchBar } from "./index";
import { nanoid } from "nanoid";


export default function DuplicatePageSettings({ page, variants, sanityClient, setDialogOpen }) {
  const toast = useToast();
  let variantStr = "", sectionVariant = "Variant not selected";

  const [duplicateSections, setDuplicateSections] = useState(page?.sections);
  const [pageTitle, setPageTitle] = useState(page?.title || page?.name);
  const [isLoading, setIsLoading] = useState(false);

  // FEATURE BUTTONS: NEW | EXCLUDE | REVERT REFERENCES
  const handleFeatureButtons = (feature: "new" | "exclude" | "revert", position: number) => {
    const updated = duplicateSections?.map((section, index) => {
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

    setDuplicateSections(updated);
  }

  // EDIT REFERENCE
  const handleEditReferenceBtn = (value: any, position) => {
    const updated = duplicateSections?.map((section, index) => {
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

          return duplicateSections[index] = { 
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

    setDuplicateSections(updated);
  }

  // DUPLICATE DOCUMENT
  const handleDuplicateBtn = async (documentId: string, payload: any) => {
    setIsLoading(true);

    try {
      const sections = await Promise.all(
        payload?.sections?.map(async (section) => {
          if(section?.current) {
            // use the existing section object for the new document
            return await sanityClient
            .fetch(
              `*[_id == $documentId][0].sections`, 
              { documentId: documentId }
            ).then((result) => result?.find((orig) => orig?._type === section?._type))
          } else {
            // create new document for the section and use result "_id" as reference
            return await sanityClient
              .create(section)
              .then((result) => ({ 
                _key: nanoid(), 
                _ref: result?._id, 
                _type: result?._type 
              })
            )  
          }
        })
      );

      payload.sections = sections;
      console.log("[INFO] Duplicate sections created! ");
      
      // make sure we have new section documents before creating the duplicate document
      if(sections.length !== 0) {
        await sanityClient
          .create(
            payload,
            {
              tag: "sanity.studio.document.duplicate",
              returnFirst: true,
              returnDocuments: true,
              visibility: "sync"
            }
          )
          .then((response) => {
            console.log("[INFO] Successfully duplicated document: ", response);
            toast.push({
              status: "success",
              title: "Successfully duplicated document!",
            });
            setIsLoading(false);
            setDialogOpen(false);
          })
      }
    } catch (error) {
      setIsLoading(false);
      console.log("Sorry, something went wrong. Failed to duplicate document.", error);
      toast.push({
        status: "error",
        title: "Sorry, something went wrong. Failed to duplicate document.",
      });
    }
  }

  return (
    <Card padding={2}>
      <Stack space={2}>
        <Text size={1} weight="bold">
          Title
        </Text>
        <div className="relative">
          <TextInput
            fontSize={2}
            value={pageTitle}
            padding={[3, 3, 4]}
            placeholder="Document title"
            onChange={(event) => setPageTitle(event.target.value)}
            radius={2} 
            required
          />
          {!pageTitle?.includes(page?.title || page?.name)  && (
            <ButtonWithTooltip toolTipText="Revert">
              <button
                className="absolute top-0 right-0 z-20 mt-3 mr-3"
                style={{ 
                  cursor: pageTitle !== page?.title || page?.name ? null : "not-allowed"
                }}
                disabled={pageTitle === page?.title || page?.name}
                onClick={() => setPageTitle(page?.title || page?.name)}
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
          {duplicateSections?.map((section, index) => {
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
                  className="relative replace-btn"
                  padding={3} 
                  radius={2} 
                  shadow={1} 
                  style={{
                    backgroundColor: !section?.include && "#e5e7ebb5"
                  }}
                >
                  {section?.isEditing ? (
                    <div className="flex flex-wrap">
                      <Box padding={2} style={{ width: "95%" }}>
                        <SearchBar 
                          searchItems={variants?.filter((variant) => 
                            variant?._type === section?._type && variant?.label !== section?.variants?.label
                          )} 
                          onClickHandler={(value) => handleEditReferenceBtn(value, index)}
                        />
                      </Box>
                      <ButtonWithTooltip toolTipText="Cancel">
                        {/* Close button */}
                        <button
                          className="items-center text-center font-medium text-webriq-darkblue hover:text-webriq-babyblue"
                          onClick={() => handleEditReferenceBtn(null, index)}
                        >
                          <CloseIcon style={{ fontSize: 24 }} />
                        </button>
                      </ButtonWithTooltip>
                    </div>
                  ) : (
                    <>
                      <Flex justify="space-between">
                        <Inline space={2} padding={2}>
                          <Text style={{ paddingTop: 7, minHeight: "24px" }}>{section?.label ?? "Untitled document"}</Text>
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
                          {(section?.replaced || !section?.include) && (
                            <ButtonWithTooltip toolTipText="Revert">
                              <button
                                className={`${!section?.isEditing && "hide"}`}
                                onClick={() => handleFeatureButtons("revert", index)}
                              >
                                <RestoreIcon style={{ fontSize: 24 }} />
                              </button>
                            </ButtonWithTooltip>
                          )}
                          {/* Exclude reference button */}
                          {section?.include && (
                            <ButtonWithTooltip toolTipText="Exclude">
                              <button
                                className={`${!section?.isEditing && "hide"}`}
                                onClick={() => handleFeatureButtons("exclude", index)}
                              >
                                <CloseCircleIcon style={{ fontSize: 24, color: "maroon" }} />
                              </button>
                            </ButtonWithTooltip>
                          )}
                        </Inline>
                        {/* Reference toggle button */}
                        <Box padding={3}>
                          <ButtonWithTooltip toolTipText={!duplicateSections[index]?.current ? "Use Current" : "New Copy"}>
                            <Switch 
                              id={`${section?._type}-${index + 1}`}
                              name={`${section?.label} include`}
                              value={section?._type}
                              disabled={!section?.include}
                              checked={!duplicateSections[index]?.current}
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
      {/* Dialog footer: section count, revert button and duplicate button */}
      <Flex justify="space-between">
        <p className="ml-4 text-sm text-gray-500">
          <span className="font-bold">{duplicateSections?.filter((section) => section?.include)?.length}</span>{" "}
          section/s to duplicate
        </p>
        <Box style={{ textAlign: "right" }}>
          {/* Duplicate button */}
          <Button
            fontSize={2}
            padding={3}
            text="Duplicate"
            onClick={() => handleDuplicateBtn(page?._id, { 
              title: pageTitle, 
              slug: {
                current: pageTitle?.replace(/.$/, '')?.replace(/[\s~`!@#$%^&*()_+\-={[}\]|\\:;"'<,>.?/]+/g, "-")?.toLowerCase(),
                _type: "slug"
              }, 
              _type: page?._type,
              sections: duplicateSections?.filter((section) => section?.include)?.map((section) => (
                {
                  label: section?.label,
                  variant: section?.variant,
                  variants: section?.variants,
                  current: section?.current,
                  _type: section?._type === "pages_productInfo" 
                    ? "productInfo" 
                    : section?._type,
                }
              ))
            })}
            loading={isLoading}
            disabled={!pageTitle || duplicateSections?.filter((section) => section.include)?.length === 0}
            style={{ 
              backgroundColor: !pageTitle || duplicateSections?.filter((section) => section.include)?.length === 0 ? "#d5e3ff" : "#0045d8", 
              boxShadow: "unset", 
              marginRight: "10px" 
            }}
          />
        </Box>
      </Flex>
    </Card>
  )
}