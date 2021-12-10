import { nanoid } from "nanoid";

export default async (req, res) => {
  if (req.method !== "POST") {
    res.status(400).json({ message: "POST method only" });
  }

  const payload = req.body;

  const { data, id } = JSON.parse(payload);

  // payload["secret"] = "6LeOpc8ZAAAAAFFTAyXm_xSXzJgj9H7NpKlXZUid";
  // payload["key"] = "6LeOpc8ZAAAAAJeg33xEimyvpK8Tlp5_kxjETqeS";
  // payload["token"] =
  //   "03AGdBq256iNpLCPz70Hz0RjQzD7zI6kpNQcOPZKxlQqnZdtZK0jGxGpIHKIUeVrhATslnByCoAXHOA2hvgML5AE3fHGlHCnqFGfou6UbRcL0FDDB2IxwgjpfmoLnsx9XTtroq3TcH10QZFP4zAqUnsqLz9YcydFA_ygkloYzSXweNX6oAxaxyeHQj4w_TDPs5pTQH2d1FaIXaTwz_aiTuXYTeiIjfoQWGVCf-dpXYbhdwnbQCS-6lxoF5nwamyEvfs_3zly5bU7qMnD_qyrNRDae4uUaQ3WGyWUqiVBDhWIwVSbGG76sErD1pFtPgZ1g-jJoH6gsTkwDc-29pqxOkz4RAsGoFYprOfGiWqLwaTiSfGLps1hAXCK1CujGZjaMOqErhKXzLLpI8ukkuA-88iXJUtPfcKygnzA1s3wLt71d6DaoQr_9Vlkq_RccMTzVdMhI8QdFJqn_B";
  const payloadData = JSON.parse(data);

  payloadData["_nonce"] = nanoid(23);
  console.log(payloadData);
  // console.log(data);
  // details.push(verificationDetails);
  // console.log(details);
  // console.log(payload);
  // const getSite = await fetch(
  //   "https://ndzsixva5l.execute-api.us-west-2.amazonaws.com/pagebuilder/forms/localhost:3000/url"
  // );
  // const getSiteData = await getSite.json();

  // console.log(getSiteData);
  // const siteVerify = await fetch(
  //   `https://ndzsixva5l.execute-api.us-west-2.amazonaws.com/pagebuilder/siteVerify`,
  //   {
  //     method: "POST",
  //     data: {
  //       secret: "6LeOpc8ZAAAAAFFTAyXm_xSXzJgj9H7NpKlXZUid",
  //       token:
  //         "03AGdBq256iNpLCPz70Hz0RjQzD7zI6kpNQcOPZKxlQqnZdtZK0jGxGpIHKIUeVrhATslnByCoAXHOA2hvgML5AE3fHGlHCnqFGfou6UbRcL0FDDB2IxwgjpfmoLnsx9XTtroq3TcH10QZFP4zAqUnsqLz9YcydFA_ygkloYzSXweNX6oAxaxyeHQj4w_TDPs5pTQH2d1FaIXaTwz_aiTuXYTeiIjfoQWGVCf-dpXYbhdwnbQCS-6lxoF5nwamyEvfs_3zly5bU7qMnD_qyrNRDae4uUaQ3WGyWUqiVBDhWIwVSbGG76sErD1pFtPgZ1g-jJoH6gsTkwDc-29pqxOkz4RAsGoFYprOfGiWqLwaTiSfGLps1hAXCK1CujGZjaMOqErhKXzLLpI8ukkuA-88iXJUtPfcKygnzA1s3wLt71d6DaoQr_9Vlkq_RccMTzVdMhI8QdFJqn_B",
  //     },
  //   }
  // );
  // const siteVerifyData = await siteVerify.json();
  // console.log(siteVerifyData);

  const response = await fetch(
    `https://ndzsixva5l.execute-api.us-west-2.amazonaws.com/pagebuilder/forms/${id}/submissions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify([
        { Email: "Test" },
        { Name: "Test" },
        { _nonce: nanoid(23) },
      ]),
    }
  );
  const responseData = await response.json();
  console.log(responseData);
  res.send("OK");
};
