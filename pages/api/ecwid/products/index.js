import JWT from "jsonwebtoken";
import Cors from "cors";
import corsMiddleware from "lib/cors";

let URL = `https://app.ecwid.com/api/v3/${process.env.NEXT_PUBLIC_ECWID_STORE_ID}/products`;
const reqHeaders = {
  Accept: "application/json",
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_ECWID_SECRET_TOKEN}`, // to be replaced with the decrypted token
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
    await fetch(URL, {
      method: req.method,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_ECWID_PUBLIC_TOKEN}`,
      },
    })
      .then((res) => res.json())
      .then((json) => res.status(200).json({ result: json }));
  } catch (error) {
    res.status(400).json({ error: err });
  }
};

// Get an Ecwid product by name
const getEcwidProductByName = async (req, res) => {
  const { productName } = req.body;

  try {
    await getEcwidProducts().then((result) => {
      result?.items?.find((product) => product?.name === productName);
    });
  } catch (error) {
    return res.send(400).json({ error: error });
  }

  res.send(200).json({ message: "Successfully fetched Ecwid product!" });
};

// Add a new Ecwid product
const addEcwidProduct = async (req, res) => {
  const { name, price, description } = req.body;

  try {
    const token = req.header.Authorization;
    const decode = JWT.verify(token, process.env.SITE_STORE_PREVIEW_SECRET);

    // check if product exists before creating
    const createIfNotExists = await getEcwidProductByName(name);

    if (!createIfNotExists) {
      // product does not exist so create
      console.log("Creating Ecwid product...");

      await fetch(URL, {
        method: req.method,
        headers: reqHeaders,
        body: JSON.stringify({
          name: name,
          price: price,
          description: description,
          enabled: true,
        }),
      }).then((response) => {
        if (!response.ok) {
          console.log("Failed to create Ecwid product!");
        }
        console.log("Successfully created Ecwid product!");
      });
    } else {
      // product already exists so we just update the fields
      console.log(`Updating Ecwid product ${name}...`);

      const productId = createIfNotExists?.[0]?.id;

      if (productId) {
        await updateEcwidProduct(productId, name, price, description).then(
          (response) => {
            if (!response.ok) {
              console.log("Failed to update Ecwid product details!");
            }
            console.log("Successfully updated Ecwid product details!");
          }
        );
      }
    }
  } catch (err) {
    res.status(401).json({ message: "JWT ERROR: Unauthorized request" });
  }
};

// Update existing Ecwid product
const updateEcwidProduct = async (req, res) => {
  const { productId, name, price, description } = req.body;

  console.log(`Updating Ecwid product ${name}...`);

  try {
    await fetch(`${URL}/${productId}`, {
      method: req.method,
      headers: reqHeaders,
      body: JSON.stringify({
        name: name,
        price: price,
        description: description,
        enabled: true,
      }),
    });
  } catch (error) {
    return res.send(400).json({ error: error });
  }

  return res
    .send(200)
    .json({ message: "Successfully updated Ecwid product details!" });
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
    res.send(400).json({ error: error });
  }
};

export default handler;
