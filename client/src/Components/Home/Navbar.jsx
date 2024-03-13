import React from 'react';
import { AppBar, Toolbar, Button, TextField, ButtonBase, IconButton, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ isLoggedIn, handleLoginClick, handleLogout, setSearchQueryProp, page }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = () => {
    if (page === 'home') {
      setSearchQueryProp(searchQuery);
    }
  };

  return (
    <AppBar position="static" color="default" sx={{ backgroundColor: 'white' }}>
      <Toolbar>
        <ButtonBase onClick={() => navigate('/')}>
          <img
            src="https://logos-world.net/wp-content/uploads/2020/11/Flipkart-Logo.png"
            alt="Flipkart Logo"
            style={{ marginRight: '20px', height: '50px' }}
          />
        </ButtonBase>
        {page === 'home' && (
          <>
            <TextField
              label="Search"
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ backgroundColor: 'white', marginRight: '10px', flexGrow: 0.3, '& .MuiOutlinedInput-root': { borderRadius: '20px' } }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleSearch}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {!isLoggedIn ? (
              <Button color="inherit" onClick={handleLoginClick} sx={{ color: 'blue', marginLeft: 'auto' }} variant="outlined">
                Login
              </Button>
            ) : (
              <>
                <Button color="inherit" onClick={handleLogout} sx={{ color: 'blue', marginLeft: 'auto' }} variant="outlined">
                  Logout
                </Button>
                <Button onClick={() => navigate('/orders')}
                  sx={{ marginLeft: '10px', color: 'blue', borderColor: 'blue', '&:hover': { backgroundColor: 'rgba(0, 0, 255, 0.04)' } }}
                  variant="outlined">
                  View Orders
                </Button>
              </>

            )}
          </>
        )}
        {page === 'orders' && (
          <Button
            startIcon={<HomeIcon />}
            onClick={() => navigate('/')}
            sx={{ color: 'blue', marginLeft: 'auto' }}
            variant="outlined"
          >
            Home
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
