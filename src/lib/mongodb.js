import { MongoClient } from "mongodb";

const uri = process.env.PROD_DB_STRING || "mongodb://127.0.0.1:27017";

if (!uri) {
  throw new Error("❌ PROD_DB_STRING not defined");
}

const options = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 20000,
  connectTimeoutMS: 10000,
};

let client;
let clientPromise;

// Global cache (VERY IMPORTANT for Next.js)
if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);

  global._mongoClientPromise = client
    .connect()
    .then((client) => {
      console.log("✅ MongoDB connected");
      return client;
    })
    .catch((err) => {
      console.error("❌ MongoDB connection failed:", err);
      global._mongoClientPromise = undefined; // prevent poison cache
      throw err;
    });
}

clientPromise = global._mongoClientPromise;

export default clientPromise;
