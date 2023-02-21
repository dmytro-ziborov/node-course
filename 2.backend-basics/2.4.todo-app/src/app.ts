import express, { Express, Request, Response } from "express";
import logger from "./middleware/logger";
import path from "path";
import { MainRouter } from "./routes/index.routes";
import bodyParser, { text } from "body-parser";
import cookieParser from "cookie-parser";
import { corsOptions, sessionOptions } from "./utils/config";
import session from "express-session";
import db from "./database/db";
import cors from 'cors';

const app: Express = express();

app.use(cors(corsOptions))
app.use(bodyParser.json());
app.use(cookieParser());

app.use(session(sessionOptions));

app.use(logger);
app.use("/api", MainRouter);

db.connect();

app.use(express.static(path.join(__dirname, "public")));

export default app;
