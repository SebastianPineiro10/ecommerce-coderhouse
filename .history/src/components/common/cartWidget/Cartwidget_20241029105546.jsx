import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';


const CartWidget = () => {
  const itemCount = 5; 

  return (
    <link to="/cart">
    <IconButton aria-label="cart">
      <Badge badgeContent={itemCount} color="secondary">
        <ShoppingBagIcon />
      </Badge>
    </IconButton>
    </link>
  );
};

export default CartWidget;