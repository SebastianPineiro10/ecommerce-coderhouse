import { useContext } from '../../../context/CartContext'; 
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { CartContext } from '../../../context/CartContext';

export const CartWidget = () => {
  const { cart } = useContext(CartContext); 



  return (
    <Link to="/cart" style={{ textDecoration: 'none' }}>
      <IconButton aria-label="cart">
        <Badge badgeContent={cart.length} color="secondary">
          <ShoppingBagIcon />
        </Badge>
      </IconButton>
    </Link>
  );
};

export default CartWidget;
