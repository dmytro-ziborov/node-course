import net from "net";
const { PORT, HOST } = require("../SERVER");

let userRequest: string = "Hello";

let client = new net.Socket();
client
  .connect({ port: PORT, host: HOST })
  .on("data", (chunk) => {
    let recivedMessage: string = chunk.toString();
    console.log({
      requested: userRequest,
      responseData: recivedMessage,
      isEqual: userRequest === recivedMessage,
    });
  })
  .on("close", () => {
    console.log("Connection closed");
  })
  .on("connect", () => {
    console.log("I'm conneted");
  })
  .on("error", (err) => {
    console.error("Something went wrong", err);
  });

client.write("tcp-server-end");
client.end();
