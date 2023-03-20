
const productsList = () =>
    fetch("http://localhost:3000/product").then((respuesta) => respuesta.json());
const addProduct = (image, category, name,  price, description) => {
    return fetch("http://localhost:3000/product", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            image,
            category,
            name,
            price,
            description,
            id: uuid.v4()
        })
    });
}

const deleteProduct = (id) => {
    return fetch(`http://localhost:3000/product/${id}`, {
        method: "DELETE"
    });
}
const productDetails = (id) => {
    return fetch(`http://localhost:3000/product/${id}`).then(respuesta =>
        respuesta.json()
    );
}
const searchProducts = (name) => {
    return fetch(`http://localhost:3000/product?q=${name}`).then(respuesta =>
        respuesta.json()
    );
}

const editProduct = (image, category, name,  price, description, id) => {
    return fetch(`http://localhost:3000/product/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ image, category, name,  price, description })
    }).then(respuesta => respuesta).catch((err) => console.error("ha ocurrido un error"))
}
export const productServices = {
    productsList,
    addProduct,
    deleteProduct,
    productDetails,
    editProduct,
    searchProducts
};