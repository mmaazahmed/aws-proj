import express, { Request, Response } from "express";
import serverless from 'serverless-http';
import router from "./router";

const app=express();
app.use(express.json());

app.use(express.json());
app.use('/api',router);

module.exports.handler = serverless(app);
export default app;

