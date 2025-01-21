import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Avatar, Button, Paper, Container, Typography, Box, Divider } from '@mui/material';
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
        <Container maxWidth="sm" sx={{ py: 8 }}>
            {user ? (
                <Paper elevation={3} sx={{
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderRadius: 2,
                    background: 'linear-gradient(to bottom, #ffffff, #f5f5f5)'
                }}>
                    <Avatar
                        alt="avatar"
                        src="https://ugc.production.linktr.ee/a85ceb97-98c0-4108-b0ee-b2b39fb606a8_WhatsApp-Image-2024-02-22-at-16.03.47.jpeg?io=true&size=avatar-v3_0"
                        sx={{
                            width: 120,
                            height: 120,
                            mb: 3,
                            border: '4px solid #fff',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                        }}
                    />
                    <Typography variant="h4" gutterBottom sx={{ color: '#1a237e', fontWeight: 'bold' }}>
                        @{user.username}
                    </Typography>
                    <Divider sx={{ width: '100%', my: 2 }} />
                    
                    <Box sx={{ width: '100%', mb: 3 }}>
                        <Typography variant="subtitle1" sx={{ color: '#555', mb: 1 }}>
                            <strong>Email:</strong>
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#666' }}>
                            {user.email}
                        </Typography>
                    </Box>

                    <Button 
                        onClick={handleLogout} 
                        variant="contained" 
                        sx={{
                            mt: 2,
                            bgcolor: '#f44336',
                            '&:hover': {
                                bgcolor: '#d32f2f'
                            },
                            px: 4,
                            py: 1,
                            borderRadius: 2,
                            textTransform: 'none',
                            fontSize: '1rem'
                        }}
                    >
                        Cerrar Sesión
                    </Button>
                </Paper>
            ) : (
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    minHeight: '50vh'
                }}>
                    <Typography variant="h6" sx={{ color: '#666' }}>
                        Cargando...
                    </Typography>
                </Box>
            )}
        </Container>
    );
};
