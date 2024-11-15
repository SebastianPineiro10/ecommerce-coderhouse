// src/components/Checkout.js
import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { db } from '../../../firebaseConfig'; // Configuración de Firebase
import { addDoc, collection } from 'firebase/firestore';

const Checkout = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const [userData, setUserData] = useState({ name: '', address: '', email: '' });

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const order = {
      userData,
      cartItems,
      total: cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
      date: new Date(),
    };
    try {
      await addDoc(collection(db, 'orders'), order);
      clearCart();
      alert("Compra realizada con éxito");
    } catch (error) {
      console.error("Error al guardar la orden:", error);
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          placeholder="Nombre"
          value={userData.name}
          onChange={handleInputChange}
          required
        />
        <input
          name="address"
          type="text"
          placeholder="Dirección"
          value={userData.address}
          onChange={handleInputChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={userData.email}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Confirmar Compra</button>
      </form>
    </div>
  );
};

export default Checkout;
