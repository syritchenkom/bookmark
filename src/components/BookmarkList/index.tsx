import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  // IconButton,
  styled,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  TableCell,
  Paper,
  Skeleton,
  List,
  ListSubheader,
  // useAutocomplete,
  Fab,
} from "@mui/material";
import { Favorite as FavoriteIcon } from "@mui/icons-material";

import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchBookmarks } from "../../redux/bookmark/asyncActions";

import MenuBookmarks from "./MenuBookmarks";
import { ScrollBookmarks } from "./ScrollBookmarks";
import {
  addToFavorites,
  removeFromFavorites,
  toggleActiveFavorite,
} from "../../redux/favorite/slice";
import { Bookmark } from "../../redux/bookmark/types";
import { red } from "@mui/material/colors";

const FabButton = styled(Fab)(({ theme }) => ({
  // color: theme.palette.primary.main,
  color: "white",
  backgroundColor: theme.palette.primary.main,
  "&:hover": {
    // backgroundColor: theme.palette.secondary.dark,
    backgroundColor: red[500],
  },
  "&.Mui-active": {
    // color: theme.palette.secondary.light,
    // backgroundColor: theme.palette.primary.main,
    backgroundColor: red[500],
  },
}));

const BookmarkList: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { userId } = useParams(); // const params = useParams(); const userId = params.userId

  const dispatch = useAppDispatch();
  const { bookmarks, searchValue, isSearch } = useAppSelector(
    ({ bookmark }) => bookmark
  );
  const { favorites, isActive } = useAppSelector(({ favorite }) => favorite);

  //Added variable to search component
  const currentBookmarks = isSearch ? searchValue : bookmarks;

  const orderedBookmarks = currentBookmarks.slice().sort((a: Bookmark, b: {id: number}) => a.id - b.id);

  useEffect(() => {
    const timer: any = setTimeout(() => {
      dispatch(fetchBookmarks({ userId }));
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [dispatch, userId]);

  const skeletons = [...new Array(10)].map((_, index) => (
    <TableRow key={index}>
      <TableCell sx={{ padding: "1px" }}>
        <Skeleton variant="rounded" width={762} height={110} />
      </TableCell>
    </TableRow>
  ));

  const addFavoriteBook = (bookmark: Bookmark) => {
    //We check whether the book has been added to favorites if added to removed, if not, we add it.
    const bookFlag = favorites?.some(
      (bookList: Bookmark) => bookList.id === bookmark.id
    );
    if (bookFlag) {
      alert("Book Is Already In Favorite List");
      dispatch(removeFromFavorites(bookmark));
    } else {
      dispatch(addToFavorites(bookmark));
      dispatch(toggleActiveFavorite())
    }
  };

  const addFavoriteButtonStyle = {
    backgroundColor: isActive ? "red" : undefined,
  };

  return (
    <List
      sx={{
        marginTop: "4rem",
        bgcolor: "background.paper",
        position: "relative",
        overflow: "auto",
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
              : orderedBookmarks.map((bookmark, index) => (
                  <TableRow
                    hover
                    key={bookmark.id}
                    sx={{
                      display: "flex",
                      // alignItems: 'center',
                      // '&:last-child td, &:last-child th': { border: 0 }
                    }}
                  >
                    {/* Start Add to Favorite */}
                    <TableCell
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                    
					 <FabButton
                        // className={isActive ? 'Mui-active' : '&.Mui-active'}
                        // style={addFavoriteButtonStyle}
                        onClick={() => addFavoriteBook(bookmark)}
                        aria-label="Like the bookmark"
                        // sx={{bgcolor: isActive ? red[500] : undefined}}
                        // sx={{backgroundColor: isActive ? red[500] : undefined}}
                        size="medium"
                      >
                        <FavoriteIcon />
                      </FabButton> 
                      {/* <Fab
						style={addFavoriteButtonStyle}
                        onClick={() => addFavoriteBook(bookmark)}
                        aria-label="Like the bookmark"
                      >
                        <FavoriteIcon />
                      </Fab> */}
                    </TableCell>
                    {/* End Add to Favorite */}
                    {/* Bookmarks Title & Body */}
                    <TableCell
                      sx={{
                        display: "flex",
                        alignItems: "center",
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
                        display: { xs: "flex" },
                        alignItems: "center",
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
