import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../../context/CartContext";

const CartContainer = () => {
  const { cart, resetCart, removeById, getTotalAmount, getTotalQuantity } = useContext(CartContext);
  let totalEnElCarrito = getTotalAmount(); // Total a pagar
  let cantidadTotal = getTotalQuantity(); // Total de productos en el carrito

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "20px" }}>Carrito de Compras</h1>

      {cart.length === 0 ? (
        <h3 style={{ color: "gray" }}>Tu carrito está vacío</h3>
      ) : (
        cart.map((product) => (
          <div
            key={product.id}
            style={{
              border: "2px solid black",
              width: "100%",
              marginBottom: "10px",
              padding: "10px",
              borderRadius: "8px",
              boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            <h2 style={{ margin: "0 0 10px" }}>{product.title}</h2>
            <p>Cantidad: {product.quantity}</p>
            <p>Precio por unidad: ${product.price}</p>
            <button
              onClick={() => removeById(product.id)}
              style={{
                backgroundColor: "red",
                color: "white",
                padding: "8px 16px",
                border: "none",
                cursor: "pointer",
                borderRadius: "5px",
              }}
            >
              Eliminar
            </button>
          </div>
        ))
      )}

      {cart.length > 0 && (
        <>
          <div style={{ marginTop: "20px" }}>
            <button
              onClick={resetCart}
              style={{
                backgroundColor: "gray",
                color: "white",
                padding: "8px 16px",
                border: "none",
                cursor: "pointer",
                borderRadius: "5px",
                marginRight: "20px",
              }}
            >
              Limpiar carrito
            </button>
            <h3 style={{ color: "green" }}>
              Total a pagar: ${totalEnElCarrito.toFixed(2)}
            </h3>
            <h4 style={{ color: "blue" }}>Total de productos: {cantidadTotal}</h4>
          </div>

          <div style={{ marginTop: "20px" }}>
            <Link to="/checkout" style={{ textDecoration: "none" }}>
              <button
                style={{
                  backgroundColor: "#4CAF50",
                  color: "white",
                  padding: "10px 20px",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "5px",
                }}
              >
                Finalizar compra
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CartContainer;



