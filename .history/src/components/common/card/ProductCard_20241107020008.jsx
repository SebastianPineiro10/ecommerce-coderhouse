import { useState } from 'react';
import { Modal, Box, Button, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const ProductCard = ({ title, price, image, id, onViewDetails }) => {
  return (
    <Box sx={{ border: '1px solid #ddd', padding: 2, marginBottom: 2 }}>
      <img src={image} alt={title} style={{ width: '100%', height: 'auto' }} />
      <Typography variant="h6">{title}</Typography>
      <Typography variant="body1">${price}</Typography>
      <Button onClick={() => onViewDetails(id)}>Ver detalles</Button>
    </Box>
  );
};

ProductCard.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onViewDetails: PropTypes.func.isRequired,
};

export default ProductCard;


