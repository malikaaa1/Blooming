import React from "react";
import ProductsList from "../Products/ProductList";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import "./Home.css";

const Content = () => {
  return (
    <Grid item md={10} mt={6}>
      <section className="product__block">
        <Container>
          <Typography
            variant="h4"
            gutterBottom
            component="div"
            color="GrayText"
          >
          </Typography>
          <ProductsList />
        </Container>
      </section>
    </Grid>
  );
};

export default Content;
