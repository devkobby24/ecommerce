import React from "react";
import { Container, Grid, Alert, Skeleton, Box } from "@mui/material";
import { useProducts } from "../hooks/useProducts";
import { useProductFilters } from "../hooks/useProductFilters";
import ProductCard from "../components/ProductCard";
import HeroSection from "../components/ui/HeroSection";
import EnhancedSearchFilters from "../components/EnhancedSearchFilters";

const Home: React.FC = () => {
  const { data: products = [], isLoading, error, isError } = useProducts();
  
  const {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    sortOption,
    setSortOption,
    priceRange,
    setPriceRange,
    filteredAndSortedProducts,
    categories,
    maxPrice,
    resultsCount,
  } = useProductFilters({ products });

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSortOption('name-asc');
    setPriceRange([0, maxPrice]);
  };

  if (isError) {
    return (
      <Container>
        <Alert severity="error" sx={{ mt: 4 }}>
          Error loading products: {error?.message || 'Something went wrong'}
        </Alert>
      </Container>
    );
  }

  return (
    <Container>
      <HeroSection />

      <EnhancedSearchFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sortOption={sortOption}
        onSortChange={setSortOption}
        priceRange={priceRange}
        onPriceRangeChange={setPriceRange}
        categories={categories}
        maxPrice={maxPrice}
        resultsCount={resultsCount}
        onClearFilters={handleClearFilters}
      />

      {isLoading ? (
        <Grid container spacing={3}>
          {Array.from({ length: 8 }).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Box>
                <Skeleton variant="rectangular" height={200} sx={{ mb: 2, borderRadius: 1 }} />
                <Skeleton variant="text" height={30} />
                <Skeleton variant="text" height={20} width="60%" />
                <Skeleton variant="text" height={20} width="40%" />
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container spacing={3}>
          {filteredAndSortedProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Home;
