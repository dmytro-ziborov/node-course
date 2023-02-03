import http from "http";
const { PORT, HOST } = require("../SERVER");

const data =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ultricies, ex eu vehicula aliquam, nisl.";

const options = {
  host: HOST,
  port: PORT,
  method: "POST",
  headers: {
    "Content-Type": "text/plain",
    "Content-Length": data.length,
  },
};

console.time("request");

const request = http.request(options, (res) => {
  res.setEncoding("utf-8");

  let resonseData: string = "";
  res.on("data", (chunk) => {
    resonseData = chunk.toString();
  });

  res.on("end", () => {
    console.log({
      sourceData: data,
      response: resonseData,
      isSame: data === resonseData ? true : false,
    });
    console.log("Time elapsed :");

    console.timeEnd("request");
  });

  res.on("error", (error) => {
    console.error("Something went wrong");
  });
});

request.write(data);
request.end();
