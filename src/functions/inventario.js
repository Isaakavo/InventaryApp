import firebase from '../firebaseConfig';

export const getDataBase = () => {
  firebase
    .collection('inventario')
    .get()
    .then((snapshot) => {
      const elements = [];
      snapshot.forEach((doc) => {
        elements.push({ id: doc.id, ...doc.data() });
      });
      return elements;
    })
    .catch((err) => console.log(err));
};
