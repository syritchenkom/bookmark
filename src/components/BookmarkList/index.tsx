import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  Table,
  TableBody,
  TableContainer,
  TableRow,
  TableCell,
  Paper,
  Skeleton,
  List,
  ListSubheader,
  Fab,
} from '@mui/material';

import { makeStyles } from '@mui/styles';

import {
  // BookmarksOutlined,
  Favorite as FavoriteIcon,
} from '@mui/icons-material';

import { useAppDispatch, useAppSelector } from '../../redux/store';
import { fetchBookmarks } from '../../redux/bookmark/asyncActions';

import MenuBookmarks from './MenuBookmarks';
import { ScrollBookmarks } from './ScrollBookmarks';
import { addToFavorites, removeFromFavorites, setActive } from '../../redux/favorite/slice';
// import {selectActive} from "../../redux/favorite/selectors"
import { Bookmark } from '../../redux/bookmark/types';
import { red, blue, grey } from '@mui/material/colors';
import { selectActive } from '../../redux/favorite/selectors';

const useStyles = makeStyles((theme) => ({
  fab: {
    transition: 'background-color 0.2s ease',
  },
  active: {
    // color: theme.palette.secondary.light,
    // backgroundColor: theme.palette.primary.main,
    backgroundColor: red[500],
  },
  // inactive: {
  //   backgroundColor: blue[500],
  // }
}));

const BookmarkList: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const classes = useStyles();

  const { userId } = useParams(); // const params = useParams(); const userId = params.userId

  const dispatch = useAppDispatch();
  const { bookmarks, searchValue, isSearch } = useAppSelector(({ bookmark }) => bookmark);
  const { favorites } = useAppSelector(({ favorite }) => favorite);
  const isActive = useAppSelector(selectActive);

  //Added variable to search component
  const currentBookmarks = isSearch ? searchValue : bookmarks;

  const orderedBookmarks = currentBookmarks
    .slice()
    .sort((a: Bookmark, b: { id: number }) => a.id - b.id);

  useEffect(() => {
    const timer: any = setTimeout(() => {
      dispatch(fetchBookmarks({ userId }));
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [dispatch, userId]);

  const skeletons = [...new Array(10)].map((_, index) => (
    <TableRow key={index}>
      <TableCell sx={{ padding: '1px' }}>
        <Skeleton variant="rounded" width={762} height={110} />
      </TableCell>
    </TableRow>
  ));

  const addFavoriteBook = (bookmark: Bookmark) => {
    //We check whether the book has been added to favorites if added to removed, if not, we add it.
    const bookFlag = favorites?.some((bookList: Bookmark) => bookList.id === bookmark.id);
    if (bookFlag) {
      alert('Book Is Removed from Favorite List');
      // dispatch(setActive(!isActive))
      dispatch(setActive(!isActive));
      dispatch(removeFromFavorites(bookmark));
    } else {
      // dispatch(setActive(isActive))
      dispatch(setActive(isActive));
      dispatch(addToFavorites(bookmark));
    }
  };

  // const addFavoriteButtonStyle = {
  //   backgroundColor: isFavorite ? "red" : "primary.main",
  // };

  return (
    <List
      sx={{
        marginTop: '4rem',
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
      }}
      component={Paper}
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Bookmarks List Items
        </ListSubheader>
      }
    >
      <TableContainer>
        <Table>
          <TableBody>
            {isLoading
              ? skeletons
              : orderedBookmarks.map((bookmark, bookId, index) => (
                  <TableRow
                    hover
                    key={bookmark.id}
                    sx={{
                      display: 'flex',
                      // alignItems: 'center',
                      // '&:last-child td, &:last-child th': { border: 0 }
                    }}
                  >
                    {/* Start Add to Favorite */}
                    <TableCell
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      {/* <FabButton
                        key={bookmark.id}
                        // className={isActive ? 'Mui-active' : '&.Mui-active'}
                        // style={addFavoriteButtonStyle}
                        onClick={() => addFavoriteBook(bookmark)}
                        aria-label="Like the bookmark"
                        // sx={{bgcolor: isActive ? red[500] : undefined}}
                        // sx={{backgroundColor: isActive ? red[500] : undefined}}
                        size="medium"
                        isSelected={selected.includes(bookmark.id)}
                      >
                        <FavoriteIcon />
                      </FabButton> */}
                      <Fab
                        // sx={{bgColor: 'red'}}
                        // color="primary"
                        // sx={{bgColor: selected.includes(bookmark.id) ? 'primary' : 'secondary'}}
                        // sx={{ bgColor: isActive ? 'secondary' : 'primary' }}
                        sx={{ backgroundColor: isActive ? red[500] : blue[500] }}
                        // className={`${classes.fab} ${isActive ? classes.active : ''}`}
                        onClick={() => addFavoriteBook(bookmark)}
                        aria-label="Like the bookmark"
                      >
                        <FavoriteIcon />
                      </Fab>
                    </TableCell>
                    {/* End Add to Favorite */}
                    {/* Bookmarks Title & Body */}
                    <TableCell
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                      // component="th"
                      scope="row"
                    >
                      Title: {bookmark.title}
                      <br />
                      Body: {bookmark.body}
                    </TableCell>
                    <TableCell sx={{ flexGrow: 1 }} />
                    {/* Menu Bookmarks */}
                    <TableCell
                      sx={{
                        display: { xs: 'flex' },
                        alignItems: 'center',
                      }}
                    >
                      <MenuBookmarks />
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Scrolling to up or to down */}
      <ScrollBookmarks />
    </List>
  );
};

export default BookmarkList;
