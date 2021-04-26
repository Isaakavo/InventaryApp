import {
  SET_DATA,
  SET_EXITS,
  LOADING_UI,
  STOP_LOADING_UI,
  LOADING_DATA,
  ITEM_ADDED,
  CHANGE_DATABASE,
  SET_LASTNUM,
  SET_USER_DATA,
  UPDATE_DATA,
  DELETE_DATA,
  EXIT_ADDED,
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
export const getExits = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });

  firestore
    .collection('salidas')
    .orderBy('numeroSalida')
    .get()
    .then((res) => {
      let lastIndex;
      const elements = [];
      res.forEach((doc) => {
        lastIndex = doc.data().numeroSalida;
        elements.push({ id: doc.id, ...doc.data() });
        dispatch({
          type: SET_EXITS,
          payload: elements,
        });
        dispatch({
          type: SET_LASTNUM,
          payload: lastIndex,
        });
        // firestore
        //   .collection('inventario')
        //   .doc(doc.data().idEquipo)
        //   .get()
        //   .then((response) => {
        //     elements.push({ id: doc.id, ...doc.data(), ...response.data() });
        //     dispatch({
        //       type: SET_EXITS,
        //       payload: elements,
        //     });
        //     dispatch({
        //       type: SET_LASTNUM,
        //       payload: lastIndex,
        //     });
        //   });
      });
      console.log(elements);
    })
    .catch((err) => {
      console.error(err);
    });
};

export const changeDb = (DB) => (dispatch) => {
  dispatch({ type: CHANGE_DATABASE, payload: DB });
};

export const updateData = (
  newData,
  oldValue,
  id,
  empresa,
  image,
  credenciales
) => (dispatch) => {
  const newValues = {
    id: id,
    ...newData,
  };
  console.log(newData);
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
        dispatch({ type: UPDATE_DATA, payload: newValues });
      }
    })
    .catch((err) => console.log(err));

  let newValue = compareValue(newValues, oldValue);

  const modifiedElements = {
    idDoc: id,
    fecha: new Date().toISOString(),
    modificadoPor: credenciales.nickname,
    idUsuario: credenciales.idUsuario,
    elementModif: newValue,
  };
  firestore
    .collection('actualizacionDeElementos')
    .add(modifiedElements)
    .then(() => {})
    .catch((err) => console.error(err));
  dispatch({ type: STOP_LOADING_UI });
};

const compareValue = (obj1, obj2) => {
  let value = {};
  if (obj1.clave !== obj2.clave) {
    value = {
      ...value,
      claveOld: obj2.clave,
      claveNew: obj1.clave,
    };
  }
  if (obj1.equipo !== obj2.equipo) {
    value = {
      ...value,
      equipoOld: obj2.equipo,
      equipoNew: obj1.equipo,
    };
  }
  if (obj1.caracteristicas !== obj2.caracteristicas) {
    value = {
      ...value,
      caracteristicasOld: obj2.caracteristicas,
      caracteristicasNew: obj1.caracteristicas,
    };
  }
  if (obj1.marca !== obj2.marca) {
    value = {
      ...value,
      marcaOld: obj2.marca,
      marcaNew: obj1.marca,
    };
  }
  if (obj1.cantidad !== obj2.cantidad) {
    value = {
      ...value,
      cantidadOld: obj2.cantidad,
      cantidadNew: obj1.cantidad,
    };
  }
  if (obj1.observaciones !== obj2.observaciones) {
    value = {
      ...value,
      observacionesOld: obj2.observaciones,
      observacionesNew: obj1.observaciones,
    };
  }
  if (obj1.ubicacion !== obj2.ubicacion) {
    value = {
      ...value,
      ubicacionOld: obj2.ubicacion,
      ubicacionNew: obj1.ubicacion,
    };
  }
  return value;
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

export const addExitData = (newExit, lastId) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  lastId++;
  firestore
    .collection('salidas')
    .add(newExit)
    .then((doc) => {
      const resData = newExit;
      resData.id = doc.id;
      resData.numero = lastId;
      dispatch({
        type: EXIT_ADDED,
        payload: resData,
      });
      dispatch({
        type: SET_LASTNUM,
        payload: lastId,
      });
    })
    .catch((err) => console.error(err));
};

export const deleteData = (item, numero, ultimoid) => (dispatch) => {
  // dispatch({ type: LOADING_DATA });
  let valueToDelete = item.find((index) => index.numero === numero);
  let idToChange = item.filter((index) => index.numero > numero);
  console.log(idToChange);
  firestore
    .collection('inventario')
    .doc(valueToDelete.id)
    .delete()
    .then((res) => {
      idToChange.forEach((el) => {
        let numberToChange = el.numero - 1;
        firestore.collection('inventario').doc(el.id).update({
          numero: numberToChange,
        });
      });
      dispatch({ type: SET_LASTNUM, payload: ultimoid - 1 });
      dispatch({
        type: DELETE_DATA,
        payload: valueToDelete.numero,
      });
    })
    .catch((err) => console.log(err));
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
        .catch((err) => console.error(err));
    }
  );
};
