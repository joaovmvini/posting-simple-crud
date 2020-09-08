import { UserArea } from "./userArea.js";
import { handleUserData } from "./userDataHandler.js";
import { handleUserPost } from "./userPostHandler.js";
import { userLogin } from "./userLogin.js";

(function main() {
  const userArea = UserArea();
  handleUserData(userArea);
  userLogin(userArea);
  handleUserPost();
})();
