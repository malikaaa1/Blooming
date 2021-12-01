import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import MoreIcon from '@mui/icons-material/MoreVert';
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Link } from 'react-router-dom';
import {useAuth} from '../../context/AuthContext'
import { productsContext } from '../../context/ProductContext';
import history from '../../helpers/history';
import './Header.css'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function PrimarySearchAppBar() {
  const [searchValue,setSearchValue]=React.useState("");
  const {getProducts,cartLength,editProductDetails,favs,favsLength}=React.useContext(productsContext)
 function handleValue(e){
   const search = new URLSearchParams(history.location.search);
   search.set("q",e.target.value);
   history.push(`${history.location.pathname}?${search.toString()}`)
   setSearchValue(e.target.value)
   getProducts(search.toString())
 }
 

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const{
    handleLogout,
    user:{email},
  }=useAuth()


  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      className="menuItem"
    >
  
    {email ?(
      <Link to="/auth">
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Link>
    ) : null}
    {email ? null : (
      <Link to="/auth">
        <MenuItem >Login</MenuItem>
      </Link>
    )}
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
     
    >
   
      <MenuItem>
           {email === "malikaaa@gmail.com" ? (
              <Link to="/addProduct" style={{ textDecoration: "none" }}>
                <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  sx={{color: "black"}}
                >
                  <AddIcon sx={{color: "black"}}/>         
                  <p className="AddCartP">AddProduct</p>
                </IconButton>
              </Link>
            ) : null}
        </MenuItem>
        <MenuItem>
            <Link to="/cart"  style={{ color: "default",textDecoration: "none" }}>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                sx={{color: "black"}}
                >
                <Badge badgeContent={cartLength} 
                color="error">
                  <AddShoppingCartIcon sx={{color: "black"}}/>
                </Badge>
                <p className="AddCartP">Add Cart</p>
              </IconButton>
            </Link>
            </MenuItem>
            <MenuItem>
        <Link to="/Chosen">
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error" badgeContent={favs?.products? favs.products.length:0} >
            <StarBorderIcon />
          </Badge>
        </IconButton>
        </Link>
        <p className="AddCartP">Favorite products</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" className="Appbar">
        <Toolbar>
          <Link to="/"className="logoA">
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
            className="logo"
          >
            Blooming
          </Typography>
          </Link>
          <Search
            onChange={handleValue}
            value={searchValue}
            style={{color:"white"}}
            className='search'
          >
            <SearchIconWrapper>
              <SearchIcon sx={{color: "black"}}/>
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              sx={{color: "black"}}
            />
          </Search>
        
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
           {email === "malikaaa@gmail.com" ? (
              <Link to="/addProduct">
                <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  sx={{color: "black"}}
                >
                  <AddIcon sx={{ display: { xs: "none", sm: "block",color:"black"} }}/>
                </IconButton>
              </Link>
            ) : null}
            <Link to="/chosen" style={{ color: "inherit" }}>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                sx={{color: "black"}}
              >
                <Badge className="favs" badgeContent={favs?.products? favs.products.length:0} color="error">
                    <StarBorderIcon  sx={{ display: { xs: "none", sm: "block" } }} color="black"/>
                </Badge>
              </IconButton>
            </Link>
            <Link to="/cart" style={{ color: "inherit" }}>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                sx={{color: "black"}}
              >
                <Badge className="favs" badgeContent={cartLength} color="error">
                  <AddShoppingCartIcon  sx={{ display: { xs: "none", sm: "block" } }} color="black" />
                </Badge>
              </IconButton>
            </Link>
            <IconButton size="large" aria-label="show 4 new mails" sx={{color: "black"}}>
              <Badge badgeContent={0} color="error">
                <MailIcon sx={{color: "black"}} />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              sx={{color: "black"}}
            >
              <AccountCircle sx={{color: "black"}}/>
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
