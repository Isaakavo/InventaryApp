import { admin, SESSION, firestore } from '../../firebaseConfig';
import { getUserData } from '../actions/dataActions';

import {
  SET_ERRORS,
  SET_UNAUTHENTICATED,
  CLEAR_ERRORS,
  LOADING_UI,
  STOP_LOADING_UI,
} from '../types';

export const loginUser = (email, password, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  admin.setPersistence(SESSION).then(() => {
    return admin
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        dispatch(getUserData(user.user.uid));
        history.push('/');
        dispatch({ type: CLEAR_ERRORS });
      })
      .catch((err) => {
        dispatch({ type: SET_ERRORS, payload: err.message });
        dispatch({ type: STOP_LOADING_UI });
      });
  });
};

export const logoutUser = () => (dispatch) => {
  admin.signOut().then((res) => {
    dispatch({ type: SET_UNAUTHENTICATED });
  });
};
const isEmail = (email) => {
  // eslint-disable-next-line
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(regEx)) return true;
  else return false;
};

const isEmpty = (string) => {
  if (string.trim() === '') return true;
  else return false;
};

const validateSignupData = (data) => {
  let errors = {};

  if (isEmpty(data.email)) {
    errors.email = 'No debe estar vacío';
  } else if (!isEmail(data.email)) {
    errors.email = 'Debe ser una dirección de correo válida';
  }

  if (isEmpty(data.password)) errors.password = 'No debe estar vacío';
  if (data.password !== data.confirmPassword)
    errors.confirmPassword = 'Las contraseñas deben ser las mismas';
  if (isEmpty(data.handle)) errors.handle = 'No debe estar vacío';

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

export const signup = (newUser) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  const { valid, errors } = validateSignupData(newUser);

  if (valid) {
    admin
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then((data) => {
        const userId = data.user.uid;
        const newUserAdd = {
          email: newUser.email,
          nickname: newUser.handle,
          creado: newUser.creado,
          idUsuario: userId,
        };
        firestore.doc(`usuarios/${newUserAdd.nickname}`).set(newUserAdd);
        dispatch({ type: STOP_LOADING_UI });
      })
      .catch((err) => console.log(err));
  } else {
    dispatch({ type: SET_ERRORS, payload: errors });
  }
};
