import { createConnection, ConnectionOptions } from "typeorm";
import connectionConfig from "./database/config";

(async function main() {
  const connection = await createConnection(
    <ConnectionOptions>connectionConfig
  );
  console.log("successfully connected to the database");
})();
