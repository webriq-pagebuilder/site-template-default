import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { colors } = req.body;

    if (!colors) {
      return res.status(400).json({ error: "No colors provided" });
    }

    const filePath = path.join(process.cwd(), "tailwind.config.ts");
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        return res.status(500).json({ error: "Failed to read file" });
      }

      const updatedConfig = data.replace(
        /colors: {[^}]*}/,
        `colors: ${JSON.stringify(colors, null, 2)}`
      );

      fs.writeFile(filePath, updatedConfig, (err) => {
        if (err) {
          return res.status(500).json({ error: "Failed to write to file" });
        }

        res.status(200).json({ message: "Colors updated successfully" });
      });
    });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
