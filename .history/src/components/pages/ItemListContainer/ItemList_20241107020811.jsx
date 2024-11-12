import { useState } from 'react';
import { Modal, Box, Button, Typography, Grid } from '@mui/material';
import ProductCard from '../../common/card/ProductCard'; // Asegúrate de que la ruta sea correcta

const ItemList = ({ items }) => {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOpen = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Listado de productos
      </Typography>
      
      {/* Usamos Grid para distribuir las tarjetas en filas y columnas */}
      <Grid container spacing={2}>
        {items.length > 0 ? (
          items.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductCard
                product={product} // Pasa el producto completo
                onViewDetails={handleOpen} // Pasamos la función para abrir el modal
              />
            </Grid>
          ))
        ) : (
          <Typography variant="body1">No hay productos disponibles</Typography>
        )}
      </Grid>

      {/* Modal de Detalles del Producto */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ padding: 4, backgroundColor: 'white', maxWidth: 600, margin: 'auto', top: '20%' }}>
          {selectedProduct && (
            <>
              <Typography variant="h5">{selectedProduct.title}</Typography>
              <Typography variant="h6">${selectedProduct.price}</Typography>
              <Typography variant="body1">{selectedProduct.description}</Typography>
              <img src={selectedProduct.imageUrl} alt={selectedProduct.title} width="100%" />
              <Button onClick={handleClose}>Cerrar</Button>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default ItemList;


