import { useEcwid } from "context/EcwidContext";
import React from "react";
import Link from "next/link";

const ViewWishlist = () => {
  const ecwid = useEcwid();
  const isAddingToBag = ecwid?.isAddingToBag;

  return (
    <>
      <div className="flex flex-row gap-x-4 mb-5">
        <Link
          className="block w-full md:w-3/4 rounded-global border px-8 py-5 text-center font-bold uppercase transition duration-200 hover:border-primary"
          href="/wishlist"
        >
          View Wishlist
        </Link>
      </div>
    </>
  );
};

export default ViewWishlist;
