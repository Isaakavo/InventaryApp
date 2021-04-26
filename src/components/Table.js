import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import Row from './Row';
import { header, exitHeader } from '../util/header';
import AddItem from './AddItem';
import AddExitItem from './AddExitItem';
import NavBar from '../components/NavBar';
import MyButton from '../util/MyButton';

// MUI
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import TableMUI from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
//Icons
import Refresh from '@material-ui/icons/Refresh';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { getData, getExits } from '../redux/actions/dataActions';
const styles = (theme) => ({
  ...theme.spreadThis,
  buttonAdd: {
    color: theme.palette.common.white,
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
  const { data, exits, loading, empresa } = useSelector((state) => state.data);

  const dispatch = useDispatch();

  const { authenticated } = useSelector((state) => state.user);

  const displayingRow =
    !loading && authenticated ? (
      <TableBody>
        {empresa !== 'salidas'
          ? data.map((row, index) => {
              return <Row key={index} row={row} header={header} />;
            })
          : exits.map((row, index) => {
              return <Row key={index} row={row} header={exitHeader} />;
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
    if (empresa !== 'salidas') {
      dispatch(getData(empresa));
    } else {
      dispatch(getExits());
    }
  }, [empresa, dispatch]);
  return (
    <>
      <NavBar />
      {authenticated ? (
        <Container maxWidth='xl'>
          <Paper className={classes.root}>
            <TableContainer className={classes.tableContainer}>
              <TableMUI
                stickyHeader
                aria-label='sticky table'
                className={classes.exitTable}
                size='small'
                padding='checkbox'
              >
                <TableHead>
                  <TableRow>
                    <StyledTableCell />
                    {empresa !== 'salidas'
                      ? header.map((head, index) => {
                          return (
                            <StyledTableCell
                              key={index}
                              className={classes.table}
                            >
                              {head.header}
                            </StyledTableCell>
                          );
                        })
                      : exitHeader.map((head, index) => {
                          return (
                            <StyledTableCell
                              key={index}
                              className={classes.table}
                            >
                              {head.header}
                            </StyledTableCell>
                          );
                        })}
                    <StyledTableCell>
                      {authenticated && empresa !== 'salidas' ? (
                        <AddItem />
                      ) : (
                        <AddExitItem />
                      )}
                    </StyledTableCell>
                    <StyledTableCell>
                      <MyButton
                        tip='Refrescar Tabla'
                        onClick={() => dispatch(getData(empresa))}
                        btnClassName={classes.buttonAdd}
                        disabled={loading}
                      >
                        <Refresh />
                      </MyButton>
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                {displayingRow}
              </TableMUI>
            </TableContainer>
          </Paper>
        </Container>
      ) : (
        <Redirect to='/' />
      )}
    </>
  );
};

export default withStyles(styles)(Table);
