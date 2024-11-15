import { useState } from 'react';
import { useCart } from '../../../context/CartContext';
import { db } from '../../../firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import { toast } from 'sonner';

const Checkout = () => {
  const { cart, getTotal, clearCart } = useCart();
  const [userData, setUserData] = useState({
    name: '',
    address: '',
    email: '',
  });
  const [orderId, setOrderId] = useState(null);  // Para almacenar el ID de la orden

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const saveOrder = async (orderData) => {
    try {
      const docRef = await addDoc(collection(db, 'orders'), orderData);
      setOrderId(docRef.id); // Guardamos el ID en el estado
      clearCart(); // Limpiar carrito después de guardar
      toast.success(`Compra realizada con éxito. ID de la orden: ${docRef.id}`);
      return docRef.id; // Retornamos el ID
    } catch (e) {
      console.error('Error al guardar la orden: ', e);
      toast.error('Hubo un error al realizar la compra.');
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

      {orderId && (
        <div>
          <h3>Tu orden ha sido procesada con éxito. ID de la orden: {orderId}</h3>
        </div>
      )}
    </div>
  );
};

export default Checkout;



