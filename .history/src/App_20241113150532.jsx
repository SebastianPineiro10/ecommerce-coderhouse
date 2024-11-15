import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import NavBar from './components/layout/navbar/NavBar';
import {ItemListContainer} from './components/pages/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/pages/ItemDetail/ItemDetailContainer';
import CartContainer from './components/pages/cart/CartContainer';
import { Toaster } from 'sonner';


const App = () => {
  return (
    <CartProvider>
      <BrowserRouter>
      <Toaster duration={2000} richColors position="bottom-right" />
        <NavBar />
        <Routes>
          <Route 
            path="/" 
            element={<ItemListContainer greeting="¡Hola! Bienvenido a SP Deposito Dental" />} 
          />
          <Route path="/category/:categoryId" element={<ItemListContainer greeting="¡Hola! Bienvenido a SP Deposito Dental" />} />
          <Route path="/item/:itemId" element={<ItemDetailContainer />} />
          <Route path="/cart" element={<CartContainer />} />
          <Route path="/checkout" element={<checkout />} />
          <Route path="*" element={<h2>404 not found</h2>} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
};

export default App;


