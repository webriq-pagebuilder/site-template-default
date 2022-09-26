import { useEcwid } from "context/EcwidContext";
import React from "react";

const AddMoreButton = ({ itemsCount }) => {
  const ecwid = useEcwid();
  const isAddingToBag = ecwid?.isAddingToBag;

  return (
    <>
      <p className="mb-3">{`${itemsCount} ${
        itemsCount === 1 ? "item" : "items"
      } in the bag`}</p>
      <div className="flex flex-col gap-y-4 ">
        <button
          type="submit"
          className="block w-full text-center text-webriq-darkblue border border-webriq-darkblue font-bold font-heading py-5 px-8 rounded-md uppercase transition duration-200"
          disabled={isAddingToBag}
        >
          {isAddingToBag ? "Adding..." : "Add More"}
        </button>
        <a
          href="/cart?store-page=cart"
          className="block w-full text-center text-white font-bold font-heading py-5 px-8 rounded-md uppercase transition duration-200 bg-webriq-darkblue"
        >
          Go to Checkout
        </a>
      </div>
    </>
  );
};

export default AddMoreButton;
