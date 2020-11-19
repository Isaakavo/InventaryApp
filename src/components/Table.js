import React, { useEffect } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Row from './Row';
import { header } from '../util/header';
import AddItem from './AddItem';

// MUI
import Paper from '@material-ui/core/Paper';
import TableMUI from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { getAllData, getData } from '../redux/actions/dataActions';
import { Typography } from '@material-ui/core';
const styles = (theme) => ({
  ...theme.spreadThis,
  spinnerDiv: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const Table = ({ classes }) => {
  const { data, loading, empresa } = useSelector((state) => state.data);

  const dispatch = useDispatch();

  const { authenticated } = useSelector((state) => state.user);

  const displayingRow =
    !loading && authenticated ? (
      <TableBody>
        {data.map((row, index) => {
          return <Row key={index} row={row} header={header} />;
        })}
      </TableBody>
    ) : (
      <TableBody>
        <TableRow>
          <TableCell>Cargando...</TableCell>
        </TableRow>
      </TableBody>
    );

  useEffect(() => {
    dispatch(getData(empresa));
  }, [empresa, dispatch]);
  useEffect(() => {
    dispatch(getAllData());
  }, [dispatch]);
  return (
    <>
      {authenticated ? (
        <Paper className={classes.root}>
          <TableContainer className={classes.tableContainer}>
            <TableMUI
              stickyHeader
              aria-label='sticky table'
              className={classes.table}
            >
              <TableHead className={classes.primary}>
                <TableRow>
                  <StyledTableCell />
                  {header.map((head, index) => {
                    return (
                      <StyledTableCell key={index} className={classes.table}>
                        {head.header}
                      </StyledTableCell>
                    );
                  })}
                  <StyledTableCell>
                    {authenticated && <AddItem />}
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              {displayingRow}
            </TableMUI>
          </TableContainer>
        </Paper>
      ) : (
        <Typography variant='h2'>Por favor, inicie sesión</Typography>
      )}
    </>
  );
};

export default withStyles(styles)(Table);
