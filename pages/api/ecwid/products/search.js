export default async (req, res) => {
  if (req.method !== "GET") {
    return res.status(400).json({ message: "GET method only" });
  }

  let URL = `https://app.ecwid.com/api/v3/${process.env.NEXT_PUBLIC_ECWID_STORE_ID}/products?productId=${req.query.productIds}`;
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_ECWID_PUBLIC_TOKEN}`,
    },
  };

  fetch(URL, options)
    .then((res) => res.json())
    .then((json) => res.status(200).json(json))
    .catch((err) => res.status(400).json({ error: err }));
};
