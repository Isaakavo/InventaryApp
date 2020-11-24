import React, { useState, useEffect, useRef } from 'react';
import MyButton from '../util/MyButton';
import withStyles from '@material-ui/core/styles/withStyles';
import { companies } from '../util/companies';
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
  ubicacion: '',
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
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [newItem, setNewItem] = useState(initialValue);
  const [imageAsFile, setImageAsFile] = useState('');

  const imageInput = useRef();

  const handleChange = (e) => {
    setNewItem({
      ...newItem,
      // empresa: empresa,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addData(newItem, ultimoId));
    setOpen(false);
    setNewItem(initialValue);
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
  console.log(newItem);
  useEffect(() => {
    setNewItem({
      ...initialValue,
      empresa: empresa,
    });
    initialValue = {
      ...initialValue,
      empresa: empresa,
    };
  }, [empresa]);
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
        maxWidth='sm'
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
              value={newItem.cantidad >= 0 ? newItem.cantidad : 0}
              onChange={handleChange}
              fullWidth
            />
            <Inputlabel id='select-empresa'>Empresa</Inputlabel>
            <Select
              labelId='select-empresa'
              id='empresa'
              name='empresa'
              // value={newItem.empresa}
              value={empresa}
              onChange={handleChange}
              // disabled={true}
            >
              {companies.map((item) => {
                return (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                );
              })}
            </Select>
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
            <input
              type='file'
              id='imageInput'
              ref={imageInput}
              hidden='hidden'
              onChange={handleSetImage}
            />
            <div className={classes.imageContainer}>
              <Typography variant='body1'>
                Nombre: {imageAsFile.name}
              </Typography>
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
            {/* {loading && (
              <CircularProgress size={30} className={classes.progressSpiner} />
            )} */}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default withStyles(styles)(AddItem);
