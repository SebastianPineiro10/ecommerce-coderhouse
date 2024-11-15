import { useState } from 'react';
import { useCart } from '../../../context/CartContext';
import { db } from '../../../firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';

const Checkout = () => {
  const { cart, getTotal, clearCart } = useCart();
  const [userData, setUserData] = useState({
    name: '',
    address: '',
    email: '',
  });

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const saveOrder = async (orderData) => {
    try {
      const docRef = await addDoc(collection(db, 'orders'), orderData);
      console.log('Orden guardada con ID:', docRef.id);
      clearCart(); // Limpiar carrito después de guardar
    } catch (e) {
      console.error('Error al guardar la orden: ', e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const order = {
      userData,
      cart,
      total: getTotal(),
      date: new Date(),
    };

    await saveOrder(order);

    alert('Compra realizada con éxito');
  };

  return (
    <div>
      <h2>Finalizar Compra</h2>
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
