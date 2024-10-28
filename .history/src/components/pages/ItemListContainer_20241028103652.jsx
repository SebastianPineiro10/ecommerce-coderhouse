import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { products } from '../../products';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const ItemListContainer = ({ greeting }) => {
  const { categoryId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    setLoading(true); // Activa el estado de carga al iniciar el filtro de productos
    const filteredProducts = categoryId
      ? products.filter((item) => item.category === categoryId)
      : products;

    // Simulación de una llamada asíncrona
    const getProducts = new Promise((resolve) => {
      setTimeout(() => resolve(filteredProducts), 1000); // 1 segundo de retraso para simular la espera de datos
    });

    getProducts.then((res) => {
      setItems(res);
      setLoading(false); // Desactiva el estado de carga una vez que los productos han sido cargados
    });
  }, [categoryId]);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6">{greeting}</Typography>
      {loading ? (
        <Typography variant="h6">Cargando productos...</Typography>
      ) : (
        items.map((item) => (
          <div key={item.id} className="product-card">
            <img src={item.imageUrl} alt={item.title} style={{ maxWidth: '100%' }} />
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <p>Precio: ${item.price}</p>
            <p>Stock: {item.stock}</p>
          </div>
        ))
      )}
    </Box>
  );
};

export default ItemListContainer;



