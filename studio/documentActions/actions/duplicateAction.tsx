import { useState, useRef } from "react";
import {
  Box, 
  Button, 
  Card, 
  Flex,
  Inline, 
  Menu,
  MenuButton,
  MenuItem,
  useToast,
  Stack, 
  Switch, 
  Text, 
  TextInput, 
  Tooltip
} from "@sanity/ui";
import { useClient } from "sanity";
import { CopyIcon, TransferIcon } from "@sanity/icons"

export default function duplicateAction(props) {
  const toast = useToast();
  const client = useClient({ apiVersion: "2021-10-21" });

  const [page, setPage] = useState(null);
  const [variants, setVariants] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  return {
    icon: CopyIcon,
    label: "Duplicate",
    onHandle: async () => {
      // fetch all ADDED sections for the current document
      await client
        .fetch(
          `*[_id == $documentId][0]{ 
            ...,
            sections[]->, 
          }`, 
          { documentId: props?.id }
        )
        .then((result) => setPage(result))

      // fetch all the variants based on the section type added in current document
      await client
        .fetch(
          `*[_type == $sections]`,
          { sections: page?.sections?.map((section) => section) }
        )
        .then((result) => setVariants(result));
      setDialogOpen(true)
    },
    dialog: dialogOpen && {
      type: "dialog",
      onClose: () => {
        setDialogOpen(false)
      },
      header: "Duplicate document content",
      content: (
        <DuplicatePageSettings {...{ title: page?.title, sections: page?.sections, variants }} />
      )
    }
  }
}

function DuplicatePageSettings({ title, sections, variants }) {
  const [duplicateSections, setDuplicateSections] = useState(sections);
  const [newReference, setNewReference] = useState(null);
  const [checkedState, setCheckedState] = useState(new Array(sections?.length).fill(true)); // [true, true, true]
  const ref = useRef(null);
  let variantStr = "", sectionVariant = "Variant not selected"

  const handleOnToggle = (position: number) => {
    const updateToggle = checkedState?.map((item, index) => 
      index === position ? !item : item
    );

    setCheckedState(updateToggle);
  }

  return (
    <Card padding={2}>
      <Stack space={2}>
        <Text size={1} weight="bold">
          Title
        </Text>
        <TextInput
          fontSize={2}
          ref={ref}
          padding={[3, 3, 4]}
          placeholder="Title"
          defaultValue={title}
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
                key={section?._id}
              >
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
                      {!checkedState[index] && (
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
                            tone="primary"
                          />
                      </Tooltip>
                      )}
                      <Switch 
                        id={`${section?._type}-${index + 1}`}
                        name={`${section?.label} toggle`}
                        value={section?._type}
                        checked={checkedState[index]}
                        onChange={() => handleOnToggle(index)}
                      />
                    </Inline>
                  </Box>
                </Flex>
              </Card>     
            )
          })}
        </Stack>
      </Box>
      <Box style={{ textAlign: "right" }}>
        <Button
          fontSize={2}
          tone="primary"
          padding={3}
          text="Duplicate"
          style={{ backgroundColor: "#0045d8" }}
        />
      </Box>
    </Card>
  )
}