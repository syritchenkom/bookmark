import React, { FC, useEffect, useState } from 'react';
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

import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../redux/store';
import { fetchBookmarks } from '../../redux/bookmark/asyncActions';

const UserItem: FC = () => {
	const [bookMenu, setBookMenu] = useState<null | HTMLElement>(null);

	// const params = useParams();
	// const userId = params.userId
	const { userId } = useParams();

	const dispatch = useAppDispatch();
	const bookmarks = useAppSelector(({ bookmark }) => bookmark.bookmarks);
	// const newBookmark = useSelector((state: RootState) => state.bookmark);

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
					{console.log('bookmarks', bookmarks)}
					{bookmarks ? (
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
									{bookmark.title}
									{bookmark.body}
								</TableCell>
								<TableCell sx={{ flexGrow: 1 }} />
								<TableCell
									sx={{
										// display: { xs: 'flex' }
										display: 'flex'
									}}>
									<IconButton
										size="small"
										id="menu-button"
										title="Menu Item"
										aria-label="more"
										aria-controls={open ? 'menu-bookmark' : undefined}
										aria-expanded={open ? 'true' : undefined}
										aria-haspopup="true"
										onClick={handleBookClick}
										// color="inherit"
									>
										<MoreIcon />
									</IconButton>
									<Menu
										id="menu-bookmark"
										// MenuListProps={{ 'aria-labelledby': 'menu-button' }}
										anchorOrigin={{
											vertical: 'top',
											horizontal: 'right'
										}}
										transformOrigin={{
											vertical: 'top',
											horizontal: 'right'
										}}
										anchorEl={bookMenu}
										open={open}
										onClose={handleBookClose}>
										<MenuItem
										// onClick={handleProfileMenuOpen}
										>
											Rename
										</MenuItem>
										<MenuItem
											divider
											// onClick={handleProfileMenuOpen}
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
