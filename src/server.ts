import { UserController } from "./controllers/UserController";
import { PostController } from "./controllers/PostController";

const express = require("express");
const bodyParser = require("body-parser");

const userController = new UserController();
const postController = new PostController();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(require("path").resolve("public")));

app.post("/user", userController.insertUser);
app.post("/login", userController.login);
app.post("/posts", postController.insertPost);
app.post("/post/:id/update", postController.updatePost);

app.listen(3000, () => console.log("listening port 3000..."));
