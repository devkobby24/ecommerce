import {
  Button,
  Container,
  Typography,
  Grid2,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
}
// Mock product data
// const products = [
//   {
//     id: 1,
//     name: "Wireless Headphones",
//     price: "$120",
//     image: "https://source.unsplash.com/300x200/?headphones",
//   },
//   {
//     id: 2,
//     name: "Smartphone",
//     price: "$699",
//     image: "https://source.unsplash.com/300x200/?smartphone",
//   },
//   {
//     id: 3,
//     name: "Gaming Laptop",
//     price: "$1499",
//     image: "https://source.unsplash.com/300x200/?laptop",
//   },
// ];

const Home = () => {
  // Fetch real product data from API
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://fakestoreapi.com/products?sort=desc'"
        );
        setProducts(response.data);
      } catch (error) {
        console.log("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  return (
    <Container>
      {/* Hero Section */}
      <Typography variant="h2" fontWeight="bold" color="black" gutterBottom>
        Discover the Best Deals Online
      </Typography>
      <Typography
        color="gray"
        variant="h6"
        textAlign={"left"}
        sx={{ maxWidth: "600px", opacity: 0.9 }}
      >
        Explore a wide range of high-quality products at unbeatable prices.
        Start shopping now!
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        sx={{ mt: 3, px: 4, fontSize: "1.2rem" }}
      >
        Shop Now
      </Button>

      {/* Loading Indicator */}
      {loading ? (
        <Grid2 container justifyContent="center">
          <CircularProgress />
        </Grid2>
      ) : (
        <>
          <Typography variant="h4" gutterBottom>
            Featured Products
          </Typography>
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product?.id}>
                <Card sx={{ padding: '2px' , borderRadius: 2, boxShadow: 5 }}>
                  <CardMedia
                    component="img"
                    height="200"
                    width="200"
                    image={product.image}
                    alt={product.name}
                    sx={{ objectFit: "contain" }}
                  />
                  <CardContent>
                    <Typography variant="h6">{product.name}</Typography>
                    <Typography color="textSecondary">
                      ${product.price}
                    </Typography>
                    <Link
                      to={`/product/${product.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ mt: 1 }}
                      >
                        View Details
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
};

export default Home;
