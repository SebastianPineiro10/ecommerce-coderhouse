import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { products } from '../../../products'; // Asegúrate de que esta ruta sea correcta
import Box from '@mui/material/Box';
import ItemList from './ItemList'; // Aquí importas ItemList

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
      <h6>{greeting}</h6>
      {loading ? (
        <h4>Cargando productos...</h4>
      ) : (
        <ItemList items={items} /> // Aquí pasas los items a ItemList
      )}
    </Box>
  );
};

export default ItemListContainer;


