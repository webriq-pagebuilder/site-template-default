import { useEcwid } from "context/EcwidContext";
import React, { useEffect, useMemo, useState } from "react";
import AddMoreButton from "./AddMoreButton";
import ViewWishlist from "./ViewWishlist";
import ItemInBag from "./ItemInBag";

const ProductDetail = ({ product, children }) => {
  const productId = product?.id ? product?.id : product?.ecwidProductId;

  if (!productId) return null;

  const ecwid = useEcwid();
  const addToBag = ecwid?.addToBag;
  const options = ecwid?.options;
  const setOptions = ecwid?.setOptions;
  const setPrice = ecwid?.setPrice;
  const setSelectedOpt = ecwid?.setSelectedOpt;

  // const cart = ecwid?.cart;
  const favorited = ecwid.favorited;
  const addtowishlist = ecwid.addtowishlist;

  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState(null);

  useEffect(() => {
    if (typeof Ecwid !== "undefined") {
      try {
        Ecwid.Cart.get(function (cart) {
          setCart(cart);
        });
        Ecwid.OnCartChanged.add(function (cart) {
          setCart(cart);
        });
      } catch (error) {
        console.error();
      }
    }
  }, [ecwid]);

  useEffect(() => {
    setPrice(product?.defaultDisplayedPrice);
  }, [product?.defaultDisplayedPrice, setPrice]);

  useEffect(() => {
    if (productId) {
      let data = {};

      product?.options?.forEach((option) => {
        if (option?.choices && typeof option?.defaultChoice !== "undefined") {
          data[option?.name] = option?.choices[option?.defaultChoice]?.text;
        }
      });

      // setOptions(data);
    }
  }, [product?.options, productId, setOptions]);

  useEffect(() => {
    if (options && Object.keys(options).length) {
      let priceModifier = 0;

      Object.entries(options).forEach((element) => {
        const key = element[0];
        const value = element[1];

        const selectedOption = product?.options?.find((el) => el?.name === key);
        if (selectedOption) {
          if (selectedOption?.choices && selectedOption?.choices?.length) {
            const selectedChoice = selectedOption?.choices?.find(
              (el) => el.text === value
            );
            if (selectedChoice) {
              priceModifier += selectedChoice?.priceModifier;
            }
          }
        }
      });

      setPrice(product?.defaultDisplayedPrice + priceModifier);
    }
  }, [options, product?.defaultDisplayedPrice, product?.options, setPrice]);

  const itemsCount = useMemo(() => {
    let count = 0;
    if (cart?.items?.length) {
      const item = cart?.items?.filter((el) => el.product.id === productId);
      if (item?.length) {
        item?.forEach((element) => {
          count += element.quantity;
        });
      }
    }
    return count;
  }, [cart?.items, productId]);

  const handleChanged = (option, choice, event) => {
    if (option?.type === "TEXTFIELD" || option?.type === "SELECT") {
      setOptions((prev) => ({
        ...prev,
        [option?.name]: event?.target?.value,
      }));

      setSelectedOpt((prev) => [
        ...prev.filter((item) => item.name !== option.name),
        { name: option.name, value: event?.target?.value },
      ]);
    } else if (option?.type === "RADIO" || option?.type === "SIZE") {
      setOptions((prev) => ({ ...prev, [option?.name]: choice.text }));

      setSelectedOpt((prev) => [
        ...prev.filter((item) => item.name !== option.name),
        { name: option.name, value: choice?.text },
      ]);
    } else if (option?.type === "CHECKBOX") {
      if (event?.target?.checked) {
        setOptions((prev) => ({
          ...prev,
          [option?.name]:
            prev[option?.name] && prev[option?.name]?.length
              ? [...prev[option?.name], choice?.text]
              : [choice?.text],
        }));

        setSelectedOpt((prev) => [
          ...prev.filter((item) => item.name !== option.name),
          {
            [option?.name]:
              prev[option?.name] && prev[option?.name]?.length
                ? [...prev[option?.name], choice?.text]
                : [choice?.text],
          },
        ]);
      } else {
        setOptions((prev) => ({
          ...prev,
          [option?.name]: prev[option?.name]?.filter(
            (el) => el !== choice?.text
          ),
        }));

        setSelectedOpt((prev) => [
          ...prev.filter((item) => item.name !== option.name),
          {
            [option?.name]: prev[option?.name]?.filter(
              (el) => el !== choice?.text
            ),
          },
        ]);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addToBag({ id: productId, quantity }, options);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {product?.options?.map((option, index) => {
          const value = !_.isEmpty(options) ? options[option?.name] : "";

          if (option?.type === "TEXTFIELD") {
            return (
              <div key={index} className="flex flex-col mb-4">
                <label
                  htmlFor={index}
                  className="font-medium text-gray-900 mb-2 uppercase"
                >
                  {option?.name}
                </label>
                <input
                  type="text"
                  name={`name_${option?.name}`}
                  id={index}
                  className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                  required={option?.required}
                  value={value}
                  onChange={(e) => handleChanged(option, null, e)}
                />
              </div>
            );
          }

          if (option?.type === "SELECT") {
            return (
              <div key={index} className="flex flex-col mb-4">
                <label
                  htmlFor={index}
                  className="font-medium text-gray-900 mb-2 uppercase"
                >
                  {option?.name}
                </label>
                <select
                  name={`name_${option?.name}`}
                  id={index}
                  style={{ maxWidth: "420px" }}
                  className="block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-3 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                  required={option?.required}
                  value={value}
                  onChange={(e) => handleChanged(option, null, e)}
                >
                  <option value="">Please choose</option>
                  {option?.choices?.map((choice, ii) => (
                    <option key={ii} value={choice?.text}>
                      {choice?.text}
                    </option>
                  ))}
                </select>
              </div>
            );
          }

          if (option?.type === "RADIO") {
            return (
              <div key={index} className="mb-4">
                <p className="font-medium text-gray-900 mb-2">{option?.name}</p>
                {option?.choices?.map((choice, ii) => (
                  <div className="flex items-center" key={ii}>
                    <input
                      id={choice?.text}
                      type="radio"
                      name={`name_${option?.name}`}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  focus:ring-2 "
                      required={option?.required}
                      checked={value === choice?.text}
                      onChange={(e) => handleChanged(option, choice, e)}
                    />
                    <label
                      htmlFor={choice?.text}
                      className="ml-2 font-medium text-gray-900"
                    >
                      {choice?.text}
                    </label>
                  </div>
                ))}
              </div>
            );
          }

          if (option?.type === "SIZE") {
            return (
              <div key={index}>
                <p className="font-medium text-gray-900 mb-2 uppercase">
                  {option.name}
                </p>
                <ul className="w-full flex flex-wrap space-x-4">
                  {option?.choices?.map((choice, ii) => (
                    <li key={ii} className="mb-4">
                      <input
                        id={choice?.text}
                        type="radio"
                        name={`name_${option?.name}`}
                        className="hidden peer"
                        required={option?.required}
                        checked={value === choice?.text}
                        onChange={(e) => handleChanged(option, choice, e)}
                      />
                      <label
                        htmlFor={choice?.text}
                        className="inline-flex justify-between items-center p-3 w-full text-gray-500 bg-white rounded-md border border-gray-200 cursor-pointer dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100"
                      >
                        <div className="block">
                          <div className="w-full text-md font-semibold">
                            {choice?.text}
                          </div>
                        </div>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            );
          }

          if (option?.type === "CHECKBOX") {
            return (
              <div key={index} className="mb-4">
                <p className="font-medium text-gray-900 mb-2 uppercase">
                  {option?.name}
                </p>
                {option?.choices?.map((choice, ii) => (
                  <div className="flex items-center" key={ii}>
                    <input
                      id={choice?.text}
                      type="checkbox"
                      name={`name_${option?.name}`}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  focus:ring-2 "
                      required={option?.required}
                      checked={Boolean(value.includes(choice?.text))}
                      onChange={(e) => handleChanged(option, choice, e)}
                    />
                    <label
                      htmlFor={choice?.text}
                      className="ml-2 font-medium text-gray-900"
                    >
                      {choice?.text}
                    </label>
                  </div>
                ))}
              </div>
            );
          }

          return null;
        })}

        <div className="flex flex-col mb-4">
          <label
            htmlFor="quantity"
            className="font-bold text-gray-900 mb-2 uppercase"
          >
            Quantity
          </label>
          <div className="flex flex-row border border-gray-400 hover:border-gray-500 shadow rounded w-full">
            <button
              id="minus-button"
              type="button"
              onClick={() => setQuantity((prev) => prev - 1)}
              disabled={quantity === 1 ? true : false}
            >
              <svg
                id="minus-icon"
                width={41}
                height={41}
                viewBox="0 0 41 41"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.0839844"
                  y="0.640625"
                  width={40}
                  height={40}
                  rx={6}
                  fill="#323232"
                />
                <path
                  d="M17.384 23.2406V21.2406H22.444V23.2406H17.384Z"
                  fill="white"
                />
              </svg>
            </button>
            <input
              type="text"
              name="quantity"
              id="quantity"
              className="w-full sm:w-[334px] inline-block text-center bg-white focus:outline-none focus:shadow-outline"
              required
              //style={{ maxWidth: "334px", width: "334px" }}
              value={quantity}
            />
            <button
              id="plus-button"
              type="button"
              onClick={() => setQuantity((prev) => prev + 1)}
            >
              <svg
                id="plus-icon"
                width={41}
                height={41}
                viewBox="0 0 41 41"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.0839844"
                  y="0.640625"
                  width={40}
                  height={40}
                  rx={6}
                  fill="#323232"
                />
                <path
                  d="M19.024 27.6406V23.4006H15.164V21.6806H19.024V17.4206H20.724V21.6806H24.604V23.4006H20.724V27.6406H19.024Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
        </div>
        {itemsCount > 0 && <ItemInBag itemsCount={itemsCount} />}

        {itemsCount === 0 ? (
          children
        ) : (
          <div className="mt-4">
            <AddMoreButton
              {...{ itemsCount, favorited, addtowishlist, product }}
            />
          </div>
        )}
      </form>
      {favorited && (
        <div className="mt-4">
          <ViewWishlist />
        </div>
      )}
    </>
  );
};

export default ProductDetail;