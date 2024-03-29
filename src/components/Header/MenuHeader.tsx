import React, { FC, useState } from 'react';

import { Box, IconButton, MenuItem, Menu } from '@mui/material';
import { MoreVert } from '@mui/icons-material';

import AddFolder from './AddFolder';
import AddBookmark from './AddBookmark';

import { useAppDispatch, useAppSelector } from '../../redux/store';
import { sortFolders } from '../../redux/folder/slice';
import { NavLink } from 'react-router-dom';

const MenuHeader: FC = () => {
  const dispatch = useAppDispatch();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorElNav);
  const [addFolderOpen, setAddFolderOpen] = useState<boolean>(false);
  const [addBookmarkOpen, setAddBookmarkOpen] = useState<boolean>(false);

  const { blackStyle } = useAppSelector(({ theme }) => theme);

  //Handle Click Away
  const handleClickAway = (event: any) => {
    setAnchorElNav(event.currentTarget);
  };

  //Handle Menu Close
  const handleMenuClose = () => {
    setAnchorElNav(null);
    // handleClick.handleClickAway();
  };

  // Sort by Name Folder
  const sortingASCFolders = () => {
    dispatch(sortFolders());
    handleMenuClose();
  };

  // Add New Folder
  const addNewFolder = () => {
    setAddFolderOpen((addFolderOpen) => !addFolderOpen);
    handleMenuClose();
  };
  const folderModalClose = () => {
    setAddFolderOpen(false);
  };

  // Add New Bookmark
  const addNewBookmark = () => {
    setAddBookmarkOpen((addBookmarkOpen) => !addBookmarkOpen);
    handleMenuClose();
  };
  const bookmarkModalClose = () => {
    setAddBookmarkOpen(false);
  };

  //Add style to Favorite link
  let activeStyle = {
    color: 'black',
    textDecoration: 'none',
  };
  let activeBlackStyle = {
    color: 'white',
    textDecoration: 'none',
  };

  return (
    <Box sx={{ display: { xs: 'flex' } }}>
      <IconButton
        title="header menu"
        aria-label="show more"
        aria-controls="menu-bookmark"
        aria-haspopup="true"
        onClick={handleClickAway}
        color="inherit"
      >
        <MoreVert />
      </IconButton>
      <Menu
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id="menu-bookmark"
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleMenuClose}
      >
        {/* Start Sort Bookmark */}
        <MenuItem divider onClick={sortingASCFolders}>
          Sort by name
        </MenuItem>
        {/* End Sort Bookmark */}
        {/* Start Add new Bookmark */}
        <MenuItem onClick={addNewBookmark}>Add new Bookmark</MenuItem>
        {/* Add Bookmark Modal Card */}
        <AddBookmark
          addBookmarkOpen={addBookmarkOpen}
          setAddBookmarkOpen={setAddBookmarkOpen}
          onClose={bookmarkModalClose}
        />
        {/* End Add new Bookmark */}
        {/* Start Add new Folder */}
        <MenuItem onClick={addNewFolder}>Add new Folder</MenuItem>
        <AddFolder
          addFolderOpen={addFolderOpen}
          setAddFolderOpen={setAddFolderOpen}
          onClose={folderModalClose}
        />
        {/* End Add new Folder */}
        {/* ========================== */}
        {/* Start Add Favorite Folder */}
        <MenuItem divider>
          <NavLink
            to="favorite"
            style={({ isActive }) => {
              if (blackStyle) {
                return isActive ? activeStyle : activeBlackStyle;
              }
              return activeStyle;
            }}
          >
            Favorite Bookmark
          </NavLink>
        </MenuItem>
        {/* End Add Favorite Folder */}
        {/* =========================== */}
        <MenuItem disabled onClick={handleMenuClose}>
          Import Bookmarks
        </MenuItem>
        <MenuItem
          divider
          disabled
          // onClick={handleProfileMenuOpen}
        >
          Export Bookmarks
        </MenuItem>
        <MenuItem
        // onClick={handleProfileMenuOpen}
        >
          Help center
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default MenuHeader;
