import { mainRefs } from "./refs.js";
export function userLogin(userArea) {
  document
    .getElementById("btnLogin")
    .addEventListener("click", function login() {
      const inputData = {
        email: document.getElementById("email-login").value,
        password: document.getElementById("password-login").value,
      };

      fetch("login", {
        method: "POST",
        body: JSON.stringify(inputData),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((finalRes) => {
          if (!finalRes.status) {
            alert("Successful logged");
            mainRefs.setUser(finalRes);
            userArea.changeUserVisibility();
          } else {
            alert("Something went wrong... please try again");
          }
        });
    });
}
