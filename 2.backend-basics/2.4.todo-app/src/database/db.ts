import mongoose from "mongoose";
import { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME } from "../utils/config";

const uri = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}.mongodb.net/?retryWrites=true&w=majority`;

export default {
  connect: () => {
    mongoose
      .connect(uri, { dbName: DB_NAME })
      .then(() => {
        console.log("MongoDB connected");
      })
      .catch((err) => {
        console.log("MongoDB connection error", err);
        process.exit(-1);
      });
  },
};
