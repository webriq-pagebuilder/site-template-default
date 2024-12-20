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
          className="block !bg-white !text-secondary w-full rounded-global border border-primary px-8 py-5 text-center font-bold uppercase transition duration-200 hover:border-primary"
          href="/wishlist"
        >
          View Wishlist
        </Link>
      </div>
    </>
  );
};

export default ViewWishlist;
