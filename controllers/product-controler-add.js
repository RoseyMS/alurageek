import { productServices } from "../service/product-service.js";
const form = document.querySelector("[data-form]");

form.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const image = document.querySelector("[data-image]");
    if (!image.files || !image.files[0]) {
        return;
    }

    const fileReader = new FileReader();
   
    
    fileReader.addEventListener("load", (event) => {
        const imageData = event.target.result;
        const category = document.querySelector("[data-category]").value;
        const name = document.querySelector("[data-name]").value;
        const price = document.querySelector("[data-price]").value;
        const description = document.querySelector("[data-description]").value;
        productServices.addProduct(imageData, category, name, price, description).then(() => {
            Swal.fire('Producto agregado exitosamente')

        }).catch(err => console.log(err));
    });
    fileReader.readAsDataURL(image.files[0]);


});
