import React, { useState } from 'react';
import Editvalue from './EditValue';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import { innerHeader } from '../util/header';
//MUI
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Collapse from '@material-ui/core/Collapse';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
//Icon
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
//Redux
// import { useDispatch, useSelector } from 'react-redux';

const styles = (theme) => ({
  ...theme.spreadThis,
});

const Row = ({ row, header, classes }) => {
  const [open, setOpen] = useState(false);
  // const date = dayjs.extend(row.fechaIngreso);

  const tableHead = innerHeader.map((head) => {
    return (
      <TableCell key={head.id} className={classes.headerRow}>
        {head.label}
      </TableCell>
    );
  });
  const tableBody = innerHeader.map((head, index) => {
    let value;
    if (head.id === 'fechaIngreso') {
      value = dayjs(row[head.id]).format('DD/MM/YYYY');
    } else {
      value = row[head.id];
    }
    return <TableCell key={index}>{value}</TableCell>;
  });
  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {header.map((head, index) => {
          const value = row[head.id];
          return <TableCell key={index}>{value}</TableCell>;
        })}
        <TableCell>
          <Editvalue row={row} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box margin={1}>
              <Typography variant='h6' gutterBottom component='div'>
                Detalles
              </Typography>
              <Table size='small' aria-label='detalles'>
                <TableHead>
                  <TableRow>{tableHead}</TableRow>
                </TableHead>
                <TableBody>{tableBody}</TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default withStyles(styles)(Row);
