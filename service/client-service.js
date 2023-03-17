
const clientsList = () =>
    fetch("http://localhost:3006/client").then((respuesta) => respuesta.json());

const addClient = (email, password) => {
    return fetch("http://localhost:3006/client", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password,
            id: uuid.v4()
        })
    });
}

const deleteClient = (id) => {
    return fetch(`http://localhost:3006/client/${id}`, {
        method: "DELETE"
    });
}
const clientDetails = (id) => {
    return fetch(`http://localhost:3006/client/${id}`).then(respuesta =>
        respuesta.json()
    );
}

const editClient = (email,password, id) => {
    return fetch(`http://localhost:3006/client/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password})
    }).then(respuesta => respuesta).catch((err) => console.error("ha ocurrido un error"))
}
export const clientServices = {
    clientsList,
    addClient,
    deleteClient,
    clientDetails,
    editClient
};