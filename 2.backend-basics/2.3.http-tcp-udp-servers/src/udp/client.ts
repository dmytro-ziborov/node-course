import udp from "dgram";
const { PORT, HOST } = require("../SERVER");

const userRequest: string = "Hello";
const client = udp.createSocket("udp4");
client.on("message", (chunk, info) => {
  let recivedMessage: string = chunk.toString();
  console.log("Response from server", info);
  console.log({
    requested: userRequest,
    responseData: recivedMessage,
    isEqual: userRequest === recivedMessage,
  });
  client.close();
});

client.on("error", (err) => {
  console.error("Something went wrong", err);
});

client.send(userRequest, PORT, HOST);
