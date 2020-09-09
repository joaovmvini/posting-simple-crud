import { UserArea } from "./userArea.js";
import { handleUserData } from "./userDataHandler.js";
import { postHandler } from "./userPostHandler.js";
import { userLogin } from "./userLogin.js";

(function main() {
  const userArea = UserArea();
  handleUserData(userArea);
  userLogin(userArea);
  postHandler();
})();
