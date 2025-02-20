import { Button, Typography, Container } from "@mui/material";

const HeroSection = () => {
  return (
    <Container>
      <Typography
        variant="h3"
        fontWeight="bold"
        color="black"
        sx={{
          fontSize: { xs: 44, sm: 48, md: 60, lg: 68 },
          textAlign: "center",
        }}
        gutterBottom
      >
        Discover the Best Deals Online
      </Typography>
      <Typography
        color="gray"
        variant="h6"
        textAlign="center"
        sx={{
          maxWidth: "600px",
          opacity: 0.9,
          margin: "auto",
          my: 3,
        }}
        gutterBottom
      >
        Explore a wide range of high-quality products at unbeatable prices.
        Start shopping now!
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        sx={{
          mt: 6,
          px: 4,
          fontSize: "1.2rem",
          borderRadius: 7,
          display: "block",
          margin: "auto",
        }}
      >
        Shop Now
      </Button>
    </Container>
  );
};

export default HeroSection;
