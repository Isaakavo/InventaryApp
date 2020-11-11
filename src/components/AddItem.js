import React, { useState } from 'react';
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
//Icons
import AddIcon from '@material-ui/icons/Add';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { addData } from '../redux/actions/dataActions';

const initialValue = {
  clave: '',
  equipo: '',
  caracteristicas: '',
  marca: '',
  cantidad: 0,
  userHandle: '',
  ubicacion: '',
  observaciones: '',
  empresa: '',
  fechaIngreso: '',
};

const styles = (theme) => ({
  ...theme.spreadThis,
  buttonAdd: {
    color: theme.palette.common.white,
  },
});

const AddItem = ({ classes }) => {
  const [open, setOpen] = useState(false);
  const [newItem, setNewItem] = useState(initialValue);

  const loading = useSelector((state) => state.data.loading);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setNewItem({
      ...newItem,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addData(newItem));
    setOpen(false);
  };

  return (
    <>
      <MyButton
        tip='Agregar un nuevo elemento al inventario'
        onClick={() => setOpen(true)}
        btnClassName={classes.buttonAdd}
      >
        <AddIcon />
      </MyButton>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth='md'
      >
        <DialogTitle>Agregar elementos</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name='clave'
              type='text'
              label='Clave'
              placeholder='Clave del equipo'
              className={classes.textField}
              value={newItem.clave}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name='equipo'
              type='text'
              label='Equipo'
              placeholder='Nombre del equipo'
              className={classes.textField}
              value={newItem.equipo}
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
              value={newItem.caracteristicas}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name='marca'
              type='text'
              label='marca'
              placeholder='Marca del equipo'
              className={classes.textField}
              value={newItem.marca}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name='cantidad'
              type='number'
              label='Cantidad'
              placeholder='Cantidad'
              className={classes.textField}
              value={newItem.cantidad}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name='empresa'
              type='text'
              label='Empresa'
              placeholder='Empresa'
              className={classes.textField}
              value={newItem.empresa}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name='ubicacion'
              type='text'
              label='Ubicación'
              placeholder='Ubicación'
              className={classes.textField}
              value={newItem.ubicacion}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name='observaciones'
              type='text'
              label='Observaciones'
              placeholder='Observaciones'
              className={classes.textField}
              value={newItem.observaciones}
              onChange={handleChange}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color='primary'>
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            color='primary'
            variant='contained'
            disabled={loading}
          >
            Subir
            {loading && (
              <CircularProgress size={30} className={classes.progressSpiner} />
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default withStyles(styles)(AddItem);
