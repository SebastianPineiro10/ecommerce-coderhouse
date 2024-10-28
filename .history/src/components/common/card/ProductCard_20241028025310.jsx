import { Link } from "react-router-dom";
import './ProductCard';

export const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.title} />
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Stock: {product.stock}</p>
      <p>Category: {product.category}</p>
      <Link to={`/item/${product.id}`}>
        <button>Ver detalle</button>
      </Link>
    </div>
  );
};

export default ProductCard;
