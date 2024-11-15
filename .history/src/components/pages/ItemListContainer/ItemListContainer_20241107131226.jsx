import { Skeleton, Box, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where, addDoc, updateDoc, doc } from "firebase/firestore"; // Agregado `updateDoc` y `doc`
import { db } from "../../../firebaseConfig";
import { products } from "../../../products"; // Importa los productos
import ItemList from "./ItemList";

export const ItemListContainer = () => {
  const { categoryId } = useParams();
  const [items, setItems] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false); // Suponemos que eres un admin por ahora

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

    // Obtener los productos ya existentes en Firestore
    const querySnapshot = await getDocs(productsCollection);
    const existingProducts = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    // Recorrer los productos de products.js
    for (const product of products) {
      // Verificar si el producto ya existe en Firestore
      const existingProduct = existingProducts.find(
        (existing) => existing.title === product.title
      );

      if (existingProduct) {
        // Si el producto ya existe, actualizarlo
        const productRef = doc(db, "products", existingProduct.id); // Obtener la referencia al documento de Firestore
        await updateDoc(productRef, {
          ...product, // Actualizar todos los campos del producto
        });
        console.log(`Producto actualizado: ${product.title}`);
      } else {
        // Si el producto no existe, agregarlo como nuevo
        await addDoc(productsCollection, product);
        console.log(`Producto agregado: ${product.title}`);
      }
    }
    alert("Productos actualizados o subidos correctamente!");
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        Bienvenidos a SP Deposito Dental
      </Typography>

      {/* Botón solo visible si esAdmin es true */}
      {isAdmin && (
        <Button
          variant="contained"
          color="primary"
          onClick={uploadProductsToFirestore}
          sx={{ marginBottom: 2 }}
        >
          Subir/Actualizar Productos en Firestore
        </Button>
      )}

      {items.length === 0 ? (
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 2 }}>
          {/* Skeleton para las tarjetas de producto */}
          {Array.from({ length: 6 }).map((_, index) => (
            <Box key={index} sx={{ padding: 2 }}>
              <Skeleton variant="rectangular" width="100%" height={200} sx={{ borderRadius: 1 }} /> {/* Imagen */}
              <Skeleton variant="text" width="60%" sx={{ marginTop: 1 }} /> {/* Título */}
              <Skeleton variant="text" width="40%" sx={{ marginTop: 0.5 }} /> {/* Precio */}
            </Box>
          ))}
        </Box>
      ) : (
        <ItemList items={items} />
      )}
    </Box>
  );
};