import React, { useEffect, useRef, useState } from 'react';
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
import CircularProgress from '@material-ui/core/CircularProgress';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Inputlabel from '@material-ui/core/InputLabel';
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
  const [imageAsFile, setImageAsFile] = useState('');

  const imageInput = useRef();

  const { empresa } = useSelector((state) => state.data);
  const loading = useSelector((state) => state.UI.loading);

  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    if (!loading) {
      console.log('closing');
      setOpen(false);
      setImageAsFile('');
    }
  };
  const handleChange = (e) => {
    setNewValue({
      ...newValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateData(newValue, row.id, empresa, imageAsFile));
    handleClose();
  };
  const handleSetImage = (e) => {
    const image = e.target.files[0];
    console.log(image);
    setImageAsFile(image);
  };
  const handleImageChange = () => {
    const fileInput = imageInput.current;
    fileInput.click();
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
        <DialogTitle>Editar</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name='clave'
              type='text'
              label='Clave'
              placeholder={row.clave}
              className={classes.textField}
              value={newValue.clave}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name='equipo'
              type='text'
              label='Equipo'
              placeholder={row.equipo}
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
              placeholder={row.caracteristicas}
              className={classes.textField}
              value={newValue.caracteristicas}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name='marca'
              type='text'
              label='marca'
              placeholder={row.marca}
              className={classes.textField}
              value={newValue.marca}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name='cantidad'
              type='number'
              label='Cantidad'
              placeholder={row.cantidad}
              className={classes.textField}
              value={newValue.cantidad >= 0 ? newValue.cantidad : 0}
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
              placeholder={row.ubicacion}
              className={classes.textField}
              value={newValue.ubicacion}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name='observaciones'
              type='text'
              label='Observaciones'
              placeholder={row.ubicaciones}
              className={classes.textField}
              value={newValue.observaciones}
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
