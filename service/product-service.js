
const productsList = () =>
    fetch("https://periwinkle-dhole-wear.cyclic.app/product").then((respuesta) => respuesta.json());
const addProduct = (image, category, name,  price, description) => {
    return fetch("https://periwinkle-dhole-wear.cyclic.app/product", {
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
    return fetch(`https://periwinkle-dhole-wear.cyclic.app/product/${id}`, {
        method: "DELETE"
    });
}
const productDetails = (id) => {
    return fetch(`https://periwinkle-dhole-wear.cyclic.app/product/${id}`).then(respuesta =>
        respuesta.json()
    );
}
const searchProducts = (name) => {
    return fetch(`https://periwinkle-dhole-wear.cyclic.app/product?q=${name}`).then(respuesta =>
        respuesta.json()
    );
}

const editProduct = (image, category, name,  price, description, id) => {
    return fetch(`https://periwinkle-dhole-wear.cyclic.app/product/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ image, category, name,  price, description })
    }).then(respuesta => respuesta).catch((err) => console.error("ha ocurrido un error",err))
}
export const productServices = {
    productsList,
    addProduct,
    deleteProduct,
    productDetails,
    editProduct,
    searchProducts
};