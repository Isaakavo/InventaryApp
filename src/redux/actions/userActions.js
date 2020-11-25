import { admin } from '../../firebaseConfig';
import { getUserData } from '../actions/dataActions';

import {
  SET_ERRORS,
  SET_UNAUTHENTICATED,
  CLEAR_ERRORS,
  LOADING_UI,
} from '../types';

export const loginUser = (email, password, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  admin
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      dispatch(getUserData(user.user.uid));
      console.log(user.user.uid);
      history.push('/');
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.message });
      console.log(err);
    });
};

export const logoutUser = () => (dispatch) => {
  admin.signOut().then((res) => {
    dispatch({ type: SET_UNAUTHENTICATED });
  });
};
