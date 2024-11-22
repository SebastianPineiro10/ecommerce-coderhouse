import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import ItemDetail from "./ItemDetail"; 
import { ClipLoader } from "react-spinners"; 

const ItemDetailContainer = () => {
  const { itemId } = useParams(); 
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true); 
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const docRef = doc(db, "products", itemId);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          setItem(docSnapshot.data()); 
        } else {
          console.error("Producto no encontrado");
        }
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchItem();
  }, [itemId]);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "50px" }}>
        <ClipLoader size={50} color={"#123abc"} loading={loading} />
      </div>
    ); 
  }

  return (
    <div>
      {item ? (
        <ItemDetail item={item} />
      ) : (
        <p>No se encontró el producto.</p>
      )}
    </div>
  );
};

export default ItemDetailContainer;








