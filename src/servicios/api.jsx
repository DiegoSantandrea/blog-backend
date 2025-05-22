import axios from "axios";

const ApiClient = axios.create({
    baseURL: "http://localhost:3001/blog/v1",
    timeout: 5000,
    httpsAgent: false,
});

export const obtenerPublicaciones = async () => {
    try {
        return await ApiClient.get("/publicacion/");
    } catch (e) {
        return{
            error: true,
            message: e.response || e.message,
        }
    }
}

export const obtenerPublicacionPorId = async (id) => {
    try {
        const { data } = await ApiClient.get(`/publicacion/${id}`);
        return data ;
    } catch (e) {
        return {
            error: true,
            message: e.response?.data?.message || e.message,
        };
    }
};

export const filtrarPublicaciones = async (filters) => {
    try {
        const { data } = await ApiClient.get("/publicacion/filter", {
            params: {
                curso: filters.curso || undefined,
            },
        });
        return { data } ;
    } catch (e) {
        return {
            error: true,
            message: e.response?.data?.message || e.message,
        };
    }
};



export const anadirComentario = async (id, {usuario, comentario}) => {
    try {
        const { data } = await ApiClient.patch(`/publicacion/${id}`, {
            usuario,
            comentario,
        });
        return data;
    } catch (e) {
        return {
            error: true,
            message: e.response?.data?.message || e.message,
        };
    }
};