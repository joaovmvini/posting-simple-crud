export const mainClasses = {
  userArea: "show-data",
  editArea: "overlay-input",
};
export const mainRefs = {
  editArea: document.querySelector(".overlay-input"),
  form: document.getElementsByTagName("form")[0],
  userArea: document.getElementsByClassName(mainClasses.userArea)[0],
  loginArea: document.getElementsByClassName("login")[0],
  nameField: () =>
    document.querySelector(
      "body > div.show-data.visible > div.user-details-box > div.user-details > span:nth-child(1)"
    ),
  emailField: () =>
    document.querySelector(
      "body > div.show-data.visible > div.user-details-box > div.user-details > span:nth-child(2)"
    ),
  setUser(user) {
    this.user = user;
  },
  getUser() {
    return this.user;
  },
};
