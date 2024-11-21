import { useState } from "react";
import { useCart } from "./CartContext"; // Importamos el contexto del carrito
import { toast } from "sonner"; // Importamos el toast para las notificaciones

const CartContainer = () => {
  const { cart, removeById, resetCart, getTotalAmount, getTotalQuantity } = useCart(); // Extraemos las funciones y datos del carrito
  const [quantity, setQuantity] = useState({}); // Para gestionar la cantidad de productos (opcional)

  // Función para manejar la eliminación de un producto
  const handleRemove = (id) => {
    removeById(id); // Llamamos a la función para eliminar un producto del carrito
  };

  // Función para manejar el vaciado del carrito
  const handleClearCart = () => {
    resetCart(); // Llamamos a la función para vaciar el carrito
  };

  // Función para manejar la actualización de la cantidad
  const handleUpdateQuantity = (id, newQuantity) => {
    // Aquí podrías agregar una función que actualice la cantidad de productos
    // Si tienes implementado un `updateQuantity` en el CartContext
  };

  return (
    <div className="cart-container">
      <h2>Mi carrito</h2>
      {cart.length === 0 ? (
        <p>No hay productos en el carrito</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              <p>Precio: ${item.price}</p>
              <p>Cantidad: {item.quantity}</p>
              <button onClick={() => handleRemove(item.id)}>Eliminar</button>
            </div>
          ))}
          <div className="cart-summary">
            <h3>Total: ${getTotalAmount()}</h3>
            <h3>Total de productos: {getTotalQuantity()}</h3>
            <button onClick={handleClearCart}>Vaciar carrito</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartContainer;















