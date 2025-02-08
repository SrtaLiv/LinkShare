import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Interceptor para agregar el token a todas las peticiones
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Agregar interceptor de respuesta
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            console.error('Error de respuesta:', {
                status: error.response.status,
                data: error.response.data,
                headers: error.response.headers
            });
            
            if (error.response.status === 405) {
                console.error('Método no permitido. Verifica la ruta y el método HTTP');
            }
        }
        return Promise.reject(error);
    }
);

export default api;