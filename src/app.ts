import express, { Request, Response } from "express";
import { router } from "./app/routes";
import cors from 'cors';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import cookieParser from "cookie-parser";
import { notFound } from "./app/middlewares/notFound";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use('/api/v1', router);

app.use(globalErrorHandler);

app.use(notFound)
export default app;
