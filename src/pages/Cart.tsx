import React from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  IconButton,
  Box,
  Divider,
  CardMedia,
  Paper,
  Alert,
  Chip,
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
  ShoppingCart as ShoppingCartIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

const Cart: React.FC = () => {
  const { items, total, itemCount, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <ShoppingCartIcon sx={{ fontSize: 80, color: 'grey.400', mb: 2 }} />
          <Typography variant="h4" gutterBottom>
            Your cart is empty
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
            Looks like you haven't added any items to your cart yet.
          </Typography>
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/"
            startIcon={<ArrowBackIcon />}
          >
            Continue Shopping
          </Button>
        </Paper>
      </Container>
    );
  }

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleCheckout = () => {
    // In a real app, this would navigate to a checkout page
    alert('Checkout functionality would be implemented here!');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton onClick={() => navigate(-1)} sx={{ mr: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h3" component="h1" sx={{ flexGrow: 1 }}>
          Shopping Cart
        </Typography>
        <Chip 
          label={`${itemCount} item${itemCount !== 1 ? 's' : ''}`} 
          color="primary" 
          variant="outlined"
        />
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Card elevation={3}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5" component="h2">
                  Cart Items
                </Typography>
                <Button
                  color="error"
                  onClick={clearCart}
                  startIcon={<DeleteIcon />}
                  size="small"
                >
                  Clear Cart
                </Button>
              </Box>
              
              {items.map((item, index) => (
                <React.Fragment key={item.id}>
                  <Box sx={{ display: 'flex', alignItems: 'center', py: 2 }}>
                    <CardMedia
                      component="img"
                      sx={{ width: 80, height: 80, objectFit: 'contain', mr: 2 }}
                      image={item.image}
                      alt={item.title}
                    />
                    
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" noWrap sx={{ maxWidth: { xs: 200, sm: 300 } }}>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Category: {item.category}
                      </Typography>
                      <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                        ${item.price.toFixed(2)}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <IconButton
                        size="small"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <RemoveIcon />
                      </IconButton>
                      
                      <Typography variant="h6" sx={{ minWidth: 40, textAlign: 'center' }}>
                        {item.quantity}
                      </Typography>
                      
                      <IconButton
                        size="small"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      >
                        <AddIcon />
                      </IconButton>
                      
                      <IconButton
                        color="error"
                        onClick={() => removeFromCart(item.id)}
                        sx={{ ml: 1 }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                  
                  {index < items.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card elevation={3} sx={{ position: 'sticky', top: 20 }}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Order Summary
              </Typography>
              
              <Box sx={{ py: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Subtotal:</Typography>
                  <Typography>${total.toFixed(2)}</Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Shipping:</Typography>
                  <Typography color="success.main">Free</Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Tax:</Typography>
                  <Typography>${(total * 0.08).toFixed(2)}</Typography>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">Total:</Typography>
                  <Typography variant="h6" color="primary">
                    ${(total * 1.08).toFixed(2)}
                  </Typography>
                </Box>
              </Box>
              
              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={handleCheckout}
                sx={{ mb: 2 }}
              >
                Proceed to Checkout
              </Button>
              
              <Button
                variant="outlined"
                fullWidth
                component={Link}
                to="/"
                startIcon={<ArrowBackIcon />}
              >
                Continue Shopping
              </Button>
              
              <Alert severity="info" sx={{ mt: 2 }}>
                Free shipping on orders over $50!
              </Alert>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;
