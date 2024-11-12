import React from 'react';
import { Card, CardContent, Button, Typography, CardMedia } from '@mui/material';

const ProductCard = ({ product, onViewDetails }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={product.imageUrl}
        alt={product.name}
      />
      <CardContent>
        <Typography variant="h6">{product.name}</Typography>
        <Typography variant="body2" color="textSecondary">
          {product.description}
        </Typography>
        <Typography variant="h6">${product.price}</Typography>
      </CardContent>
      <Button variant="contained" onClick={() => onViewDetails(product)}>
        Ver detalles
      </Button>
    </Card>
  );
};

export default ProductCard;



