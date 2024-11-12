import { useState } from 'react';
import { Modal, Box, Button, Typography } from '@mui/material';

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
      <Box className="product-grid">
        {items.length > 0 ? (
          items.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              price={product.price}
              image={product.imageUrl}
              id={product.id}
              onViewDetails={handleOpen}
            />
          ))
        ) : (
          <Typography variant="body1">No hay productos disponibles</Typography>
        )}
      </Box>

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


