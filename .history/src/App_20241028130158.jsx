import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/layout/navbar/NavBar';
import ItemListContainer from './components/pages/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/pages/ItemDetail/ItemDetailContainer';

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route 
          path="/" 
          element={<ItemListContainer greeting="¡Hola! Bienvenido a SP Deposito Dental, tu proveedor de productos odontológicos de confianza." />} 
        />
        <Route path="/category/:categoryId" element={<ItemListContainer />} />
        <Route path="/item/:itemId" element={<ItemDetailContainer />} />
        <Route path="/item/:itemId" element={<ProductDetail />} />
        <Route path="*" element={<h2>404 not found</h2>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;



