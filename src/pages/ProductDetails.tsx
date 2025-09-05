import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  CardMedia,
  Typography,
  Button,
  CircularProgress,
  Grid,
  Box,
  Chip,
  Rating,
  Breadcrumbs,
  Link,
  Alert,
  Paper,
  Divider,
  Snackbar,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  AddShoppingCart as AddShoppingCartIcon,
  Home as HomeIcon,
  Star as StarIcon,
} from "@mui/icons-material";
import { useProduct } from "../hooks/useProducts";
import { useCart } from "../context/CartContext";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [showSnackbar, setShowSnackbar] = useState(false);

  const { data: product, isLoading, error, isError } = useProduct(id);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      setShowSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  if (isLoading) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress size={60} />
      </Container>
    );
  }

  if (isError || !product) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">{error?.message || "Product not found"}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link
          component="button"
          variant="body2"
          onClick={() => navigate("/")}
          sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
        >
          <HomeIcon fontSize="small" />
          Home
        </Link>
        <Typography color="textPrimary" sx={{ textTransform: "capitalize" }}>
          {product.category}
        </Typography>
        <Typography color="textSecondary" noWrap sx={{ maxWidth: 200 }}>
          {product.title}
        </Typography>
      </Breadcrumbs>

      {/* Back Button */}
      <Box sx={{ mb: 3 }}>
        <Button
          onClick={() => navigate(-1)}
          sx={{ mr: 1 }}
          size="small"
          startIcon={<ArrowBackIcon color="action" />}
        >
          <Typography variant="body2" component="span" color="textSecondary">
            Back to Home
          </Typography>
        </Button>
      </Box>

      <Grid container spacing={4}>
        {/* Product Image */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
            <CardMedia
              component="img"
              image={product.image}
              alt={product.title}
              sx={{
                width: "100%",
                height: { xs: 300, md: 400 },
                objectFit: "contain",
                borderRadius: 2,
              }}
            />
          </Paper>
        </Grid>

        {/* Product Details */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            {/* Category Chip */}
            <Chip
              label={product.category}
              color="primary"
              variant="outlined"
              sx={{
                alignSelf: "flex-start",
                mb: 2,
                textTransform: "capitalize",
              }}
            />

            {/* Title */}
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{ fontWeight: "bold" }}
            >
              {product.title}
            </Typography>

            {/* Rating */}
            {product.rating && (
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Rating value={product.rating.rate} precision={0.1} readOnly />
                <Typography
                  variant="body2"
                  sx={{ ml: 1, color: "text.secondary" }}
                >
                  {product.rating.rate}/5 ({product.rating.count} reviews)
                </Typography>
                {product.rating.rate >= 4.5 && (
                  <Chip
                    icon={<StarIcon />}
                    label="Bestseller"
                    color="warning"
                    size="small"
                    sx={{ ml: 2 }}
                  />
                )}
              </Box>
            )}

            {/* Price */}
            <Typography
              variant="h3"
              color="primary"
              sx={{ fontWeight: "bold", mb: 3 }}
            >
              ${product.price.toFixed(2)}
            </Typography>

            <Divider sx={{ my: 2 }} />

            {/* Description */}
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "medium" }}>
              Description
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mb: 4,
                lineHeight: 1.7,
                color: "text.secondary",
                flexGrow: 1,
              }}
            >
              {product.description}
            </Typography>

            {/* Add to Cart Button */}
            <Button
              variant="contained"
              size="large"
              startIcon={<AddShoppingCartIcon />}
              onClick={handleAddToCart}
              sx={{
                py: 1.5,
                fontSize: "1.1rem",
                fontWeight: "bold",
                borderRadius: 3,
                textTransform: "none",
              }}
              fullWidth
            >
              Add to Cart
            </Button>

            {/* Additional Info */}
            <Paper
              elevation={1}
              sx={{ p: 2, mt: 3, backgroundColor: "grey.50" }}
            >
              <Typography variant="body2" color="text.secondary">
                • Free shipping on orders over $50
                <br />
                • 30-day return policy
                <br />• Secure payment processing
              </Typography>
            </Paper>
          </Box>
        </Grid>
      </Grid>

      {/* Success Snackbar */}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          variant="filled"
        >
          Added to cart successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProductDetails;
