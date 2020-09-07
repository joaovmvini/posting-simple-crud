(function handleData() {
  const input = document.getElementById("btnInput");

  input.addEventListener("click", function sendData(e) {
    e.preventDefault();

    const inputs = Array.from(document.getElementsByTagName("input"));
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
        }
      });
  });
})();
