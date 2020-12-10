import {
  SET_DATA,
  LOADING_UI,
  STOP_LOADING_UI,
  LOADING_DATA,
  ITEM_ADDED,
  CHANGE_DATABASE,
  SET_LASTNUM,
  SET_USER_DATA,
} from '../types';
import { firestore } from '../../firebaseConfig';
import { storage } from '../../firebaseConfig';

export const getData = (inventary) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  firestore
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

export const changeDb = (DB) => (dispatch) => {
  dispatch({ type: CHANGE_DATABASE, payload: DB });
};

export const updateData = (newData, id, empresa, image, credenciales) => (
  dispatch
) => {
  dispatch({ type: LOADING_UI });
  firestore
    .collection('inventario')
    .doc(id)
    .update(newData)
    .then(() => {
      if (image !== '') {
        dispatch({ type: STOP_LOADING_UI });
        dispatch(uploadImage(image, id, empresa));
      } else {
        dispatch({ type: STOP_LOADING_UI });
        dispatch(getData(empresa));
      }
    })

    .catch((err) => console.log(err));
  const modifiedElements = {
    idDoc: id,
    fecha: new Date().toISOString(),
    modificadoPor: credenciales.nickname,
    idUsuario: credenciales.idUsuario,
  };
  firestore
    .collection('actualizacionDeElementos')
    .add(modifiedElements)
    .then(() => {})
    .catch((err) => console.error(err));
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
  firestore
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
      dispatch(uploadImage(newItem.image, doc.id, newItem.empresa));
    })
    .catch((err) => console.error(err));
};

export const getUserData = (id) => (dispatch) => {
  firestore
    .collection('usuarios')
    .where('idUsuario', '==', id)
    .get()
    .then((res) => {
      let elements = {};
      res.forEach((doc) => {
        elements = doc.data();
      });
      dispatch({
        type: SET_USER_DATA,
        payload: elements,
      });
    })
    .catch((err) => console.log(err));
};

export const uploadImage = (image, id, empresa) => (dispatch) => {
  const uploadTask = storage.ref(`/${empresa}/${image.name}`).put(image);
  //initiate the firebase side uploading
  uploadTask.on(
    'state_changed',
    (snapshot) => {},
    (err) => {
      console.log(err);
    },
    () => {
      storage
        .ref(empresa)
        .child(image.name)
        .getDownloadURL()
        .then((url) => {
          firestore
            .collection('inventario')
            .doc(id)
            .update({
              imagen: url,
            })
            .catch((err) => console.log(err));
        })
        .then(() => {
          dispatch(getData(empresa));
        })
        .catch((err) => console.error(err));
    }
  );
};
