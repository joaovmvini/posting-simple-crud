import { mainRefs, mainClasses } from "./refs.js";
import { insertUserDetails } from "./userDataHandler.js";
import { updateFeed } from "./userPostHandler.js";
export function UserArea() {
  function changeUserVisibility() {
    mainRefs.userArea.className = mainClasses.userArea + " visible";
    mainRefs.form.className = mainRefs.form.className + " hidden";
    mainRefs.loginArea.className = mainRefs.loginArea.className + " hidden";
    insertUserDetails(mainRefs.getUser());
    updateFeed(mainRefs.getUser().posts);
  }

  return {
    changeUserVisibility,
  };
}
