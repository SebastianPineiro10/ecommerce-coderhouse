import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext'; // Importar el CartProvider
import NavBar from './components/layout/navbar/NavBar';
import ItemListContainer from './components/pages/itemListContainer/ItemListContainer';
import ItemDetailContainer from './components/pages/itemDetail/ItemDetailContainer';
import CartContainer from './components/pages/cart/CartContainer';

const App = () => {
  return (
    <CartProvider> {/* Proveedor del carrito */}
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<ItemListContainer greeting="¡Bienvenido a SP Depósito Dental!" />} />
          <Route path="/category/:categoryId" element={<ItemListContainer />} />
          <Route path="/item/:itemId" element={<ItemDetailContainer />} />
          <Route path="/cart" element={<CartContainer />} />
          <Route path="*" element={<h2>404 Not Found</h2>} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;


