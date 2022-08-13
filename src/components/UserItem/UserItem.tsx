import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
	Table,
	TableBody,
	TableContainer,
	TableRow,
	Paper,
	TableCell,
	IconButton,
	MenuItem,
	Menu
} from '@mui/material';
import MoreIcon from '@mui/icons-material/MoreVert';
import DriveFileIcon from '@mui/icons-material/InsertDriveFileOutlined';

import { useAppDispatch, useAppSelector } from '../../redux/store';
import { fetchBookmarks } from '../../redux/bookmark/asyncActions';
import RenameBookmark from './RenameBookmark';
// import { deleteBookmark } from '../../redux/bookmark/slice';

const UserItem: FC = () => {
	const [bookMenu, setBookMenu] = useState<null | HTMLElement>(null);
	const [renameBookmarkOpen, setRenameBookmarkOpen] = useState<boolean>(false);

	// const params = useParams();
	// const userId = params.userId
	const { userId } = useParams();

	const dispatch = useAppDispatch();
	const bookmarks = useAppSelector(({ bookmark }) => bookmark.bookmarks);
	// console.log('bookmarks', bookmarks);
	const newBookmark = useAppSelector((state) => state.bookmark.bookmarks);

	useEffect(() => {
		dispatch(fetchBookmarks({ userId }));
	}, [dispatch, userId]);

	const open = Boolean(bookMenu);

	const handleBookClick = (event: React.MouseEvent<HTMLElement>) => {
		setBookMenu(event.currentTarget);
	};

	const handleBookClose = () => {
		setBookMenu(null);
	};

	const renameBookmarkElement = () => {
		setRenameBookmarkOpen((renameBookmarkOpen) => !renameBookmarkOpen);
	};

	const bookmarkModalClose = () => {
		setRenameBookmarkOpen(false);
	};

	const deleteBookmarkItem = () => {};

	return (
		<TableContainer component={Paper} sx={{ marginTop: '6rem' }}>
			<Table
				sx={{
					minWidth: '300px',
					borderRadius: '1rem 1rem',
					boxShadow: 'inset 0px 0px 6px 0px #dadada'
				}}>
				<TableBody>
					{/* Data from jsonplaceholder.typicode.com */}
					{bookmarks ? (
						newBookmark &&
						bookmarks.map((bookmark) => (
							<TableRow
								hover
								key={bookmark.id}
								sx={{
									display: 'flex',
									// alignItems: 'center',
									'&:last-child td, &:last-child th': { border: 0 }
								}}>
								<TableCell
									sx={{
										display: 'flex',
										alignItems: 'center'
									}}
									component="th"
									scope="row">
									<DriveFileIcon sx={{ marginRight: '1rem' }} />
									Title: {bookmark.title} <br />
									Body: {bookmark.body}
								</TableCell>
								<TableCell sx={{ flexGrow: 1 }} />
								<TableCell
									sx={{
										// display: { xs: 'flex' }
										display: 'flex'
									}}>
									<IconButton
										aria-label="more"
										id="long-button"
										aria-controls={open ? 'long-menu' : undefined}
										aria-expanded={open ? 'true' : undefined}
										aria-haspopup="true"
										onClick={handleBookClick}>
										<MoreIcon />
									</IconButton>
									<Menu
										sx={{
											boxShadow: 'none'
										}}
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
										<MenuItem onClick={renameBookmarkElement}>Rename</MenuItem>
										{/* Rename Bookmark Modal Card */}
										<RenameBookmark
											renameBookmarkOpen={renameBookmarkOpen}
											setRenameBookmarkOpen={setRenameBookmarkOpen}
											onClose={bookmarkModalClose}
										/>
										<MenuItem
											divider
											onClick={deleteBookmarkItem}
											// onClick={() => {
											// 	dispatch(
											// 		deleteBookmark({
											// 			// console.log(userId);
											// 		}
											// 	);
											// }}
										>
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
								</TableCell>
							</TableRow>
						))
					) : (
						<div>Could not find newBookmarks</div>
					)}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default UserItem;
