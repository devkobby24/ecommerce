import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Grid,
} from "@mui/material";

// Define the Product Type
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>(); // Get product ID from URL
  const navigate = useNavigate(); // For navigation
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.log("Error fetching product", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <Container sx={{ mt: 4 }}>
      {loading ? (
        <Grid container justifyContent="center">
          <CircularProgress />
        </Grid>
      ) : product ? (
        <Card sx={{ maxWidth: 800, mx: "auto", p: 2 }}>
          <CardMedia
            component="img"
            height="400"
            image={product.image}
            alt={product.title}
            sx={{ objectFit: "contain" }}
          />
          <CardContent> 
            <Typography variant="h4" gutterBottom>
              {product.title}
            </Typography>
            <Typography variant="h6" color="primary" gutterBottom>
              ${product.price}
            </Typography>
            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Category: {product.category}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              sx={{ mt: 2 }}
              onClick={() => navigate("/")}
            >
              Back to Home
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Typography variant="h6" align="center">
          Product not found.
        </Typography>
      )}
    </Container>
  );
};

export default ProductDetails;
