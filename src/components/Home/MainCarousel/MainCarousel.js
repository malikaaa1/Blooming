import React from 'react';
import { Carousel } from 'react-bootstrap';
import { Grid } from '@mui/material';
import './MainCarousel.css' 
const MainCarousel = () => {
    return (
        <div>
            <Carousel className="carousel" variant="dark">

  <Carousel.Item>
  <Grid >
    <img
      className="d-block w-100"
      src="//app-storage-edge-007.cafe24.com/bannermanage2/looknone/2021/11/22/e1375f19d21b6679b30d971886f4387b.jpg"
      alt="Third slide"
    />
    </Grid>
  </Carousel.Item>
  <Carousel.Item>
    <Grid>
    <img
      className="d-block w-100"
      src="https://app-storage-edge-007.cafe24.com/bannermanage2/looknone/2021/11/25/ce9fda25e1d3ada9e73461f178c23215.jpg"
      alt="Second slide"
    />
   
    </Grid>
  </Carousel.Item>
  <Carousel.Item>
      <Grid>
    <img
      className="d-block w-100"
      src="https://app-storage-edge-007.cafe24.com/bannermanage2/looknone/2021/11/22/24e32d2c180862a7f9e129c677027e28.jpg"
      alt="Third slide"
    />
    </Grid>
  </Carousel.Item>
  <Carousel.Item>
      <Grid>
      <img
      className="d-block w-100 "
      src="https://app-storage-edge-007.cafe24.com/bannermanage2/looknone/2021/11/25/fb8d83f2d5e857c584601a9f9e1b8bec.jpg"
      alt="First slide"
    />
    </Grid>
  </Carousel.Item>
  <Carousel.Item>
      <Grid container  spacing={1}>
      <img
      className="d-block w-25 "
      src="https://ssumenam.com/web/product/big/202109/5bc78521728df6411ef46f9283d06f7b.webp"
      alt="First slide"
    />
      <img
      className="d-block w-25 "
      src="https://ssumenam.com/web/product/big/202109/d7be3fae861d5bedb3d2520924bca69e.webp"
      alt="First slide"
    />
      <img
      className="d-block w-25 "
      src="https://ssumenam.com/web/product/big/202110/1ec4dc142337663867cb2441e268e3cd.webp"
      alt="First slide"
    />
      <img
      className="d-block w-25 "
      src="https://ssumenam.com/web/product/big/202110/c9a03682dcd4464f1958cf95fba31bde.webp"
      alt="First slide"
    />

  
    </Grid>
  </Carousel.Item>
  <Carousel.Item>
      <Grid>
      <img
      className="d-block w-100 "
      src="//app-storage-edge-007.cafe24.com/bannermanage2/looknone/2021/11/29/54f9ec0075414744cb37a28b6713016a.jpg"      alt="First slide"
    />
    </Grid>
    </Carousel.Item>
</Carousel>
        </div>
    );
};

export default MainCarousel;