import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../../context/CartContext";

const CartContainer = () => {
  const { cart, resetCart, removeById, getTotalAmount } = useContext(CartContext);  // Llamar a getTotalAmount

  const totalEnElCarrito = getTotalAmount(); // Llamar a getTotalAmount en lugar de getTotal

  return (
    <div>
      <h1>Aca el carrito</h1>

      {cart.length === 0 ? (
        <h3>Tu carrito está vacío.</h3>
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
            <p>Precio por unidad: ${product.price}</p>
            <button onClick={() => removeById(product.id)}>Eliminar</button>
          </div>
        ))
      )}

      {cart.length > 0 && (
        <button onClick={resetCart}>Limpiar carrito</button>
      )}

      <h2 style={{ color: cart.length > 0 ? "red" : "blue" }}>
        El total a pagar es: ${totalEnElCarrito.toFixed(2)}  {/* Mostrar el total */}
      </h2>

      <Link to="/checkout">
        <button>Finalizar compra</button>
      </Link>
    </div>
  );
};

export default CartContainer;









