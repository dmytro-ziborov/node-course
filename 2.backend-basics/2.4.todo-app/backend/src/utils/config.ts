import { CorsOptions } from "cors";
import dotenv from "dotenv";
import session from "express-session";
import fileStore, { FileStore } from "session-file-store";

dotenv.config();

export const APP_PORT = process.env.APP_PORT || 3000;

export const DB_NAME = process.env.DB_NAME || "";
export const DB_USERNAME = process.env.DB_USERNAME || "";
export const DB_PASSWORD = process.env.DB_PASSWORD || "";
export const DB_HOST = process.env.DB_HOST || "";

declare module "express-session" {
  interface SessionData {
    username: string;
  }
}

const FileStore = fileStore(session);

export const sessionOptions: session.SessionOptions = {
  secret: process.env.SESSION_SECRET || "secret",
  resave: false,
  saveUninitialized: true,
  store: new FileStore({}),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
  },
};

export const corsOptions: CorsOptions = {
  origin:true,
  credentials:true
}
