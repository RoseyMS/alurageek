import { userLoggedIn, userLogout } from "./session-controller.js";

const loginContainer = document.querySelector("[data-headerlogin]");

const headerAdminContent = `<button id="login_btn"><a href="">Salir</a></button>`;
const headerClientContent = `<button id="login_btn"><a href="../screens/login.html">Login</a></button>`;

if (userLoggedIn()) {
    loginContainer.innerHTML = headerAdminContent;
    document.getElementById("login_btn").addEventListener("click", userLogout);
} else {
    loginContainer.innerHTML = headerClientContent;
}
