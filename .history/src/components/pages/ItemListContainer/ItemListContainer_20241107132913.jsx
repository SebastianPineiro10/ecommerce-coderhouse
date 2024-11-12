import { Skeleton, Box, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where, addDoc, updateDoc, doc } from "firebase/firestore"; 
import { db } from "../../../firebaseConfig";
import { products } from "../../../products"; // Importa los productos
import ItemList from "./ItemList";

export const ItemListContainer = () => {
  const { categoryId } = useParams();
  const [items, setItems] = useState([]);
  const [isAdmin, setIsAdmin] = useState(true); // Suponemos que eres un admin por ahora

  // Fetch de productos desde Firestore
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

  // Función para subir o actualizar productos
  const uploadProductsToFirestore = async () => {
    const productsCollection = collection(db, "products");

    // Obtener los productos ya existentes en Firestore
    const querySnapshot = await getDocs(productsCollection);
    const existingProducts = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    // Filtrar los productos que necesitan ser actualizados (compara los productos existentes con los nuevos)
    const updatedProducts = products.filter(product => {
      // Buscar el producto en Firestore por título
      const existingProduct = existingProducts.find(
        (existing) => existing.title === product.title
      );

      if (existingProduct) {
        // Si el producto existe, verifica si hay cambios en algún campo
        return (
          existingProduct.isUploaded !== product.isUploaded || // Cambio en isUploaded
          existingProduct.price !== product.price || // Cambio en precio
          existingProduct.description !== product.description || // Cambio en descripción
          existingProduct.stock !== product.stock // Cambio en stock
        );
      }
      return false;
    });

    // Recorrer los productos actualizados
    for (const product of updatedProducts) {
      const existingProduct = existingProducts.find(
        (existing) => existing.title === product.title
      );

      if (existingProduct) {
        // Si el producto ya existe, actualizarlo
        const productRef = doc(db, "products", existingProduct.id); // Obtener la referencia al documento de Firestore
        await updateDoc(productRef, {
          ...product, // Actualiza todos los campos del producto
        });
        console.log(`Producto actualizado: ${product.title}`);
      }
    }

    // Mostrar mensaje de éxito
    alert("Productos actualizados correctamente!");
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

