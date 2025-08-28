import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), "data", "db.json");
  const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const { resource } = req.query;

  if (!jsonData[resource]) {
    return res.status(404).json({ error: "Resource not found" });
  }

  if (req.method === "GET") {
    return res.status(200).json(jsonData[resource]);
  }

  return res.status(405).json({ error: "Method not allowed" });
}
