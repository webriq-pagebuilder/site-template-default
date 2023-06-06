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
  Tooltip
} from "@sanity/ui";
import { useClient } from "sanity";
import { CopyIcon, TransferIcon } from "@sanity/icons"
import SearchBar from "studio/components/SearchBar";
import { nanoid } from "nanoid";

export default function duplicateAction(props) {
  const client = useClient({ apiVersion: "2021-10-21" });

  const [page, setPage] = useState(null);
  const [variants, setVariants] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  return {
    icon: CopyIcon,
    tone: "primary",
    label: "Duplicate",
    onHandle: async () => {
      // fetch all ADDED sections for the current document
      await client
        .fetch(
          `*[_id == $documentId][0]{ 
            ...,
            sections[]->{
              ...,
              "include": true,
              "replace": false,
            }, 
          }`, 
          { documentId: props?.id }
        )
        .then(async (result) => {
          setPage(result)

          // fetch all the variants based on the section type added in current document
          await client
            .fetch(
              `*[_type in $sections] {
                ...,
                "include": true,
                "replace": false,
              }`,
              { sections: result?.sections?.map((section) => section?._type) }
          )
          .then((result) => setVariants(result));
        });

      setDialogOpen(true);
    },
    dialog: dialogOpen && {
      type: "dialog",
      onClose: () => {
        setDialogOpen(false);
      },
      header: "Duplicate document content",
      content: (
        <DuplicatePageSettings {...{ 
            page,
            variants,
            sanityClient: client,
            setDialogOpen 
          }} 
        />
      )
    }
  }
}

function DuplicatePageSettings({ page, variants, sanityClient, setDialogOpen }) {
  const toast = useToast();

  const [duplicateSections, setDuplicateSections] = useState(page?.sections);
  const [pageTitle, setPageTitle] = useState(page?.title);

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
    await sanityClient
      .create(payload)
      .then((response) => {
        console.log("[INFO] Successfully duplicated document: ", response);
        toast.push({
          status: "success",
          title: "Successfully duplicated variant!",
        });
        setDialogOpen(false);
      })
      .catch((error) => {
        console.log("Sorry, something went wrong. Failed to duplicate variant.", error);
        toast.push({
          status: "error",
          title: "Sorry, something went wrong. Failed to duplicate variant.",
        });
      }); 
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
                padding={3} 
                radius={2} 
                shadow={1} 
                tone={!section?.include ? "default" : "primary"}
                key={section?._id}
              >
                <Flex justify="space-between">
                  {!section?.replace ? (
                    <Box padding={2}>
                      <Text>{section?.label ?? "Untitled document"}</Text>
                      <Text size={1} muted style={{ marginTop: "12px" }}>
                        {`${sectionVariant} • ${section?._type?.toUpperCase()}`}
                      </Text>
                    </Box>  
                  ) : (
                    <Box padding={2}>
                      <SearchBar 
                        searchItems={variants?.filter((variant) => 
                          variant?._type === section?._type && variant?._id !== section?.variants?._id
                        )} 
                        onClickHandler={(value) => handleReplaceReferenceBtn(value, index)}
                      />
                    </Box>
                  )}
                  <Box paddingTop={3}>
                    <Inline space={2}>
                      {/* Replace reference button */}
                      {section?.include && (
                        <Tooltip
                          content={
                            <Box padding={2}>
                              <Text size={2}>Replace</Text>
                            </Box>
                          }
                          fallbackPlacements={["top", "right"]}
                          placement="bottom"
                          portal
                        >
                          <Button
                            fontSize={2}
                            icon={TransferIcon}
                            mode="bleed"
                            onClick={() => handleReplaceReferenceBtn(null, index)}
                            disabled={section?.replace}
                          />
                      </Tooltip>
                      )}
                      {/* Remove reference toggle button */}
                      <Tooltip
                        content={
                          <Box padding={2}>
                            <Text size={2}>
                              {duplicateSections[index]?.include ? "Remove" : "Add"}
                            </Text>
                          </Box>
                        }
                        fallbackPlacements={["top", "right"]}
                        placement="bottom"
                        portal
                      >
                        <Switch 
                          id={`${section?._type}-${index + 1}`}
                          name={`${section?.label} include`}
                          value={section?._type}
                          checked={duplicateSections[index]?.include}
                          onChange={() => handleToggleIncludeSection(index)}
                          disabled={section?.replace}
                        />
                      </Tooltip>
                    </Inline>
                  </Box>
                </Flex>
              </Card>     
            )
          })}
        </Stack>
      </Box>
      <Flex justify="space-between">
        <p className="ml-4 text-sm text-gray-500">
          <span className="font-bold">{duplicateSections?.filter((section) => section?.include)?.length}</span>{" "}
          section/s to duplicate
        </p>
        <Box style={{ textAlign: "right" }}>
          <Button
            fontSize={2}
            padding={3}
            text="Revert"
            onClick={() => setDuplicateSections(page?.sections)}
            disabled={!pageTitle || duplicateSections?.filter((section) => section?.include)?.length === 0}
            style={{ 
              backgroundColor: !pageTitle || duplicateSections?.filter((section) => section?.include)?.length === 0 ? "#ff000082" : "red", 
              boxShadow: "unset", 
              marginRight: "10px" 
            }}
          />
          <Button
            fontSize={2}
            tone="primary"
            padding={3}
            text="Duplicate"
            onClick={() => handleDuplicateBtn({ 
              title: pageTitle, 
              slug: {
                current: `${page?.slug?.current}-duplicate`,
                _type: "slug"
              }, 
              _type: page?._type,
              sections: duplicateSections?.filter((section) => section?.include)?.map((section) => (
                {
                  _key: nanoid(),
                  _ref: section?._id,
                  _type: section?._type === "pages_productInfo" 
                    ? "productInfo" 
                    : section?._type,
                }
              ))
            })}
            disabled={!pageTitle || duplicateSections?.filter((section) => section?.include)?.length === 0}
          />
        </Box>
      </Flex>
    </Card>
  )
}