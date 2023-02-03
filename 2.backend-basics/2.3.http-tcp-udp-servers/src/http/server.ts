import { Socket } from "dgram";
import http, { IncomingMessage, ServerResponse } from "http";
const { PORT, HOST } = require("../SERVER");

http
  .createServer((req: IncomingMessage, res: ServerResponse) => {
    let rawData: any;

    req.on("data", (chunk) => {
      rawData = chunk.toString();
      console.log("data", rawData);
    });

    req.on("end", () => {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.write(rawData);
      res.end();
      console.log("Session ended", { end_time: new Date() });
    });
  })
  .on("connection", (socket: Socket) =>
    console.log(`Session started`, {
      client_ip: socket.remoteAddress,
      start_time: new Date(),
    })
  )
  .listen(PORT, HOST, () => {
    console.log(`Server running at ${HOST}:${PORT}`);
  });
