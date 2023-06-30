import { useState, useContext } from "react";
import { CopyIcon } from "@sanity/icons"
import { DuplicatePageSettings, DialogFooter } from "studio/components/actions";
import { sanityClient } from "lib/sanity.client";
import { DuplicatePageContext } from "studio/context/DuplicatePageContext";

export default function CustomDuplicateAction(props) {
  const documentId = !props?.draft ? props?.id : props?.draft?._id;

  const [page, setPage] = useState(null);
  const [variants, setVariants] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const duplicatePageData = useContext(DuplicatePageContext);

  console.log("duplicatePageData: ", duplicatePageData);

  return {
    icon: CopyIcon,
    tone: "primary",
    label: "Duplicate",
    onHandle: async () => {
      // fetch all ADDED sections for the current document
      await sanityClient
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
          if(result?.sections?.length !== 0) {
            await sanityClient
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
          }
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
        <DuplicatePageSettings {...{ page, variants, setDialogOpen }} />
      ),
      footer:(
        <DialogFooter {...{
          document: page, 
          title: page?.title, 
          sections: page?.sections, 
          setDialogOpen 
        }} />
      )
    }
  }
}