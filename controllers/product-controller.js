import { productServices } from "../service/product-service.js";
import { userLoggedIn } from "../controllers/session-controller.js";

const url = window.location.href;

export const createNewLine = (image, category, name, price, description, id) => {

    const line = document.createElement("div");
    let content =
        `
        <div class = "product__line__products__details">
            <img class="product__line__products__details__product-img" src="${image}" alt="">`;

    if (url.includes("products") && userLoggedIn()) {
        content += `<button type = "button" class="product__line__products__details__delete-btn" id= ${id}><i class="fa fa-trash" aria-hidden="true"></i></button>
                <button class="product__line__products__details__edit-btn"><a href="/edit-product.html?id=${id}"><i class='fas fa-pen'></i></a></button>`;
    }

    content += `
            <label class="product__line__products__details__product__category" id="${category}"></label>
            <h2 class="product__line__products__details__product-name">${name}</h2>
            <h2 class="product__line__products__details__product-price">$${price}</h2>
            <a class="product__line__products__details__product-btn" href="/product-details.html?id=${id}">Ver producto</a>
        </div>
        `;
    line.innerHTML = content;
    line.dataset.id = id;
    const btnDelete = line.querySelector(".product__line__products__details__delete-btn");
    if (btnDelete) {
        btnDelete.addEventListener("click", () => {
            console.log(id);
            productServices.deleteProduct(id).then(respuesta => {
            }).catch((error) => console.error("Ocurrio un error"));
        });
    }

    return line;
};
const product = document.querySelector("[data-products]");
const productLineAdd = document.querySelector("[data-addproduct]");
const allProductsAdminContent = `<h1 class="product__line__all__products__title">Todos los productos</h1><button class="product__line__all__products__btn"><a href="/add-product.html">Agregar producto</a> </button>`;
const allProductsClientContent = `<h1 class="product__line__all__products__title">Todos los productos</h1>`;
const productTypeStarWars = document.querySelector("[data-product1]");
const productTypeConsola = document.querySelector("[data-product2]");
const productTypeDiversos = document.querySelector("[data-product3]");

productServices.productsList().then((data) => {
    data.forEach(({ image, category, name, price, description, id }) => {
        const newLine = createNewLine(image, category, name, price, description, id);
        const url = window.location.href;
        if (url.includes("products")) {
            product.appendChild(newLine);
        }
        if (url.includes("index")) {
            switch (category) {
                case "starwars":
                    productTypeStarWars.appendChild(newLine);
                    break;
                case "consolas":
                    productTypeConsola.appendChild(newLine);
                    break;
                case "diversos":
                    productTypeDiversos.appendChild(newLine);
                    break;
                default:
                    break;
            }
        }
    });
}).catch((error) => console.error("Ocurrio un error", error));

if (url.includes("products")) {
    if (userLoggedIn()) {
        productLineAdd.innerHTML = allProductsAdminContent;
    } else {
        productLineAdd.innerHTML = allProductsClientContent;
    }
}
