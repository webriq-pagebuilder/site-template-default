import JWT from "jsonwebtoken";
import NextCors from "nextjs-cors";

let URL = `https://app.ecwid.com/api/v3/${process.env.NEXT_PUBLIC_ECWID_STORE_ID}/products`;
const reqHeaders = {
  Accept: "application/json",
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_ECWID_SECRET_TOKEN}`, // to be replaced with the decrypted token
  "Content-Type": "application/json",
};

async function handler(req, res) {
  // run the cors middleware
  // nextjs-cors uses the cors package: https://github.com/expressjs/cors
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  // rest of the API logic

  // TO DO: Add JWT verify secret token

  // process based on request method
  if (req.method === "GET") {
    return getEcwidProducts(req, res);
  } else if (req.method === "POST") {
    return addEcwidProduct(req, res);
  } else if (req.method === "PUT") {
    return updateEcwidProduct(req, res);
  } else if (req.method === "DELETE") {
    return deleteEcwidProduct(req, res);
  } else {
    return res.status(400).json({ message: "Invalid request!" });
  }
}

// Get Ecwid products from store
const getEcwidProducts = async (req, res) => {
  try {
    await fetch(URL, {
      method: req.method,
      headers: reqHeaders,
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

  // check if product exists before creating
  const createIfNotExists = await getEcwidProductByName(name);

  if (!createIfNotExists) {
    // product does not exist so create
    console.log("Creating Ecwid product...");

    try {
      await fetch(URL, {
        method: req.method,
        headers: reqHeaders,
        body: JSON.stringify({
          name: name,
          price: price,
          description: description,
          enabled: true,
        }),
      });
    } catch (err) {
      return res.send(400).json({ error: err });
    }

    return res
      .send(200)
      .json({ message: "Successfully CREATED Ecwid product!" });
  } else {
    // product already exists so we just update the fields
    console.log(`Updating Ecwid product ${name}...`);

    const productId = createIfNotExists?.[0]?.id;

    if (productId) {
      try {
        await updateEcwidProduct(productId, name, price, description);
      } catch (error) {
        console.log(error);
        return res
          .send(400)
          .json({ message: "Failed to update Ecwid product details!" });
      }

      return res
        .send(200)
        .json({ message: "Successfully updated Ecwid product details!" });
    }
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
