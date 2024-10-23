import axios from "axios";
import { SANITY_PROJECT_DATASET, SANITY_PROJECT_ID } from "studio/config";

export default async function handler(req, res) {
  await axios
    .post(
      `https://${SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${SANITY_PROJECT_DATASET}/`,
      {
        mutations: [
          {
            createIfNotExists: {
              _id: "test",
              _type: "test",
              title: "test",
              body: "test",
            },
          },
          {
            patch: {
              id: "test",
              set: {
                body: "test",
              },
              setIfMissing: {
                accounts: [],
              },
              insert: {
                after: "accounts[-1]",
                items: [
                  {
                    _type: "account",
                    name: "test",
                    email: "test@webriq.com",
                  },
                ],
              },
            },
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.SANITY_API_TOKEN}`,
        },
      }
    )
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err.response.data));

  return res.status(200).json({ message: "ok" });
}
