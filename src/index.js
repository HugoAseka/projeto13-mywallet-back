import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { json } from 'express';
import userRoutes from './router/userRoutes.js'
import balanceRoutes from './router/balanceRouter.js';


const app = express();
app.use(json());
app.use(cors());
dotenv.config();

app.use(userRoutes);
app.use(balanceRoutes);

app.listen(parseInt(process.env.PORT), () => {
    console.log(`Server on port ${process.env.PORT}`)
});