import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar'; // Asegúrate de que la ruta sea correcta
import ItemListContainer from './components/ItemListContainer'; // Ruta a tu ItemListContainer
import ItemDetailContainer from './components/ItemDetailContainer'; // Ruta a los detalles del producto
import CartContainer from './components/CartContainer'; // Componente para el carrito

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<ItemListContainer greeting="Bienvenido a nuestra tienda!" />} />
        <Route path="/category/:categoryId" element={<ItemListContainer greeting="Bienvenido a nuestra tienda!" />} />
        <Route path="/item/:itemId" element={<ItemDetailContainer />} />
        <Route path="/cart" element={<CartContainer />} /> {/* Ruta para el carrito */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default App;

