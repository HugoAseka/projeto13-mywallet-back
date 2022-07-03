import express from "express";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import cors from "cors";
import joi from "joi";
import { registerUser, loginUser } from "./controllers/authController.js";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

app.post("/login", loginUser);
app.post("/signup", registerUser);

app.listen(parseInt(process.env.PORT), () => {
  console.log(`Server on port ${process.env.PORT}`);
});
