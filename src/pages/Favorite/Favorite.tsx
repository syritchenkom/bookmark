import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useAppSelector } from '../../redux/store';

export default function Favorite() {
    const {favorites} = useAppSelector(({favorite}) => favorite)
    
  return (
    <>
    <TableContainer component={Paper} sx={{ maxWidth: "75%" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">User</TableCell>
            <TableCell align="center">Id</TableCell>
            <TableCell align="center">Title</TableCell>
            <TableCell align="center">Body</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {favorites.map((favorite, index) => (
            <TableRow 
              hover
              key={favorite.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {favorite.userId}
              </TableCell>
              <TableCell align="right">{favorite.id}</TableCell>
              <TableCell align="right">{favorite.title}</TableCell>
              <TableCell align="right">{favorite.body}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}