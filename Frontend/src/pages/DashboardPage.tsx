import React from 'react';
import { Avatar, Container, Typography, Box, Divider } from '@mui/material';
import { Navigate } from 'react-router-dom';
import LinksByUser from './LinksPage';
import { AddLinkBTN } from '../components/Links/AddLinks';
import { useGlobalContext } from '../context/GlobalContext';

export const DashboardPage = () => {
    const { user, isAuthenticated } = useGlobalContext();

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return (
        <Container maxWidth="sm" className="py-8">
            {user ? (
                <Box className="p-4 flex flex-col items-center">
                    <Avatar
                        alt={`${user.username}'s avatar`}
                        src="/api/placeholder/120/120"
                        className="w-[120px] h-[120px] mb-3 border-4 border-white shadow-md"
                    />
                    <Typography 
                        variant="h4" 
                        gutterBottom 
                        className="text-indigo-900 font-bold"
                    >
                        @{user.username}
                    </Typography>
                    
                    <Divider className="w-full my-2" />
                    
                    <Box className="w-full mb-3">
                        <Typography 
                            variant="subtitle1" 
                            className="text-gray-600 mb-1"
                        >
                            <strong>Email:</strong>
                        </Typography>
                        <Typography 
                            variant="body1" 
                            className="text-gray-600"
                        >
                            {user.email}
                        </Typography>
                    </Box>
                    
                    <Box className="w-full flex flex-col gap-2 mt-2">
                        <AddLinkBTN />
                        <LinksByUser 
                            username={user.username} 
                            showActions={true} 
                        />
                    </Box>
                </Box>
            ) : (
                <Box className="flex justify-center items-center min-h-[50vh]">
                    <Typography 
                        variant="h6" 
                        className="text-gray-600"
                    >
                        Cargando...
                    </Typography>
                </Box>
            )}
        </Container>
    );
};