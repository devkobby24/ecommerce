import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Container,
} from "@mui/material";

interface Props {
  sortOption: string;
  category: string;
  handleSort: (option: string) => void;
  handleFilter: (category: string) => void;
}

const SortFilterControls = ({
  sortOption,
  category,
  handleSort,
  handleFilter,
}: Props) => {
  return (
    <Container sx={{ py: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Typography
          variant="h4"
          color="black"
          fontWeight="bold"
          sx={{ my: 2, textAlign: "left", ml: -3 }}
          gutterBottom
        >
          Featured Products
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Sorting Dropdown */}
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortOption}
              onChange={(e) => handleSort(e.target.value)}
              displayEmpty
            >
              <MenuItem value="price-asc">Price: Low to High</MenuItem>
              <MenuItem value="price-desc">Price: High to Low</MenuItem>
              <MenuItem value="category">Category</MenuItem>
            </Select>
          </FormControl>

          {/* Filtering Dropdown */}
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Filter by Category</InputLabel>
            <Select
              value={category}
              onChange={(e) => handleFilter(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="electronics">Electronics</MenuItem>
              <MenuItem value="jewelery">Jewelry</MenuItem>
              <MenuItem value="men's clothing">Men's Clothing</MenuItem>
              <MenuItem value="women's clothing">Women's Clothing</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
    </Container>
  );
};

export default SortFilterControls;
