import { productServices } from "../service/product-service.js";
import { userLoggedIn } from "../controllers/session-controller.js";

const { href, pathname } = window.location;

export const createNewLine = (image, category, name, price, description, id) => {

    const line = document.createElement("div");
    let content =
        `
        <div class = "product__line__products__details">
            <img class="product__line__products__details__product-img" src="${image}" alt="">`;

    if (href.includes("products") && userLoggedIn()) {
        content += `<button type = "button" class="product__line__products__details__delete-btn" id= ${id}><i class="fa fa-trash" aria-hidden="true"></i></button>
                <button class="product__line__products__details__edit-btn"><a href="edit-product.html?id=${id}"><i class='fas fa-pen'></i></a></button>`;
    }

    content += `
            <label class="product__line__products__details__product__category" id="${category}"></label>
            <h2 class="product__line__products__details__product-name">${name}</h2>
            <h2 class="product__line__products__details__product-price">$${price}</h2>
            <a class="product__line__products__details__product-btn" href="product-details.html?id=${id}">Ver producto</a>
        </div>
        `;
    line.innerHTML = content;
    line.dataset.productId = id;
    const btnDelete = line.querySelector(".product__line__products__details__delete-btn");
    if (btnDelete) {
        btnDelete.addEventListener("click", () => {
            Swal.fire({
                title: 'Está seguro de que desea eliminar el producto?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí'
            }).then((result) => {
                if (result.isConfirmed) {
                    console.log(result.isConfirmed);
                    productServices.deleteProduct(id).then(respuesta => {
                        line.remove();
                        Swal.fire(
                            'Borrado!',
                            'El producto fue eliminado.',
                            'success'
                        );
                    }).catch((error) => console.error("Ocurrio un error", error));
                }
            })/*  */

        });
    }

    return line;
};
const product = document.querySelector("[data-products]");
const productLineAdd = document.querySelector("[data-addproduct]");
const allProductsAdminContent = `<h1 class="product__line__all__products__title">Todos los productos</h1><button class="product__line__all__products__btn"><a href="add-product.html">Agregar producto</a> </button>`;
const allProductsClientContent = `<h1 class="product__line__all__products__title">Todos los productos</h1>`;
const productTypeStarWars = document.querySelector("[data-product1]");
const productTypeConsola = document.querySelector("[data-product2]");
const productTypeDiversos = document.querySelector("[data-product3]");

productServices.productsList().then((data) => {
    data.forEach(({ image, category, name, price, description, id }) => {
        const newLine = createNewLine(image, category, name, price, description, id);

        if (href.includes("products")) {
            product.appendChild(newLine);
        }
        if (pathname.length === 0 || pathname === "/" || pathname.endsWith("alurageek/") || pathname.includes("index")) {
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

if (href.includes("products")) {
    if (userLoggedIn()) {
        productLineAdd.innerHTML = allProductsAdminContent;
    } else {
        productLineAdd.innerHTML = allProductsClientContent;
    }
}
