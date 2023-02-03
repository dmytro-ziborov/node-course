import dgram from "dgram";
const { PORT, HOST } = require("../SERVER");
const server = dgram.createSocket("udp4");
server.on("listening", () => {
  console.log(
    `Server running on ${server.address().address}:${server.address().port}`
  );
});
server.on("message", (chunk, info) => {
  printClientInfo(info);
  console.time("session");
  const recivedData: string = chunk.toString();
  console.log("Recived data", recivedData);
  server.send(recivedData, info.port, info.address, (err) => {
    if (err) {
      console.error(`Something went wrong on sending to ${info.address}`, err);
    } else {
      console.log("Data sended");
    }
  });
  console.timeEnd("session");
});
server.on("error", (err) => {
  console.error(`Something went wrong`, err);
});

function printClientInfo(info: dgram.RemoteInfo) {
  console.log({
    ip: info.address,
    port: info.port,
    start_time: new Date(),
  });
}

server.bind(PORT, HOST);
