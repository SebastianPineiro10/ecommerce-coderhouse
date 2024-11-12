import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { products } from "../../../products";
import ItemList from "./ItemList";
import { Skeleton, Box, Typography, Button } from "@mui/material";

export const ItemListContainer = () => {
  const { categoryId } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, "products");
      let docsRef = productsCollection;

      if (categoryId) {
        docsRef = query(productsCollection, where("category", "==", categoryId));
      }

      const querySnapshot = await getDocs(docsRef);
      const productsFromFirestore = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setItems(productsFromFirestore);
    };

    fetchProducts();
  }, [categoryId]);

  const uploadProductsToFirestore = async () => {
    const productsCollection = collection(db, "products");

    /* Subir productos de products.js a Firestore
    for (const product of products) {
      await addDoc(productsCollection, product);
    }
    alert("Productos subidos correctamente!");
  }; */

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        Listado de productos
      </Typography>
      
      <Button
        variant="contained"
        color="primary"
        onClick={uploadProductsToFirestore}
        sx={{ marginBottom: 2 }}
      >
        Subir Productos a Firestore
      </Button>

      {items.length === 0 ? (
        <Skeleton variant="rectangular" width={200} height={100} />
      ) : (
        <ItemList items={items} />
      )}
    </Box>
  );
};






