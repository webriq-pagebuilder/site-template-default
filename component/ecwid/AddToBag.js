import { useEcwid } from "context/EcwidContext";
import React from "react";

const AddToBag = ({ children, classNames, inStock = false }) => {
  const ecwid = useEcwid();
  const isAddingToBag = ecwid?.isAddingToBag;
  return (
    <button
      className={classNames}
      type="submit"
      disabled={inStock || isAddingToBag}
    >
      {isAddingToBag ? "Adding..." : children}
    </button>
  );
};

export default AddToBag;
