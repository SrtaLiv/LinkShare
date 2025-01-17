import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Avatar, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const DashboardPage = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('authToken'); // Obtener el token

            if (!token) {
                navigate('/login'); // Redirigir si no hay token
                return;
            }

            try {
                const response = await axios.get('http://localhost:8081/api/users/info', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(response.data); // Guardar los datos del usuario
                console.log('Datos del usuario:', response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
                navigate('/login'); // Redirigir si hay un error (token inválido)
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('authToken'); // Eliminar el token
        navigate('/login'); // Redirigir al login
    };

    return (
        <main className="w-full min-h-screen flex flex-col items-center justify-center">
            {user ? (
                <div className="text-center">
                    <Avatar
                        alt="avatar"
                        src="https://ugc.production.linktr.ee/a85ceb97-98c0-4108-b0ee-b2b39fb606a8_WhatsApp-Image-2024-02-22-at-16.03.47.jpeg?io=true&size=avatar-v3_0"
                        sx={{ width: 100, height: 100, margin: '0 auto' }}
                    />
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <Button onClick={handleLogout} variant="contained" className="bg-red-500 text-white mt-4">
                        Logout
                    </Button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </main>
    );
};
