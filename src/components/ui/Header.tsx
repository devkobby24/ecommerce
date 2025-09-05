import { AppBar, Toolbar, Typography, IconButton, Badge, Box } from "@mui/material";
import { ShoppingCart as ShoppingCartIcon, Home as HomeIcon } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const Header = () => {
  const { itemCount } = useCart();
  const location = useLocation();

  return (
    <AppBar position="static" color="primary" elevation={4}>
      <Toolbar>
        <IconButton
          color="inherit"
          component={Link}
          to="/"
          sx={{ mr: 2 }}
        >
          <HomeIcon />
        </IconButton>
        
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          <Link 
            to="/" 
            style={{ 
              textDecoration: "none", 
              color: "white",
              fontSize: "1.5rem"
            }}
          >
            ShopWise
          </Link>
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton 
            color="inherit"
            component={Link}
            to="/cart"
            sx={{ 
              transition: 'transform 0.2s',
              '&:hover': { transform: 'scale(1.1)' },
              backgroundColor: location.pathname === '/cart' ? 'rgba(255,255,255,0.1)' : 'transparent',
            }}
          >
            <Badge badgeContent={itemCount} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
