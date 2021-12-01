import {
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    FormLabel,
    Grid,
    Paper,
  } from "@mui/material";
  import React, { useContext, useState } from "react";
  import { productsContext } from "../../context/ProductContext";
  import history from "../../helpers/history";
  import "./Home.css"
  


  const Sidebar = () => {
    const { getProducts } = useContext(productsContext);
    const [type, setType] = useState(getType());
  
    function getType() {
      const search = new URLSearchParams(history.location.search);
      return search.get("type");
    }
  
    function handleChangeType(e) {
      if (e.target.value === "all") {
        history.push(`${history.location.pathname.replace("type")}`);
        getProducts();
        return;
      }
  
      const search = new URLSearchParams(history.location.search);
      search.set("type", e.target.value);
      history.push(`${history.location.pathname}?${search.toString()}`);
      getProducts(search.toString());
      setType(e.target.value);
    }
  
    return (
      <>
      <Grid item md={0}>
        <Paper className="sidebar" >
          <FormControl component="fieldset">
            <FormLabel component="legend" className="label">
              Category
            </FormLabel>
            <RadioGroup
              value={type}
              onChange={handleChangeType}
              aria-label="type"
              name="type"
              className="sidebar"
              
            >
              <FormControlLabel 
                value="Outer" 
                control={<Radio />} 
                label="Outer" 
              />
              <FormControlLabel
               value="PANTS" 
               control={<Radio />} 
               label="Pants" />
              <FormControlLabel
                value="SHIRTS"
                control={<Radio />}
                label="Shirts"
              />
              <FormControlLabel
               value="Sport Man" 
               control={<Radio />} 
               label="Sport Man" />
              <FormControlLabel
               
                value="all"
                control={<Radio />}
                label="ALL PRODUCTS"
              />
             </RadioGroup>
          </FormControl>
        </Paper>
      </Grid>
    </>
    );
  };
  
  export default Sidebar;
  