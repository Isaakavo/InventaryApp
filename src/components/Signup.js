import React, { useEffect, useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
//MUI stuff
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
//Redux
import { useDispatch, useSelector } from 'react-redux';

import { signup } from '../redux/actions/userActions';

const styles = (theme) => ({
  ...theme.spreadThis,
});

const Signup = ({ classes }) => {
  const initialState = {
    email: '',
    password: '',
    confirmPassword: '',
    handle: '',
    loading: false,
  };

  const initialErrorState = {
    errors: {
      email: '',
      password: '',
      handle: '',
    },
  };

  const [newDataUser, setNewDataUser] = useState(initialState);
  const [userErrors, setUserErrors] = useState(initialErrorState);

  const { loading, errors } = useSelector((state) => state.UI);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUserData = {
      email: newDataUser.email,
      password: newDataUser.password,
      confirmPassword: newDataUser.confirmPassword,
      handle: newDataUser.handle,
      creado: new Date().toISOString(),
    };
    dispatch(signup(newUserData));
  };

  const handleChange = (e) => {
    setNewDataUser({ ...newDataUser, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (errors) {
      setUserErrors({
        errors: errors,
      });
    }
  }, [errors]);
  return (
    <Container maxWidth='sm'>
      <Paper className={classes.login}>
        <Typography variant='h2' className={classes.pageTitle}>
          Crear Cuenta
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id='email'
            name='email'
            type='email'
            label='Correo'
            className={classes.textField}
            onChange={handleChange}
            helperText={userErrors.errors.email}
            error={userErrors.errors.email ? true : false}
            fullWidth
          />
          <TextField
            id='password'
            name='password'
            type='password'
            label='Contraseña'
            className={classes.textField}
            value={newDataUser.password}
            onChange={handleChange}
            error={userErrors.errors.password ? true : false}
            helperText={userErrors.errors.password}
            fullWidth
          />
          <TextField
            id='confirmPassword'
            name='confirmPassword'
            type='password'
            label='Confirmar Contraseña'
            className={classes.textField}
            value={newDataUser.confirmPassword}
            onChange={handleChange}
            error={userErrors.errors.confirmPassword ? true : false}
            helperText={userErrors.errors.confirmPassword}
            fullWidth
          />
          <TextField
            id='handle'
            name='handle'
            type='text'
            label='Alias'
            className={classes.textField}
            value={newDataUser.handle}
            onChange={handleChange}
            fullWidth
          />
          <Button
            type='submit'
            variant='contained'
            color='primary'
            className={classes.button}
            disabled={loading}
          >
            Crear Cuenta
            {loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};
export default withStyles(styles)(Signup);
