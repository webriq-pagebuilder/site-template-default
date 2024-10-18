import { useEcwid } from "context/EcwidContext";
import React, { useEffect } from "react";
import { TypedObject } from "sanity";
import _ from "lodash";
import { EcwidTypes } from "context/_ecwid-types";
import { Button } from "@stackshift-ui/button";
import { Text } from "@stackshift-ui/text";

interface AddToWishlistProps {
  children?: React.ReactNode;
  classNames?: string;
  product?:
    | EcwidTypes["products"]
    | {
        name: string;
        ecwidProductId: number;
        price: string;
        description: TypedObject | TypedObject[] | null;
      };
  containerClass?: string;
}

const AddToWishlist = ({
  children,
  classNames,
  product,
  containerClass = "w-full sm:w-1/6",
}: AddToWishlistProps) => {
  const ecwid = useEcwid();
  const { addWishlist, setId, favorited } = ecwid;

  const productId =
    product && "id" in product ? product?.id : product?.ecwidProductId;

  useEffect(() => {
    setId(productId);
  }, [productId, setId]);

  return (
    <>
      <div className={favorited ? "w-full" : containerClass}>
        <Button
          as="button"
          variant="addToWishlist"
          ariaLabel="Add to Wishlist"
          onClick={() => addWishlist(productId)}
          className={classNames}
          type="button"
        >
          {!favorited ? (
            children
          ) : (
            <Text weight="bold" className="mt-1 uppercase">
              Remove from wishlist
            </Text>
          )}
        </Button>
      </div>
    </>
  );
};

export default AddToWishlist;
