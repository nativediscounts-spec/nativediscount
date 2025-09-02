import { MongoClient } from "mongodb";

const uri = process.env.PROD_DB_STRING || "mongodb://localhost:27017";
const options = {};

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export default clientPromise;
