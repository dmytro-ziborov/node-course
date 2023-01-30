const IP_API: string = `https://api.ipify.org/?format=json`;
const NAMES_API: string = `https://random-data-api.com/api/name/random_name`;
const USER_API: string = `https://random-data-api.com/api/users/random_user`;
//1. call api using await fetch
(async () => {
  const response = await fetch(IP_API);
  const data = await response.json();
  console.log(data.ip);
})();

async function getResponse(uri: string): Promise<any> {
  const response = await fetch(uri);
  if (!response.ok) {
    throw new Error(
      "Something went wrong on : " +
        {
          uri,
          status: response.status,
          text: response.statusText,
        }
    );
  }
  return response.json();
}

//2. create function to call api from task 1.
async function getIP() {
  return await getResponse(IP_API)
    .then((data) => {
      return data.ip;
    })
    .catch((error) => console.error(error));
}
//3. create functions to get 3 random names from api

function createPromises(): Promise<any>[] {
  return [getRandomName(), getRandomName(), getRandomName()];
}

async function getRandomName(): Promise<any> {
  return await getResponse(NAMES_API);
}

function extractNames(value: { name: string }[]) {
  return value.map((element) => element.name);
}
//3.1. call api with Promise.all

async function getRandomUsernames1(): Promise<any> {
  const promiseSet: Promise<any>[] = createPromises();

  return await Promise.all(promiseSet)
    .then((values) => extractNames(values))
    .catch((error) => console.error(error));
}

//3.2. call api with async/await

async function getRandomUsernames2(): Promise<any> {
  const promiseSet: Promise<any>[] = createPromises();

  const result = await new Promise(async (resolve, reject) => {
    const names: string[] = [];
    for await (const element of promiseSet) {
      names.push(element.name);
    }
    resolve(names);
  }).catch((error) => console.log(error));

  return result;
}

//3.3. call api withou async/await/Promise,all

function getRandomUsernames3() {
  const REQUEST_NUM = 3;
  return new Promise((resolve) => {
    let names: string[] = [];
    for (let index = 0; index < REQUEST_NUM; index++) {
      fetch(NAMES_API)
        .then((res) => res.json())
        .then((data) => names.push(data.name));
    }
    resolve(names);
  });
}

//4. call api until not found user with female gender

//4.1. wihtout async/await
function getRandomFemaleName1(counter: number = 1): Promise<any> {
  return fetch(USER_API)
    .then((res) => res.json())
    .then((data) =>
      data.gender === "Female"
        ? {
            user: { username: data.username, gender: data.gender },
            counter: counter,
          }
        : getRandomFemaleName1(++counter)
    );
}

//4.2. with async/await
async function getRandomFemaleName2() {
  let counter = 1;
  let response = await getResponse(USER_API);
  while (response.gender !== "Female") {
    response = await getResponse(USER_API);
    ++counter;
  }
  return {
    user: { username: response.username, gender: response.gender },
    counter,
  };
}

//5.
async function first(callback: (ip: string) => void) {
  await fetch(IP_API)
    .then((res) => res.json())
    .then((data) => callback(data.ip));
}

async function second() {
  await first((ip) => {
    console.log("task 5", ip);
  });
}

second();

//6

async function firstGetIP(): Promise<any> {
  const response = await fetch(IP_API);
  return response.json();
}

async function secondPrintIP(callback: (ip: string) => void) {
  const ip: string = await firstGetIP().then((data) => data.ip);
  callback(ip);
}

secondPrintIP((ip) => {
  console.log("task 6", ip);
});

(async () => {
  console.log("IP promise", await getIP());
  console.log("Random names #1", await getRandomUsernames1());
  console.log("Random names #2", await getRandomUsernames2());
  console.log(
    "Random names #3",
    getRandomUsernames3().then((value) => value)
  );
  getRandomFemaleName1()
    .then((value) => console.log("Get Female user #1", value))
    .catch((err) => console.error(err));
  console.log("Get Female user #2", await getRandomFemaleName2());
})();
