import React from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Typography,
  Paper,
  Grid,
  Chip,
  IconButton,
  Collapse,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Search as SearchIcon,
  Clear as ClearIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';
import { SortOption } from '../hooks/useProductFilters';

interface EnhancedSearchFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortOption: SortOption;
  onSortChange: (sort: SortOption) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  categories: string[];
  maxPrice: number;
  resultsCount: number;
  onClearFilters: () => void;
}

const EnhancedSearchFilters: React.FC<EnhancedSearchFiltersProps> = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  sortOption,
  onSortChange,
  priceRange,
  onPriceRangeChange,
  categories,
  maxPrice,
  resultsCount,
  onClearFilters,
}) => {
  const [filtersExpanded, setFiltersExpanded] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handlePriceChange = (_event: Event, newValue: number | number[]) => {
    onPriceRangeChange(newValue as [number, number]);
  };

  const activeFiltersCount = [
    searchTerm,
    selectedCategory,
    sortOption !== 'name-asc',
    priceRange[0] > 0 || priceRange[1] < maxPrice,
  ].filter(Boolean).length;

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SearchIcon />
            Search & Filters
          </Typography>
          {activeFiltersCount > 0 && (
            <Chip
              label={`${activeFiltersCount} active`}
              size="small"
              color="primary"
              variant="outlined"
            />
          )}
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" color="textSecondary">
            {resultsCount} products found
          </Typography>
          
          {isMobile && (
            <IconButton
              onClick={() => setFiltersExpanded(!filtersExpanded)}
              size="small"
            >
              {filtersExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          )}
          
          {activeFiltersCount > 0 && (
            <IconButton onClick={onClearFilters} size="small" color="error">
              <ClearIcon />
            </IconButton>
          )}
        </Box>
      </Box>

      {/* Search Bar - Always Visible */}
      <TextField
        fullWidth
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        InputProps={{
          startAdornment: <SearchIcon sx={{ mr: 1, color: 'action.active' }} />,
        }}
        sx={{ mb: 2 }}
      />

      {/* Filters - Collapsible on Mobile */}
      <Collapse in={!isMobile || filtersExpanded}>
        <Grid container spacing={3}>
          {/* Category Filter */}
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={selectedCategory}
                label="Category"
                onChange={(e) => onCategoryChange(e.target.value)}
              >
                <MenuItem value="">All Categories</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Sort Filter */}
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortOption}
                label="Sort By"
                onChange={(e) => onSortChange(e.target.value as SortOption)}
              >
                <MenuItem value="name-asc">Name (A-Z)</MenuItem>
                <MenuItem value="name-desc">Name (Z-A)</MenuItem>
                <MenuItem value="price-asc">Price (Low to High)</MenuItem>
                <MenuItem value="price-desc">Price (High to Low)</MenuItem>
                <MenuItem value="rating-desc">Rating (High to Low)</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Price Range */}
          <Grid item xs={12} md={6}>
            <Box sx={{ px: 2 }}>
              <Typography gutterBottom>
                Price Range: ${priceRange[0]} - ${priceRange[1]}
              </Typography>
              <Slider
                value={priceRange}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                min={0}
                max={maxPrice}
                step={10}
                valueLabelFormat={(value) => `$${value}`}
              />
            </Box>
          </Grid>
        </Grid>
      </Collapse>
    </Paper>
  );
};

export default EnhancedSearchFilters;
