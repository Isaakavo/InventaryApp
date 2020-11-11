import React, { useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
//MUI stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { changeDb } from '../redux/actions/dataActions';
const styles = (theme) => ({
  ...theme.spreadThis,
  selectorColor: {
    borderColor: '#fff',
    color: '#fff',
  },
});

const NavBar = ({ classes }) => {
  const [empresa, setEmpresa] = useState('Espectro');

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setEmpresa(e.target.value);
    dispatch(changeDb(e.target.value));
  };

  const inventarySelect = (
    <FormControl className={classes.formControl} color='primary'>
      <Select
        labelId='demo-simple-select-helper-label'
        id='demo-simple-select-helper'
        value={empresa}
        onChange={handleChange}
        className={classes.selectorColor}
      >
        <MenuItem value={'Espectro'}>Espectro</MenuItem>
        <MenuItem value={'Material sin empresa'}>Material sin empresa</MenuItem>
        <MenuItem value={'Tainos'}>Tainos</MenuItem>
      </Select>
      <FormHelperText className={classes.selectorColor}>
        Elegir inventario
      </FormHelperText>
    </FormControl>
  );
  return (
    <AppBar>
      <Toolbar className='nav-container'>{inventarySelect}</Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)(NavBar);
