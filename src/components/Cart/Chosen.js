import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
// import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import { useEffect } from "react";
import { Button } from "@material-ui/core";
import { useState } from "react";
// import { useProducts } from "../../contexts/ProductContext";
import DeleteIcon from "@mui/icons-material/Delete";
import { useProducts } from "../../context/ProductContext";
import Grid from "@mui/material/Grid";
import Card from '@mui/material/Card';
import './Chosen.css'
import { Container } from "react-bootstrap";


const Chosen = () => {
  const { favs, deleteFavsProducts } = useProducts();


  return (

    <section>
    <Container sx={{mt:20}} >
    <Grid item sx={4} className="GridCard">
     <p className="chosenP">Favorite goods</p>
      <Card sx={{width: 350,borderRadius: 0}} className="CardMain">
        
          <tbody>
            {favs?.products?.length > 0 &&
              favs.products.map((product) => (
                <tr key={product.item.id}>
                  <td>
                   <div className="dws-wrapper">
                     <div>
                      <img
                       className="cardImg"
                        src={product.item.image}
                        alt={product.item.title}
                      />
                      </div>
                        <Link to={`/product/${product.item.id}`} style={{ color: "inherit" }}>
                          <div class="dws-text">
                          <h3>Learn more</h3>
                          </div>
                        </Link>
                      </div>
                      <td>
                        {product.item.title} {+product.item.price} ${" "}
                        <Button variant="outlined" className="learnMore">
                          <Link className="learnMoreA" to={`/product/${product.item.id}`}>
                             Learn more
                          </Link>
                        </Button>
                        <Button className="DeleteIcon"
                          onClick={() => deleteFavsProducts(product.item.id)}>
                          <DeleteIcon />
                        </Button>
                      </td>
                  </td>
                </tr>
              ))}
          </tbody>
      <div style={{ display: "flex", justifyContent: "center" }}> </div>
      </Card>
    </Grid>
    </Container>
    </section>
  );
};

export default Chosen;

