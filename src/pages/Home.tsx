import { useEffect, useState } from "react";
import { Container, CircularProgress, Grid } from "@mui/material";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import HeroSection from "../components/ui/HeroSection";
import SortFilterControls from "../components/SortFilterControls";

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
  const [category, setCategory] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle sorting
  const handleSort = (option: string) => {
    setSortOption(option);
    const sortedProducts = [...products];

    if (option === "price-asc") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (option === "price-desc") {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (option === "category") {
      sortedProducts.sort((a, b) => a.category.localeCompare(b.category));
    }

    setProducts(sortedProducts);
  };

  // Handle category filtering
  const handleFilter = (category: string) => {
    setCategory(category);
  };

  const filteredProducts =
    category === ""
      ? products
      : products.filter((product) => product.category === category);

  return (
    <Container>
      <HeroSection />

      {loading ? (
        <Grid container justifyContent="center">
          <CircularProgress />
        </Grid>
      ) : (
        <>
          <SortFilterControls
            sortOption={sortOption}
            category={category}
            handleSort={handleSort}
            handleFilter={handleFilter}
          />

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
