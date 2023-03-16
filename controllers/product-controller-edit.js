import { productServices } from "../service/product-service.js";

const formulario = document.querySelector("[data-form]");

const getInformation = async () => {
    const url = new URL(window.location);
    const id = url.searchParams.get("id");

    if (id == null) {
        window.location.href = "/screens/error.html";
    }

    const image = document.querySelector("[data-image]");
    const category = document.querySelector("[data-category]");
    const name = document.querySelector("[data-name]");
    const price = document.querySelector("[data-price]");
    const description = document.querySelector("[data-description]");
    try {
        const product = await productServices.productDetails(id);
        if (product.image && product.category
            && product.name && product.price
            && product.description) {
            image.value = product.image;
            category.value = product.category;
            name.value = product.name;
            price.value = product.price;
            description.value = product.description;
        } else {
            throw new Error();
        }

    } catch (error) {
        window.location.href = "/screens/error.html";

    }

}

getInformation();

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const url = new URL(window.location);
    const id = url.searchParams.get("id");
    const image = document.querySelector("[data-image]").value;
    const category = document.querySelector("[data-category]").value;
    const productName = document.querySelector("[data-name]").value;
    const price = document.querySelector("[data-price]").value;
    const description = document.querySelector("[data-description]").value;
    productServices.editProduct(image, category, productName, price, description).then(() => {
        window.location.href = "/screens/edicion_concluida.html";
    });
});