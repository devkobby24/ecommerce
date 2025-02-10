import {
  Button,
  Box,
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
  title: string;
  price: string;
  image: string;
}
// Mock product data
// const products = [
//   {
//     id: 1,
//     title: "Wireless Headphones",
//     price: "$120",
//     image: "https://source.unsplash.com/300x200/?headphones",
//   },
//   {
//     id: 2,
//     title: "Smartphone",
//     price: "$699",
//     image: "https://source.unsplash.com/300x200/?smartphone",
//   },
//   {
//     id: 3,
//     title: "Gaming Laptop",
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
      <Typography
        variant="h3"
        fontWeight="bold"
        color="black"
        sx={{ fontSize: { sm: 14, md: 60, lg: 68 } }}
        gutterBottom
      >
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
        sx={{ mt: 3, px: 4, fontSize: "1.2rem", borderRadius: 7 }}
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
          <Container sx={{ py: 4 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap", // Prevents layout breaking on smaller screens
              }}
            >
              {/* Title */}
              <Typography
                variant="h4"
                color="black"
                sx={{ my: 2 }}
                gutterBottom
              >
                Featured Products
              </Typography>

              {/* Buttons */}
              <Box
                sx={{
                  display: "flex",
                  gap: 2, // Adds spacing between buttons
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ borderRadius: 5, boxShadow: 3 }}
                >
                  Sort
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ borderRadius: 5, boxShadow: 3 }}
                >
                  Filter
                </Button>
              </Box>
            </Box>
          </Container>
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item xs={12} sm={12} md={4} key={product?.id}>
                <Card sx={{ padding: "2px", borderRadius: 2, boxShadow: 5 }}>
                  <CardMedia
                    component="img"
                    height="200"
                    width="200"
                    image={product.image}
                    alt={product.title}
                    sx={{ objectFit: "contain" }}
                  />
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        fontSize: { sm: 12, md: 16, lg: 18 },
                        display: "-webkit-box",
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                      gutterBottom
                    >
                      {product.title}
                    </Typography>
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
                        sx={{ mt: 1, borderRadius: 5 }}
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
