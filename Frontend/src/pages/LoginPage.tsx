import React, { useState } from 'react';
import { Button } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'; // Importa SubmitHandler para el tipo
import { z } from 'zod';
import { useGlobalContext } from '../context/GlobalContext';
import { UserCredentials } from '../types/UserCredentials'; // Asegúrate de que UserCredentials esté bien importado
import { authenticate } from '../services/api';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
    email: z.string({ required_error: 'Ingrese su email' }).email({ message: 'Invalid email address' }),
    password: z.string({ required_error: 'Ingrese su contraseña' })
});

export const LoginPage = () => {
    const { isAuthenticated, storeSession } = useGlobalContext();
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const form = useForm<UserCredentials>({ resolver: zodResolver(formSchema) }); // Define el tipo del formulario como UserCredentials

    const onSubmit = async (userdata: UserCredentials) => {
        setError(null);
        try {
            const token = await authenticate(userdata);
            if (token) {
                storeSession(token)
                console.log('token', token)
                navigate('/', { replace: true });
            }
        } catch (err) {
            setError('Email y/o contraseña invalidos');
        }

    }

    if (isAuthenticated) return <Navigate to="/" replace />;

    return (
        <main className="w-full min-h-screen flex items-center justify-center bg-neutral-100">
            <div className="md:w-[33%] mx-auto flex flex-col">
                <div className="flex flex-col items-center justify-center">
                    <h2 className="font-semibold text-3xl text-indigo-500">Login</h2>
                </div>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid gap-4">
                        {/* Campo de email */}
                        <div className="grid gap-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="example@mail.com"
                                {...form.register("email")}
                                className="w-full px-4 py-2 border rounded-md"
                            />
                        </div>

                        {/* Campo de contraseña */}
                        <div className="grid gap-2">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
                            <input
                                id="password"
                                type="password"
                                placeholder="******"
                                {...form.register("password")}
                                className="w-full px-4 py-2 border rounded-md"
                            />
                        </div>

                        {/* Mensaje de error */}
                        {error && <p className="text-red-500">{error}</p>}

                        {/* Botón de enviar */}
                        <Button type="submit" className="w-full">
                            Iniciar sesión
                        </Button>
                    </div>
                </form>
            </div>
        </main>
    );
};
