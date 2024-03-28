import { useEcwid } from "context/EcwidContext";
import React from "react";
import AddToWishlist from "./AddToWishlist";
import { EcwidTypes } from "context/_ecwid-types";
import { Flex } from "components/layout/index";
import { Button, Text } from "components/ui";

interface AddMoreButtonProps {
  product:
    | EcwidTypes["products"]
    | {
        name: string;
        ecwidProductId: number;
        price: string;
        description: string;
      };
}

const AddMoreButton = ({ product }: AddMoreButtonProps) => {
  const ecwid = useEcwid();
  const isAddingToBag = ecwid?.isAddingToBag;

  const { favorited } = ecwid;

  return (
    <>
      <Flex direction="col" className="gap-y-4 ">
        <Flex className="flex-col gap-y-4 sm:flex-row sm:gap-x-4 sm:gap-y-0 w-full">
          <div className="w-full">
            <Button
              variant="outline"
              as="button"
              ariaLabel="Add More Button"
              type="submit"
              borderRadius="md"
              className="block w-full px-8 py-5 uppercase text-primary"
              disabled={isAddingToBag}
            >
              {isAddingToBag ? "Adding..." : "Add More"}
            </Button>
          </div>

          <AddToWishlist classNames="py-5 px-8" product={product}>
            {!favorited ? (
              <>
                <svg
                  className="hidden sm:block w-6 h-6"
                  width={27}
                  height={27}
                  viewBox="0 0 27 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.4993 26.2061L4.70067 16.9253C3.9281 16.1443 3.41815 15.1374 3.24307 14.0471C3.06798 12.9568 3.23664 11.8385 3.72514 10.8505V10.8505C4.09415 10.1046 4.63318 9.45803 5.29779 8.96406C5.96241 8.47008 6.73359 8.14284 7.54782 8.00931C8.36204 7.87578 9.19599 7.93978 9.98095 8.19603C10.7659 8.45228 11.4794 8.89345 12.0627 9.48319L13.4993 10.9358L14.9359 9.48319C15.5192 8.89345 16.2327 8.45228 17.0177 8.19603C17.8026 7.93978 18.6366 7.87578 19.4508 8.00931C20.265 8.14284 21.0362 8.47008 21.7008 8.96406C22.3654 9.45803 22.9045 10.1046 23.2735 10.8505V10.8505C23.762 11.8385 23.9306 12.9568 23.7556 14.0471C23.5805 15.1374 23.0705 16.1443 22.298 16.9253L13.4993 26.2061Z"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <Text weight="bold" className="block sm:hidden mt-1 uppercase">
                  Add to wishlist
                </Text>
              </>
            ) : (
              <Text weight="bold" className="mt-1 uppercase">
                Remove from wishlist
              </Text>
            )}
          </AddToWishlist>
        </Flex>

        <a
          className="block w-full px-8 py-5 font-bold text-center text-white uppercase transition duration-200 rounded-md font-heading bg-primary"
          href="/cart?store-page=cart"
        >
          Go to Checkout
        </a>
      </Flex>
    </>
  );
};

export default AddMoreButton;
