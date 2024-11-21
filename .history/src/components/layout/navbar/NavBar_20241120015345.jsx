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
  { name: 'Guantes de Nitrilo', route: '/category/guantes' },
  { name: 'Batas Quirúrgicas', route: '/category/batas' },
  { name: 'Material ortodoncia', route: '/category/ortodoncia' },
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
    <>
      <AppBar position="static" sx={{ overflowX: 'hidden' }}>
        <Container maxWidth="xl" sx={{ padding: 0, overflowX: 'hidden' }}>
          <Toolbar disableGutters>
            {/* Logo Section */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mr: 3.5 }}>
              <img 
                src="https://res.cloudinary.com/dcerhiol0/image/upload/v1730231790/file_9_jmsjn0.png" 
                alt="Logo"
                style={{ height: '150px', marginBottom: '1px', width: '150px' }} 
              />
            </Box>

            {/* Menu for Small Screens */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent: 'center', gap: 5 }}>
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
                      <NavLink to={page.route} style={{ textDecoration: 'none', color: 'inherit' }}>
                        {page.name}
                      </NavLink>
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Menu for Large Screens */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  component={NavLink}
                  to={page.route}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>

            {/* Cart Widget */}
            <CartWidget itemCount={3} />
          </Toolbar>
        </Container>
      </AppBar>

      {/* Global Styles */}
      <style>
        {`
          body, html {
            margin: 0;
            padding: 0;
            overflow-x: hidden;
          }
        `}
      </style>
    </>
  );
}

export default ResponsiveAppBar;

