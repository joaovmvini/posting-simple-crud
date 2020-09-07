import { UserController } from "./controllers/UserController";

const express = require("express");
const bodyParser = require("body-parser");

const userController = new UserController();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(require("path").resolve("public")));

app.post("/user", userController.insertUser);

app.listen(3000, () => console.log("listening port 3000..."));
