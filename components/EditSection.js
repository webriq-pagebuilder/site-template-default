import React from "react";
import { EditIcon } from "@sanity/icons";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
} from '@chakra-ui/react'
import { sectionName } from "studio/badges/sectionBadge";
import { NEXT_PUBLIC_SITE_URL } from "config";


function EditSection({ documentType, documentId }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  let type = documentType;

  if(documentType === "mainProduct") {
    type = "Product page"
  } else if (documentType === "mainCollection") {
    type = "Collection page"
  } else if (documentType === "wishlistPage") {
    type = "Wishlist page"
  } else if (documentType === "cartPage") {
    type = "Cart page"
  } else if (documentType === "searchPage") {
    type = "Wishlist page"
  }

  return (
    <>
      <Button border="1px" borderColor="#0045d8" backgroundColor="white" rounded="sm" textColor="#0045d8" padding={2} leftIcon={<EditIcon style={{ fontSize: "18px" }} />} ref={btnRef} onClick={onOpen} style={{ position: "absolute", zIndex: 40, margin: 2, right: 0 }}>
        Edit
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
        size="xl"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{`Editing ${sectionName(type)}`}</DrawerHeader>

          <DrawerBody>
            <iframe 
              //className="rounded-xl border-2 border-blue-600"
              className="overflow-hidden"
              width="750"
              height="825"
              src={`${NEXT_PUBLIC_SITE_URL}/studio/desk/__edit__${documentId},type=${documentType}`}
            />
          </DrawerBody>

          <DrawerFooter>
            <Button border="1px" borderColor="#0045d8" mr={3} variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default EditSection