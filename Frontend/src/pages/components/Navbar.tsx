import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { 
  Box, 
  Typography, 
  AppBar, 
  Toolbar, 
  Avatar, 
  IconButton, 
  Menu, 
  MenuItem, 
  Container,
  Button
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [userData, setUserData] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const response = await axios.get('http://localhost:8081/api/users/info', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUserData(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };
    fetchUserData();
  }, []);

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#2c3e50' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Desktop Menu */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', width: '100%' }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
              <Button
                startIcon={<HomeIcon />}
                sx={{ 
                  color: 'white',
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
                }}
              >
                Inicio
              </Button>
            </Link>

            <Link to={userData ? `/user/${userData.username}` : '/login'} style={{ textDecoration: 'none', color: 'white' }}>
              <Button
                startIcon={<AccountCircleIcon />}
                sx={{ 
                  color: 'white',
                  ml: 2,
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
                }}
              >
                Mi Perfil
              </Button>
            </Link>

            <Link to="/dashboard" style={{ textDecoration: 'none', color: 'white' }}>
              <Button
                startIcon={<DashboardIcon />}
                sx={{ 
                  color: 'white',
                  ml: 2,
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
                }}
              >
                Dashboard
              </Button>
            </Link>

            <Box sx={{ flexGrow: 1 }} />

            {!userData ? (
              <>
                <Link to="/login" style={{ textDecoration: 'none', color: 'white' }}>
                  <Button
                    startIcon={<LoginIcon />}
                    sx={{ 
                      color: 'white',
                      '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
                    }}
                  >
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link to="/register" style={{ textDecoration: 'none', color: 'white' }}>
                  <Button
                    startIcon={<PersonAddIcon />}
                    sx={{ 
                      color: 'white',
                      ml: 2,
                      '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
                    }}
                  >
                    Registrarse
                  </Button>
                </Link>
              </>
            ) : (
              <Avatar 
                sx={{ 
                  width: 32, 
                  height: 32,
                  cursor: 'pointer',
                  bgcolor: '#1abc9c'
                }}
              >
                {userData.username[0].toUpperCase()}
              </Avatar>
            )}
          </Box>

          {/* Mobile Menu */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, width: '100%' }}>
            <IconButton
              size="large"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, textAlign: 'center' }}
            >
              Mi App
            </Typography>
            {userData && (
              <Avatar 
                sx={{ 
                  width: 32, 
                  height: 32,
                  bgcolor: '#1abc9c'
                }}
              >
                {userData.username[0].toUpperCase()}
              </Avatar>
            )}
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile Menu Items */}
      <Menu
        anchorEl={mobileMoreAnchorEl}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
        PaperProps={{
          sx: {
            width: '200px',
            mt: 1.5
          }
        }}
      >
        <MenuItem onClick={handleMobileMenuClose} component={Link} to="/">
          <HomeIcon sx={{ mr: 1 }} /> Inicio
        </MenuItem>
        <MenuItem onClick={handleMobileMenuClose} component={Link} to={userData ? `/user/${userData.username}` : '/login'}>
          <AccountCircleIcon sx={{ mr: 1 }} /> Mi Perfil
        </MenuItem>
        <MenuItem onClick={handleMobileMenuClose} component={Link} to="/dashboard">
          <DashboardIcon sx={{ mr: 1 }} /> Dashboard
        </MenuItem>
        {!userData && (
          <>
            <MenuItem onClick={handleMobileMenuClose} component={Link} to="/login">
              <LoginIcon sx={{ mr: 1 }} /> Iniciar Sesión
            </MenuItem>
            <MenuItem onClick={handleMobileMenuClose} component={Link} to="/register">
              <PersonAddIcon sx={{ mr: 1 }} /> Registrarse
            </MenuItem>
          </>
        )}
      </Menu>
    </AppBar>
  );
}
