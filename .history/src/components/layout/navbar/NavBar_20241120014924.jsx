import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import CartWidget from '../../common/cartWidget/Cartwidget';
import { NavLink } from 'react-router-dom';
import "./Navbar.css";

const pages = [
  { name: 'Inicio', route: '/' },
  { name: 'Cubrebocas', route: '/category/cubrebocas' },
  { name: 'Guantes', route: '/category/guantes' },
  { name: 'Batas', route: '/category/batas' },
  { name: 'Ortodoncia', route: '/category/ortodoncia' },
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" sx={{ height: '60px', overflow: 'hidden' }}> {/* Agregar overflow: hidden */}
      <Container maxWidth="xl" sx={{ padding: 0 }}> {/* Eliminar el padding para evitar desbordamientos */}
        <Toolbar disableGutters sx={{ padding: 0, height: '60px', display: 'flex', justifyContent: 'space-between' }}> {/* Ajustar el tamaño y espaciado */}
          
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            <img 
              src="https://res.cloudinary.com/dcerhiol0/image/upload/v1730231790/file_9_jmsjn0.png" 
              alt="Logo"
              style={{ height: '40px', width: '40px' }}  // Reducir el tamaño del logo
            />
            <Typography
              variant="h6"
              component={NavLink}
              to="/"
              sx={{
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.1rem',
                color: 'inherit',
                textDecoration: 'none',
                ml: 1,
                fontSize: '16px' // Reducir tamaño de fuente
              }}
            >
              Mi Tienda
            </Typography>
          </Box>

          {/* Menú para pantallas pequeñas */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent: 'center', gap: 2 }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <NavLink to={page.route} style={{ textDecoration: 'none', color: 'inherit' }}>{page.name}</NavLink>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Menú para pantallas grandes */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={handleCloseNavMenu}
                component={NavLink}
                to={page.route}
                sx={{ my: 2, color: 'white', display: 'block', fontSize: '14px' }}  {/* Reducir el tamaño de los botones */}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          {/* Icono del carrito */}
          <Box sx={{ flexGrow: 0 }}>
            <CartWidget itemCount={3} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;



