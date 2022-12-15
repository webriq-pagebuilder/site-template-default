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

  try {
    await fetch(URL, options).then((res) => {
      if (!res.ok) {
        console.log("Failed to fetch Ecwid product!");
      }
      return res.json();
    });
  } catch (err) {
    return res.status(400).send(err);
  }

  return res.status(200).send({ message: "Successfully run API request" });
};
