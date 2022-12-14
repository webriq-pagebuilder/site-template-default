import { useEcwid } from "context/EcwidContext";
import React from "react";
import Link from "next/link";

const ViewWishlist = () => {
  const ecwid = useEcwid();
  const isAddingToBag = ecwid?.isAddingToBag;

  return (
    <>
      <div className="flex flex-row gap-x-4 ">
        <Link
          href="/wishlist"
          className="border block w-full text-center font-bold font-heading py-5 px-8 rounded-md uppercase transition duration-200 hover:border-webriq-darkblue"
        >
          View Wishlist
        </Link>
      </div>
    </>
  );
};

export default ViewWishlist;
