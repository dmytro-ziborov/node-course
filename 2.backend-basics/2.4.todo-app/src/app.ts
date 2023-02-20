import express, { Express, Request, Response } from "express";
import logger from "./middleware/logger";
import path from "path";
import { MainRouter } from "./routes/index.routes";
import bodyParser, { text } from "body-parser";
import cookieParser from "cookie-parser";
import { sessionOptions } from "./utils/config";
import session from "express-session";
import db from "./database/db";

const app: Express = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());
app.use(cookieParser());

app.use(session(sessionOptions));

app.use(logger);
app.use("/api", MainRouter);

db.connect();

export default app;
