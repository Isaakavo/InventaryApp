import React, { useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
//Material UI
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
//Icon
import DeleteIcon from '@material-ui/icons/Delete';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { deleteData } from '../redux/actions/dataActions';
import { Button } from '@material-ui/core';

const styles = (theme) => ({
  ...theme.spreadThis,
});

const DeleteItem = ({ classes, numero, handleClose }) => {
  const [open, setOpen] = useState(false);

  const { data, ultimoId } = useSelector((state) => state.data);

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    // let valueToDelete = data.find((index) => index.numero === numero);
    dispatch(deleteData(data, numero, ultimoId));
    handleClose();
  };

  return (
    <>
      <Button
        onClick={handleClickOpen}
        color='primary'
        variant='contained'
        className={classes.buttonDelete}
        startIcon={<DeleteIcon />}
      >
        Borrar
      </Button>
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle id='alert-dialog-title'>{'¿Está seguro?'}</DialogTitle>
        <DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseDialog}
              color='primary'
              variant='outlined'
              size='small'
              autoFocus
            >
              Cancelar
            </Button>
            <Button
              onClick={handleDelete}
              color='primary'
              variant='outlined'
              size='small'
            >
              Aceptar
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default withStyles(styles)(DeleteItem);
