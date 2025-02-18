import {
  Button,
  Box,
  Container,
  Typography,
  Grid,
  CircularProgress,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
}

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [category, setCategory] = useState<string>(""); // Track category selection
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

  // Filtering logic
  const handleFilter = (category: string) => {
    setCategory(category);
  };

  const filteredProducts =
    category === ""
      ? products
      : products.filter((product) => product.category === category);

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
                fontWeight={"bold"}
                sx={{ my: 2, textAlign: "left", ml: -3 }}
                gutterBottom
              >
                Featured Products
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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

                {/* Filtering Dropdown */}
                <FormControl sx={{ minWidth: 150, mr: { xs: -3, sm: -3 } }}>
                  <InputLabel sx={{ mb: 5, fontSize: 16 }} variant="filled">
                    Filter by Category
                  </InputLabel>
                  <Select
                    value={category}
                    onChange={(e) => handleFilter(e.target.value)}
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="electronics">Electronics</MenuItem>
                    <MenuItem value="jewelery">Jewelry</MenuItem>
                    <MenuItem value="men's clothing">Men's Clothing</MenuItem>
                    <MenuItem value="women's clothing">
                      Women's Clothing
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Container>

          <Grid container spacing={3}>
            {filteredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
};

export default Home;
