import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import ItemDetail from "./ItemDetail"; // Asegúrate de que este componente esté bien configurado

const ItemDetailContainer = () => {
  const { itemId } = useParams(); // Recuperamos el `itemId` de la URL
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true); // Para manejar la carga de los datos

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const docRef = doc(db, "products", itemId); // Creamos la referencia al documento en Firestore
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          setItem(docSnapshot.data()); // Si el producto existe, lo asignamos al estado
        } else {
          console.error("Producto no encontrado");
        }
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      } finally {
        setLoading(false); // Terminamos de cargar
      }
    };

    fetchItem(); // Ejecutamos la función para obtener el producto
  }, [itemId]); // Ejecuta el efecto cuando cambie el itemId

  if (loading) {
    return <div>Cargando...</div>; // O un spinner de carga
  }

  return (
    <div>
      {item ? (
        <ItemDetail item={item} /> // Pasamos los datos del producto al componente de detalle
      ) : (
        <p>No se encontró el producto.</p>
      )}
    </div>
  );
};

export default ItemDetailContainer;








