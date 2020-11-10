import React, { useEffect } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
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
import CircularProgress from '@material-ui/core/CircularProgress';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../redux/actions/dataActions';
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
  const dataReducer = useSelector((state) => state.data);
  const { data, loading } = dataReducer;
  const dispatch = useDispatch();

  const displayingRow = !loading ? (
    data.map((row, index) => {
      console.log(row);
      return <Row key={index} row={row} header={header} />;
    })
  ) : (
    <TableRow>
      <CircularProgress size={100} thickness={2} className={classes.progress} />
    </TableRow>
  );

  useEffect(() => {
    dispatch(getData());
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
              {header.map((head, index) => {
                return (
                  <StyledTableCell key={index} className={classes.table}>
                    {head.label}
                  </StyledTableCell>
                );
              })}
              <StyledTableCell />
            </TableRow>
          </TableHead>
          <TableBody>{displayingRow}</TableBody>
        </TableMUI>
      </TableContainer>
    </Paper>
  );
};

export default withStyles(styles)(Table);
