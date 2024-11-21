import { useState } from "react";
import { useCart } from "./CartContext"; // Importamos el hook para acceder al carrito

const Counter = ({ stock, idProducto }) => {
  const [contador, setContador] = useState(1); // Estado para el contador
  const { cart, addToCart, getTotalQuantity } = useCart(); // Usamos el contexto del carrito

  // Obtenemos la cantidad total en el carrito para este producto
  const totalInCart = getTotalQuantity(idProducto);

  // Función para incrementar el contador
  const sumar = () => {
    if (contador + totalInCart < stock) {
      setContador(contador + 1); // Incrementamos el contador si no excede el stock
    } else {
      alert("Stock máximo alcanzado");
    }
  };

  // Función para decrementar el contador
  const restar = () => {
    if (contador > 1) {
      setContador(contador - 1); // Decrementamos el contador si es mayor a 1
    }
  };

  // Función para agregar al carrito
  const agregarAlCarrito = () => {
    addToCart({ id: idProducto, quantity: contador }); // Agregamos el producto al carrito
  };

  return (
    <div style={{ margin: "50px" }}>
      <div>
        <button onClick={sumar}>+ 1</button>
        <h2>
          Cantidad: {contador} - {stock - totalInCart} disponible(s)
        </h2>
        <button onClick={restar}>-</button>
      </div>
      <div>
        <button onClick={agregarAlCarrito}>Agregar al carrito</button>
      </div>
    </div>
  );
};

export default Counter;


