import PropTypes from 'prop-types';
import { Skeleton, Box, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where, addDoc, updateDoc, doc } from "firebase/firestore"; 
import { db } from "../../../firebaseConfig";
import { products } from "../../../products"; 
import ItemList from "./ItemList";
import "ItemlistContainer.css";

export const ItemListContainer = ({greeting}) => {
  const { categoryId } = useParams();
  const [items, setItems] = useState([]);
  const [isAdmin] = useState(false); 

 
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

    
    const querySnapshot = await getDocs(productsCollection);
    const existingProducts = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    
    for (let product of products) {
      
      const existingProduct = existingProducts.find(
        (existing) => existing.title === product.title
      );

      if (existingProduct) {
        
        const productRef = doc(db, "products", existingProduct.id); 
        await updateDoc(productRef, {
          ...product, 
        });
        console.log(`Producto actualizado: ${product.title}`);

        
        product.isUploaded = true;
      } else {
        
        await addDoc(productsCollection, product);
        console.log(`Producto agregado: ${product.title}`);

        
        product.isUploaded = true;
      }
    }

   
    alert("Productos actualizados o agregados correctamente!");
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h2" className="welcome-title">
        {greeting}
      </Typography>

     
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
ItemListContainer.propTypes = {
  greeting: PropTypes.string.isRequired,  
};

export default ItemListContainer;

