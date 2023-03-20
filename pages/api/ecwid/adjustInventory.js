import {
  baseUrl,
  secret,
  storeId,
  requestHeaders,
} from "utils/ecwid/config";
import fetch from "node-fetch";

export default async (req, res) => {
  console.log("[INFO]: Adjust inventory API action: ", req.body);

  const { productId, action, quantity } = req.body;

  if (req.method !== "PUT") {
    return res.status(400).json({ message: "PUT method only" });
  }

  if (!req.headers.authorization || req.headers.authorization !== secret) {
    return res.status(403).json({ message: "Unauthorized API Access!" });
  }

  let URL = `${baseUrl}/${storeId}/products/${+productId}/inventory`;

  const setQuantity =
    action === "add" ? +quantity : action === "deduct" ? -quantity : +0;

  console.log("[INFO] Adjust quantity: ", setQuantity);

  try {
    return await fetch(URL, {
      method: req.method,
      headers: requestHeaders,
      body: JSON.stringify({
        // if action is "add", then add quantity to product inventory
        // else if action is "deduct" or not "add", then deduct quantity to product inventory
        quantityDelta: setQuantity,
      }),
    })
      .then((response) => response.json())
      .then((response) => res.status(200).json(response));
  } catch (error) {
    console.log("Failed to update product inventory. ", error);
    return res.status(400).send(error);
  }
};