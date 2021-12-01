import Grid from '@mui/material/Grid';
import React from 'react';
import MainCarousel from './MainCarousel/MainCarousel';
import Content from './Content';
import Accardion from './Accardion'
import Footer from './Footer';


const Home = () => {
    return (
        <>
      <MainCarousel/>
         <Grid container spacing={1}>
            <Accardion/>
            <Content/>
        </Grid>
        <Footer/>
        </>
    );
};

export default Home;