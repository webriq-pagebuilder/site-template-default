import { useState } from "react";
import { useClient } from "sanity";
import { CopyIcon } from "@sanity/icons"
import { DuplicatePageSettings } from "studio/components/actions";

export default function CustomDuplicateAction(props) {
  const client = useClient({ apiVersion: "2021-10-21" });

  const documentId = !props?.draft ? props?.id : props?.draft?._id;

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
              "current": true,
              "include": true,
              "replaced": false,
              "isEditing": false, 
            }, 
          }`, 
          { documentId: documentId }
        )
        .then(async (result) => {
          setPage(result)

          // fetch all the variants based on the section type added in current document
          await client
            .fetch(
              `*[_type in $sections] {
                ...,
                "current": true,
                "include": true,
                "replaced": false,
                "isEditing": false,
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