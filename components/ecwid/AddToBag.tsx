import { Button } from "components/ui/Button";
import { useEcwid } from "context/EcwidContext";
import { EcwidTypes } from "context/_ecwid-types";
import React from "react";

interface AddToBagProps {
  children?: React.ReactNode;
  classNames?: string;
  inStock?: EcwidTypes["products"]["inStock"];
}

const AddToBag = ({ children, classNames, inStock = false }: AddToBagProps) => {
  const ecwid = useEcwid();
  const isAddingToBag = ecwid?.isAddingToBag;

  return (
    <>
      <Button
        variant="custom"
        as="button"
        ariaLabel="Add to Bag button"
        className={classNames}
        type="submit"
        disabled={inStock || isAddingToBag}
      >
        {isAddingToBag ? "Adding..." : children}
      </Button>
    </>
  );
};

export default AddToBag;
