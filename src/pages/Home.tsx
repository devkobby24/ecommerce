import {
  Button,
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  title: string;
  price: number; // Changed to number for sorting
  category: string;
  image: string;
}

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortOption, setSortOption] = useState<string>(""); // Track sorting selection

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
      } catch (error) {
        console.log("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Sorting logic
  const handleSort = (option: string) => {
    setSortOption(option);
    let sortedProducts = [...products];

    if (option === "price-asc") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (option === "price-desc") {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (option === "category") {
      sortedProducts.sort((a, b) => a.category.localeCompare(b.category));
    }

    setProducts(sortedProducts);
  };

  return (
    <Container>
      {/* Hero Section */}
      <Typography
        variant="h3"
        fontWeight="bold"
        color="black"
        sx={{
          fontSize: { xs: 44, sm: 48, md: 60, lg: 68 },
          textAlign: { xs: "center", md: "center" },
        }}
        gutterBottom
      >
        Discover the Best Deals Online
      </Typography>
      <Typography
        color="gray"
        variant="h6"
        textAlign={"left"}
        sx={{
          maxWidth: "600px",
          opacity: 0.9,
          textAlign: { xs: "center", md: "center" },
          display: "flex",
          margin: "auto",
          my: 3,
        }}
        gutterBottom
      >
        Explore a wide range of high-quality products at unbeatable prices.
        Start shopping now!
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        sx={{
          mt: 6,
          px: 4,
          fontSize: "1.2rem",
          borderRadius: 7,
          display: { xs: "flex", md: "block" },
          margin: "auto",
        }}
      >
        Shop Now
      </Button>

      {/* Loading Indicator */}
      {loading ? (
        <Grid container justifyContent="center">
          <CircularProgress />
        </Grid>
      ) : (
        <>
          <Container sx={{ py: 4 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              {/* Title */}
              <Typography
                variant="h4"
                color="black"
                fontWeight={'bold'}
                sx={{ my: 2, textAlign: "left", ml: -2 }}
                gutterBottom
              >
                Featured Products
              </Typography>

              {/* Sorting Dropdown */}
              <FormControl sx={{ minWidth: 150, ml: { xs: -2, sm: -2 } }}>
                <InputLabel sx={{ mb: 5, fontSize: 16 }} variant="filled">
                  Sort By
                </InputLabel>
                <Select
                  value={sortOption}
                  onChange={(e) => handleSort(e.target.value)}
                  aria-placeholder="Sort By"
                  displayEmpty
                >
                  <MenuItem value="price-asc">Price: Low to High</MenuItem>
                  <MenuItem value="price-desc">Price: High to Low</MenuItem>
                  <MenuItem value="category">Category</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Container>

          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Card sx={{ padding: "2px", borderRadius: 2, boxShadow: 5 }}>
                  <CardMedia
                    component="img"
                    height="200"
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
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "end", flexDirection: "column", gap: 1 }}>
                      <Typography color="textSecondary">
                        ${product.price}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {product.category}
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
                    </Box>
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
