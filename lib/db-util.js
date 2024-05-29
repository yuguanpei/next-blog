import { MongoClient } from "mongodb";

const connectionString = `mongodb+srv://${process.env.mogodb_username}:${process.env.mogodb_password}@${process.env.mogodb_cluster}.gyo3jpk.mongodb.net/${process.env.mogodb_database}?retryWrites=true&w=majority&appName=Cluster0`;

export async function connectDatabase() {
  const client = await MongoClient.connect(connectionString);
  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();
  const result = await db.collection(collection).insertOne(document);
  return result;
}

export async function getAllDocuments(client, collection, sort) {
  const db = client.db();
  const result = await db.collection(collection).find().sort(sort).toArray();
  return result;
}
