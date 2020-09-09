import { mainRefs } from "./refs.js";

export function insertUserDetails(user) {
  const { email, name, age } = user;
  mainRefs.nameField().textContent = `${name}, ${age}`;
  mainRefs.emailField().textContent = email;
}

export function handleUserData(userArea) {
  const input = document.getElementById("btnInput");

  input.addEventListener("click", function sendData(e) {
    e.preventDefault();

    const inputs = Array.from(document.querySelectorAll("form input"));
    const userData = {};

    inputs.forEach((input) => {
      if (input.type !== "button") userData[input.id] = input.value;
    });

    fetch("user", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((finalResponse) => {
        if (finalResponse.status == 404) {
          alert("User already exists in the database");
        } else {
          alert("User succesfully registered in the database");
          const storabledUser = {
            email: finalResponse.email,
            name: finalResponse.name,
            id: finalResponse.id,
          };
          mainRefs.setUser(storabledUser);
          userArea.changeUserVisibility();
          insertUserDetails(finalResponse);
        }
      });
  });
}
