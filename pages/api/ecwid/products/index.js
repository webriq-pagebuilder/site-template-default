import JWT from "jsonwebtoken";
import Cors from "cors";
import corsMiddleware from "lib/cors";

let URL = `https://app.ecwid.com/api/v3/${process.env.NEXT_PUBLIC_ECWID_STORE_ID}/products`;
const secret =
  process.env.ECWID_STORE_SECRET_TOKEN ||
  "secret_gZLupqWKySbqu2GUfuNePrMLuNvCTyun";
const reqHeaders = {
  Accept: "application/json",
  Authorization: `Bearer ${secret}`, // to be replaced with the decrypted token
  "Content-Type": "application/json",
};

// Initialize the cors middleware
const cors = corsMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ["GET", "POST", "PUT", "OPTIONS"],
  })
);

async function handler(req, res) {
  // Run cors
  await cors(req, res);

  // process based on request method
  if (req.method === "POST") {
    return addEcwidProduct(req, res);
  } else if (req.method === "PUT") {
    return updateEcwidProduct(req, res);
  } else if (req.method === "DELETE") {
    return deleteEcwidProduct(req, res);
  } else if (req.method === "GET") {
    return getEcwidProducts(req, res);
  } else {
    return res.status(400).send("Invalid request!");
  }
}

// Get Ecwid products from store
const getEcwidProducts = async (req, res) => {
  try {
    return await fetch(URL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_ECWID_PUBLIC_TOKEN}`,
      },
    })
      .then((res) => res.json())
      .then((res) => res);
  } catch (error) {
    return res.status(400).send(error);
  }
};

// Get an Ecwid product by name
const getEcwidProductByName = async (req, res) => {
  const productName = req;

  try {
    return await getEcwidProducts().then((result) => {
      result?.items?.find((product) => product?.name === productName);
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

// Add a new Ecwid product
const addEcwidProduct = async (req, res) => {
  const data = JSON.parse(req.body);

  try {
    // check if product exists before creating
    const createIfNotExists = await getEcwidProductByName(data?.name);

    if (!createIfNotExists) {
      // product does not exist so create
      console.log("Creating Ecwid product...");

      await fetch(URL, {
        method: "POST",
        headers: reqHeaders,
        body: JSON.stringify({
          name: data?.name,
          price: data?.price,
          description: data?.description,
          enabled: true,
        }),
      }).then((response) => {
        if (!response.ok) {
          console.log("Failed to create Ecwid product!", response);
        } else {
          console.log("Successfully created Ecwid product!");
        }
      });
    } else {
      // product already exists so we just update the fields
      console.log(`Updating Ecwid product ${data?.name}...`);

      const productId = createIfNotExists?.[0]?.id;

      if (productId) {
        await updateEcwidProduct(
          productId,
          data?.name,
          data?.price,
          data?.description
        ).then((res) => {
          if (!res.ok) {
            console.log("Failed to update Ecwid product");
          } else {
            console.log("Successfully updated Ecwid product details!");
          }
        });
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: err });
  }

  return res.status(200).send({ message: "Successfully run API request" });
};

// Update existing Ecwid product
const updateEcwidProduct = async (req, res) => {
  const product = req;

  console.log(`Updating Ecwid product...`);

  try {
    await fetch(`${URL}/${product?.productId}`, {
      method: "PUT",
      headers: reqHeaders,
      body: JSON.stringify({
        name: product?.name,
        price: product?.price,
        description: product?.description,
        enabled: true,
      }),
    });
  } catch (error) {
    return res.status(400).send({ error: error });
  }

  return res.status(200).send({ message: "Successfully run API request" });
};

// Delete an Ecwid product
const deleteEcwidProduct = async (req, res) => {
  const { productId } = req.body;

  try {
    await fetch(`${URL}/${productId}`, {
      method: req.method,
      headers: reqHeaders,
    });
  } catch (error) {
    res.status(400).send({ error: error });
  }
};

export default handler;
