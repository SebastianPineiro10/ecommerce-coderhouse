import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { Box, Typography, Skeleton, Button } from "@mui/material";
import { useCart } from "../../../context/CartContext"; // Usamos el hook del carrito
import ItemList from "./ItemList";

export const ItemListContainer = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, "products");
        const querySnapshot = await getDocs(productsCollection);
        const productsFromFirestore = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setItems(productsFromFirestore);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product); // Agregar al carrito
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        Bienvenidos a nuestra tienda
      </Typography>

      {loading ? (
        <Skeleton variant="rectangular" width={200} height={100} />
      ) : (
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {items.map((product) => (
            <Box key={product.id} sx={{ width: 200, margin: 2 }}>
              <img
                src={product.imageUrl}
                alt={product.title}
                style={{ width: "100%", height: "150px", objectFit: "cover" }}
              />
              <Typography variant="h6">{product.title}</Typography>
              <Typography variant="body1">${product.price}</Typography>
              <Button
                variant="contained"
                onClick={() => handleAddToCart(product)}
                sx={{ marginTop: 1 }}
              >
                Añadir al carrito
              </Button>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};
