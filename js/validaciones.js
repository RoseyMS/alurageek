

const boton = document.querySelector(".info__container__contact__button");
const elements = document.querySelectorAll(".info__container__contact__name, .info__container__contact__message");
const form = document.getElementById("contactform");



elements.forEach(element => {
    element.addEventListener("blur", (element) => {
        valida(element.target);
    });
});
boton.addEventListener("click", (event) => {
    event.preventDefault();
    Swal.fire({
        icon: 'success',
        title: 'Su mensaje ha sido enviado',
        showConfirmButton: false,
        timer: 1500
    })
    form.reset();
});

function valida(element) {
    const tipoDeElement = element.dataset.tipo;
    const esValido = element.validity.valid;

    if (esValido) {
        element.parentElement.classList.remove("element-container--invalid");
        element.parentElement.querySelector(".element-message-error").innerHTML = "";
    } else {
        element.parentElement.classList.add("element-container--invalid");
        element.parentElement.querySelector(".element-message-error").innerHTML = mostrarMensajeDeError(tipoDeElement, element);
    }
}



const tipoErrores = [
    "valueMissing",
    "patternMismatch",
    "typeMismatch",
];

const mensajesDeError = {
    name: {
        valueMissing: "El campo nombre no puede estar vacio",
        patternMismatch: "Debe contener máximo 40 caracteres"
    },
    message: {
        valueMissing: "El campo mensaje no puede estar vacio"
    },

}

function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = "";
    tipoErrores.forEach(error => {
       
        if (input.validity[error]) {
            console.log([tipoDeInput][error]);
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    });
    return mensaje;
}

