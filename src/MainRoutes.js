import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./components/Cart/Cart";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import ProductDetails from "./components/Products/ProductDetails";
import AuthContextProvider from "./context/AuthContext";
import AddProduct from "./components/Products/AddProduct";
import EditProducts from "./components/Products/EditProduct";
import ProductsContextProvider from "./context/ProductContext";
import ForgotPassword from "./components/Auth/ForgotYourPassword";
import Auth from "./components/Auth/Auth";
import Chosen from "./components/Cart/Chosen";
import BuyProducts from "./components/OrderForm/BuyProducts";
// import Footer from "./Components/Footer/Footer";
import Buy from "./components/OrderForm/Buy";
const MainRoutes = () => {
  return (
    <ProductsContextProvider>
      <AuthContextProvider>
        <BrowserRouter>
          <Header/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chosen" element={<Chosen/>}/>
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/addProduct" element={<AddProduct />} />
            <Route path="/edit/:id" element={<EditProducts />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/forgotPassword" component={<ForgotPassword/>} />
            <Route path="/buyProducts" element={<BuyProducts/>} />
            <Route path="/buy" element={<Buy/>} />


            {/* <Route path="/buyProducts" element={<BuyProducts />} /> */}
            {/* <Route path='/buy' element={<Buy/>}/> */}
          </Routes>
          {/* <Footer /> */}
        </BrowserRouter>
      </AuthContextProvider>
    </ProductsContextProvider>
  );
};

export default MainRoutes;
