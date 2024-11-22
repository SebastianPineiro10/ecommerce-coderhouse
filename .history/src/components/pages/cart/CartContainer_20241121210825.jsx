import React from 'react';
import { useCart } from '../context/CartContext'; // Ajusta la ruta según tu estructura de archivos
import { Grid, Button } from '@mui/material';

const CartContainer = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    getTotal,
    getTotalQuantity,
    formatPrice,
  } = useCart();

  return (
    <div>
      <h2>Tu Carrito de Compras</h2>
      {cart.length === 0 ? (
        <p>No tienes productos en el carrito.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <Grid container key={item.cartItemId} spacing={2}>
              <Grid item xs={6}>
                <p>{item.title}</p>
                <p>{formatPrice(item.price)} x {item.quantity}</p>
              </Grid>
              <Grid item xs={3}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => removeFromCart(item.cartItemId)}
                >
                  Eliminar
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                >
                  Aumentar
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  Disminuir
                </Button>
              </Grid>
            </Grid>
          ))}
          <div>
            <h3>Total: {formatPrice(getTotal())}</h3>
            <h4>Total de productos: {getTotalQuantity()}</h4>
            <Button
              variant="contained"
              color="primary"
              onClick={startCheckout}
            >
              Proceder al pago
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartContainer;


