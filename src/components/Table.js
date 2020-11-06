import React, { useEffect, useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import firebase from '../firebaseConfig';
import Row from './Row';
import { header } from '../util/header';

// MUI
import Paper from '@material-ui/core/Paper';
import TableMUI from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const styles = (theme) => ({
  ...theme.spreadThis,
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
  const [data, setData] = useState([]);

  const getDataBase = () => {
    firebase
      .collection('inventario')
      .orderBy('numero')
      .get()
      .then((snapshot) => {
        const elements = [];
        snapshot.forEach((doc) => {
          elements.push({ id: doc.id, ...doc.data() });
        });
        setData(elements);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getDataBase();
  }, []);
  console.log(data);
  return (
    <Paper className={classes.root}>
      <TableContainer>
        <TableMUI
          stickyHeader
          aria-label='sticky table'
          className={classes.table}
        >
          <TableHead className={classes.primary}>
            <TableRow>
              <StyledTableCell />
              {header.map((head) => {
                return (
                  <StyledTableCell key={head.id} className={classes.table}>
                    {head.label}
                  </StyledTableCell>
                );
              })}
              <StyledTableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => {
              console.log(row);
              return <Row row={row} header={header} />;
            })}
          </TableBody>
        </TableMUI>
      </TableContainer>
    </Paper>
  );
};

export default withStyles(styles)(Table);
