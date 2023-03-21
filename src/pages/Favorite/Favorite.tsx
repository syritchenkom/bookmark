import * as React from 'react';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  ThemeProvider,
  CssBaseline,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { Link } from 'react-router-dom';
import { ScrollBookmarks } from '../../components/BookmarkList/ScrollBookmarks';
import { removeFromFavorites } from '../../redux/favorite/slice';
import { Favorite as FavoriteTypes } from '../../redux/favorite/types';
import { darkTheme, lightTheme } from '../../components/Theme/Theme';

export default function Favorite() {
  const { favorites } = useAppSelector(({ favorite }) => favorite);
  const dispatch = useAppDispatch();

  const theme = useAppSelector(({ theme }) => theme.darkTheme);

  const removeFavoriteBookmark = (favorite: FavoriteTypes) => {
    console.log('favorite', favorites);
    dispatch(removeFromFavorites(favorite));
  };

  return (
    <ThemeProvider theme={theme ? darkTheme : lightTheme}>
      <CssBaseline />

      {favorites?.length ? (
        <Box
          sx={{
            width: '100%',
            maxWidth: 500,
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          <Typography variant="h3">Favorite Books</Typography>
        </Box>
      ) : (
        <Box
          sx={{
            width: '100%',
            maxWidth: 500,
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          <Typography variant="h3">Favorite Books</Typography>
          <Link
            to="/"
            style={{
              display: 'inline-block',
              margin: '1rem 0',
              padding: '1rem',
              fontSize: '1rem',
              color: 'black',
              cursor: 'pointer',
              backgroundColor: 'skyBlue',
              borderRadius: '0.25rem',
              textDecoration: 'none',
              transition:
                'color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out',
            }}
          >
            Go Home
          </Link>
        </Box>
      )}

      {favorites?.length ? (
        <>
          <TableContainer component={Paper} sx={{ maxWidth: '75%', margin: '0 auto' }}>
            <Link
              to="/"
              style={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                maxWidth: '11%',
                textAlign: 'center',
                margin: '0 auto',
                padding: '1rem',
                fontSize: '1rem',
                color: 'black',
                cursor: 'pointer',
                backgroundColor: 'skyBlue',
                borderRadius: '0.25rem',
                textDecoration: 'none',
                transition:
                  'color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out',
              }}
            >
              Go Home
            </Link>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">User</TableCell>
                  <TableCell align="center">Id</TableCell>
                  <TableCell align="center">Title</TableCell>
                  <TableCell align="center">Body</TableCell>
                  <TableCell align="center">Action</TableCell>
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
                    <TableCell align="left">{favorite.title}</TableCell>
                    <TableCell align="left">{favorite.body}</TableCell>
                    <TableCell align="right">
                      <Button
                        onClick={() => removeFavoriteBookmark(favorite)}
                        variant="contained"
                        color="error"
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {/* Start Scrolling to up or to down */}
            <ScrollBookmarks />
            {/* End Scrolling to up or to down */}
          </TableContainer>
        </>
      ) : null}
    </ThemeProvider>
  );
}
