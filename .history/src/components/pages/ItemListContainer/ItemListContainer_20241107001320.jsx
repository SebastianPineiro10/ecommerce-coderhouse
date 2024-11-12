import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { products } from '../../../products'; // Ruta de los productos
import { Box, Typography, Skeleton, Grid } from '@mui/material'; // Asegúrate de importar Skeleton desde MUI
import ItemList from './ItemList';

const ItemListContainer = ({ greeting }) => {
  const { categoryId } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const filteredProducts = categoryId
        ? products.filter((item) => item.category === categoryId)
        : products;

      setItems(filteredProducts);
    };

    fetchProducts();
  }, [categoryId]);

  // Renderiza Skeletons mientras no hay productos
  const renderSkeletons = () => {
    const skeletonCount = 6; // Cantidad de productos a simular
    return (
      <Grid container spacing={2}>
        {[...Array(skeletonCount)].map((_, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box sx={{ border: '1px solid #ddd', borderRadius: '8px', padding: 2 }}>
              <Skeleton variant="rectangular" width="100%" height={200} />
              <Skeleton variant="text" width="80%" sx={{ marginTop: 2 }} />
              <Skeleton variant="text" width="60%" sx={{ marginTop: 1 }} />
            </Box>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        {greeting}
      </Typography>

      {/* Mostrar Skeletons mientras se cargan los productos */}
      {items.length === 0 ? renderSkeletons() : <ItemList items={items} />}
    </Box>
  );
};

// PropTypes para validación de las propiedades
ItemListContainer.propTypes = {
  greeting: PropTypes.string.isRequired, // 'greeting' debe ser una cadena
};

export default ItemListContainer;





