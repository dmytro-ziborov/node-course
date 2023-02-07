import express, { Express, Request, Response } from "express";
import logger from "./middleware/logger";

const app: Express = express();

//todo add routes
//simple console logger
app.use(logger);

//todo add ...

export default app;
