import { nanoid } from "nanoid";

export default async (req, res) => {
  if (req.method !== "POST") {
    res.status(400).json({ message: "POST method only" });
  }

  const REFERER_URL = req.headers.referer || process.env.NEXT_PUBLIC_SITE_URL;
  const payload = req.body;

  const data = payload.data || {};
  const id = payload.id;

  data["_nonce"] = nanoid(23);

  try {
    await fetch(
      process.env.WEBRIQ_FORMS_API_URL ||
        `https://ndzsixva5l.execute-api.us-west-2.amazonaws.com/pagebuilder/forms/${id}/submissions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          referer: REFERER_URL,
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => response.json())
      .then((response) => {
        console.log("OK! Form submitted successfully!");

        res.status(200).send(response);
      });
  } catch (error) {
    console.log("Error submitting form!", error);
    res.status(400).json({ message: "Error submitting form!" });
  }
};
