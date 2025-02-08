import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    AppBar,
    Container,
    Avatar,
    Menu,
    MenuItem,
    Tooltip,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { User } from '../types/User';
import { useGlobalContext } from '../context/GlobalContext';

const AUTH_ITEMS = [
    { title: 'Iniciar Sesión', path: '/login', icon: LoginIcon },
    { title: 'Registrarse', path: '/register', icon: PersonAddIcon },
] as const;

const getNavItems = (user: User | null) => user ? [
    {
        title: 'Mi Perfil',
        path: `/user/${user.name}`,
        icon: AccountCircleIcon
    },
    {
        title: 'Dashboard',
        path: '/dashboard',
        icon: DashboardIcon
    },
] : [];

export default function Navbar() {
    const navigate = useNavigate();
    const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
    const { user, clearSession } = useGlobalContext();

    const navItems = getNavItems(user);

    const handleLogout = () => {
        clearSession();
        setUserMenuAnchor(null);
        navigate('/login');
    };

    return (
        <AppBar position="sticky" className="bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
            <Container maxWidth="xl">
                <div className="flex items-center justify-between py-3">
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-400 to-teal-600 flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-xl">L</span>
                        </div>
                        <span className="text-gray-700 font-semibold text-xl hidden sm:block">Link Share</span>
                    </Link>
                    {user && (
                        <div className="hidden lg:flex items-center space-x-1">
                            {navItems.map(({ title, path, icon: Icon }) => (
                                <Link key={title} to={path} className="px-4 py-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 transition-all duration-200 flex items-center space-x-2 font-medium">
                                    <Icon className="text-xl text-teal-500" />
                                    <span>{title}</span>
                                </Link>
                            ))}
                        </div>
                    )}
                    {user ? (
                        <Tooltip title="Opciones de usuario" arrow>
                            <Avatar 
                                onClick={(e) => setUserMenuAnchor(e.currentTarget)} 
                                className="cursor-pointer bg-gradient-to-tr from-teal-400 to-teal-600 shadow-md"
                            >
                                {user.username[0].toUpperCase()}
                            </Avatar>
                        </Tooltip>
                    ) : (
                        <div className="flex items-center space-x-2">
                            {AUTH_ITEMS.map(({ title, path, icon: Icon }) => (
                                <Link key={path} to={path} className="px-4 py-2 rounded-xl flex items-center space-x-2 font-medium text-gray-600 hover:bg-gray-100/80">
                                    <Icon className="text-xl" />
                                    <span>{title}</span>
                                </Link>
                            ))}
                        </div>
                    )}
                    <Menu 
                        anchorEl={userMenuAnchor} 
                        open={Boolean(userMenuAnchor)} 
                        onClose={() => setUserMenuAnchor(null)}
                    >
                        <MenuItem 
                            onClick={handleLogout} 
                            className="flex items-center space-x-3 px-4 py-3 hover:bg-red-50 text-red-600"
                        >
                            <LogoutIcon />
                            <span>Cerrar Sesión</span>
                        </MenuItem>
                    </Menu>
                </div>
            </Container>
        </AppBar>
    );
}