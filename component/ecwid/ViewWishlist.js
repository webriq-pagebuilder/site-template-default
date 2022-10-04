import { useEcwid } from "context/EcwidContext";
import React from "react";

const ViewWishlist = () => {
  const ecwid = useEcwid();
  const isAddingToBag = ecwid?.isAddingToBag;

  return (
    <>
      <div className="flex flex-row gap-x-4 ">
        <a
          href="/wishlist"
          className="border block w-full text-center font-bold font-heading py-5 px-8 rounded-md uppercase transition duration-200"
        >
          View Wishlist
        </a>
      </div>
    </>
  );
};

export default ViewWishlist;
