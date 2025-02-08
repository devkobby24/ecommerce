import { useParams } from "react-router-dom";
import { Container, Typography } from "@mui/material";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <Container>
      <Typography variant="h4" fontSize={24} alignItems={'center'} textAlign={'center'}>Product Details - {id}</Typography>
      {/* Fetch and display product details here */}
    </Container>
  );
};

export default ProductDetails;
