import React, { useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
//MUI stuff
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
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
    <Container maxWidth='sm'>
      <Paper className={classes.login}>
        <Typography variant='h5' className={classes.pageTitle}>
          INICIO DE SESIÓN
        </Typography>
        <form noValidate onSubmit={handleSubmit} className={classes.loginForm}>
          <TextField
            id='email'
            name='email'
            type='email'
            label='Correo'
            error={errors ? true : false}
            className={classes.textField}
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
            variant='outlined'
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
            required
            variant='outlined'
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
      </Paper>
    </Container>
  );
};

export default withStyles(styles)(Login);
