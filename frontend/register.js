const nameField = document.getElementById("reg-username");

const passwordField = document.getElementById("reg-password");

document
  .getElementById("register-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = nameField.value;
    const password = passwordField.value;

    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    });

    const result = await response.json();
    alert(result.message);
    console.log(username);
    console.log(password);
  });
