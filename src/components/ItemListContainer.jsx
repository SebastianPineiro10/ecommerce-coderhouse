import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const ItemListContainer = ({ greeting }) => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4">{greeting}</Typography>
    </Box>
  );
};

export default ItemListContainer;
