import { nanoid } from "nanoid";
const { NEXT_PUBLIC_SITE_URL } = process.env;

export default async (req, res) => {
  if (req.method !== "POST") {
    res.status(400).json({ message: "POST method only" });
  }

  const payload = req.body;

  const { data, id } = JSON.parse(payload);
  data["_nonce"] = nanoid(23);
  data["Card"] = "************************";

  const response = await fetch(
    `https://ndzsixva5l.execute-api.us-west-2.amazonaws.com/pagebuilder/forms/${id}/submissions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        referer: NEXT_PUBLIC_SITE_URL,
      },

      body: JSON.stringify(data),
    }
  );
  const responseData = await response.json();
  if (responseData.id) {
    res.json({ message: "OK" });
  } else {
    res.json({ message: "Error" });
  }
};
