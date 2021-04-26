import React, { useState } from 'react';
import Editvalue from './EditItem';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import { innerHeader, exitInnerHeader } from '../util/header';
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
import Image from '@material-ui/icons/Image';
//Redux
import { useSelector } from 'react-redux';
import MyButton from '../util/MyButton';

const styles = (theme) => ({
  ...theme.spreadThis,
});

const Row = ({ row, header, classes }) => {
  const [open, setOpen] = useState(false);

  const { empresa } = useSelector((state) => state.data);
  const { authenticated } = useSelector((state) => state.user);

  const tableHead =
    empresa !== 'salidas'
      ? innerHeader.map((head) => {
          return (
            <TableCell key={head.key} className={classes.headerRow}>
              {head.header}
            </TableCell>
          );
        })
      : exitInnerHeader.map((head) => {
          return (
            <TableCell key={head.key} className={classes.headerRow}>
              {head.header}
            </TableCell>
          );
        });
  const tableBody =
    empresa !== 'salidas'
      ? innerHeader.map((head, index) => {
          let value;
          if (head.key === 'fechaIngreso') {
            value = dayjs(row[head.key]).format('DD/MM/YYYY');
          } else {
            value = row[head.key];
          }
          return (
            <TableCell component='th' scope='row' key={index}>
              {value}
            </TableCell>
          );
        })
      : exitInnerHeader.map((head, index) => {
          let value = row[head.key];
          return (
            <TableCell scope='row' key={index}>
              {value}
            </TableCell>
          );
        });

  const cells =
    empresa !== 'salidas'
      ? header.map((head, index) => {
          const value = row[head.key];
          return <TableCell key={index}>{value}</TableCell>;
        })
      : header.map((head, index) => {
          let value = row[head.key];
          if (head.key === 'fechaIngreso' || head.key === 'fechaSalida') {
            if (row[head.key] !== '')
              value = dayjs(row[head.key]).format('DD/MM/YYYY');
          } else {
            value = row[head.key];
          }
          return <TableCell key={index}>{value}</TableCell>;
        });

  const imageDisplay = () => {
    empresa !== 'salidas' ? (
      row.imagen !== undefined && row.imagen !== '' ? (
        <MyButton
          tip={row.imagen}
          onClick={() => window.open(row.imagen)}
          className={classes.button}
        >
          <Image color='primary' />
        </MyButton>
      ) : (
        <MyButton
          tip='No se encontró una imagen'
          disabled={true}
          className={classes.button}
        >
          <Image color='disabled' />
        </MyButton>
      )
    ) : (
      <></>
    );

    // if (row.imagen !== undefined && row.imagen !== '') {
    //   return (
    //     <MyButton
    //       tip={row.imagen}
    //       onClick={() => window.open(row.imagen)}
    //       className={classes.button}
    //     >
    //       <Image color='primary' />
    //     </MyButton>
    //   );
    // } else {
    //   return (
    //     <MyButton
    //       tip='No se encontró una imagen'
    //       disabled={true}
    //       className={classes.button}
    //     >
    //       <Image color='disabled' />
    //     </MyButton>
    //   );
    // }
  };

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
        {cells}
        <TableCell>{authenticated && <Editvalue row={row} />}</TableCell>
        <TableCell>{imageDisplay()}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box margin={1}>
              <Typography variant='h6' gutterBottom component='div'>
                Detalles
              </Typography>
              <Table size='medium' aria-label='detalles'>
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
