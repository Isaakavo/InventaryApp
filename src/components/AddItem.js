import React, { useState, useEffect, useRef } from 'react';
import MyButton from '../util/MyButton';
import withStyles from '@material-ui/core/styles/withStyles';
import { almacenes } from '../util/companies';
//MUI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Inputlabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
//Icons
import AddIcon from '@material-ui/icons/Add';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { addData } from '../redux/actions/dataActions';

let initialValue = {
  clave: '',
  equipo: '',
  caracteristicas: '',
  marca: '',
  cantidad: 0,
  userHandle: '',
  ubicacion: 'almacen espectro',
  observaciones: '',
  fechaIngreso: '',
  empresa: '',
};

const styles = (theme) => ({
  ...theme.spreadThis,
  buttonAdd: {
    color: theme.palette.common.white,
  },
});

const AddItem = ({ classes }) => {
  const { loading, empresa, ultimoId } = useSelector((state) => state.data);
  const { credentials } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [newItem, setNewItem] = useState(initialValue);
  const [imageAsFile, setImageAsFile] = useState('');
  const [errors, setErrors] = useState({});

  const imageInput = useRef();

  const handleChange = (e) => {
    setNewItem({
      ...newItem,
      [e.target.name]: e.target.value,
    });
  };
  const hangleNumberChange = (e) => {
    setNewItem({
      ...newItem,
      [e.target.name]: parseInt(e.target.value),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newItem.cantidad === 0 || newItem.equipo === '') {
      setErrors({
        cantidad: 'Cantidad no válida',
        equipo: 'Debe llenar este campo',
      });
    } else {
      dispatch(addData(newItem, ultimoId));
      setOpen(false);
      setNewItem(initialValue);
      setErrors({});
      setImageAsFile('');
    }
  };

  const handleSetImage = (e) => {
    const imageName = e.target.files[0];
    setImageAsFile(imageName);
    setNewItem({
      ...newItem,
      image: imageName,
    });
    console.log(imageName);
  };
  const handleImageChange = () => {
    const fileInput = imageInput.current;
    fileInput.click();
  };
  useEffect(() => {
    setNewItem({
      ...initialValue,
      empresa: empresa,
      numero: ultimoId + 1,
    });
    initialValue = {
      ...initialValue,
      empresa: empresa,
    };
  }, [empresa, ultimoId]);
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
        <DialogTitle>Agregar elementos en {empresa}</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name='numero'
              type='number'
              label='Numero'
              placeholder='Numero'
              className={classes.textField}
              value={newItem.numero}
              disabled={!credentials.admin}
              onChange={hangleNumberChange}
              variant='outlined'
              fullWidth
            />
            <TextField
              name='clave'
              type='text'
              label='Clave'
              placeholder='Clave del equipo'
              className={classes.textField}
              value={newItem.clave}
              onChange={handleChange}
              variant='outlined'
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
              error={errors.equipo ? true : false}
              helperText={errors.equipo}
              variant='outlined'
              fullWidth
            />
            <TextField
              name='caracteristicas'
              type='text'
              label='Caracteristicas'
              multiline
              rows='2'
              placeholder='Caracteristicas'
              className={classes.textField}
              value={newItem.caracteristicas}
              onChange={handleChange}
              variant='outlined'
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
              variant='outlined'
              fullWidth
            />
            <TextField
              name='cantidad'
              type='number'
              label='Cantidad'
              placeholder='Cantidad'
              className={classes.textField}
              value={newItem.cantidad >= 0 ? newItem.cantidad : 0}
              onChange={handleChange}
              error={errors.cantidad ? true : false}
              helperText={errors.cantidad}
              variant='outlined'
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
              variant='outlined'
              fullWidth
            />
            <Inputlabel id='select-ubicacion'>Ubicación</Inputlabel>
            <Select
              labelId='select-ubicacion'
              id='ubicacion'
              name='ubicacion'
              value={newItem.ubicacion}
              onChange={handleChange}
              className={classes.textField}
              variant='outlined'
            >
              {almacenes.map((item) => {
                return (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                );
              })}
            </Select>
            <input
              type='file'
              id='imageInput'
              ref={imageInput}
              hidden='hidden'
              onChange={handleSetImage}
            />
            <div className={classes.imageContainer}>
              <Typography variant='body1'>{imageAsFile.name}</Typography>
              <Button
                variant='contained'
                color='primary'
                onClick={handleImageChange}
              >
                Elegir imagen
              </Button>
            </div>
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

export default withStyles(styles)(AddItem);
