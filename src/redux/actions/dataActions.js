import { SET_DATA, LOADING_UI, STOP_LOADING_UI, LOADING_DATA } from '../types';
import firebase from '../../firebaseConfig';

export const getData = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  firebase
    .collection('inventario')
    .orderBy('empresa')
    .orderBy('numero')
    .get()
    .then((res) => {
      const elements = [];
      res.forEach((doc) => {
        elements.push({ id: doc.id, ...doc.data() });
      });
      dispatch({
        type: SET_DATA,
        payload: elements,
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

export const updateData = (newData, id) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  firebase
    .collection('inventario')
    .doc(id)
    .update(newData)
    .then(() => {
      dispatch(getData());
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};
