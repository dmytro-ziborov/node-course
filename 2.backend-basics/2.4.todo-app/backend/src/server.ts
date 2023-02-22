import app from "./app";
import { APP_PORT } from "./utils/config";

app
  .listen(APP_PORT, () => {
    console.log(`Server running on ${APP_PORT}`);
  })
  .on("error", (err: Error) => {
    console.error("Something went wrong", err);
  });
