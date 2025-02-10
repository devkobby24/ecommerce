import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Header from "./components/ui/Header";
import Footer from "./components/ui/Footer";
import { Container } from "@mui/material";
import ScrollToTop from "./components/scrollToTop";

const App = () => {
  return (
    <Router>
      <Header />
      <Container sx={{ minHeight: "80vh", mt: 2 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
        <ScrollToTop />
      </Container>
      <Footer />
    </Router>
  );
};

export default App;
