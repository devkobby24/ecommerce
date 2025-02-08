import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Header from "./ui/Header";
import Footer from "./ui/Footer";
import { Container } from "@mui/material";

const App = () => {
  return (
    <Router>
      <Header />
      <Container sx={{ minHeight: "80vh", mt: 2 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
};

export default App;
