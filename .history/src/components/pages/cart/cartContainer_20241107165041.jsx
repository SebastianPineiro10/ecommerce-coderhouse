import { useState, useEffect } from "react";
import { useCart } from "../../../context/CartContext"; // Hook del carrito
import { db } from "../../../firebase"; // Asegúrate de importar la referencia a Firebase

const CartContainer = () => {
  const { cart, setCart, removeFromCart, updateQuantity, getTotal, getTotalQuantity } = useCart();

  // Función para agregar productos al carrito
  const handleAddToCart = async (product) => {
    // Verifica si el producto ya está en el carrito
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      // Si el producto ya existe, solo actualiza la cantidad
      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 } // Incrementa la cantidad del producto
          : item
      );

      setCart(updatedCart); // Actualiza el carrito en el estado

      // Actualiza el carrito en Firebase
      await db.collection("cart").doc(product.id).update({
        quantity: existingProduct.quantity + 1,
      });
    } else {
      // Si el producto no está en el carrito, lo agrega como un nuevo producto
      const newProduct = { ...product, quantity: 1 };

      setCart([...cart, newProduct]); // Actualiza el carrito en el estado

      // Agrega el nuevo producto a Firebase
      await db.collection("cart").add(newProduct);
    }
  };

  const handleRemoveFromCart = async (productId) => {
    // Elimina el producto del carrito (tanto localmente como en Firebase)
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    await db.collection("cart").doc(productId).delete(); // Elimina de Firebase
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity <= 0) return; // Evita que la cantidad sea 0 o negativa

    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );

    setCart(updatedCart); // Actualiza el carrito local

    // Actualiza Firebase con la nueva cantidad
    await db.collection("cart").doc(productId).update({
      quantity: newQuantity,
    });
  };

  const handleCheckout = () => {
    // Simula la compra y muestra el resumen
    alert(`Total a pagar: $${getTotal().toFixed(2)} con ${getTotalQuantity()} productos`);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 2, fontWeight: "bold" }}>
        Carrito de Compras
      </Typography>

      {cart.length === 0 ? (
        <Typography variant="h6" sx={{ color: "gray" }}>
          Tu carrito está vacío.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {cart.map((product) => (
            <Grid item xs={12} md={6} key={product.id}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  border: "1px solid #ccc",
                  padding: 2,
                  borderRadius: 2,
                  boxShadow: 2,
                  marginBottom: 2,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginRight: 16,
                    }}
                  />
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    {product.title}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="body1" sx={{ marginRight: 2 }}>
                    ${product.price} x {product.quantity}
                  </Typography>

                  <TextField
                    type="number"
                    value={product.quantity}
                    onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                    sx={{ width: 60, marginRight: 2 }}
                    inputProps={{
                      min: 1,
                      style: { textAlign: "center" },
                    }}
                  />
                  <IconButton
                    color="error"
                    onClick={() => handleRemoveFromCart(product.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}

      <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 3 }}>
        <Typography variant="h6" sx={{ marginRight: 2 }}>
          Total: ${getTotal().toFixed(2)}
        </Typography>
        <Typography variant="h6">
          ({getTotalQuantity()} productos)
        </Typography>
      </Box>

      {cart.length > 0 && (
        <Box sx={{ marginTop: 2 }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ width: "100%", padding: "12px", fontSize: "16px", fontWeight: "bold" }}
            onClick={handleCheckout}
          >
            Finalizar compra
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default CartContainer;
