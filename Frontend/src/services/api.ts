import axios from "axios";
import { Link } from "../types/Link";
import { User } from "../types/User";
import { UserCredentials } from "../types/UserCredentials";

const API_URL: string = 'http://localhost:8080';

const axiosApi = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Obtener info del user autenticado
export const fetchSelf = async () => {
    const response = await axiosApi.get(`/api/users/info`);
    if (response.status === 200) {
        return response.data;
    }
}

// Guardar Token
export const setAuthToken = (token: string | null) => {
    if (token) {
        axiosApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axiosApi.defaults.headers.common['Authorization'];
    }
}

export const authenticate = async (userdata: UserCredentials) => {
    const response = await axiosApi.post('/api/auth/login', userdata);

    if (response.status === 200) {
        const { jwt } = response.data; // Extrae el token correctamente
        return jwt; // Devuelve el token
    }

    return false; // Si no hay jwt, devuelve false
};


// Registrar user
export const registerUser = async (userData: User) => {
    const response = await axiosApi.post('/api/auth/signup', userData);
    if (response.status === 201) {
        return response.data;
    }
    return null;
}

// Confirmar cuenta
export const confirmAccount = async (token: string) => {
    const response = await axiosApi.get(`/api/auth/confirm?token=${token}`);
    return response.data;
}

/*
 * ================ LINKS ENDPOINTS ================
*/

// Crear un nuevo enlace
export const createLink = async (link: Link) => {
    const response = await axiosApi.post('/api/links', link);
    return response.data;
}

// Obtener enlaces de un usuario por su `username`
export const fetchLinksByUser = async (username: string) => {
    const response = await axiosApi.get(`/api/links/${username}`);
    return response.data;
}

// Obtener un enlace por su `id`
export const fetchLinkById = async (id: number) => {
    const response = await axiosApi.get(`/api/links/${id}`);
    return response.data;
}

// Actualizar un enlace por su `id`
export const updateLink = async (id: number, linkData: Link) => {
    const response = await axiosApi.put(`/api/links/${id}`, linkData);
    return response.data;
}

// Eliminar un enlace por su `id`
export const deleteLink = async (id: number) => {
    const response = await axiosApi.delete(`/api/links/${id}`);
    return response.data;
}
