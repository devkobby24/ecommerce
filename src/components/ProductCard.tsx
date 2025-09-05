import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Tooltip,
  Chip,
  Rating,
  Snackbar,
  Alert,
  CardActions,
} from "@mui/material";
import {
  AddShoppingCart as AddShoppingCartIcon,
  Visibility as VisibilityIcon,
  Star as StarIcon,
} from "@mui/icons-material";
import { useCart, Product } from "../context/CartContext";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setShowSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  return (
    <>
      <Card 
        sx={{ 
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 3, 
          boxShadow: 3,
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            boxShadow: 8,
            transform: 'translateY(-4px)',
          }
        }}
      >
        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
          <CardMedia
            component="img"
            height="220"
            image={product.image}
            alt={product.title}
            sx={{ 
              objectFit: "contain", 
              p: 2,
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)',
              }
            }}
          />
          {product.rating && product.rating.rate >= 4.5 && (
            <Chip
              icon={<StarIcon />}
              label="Bestseller"
              color="warning"
              size="small"
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                fontWeight: 'bold',
              }}
            />
          )}
        </Box>

        <CardContent sx={{ flexGrow: 1, pb: 1 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              fontSize: { xs: 14, sm: 16 },
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              minHeight: 48,
              mb: 1,
            }}
          >
            {product.title}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            {product.rating && (
              <>
                <Rating 
                  value={product.rating.rate} 
                  precision={0.1} 
                  size="small" 
                  readOnly 
                />
                <Typography variant="body2" color="textSecondary" sx={{ ml: 1 }}>
                  ({product.rating.count})
                </Typography>
              </>
            )}
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              mb: 2,
            }}
          >
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ 
                fontSize: { xs: 12, sm: 14 },
                textTransform: 'capitalize',
              }}
            >
              {product.category}
            </Typography>
            <Typography
              variant="h6"
              color="primary"
              sx={{
                fontSize: { xs: 18, sm: 20 },
                fontWeight: "bold",
              }}
            >
              ${product.price.toFixed(2)}
            </Typography>
          </Box>
        </CardContent>

        <CardActions sx={{ p: 2, pt: 0 }}>
          <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddToCart}
              startIcon={<AddShoppingCartIcon />}
              sx={{ 
                flexGrow: 1,
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 'bold',
              }}
              size="small"
            >
              Add to Cart
            </Button>
            
            <Tooltip title="View Details">
              <IconButton
                component={Link}
                to={`/product/${product.id}`}
                color="primary"
                sx={{ 
                  border: 1, 
                  borderColor: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                  }
                }}
              >
                <VisibilityIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </CardActions>
      </Card>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" variant="filled">
          Added to cart successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

// ✅ Corrected PropTypes definition
ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string,
    rating: PropTypes.shape({
      rate: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
    }),
  }).isRequired,
};

export default ProductCard;
