import React, { useState } from 'react';
import Editvalue from './EditValue';
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

const innerHeader = [
  { id: 'empresa', label: 'Empresa' },
  { id: 'ubicacion', label: 'Ubicación' },
  { id: 'observaciones', label: 'Observaciones' },
];
const Row = ({ row, header }) => {
  const [open, setOpen] = useState(false);

  const tableHead = innerHeader.map((head) => {
    return <TableCell>{head.label}</TableCell>;
  });
  const tableBody = innerHeader.map((head) => {
    const value = row[head.id];
    return <TableCell>{value}</TableCell>;
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
        {header.map((head) => {
          const value = row[head.id];
          return <TableCell key={value}>{value}</TableCell>;
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

export default Row;
