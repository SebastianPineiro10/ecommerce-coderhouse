import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { products } from '../products';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const ItemListContainer = ({ greeting }) => {
  const { categoryId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    const filteredProducts = categoryId
      ? products.filter((item) => item.category === categoryId)
      : products;

    setItems(filteredProducts);
    setLoading(false); // Cambia el estado de carga una vez que se establecen los productos
  }, [categoryId]);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6">{greeting}</Typography>
      {loading ? ( // Muestra un mensaje mientras se cargan los productos
        <Typography variant="h6">Cargando productos...</Typography>
      ) : (
        items.map((item) => (
          <div key={item.id} className="product-card"> {/* Añade clase para estilos */}
            <img src={item.imageUrl} alt={item.title} style={{ maxWidth: '100%' }} />
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <p>Precio: ${item.price}</p>
            <p>Stock: {item.stock}</p> {/* Mostrar stock */}
            <p>Categoría: {item.category}</p> {/* Mostrar categoría */}
          </div>
        ))
      )}
    </Box>
  );
};

export default ItemListContainer;


