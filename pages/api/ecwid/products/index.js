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
  const { id } = req.query;
  try {
    return await fetch(URL + `/${+id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_ECWID_PUBLIC_TOKEN}`,
      },
    })
      .then((res) => res.json())
      .then((json) => res.status(200).json({ result: json }));
  } catch (error) {
    return res.status(400).send(error);
  }
};

const getEcwidProductById = async (id) => {
  return fetch(`${URL}/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_ECWID_PUBLIC_TOKEN}`,
    },
  });
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
  const data = req.body;
  let product;

  try {
    // check if product exists before creating
    const createIfNotExists = await getEcwidProductByName(data?.name);

    if (!createIfNotExists) {
      // product does not exist so create
      console.log("Creating Ecwid product...");

      product = await fetch(URL, {
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

        return response.json();
      });
    } // else product exists so do nothing
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: err });
  }

  return res
    .status(200)
    .send({ message: "Successfully run API request", data: product });
};

// Update existing Ecwid product
const updateEcwidProduct = async (req, res) => {
  const data = req.body;
  const { ecwidProductId, name, price, description } = data;
  if (!ecwidProductId) {
    return res
      .status(400)
      .json({ message: "Invalid PUT request! `ecwidProductId` is missing..." });
  }

  let product;
  try {
    product = await getEcwidProductById(ecwidProductId).then((res) =>
      res.json()
    );
    console.log("[INFO] ECWID product!", product);

    if (product?.errorMessage) {
      console.log("Product not found", ecwidProductId);
      return res.status(404).json({
        message: "Unable to update product as it does not exist!",
        data: { id: ecwidProductId },
      });
      return;
    }

    const productId = product.id || ecwidProductId;
    console.log(`Updating Ecwid product: ecwidProductId - ${data?.name}...`);

    product = await fetch(`${URL}/${productId}`, {
      method: "PUT",
      headers: reqHeaders,
      body: JSON.stringify({
        name,
        price,
        description,
        enabled: true,
      }),
    }).then((res) => {
      if (!res.ok) {
        console.log(`Failed to update Ecwid product ${data?.name}`, res);
      } else {
        console.log(`Successfully updated Ecwid product ${data?.name}`);
      }

      return res.json();
    });
  } catch (error) {
    return res.status(400).send({ error: error });
  }

  return res
    .status(200)
    .send({ message: "Successfully run API request", data: product });
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
