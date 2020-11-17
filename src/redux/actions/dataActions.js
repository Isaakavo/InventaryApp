import {
  SET_DATA,
  LOADING_UI,
  STOP_LOADING_UI,
  LOADING_DATA,
  ITEM_ADDED,
  CHANGE_DATABASE,
  SET_LASTNUM,
  SET_ALL_DATA,
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
      let lastIndex;
      res.forEach((doc) => {
        elements.push({ id: doc.id, ...doc.data() });
        lastIndex = doc.data().numero;
      });
      dispatch({
        type: SET_DATA,
        payload: elements,
      });
      dispatch({
        type: SET_LASTNUM,
        payload: lastIndex,
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

export const getAllData = () => (dispatch) => {
  firebase
    .collection('inventario')
    .orderBy('numero')
    .get()
    .then((res) => {
      const elements = [];
      res.forEach((doc) => {
        elements.push({ id: doc.id, ...doc.data() });
      });
      dispatch({
        type: SET_ALL_DATA,
        payload: elements,
      });
      console.log(elements);
    })
    .catch((err) => console.error(err));
};

export const changeDb = (DB) => (dispatch) => {
  dispatch({ type: CHANGE_DATABASE, payload: DB });
};

export const updateData = (newData, id, empresa) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  firebase
    .collection('inventario')
    .doc(id)
    .update(newData)
    .then(() => {
      dispatch(getData(empresa));
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};

export const addData = (newItem, lastId) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  const date = new Date().toISOString();
  lastId++;
  const newItemToAdd = {
    numero: lastId,
    clave: newItem.clave,
    equipo: newItem.equipo,
    caracteristicas: newItem.caracteristicas,
    marca: newItem.marca,
    cantidad: newItem.cantidad,
    userHandle: newItem.userHandle,
    ubicacion: newItem.ubicacion,
    observaciones: newItem.observaciones,
    empresa: newItem.empresa.toLowerCase(),
    fechaIngreso: date,
  };
  firebase
    .collection('inventario')
    .add(newItemToAdd)
    .then((doc) => {
      const resData = newItem;
      resData.id = doc.id;
      resData.numero = lastId;
      resData.fechaIngreso = date;
      dispatch({
        type: ITEM_ADDED,
        payload: resData,
      });
      dispatch({
        type: SET_LASTNUM,
        payload: lastId,
      });
    })
    .catch((err) => console.error(err));
};
