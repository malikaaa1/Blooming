import axios from "axios";
import React, { createContext, useContext, useReducer } from "react";
import { getCountProductsInCart } from "../helpers/cartFunctions";
import {
  calcSubPrice,
  calcTotalPrice,
  getCountProductsInFavs,
} from "../helpers/history";


export const productsContext = createContext();
export const useProducts=()=>{
  return useContext(productsContext);
}
const INIT_STATE = {
  products: [],
  productDetails: {},
  favs: JSON.parse(localStorage.getItem("favs")),
  favsLength:getCountProductsInFavs(),
  cartLength: getCountProductsInCart(),
  cart: {},
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return { ...state, products: action.payload
      };
    // вызываем product details 1) копируем state. вызываем  функцию productDetails и задаем значение action.payload
    case "GET_PRODUCT_DETAILS":
      return { ...state, productDetails: action.payload };
    case "FAV_LENGTH":
      return{...state,fav:action.payload};
    case "GET_FAVS":
      return { ...state, favs: action.payload };
    case "CHANGE_FAVS_LENGTH":
      return{...state, favsLength:action.payload};
      case "CHANGE_CART_COUNT":
      return { ...state, cartLength: action.payload };
    case "GET_CART":
      return { ...state, cart: action.payload };
    default:
      return state;
     
  }
};

const ProductsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

//Getproduct у нас функция рендерига 
  const getProducts = async (params) => {
    const { data } = await axios(`https://blooming-2021.herokuapp.com/api/products?${params}`);
    dispatch({
      type: "GET_PRODUCTS",
      payload: data,
    });
  };

//AddProduct он отправляет post запрос json-server и внутри этой функции вызывается rendering getProducts
  async function addProduct(product) {
    await axios.post("https://blooming-2021.herokuapp.com/api/products", product);
    getProducts();
  }

// Для изменение мы создаем функцию getProductDetails то есть мы создаем инит - стейт. Там я будет пустой обьект Details 
  async function getProductDetails(id) {
    const { data } = await axios(`https://blooming-2021.herokuapp.com/api/products/${id}`);
    dispatch({
      type: "GET_PRODUCT_DETAILS",
      payload: data,
    });
  }


  //Функции clickDelete мы отправляем запрос на удаление по id. Он будет удалять по id.
  //И внутри этой функции вызываем функцию getProducts. getProducts это функция рендеринга.
  const clickDelete = async (id) => {
    await axios.delete(`https://blooming-2021.herokuapp.com/api/products/${id}`);
    getProducts();
  };


  //Потом мы создаем функцию editProductDetails.И мы в аргументах указываем id,newProduct. 
  //Мы отправляем patch запрос для изменение какого-то обьекта. И здесь же вызываем Getproducts htylthbyu
  async function editProductDetails(id, newProduct) {
    await axios.patch(`https://blooming-2021.herokuapp.com/api/products/${id}`, newProduct);
    getProducts();
  }

  function addProductToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        products: [],
        totalPrice: 0,
      };
    }
    let newProduct = {
      item: product,
      count: 1,
      subPrice: 0,
    };

    let filteredCart = cart.products.filter(
      (elem) => elem.item.id === product.id
    );
    if (filteredCart.length > 0) {
      cart.products = cart.products.filter(
        (elem) => elem.item.id !== product.id
      );
    } else {
      cart.products.push(newProduct);
    }
    newProduct.subPrice = calcSubPrice(newProduct);
    cart.totalPrice = calcTotalPrice(cart.products);
    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({
      type: "CHANGE_CART_COUNT",
      payload: cart.products.length,
    });
  }

  function getCart() {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        products: [],
        totalPrice: 0,
      };
    }
    dispatch({
      type: "GET_CART",
      payload: cart,
    });
  }

  function changeProductCount(count, id) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.products = cart.products.map((elem) => {
      if (elem.item.id === id) {
        elem.count = count;
        elem.subPrice = calcSubPrice(elem);
      }
      return elem;
    });
    cart.totalPrice = calcTotalPrice(cart.products);
    localStorage.setItem("cart", JSON.stringify(cart));
    getCart();
  }



/////\\\\\\\\\\\
const getFavs = () => {
  let favs = JSON.parse(localStorage.getItem("favs"));
  if (!favs) {
    localStorage.setItem(
      "favs",
      JSON.stringify({
        products: [],
        totalPrice: 0,
      })
    );
    favs = {
      products: [],
      totalPrice: 0,
    };
  }
  dispatch({
    type: "GET_FAVS",
    payload: favs,
  });
};

const addProductToFavs = (product) => {
  let favs = JSON.parse(localStorage.getItem("favs"));
  if (!favs) {
    favs = {
      products: [],
      totalPrice: 0,
    };
  }
  let newFavProduct = {
    item: product,
    count: 1,
    subPrice: product.price,
  };

  let productToFind = favs.products.filter(
    (item) => item.item.id === product.id
  );
  if (productToFind.length == 0) {
    favs.products.push(newFavProduct);
  } else {
    favs.products = favs.products.filter(
      (item) => item.item.id !== product.id
    );
  }
  favs.totalPrice = calcTotalPrice(favs.products);
  localStorage.setItem("favs", JSON.stringify(favs));
  dispatch({
    type: "GET_FAVS",
    payload: favs,
  });
};
const changeFavsCount = (count, id) => {
  let favs = JSON.parse(localStorage.getItem("favs"));
  favs.products = favs.products.map((product) => {
    if (product.item.id === id) {
      product.count = count;
      product.subPrice = calcSubPrice(product);
    }
    return product;
  });
  favs.totalPrice = calcTotalPrice(favs.products);
  localStorage.setItem("favs", JSON.stringify(favs));
  dispatch({
    type: "GET_FAVS",
    payload: favs,
  });
};

function deleteFavsProducts(id) {
  let toDelete = JSON.parse(localStorage.getItem("favs"));
  toDelete.products = toDelete.products.filter((elem) => elem.item.id !== id);
  toDelete.totalPrice = calcTotalPrice(toDelete.products);
  localStorage.setItem("favs", JSON.stringify(toDelete));
  console.log(toDelete);
  getFavs();
  dispatch({
    type: "CHANGE_FAVS_LENGTH",
    payload: toDelete.products.length,
  });
}

function checkProductInFavs(id) {
  let favs = JSON.parse(localStorage.getItem("favs"));
  if (favs) {
    let newFavs = favs.products?.filter((elem) => elem.item.id === id);
    return newFavs.length > 0 ? true : false;
  } else {
    favs = {
      products: [],
      totalPrice: 0,
    };
  }
}
  return (
    <productsContext.Provider
      value={{
        products: state.products,
        productDetails: state.productDetails,
        cartLength: state.cartLength,
        cart: state.cart,
        favs: state.favs,
        getProducts,
        addProduct,
        getProductDetails,
        clickDelete,
        editProductDetails,
        addProductToCart,
        getCart,
        changeProductCount,
        dispatch,
        getFavs,
        addProductToFavs,
        deleteFavsProducts,
        checkProductInFavs,
        changeFavsCount,
      }}
    >
      {children}
    </productsContext.Provider>
  );
};

export default ProductsContextProvider;
