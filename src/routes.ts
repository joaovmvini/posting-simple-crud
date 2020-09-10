import e = require("express");
import { UserController } from "./controllers/UserController";
import { PostController } from "./controllers/PostController";

const userController = new UserController();
const postController = new PostController();

const routes = e.Router();

routes.post("/user", userController.insertUser);
routes.post("/login", userController.login);
routes.post("/posts", postController.insertPost);
routes.post("/post/update/:id", postController.updatePost);
routes.delete("/post/delete/:id", postController.deletePost);

export default routes;
