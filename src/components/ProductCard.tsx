import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
}

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card sx={{ borderRadius: 2, boxShadow: 5 }}>
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.title}
        sx={{ objectFit: "contain", mt: 2 }}
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

        <Box
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ fontSize: { xs: 20, md: 16 } }}
          >
            {product.category}
          </Typography>
          <Typography
            color="black"
            sx={{
              fontSize: { xs: 20, md: 16 },
              fontWeight: "bold",
            }}
          >
            ${product.price}
          </Typography>
        </Box>

        <Box
          sx={{
            width: { xs: "400px", md: "250px", lg: "400px" },
            height: "2px",
            backgroundColor: "lightblue",
            my: 2,
            ml: -2,
          }}
        />

        <Link to={`/product/${product.id}`} style={{ textDecoration: "none" }}>
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
  }).isRequired,
};

export default ProductCard;
