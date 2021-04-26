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
//Icons
import AddIcon from '@material-ui/icons/Add';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { addExitData } from '../redux/actions/dataActions';

let initialValue = {
  clave: '',
  equipo: '',
  marca: '',
  cantidadSalida: 0,
  userHandle: '',
  ubicacion: 'almacen espectro',
  fechaIngreso: '',
  fechaSalida: '',
  empresa: '',
  entrega: '',
  recibe: '',
  hospital: '',
  caracteristicas: '',
};

const styles = (theme) => ({
  ...theme.spreadThis,
  buttonAdd: {
    color: theme.palette.common.white,
  },
});

const AddExitItem = ({ classes }) => {
  const { loading, ultimoId } = useSelector((state) => state.data);
  const { credentials } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [newExit, setNewExit] = useState(initialValue);

  const handleChange = (e) => {
    setNewExit({
      ...newExit,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addExitData(newExit, ultimoId));
    console.log(newExit);
    setOpen(false);
    setNewExit(initialValue);
  };

  useEffect(() => {
    setNewExit({
      ...initialValue,
      numeroSalida: ultimoId + 1,
    });
  }, [ultimoId]);

  return (
    <>
      <MyButton
        tip='Agregar un nuevo elemento al inventario'
        onClick={() => setOpen(true)}
        btnClassName={classes.buttonAdd}
        disabled={loading}
      >
        <AddIcon />
      </MyButton>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth='sm'
      >
        <DialogTitle>Agregar Salidas</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name='empresa'
              type='text'
              label='Empresa'
              placeholder='Empresa'
              className={classes.textField}
              value={newExit.empresa}
              disabled={!credentials.admin}
              onChange={handleChange}
              variant='outlined'
              fullWidth
            />
            <TextField
              name='fechaIngreso'
              type='datetime-local'
              label='Fecha de Ingreso'
              className={classes.textField}
              disabled={!credentials.admin}
              onChange={handleChange}
              variant='outlined'
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
            <TextField
              name='fechaSalida'
              type='datetime-local'
              label='Fecha de Salida'
              className={classes.textField}
              disabled={!credentials.admin}
              onChange={handleChange}
              variant='outlined'
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
            <TextField
              name='entrega'
              type='text'
              label='Entrega'
              placeholder='Entrega'
              className={classes.textField}
              value={newExit.entrega}
              onChange={handleChange}
              variant='outlined'
              fullWidth
            />
            <TextField
              name='recibe'
              type='text'
              label='Recibe'
              placeholder='Entrega'
              className={classes.textField}
              value={newExit.recibe}
              onChange={handleChange}
              variant='outlined'
              fullWidth
            />
            <TextField
              name='clave'
              type='text'
              label='Clave'
              placeholder='Clave'
              className={classes.textField}
              value={newExit.clave}
              onChange={handleChange}
              variant='outlined'
              fullWidth
            />
            <TextField
              name='equipo'
              type='text'
              label='Equipo'
              placeholder='Equipo'
              className={classes.textField}
              value={newExit.equipo}
              onChange={handleChange}
              variant='outlined'
              fullWidth
            />
            <TextField
              name='caracteristicas'
              type='text'
              label='Caracteristicas'
              placeholder='Caracteristicas'
              className={classes.textField}
              value={newExit.caracteristicas}
              onChange={handleChange}
              variant='outlined'
              fullWidth
            />
            <TextField
              name='marca'
              type='text'
              label='marca'
              placeholder='marca'
              className={classes.textField}
              value={newExit.marca}
              onChange={handleChange}
              variant='outlined'
              fullWidth
            />
            <TextField
              name='cantidadSalida'
              type='number'
              label='Cantidad'
              placeholder='Cantidad'
              className={classes.textField}
              value={newExit.cantidadSalida}
              onChange={handleChange}
              variant='outlined'
              fullWidth
            />
            <TextField
              name='hospital'
              type='text'
              label='Hospital'
              placeholder='Hospital'
              className={classes.textField}
              value={newExit.hospital}
              onChange={handleChange}
              variant='outlined'
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
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default withStyles(styles)(AddExitItem);
