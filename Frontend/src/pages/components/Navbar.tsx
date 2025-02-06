import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    AppBar,
    Container,
    Avatar,
    IconButton,
    Menu,
    MenuItem,
    Tooltip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

interface UserData {
    username: string;
    email: string;
}

const AUTH_ITEMS = [
    { title: 'Iniciar Sesión', path: '/login', icon: LoginIcon },
    { title: 'Registrarse', path: '/register', icon: PersonAddIcon },
] as const;

// Modificamos la función getNavItems para que solo retorne los items cuando hay usuario
const getNavItems = (userData: UserData | null) => userData ? [
    { 
        title: 'Mi Perfil', 
        path: `/user/${userData.username}`, 
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
    const [userData, setUserData] = useState<UserData | null>(null);
    const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null);
    const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('authToken');
            if (token) {
                try {
                    const response = await axios.get('http://3.142.131.147/api/users/info', {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setUserData(response.data);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    localStorage.removeItem('authToken');
                    setUserData(null);
                }
            }
        };
        fetchUserData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setUserData(null);
        navigate('/login');
    };

    // Obtener los items de navegación actualizados
    const navItems = getNavItems(userData);

    return (
        <AppBar 
            position="sticky" 
            className="bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm"
            sx={{ backgroundColor: 'transparent' }}
        >
            <Container maxWidth="xl">
                <div className="flex items-center justify-between py-3">
                    {/* Logo/Brand */}
                    <div className="flex items-center">
                        {/* Mobile Menu Button - Solo visible si hay usuario o en mobile */}
                        {userData && (
                            <IconButton
                                color="inherit"
                                className="lg:hidden mr-2 text-gray-600"
                                onClick={(e) => setMobileMenuAnchor(e.currentTarget)}
                            >
                                <MenuIcon />
                            </IconButton>
                        )}
                        
                        <Link to="#" className="flex items-center space-x-2">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-400 to-teal-600 
                                        flex items-center justify-center shadow-lg shadow-teal-500/20">
                                <span className="text-white font-bold text-xl">L</span>
                            </div>
                            <span className="text-gray-700 font-semibold text-xl hidden sm:block">
                                Link Share
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation - Solo visible si hay usuario */}
                    {userData && (
                        <div className="hidden lg:flex items-center space-x-1">
                            {navItems.map(({ title, path, icon: Icon }) => (
                                <Link
                                    key={title}
                                    to={path}
                                    className="px-4 py-2 rounded-xl text-gray-600 hover:text-gray-900
                                             hover:bg-gray-100/80 transition-all duration-200 
                                             flex items-center space-x-2 font-medium"
                                >
                                    <Icon className="text-xl text-teal-500" />
                                    <span>{title}</span>
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* User Section - Desktop */}
                    <div className="hidden lg:flex items-center space-x-4">
                        {userData ? (
                            <div className="flex items-center space-x-3">
                                <span className="text-gray-600">
                                    {userData.email}
                                </span>
                                <Tooltip title="Opciones de usuario" arrow>
                                    <Avatar
                                        onClick={(e) => setUserMenuAnchor(e.currentTarget)}
                                        className="cursor-pointer bg-gradient-to-tr from-teal-400 to-teal-600
                                                 shadow-md hover:shadow-lg transition-all duration-200
                                                 hover:scale-105"
                                    >
                                        {userData.username[0].toUpperCase()}
                                    </Avatar>
                                </Tooltip>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-2">
                                {AUTH_ITEMS.map(({ title, path, icon: Icon }) => (
                                    <Link
                                        key={path}
                                        to={path}
                                        className={`px-4 py-2 rounded-xl transition-all duration-200 
                                                 flex items-center space-x-2 font-medium
                                                 ${path === '/login' 
                                                    ? 'text-gray-600 hover:bg-gray-100/80' 
                                                    : 'bg-gradient-to-tr from-teal-400 to-teal-600 text-white shadow-md shadow-teal-500/20 hover:shadow-lg hover:scale-105'
                                                 }`}
                                    >
                                        <Icon className="text-xl" />
                                        <span>{title}</span>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* User Section - Mobile */}
                    {userData && (
                        <div className="lg:hidden flex items-center">
                            <Tooltip title="Opciones de usuario" arrow>
                                <Avatar
                                    onClick={(e) => setUserMenuAnchor(e.currentTarget)}
                                    className="cursor-pointer bg-gradient-to-tr from-teal-400 to-teal-600
                                             shadow-md hover:shadow-lg transition-all duration-200
                                             hover:scale-105 w-8 h-8"
                                >
                                    {userData.username[0].toUpperCase()}
                                </Avatar>
                            </Tooltip>
                        </div>
                    )}

                    {/* Mobile Menu */}
                    <Menu
                        anchorEl={mobileMenuAnchor}
                        open={Boolean(mobileMenuAnchor)}
                        onClose={() => setMobileMenuAnchor(null)}
                        className="lg:hidden mt-2"
                        PaperProps={{
                            className: "rounded-xl shadow-xl border border-gray-100 w-[calc(100vw-32px)] max-w-[300px]"
                        }}
                    >
                        {userData && (
                            <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                                <p className="text-sm text-gray-500">Conectado como</p>
                                <p className="text-sm font-medium text-gray-900 truncate">{userData.email}</p>
                            </div>
                        )}
                        
                        {navItems.map(({ title, path, icon: Icon }) => (
                            <MenuItem
                                key={title}
                                onClick={() => {
                                    navigate(path);
                                    setMobileMenuAnchor(null);
                                }}
                                className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50"
                            >
                                <Icon className="text-teal-500" />
                                <span className="text-gray-700">{title}</span>
                            </MenuItem>
                        ))}
                        
                        {!userData ? (
                            <>
                                <div className="border-t border-gray-100 my-2" />
                                {AUTH_ITEMS.map(({ title, path, icon: Icon }) => (
                                    <MenuItem
                                        key={path}
                                        onClick={() => {
                                            navigate(path);
                                            setMobileMenuAnchor(null);
                                        }}
                                        className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50"
                                    >
                                        <Icon className="text-teal-500" />
                                        <span className="text-gray-700">{title}</span>
                                    </MenuItem>
                                ))}
                            </>
                        ) : (
                            <>
                                <div className="border-t border-gray-100 my-2" />
                                <MenuItem
                                    onClick={() => {
                                        handleLogout();
                                        setMobileMenuAnchor(null);
                                    }}
                                    className="flex items-center space-x-3 px-4 py-3 hover:bg-red-50 text-red-600"
                                >
                                    <LogoutIcon />
                                    <span>Cerrar Sesión</span>
                                </MenuItem>
                            </>
                        )}
                    </Menu>

                    {/* User Menu */}
                    <Menu
                        anchorEl={userMenuAnchor}
                        open={Boolean(userMenuAnchor)}
                        onClose={() => setUserMenuAnchor(null)}
                        PaperProps={{
                            className: "mt-2 rounded-xl shadow-xl border border-gray-100"
                        }}
                    >
                        <div className="px-4 py-3 border-b border-gray-100">
                            <p className="text-sm text-gray-500">Conectado como</p>
                            <p className="text-sm font-medium text-gray-900">{userData?.email}</p>
                        </div>
                        <MenuItem
                            onClick={() => {
                                handleLogout();
                                setUserMenuAnchor(null);
                            }}
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