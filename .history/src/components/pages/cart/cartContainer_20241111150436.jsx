import { useCart } from "../../../context/CartContext"; // Usamos el contexto
import { Link } from "react-router-dom";

const CartContainer = () => {
  const { cart, resetCart, removeFromCart, getTotalAmount } = useCart(); // Obtenemos funciones del contexto
  const totalEnElCarrito = getTotalAmount(); // Total del carrito

  return (
    <div>
      <h1>Tu Carrito</h1>

      {cart.length === 0 ? (
        <p>Tu carrito está vacío</p>
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
            <button onClick={() => removeFromCart(product.id)}>Eliminar</button>
          </div>
        ))
      )}

      {cart.length > 0 && (
        <div>
          <button onClick={resetCart}>Limpiar carrito</button>
          <h2 style={{ color: "red" }}>
            El total a pagar es ${totalEnElCarrito.toFixed(2)}
          </h2>
          <Link to="/cart">Ver carrito</Link>
        </div>
      )}
    </div>
  );
};

export default CartContainer;
