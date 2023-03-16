import { productServices } from "../service/product-service.js";



const createNewLine = (image, category, name, price, description, id) => {
   
    const line = document.createElement("div");
    const content =
        `
        <img class="product__line__products__details__product-img" src="${image}" alt="">
                        <button class="product__line__products__details__delete-btn" id= ${id}><i class="fa fa-trash" aria-hidden="true"></i></button>
                        <button class="product__line__products__details__edit-btn" id=${id}><i class='fas fa-pen'></i></button>
                        <label class="product__line__products__details__product__category" id="${category}"></label>
                        <h2 class="product__line__products__details__product-name">${name}</h2>
                        <h2 class="product__line__products__details__product-price">$${price}</h2>
                        <a class="product__line__products__details__product-btn" href="">Ver producto</a>
        `;
    line.innerHTML = content;
    const btn = document.querySelector("button");
    btn.addEventListener("click", () => {
        const id = btn.id;
        productServices.deleteProduct(id).then(respuesta => {
        }).catch((error) => alert("Ocurrio un error"));
    });
    return line;
};
const product = document.querySelector("[data-products]");
const productTypeStarWars = document.querySelector("[data-product1]");
const productTypeConsola = document.querySelector("[data-product2]");
const productTypeDiversos = document.querySelector("[data-product3]");

productServices.productsList().then((data) => {
    data.forEach(({ image, category, name, price, description, id }) => {
        const newLine = createNewLine(image, category, name,price, description, id);
        console.log(category);

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
