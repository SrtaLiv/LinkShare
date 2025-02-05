import React, { useState } from 'react';
import axios from 'axios';
import { Button, OutlinedInput } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
// import { GoogleAuth } from './components/GoogleAuth';

export const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        const userRequest = { email, password };

        try {
            const response = await axios.post('http://localhost:8081/auth/login', userRequest);
            console.log('Respuesta del servidor:', response.data);
            const token = response.data.jwt; // Backend debería devolver el token aquí
            
            console.log('Token recibido:', token); // debug
            console.log('Token:', token);
            localStorage.setItem('authToken', token); // Guardar el token en localStorage
            navigate(`/dashboard`); // Redirigir al dashboard
            window.location.reload();
        }
        catch (error) {
            console.error('Error during login:', error);
        }
    };
    return (
        <main className="w-full min-h-screen flex items-center">
            <div className="md:w-[33%] mx-auto flex flex-col">
                <div className="flex flex-col items-center justify-center">
                    <h2 className="font-semibold text-3xl text-indigo-500">Login</h2>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-neutral-500 text-base">Email</label>
                        <OutlinedInput
                            placeholder="example@email.com"
                            className="h-10"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-neutral-500 text-base">Password</label>
                        <OutlinedInput
                            type="password"
                            placeholder="kittens!123"
                            className="h-10"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <Button onClick={handleLogin} variant="contained" className="bg-indigo-500 text-white flex-1">Login</Button>
                </div>
            </div>
        </main>
    );
};