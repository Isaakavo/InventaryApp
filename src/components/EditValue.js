import React, { useEffect, useState } from 'react';
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
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { updateData } from '../redux/actions/dataActions';

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
};

const styles = (theme) => ({
  ...theme.spreadThis,
});

const EditValue = ({ classes, row }) => {
  const [open, setOpen] = useState(false);
  const [newValue, setNewValue] = useState(initialValue);

  const { empresa } = useSelector((state) => state.data);
  const loading = useSelector((state) => state.UI.loading);

  const dispatch = useDispatch();

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
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateData(newValue, row.id, empresa));
    handleClose();
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
          <form>
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
              placeholder='Cantidad'
              className={classes.textField}
              value={newValue.cantidad}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name='empresa'
              type='text'
              label='Empresa'
              placeholder='Empresa'
              className={classes.textField}
              value={newValue.empresa}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name='ubicacion'
              type='text'
              label='Ubicación'
              placeholder='Ubicación'
              className={classes.textField}
              value={newValue.ubicacion}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name='observaciones'
              type='text'
              label='Observaciones'
              placeholder='Observaciones'
              className={classes.textField}
              value={newValue.observaciones}
              onChange={handleChange}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            color='primary'
            variant='contained'
            disabled={loading}
          >
            Actualizar
            {loading && (
              <CircularProgress size={30} className={classes.progressSpiner} />
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default withStyles(styles)(EditValue);
