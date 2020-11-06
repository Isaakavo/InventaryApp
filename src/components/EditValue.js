import React, { useEffect, useState } from 'react';
import firebase from '../firebaseConfig';
import MyButton from '../util/MyButton';
import withStyles from '@material-ui/core/styles/withStyles';
//MUI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import CircularProgress from '@material-ui/core/CircularProgress';
//Icon
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';

const initialValue = {
  clave: '',
  equipo: '',
  caracteristicas: '',
  marca: '',
  cantidad: 9,
  userHandle: '',
  ubicacion: '',
  observaciones: '',
  empresa: '',
  userHandle: '',
};

const styles = (theme) => ({
  ...theme.spreadThis,
});

const EditValue = ({ classes, row }) => {
  const [open, setOpen] = useState(false);
  const [newValue, setNewValue] = useState(initialValue);
  const [updated, setUpdated] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (e) => {
    setNewValue({
      ...newValue,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = () => {
    updateData();
    handleClose();
  };

  const updateData = () => {
    firebase
      .collection('inventario')
      .doc(row.id)
      .update(newValue)
      .then(setUpdated(true))
      .catch((err) => console.log('Nel no se subio'));
  };

  useEffect(() => {
    setNewValue({
      clave: row.clave ? row.clave : '',
      equipo: row.equipo ? row.equipo : '',
      caracteristicas: row.caracteristicas ? row.caracteristicas : '',
      marca: row.marca ? row.marca : '',
      cantidad: row.cantidad ? row.cantidad : '',
      userHandle: row.userHandle ? row.userHandle : '',
      ubicacion: row.ubicacion ? row.ubicacion : '',
      observaciones: row.observaciones ? row.observaciones : '',
      empresa: row.empresa ? row.empresa : '',
    });
  }, [row]);
  return (
    <>
      <MyButton
        tip='editar'
        onClick={() => handleOpen()}
        btnClassName={classes.button}
      >
        <EditIcon color='primary' />
      </MyButton>
      <Dialog open={open} onClose={() => handleClose()} fullWidth maxWidth='sm'>
        <DialogTitle>Editar valores</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name='clave'
              type='text'
              label='Clave'
              placeholder='Clave del equipo'
              className={classes.textField}
              value={newValue.clave}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name='equipo'
              type='text'
              label='Equipo'
              placeholder='Nombre del equipo'
              className={classes.textField}
              value={newValue.equipo}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name='caracteristicas'
              type='text'
              label='Caracteristicas'
              multiline
              rows='3'
              placeholder='catacteristicas'
              className={classes.textField}
              value={newValue.caracteristicas}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name='marca'
              type='text'
              label='marca'
              placeholder='Marca del equipo'
              className={classes.textField}
              value={newValue.marca}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name='cantidad'
              type='number'
              label='Cantidad'
              placeholder='A short bio about yourself'
              className={classes.textField}
              value={newValue.cantidad}
              onChange={handleChange}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleSubmit} color='primary'>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default withStyles(styles)(EditValue);
