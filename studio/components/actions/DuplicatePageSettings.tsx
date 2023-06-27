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
import { ComposeIcon, CloseIcon, RestoreIcon, ArchiveIcon } from "@sanity/icons"
import { ButtonWithTooltip, SearchBar } from "./index";
import { nanoid } from "nanoid";


export default function DuplicatePageSettings({ page, variants, sanityClient, setDialogOpen }) {
  const toast = useToast();
  let variantStr = "", sectionVariant = "Variant not selected";

  const [duplicateSections, setDuplicateSections] = useState(page?.sections);
  const [pageTitle, setPageTitle] = useState(page?.title || page?.name);

  // NEW REFERENCE
  const handleNewReferenceBtn = (position) => {
    const updated = duplicateSections?.map((section, index) => {
      if(index !== position) {
        return section; // no change
      } else {
        // return new shape
        return {
          ...section,
          original: !section.original
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

  // EXCLUDE REFERENCE
  const handleExcludeReferenceBtn = (position) => {
    const updated = duplicateSections?.map((section, index) => {
      if(index !== position) {
        return section; // no change
      } else {
        // return new shape
        if(!section?.original || section?.replaced) {
          console.log("replacedObj: ", ref.current);

          // if reference was changed, revert flags
          return {
            ...section,
            include: true,
            original: true,
          }
        }

        return {
          ...section,
          include: !section?.include,
        }
      }
    });

    setDuplicateSections(updated);
  }

  // DUPLICATE DOCUMENT
  const handleDuplicateBtn = async (documentId: string, payload: any) => {
    try {
      const sections = await Promise.all(
        payload?.sections?.map(async (section) => 
          await sanityClient
            .create(section)
            .then(async (result) => {
              if(section?.original) {
                // use the existing section object for the new document
                return await sanityClient
                  .fetch(
                    `*[_id == $documentId][0].sections`, 
                    { documentId: documentId }
                  ).then((result) => result?.find((orig) => orig?._type === section?._type))
              } else {
                // create new documents for the payload.sections and use result "_id" as reference
                return { 
                  _key: nanoid(), 
                  _ref: result?._id, 
                  _type: result?._type 
                };
              }
            }
          )  
        )
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
            setDialogOpen(false);
          })
      }
    } catch (error) {
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
          <button
            className="absolute top-0 right-0 z-20 mt-3 mr-3 text-webriq-darkblue hover:text-webriq-babyblue"
            style={{ 
              cursor: pageTitle !== page?.title || page?.name ? null : "not-allowed"
            }}
            disabled={pageTitle === page?.title || page?.name}
            onClick={() => setPageTitle(page?.title || page?.name)}
          >
            <RestoreIcon style={{ fontSize: 24 }} />
          </button>
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
                          <Text style={{ paddingTop: 4 }}>{section?.label ?? "Untitled document"}</Text>
                          {!section?.include ? (
                            <Badge mode="outline" tone="critical">Not included</Badge> 
                          ) : (
                            !section?.original ? (
                              <Badge mode="outline" tone="primary">New</Badge>
                            ): section?.replaced ? (
                              <Badge mode="outline" tone="positive">Replaced</Badge>
                            ): null
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
                        </Inline>
                        <Inline>
                          {/* Exclude reference button */}
                          <ButtonWithTooltip toolTipText={!section?.include || !section?.original || section?.replaced ? "Revert" : "Exclude"}>
                            <button
                              onClick={() => handleExcludeReferenceBtn(index)}
                            >
                              {!section?.include || !section?.original || section?.replaced ? (
                                <RestoreIcon style={{ fontSize: 24 }} />
                              ) : (
                                <ArchiveIcon style={{ fontSize: 24, color: "maroon" }} />
                              )}
                            </button>
                          </ButtonWithTooltip>
                          {/* Reference toggle button */}
                          <Box padding={3}>
                            <ButtonWithTooltip toolTipText={!duplicateSections[index]?.original ? "Use Default" : "New Reference"}>
                              <Switch 
                                id={`${section?._type}-${index + 1}`}
                                name={`${section?.label} include`}
                                value={section?._type}
                                disabled={!section?.include}
                                checked={!duplicateSections[index]?.original}
                                onChange={() => handleNewReferenceBtn(index)}
                              />
                            </ButtonWithTooltip>
                          </Box>
                        </Inline>
                      </Flex>
                      <Box padding={2}>
                        <Text size={1} muted>
                          {`${sectionVariant} • ${section?._type?.toUpperCase()}`}
                        </Text>
                      </Box>
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
                  original: section?.original,
                  _type: section?._type === "pages_productInfo" 
                    ? "productInfo" 
                    : section?._type,
                }
              ))
            })}
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