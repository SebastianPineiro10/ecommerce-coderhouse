import { useCart } from '../../../context/CartContext'; // Usar el contexto del carrito
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

const CartWidget = () => {
  const { cart } = useCart(); // Accedemos al carrito desde el contexto

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0); // Contamos los productos en el carrito

  return (
    <Link to="/cart" style={{ textDecoration: 'none' }}>
      <IconButton aria-label="cart">
        <Badge badgeContent={itemCount} color="secondary">
          <ShoppingBagIcon />
        </Badge>
      </IconButton>
    </Link>
  );
};

export default CartWidget;
