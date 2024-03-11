import express, { Request, Response } from "express";
import serverless from 'serverless-http';
// import router from "./router";
// const serverless = require('serverless-http');

const app=express();
app.use(express.json());
app.use('/api',(req:Request, res:Response) =>{
    res.send('Hello World!')
  });

app.use(express.json());
// app.use('/api',router);

export default app;
module.exports.handler = serverless(app);

