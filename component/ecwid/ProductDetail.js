import { useEcwid } from "context/EcwidContext";
import React, { useEffect, useMemo, useState } from "react";
import AddMoreButton from "./AddMoreButton";

const ProductDetail = ({ product, children }) => {
  if (!product?.id) return null;

  const ecwid = useEcwid();
  const addToBag = ecwid?.addToBag;
  const options = ecwid?.options;
  const setOptions = ecwid?.setOptions;
  const setPrice = ecwid?.setPrice;
  const cart = ecwid?.cart;

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product?.id) {
      let data = {};

      product.options.forEach((option) => {
        if (option?.choices && typeof option?.defaultChoice !== "undefined") {
          data[option?.name] = option?.choices[option?.defaultChoice]?.text;
        }
      });

      setOptions(data);
      setPrice(product?.defaultDisplayedPrice);
    }
  }, [product]);

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
  }, [options]);

  const itemsCount = useMemo(() => {
    let count = 0;
    if (cart?.items?.length) {
      const item = cart?.items?.filter((el) => el.product.id === product.id);
      if (item?.length) {
        item?.forEach((element) => {
          count += element.quantity;
        });
      }
    }
    return count;
  }, [cart?.items]);

  const handleChanged = (option, choice, event) => {
    if (option?.type === "TEXTFIELD" || option?.type === "SELECT") {
      setOptions((prev) => ({ ...prev, [option?.name]: event?.target?.value }));
    } else if (option?.type === "RADIO" || option?.type === "SIZE") {
      setOptions((prev) => ({ ...prev, [option?.name]: choice.text }));
    } else if (option?.type === "CHECKBOX") {
      if (event?.target?.checked) {
        setOptions((prev) => ({
          ...prev,
          [option?.name]:
            prev[option?.name] && prev[option?.name]?.length
              ? [...prev[option?.name], choice?.text]
              : [choice?.text],
        }));
      } else {
        setOptions((prev) => ({
          ...prev,
          [option?.name]: prev[option?.name]?.filter(
            (el) => el !== choice?.text
          ),
        }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addToBag({ id: product?.id, quantity }, options);
  };

  return (
    <form onSubmit={handleSubmit}>
      {product?.options?.map((option, index) => {
        const value = options[option?.name] || "";

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
                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-3 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
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
          className="font-medium text-gray-900 mb-2 uppercase"
        >
          Qty
        </label>
        <div className="flex flex-row border border-gray-400 hover:border-gray-500 shadow rounded w-min">
          <button
            className="py-2 px-4 text-gray-400 text-xl"
            type="button"
            onClick={() => setQuantity((prev) => prev - 1)}
            disabled={quantity === 1 ? true : false}
          >
            -
          </button>
          <input
            type="text"
            name="quantity"
            id="quantity"
            className="block w-12 text-center bg-white focus:outline-none focus:shadow-outline"
            required
            value={quantity}
          />
          <button
            className="py-2 px-4 text-gray-400 text-xl"
            type="button"
            onClick={() => setQuantity((prev) => prev + 1)}
          >
            +
          </button>
        </div>
      </div>

      {itemsCount === 0 ? (
        children
      ) : (
        <div className="my-8">
          <AddMoreButton itemsCount={itemsCount} />
        </div>
      )}
    </form>
  );
};

export default ProductDetail;
