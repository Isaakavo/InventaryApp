import React, { useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { companies } from '../util/companies';
import MyButton from '../util/MyButton';
import { Link } from 'react-router-dom';
import CreateExcelFile from './CreateExcelFile';
//MUI stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
//Icons
import ExitToApp from '@material-ui/icons/ExitToApp';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { changeDb } from '../redux/actions/dataActions';
import { logoutUser } from '../redux/actions/userActions';
const styles = (theme) => ({
  ...theme.spreadThis,
  selectorColor: {
    borderColor: '#fff',
    color: '#fff',
  },
  loginButton: {
    color: '#b71c1c',
    backgroundColor: '#fff',
    marginLeft: '85%',
    margin: 25,
  },
});

const NavBar = ({ classes }) => {
  const state = useSelector((state) => state.data.empresa);

  const [empresa, setEmpresa] = useState(state);

  const dispatch = useDispatch();
  const { authenticated, credentials } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setEmpresa(e.target.value);
    dispatch(changeDb(e.target.value));
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <AppBar>
      <Toolbar className='nav-container'>
        {authenticated ? (
          <>
            <FormControl className={classes.formControl} color='primary'>
              <Select
                value={empresa}
                onChange={handleChange}
                className={classes.selectorColor}
              >
                {companies.map((item) => {
                  return (
                    <MenuItem key={item.value} value={item.value}>
                      {item.label}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText className={classes.selectorColor}>
                Inventario
              </FormHelperText>
            </FormControl>

            <Tooltip title={credentials.email ? credentials.email : ''}>
              <Avatar>{credentials.letra}</Avatar>
            </Tooltip>
            <CreateExcelFile />
            <MyButton tip='Cerrar Sesión' onClick={handleLogout}>
              <ExitToApp color='primary' />
            </MyButton>
          </>
        ) : (
          <Button
            variant='contained'
            className={classes.loginButton}
            component={Link}
            to='/'
          >
            Iniciar Sesión
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)(NavBar);
