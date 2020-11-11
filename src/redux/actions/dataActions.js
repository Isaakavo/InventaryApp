import {
  SET_DATA,
  LOADING_UI,
  STOP_LOADING_UI,
  LOADING_DATA,
  ITEM_ADDED,
  CHANGE_DATABASE,
} from '../types';
import firebase from '../../firebaseConfig';

export const getData = (inventary) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  firebase
    .collection('inventario')
    .where('empresa', '==', inventary)
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

export const changeDb = (DB) => (dispatch) => {
  dispatch({ type: CHANGE_DATABASE, payload: DB });
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

export const addData = (newItem) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  const date = new Date().toISOString();
  const newItemToAdd = {
    clave: newItem.clave,
    equipo: newItem.equipo,
    caracteristicas: newItem.caracteristicas,
    marca: newItem.marca,
    cantidad: newItem.cantidad,
    userHandle: newItem.userHandle,
    ubicacion: newItem.ubicacion,
    observaciones: newItem.observaciones,
    empresa: newItem.empresa,
    fechaIngreso: date,
  };
  firebase
    .collection('inventario')
    .add(newItemToAdd)
    .then((doc) => {
      const resData = newItem;
      resData.id = doc.id;
      dispatch({
        type: ITEM_ADDED,
        payload: resData,
      });
    })
    .catch((err) => console.error(err));
};
