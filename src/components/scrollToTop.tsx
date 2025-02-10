
import { useState, useEffect } from "react";
import { Fab, Zoom } from "@mui/material";
import { ArrowUpward } from "@mui/icons-material";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Zoom in={isVisible}>
      <Fab
        color="primary"
        size="medium"
        onClick={scrollToTop}
        sx={{
          position: "fixed",
          bottom: 50,
          right: 20,
          boxShadow: 3, // Adds elevation
        }}
      >
        <ArrowUpward />
      </Fab>
    </Zoom>
  );
};

export default ScrollToTop;
