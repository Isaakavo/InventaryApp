import React, { useState, useEffect } from 'react';
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
});

const Login = ({ classes, history }) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userErrors, setUserErrors] = useState({
    errors: {
      email: '',
      password: '',
    },
  });

  const UI = useSelector((state) => state.UI);

  const { loading } = UI;

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(userEmail, userPassword, history));
  };

  useEffect(() => {
    if (UI.errors) {
      setUserErrors({
        errors: UI.errors,
      });
    }
  }, [UI.errors]);
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
            className={classes.textField}
            helperText={userErrors.errors.email}
            error={userErrors.errors.email ? true : false}
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
            helperText={userErrors.errors.password}
            error={userErrors.errors.password ? true : false}
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            fullWidth
          />
          {userErrors.errors.general && (
            <Typography variant='body' className={classes.customError}>
              {userErrors.errors.general}
            </Typography>
          )}
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
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

export default withStyles(styles)(Login);
