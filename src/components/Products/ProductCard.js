import React,{useState} from 'react';
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { CardContent } from '@mui/material';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useProducts } from '../../context/ProductContext';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useAuth } from '../../context/AuthContext';
import { checkProductInCart } from "../../helpers/cartFunctions";
import './ProductCard.css'


const ProductCard = ({ item }) => {
  const [likeCount, setLikeCount] = useState(item?.likes?.length)
  const [like, setLike] = useState(false);
  const{
    addProductToCart,
    addProductToFavs,
    checkProductInFavs,
    
  }=useProducts();
  const {
    user: { email },
  } = useAuth();

  const addUserLike = async (email, id) => {
    const { data } = await axios(`http://localhost:8000/products/${id}`);
    let emailToFind = data.likes.filter((user) => user === email);
    if (emailToFind.length == 0) {
      data.likes.push(email);
    } else {
      data.likes = data.likes.filter((item) => item !== email);
    }
    await axios.patch(`http://localhost:8000/products/${id}`, data);
    setLikeCount(data.likes.length);
    checkUserLike(email, id);
  };

  const checkUserLike = async (email, id) => {
    const { data } = await axios(`http://localhost:8000/products/${id}`);
    console.log(data);
    let found = data.likes.filter((user) => email === user);
    console.log(found);
    return found.length > 0 ? setLike(true) : setLike(false);
  };

  return (
    <Grid item xs={4} xs={{}} className="GridCard">
      <Card sx={{width: 350,borderRadius: 0}} className="CardMain">
         <div className="dws-wrapper">
         <div>
           <CardMedia
           className="cardImg"
           component="img"
           height="auto"
           image={item.image}
           alt={item.title}
          />
     </div>
     <Link  to={`/product/${item.id}`} style={{color:"inherit" , textDecoration:"none"}}>
       <div class="dws-text">
         <h3>Buy now</h3>
      </div>
      </Link>
      </div>
          <p className="cardTitle">{item.title}</p>
      <CardActions disableSpacing sx={{ justifyContent: 'space-around' }}>
        <IconButton  aria-label="add to favorites"  
                       onClick={() => addUserLike(email,item.id)}
                       color={"inherit"}
                       sx={{fontSize: 23}}
                      >
                   <FavoriteIcon />
          {likeCount}
        </IconButton>
        <IconButton 
        color={checkProductInFavs(item.id) ? "secondary" : "error"}
        onClick={() => addProductToFavs(item)}
        aria-label="add to favs"
                      >
          <StarBorderIcon />
        </IconButton>
        <IconButton  onClick={() => addProductToCart(item)}
            color={checkProductInCart(item.id) ? "secondary" : "primary"}
            aria-label="share">
          <AddShoppingCartIcon />
        </IconButton>
        <Button variant="outlined" >
          <Link to={`/product/${item.id}`} style={{color: 'inherit',textDecoration:"none"}} >
            about
          </Link>
        </Button>
      </CardActions>
    </Card>
  </Grid>
  );
};

export default ProductCard;