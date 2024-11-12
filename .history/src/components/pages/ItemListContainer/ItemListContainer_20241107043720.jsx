import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { Box, Typography, Skeleton } from "@mui/material";
import ItemList from "./ItemList"; // Importamos el componente de lista de productos
import { useCart } from "../../../context/CartContext"; // Usamos el hook del carrito

export const ItemListContainer = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true); // Manejo del estado de carga
  const { addToCart } = useCart();

  // Cargar productos desde Firebase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, "products");
        const querySnapshot = await getDocs(productsCollection);
        const productsFromFirestore = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setItems(productsFromFirestore); // Guardamos los productos en el estado
      } catch (error) {
        console.error("Error al cargar productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts(); // Ejecutamos la función para cargar los productos
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        Bienvenidos a nuestra tienda
      </Typography>

      {loading ? (
        <Skeleton variant="rectangular" width={200} height={100} />
      ) : (
        <ItemList items={items} /> // Renderizamos las tarjetas de productos
      )}
    </Box>
  );
};
