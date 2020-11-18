import { admin } from '../../firebaseConfig';

import { SET_UNAUTHENTICATED } from '../types';

export const loginUser = (email, password, history) => (dispatch) => {
  admin
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      history.push('/');
    })
    .catch((err) => {
      console.error(err);
    });
};

export const logoutUser = () => (dispatch) => {
  admin.signOut().then((res) => {
    dispatch({ type: SET_UNAUTHENTICATED });
  });
};
