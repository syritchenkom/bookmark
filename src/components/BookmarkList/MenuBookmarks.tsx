import React, { FC, useEffect, useState } from 'react';

import { MenuItem, Menu, Box, IconButton } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../redux/store';
import { fetchBookmarks } from '../../redux/bookmark/asyncActions';
import RenameBookmark from './RenameBookmark';
import { deleteBookmark } from '../../redux/bookmark/slice';
import { MoreVert } from '@mui/icons-material';

const MenuBookmarks = () => {
	const [bookMenu, setBookMenu] = useState<null | HTMLElement>(null);
	const [renameBookmarkOpen, setRenameBookmarkOpen] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const dispatch = useAppDispatch();
	const { bookmarks, searchValue, isSearch } = useAppSelector(
		({ bookmark }) => bookmark
	);

	const [activeBookmark, setActiveBookmark] = useState(bookmarks[0]);

	const open = Boolean(bookMenu);

	const handleBookClick = (event: any) => {
		setBookMenu(event.currentTarget);
	};

	const handleBookClose = () => {
		setBookMenu(null);
	};

	const renameBookmarkElement = () => {
		setRenameBookmarkOpen((renameBookmarkOpen) => !renameBookmarkOpen);
		handleBookClose();
	}; 

	const bookmarkModalClose = () => {
		setRenameBookmarkOpen(false);
	};

	const handleRemoveBookmark = (id: number) => {
		dispatch(
			deleteBookmark({
				id,
				userId: 1,
				title: '',
				body: ''
			})
		);
	};

	return (
		<Box>
			<IconButton
				//size="large" //?
				title="bookmark menu" //?
				aria-label="more"
				aria-controls="bookmark-menu"
				// id="long-button"
				// aria-controls={open ? 'long-menu' : undefined}
				// aria-expanded={open ? 'true' : undefined}
				aria-haspopup="true"
				onClick={handleBookClick}
				color="inherit">
				<MoreVert />
			</IconButton>
			<Menu
				anchorEl={bookMenu}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right'
				}}
				id="menu-bookmark"
				keepMounted
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right'
				}}
				open={open}
				onClose={handleBookClose}>
				{/* Rename Bookmark Modal Card */}
				<MenuItem onClick={renameBookmarkElement}>Rename</MenuItem>
				{/* Delete Bookmark Card */}
				<MenuItem
					divider
					onClick={() => handleRemoveBookmark(activeBookmark!.id)}>
					Delete
				</MenuItem>

				<MenuItem
				// onClick={handleProfileMenuOpen}
				>
					Cut
				</MenuItem>
				<MenuItem
				// onClick={handleProfileMenuOpen}
				>
					Copy
				</MenuItem>
				<MenuItem
					divider
					// onClick={handleProfileMenuOpen}
				>
					Paste
				</MenuItem>
				<MenuItem
				// onClick={handleProfileMenuOpen}
				>
					Open in new tab
				</MenuItem>
				<MenuItem
				// onClick={handleProfileMenuOpen}
				>
					Open in new window
				</MenuItem>
				<MenuItem
				// onClick={handleProfileMenuOpen}
				>
					Open in Incognito window
				</MenuItem>
			</Menu>
			{renameBookmarkOpen && (
				<RenameBookmark
					renameBookmarkOpen={renameBookmarkOpen}
					setRenameBookmarkOpen={setRenameBookmarkOpen}
					onClose={bookmarkModalClose}
					bookmark={activeBookmark}
				/>
			)}
		</Box>

		// {renameBookmarkOpen && (
		// 	<RenameBookmark
		// 		renameBookmarkOpen={renameBookmarkOpen}
		// 		setRenameBookmarkOpen={setRenameBookmarkOpen}
		// 		onClose={bookmarkModalClose}
		// 		bookmark={activeBookmark!}
		// 	/>
		// )}
	);
};

export default MenuBookmarks;
