import { clientServices } from "../service/client-service.js";

const form = document.querySelector("[data-login]");

form.addEventListener("submit", (evento) => {
    evento.preventDefault();


    const inputEmail = document.querySelector("[data-email]").value;
    const inputPassword = document.querySelector("[data-password]").value;
    clientServices.clientsList().then((data) => {
        let userFound = false
        data.forEach(({ email, password, id }) => {
            if (email == inputEmail && password == inputPassword) {
                userFound = true;
                return;
            }
        });
        if(userFound){
            console.log("User found");
        }else{
            console.log("Me lleva");
        }
    }).catch((error) => console.error("Ocurrio un error", error));
    form.reset();


});