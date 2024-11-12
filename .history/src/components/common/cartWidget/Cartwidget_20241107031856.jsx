import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'; // Imports necesarios

const CartWidget = () => {
  const { cart } = useCart();

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

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

