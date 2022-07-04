import express from "express";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import cors from "cors";
import joi from "joi";
import authRouter from './routes/authRouter';


const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

app.use(authRouter);

app.listen(parseInt(process.env.PORT), () => {
  console.log(`Server on port ${process.env.PORT}`);
});
