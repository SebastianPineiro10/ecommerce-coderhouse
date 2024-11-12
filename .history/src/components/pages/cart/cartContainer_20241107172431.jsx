import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../../context/CartContext";

const CartContainer = () => {
  const { cart, resetCart, removeById, getTotalAmount } = useContext(CartContext);

  const totalEnElCarrito = getTotalAmount(); // Obtiene el total a pagar

  return (
    <div>
      <h1>Carrito de Compras</h1>

      {/* Mostrar los productos del carrito */}
      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        cart.map((product) => (
          <div
            key={product.id}
            style={{
              border: "2px solid black",
              width: "300px",
              marginBottom: "10px",
              padding: "10px",
            }}
          >
            <h2>{product.title}</h2>
            <h3>Cantidad: {product.quantity}</h3>
            <button onClick={() => removeById(product.id)}>Eliminar</button>
          </div>
        ))
      )}

      {/* Mostrar botón para limpiar el carrito si hay productos */}
      {cart.length > 0 && (
        <button onClick={resetCart} style={{ marginTop: "10px" }}>
          Limpiar carrito
        </button>
      )}

      {/* Mostrar el total a pagar */}
      <h2 style={{ color: cart.length > 0 ? "red" : "blue" }}>
        El total a pagar es: ${totalEnElCarrito.toFixed(2)}
      </h2>

      {/* Enlace para finalizar la compra */}
      <Link to="/checkout" style={{ color: "black" }}>
        Finalizar compra
      </Link>
    </div>
  );
};

export default CartContainer;



