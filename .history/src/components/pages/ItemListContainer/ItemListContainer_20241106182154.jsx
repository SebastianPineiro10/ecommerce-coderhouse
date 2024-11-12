import { useState, useEffect } from 'react';
import { Grid, Skeleton } from '@mui/material';
import ProductCard from './ProductCard';

const ItemListContainer = ({ category }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Simulación de una llamada a la API
    setTimeout(() => {
      // Aquí simulas la llamada a tu API
      setProductos([
        // Ejemplo de productos cargados
        { id: 1, title: 'Producto 1', imageUrl: 'https://via.placeholder.com/150', price: 10 },
        { id: 2, title: 'Producto 2', imageUrl: 'https://via.placeholder.com/150', price: 20 },
        // más productos...
      ]);
      setLoading(false);
    }, 2000);
  }, [category]);

  return (
    <Grid container spacing={3}>
      {loading ? (
        // Si está cargando, mostrar el Skeleton
        [...Array(6)].map((_, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Skeleton variant="rectangular" width="100%" height={200} />
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" width="80%" />
          </Grid>
        ))
      ) : (
        // Una vez cargados los productos, mostramos los ProductCard
        productos.map(product => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default ItemListContainer;





