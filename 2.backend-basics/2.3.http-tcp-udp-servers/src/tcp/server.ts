import net from "net";

const HOST = "localhost";
const PORT = 8000;

interface TCPClient {
  client: net.Socket;
  session_id: string;
  recivedData: string[];
}
let clients: TCPClient[] = [];

net
  .createServer((socket: net.Socket) => {
    socket.on("data", (chunk) => {
      const recivedData: string = chunk.toString();
      findClient(socket)?.recivedData.push(recivedData);
      socket.write(recivedData);
      closeClient(socket);
    });
  })
  .on("connection", (socket: net.Socket) => {
    connectClient(socket);
  })
  .on("close", (socket: net.Socket) => {
    closeClient(socket);
  })
  .on("error", (err) => {
    console.error("Something went wrong", err);
  })
  .listen(PORT, HOST);

function connectClient(socket: net.Socket) {
  const tcpClient: TCPClient = {
    client: socket,
    session_id: `${clients.length + 1}`,
    recivedData: [],
  };
  clients.push(tcpClient);
  console.time(tcpClient.session_id);
  console.log(`TCP session started for client#${tcpClient.session_id}`, {
    ip: tcpClient.client.remoteAddress,
    port: tcpClient.client.remotePort,
    start_time: new Date(),
  });
}

function closeClient(socket: net.Socket) {
  const client = findClient(socket);
  if (client) {
    removeClient(client);

    console.log("Data recived from client", client.recivedData);
    console.log(`TCP session closed for ${client.session_id}`);
    console.timeEnd(client.session_id);

    socket.destroy();
  }
}

function findClient(socket: net.Socket): TCPClient | undefined {
  return clients.find((element) => element.client === socket);
}
function removeClient(client: TCPClient) {
  const index = clients.indexOf(client);
  if (index !== -1) clients.splice(index, 1);
}
