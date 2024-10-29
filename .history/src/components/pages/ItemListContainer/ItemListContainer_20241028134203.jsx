import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { products } from '../../../products';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ItemList from '../../common/itemList/ItemList';

const ItemListContainer = ({ greeting }) => {
  const { categoryId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const filteredProducts = categoryId
      ? products.filter((item) => item.category === categoryId)
      : products;

    const getProducts = new Promise((resolve) => {
      setTimeout(() => resolve(filteredProducts), 1000);
    });

    getProducts.then((res) => {
      setItems(res);
      setLoading(false);
    });
  }, [categoryId]);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6">{greeting}</Typography>
      {loading ? (
        <Typography variant="h6">Cargando productos...</Typography>
      ) : (
        <ItemList items={items} />
      )}
    </Box>
  );
};

export default ItemListContainer;

