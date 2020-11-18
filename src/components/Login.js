import React, { useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
//MUI stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
//Redux stuff
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';

const styles = (theme) => ({
  ...theme.spreadThis,
  errors: {
    marginTop: '15px',
    color: 'red',
    textAlign: 'center',
  },
});

const Login = ({ classes, history }) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const { loading, errors } = useSelector((state) => state.UI);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(userEmail, userPassword, history));
  };
  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <Typography variant='h2' className={classes.pageTitle}>
          Inicio de Sesión
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id='email'
            name='email'
            type='email'
            label='Correo'
            error={errors ? true : false}
            className={classes.textField}
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            fullWidth
          />
          <TextField
            id='password'
            name='password'
            type='password'
            label='Contraseña'
            className={classes.textField}
            error={errors ? true : false}
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            fullWidth
          />
          <Button
            type='submit'
            variant='contained'
            color='primary'
            className={classes.button}
            disabled={loading}
          >
            Iniciar Sesión
            {loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
        </form>
        {errors && (
          <Typography variant='h5' className={classes.errors}>
            Credenciales incorrectas
          </Typography>
        )}
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

export default withStyles(styles)(Login);
