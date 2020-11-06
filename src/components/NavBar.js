import React from 'react';
//MUI stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const NavBar = () => {
  return (
    <AppBar>
      <Toolbar className='nav-container'></Toolbar>
    </AppBar>
  );
};

export default NavBar;
