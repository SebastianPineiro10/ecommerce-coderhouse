import { useCart } from '../../../context/CartContext';

const Brief = () => {
  const { cart, getTotal } = useCart();

  return (
    <div>
      <h2>Resumen de la Compra</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.cartItemId}>
            {item.title} - {item.quantity} x ${item.price} = ${item.quantity * item.price}
          </li>
        ))}
      </ul>
      <h3>Total: ${getTotal()}</h3>
    </div>
  );
};

export default Brief;