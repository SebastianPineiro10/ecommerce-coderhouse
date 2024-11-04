import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar'; // Asegúrate de que la ruta sea correcta
import ProductList from './components/ProductList'; // Componente para la lista de productos
import ItemDetailContainer from './components/ItemDetailContainer'; // Componente para los detalles del producto
import Cart from './components/Cart'; // Componente para el carrito (si lo tienes)

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<ProductList />} /> {/* Componente donde muestras todos los productos */}
        <Route path="/item/:itemId" element={<ItemDetailContainer />} /> {/* Detalles del producto */}
        <Route path="/cart" element={<Cart />} /> {/* Carrito de compras */}
        <Route path="*" element={<div>404 Not Found</div>} /> {/* Manejo de rutas no definidas */}
      </Routes>
    </Router>
  );
};

export default App;

