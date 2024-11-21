import { useState } from "react";

const Counter = ({ stock, agregarAlCarrito, totalInCart }) => {
  const [contador, setContador] = useState(1);

  const restar = () => {
    // Solo permite restar si el contador es mayor que 1
    if (contador > 1) {
      setContador(contador - 1);
    }
  };

  const agregar = () => {
    // Solo permite sumar si no excede el stock disponible
    if (contador < stock - totalInCart) {
      setContador(contador + 1);
    } else {
      alert("No puedes agregar más productos al carrito. Stock máximo alcanzado.");
    }
  };

  return (
    <div style={{ margin: "50px" }}>
      <button onClick={restar}>Restar</button>
      <h2>Contador = {contador}</h2>
      <button onClick={agregar}>Sumar</button>

      <button onClick={() => agregarAlCarrito(contador)}>Agregar al carrito</button>
    </div>
  );
};

export default Counter;

