import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        textAlign: "center",
        py: 2,
        bgcolor: "primary.main",
        color: "white",
        mt: 4,
      }}
    >
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} E-Commerce. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
