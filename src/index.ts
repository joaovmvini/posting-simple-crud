import { createConnection } from "typeorm";

createConnection()
  .then((connection) => {
    console.log("Connected to database...");
  })
  .catch((err) => console.log(err));

import "./server";
