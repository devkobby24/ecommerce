import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, Container } from "@mui/material";
import { CartProvider } from "./context/CartContext";
import Home from "./pages/Home";
import { ProductDetails } from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Header from "./components/ui/Header";
import Footer from "./components/ui/Footer";
import ScrollToTop from "./components/scrollToTop";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <CartProvider>
          <Router>
            <Header />
            <Container sx={{ minHeight: "80vh", mt: 2 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
              </Routes>
              <ScrollToTop />
            </Container>
            <Footer />
          </Router>
        </CartProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
