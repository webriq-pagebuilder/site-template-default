import { useState } from "react";
import {
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
import { EditIcon, CloseIcon } from "@sanity/icons"
import { ButtonWithTooltip, SearchBar } from "./index";
import { nanoid } from "nanoid";


export default function DuplicatePageSettings({ page, variants, sanityClient, setDialogOpen }) {
  const toast = useToast();

  const [duplicateSections, setDuplicateSections] = useState(page?.sections);
  const [pageTitle, setPageTitle] = useState(page?.title || page?.name);

  let variantStr = "", sectionVariant = "Variant not selected"

  const handleToggleIncludeSection = (position) => {
    const updated = duplicateSections?.map((section, index) => {
      if(index !== position) {
        return section; // no change
      } else {
        // return new shape
        return {
          ...section,
          include: !section.include
        }
      }
    });

    setDuplicateSections(updated);
  }

  const handleReplaceReferenceBtn = (value: any, position) => {
    const updated = duplicateSections?.map((section, index) => {
      if(index !== position) {
        return section; // no change
      } else {
        if(value) {
          // return new shape
          return duplicateSections[index] = value;
        }
        return {
          ...section,
          replace: !section.replace,        
        }
      }
    });

    setDuplicateSections(updated);
  }

  const handleDuplicateBtn = async (payload: any) => {
    try {
      const sections = await Promise.all(
        payload?.sections?.map(async (section) => 
          // create new documents for the payload.sections and use their "_id" as reference
          await sanityClient
            .create(section)
            .then((result) => ({ 
              _key: nanoid(), 
              _ref: result?._id, 
              _type: result?._type 
            })
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
        <TextInput
          fontSize={2}
          value={pageTitle}
          padding={[3, 3, 4]}
          placeholder="Document title"
          onChange={(event) => setPageTitle(event.target.value)}
          required
        />
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
              <Card 
                className="relative modal-section replace-btn"
                padding={3} 
                radius={2} 
                shadow={1} 
                key={section?._id}
                style={{
                  backgroundColor: !section?.include && "#e5e7ebb5"
                }}
              >
                {section?.replace ? (
                  <div className="flex flex-wrap">
                    <Box padding={2} style={{ width: "95%" }}>
                      <SearchBar 
                        searchItems={variants?.filter((variant) => 
                          variant?._type === section?._type && variant?._id !== section?.variants?._id
                        )} 
                        onClickHandler={(value) => handleReplaceReferenceBtn(value, index)}
                      />
                    </Box>
                    <ButtonWithTooltip toolTipText="Cancel">
                      {/* Close button */}
                      <button
                        className="items-center text-center font-medium text-webriq-darkblue hover:text-webriq-babyblue"
                        onClick={() => handleReplaceReferenceBtn(null, index)}
                      >
                        <CloseIcon style={{ fontSize: 24 }} />
                      </button>
                    </ButtonWithTooltip>
                  </div>
                ) : (
                  <Flex justify="space-between">
                    <Box padding={2}>
                      <Text>{section?.label ?? "Untitled document"}</Text>
                      <Text size={1} muted style={{ marginTop: "12px" }}>
                        {`${sectionVariant} • ${section?._type?.toUpperCase()}`}
                      </Text>
                    </Box>  
                    <Box paddingTop={3}>
                      <Inline space={2}>
                        {/* Replace reference button */}
                        <ButtonWithTooltip toolTipText="Replace">
                          <button
                            className={`items-center text-center font-medium text-webriq-darkblue hover:text-webriq-babyblue ${!section?.replace && "hide"}`}
                            onClick={() => handleReplaceReferenceBtn(null, index)}
                          >
                            <EditIcon style={{ fontSize: 24 }} />
                          </button>
                        </ButtonWithTooltip>
                        {/* Reference toggle button */}
                        <ButtonWithTooltip toolTipText={duplicateSections[index]?.include ? "Remove" : "Add"}>
                          <Switch 
                            id={`${section?._type}-${index + 1}`}
                            name={`${section?.label} include`}
                            value={section?._type}
                            checked={duplicateSections[index]?.include}
                            onChange={() => handleToggleIncludeSection(index)}
                          />
                        </ButtonWithTooltip>
                      </Inline>
                    </Box>
                  </Flex>
                )}
              </Card>     
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
          {/* Revert button */}
          <Button
            fontSize={2}
            padding={3}
            text="Revert"
            onClick={() => {
              setPageTitle(page?.title)
              setDuplicateSections(page?.sections)
            }}
            style={{ 
              backgroundColor: "red", 
              boxShadow: "unset", 
              marginRight: "10px" 
            }}
          />
          {/* Duplicate button */}
          <Button
            fontSize={2}
            padding={3}
            text="Duplicate"
            onClick={() => handleDuplicateBtn({ 
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
                  _type: section?._type === "pages_productInfo" 
                    ? "productInfo" 
                    : section?._type,
                }
              ))
            })}
            disabled={!pageTitle || duplicateSections?.filter((section) => section?.include)?.length === 0}
            style={{ 
              backgroundColor: !pageTitle || duplicateSections?.filter((section) => section?.include)?.length === 0 ? "#d5e3ff" : "#0045d8", 
              boxShadow: "unset", 
              marginRight: "10px" 
            }}
          />
        </Box>
      </Flex>
    </Card>
  )
}