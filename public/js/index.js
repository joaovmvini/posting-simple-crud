import { UserArea } from "./userArea.js";
import { handleUserData } from "./userDataHandler.js";
import { postHandler } from "./userPostHandler.js";
import { userLogin } from "./userLogin.js";
import { Validator } from "./validators.js";

(function main() {
  const userArea = UserArea();
  const validator = new Validator();

  validator.validate("password", "username", "age", "email");
  handleUserData(userArea);
  userLogin(userArea);
  postHandler();
})();
