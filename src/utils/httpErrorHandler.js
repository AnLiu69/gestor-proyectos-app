export const handleHttpError = (e) => {
    if (e.response) {
        console.log("Error en la respuesta del servidor:", e.response.data, e.response.status);
        return e.response.data;
    }
    else if (e.request) {
        console.log("Error en la solicitud:", e.request);
        return "No se recibió respuesta del servidor.";
    }
    else {
        console.log("Error inesperado:", e.message);
        return e.message;
    }
};