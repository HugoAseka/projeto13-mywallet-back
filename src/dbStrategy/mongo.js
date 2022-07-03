import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

let db = null;
const mongoClient = new MongoClient(process.env.MONGO_URI);
const promise = mongoClient.connect();
promise.then(() => {
  db = mongoClient.db(process.env.DATABASE);
  console.log("Successfully connected to database");
});
promise.catch((err) => {
  console.log("There was an error connecting to database", err);
});

const objectId = ObjectId;

export { db, objectId };
