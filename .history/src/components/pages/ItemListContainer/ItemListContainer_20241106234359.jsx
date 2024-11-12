import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Importar PropTypes
import { useParams } from 'react-router-dom';
import { products } from '../../../products';
import { Box, Typography, Skeleton, Grid } from '@mui/material';
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

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        {greeting}
      </Typography>

      {items.length === 0 ? (
        <Grid container spacing={2}>
          {/* Skeletons representando productos */}
          {[...Array(6)].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box sx={{ border: '1px solid #ddd', borderRadius: '8px', padding: 2 }}>
                <Skeleton variant="rectangular" width="100%" height={200} />
                <Skeleton variant="text" width="80%" sx={{ marginTop: 2 }} />
                <Skeleton variant="text" width="60%" sx={{ marginTop: 1 }} />
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        <ItemList items={items} />
      )}
    </Box>
  );
};

// PropTypes para validación de las propiedades
ItemListContainer.propTypes = {
  greeting: PropTypes.string.isRequired, // 'greeting' debe ser una cadena
};

export default ItemListContainer;





