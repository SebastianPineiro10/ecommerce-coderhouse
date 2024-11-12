
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ItemListContainer from './components/pages/ItemDetail/ItemDetailContainer';
import ItemDetailContainer from './components/pages/ItemDetail/ItemDetailContainer';
import CartContainer from './components/pages/cart/CartContainer';
import { CartProvider } from './context/CartContext';
import NavBar from './components/navbar/NavBar';

const App = () => {
  return (
    <CartProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<ItemListContainer greeting="Bienvenido a SP Depósito Dental!" />} />
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


