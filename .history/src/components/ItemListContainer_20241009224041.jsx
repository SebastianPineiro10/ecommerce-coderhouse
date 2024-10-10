import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import './ItemListContainer.css';

const ItemListContainer = ({ greeting }) => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="body1">{greeting}</Typography>
    </Box>
  );
};

export default ItemListContainer;
