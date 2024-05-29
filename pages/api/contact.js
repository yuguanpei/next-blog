import { connectDatabase, insertDocument } from "../../lib/db-util";
export default async function handler(req, res) {
  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: error.message });
    return;
  }
  if (req.method === "POST") {
    const { email, name, message } = req.body;
    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      return;
    }
    const newMessage = {
      email,
      name,
      message,
    };

    try {
      const result = await insertDocument(client, "messages", newMessage);
      newMessage.id = result.insertedId;
      res.status(201).json({ message: newMessage });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  client.close();
}
