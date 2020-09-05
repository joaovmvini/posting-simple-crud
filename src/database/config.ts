import { resolve } from "path";

const configs = {
  type: "postgres",
  host: "tuffi.db.elephantsql.com",
  port: 5432,
  username: "arwczxkj",
  password: "j3edxvlIVRAdfcE3anNy9Sujhik9yGb0",
  synchronize: true,
  logging: false,
  entities: [resolve("../entity/*.ts")],
};

export default configs;
